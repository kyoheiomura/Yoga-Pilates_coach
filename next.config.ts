import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URL 設計どおり末尾スラッシュで統一する（/instructor/mihon-akari/）
  trailingSlash: true,
  // ホームディレクトリに別の lockfile があっても、このフォルダをプロジェクトの根として扱う
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
};

export default nextConfig;
