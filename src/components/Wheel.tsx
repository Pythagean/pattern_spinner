import React from "react";

type WheelProps = {
  patterns: string[];
  selected: string;
  spinning: boolean;
};

// Custom color and stripe map for each pattern
const patternStyles: Record<string, { fill: string; stripe?: string }> = {
  "Chon-Ji": { fill: "#fff", stripe: "#fbbf24" }, // white with yellow stripe
  "Dan-Gun": { fill: "#fbbf24" }, // yellow
  "Do-San": { fill: "#fbbf24", stripe: "#34d399" }, // yellow with green stripe
  "Won-Hyo": { fill: "#34d399" }, // green
  "Yul-Gok": { fill: "#34d399", stripe: "#60a5fa" }, // green with blue stripe
  "Joong-Gun": { fill: "#60a5fa" }, // blue
  "Toi-Gye": { fill: "#60a5fa", stripe: "#f87171" }, // blue with red stripe
  "Hwa-Rang": { fill: "#f87171" }, // red
  "Choong-Moo": { fill: "#f87171", stripe: "#222" }, // red with black stripe
  "Kwang-Gae": { fill: "#222", stripe: "#fbbf24" }, // black with yellow stripe
  "Po-Eun": { fill: "#222", stripe: "#fbbf24" },
  "Gae-Baek": { fill: "#222", stripe: "#fbbf24" },
};

function getSlicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const rad = (deg: number) => (Math.PI / 180) * deg;
  const x1 = cx + r * Math.cos(rad(startAngle));
  const y1 = cy + r * Math.sin(rad(startAngle));
  const x2 = cx + r * Math.cos(rad(endAngle));
  const y2 = cy + r * Math.sin(rad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
    "Z"
  ].join(" ");
}

const Wheel: React.FC<WheelProps> = ({ patterns, selected, spinning }) => {
  const segCount = patterns.length;
  const angle = 360 / segCount;
  const selectedIdx = patterns.indexOf(selected);
  const rotation = spinning
    ? 1440 + (360 - selectedIdx * angle - angle / 2)
    : 360 - selectedIdx * angle - angle / 2;

  const size = 320;
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="relative flex items-center justify-center my-8">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rounded-full border-4 border-gray-300 shadow-lg transition-transform duration-1000 ease-out"
        style={{
          transform: `rotate(${rotation}deg)`
        }}
      >
        {patterns.map((pattern, i) => {
          const startAngle = i * angle - 90;
          const endAngle = (i + 1) * angle - 90;
          const style = patternStyles[pattern] || { fill: "#888" };
          // Stripe angle: middle of the slice
          const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
          return (
            <g key={pattern}>
              <path
                d={getSlicePath(cx, cy, r, startAngle, endAngle)}
                fill={style.fill}
                stroke="#fff"
                strokeWidth={2}
              />
              {style.stripe && (() => {
                // Draw a triangle (polygon) for the stripe
                const stripeWidth = 18; // width at rim
                const angle1 = ((startAngle + endAngle) / 2) - (stripeWidth / r) * 180 / Math.PI / 2;
                const angle2 = ((startAngle + endAngle) / 2) + (stripeWidth / r) * 180 / Math.PI / 2;
                const x1 = cx + (r - 2) * Math.cos(angle1 * Math.PI / 180);
                const y1 = cy + (r - 2) * Math.sin(angle1 * Math.PI / 180);
                const x2 = cx + (r - 2) * Math.cos(angle2 * Math.PI / 180);
                const y2 = cy + (r - 2) * Math.sin(angle2 * Math.PI / 180);
                return (
                  <polygon
                    points={`${x1},${y1} ${x2},${y2} ${cx},${cy}`}
                    fill={style.stripe}
                    style={{ filter: "drop-shadow(0 0 2px #fff8)" }}
                  />
                );
              })()}
              {/* ...existing code for text... */}
              <text
                x={cx + r * Math.cos(midAngle) + 12}
                y={cy + r * Math.sin(midAngle)}
                textAnchor="start"
                dominantBaseline="middle"
                fontSize={16}
                fill="#fff"
                fontWeight="bold"
                transform={`rotate(${((startAngle + endAngle) / 2 + 180)},${cx + r * Math.cos(midAngle) + 6},${cy + r * Math.sin(midAngle)})`}
                style={{ userSelect: "none", pointerEvents: "none", textShadow: "0 1px 2px #0008" }}
              >
                {pattern}
              </text>
            </g>
          );
        })}
      </svg>
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-500" />
    </div>
  );
};

export default Wheel;
