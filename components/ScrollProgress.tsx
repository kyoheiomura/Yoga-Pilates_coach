"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * スクロール連動のきっかけ。[data-p] の要素に、進み具合を CSS 変数 --p（0〜1）で入れる。
 *   data-p="view" … 要素が画面の下から入って、上に抜けるまで
 *   data-p="pin"  … 要素の上端が画面の上に着いてから、下端が画面の下に着くまで（貼りついた舞台用）
 * 値は少し遅れて追いかける（なめらかに見せるため）。動きそのものは globals.css が --p から計算する。
 * 動きを減らす設定のとき（<html data-motion> がないとき）は何もしない。
 */
export function ScrollProgress() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-motion")) return;

    type Item = { el: HTMLElement; mode: string; cur: number; target: number; near: boolean };
    const items: Item[] = [...document.querySelectorAll<HTMLElement>("[data-p]")].map((el) => ({
      el,
      mode: el.dataset.p || "view",
      cur: -1,
      target: 0,
      near: true,
    }));
    if (!items.length) return;

    // 画面の近くにあるものだけ計算する
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const it = items.find((i) => i.el === e.target);
          if (it) it.near = e.isIntersecting;
        }
        kick();
      },
      { rootMargin: "30% 0px 30% 0px" },
    );
    items.forEach((i) => io.observe(i.el));

    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const measure = () => {
      const vh = window.innerHeight;
      for (const it of items) {
        if (!it.near) continue;
        const r = it.el.getBoundingClientRect();
        it.target = it.mode === "pin" ? clamp(-r.top / Math.max(1, r.height - vh)) : clamp((vh - r.top) / (vh + r.height));
      }
    };

    let raf = 0;
    const tick = () => {
      raf = 0;
      let moving = false;
      for (const it of items) {
        if (!it.near) continue;
        const next = it.cur < 0 ? it.target : it.cur + (it.target - it.cur) * 0.14;
        if (Math.abs(next - it.cur) > 0.0004) {
          it.cur = next;
          it.el.style.setProperty("--p", next.toFixed(4));
          moving = true;
        }
      }
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [pathname]);

  return null;
}
