// Illustrative inline-SVG diagrams for the capability sections. Purely decorative / schematic.

const S = "#dff140";
const F = "#8e9291";
const L = "#3a3e3a";

export function GainDynamics() {
  const nodes = [
    { x: 70, y: 70, n: "A" },
    { x: 290, y: 50, n: "B" },
    { x: 310, y: 180, n: "C" },
    { x: 90, y: 190, n: "D" },
  ];
  const edges: [number, number, string, boolean][] = [
    [0, 1, "+4", true], [1, 2, "−2", false], [2, 3, "+1", true], [3, 0, "−3", false], [0, 2, "+5", true], [1, 3, "0", false],
  ];
  return (
    <svg viewBox="0 0 380 250" className="h-full w-full" role="img" aria-label="Four-party gain and loss network">
      {edges.map(([a, b, t, pos], i) => {
        const A = nodes[a], B = nodes[b];
        return (
          <g key={i}>
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={pos ? S : L} strokeWidth={pos ? 1.4 : 1} strokeDasharray={pos ? "" : "3 4"} opacity={pos ? 0.8 : 1} />
            <text x={A.x + (B.x - A.x) * (i === 5 ? 0.3 : 0.5)} y={A.y + (B.y - A.y) * (i === 5 ? 0.3 : 0.5) - 5} fill={pos ? S : F} fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">{t}</text>
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.n}>
          <circle cx={n.x} cy={n.y} r="20" fill="#0a0b0a" stroke={S} strokeWidth="1.2" />
          <text x={n.x} y={n.y + 4} fill="#e9ece6" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle">{n.n}</text>
        </g>
      ))}
      <text x="12" y="240" fill={F} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">NET VALUE TRANSFER · Δ UTILITY / PARTY</text>
    </svg>
  );
}

export function ParetoFrontier() {
  const pts = [[60, 60], [100, 85], [150, 110], [200, 140], [255, 175], [320, 205]];
  const dominated = [[130, 170], [180, 190], [230, 150], [110, 130], [280, 210]];
  return (
    <svg viewBox="0 0 380 250" className="h-full w-full" role="img" aria-label="Pareto frontier of trade-offs">
      <line x1="40" y1="220" x2="350" y2="220" stroke={L} /><line x1="40" y1="20" x2="40" y2="220" stroke={L} />
      <path d="M60 60 C 110 80, 140 105, 200 140 S 290 195, 330 208" fill="none" stroke={S} strokeWidth="1.5" />
      {dominated.map(([x, y], i) => <circle key={i} cx={x + 20} cy={y - 30} r="3" fill={F} opacity="0.5" />)}
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 7 : 3.5} fill={i === 2 ? S : "#0a0b0a"} stroke={S} strokeWidth="1.2" />)}
      <circle cx="150" cy="110" r="14" fill="none" stroke={S} strokeOpacity="0.4" />
      <text x="160" y="96" fill={S} fontSize="10" fontFamily="var(--font-mono)">BALANCED · MIN-REGRET</text>
      <text x="44" y="236" fill={F} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">YOUR GAIN →</text>
      <text x="14" y="130" fill={F} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4" transform="rotate(-90 14 130)">DEAL DURABILITY →</text>
    </svg>
  );
}

export function RiskDistribution() {
  const bars = [2, 4, 7, 12, 19, 28, 38, 44, 40, 31, 22, 14, 8, 5, 3, 2];
  return (
    <svg viewBox="0 0 380 250" className="h-full w-full" role="img" aria-label="Outcome distribution with tail risk">
      {bars.map((v, i) => (
        <rect key={i} x={30 + i * 20} y={200 - v * 3.8} width="16" height={v * 3.8} fill={i < 3 ? "#ff6a3d" : S} opacity={i < 3 ? 0.9 : 0.35 + v / 80} />
      ))}
      <line x1="30" y1="200" x2="350" y2="200" stroke={L} />
      <line x1="90" y1="40" x2="90" y2="200" stroke="#ff6a3d" strokeDasharray="3 3" />
      <text x="96" y="52" fill="#ff6a3d" fontSize="10" fontFamily="var(--font-mono)">P5 · TAIL</text>
      <line x1="170" y1="40" x2="170" y2="200" stroke={F} strokeDasharray="3 3" />
      <text x="176" y="52" fill={F} fontSize="10" fontFamily="var(--font-mono)">P50</text>
      <text x="30" y="222" fill={F} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">WORSE ← OUTCOME → BETTER</text>
      <text x="30" y="238" fill={F} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.4">10,000 ROLLOUTS</text>
    </svg>
  );
}

export function HiddenPlayers() {
  return (
    <svg viewBox="0 0 380 250" className="h-full w-full" role="img" aria-label="Hidden player influencing visible parties">
      {[[80, 60], [80, 190], [300, 60], [300, 190]].map(([x, y], i) => (
        <g key={i}>
          <line x1="190" y1="125" x2={x} y2={y} stroke={S} strokeOpacity="0.55" strokeDasharray="4 4" />
          <circle cx={x} cy={y} r="18" fill="#0a0b0a" stroke={F} />
          <text x={x} y={y + 4} fill="#e9ece6" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">{["A", "B", "C", "D"][i]}</text>
        </g>
      ))}
      <circle cx="190" cy="125" r="34" fill="none" stroke={S} strokeOpacity="0.2" />
      <circle cx="190" cy="125" r="24" fill="#0a0b0a" stroke={S} strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="190" y="131" fill={S} fontSize="18" fontFamily="var(--font-mono)" textAnchor="middle">?</text>
      <text x="190" y="182" fill={S} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="1.4">INFERRED INFLUENCE</text>
      <text x="190" y="196" fill={F} fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" letterSpacing="1.4">P(PRESENT) = 0.71</text>
    </svg>
  );
}
