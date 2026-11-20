/**
 * コンテンツを読む唯一の入口。ページはここの関数だけを使う。
 * ヘッドレス CMS に移るときは、このファイルの中身（読み込み元）だけを差し替える。
 * Zod スキーマは移行後も「入口の検証」としてそのまま使う。
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import YAML from "yaml";
import type { z } from "zod";
import { VenueSchema, InstructorSchema, type Venue, type Instructor } from "@/lib/schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type InstructorEntry = Instructor & { body: string; file: string };
export type VenueEntry = Venue & { file: string };

type Store = { instructor: InstructorEntry[]; venues: VenueEntry[] };
let cache: Store | null = null;

function listFiles(dir: string, ext: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(ext) && !f.startsWith("_"))
    .map((f) => path.join(full, f));
}

function formatIssues(file: string, error: z.ZodError) {
  const rel = path.relative(process.cwd(), file);
  return `${rel}\n${error.issues.map((i) => `  - ${i.path.join(".") || "(全体)"}: ${i.message}`).join("\n")}`;
}

/** 全コンテンツを読み、検証する。1件でも不正があれば全件まとめて例外にする */
export function loadContent(): Store {
  if (cache) return cache;
  const errors: string[] = [];

  const venues: VenueEntry[] = [];
  for (const file of listFiles("studio", ".yaml")) {
    const result = VenueSchema.safeParse(YAML.parse(fs.readFileSync(file, "utf8")));
    if (!result.success) {
      errors.push(formatIssues(file, result.error));
      continue;
    }
    if (result.data.slug !== path.basename(file, ".yaml")) {
      errors.push(`${path.relative(process.cwd(), file)}\n  - slug とファイル名を一致させる`);
    }
    venues.push({ ...result.data, file });
  }

  const instructor: InstructorEntry[] = [];
  for (const file of listFiles("instructor", ".mdx")) {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const result = InstructorSchema.safeParse(data);
    if (!result.success) {
      errors.push(formatIssues(file, result.error));
      continue;
    }
    const s = result.data;
    const rel = path.relative(process.cwd(), file);
    if (s.slug !== path.basename(file, ".mdx")) errors.push(`${rel}\n  - slug とファイル名を一致させる`);
    for (const c of s.venues) {
      if (!venues.some((cl) => cl.slug === c.slug)) {
        errors.push(`${rel}\n  - venues: content/studio/${c.slug}.yaml がない`);
      }
    }
    if (!fs.existsSync(path.join(PUBLIC_DIR, s.photo.src))) {
      errors.push(`${rel}\n  - photo.src: public${s.photo.src} がない`);
    }
    instructor.push({ ...s, body: content, file });
  }

  if (errors.length > 0) {
    throw new Error(`コンテンツの検証に失敗しました（${errors.length}件）\n\n${errors.join("\n\n")}`);
  }

  instructor.sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime() || a.slug.localeCompare(b.slug),
  );
  cache = { instructor, venues };
  return cache;
}

const showDrafts = process.env.SHOW_DRAFTS === "1";

/** 公開中のインストラクター（新着順） */
export function getAllInstructors(): InstructorEntry[] {
  return loadContent().instructor.filter((s) => showDrafts || !s.draft);
}

export function getInstructor(slug: string) {
  return getAllInstructors().find((s) => s.slug === slug);
}

export function getAllVenues(): VenueEntry[] {
  return loadContent().venues;
}

export function getVenue(slug: string) {
  return getAllVenues().find((c) => c.slug === slug);
}

/** インストラクターが教えている場所（1つ目が主な場所） */
export function venuesOf(s: Instructor): VenueEntry[] {
  return s.venues.map((c) => getVenue(c.slug)!).filter(Boolean);
}

/** その場所で教えているインストラクター（新着順）。Instructor.venues から逆にたどる */
export function instructorsOfVenue(venueSlug: string) {
  return getAllInstructors().filter((s) => s.venues.some((c) => c.slug === venueSlug));
}
