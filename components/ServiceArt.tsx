import { useId, type CSSProperties, type ReactNode } from "react";

/**
 * Original animated wireframe illustrations, one per practice area, drawn in the
 * site's lime accent. Used for service cards, hero frames, process visuals and
 * blog covers. Pure SVG + CSS animation (disabled for reduced-motion users).
 */
const L = "#d4ff3a";
const o = (n: number, d = 0): CSSProperties => ({ ["--d" as string]: `${d}s`, ["--n" as string]: n });

function Slab({ cx, cy, w, h, t = 14, fill = 0.1, delay = 0 }: { cx: number; cy: number; w: number; h: number; t?: number; fill?: number; delay?: number }) {
  const top = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  return (
    <g className="a-float" style={o(1, delay)}>
      <polygon points={`${cx - w / 2},${cy} ${cx},${cy + h / 2} ${cx},${cy + h / 2 + t} ${cx - w / 2},${cy + t}`} fill={L} fillOpacity={fill * 0.5} stroke={L} strokeOpacity="0.35" />
      <polygon points={`${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx},${cy + h / 2 + t} ${cx + w / 2},${cy + t}`} fill={L} fillOpacity={fill * 0.3} stroke={L} strokeOpacity="0.35" />
      <polygon points={top} fill={L} fillOpacity={fill} stroke={L} strokeOpacity="0.7" />
      <polygon points={`${cx},${cy - h / 4} ${cx + w / 4},${cy} ${cx},${cy + h / 4} ${cx - w / 4},${cy}`} fill="none" stroke={L} strokeOpacity="0.3" />
    </g>
  );
}

const dots = (pts: [number, number, number?][], s = 2.6) =>
  pts.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r ?? s} fill={L} fillOpacity={i % 2 ? 0.45 : 0.85} />);

function Rise({ x, y, n = 8, spread = 220 }: { x: number; y: number; n?: number; spread?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} className="a-rise" cx={x + ((i * 53) % spread) - spread / 2} cy={y + ((i * 17) % 40)} r={1.4 + (i % 3) * 0.7} fill={L} style={o(1, i * 0.9)} />
      ))}
    </>
  );
}

function Ring({ cx, cy, r, dash, rev, speed = 60, op = 0.4 }: { cx: number; cy: number; r: number; dash?: string; rev?: boolean; speed?: number; op?: number }) {
  return (
    <circle
      cx={cx} cy={cy} r={r} fill="none" stroke={L} strokeOpacity={op} strokeDasharray={dash}
      className={dash ? (rev ? "a-spin-r" : "a-spin") : undefined}
      style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: `${speed}s` }}
    />
  );
}

/* ---------- 0 · Cloud Engineering ---------- */
const Cloud = () => (
  <>
    <Slab cx={540} cy={350} w={340} h={130} delay={0} />
    <Slab cx={540} cy={290} w={300} h={116} delay={0.4} fill={0.13} />
    <Slab cx={540} cy={230} w={260} h={102} delay={0.8} fill={0.16} />
    <Slab cx={540} cy={170} w={220} h={88} delay={1.2} fill={0.2} />
    <path className="a-dash" d="M540 120V350" stroke={L} strokeOpacity="0.4" strokeDasharray="3 7" fill="none" />
    <g className="a-float" style={o(1, 0.2)} fill="none" stroke={L} strokeOpacity="0.85" strokeWidth="1.4">
      <path d="M492 108a22 22 0 0 1 8-42 28 28 0 0 1 52-6 24 24 0 0 1 24 36 18 18 0 0 1-4 12z" />
    </g>
    {dots([[430, 120], [660, 150, 3.4], [700, 250], [390, 240, 3.4], [680, 330], [410, 340]])}
    <Rise x={540} y={380} n={10} />
  </>
);

/* ---------- 1 · Identity & Access Management ---------- */
const Identity = () => (
  <>
    <Ring cx={540} cy={230} r={165} dash="2 9" speed={90} />
    <Ring cx={540} cy={230} r={125} dash="14 8" rev speed={70} op={0.5} />
    <Ring cx={540} cy={230} r={85} op={0.25} />
    <g className="a-spin" style={{ transformOrigin: "540px 230px", animationDuration: "50s" }}>
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const x = Math.round(540 + Math.cos((a * Math.PI) / 180) * 125), y = Math.round(230 + Math.sin((a * Math.PI) / 180) * 125);
        return (
          <g key={a}>
            <line x1="540" y1="230" x2={x} y2={y} stroke={L} strokeOpacity="0.14" />
            <circle cx={x} cy={y} r="9" fill="#0a0a0a" stroke={L} strokeOpacity="0.8" />
            <circle cx={x} cy={y - 2} r="2.6" fill={L} fillOpacity="0.8" />
            <path d={`M${x - 4.5} ${y + 5}a4.5 4 0 0 1 9 0`} fill={L} fillOpacity="0.8" />
          </g>
        );
      })}
    </g>
    <g className="a-pulse" style={o(1)}>
      <path d="M540 175l42 15v34c0 30-18 50-42 62-24-12-42-32-42-62v-34z" fill={L} fillOpacity="0.1" stroke={L} strokeWidth="1.5" />
      <circle cx="540" cy="224" r="10" fill="none" stroke={L} strokeWidth="1.5" />
      <path d="M540 234v22M540 246h8M540 254h6" stroke={L} strokeWidth="1.5" fill="none" />
    </g>
    <Rise x={540} y={400} n={8} spread={300} />
  </>
);

/* ---------- 2 · Microsoft 365 ---------- */
const M365 = () => {
  const tiles: { x: number; y: number; icon: ReactNode }[] = [
    { x: 540, y: 150, icon: <path d="M-14-8h28v16h-28zM-14-8l14 11 14-11" fill="none" /> },
    { x: 640, y: 215, icon: <path d="M-10-13h14l6 6v19h-20zM4-13v6h6M-6 0h12M-6 6h12" fill="none" /> },
    { x: 440, y: 215, icon: <path d="M-16 6a8 8 0 0 1 3-15 11 11 0 0 1 20-2 9 9 0 0 1 11 17z" fill="none" /> },
    { x: 540, y: 280, icon: <><circle cx="-6" cy="-6" r="5" fill="none" /><path d="M-16 10a10 8 0 0 1 20 0M5-9a5 5 0 0 1 0 9M10 10a9 7 0 0 0-5-8" fill="none" /></> },
  ];
  return (
    <>
      <g stroke={L} strokeOpacity="0.3" fill="none">
        <path className="a-dash" d="M540 150L640 215L540 280L440 215Z" strokeDasharray="4 6" />
        <path d="M540 150L540 280M440 215L640 215" strokeOpacity="0.15" />
      </g>
      {tiles.map((t, i) => (
        <g key={i}>
          <Slab cx={t.x} cy={t.y} w={150} h={76} t={10} delay={i * 0.5} fill={0.13} />
          <g className="a-float" style={o(1, i * 0.5)}>
            <g transform={`translate(${t.x} ${t.y - 22})`} stroke={L} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">{t.icon}</g>
          </g>
        </g>
      ))}
      <circle r="4" fill={L}>
        <animateMotion dur="7s" repeatCount="indefinite" path="M540 150L640 215L540 280L440 215Z" />
      </circle>
      {dots([[380, 130], [720, 140, 3.4], [740, 300], [360, 320, 3.4]])}
      <Rise x={540} y={380} n={8} />
    </>
  );
};

/* ---------- 3 · AI & Automation ---------- */
const AI = () => (
  <>
    <Ring cx={540} cy={230} r={170} dash="3 10" speed={80} />
    <Ring cx={540} cy={230} r={135} op={0.22} />
    <g className="a-spin" style={{ transformOrigin: "540px 230px", animationDuration: "36s" }}>
      <g transform="translate(540 95)"><polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="#0a0a0a" stroke={L} strokeWidth="1.4" /><polygon points="0,-9 8,-4 8,5 0,10 -8,5 -8,-4" fill={L} fillOpacity="0.35" /></g>
      <g transform="translate(655 308)"><polygon points="0,-18 18,14 -18,14" fill="#0a0a0a" stroke={L} strokeWidth="1.4" /><circle cy="4" r="4" fill={L} fillOpacity="0.5" /></g>
      <g transform="translate(425 308)"><circle r="17" fill="#0a0a0a" stroke={L} strokeWidth="1.4" /><circle r="8" fill="none" stroke={L} strokeOpacity="0.7" /></g>
    </g>
    <g className="a-pulse" style={o(1)}>
      <circle cx="540" cy="230" r="62" fill={L} fillOpacity="0.07" stroke={L} strokeOpacity="0.8" strokeWidth="1.5" />
      <circle cx="540" cy="230" r="44" fill="none" stroke={L} strokeOpacity="0.5" />
      <circle cx="540" cy="230" r="22" fill={L} fillOpacity="0.28" stroke={L} />
      <circle cx="540" cy="230" r="7" fill={L} />
    </g>
    <g stroke={L} strokeOpacity="0.2">
      <path d="M350 170L440 205L350 250L440 270M730 170L640 205L730 250L640 270" fill="none" />
    </g>
    {dots([[350, 170], [440, 205], [350, 250], [440, 270], [730, 170], [640, 205], [730, 250], [640, 270]])}
    <Rise x={540} y={400} n={8} spread={300} />
  </>
);

/* ---------- 4 · Web Development ---------- */
const WebDev = () => {
  const win = (x: number, y: number, w: number, h: number, delay: number, fill: number) => (
    <g className="a-float" style={o(1, delay)}>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#0a0a0a" fillOpacity="0.85" stroke={L} strokeOpacity="0.6" />
      <rect x={x} y={y} width={w} height={h} rx="8" fill={L} fillOpacity={fill} />
      <path d={`M${x} ${y + 24}H${x + w}`} stroke={L} strokeOpacity="0.4" />
      {[0, 1, 2].map((i) => <circle key={i} cx={x + 14 + i * 12} cy={y + 12} r="3" fill={L} fillOpacity={0.4 + i * 0.2} />)}
      <path d={`M${x + 18} ${y + 46}h${w * 0.4}M${x + 18} ${y + 64}h${w * 0.65}M${x + 18} ${y + 82}h${w * 0.3}`} stroke={L} strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      <rect x={x + w - 80} y={y + 40} width="60" height={Math.max(30, h - 70)} rx="5" fill={L} fillOpacity="0.14" stroke={L} strokeOpacity="0.4" />
    </g>
  );
  return (
    <>
      {win(380, 90, 280, 170, 0, 0.04)}
      {win(450, 170, 280, 170, 0.8, 0.07)}
      {win(500, 250, 240, 140, 1.6, 0.11)}
      <g className="a-float" style={o(1, 0.4)} fill="none" stroke={L} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M352 150l-26 22 26 22M402 150l26 22-26 22" strokeOpacity="0.8" />
        <path d="M762 330l-22 18 22 18M802 330l22 18-22 18" strokeOpacity="0.5" transform="translate(-60 -10)" />
      </g>
      {dots([[360, 300], [770, 120, 3.4], [330, 350], [790, 250]])}
      <Rise x={560} y={410} n={8} spread={300} />
    </>
  );
};

/* ---------- 5 · DevOps & Infrastructure ---------- */
const DevOps = () => {
  const path = "M540 230C600 130 700 130 700 230S600 330 540 230 480 130 380 130 380 330 480 330 480 330 540 230";
  const loop = "M540 230C590 150 680 150 680 230S590 310 540 230 490 150 400 150 400 310 490 310 540 310 540 230";
  void path;
  const nodes: [number, number, string][] = [[400, 150, "build"], [490, 310, "test"], [680, 230, "ship"], [590, 150, "plan"]];
  return (
    <>
      <path d={loop} fill="none" stroke={L} strokeOpacity="0.35" strokeWidth="1.5" />
      <path className="a-dash" d={loop} fill="none" stroke={L} strokeOpacity="0.8" strokeDasharray="4 12" />
      {[0, 2.3, 4.6].map((d) => (
        <circle key={d} r="4.5" fill={L}>
          <animateMotion dur="7s" begin={`${d}s`} repeatCount="indefinite" path={loop} />
        </circle>
      ))}
      {nodes.map(([x, y, l], i) => (
        <g key={l} className="a-float" style={o(1, i * 0.6)}>
          <rect x={x - 26} y={y - 20} width="52" height="40" rx="8" fill="#0a0a0a" stroke={L} strokeOpacity="0.8" />
          <text x={x} y={y + 4} fill={L} fontSize="10" textAnchor="middle" fontFamily="monospace" letterSpacing="1.5">{l.toUpperCase()}</text>
        </g>
      ))}
      <g className="a-spin" style={{ transformOrigin: "540px 230px", animationDuration: "30s" }} stroke={L} fill="none" strokeOpacity="0.7" strokeWidth="1.6">
        <circle cx="540" cy="230" r="14" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="540" y1="208" x2="540" y2="200" transform={`rotate(${a} 540 230)`} />)}
      </g>
      <Slab cx={540} cy={390} w={380} h={90} t={10} fill={0.08} />
      {dots([[350, 90], [720, 110, 3.4], [740, 330], [340, 370, 3.4]])}
    </>
  );
};

/* ---------- 6 · IT Consulting ---------- */
const Consulting = () => (
  <>
    {[0, 1, 2, 3, 4].map((i) => {
      const h = 60 + i * 38, x = 400 + i * 60;
      return (
        <g key={i} className="a-float" style={o(1, i * 0.35)}>
          <rect x={x} y={330 - h} width="40" height={h} rx="4" fill={L} fillOpacity={0.07 + i * 0.03} stroke={L} strokeOpacity="0.55" />
          <path d={`M${x} ${330 - h + 14}H${x + 40}`} stroke={L} strokeOpacity="0.3" />
        </g>
      );
    })}
    <path className="a-dash" d="M410 250L470 215L530 190L590 135L650 100" fill="none" stroke={L} strokeWidth="2" strokeDasharray="6 6" />
    {dots([[410, 250, 4.5], [470, 215, 4.5], [530, 190, 4.5], [590, 135, 4.5], [650, 100, 6]])}
    <g className="a-pulse" style={o(1)} fill="none" stroke={L}>
      <circle cx="650" cy="100" r="22" strokeOpacity="0.6" />
      <circle cx="650" cy="100" r="38" strokeOpacity="0.25" />
    </g>
    <path d="M385 335H715" stroke={L} strokeOpacity="0.5" />
    {dots([[360, 120], [740, 250, 3.4], [370, 300], [720, 160]])}
    <Rise x={540} y={380} n={6} spread={320} />
  </>
);

/* ---------- 7 · Technical Support ---------- */
const Support = () => (
  <>
    {[60, 100, 140, 180].map((r, i) => (
      <circle key={r} className="a-ping" cx="540" cy="230" r={r} fill="none" stroke={L} strokeOpacity="0.25" style={o(1, i * 0.8)} />
    ))}
    <g className="a-spin" style={{ transformOrigin: "540px 230px", animationDuration: "40s" }}>
      <circle cx="540" cy="230" r="90" fill="none" stroke={L} strokeOpacity="0.6" strokeWidth="18" strokeDasharray="70 70.7" />
      <circle cx="540" cy="230" r="99" fill="none" stroke={L} strokeOpacity="0.5" />
      <circle cx="540" cy="230" r="81" fill="none" stroke={L} strokeOpacity="0.5" />
    </g>
    <g className="a-pulse" style={o(1)}>
      <path d="M500 200h80a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12h-44l-22 18v-18h-14a12 12 0 0 1-12-12v-34a12 12 0 0 1 12-12z" fill="#0a0a0a" stroke={L} strokeWidth="1.6" />
      <path d="M512 222h56M512 238h34" stroke={L} strokeWidth="2" strokeLinecap="round" />
    </g>
    <g className="a-float" style={o(1, 0.6)}>
      <path d="M690 130l12 12-40 40-12-12z M700 120a14 14 0 0 1 14 22" fill="none" stroke={L} strokeOpacity="0.8" strokeWidth="1.6" strokeLinejoin="round" />
    </g>
    {dots([[390, 140], [700, 320, 3.4], [380, 320, 3.4], [740, 220]])}
  </>
);

const scenes = [Cloud, Identity, M365, AI, WebDev, DevOps, Consulting, Support];
export const sceneForCategory = (c: string) => {
  const k = c.toLowerCase();
  if (k.includes("identity")) return 1;
  if (k.includes("microsoft")) return 2;
  if (k === "ai") return 3;
  if (k.includes("automation")) return 3;
  if (k.includes("devops")) return 5;
  return 0; // Cloud, AWS, Cloud Computing
};

export function ServiceArt({ scene = 0, className = "" }: { scene?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const Scene = scenes[((scene % 8) + 8) % 8];
  return (
    <svg className={className} viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`gl${id}`} cx="68%" cy="46%" r="55%">
          <stop offset="0" stopColor={L} stopOpacity="0.2" />
          <stop offset="0.6" stopColor={L} stopOpacity="0.04" />
          <stop offset="1" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
        <pattern id={`pt${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.035" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#0f0f10" />
      <rect width="800" height="500" fill={`url(#pt${id})`} />
      <rect width="800" height="500" fill={`url(#gl${id})`} />
      <Scene />
    </svg>
  );
}
