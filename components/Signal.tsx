// Deterministic decorative "neural signal" backdrop. Same seed -> same art,
// so server and client render identically (no hydration mismatch).

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function wavePath(rand: () => number, width: number, height: number, baseline: number, amp: number): string {
  const steps = 26;
  const pts: string[] = [];
  let phase = rand() * Math.PI * 2;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    // occasional spike, like an evoked potential
    const spike = rand() > 0.86 ? (rand() - 0.5) * amp * 2.4 : 0;
    const y = baseline + Math.sin(phase) * amp * (0.5 + rand() * 0.5) + spike;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
    phase += 0.55 + rand() * 0.5;
  }
  return pts.join(" ");
}

export function Signal({
  seed,
  hue,
  className = "signal"
}: {
  seed: string;
  /** Optional forced hue 0..360; otherwise derived from seed. */
  hue?: number;
  className?: string;
}) {
  const h = hash(seed);
  const rand = mulberry32(h);
  const W = 400;
  const H = 220;
  const baseHue = hue ?? 190 + (h % 90); // cyan -> violet band
  const c1 = `hsl(${baseHue} 90% 62%)`;
  const c2 = `hsl(${(baseHue + 46) % 360} 85% 60%)`;
  const gid = `g-${h.toString(36)}`;

  const w1 = wavePath(rand, W, H, H * 0.42, 20);
  const w2 = wavePath(rand, W, H, H * 0.62, 14);
  const w3 = wavePath(rand, W, H, H * 0.8, 9);

  const nodes = Array.from({ length: 7 }, () => ({
    x: rand() * W,
    y: rand() * H,
    r: 1 + rand() * 2.4
  }));

  return (
    <svg className={className} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`${gid}-a`} cx="78%" cy="18%" r="90%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.55" />
          <stop offset="55%" stopColor={c1} stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0a0e15" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gid}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c1420" />
          <stop offset="100%" stopColor="#0a0e15" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid}-b)`} />
      <rect width={W} height={H} fill={`url(#${gid}-a)`} />
      <path d={w3} fill="none" stroke={c1} strokeOpacity="0.22" strokeWidth="1.2" />
      <path d={w2} fill="none" stroke={c1} strokeOpacity="0.4" strokeWidth="1.4" />
      <path d={w1} fill="none" stroke={c2} strokeOpacity="0.85" strokeWidth="1.8" />
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={c2} fillOpacity="0.7" />
      ))}
    </svg>
  );
}
