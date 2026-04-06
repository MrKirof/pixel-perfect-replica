import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Shared animated elements ── */
const Pulse = ({ color, cx, cy, r = 4, delay = 0 }: { color: string; cx: number; cy: number; r?: number; delay?: number }) => (
  <>
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill={`hsl(${color})`}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill="none"
      stroke={`hsl(${color} / 0.4)`}
      strokeWidth={1}
      initial={{ r, opacity: 0.6 }}
      animate={{ r: r + 12, opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, delay }}
    />
  </>
);

const FloatingLine = ({ color, x1, y1, x2, y2, delay = 0 }: { color: string; x1: number; y1: number; x2: number; y2: number; delay?: number }) => (
  <motion.line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={`hsl(${color} / 0.3)`}
    strokeWidth={1}
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: [0, 0.6, 0.6, 0] }}
    transition={{ duration: 3, repeat: Infinity, delay, ease: "linear" }}
  />
);

/* ── 01: Brand & Identity ── */
const BrandInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Logo mark construction */}
    <motion.polygon
      points="100,20 140,50 140,90 100,120 60,90 60,50"
      fill="none"
      stroke={`hsl(${color} / 0.4)`}
      strokeWidth={1.5}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1, rotate: hovered ? 30 : 0 }}
      transition={{ pathLength: { duration: 2, ease }, rotate: { duration: 0.8 } }}
      style={{ transformOrigin: "100px 70px" }}
    />
    <motion.polygon
      points="100,35 130,55 130,85 100,105 70,85 70,55"
      fill={`hsl(${color} / 0.08)`}
      stroke={`hsl(${color} / 0.6)`}
      strokeWidth={1}
      animate={{ scale: hovered ? 1.1 : 1 }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "100px 70px" }}
    />
    {/* Color swatches */}
    {[0, 1, 2, 3].map(i => (
      <motion.rect
        key={i}
        x={30 + i * 38}
        y={125}
        width={12}
        height={12}
        rx={2}
        fill={`hsl(${color} / ${0.2 + i * 0.2})`}
        initial={{ y: 145, opacity: 0 }}
        animate={{ y: 125, opacity: 1 }}
        transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
      />
    ))}
    <Pulse color={color} cx={100} cy={70} r={3} />
    {/* Typography lines */}
    <motion.rect x={155} y={35} width={30} height={3} rx={1.5} fill={`hsl(${color} / 0.3)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.6 }} style={{ transformOrigin: "155px 36px" }} />
    <motion.rect x={155} y={45} width={22} height={2} rx={1} fill={`hsl(${color} / 0.2)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6 }} style={{ transformOrigin: "155px 46px" }} />
  </svg>
);

/* ── 02: UI/UX Design ── */
const UIUXInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Phone frame */}
    <motion.rect
      x={65} y={10} width={70} height={120} rx={10}
      fill="none"
      stroke={`hsl(${color} / 0.4)`}
      strokeWidth={1.5}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease }}
    />
    {/* Screen content */}
    <motion.rect x={72} y={28} width={56} height={8} rx={2} fill={`hsl(${color} / 0.15)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.5 }} style={{ transformOrigin: "72px 32px" }} />
    <motion.rect x={72} y={42} width={40} height={5} rx={1.5} fill={`hsl(${color} / 0.1)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.5 }} style={{ transformOrigin: "72px 44px" }} />
    <motion.rect x={72} y={52} width={56} height={30} rx={3} fill={`hsl(${color} / 0.06)`} stroke={`hsl(${color} / 0.2)`} strokeWidth={0.5}
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }} style={{ transformOrigin: "100px 67px" }} />
    {/* CTA button */}
    <motion.rect x={72} y={90} width={56} height={14} rx={7} fill={`hsl(${color} / 0.2)`}
      animate={hovered ? { fill: `hsl(${color} / 0.4)` } : {}}
      transition={{ duration: 0.3 }}
    />
    <motion.rect x={85} y={95} width={30} height={4} rx={2} fill={`hsl(${color} / 0.5)`} />
    {/* Cursor */}
    <motion.g
      animate={hovered ? { x: [0, 10, 10, 0], y: [0, 5, -5, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <motion.path
        d="M145 60 L145 75 L150 70 L158 78"
        fill="none"
        stroke={`hsl(${color})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.g>
    {/* Notch */}
    <rect x={88} y={14} width={24} height={4} rx={2} fill={`hsl(${color} / 0.15)`} />
  </svg>
);

/* ── 03: Web & App Dev ── */
const WebDevInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Browser window */}
    <motion.rect x={25} y={15} width={150} height={110} rx={6} fill="none" stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease }} />
    <line x1={25} y1={35} x2={175} y2={35} stroke={`hsl(${color} / 0.2)`} strokeWidth={1} />
    {/* Browser dots */}
    {[0, 1, 2].map(i => (
      <circle key={i} cx={38 + i * 12} cy={25} r={3} fill={`hsl(${color} / ${0.2 + i * 0.1})`} />
    ))}
    {/* Code lines */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.rect
        key={i}
        x={35 + (i % 3) * 8}
        y={45 + i * 14}
        width={30 + Math.sin(i * 2) * 20 + 20}
        height={4}
        rx={2}
        fill={`hsl(${color} / ${0.08 + (i % 3) * 0.06})`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
        style={{ transformOrigin: `${35 + (i % 3) * 8}px ${47 + i * 14}px` }}
      />
    ))}
    {/* Blinking cursor */}
    <motion.rect
      x={35} y={115} width={2} height={8} fill={`hsl(${color})`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    {/* Deployment arrow */}
    <motion.path
      d="M160 70 L185 70 M180 65 L185 70 L180 75"
      fill="none" stroke={`hsl(${color} / 0.5)`} strokeWidth={1.5} strokeLinecap="round"
      animate={hovered ? { x: [0, 5, 0] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </svg>
);

/* ── 04: Catalog & Profile ── */
const CatalogInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Open book */}
    <motion.path
      d="M100 25 Q60 20 30 30 L30 115 Q60 105 100 110"
      fill={`hsl(${color} / 0.04)`} stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease }}
    />
    <motion.path
      d="M100 25 Q140 20 170 30 L170 115 Q140 105 100 110"
      fill={`hsl(${color} / 0.06)`} stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2, ease }}
    />
    <line x1={100} y1={25} x2={100} y2={110} stroke={`hsl(${color} / 0.2)`} strokeWidth={1} />
    {/* Text lines left */}
    {[0, 1, 2, 3].map(i => (
      <motion.rect key={`l${i}`} x={42} y={45 + i * 14} width={45 - i * 5} height={3} rx={1.5}
        fill={`hsl(${color} / 0.15)`}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
        style={{ transformOrigin: `42px ${46 + i * 14}px` }}
      />
    ))}
    {/* Image block right */}
    <motion.rect x={112} y={42} width={45} height={30} rx={3} fill={`hsl(${color} / 0.1)`} stroke={`hsl(${color} / 0.2)`} strokeWidth={0.5}
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.5 }}
      style={{ transformOrigin: "134px 57px" }}
    />
    {/* Text lines right */}
    {[0, 1].map(i => (
      <motion.rect key={`r${i}`} x={112} y={82 + i * 12} width={40 - i * 8} height={3} rx={1.5}
        fill={`hsl(${color} / 0.12)`}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
        style={{ transformOrigin: `112px ${83 + i * 12}px` }}
      />
    ))}
    {/* Page flip animation */}
    <motion.path
      d="M100 25 Q120 22 135 28 L135 100 Q120 94 100 97"
      fill={`hsl(${color} / 0.03)`} stroke={`hsl(${color} / 0.15)`} strokeWidth={0.5}
      animate={hovered ? { rotateY: [0, -30, 0], opacity: [0, 0.6, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: "100px 60px" }}
    />
  </svg>
);

/* ── 05: Merchandise Design ── */
const MerchInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* T-shirt outline */}
    <motion.path
      d="M70 30 L55 40 L40 35 L50 60 L60 55 L60 115 L140 115 L140 55 L150 60 L160 35 L145 40 L130 30 Q115 22 100 25 Q85 22 70 30Z"
      fill={`hsl(${color} / 0.05)`}
      stroke={`hsl(${color} / 0.35)`}
      strokeWidth={1.5}
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease }}
    />
    {/* Logo on shirt */}
    <motion.circle cx={100} cy={72} r={15} fill="none" stroke={`hsl(${color} / 0.3)`} strokeWidth={1}
      animate={hovered ? { scale: [1, 1.15, 1], stroke: `hsl(${color} / 0.6)` } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ transformOrigin: "100px 72px" }}
    />
    <motion.text x={100} y={76} textAnchor="middle" fontSize={10} fontWeight="bold" fill={`hsl(${color} / 0.5)`}
      animate={hovered ? { fill: `hsl(${color})` } : {}}
    >
      MR
    </motion.text>
    {/* Color options */}
    {[0, 1, 2].map(i => (
      <motion.circle key={i} cx={82 + i * 18} cy={128} r={5}
        fill={`hsl(${color} / ${0.15 + i * 0.15})`}
        stroke={`hsl(${color} / 0.3)`} strokeWidth={i === 1 ? 2 : 0.5}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + i * 0.1, duration: 0.3, ease }}
        style={{ transformOrigin: `${82 + i * 18}px 128px` }}
      />
    ))}
  </svg>
);

/* ── 06: Magazine & Book ── */
const MagazineInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Stacked magazines */}
    <motion.rect x={55} y={25} width={90} height={95} rx={3} fill={`hsl(${color} / 0.03)`} stroke={`hsl(${color} / 0.15)`} strokeWidth={1}
      initial={{ y: 35, opacity: 0 }} animate={{ y: 25, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
    />
    <motion.rect x={50} y={20} width={90} height={95} rx={3} fill={`hsl(${color} / 0.05)`} stroke={`hsl(${color} / 0.2)`} strokeWidth={1}
      initial={{ y: 30, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
    />
    <motion.rect x={45} y={15} width={90} height={95} rx={3} fill={`hsl(${color} / 0.08)`} stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5}
      initial={{ y: 25, opacity: 0 }} animate={{ y: 15, opacity: 1 }} transition={{ duration: 0.5 }}
    />
    {/* Cover content */}
    <motion.rect x={55} y={25} width={70} height={8} rx={2} fill={`hsl(${color} / 0.2)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.5 }} style={{ transformOrigin: "55px 29px" }} />
    <motion.rect x={55} y={38} width={35} height={35} rx={2} fill={`hsl(${color} / 0.1)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }} />
    <motion.rect x={95} y={40} width={28} height={3} rx={1.5} fill={`hsl(${color} / 0.12)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8 }} style={{ transformOrigin: "95px 41px" }} />
    <motion.rect x={95} y={48} width={22} height={3} rx={1.5} fill={`hsl(${color} / 0.08)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9 }} style={{ transformOrigin: "95px 49px" }} />
    {/* Page count */}
    <motion.text x={90} y={100} textAnchor="middle" fontSize={8} fill={`hsl(${color} / 0.3)`}
      animate={hovered ? { fill: `hsl(${color} / 0.6)` } : {}}
    >
      60 Pages
    </motion.text>
    {/* Floating spread animation */}
    <motion.rect x={148} y={30} width={30} height={40} rx={2} fill={`hsl(${color} / 0.04)`} stroke={`hsl(${color} / 0.15)`} strokeWidth={0.5}
      animate={hovered ? { x: [148, 155, 148], rotate: [0, 5, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ transformOrigin: "148px 50px" }}
    />
  </svg>
);

/* ── 07: Motion Graphics ── */
const MotionInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Play button center */}
    <motion.circle cx={100} cy={65} r={28} fill={`hsl(${color} / 0.08)`} stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5}
      animate={hovered ? { scale: 1.1 } : { scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ transformOrigin: "100px 65px" }}
    />
    <motion.polygon points="92,52 92,78 115,65" fill={`hsl(${color} / 0.5)`}
      animate={hovered ? { fill: `hsl(${color})` } : {}}
      transition={{ duration: 0.3 }}
    />
    {/* Pulse rings */}
    {[0, 1, 2].map(i => (
      <motion.circle key={i} cx={100} cy={65} r={28} fill="none" stroke={`hsl(${color} / 0.15)`} strokeWidth={1}
        animate={{ r: [28, 28 + (i + 1) * 15], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
    {/* Timeline bar */}
    <motion.rect x={30} y={110} width={140} height={4} rx={2} fill={`hsl(${color} / 0.1)`} />
    <motion.rect x={30} y={110} width={0} height={4} rx={2} fill={`hsl(${color} / 0.4)`}
      animate={{ width: [0, 140] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    {/* Playhead */}
    <motion.circle cy={112} r={5} fill={`hsl(${color})`}
      animate={{ cx: [30, 170] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    {/* Frame markers */}
    {[0, 1, 2, 3, 4, 5, 6].map(i => (
      <rect key={i} x={30 + i * 23} y={118} width={1} height={4} fill={`hsl(${color} / 0.2)`} />
    ))}
    {/* Motion trails */}
    <motion.path d="M40 40 Q60 30 80 40" fill="none" stroke={`hsl(${color} / 0.2)`} strokeWidth={1} strokeDasharray="4 4"
      animate={hovered ? { strokeDashoffset: [0, -20] } : {}}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <motion.path d="M120 40 Q140 30 160 40" fill="none" stroke={`hsl(${color} / 0.2)`} strokeWidth={1} strokeDasharray="4 4"
      animate={hovered ? { strokeDashoffset: [0, -20] } : {}}
      transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.3 }}
    />
  </svg>
);

/* ── 08: Product Marketing ── */
const MarketingInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Growth chart */}
    <motion.path
      d="M30 110 L60 85 L90 90 L120 55 L150 40 L170 25"
      fill="none" stroke={`hsl(${color})`} strokeWidth={2} strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease }}
    />
    {/* Area fill under curve */}
    <motion.path
      d="M30 110 L60 85 L90 90 L120 55 L150 40 L170 25 L170 110 Z"
      fill={`hsl(${color} / 0.06)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    />
    {/* Data points */}
    {[[60, 85], [90, 90], [120, 55], [150, 40], [170, 25]].map(([cx, cy], i) => (
      <Pulse key={i} color={color} cx={cx} cy={cy} r={3} delay={0.5 + i * 0.3} />
    ))}
    {/* Axis */}
    <line x1={30} y1={110} x2={30} y2={20} stroke={`hsl(${color} / 0.15)`} strokeWidth={1} />
    <line x1={30} y1={110} x2={175} y2={110} stroke={`hsl(${color} / 0.15)`} strokeWidth={1} />
    {/* Arrow at peak */}
    <motion.g animate={hovered ? { y: [0, -5, 0] } : {}} transition={{ duration: 1, repeat: Infinity }}>
      <motion.path d="M170 20 L175 12 L165 12 Z" fill={`hsl(${color} / 0.5)`}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.5 }}
      />
    </motion.g>
    {/* +180% label */}
    <motion.text x={155} y={10} fontSize={9} fontWeight="bold" fill={`hsl(${color} / 0.6)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
    >
      +180%
    </motion.text>
    {/* Grid lines */}
    {[0, 1, 2].map(i => (
      <line key={i} x1={30} y1={40 + i * 25} x2={175} y2={40 + i * 25} stroke={`hsl(${color} / 0.05)`} strokeWidth={1} />
    ))}
  </svg>
);

/* ── 09: SEO ── */
const SEOInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Magnifying glass */}
    <motion.circle cx={80} cy={55} r={25} fill="none" stroke={`hsl(${color} / 0.4)`} strokeWidth={2}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease }}
    />
    <motion.line x1={99} y1={74} x2={118} y2={93} stroke={`hsl(${color} / 0.4)`} strokeWidth={3} strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5, ease }}
    />
    {/* Search results inside glass */}
    {[0, 1, 2].map(i => (
      <motion.rect key={i} x={63} y={42 + i * 12} width={34 - i * 6} height={4} rx={2}
        fill={`hsl(${color} / ${0.3 - i * 0.08})`}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
        style={{ transformOrigin: `63px ${44 + i * 12}px` }}
      />
    ))}
    {/* Ranking bars */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.rect key={i} x={135} y={30 + i * 18} width={0} height={10} rx={2}
        fill={`hsl(${color} / ${i === 0 ? 0.5 : 0.12})`}
        animate={{ width: [0, 45 - i * 6] }}
        transition={{ delay: 1.2 + i * 0.15, duration: 0.6, ease }}
      />
    ))}
    {/* #1 badge */}
    <motion.text x={130} y={40} fontSize={8} fontWeight="bold" fill={`hsl(${color} / 0.5)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
    >
      #1
    </motion.text>
    {/* Rising arrow */}
    <motion.path d="M155 115 L155 105 L165 105" fill="none" stroke={`hsl(${color})`} strokeWidth={1.5} strokeLinecap="round"
      animate={hovered ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <FloatingLine color={color} x1={30} y1={120} x2={175} y2={120} />
  </svg>
);

/* ── 10: Excel & Sheets ── */
const ExcelInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Grid/spreadsheet */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.line key={`h${i}`} x1={35} y1={25 + i * 22} x2={165} y2={25 + i * 22}
        stroke={`hsl(${color} / 0.12)`} strokeWidth={0.5}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: i * 0.08, duration: 0.5 }}
        style={{ transformOrigin: "35px" }}
      />
    ))}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.line key={`v${i}`} x1={35 + i * 32.5} y1={25} x2={35 + i * 32.5} y2={113}
        stroke={`hsl(${color} / 0.12)`} strokeWidth={0.5}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
        style={{ transformOrigin: `${35 + i * 32.5}px 25px` }}
      />
    ))}
    {/* Cell data */}
    {[[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2], [3, 0], [3, 1], [3, 2]].map(([col, row], i) => (
      <motion.rect key={i}
        x={40 + col * 32.5} y={30 + row * 22}
        width={22} height={8} rx={1.5}
        fill={`hsl(${color} / ${row === 0 ? 0.2 : 0.08})`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
        style={{ transformOrigin: `${51 + col * 32.5}px ${34 + row * 22}px` }}
      />
    ))}
    {/* Chart preview */}
    <motion.rect x={40} y={92} width={120} height={18} rx={3} fill={`hsl(${color} / 0.04)`} stroke={`hsl(${color} / 0.15)`} strokeWidth={0.5} />
    {[0, 1, 2, 3, 4, 5].map(i => (
      <motion.rect key={`bar${i}`}
        x={48 + i * 18} y={100}
        width={8} height={0}
        fill={`hsl(${color} / ${0.15 + i * 0.05})`}
        animate={{ height: [0, 4 + i * 1.5], y: [108, 108 - (4 + i * 1.5)] }}
        transition={{ delay: 1 + i * 0.1, duration: 0.5, ease }}
      />
    ))}
    {/* Sparkline */}
    <motion.path d="M40 125 L60 120 L80 128 L100 115 L120 118 L140 108 L160 112"
      fill="none" stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5} strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ delay: 1.5, duration: 1, ease }}
    />
  </svg>
);

/* ── 11: Accounts Management ── */
const AccountsInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Dollar/money icon */}
    <motion.circle cx={100} cy={50} r={25} fill={`hsl(${color} / 0.06)`} stroke={`hsl(${color} / 0.25)`} strokeWidth={1.5}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease }}
      style={{ transformOrigin: "100px 50px" }}
    />
    <motion.text x={100} y={56} textAnchor="middle" fontSize={22} fontWeight="bold" fill={`hsl(${color} / 0.5)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
    >
      $
    </motion.text>
    {/* Flowing money lines */}
    {[0, 1, 2].map(i => (
      <motion.path key={i}
        d={`M${60 + i * 20} 80 Q${70 + i * 20} ${95 + i * 5} ${60 + i * 20} 115`}
        fill="none" stroke={`hsl(${color} / 0.2)`} strokeWidth={1} strokeDasharray="4 6"
        animate={hovered ? { strokeDashoffset: [0, -20] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
      />
    ))}
    {/* Pie chart segments */}
    <motion.path d="M160 55 L160 30 A25 25 0 0 1 180 55 Z" fill={`hsl(${color} / 0.2)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
    />
    <motion.path d="M160 55 L180 55 A25 25 0 0 1 150 75 Z" fill={`hsl(${color} / 0.12)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
    />
    <motion.path d="M160 55 L150 75 A25 25 0 0 1 160 30 Z" fill={`hsl(${color} / 0.06)`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
    />
    {/* Invoice lines */}
    <motion.rect x={20} y={90} width={55} height={40} rx={3} fill="none" stroke={`hsl(${color} / 0.2)`} strokeWidth={1}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
    />
    {[0, 1, 2].map(i => (
      <motion.rect key={i} x={27} y={98 + i * 9} width={35 - i * 8} height={3} rx={1.5}
        fill={`hsl(${color} / 0.12)`}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 1 + i * 0.1, duration: 0.3 }}
        style={{ transformOrigin: `27px ${99 + i * 9}px` }}
      />
    ))}
    {/* Checkmark */}
    <motion.path d="M56 120 L62 126 L72 113" fill="none" stroke={`hsl(${color})`} strokeWidth={2} strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    />
  </svg>
);

/* ── 12: Video Production ── */
const VideoInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Camera body */}
    <motion.rect x={40} y={35} width={80} height={55} rx={6} fill={`hsl(${color} / 0.06)`} stroke={`hsl(${color} / 0.25)`} strokeWidth={1.5}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease }}
      style={{ transformOrigin: "80px 62px" }}
    />
    {/* Lens */}
    <motion.circle cx={80} cy={58} r={18} fill="none" stroke={`hsl(${color} / 0.3)`} strokeWidth={1.5}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.5, ease }}
      style={{ transformOrigin: "80px 58px" }}
    />
    <motion.circle cx={80} cy={58} r={10} fill={`hsl(${color} / 0.1)`} stroke={`hsl(${color} / 0.2)`} strokeWidth={1}
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, duration: 0.5, ease }}
      style={{ transformOrigin: "80px 58px" }}
    />
    {/* Play button */}
    <motion.path d="M76 53 L86 58 L76 63 Z" fill={`hsl(${color} / 0.5)`}
      animate={hovered ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ transformOrigin: "80px 58px" }}
    />
    {/* Film reel strips */}
    {[0, 1, 2, 3].map(i => (
      <motion.rect key={i} x={140} y={38 + i * 14} width={30} height={10} rx={2}
        fill={`hsl(${color} / ${0.08 + i * 0.04})`}
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
        style={{ transformOrigin: `140px ${43 + i * 14}px` }}
      />
    ))}
    {/* Timeline bar */}
    <motion.rect x={30} y={105} width={140} height={4} rx={2} fill={`hsl(${color} / 0.1)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
      style={{ transformOrigin: "30px 107px" }}
    />
    <motion.rect x={30} y={105} width={90} height={4} rx={2} fill={`hsl(${color} / 0.3)`}
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.5 }}
      style={{ transformOrigin: "30px 107px" }}
    />
    {/* Playhead */}
    <motion.circle cx={120} cy={107} r={5} fill={`hsl(${color})`}
      animate={hovered ? { cx: [60, 150, 60] } : { cx: 120 }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <Pulse color={color} cx={25} cy={30} r={3} delay={0.5} />
  </svg>
);

/* ── 13: Digital Marketing ── */
const DigitalMarketingInfographic = ({ color, hovered }: { color: string; hovered: boolean }) => (
  <svg viewBox="0 0 200 140" className="w-full h-full">
    {/* Rising bar chart */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.rect key={i} x={25 + i * 22} y={100 - (20 + i * 15)} width={16} height={20 + i * 15} rx={3}
        fill={`hsl(${color} / ${0.1 + i * 0.06})`} stroke={`hsl(${color} / 0.2)`} strokeWidth={0.5}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ delay: i * 0.12, duration: 0.5, ease }}
        style={{ transformOrigin: `${33 + i * 22}px 100px` }}
      />
    ))}
    {/* Growth arrow */}
    <motion.path d="M30 85 L55 65 L77 50 L100 35 L120 22" fill="none" stroke={`hsl(${color})`} strokeWidth={2} strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ delay: 0.8, duration: 0.8, ease }}
    />
    <motion.path d="M115 18 L122 22 L116 28" fill="none" stroke={`hsl(${color})`} strokeWidth={2} strokeLinecap="round"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
    />
    {/* Social/channel icons - circles */}
    {[0, 1, 2].map(i => (
      <motion.circle key={i} cx={150 + i * 18} cy={35 + i * 20} r={8}
        fill={`hsl(${color} / 0.08)`} stroke={`hsl(${color} / 0.25)`} strokeWidth={1}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1 + i * 0.15, duration: 0.4, ease }}
        style={{ transformOrigin: `${150 + i * 18}px ${35 + i * 20}px` }}
      />
    ))}
    {/* Connection lines between channels */}
    <FloatingLine color={color} x1={155} y1={42} x2={163} y2={50} delay={1.3} />
    <FloatingLine color={color} x1={173} y1={62} x2={180} y2={70} delay={1.5} />
    {/* Conversion funnel */}
    <motion.path d="M140 90 L160 90 L155 110 L145 110 Z" fill={`hsl(${color} / 0.1)`} stroke={`hsl(${color} / 0.2)`} strokeWidth={1}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
    />
    {/* Funnel drops */}
    {[0, 1, 2].map(i => (
      <motion.circle key={i} cx={150} cy={115 + i * 6} r={1.5} fill={`hsl(${color} / 0.4)`}
        animate={hovered ? { y: [0, 8, 0], opacity: [0.4, 1, 0.4] } : {}}
        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
      />
    ))}
    <Pulse color={color} cx={30} cy={25} r={3} delay={0.2} />
  </svg>
);

/* ── Map number to component ── */
const infographicMap: Record<string, React.FC<{ color: string; hovered: boolean }>> = {
  "01": BrandInfographic,
  "02": UIUXInfographic,
  "03": WebDevInfographic,
  "04": CatalogInfographic,
  "05": MerchInfographic,
  "06": MagazineInfographic,
  "07": MotionInfographic,
  "08": MarketingInfographic,
  "09": SEOInfographic,
  "10": ExcelInfographic,
  "11": AccountsInfographic,
  "12": VideoInfographic,
  "13": DigitalMarketingInfographic,
};

interface ServiceInfographicProps {
  serviceNumber: string;
  color: string;
  hovered: boolean;
}

const ServiceInfographic = ({ serviceNumber, color, hovered }: ServiceInfographicProps) => {
  const Comp = infographicMap[serviceNumber];
  if (!Comp) return null;

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Comp color={color} hovered={hovered} />
    </motion.div>
  );
};

export default ServiceInfographic;
