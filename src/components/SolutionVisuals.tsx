"use client";

/* Abstract conceptual visuals for the seven GoGreen solution areas.
   Pure SVG/CSS — no photographs, no literal illustrations, no icon libraries.
   All looping motion is slow and subtle and disabled under
   `prefers-reduced-motion`. The `ns` prop keeps SVG ids unique when several
   visuals are mounted at once (desktop transitions + mobile accordion). */

export type VisualProps = { reduced: boolean; ns: string };

const GREEN = "#16a34a";
const GREEN_DEEP = "#15803d";
const GREEN_SOFT = "#4ade80";
const INK = "rgba(71,85,105,0.88)";
const SPINE = "rgba(22,163,74,0.42)";
const FAINT = "rgba(22,163,74,0.14)";
const SLATE = "rgba(148,163,184,0.55)";

const FONT = {
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  fontWeight: 700,
} as const;

function Tag({
  x,
  y,
  children,
  anchor = "middle",
  size = 10.5,
  ls = 2,
  fill = INK,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
  ls?: number;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      letterSpacing={ls}
      fill={fill}
      {...FONT}
    >
      {children}
    </text>
  );
}

function N({ x, y, r = 3.2, fill = GREEN }: { x: number; y: number; r?: number; fill?: string }) {
  return <circle cx={x} cy={y} r={r} fill={fill} />;
}

function ArrowDef({ ns }: { ns: string }) {
  return (
    <defs>
      <marker
        id={`${ns}-arr`}
        viewBox="0 0 8 8"
        markerWidth="5"
        markerHeight="5"
        refX="5.6"
        refY="4"
        orient="auto"
      >
        <path d="M0 0 L8 4 L0 8 z" fill={GREEN} />
      </marker>
    </defs>
  );
}

/* A small point of light travelling along an existing path id. */
function Traveller({
  pathId,
  dur,
  begin = "0s",
  ns,
  reduced,
}: {
  pathId: string;
  dur: string;
  begin?: string;
  ns: string;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <g>
      <circle r="6.5" fill={GREEN_SOFT} opacity="0.3">
        <animateMotion dur={dur} repeatCount="indefinite" begin={begin} rotate="0">
          <mpath href={`#${ns}-${pathId}`} />
        </animateMotion>
      </circle>
      <circle r="3" fill={GREEN_SOFT}>
        <animateMotion dur={dur} repeatCount="indefinite" begin={begin} rotate="0">
          <mpath href={`#${ns}-${pathId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

/* 01 — CIRCULAR ECONOMY: continuous circular flow
   RESOURCE → RECOVERY → PROCESS → VALUE → RESOURCE */
export function CircularFlowVisual({ reduced, ns }: VisualProps) {
  const cx = 260;
  const cy = 130;
  const R = 84;
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      <circle
        id={`${ns}-ring`}
        cx={cx}
        cy={cy}
        r={R}
        fill="none"
        stroke={SPINE}
        strokeWidth="1.3"
        strokeDasharray="3 8"
        className="pillar-spin"
      />
      <circle cx={cx} cy={cy} r="30" fill="none" stroke={SLATE} strokeWidth="1" strokeDasharray="1 6" />
      <g fill="none" stroke={GREEN} strokeWidth="1.1">
        <path d="M260 58 A72 72 0 0 1 332 130" markerEnd={`url(#${ns}-arr)`} />
        <path d="M332 130 A72 72 0 0 1 260 202" markerEnd={`url(#${ns}-arr)`} />
        <path d="M260 202 A72 72 0 0 1 188 130" markerEnd={`url(#${ns}-arr)`} />
        <path d="M188 130 A72 72 0 0 1 260 58" markerEnd={`url(#${ns}-arr)`} />
      </g>
      <Traveller pathId="ring" dur="13s" ns={ns} reduced={reduced} />
      <N x={cx} y={42} />
      <N x={342} y={130} />
      <N x={cx} y={218} />
      <N x={178} y={130} />
      <Tag x={cx} y={28}>RESOURCE</Tag>
      <Tag x={354} y={134} anchor="start" ls={1.8}>RECOVERY</Tag>
      <Tag x={cx} y={236}>PROCESS</Tag>
      <Tag x={166} y={134} anchor="end" ls={1.8}>VALUE</Tag>
      <Tag x={cx} y={136} size={9} ls={3} fill={GREEN_DEEP}>CIRCULAR VALUE</Tag>
    </svg>
  );
}

/* 02 — RENEWABLE ENERGY: abstract solar line
   SUN → SOLAR → ELECTRICITY → PRODUCTIVE USE */
export function SolarVisual({ reduced, ns }: VisualProps) {
  const path =
    "M110 130 C 150 116 168 144 208 130 C 248 116 288 144 318 130 C 352 116 402 144 452 130";
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      <path id={`${ns}-line`} d={path} fill="none" stroke={SPINE} strokeWidth="1.4" strokeLinecap="round" />
      <path
        pathLength={1}
        strokeDasharray="0.45 0.55"
        d={path}
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1.7"
        strokeLinecap="round"
        className="pillar-flow"
        markerEnd={`url(#${ns}-arr)`}
      />
      <Traveller pathId="line" dur="9s" ns={ns} reduced={reduced} />

      {/* sun disc + soft pulse */}
      <circle cx="82" cy="130" r="14" fill="none" stroke={GREEN} strokeWidth="1.6" />
      <circle cx="82" cy="130" r="12" fill={GREEN_SOFT} opacity="0.12" className="pillar-pulse" />
      {[0, 45, 90, 135].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={82 + 19 * Math.cos(rad)}
            y1={130 + 19 * Math.sin(rad)}
            x2={82 + 25 * Math.cos(rad)}
            y2={130 + 25 * Math.sin(rad)}
            stroke={GREEN}
            strokeWidth="1.4"
          />
        );
      })}

      {/* abstract solar panel */}
      <rect x="194" y="117" width="28" height="26" rx="3" fill={FAINT} />
      <g stroke={GREEN_DEEP} strokeWidth="0.8" opacity="0.8">
        <line x1="203.7" y1="117" x2="203.7" y2="143" />
        <line x1="212.3" y1="117" x2="212.3" y2="143" />
        <line x1="221" y1="117" x2="221" y2="143" />
        <line x1="194" y1="130" x2="222" y2="130" />
      </g>

      <N x={318} y={130} />
      <N x={452} y={130} r={3.6} />
      <Tag x={82} y={166}>SUN</Tag>
      <Tag x={208} y={166}>SOLAR</Tag>
      <Tag x={318} y={166}>ELECTRICITY</Tag>
      <Tag x={452} y={166} size={9.5} ls={1.5}>PRODUCTIVE USE</Tag>
    </svg>
  );
}

/* 03 — MOBILITY: abstract charging network
   SOLAR → CHARGING → ELECTRIC MOBILITY */
export function MobilityVisual({ reduced, ns }: VisualProps) {
  const path = "M132 96 C 190 96 198 150 262 150 C 330 150 342 108 404 96";
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      <path id={`${ns}-line`} d={path} fill="none" stroke={SPINE} strokeWidth="1.4" strokeLinecap="round" />
      <path
        pathLength={1}
        strokeDasharray="0.45 0.55"
        d={path}
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1.7"
        strokeLinecap="round"
        className="pillar-flow"
        markerEnd={`url(#${ns}-arr)`}
      />
      <Traveller pathId="line" dur="8s" ns={ns} reduced={reduced} />

      {/* solar */}
      <circle cx="132" cy="96" r="11" fill="none" stroke={GREEN} strokeWidth="1.5" />
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={132 + 15 * Math.cos(rad)}
            y1={96 + 15 * Math.sin(rad)}
            x2={132 + 19 * Math.cos(rad)}
            y2={96 + 19 * Math.sin(rad)}
            stroke={GREEN}
            strokeWidth="1.3"
          />
        );
      })}

      {/* charging station abstraction that illuminates */}
      <rect x="250" y="139" width="24" height="20" rx="3.5" fill={FAINT} stroke={SPINE} strokeWidth="1" />
      <line x1="256" y1="146" x2="268" y2="146" stroke={GREEN_DEEP} strokeWidth="1.2" opacity="0.8" />
      <line x1="262" y1="151" x2="262" y2="156" stroke={GREEN_DEEP} strokeWidth="1.2" opacity="0.8" />
      <circle cx="262" cy="149" r="26" fill="none" stroke={GREEN_SOFT} strokeWidth="1" opacity="0.5" className="pillar-pulse" />
      <circle cx="262" cy="149" r="13" fill="none" stroke={GREEN_SOFT} strokeWidth="0.9" opacity="0.4" />

      {/* electric mobility node with motion dashes */}
      <N x={404} y={96} r={3.6} />
      {[352, 368, 384].map((x) => (
        <line key={x} x1={x} y1={96} x2={x + 7} y2={96} stroke={SLATE} strokeWidth="1.3" strokeLinecap="round" />
      ))}

      <Tag x={132} y={80} ls={1.8}>SOLAR</Tag>
      <Tag x={262} y={184}>CHARGING</Tag>
      <Tag x={404} y={80} size={9.5} ls={1.5}>ELECTRIC MOBILITY</Tag>
    </svg>
  );
}

/* 04 — CLEAN COOKING: clean-energy flow
   ORGANIC WASTE → BIOENERGY → CLEAN COOKING */
export function CookingVisual({ reduced, ns }: VisualProps) {
  const path = "M112 160 C 176 160 186 96 262 96 C 338 96 348 160 416 160";
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      <path id={`${ns}-line`} d={path} fill="none" stroke={SPINE} strokeWidth="1.4" strokeLinecap="round" />
      <path
        pathLength={1}
        strokeDasharray="0.45 0.55"
        d={path}
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1.7"
        strokeLinecap="round"
        className="pillar-flow"
        markerEnd={`url(#${ns}-arr)`}
      />
      <Traveller pathId="line" dur="8s" ns={ns} reduced={reduced} />

      {/* organic waste node + residue ticks */}
      <N x={112} y={160} r={3.4} />
      <line x1="100" y1="172" x2="124" y2="172" stroke={SLATE} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="105" y1="177" x2="119" y2="177" stroke={SLATE} strokeWidth="1.2" strokeLinecap="round" />

      {/* bioenergy flame droplet */}
      <path
        d="M270 78 C 274 84 268 94 262 96 C 256 94 250 84 254 78 C 256 74 260 71 262 74 C 264 71 268 74 270 78 Z"
        fill={GREEN}
      />

      {/* abstract cookstove with rising energy wisp */}
      <rect x="400" y="146" width="32" height="24" rx="4" fill={FAINT} stroke={SPINE} strokeWidth="1" />
      <line x1="404" y1="152" x2="428" y2="152" stroke={GREEN_DEEP} strokeWidth="0.9" opacity="0.8" />
      <path
        d="M416 146 C 411 134 421 124 415 108"
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="1.5 5"
        className="pillar-flow"
      />

      <Tag x={112} y={194} size={9.5} ls={1.5}>ORGANIC WASTE</Tag>
      <Tag x={262} y={80} ls={1.8}>BIOENERGY</Tag>
      <Tag x={416} y={192} size={9.5} ls={1.5}>CLEAN COOKING</Tag>
    </svg>
  );
}

/* 05 — ALUMINIUM CAN: circular material loop
   CAN → COLLECTION → SORT → PROCESS → RECYCLING MARKET */
export function AluminiumVisual({ reduced, ns }: VisualProps) {
  const path =
    "M70 200 C 108 200 112 122 152 122 C 196 122 206 92 248 92 C 292 92 298 108 340 108 C 380 108 392 168 436 168";
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      <path id={`${ns}-line`} d={path} fill="none" stroke={SPINE} strokeWidth="1.4" strokeLinecap="round" />
      <path
        pathLength={1}
        strokeDasharray="0.45 0.55"
        d={path}
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1.7"
        strokeLinecap="round"
        className="pillar-flow"
        markerEnd={`url(#${ns}-arr)`}
      />
      <Traveller pathId="line" dur="11s" ns={ns} reduced={reduced} />

      {/* can abstraction */}
      <rect x="61" y="186" width="18" height="30" rx="9" fill={FAINT} stroke={SPINE} strokeWidth="1" />
      <line x1="68" y1="192" x2="88" y2="192" stroke={GREEN_DEEP} strokeWidth="0.8" opacity="0.8" />
      <line x1="64" y1="199" x2="76" y2="199" stroke={GREEN_DEEP} strokeWidth="0.8" opacity="0.8" />

      <N x={152} y={122} />
      <N x={248} y={92} />
      {/* circulating material around process */}
      <circle
        cx="340"
        cy="108"
        r="22"
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1"
        strokeDasharray="3 6"
        opacity="0.7"
        className="pillar-spin"
        style={{ transformOrigin: "340px 108px", transformBox: "view-box" }}
      />
      <N x={340} y={108} r={3.4} />
      <N x={436} y={168} r={3.6} />

      <Tag x={70} y={230} size={9.5}>CAN</Tag>
      <Tag x={152} y={106} ls={1.6}>COLLECTION</Tag>
      <Tag x={248} y={76} ls={1.6}>SORT</Tag>
      <Tag x={340} y={126} ls={1.6}>PROCESS</Tag>
      <Tag x={436} y={188} size={9} ls={1.4}>RECYCLING MARKET</Tag>
    </svg>
  );
}

/* 06 — CLIMATE-SMART WASTE: flow system
   SEGREGATE → COLLECT → RECOVER → RECYCLE → VALUE */
export function WasteVisual({ reduced, ns }: VisualProps) {
  const path =
    "M82 176 C 120 176 128 112 172 112 C 216 112 220 84 264 84 C 308 84 312 112 356 112 C 400 112 404 176 448 176";
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      <path id={`${ns}-line`} d={path} fill="none" stroke={SPINE} strokeWidth="1.4" strokeLinecap="round" />
      <path
        pathLength={1}
        strokeDasharray="0.45 0.55"
        d={path}
        fill="none"
        stroke={GREEN_SOFT}
        strokeWidth="1.7"
        strokeLinecap="round"
        className="pillar-flow"
        markerEnd={`url(#${ns}-arr)`}
      />
      {/* two resource particles travelling toward recovery */}
      <Traveller pathId="line" dur="9s" ns={ns} reduced={reduced} />
      <Traveller pathId="line" dur="9s" begin="3.5s" ns={ns} reduced={reduced} />

      <N x={82} y={176} r={3.4} />
      <N x={172} y={112} />
      {/* recovery focus: double reticule */}
      <circle cx="264" cy="84" r="18" fill="none" stroke={GREEN_SOFT} strokeWidth="1" opacity="0.6" className="pillar-pulse" />
      <path d="M246 84 A18 18 0 0 1 264 66" fill="none" stroke={GREEN_DEEP} strokeWidth="1" />
      <path d="M282 84 A18 18 0 0 1 264 66" fill="none" stroke={GREEN_DEEP} strokeWidth="1" opacity="0.6" />
      <N x={264} y={84} r={3.4} />
      <N x={356} y={112} />
      <N x={448} y={176} r={3.6} />

      <Tag x={82} y={196} size={9.5} ls={1.5}>SEGREGATE</Tag>
      <Tag x={172} y={96} ls={1.6}>COLLECT</Tag>
      <Tag x={264} y={68} ls={1.6}>RECOVER</Tag>
      <Tag x={356} y={96} ls={1.6}>RECYCLE</Tag>
      <Tag x={448} y={196} size={9.5} ls={1.6}>VALUE</Tag>
    </svg>
  );
}

/* 07 — COMMUNITY LIVELIHOODS: network
   PEOPLE → SKILLS → ENTERPRISE → INCOME → COMMUNITY */
export function LivelihoodVisual({ reduced, ns }: VisualProps) {
  const cx = 260;
  const cy = 132;
  const sat = [
    { x: 100, y: 62, label: "PEOPLE", dy: -14, delay: 0 },
    { x: 420, y: 62, label: "SKILLS", dy: -14, delay: 0.8 },
    { x: 100, y: 204, label: "ENTERPRISE", dy: 20, delay: 1.6 },
    { x: 420, y: 204, label: "INCOME", dy: 20, delay: 2.4 },
  ];
  return (
    <svg viewBox="0 0 520 260" aria-hidden="true" className="h-full w-full">
      <ArrowDef ns={ns} />
      {sat.map((s) => (
        <line
          key={s.label}
          x1={s.x}
          y1={s.y}
          x2={cx}
          y2={cy}
          stroke={GREEN_SOFT}
          strokeWidth="1"
          opacity="0.5"
          markerEnd={`url(#${ns}-arr)`}
          className="pillar-pulse"
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}
      {sat.map((s) => (
        <N key={s.label} x={s.x} y={s.y} r={3.2} />
      ))}
      {!reduced && (
        <g>
          <circle cx={cx} cy={cy} r="14" fill="none" stroke={GREEN_SOFT} strokeWidth="1" className="pillar-ring" />
          <circle cx={cx} cy={cy} r="14" fill="none" stroke={GREEN_SOFT} strokeWidth="1" className="pillar-ring" style={{ animationDelay: "2.2s" }} />
        </g>
      )}
      <N x={cx} y={cy} r={5} />
      <circle cx={cx} cy={cy} r="9" fill={GREEN} opacity="0.15" />

      {sat.map((s) => (
        <Tag key={s.label} x={s.x} y={s.y + s.dy}>{s.label}</Tag>
      ))}
      <Tag x={cx} y={162} size={9.5} ls={2}>COMMUNITY</Tag>
    </svg>
  );
}

export const solutionVisuals = [
  CircularFlowVisual,
  SolarVisual,
  MobilityVisual,
  CookingVisual,
  AluminiumVisual,
  WasteVisual,
  LivelihoodVisual,
];