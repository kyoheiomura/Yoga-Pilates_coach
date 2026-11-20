/**
 * 面の境目に置く波。親（position: relative の面）の上か下にはみ出して付く。
 * 同じ波を横に2回つなげて、ゆっくり流す（globals.css の .wave）。飾りなので読み上げない。
 */
export function Wave({ side, color = "var(--color-chalk)" }: { side: "top" | "bottom"; color?: string }) {
  return (
    <span aria-hidden="true" className={`wave ${side === "top" ? "wave-top" : "wave-bottom"}`}>
      <svg viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path
          fill={color}
          d="M0 50C120 20 240 10 360 10S600 40 720 50S960 80 1080 80S1320 80 1440 50C1560 20 1680 10 1800 10S2040 40 2160 50S2400 80 2520 80S2760 80 2880 50V100H0Z"
        />
      </svg>
    </span>
  );
}
