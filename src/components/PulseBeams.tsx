const paths = [
  "M 10,80 Q 50,10 90,50",
  "M 5,60 Q 40,5 95,40",
  "M 15,90 Q 55,20 85,60",
  "M 8,70 Q 45,15 92,45",
  "M 12,85 Q 52,8 88,55",
  "M 3,65 Q 38,12 97,35",
];

const PulseBeams = () => (
  <div className="relative w-full h-20 overflow-hidden pointer-events-none">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          {/* Base path dim */}
          <path d={d} fill="none" stroke="white" strokeWidth="0.2" opacity={0.05} />
          {/* Animated beam */}
          <path
            d={d}
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="0.4"
            strokeLinecap="round"
            opacity={0.6}
            strokeDasharray="15 85"
            style={{
              animation: `pulseBeam 3s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        </g>
      ))}
    </svg>
  </div>
);

export default PulseBeams;
