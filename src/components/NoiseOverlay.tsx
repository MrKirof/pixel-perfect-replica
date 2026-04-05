const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100]" style={{ opacity: 0.045, mixBlendMode: "overlay" }}>
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

export default NoiseOverlay;
