import React from "react";

type WheelProps = {
    patterns: string[];
    selected: string;
    spinning: boolean;
    variance?: number;
    usedPatterns?: string[];
};

// Helper to generate Dan pattern styles

const patternStyles: Record<string, { fill: string; stripe?: string; stripes?: number }> = {
    "Chon-Ji": { fill: "#fff", stripe: "#ffd93fff" }, // white with yellow stripe
    "Dan-Gun": { fill: "#ffd93fff" }, // yellow
    "Do-San": { fill: "#ffd93fff", stripe: "#3b9b3cff" }, // yellow with green stripe
    "Won-Hyo": { fill: "#3b9b3cff" }, // green
    "Yul-Gok": { fill: "#3b9b3cff", stripe: "#3c64f4ff" }, // green with blue stripe
    "Joong-Gun": { fill: "#3c64f4ff" }, // blue
    "Toi-Gye": { fill: "#3c64f4ff", stripe: "#ff3f3fff" }, // blue with red stripe
    "Hwa-Rang": { fill: "#ff3f3fff" }, // red
    "Choong-Moo": { fill: "#ff3f3fff", stripe: "#222" }, // red with black stripe
    "Kwang-Gae": { fill: "#222", stripes: 1 }, // black with yellow stripe
    "Po-Eun": { fill: "#222", stripes: 1 },
    "Ge-Baek": { fill: "#222", stripes: 1 },
    // Dan patterns (2nd Dan and above)
    "Eui-Am": { fill: "#222", stripes: 2 },
    "Choong-Jang": { fill: "#222", stripes: 2 },
    "Juche": { fill: "#222", stripes: 2 },
    "Sam-Il": { fill: "#222", stripes: 3 },
    "Yoo-Sin": { fill: "#222", stripes: 3 },
    "Choi-Yong": { fill: "#222", stripes: 3 },
    "Yong-Gae": { fill: "#222", stripes: 4 },
    "Ul-Ji": { fill: "#222", stripes: 4 },
    "Moon-Moo": { fill: "#222", stripes: 4 },
    "So-San": { fill: "#222", stripes: 5 },
    "Se-Jong": { fill: "#222", stripes: 5 },
    "Tong-Il": { fill: "#222", stripes: 6 },
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

const Wheel: React.FC<WheelProps> = ({ patterns, selected, spinning, variance = 0, usedPatterns = [] }) => {
    const segCount = patterns.length;
    const angle = 360 / segCount;
    const selectedIdx = patterns.indexOf(selected);
    // To align the selected pattern to the left (SVG -180deg), account for the -90deg offset in wedge drawing
    // The leftmost point is at -90 - 90 = -180 degrees from SVG 0 (right)
    const leftAlignAngle = -90;
    const rotation = spinning
        ? 2160 + (leftAlignAngle - selectedIdx * angle - angle / 2 + variance)
        : leftAlignAngle - selectedIdx * angle - angle / 2 + variance;

    const size = 440;
    const r = size / 2 - 12;
    const cx = size / 2;
    const cy = size / 2;

    return (
        <div className="relative flex items-center justify-center my-8">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className={`rounded-full border-4 border-gray-300 shadow-lg ${spinning ? "transition-transform duration-[2000ms] [transition-timing-function:cubic-bezier(0.15,0.85,0.25,1)]" : ""}`}
                style={{
                    transform: `rotate(${rotation}deg)`
                }}
            >
                {patterns.map((pattern, i) => {
                    const startAngle = i * angle - 90;
                    const endAngle = (i + 1) * angle - 90;
                    let style = patternStyles[pattern] || { fill: "#888" };
                    // For Dan patterns, use stripes property
                    if (style.stripes) {
                        // Render multiple yellow stripes for Dan patterns
                        style = { ...style };
                    }
                    const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
                    const isUsed = usedPatterns.includes(pattern);
                    const isSelected = !spinning && pattern === selected;
                    return (
                        <g key={pattern}>
                            <path
                                d={getSlicePath(cx, cy, r, startAngle, endAngle)}
                                fill={isUsed ? "#bbb" : style.fill}
                                stroke="#ffffffff"
                                strokeWidth={1}
                                opacity={isUsed ? 0.7 : 1}
                            />
                            {/* Render stripes for Dan patterns */}
                            {style.stripes && !isUsed && Array.from({ length: style.stripes }).map((_, idx) => {
                                // Add a small gap between Dan stripes
                                const bandRadius = r * (0.42 + 0.11 * idx);
                                const bandThickness = 16;
                                const angle1 = startAngle;
                                const angle2 = endAngle;
                                // Outer points (band outer edge)
                                const x1 = cx + (bandRadius + bandThickness / 2) * Math.cos(angle1 * Math.PI / 180);
                                const y1 = cy + (bandRadius + bandThickness / 2) * Math.sin(angle1 * Math.PI / 180);
                                const x2 = cx + (bandRadius + bandThickness / 2) * Math.cos(angle2 * Math.PI / 180);
                                const y2 = cy + (bandRadius + bandThickness / 2) * Math.sin(angle2 * Math.PI / 180);
                                // Inner points (band inner edge)
                                const x3 = cx + (bandRadius - bandThickness / 2) * Math.cos(angle2 * Math.PI / 180);
                                const y3 = cy + (bandRadius - bandThickness / 2) * Math.sin(angle2 * Math.PI / 180);
                                const x4 = cx + (bandRadius - bandThickness / 2) * Math.cos(angle1 * Math.PI / 180);
                                const y4 = cy + (bandRadius - bandThickness / 2) * Math.sin(angle1 * Math.PI / 180);
                                return (
                                    <polygon
                                        key={idx}
                                        points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
                                        fill="#ffd93fff"
                                        style={{ filter: "drop-shadow(0 0 2px #fff8)" }}
                                    />
                                );
                            })}
                            {/* Render single stripe for non-Dan patterns */}
                            {style.stripe && !isUsed && !style.stripes && (() => {
                                // Align non-Dan pattern stripes to match the innermost Dan stripe
                                const bandRadius = r * 0.42; // same as innermost Dan stripe
                                const bandThickness = 16; // same as Dan stripe thickness
                                const angle1 = startAngle;
                                const angle2 = endAngle;
                                // Outer points (band outer edge)
                                const x1 = cx + (bandRadius + bandThickness / 2) * Math.cos(angle1 * Math.PI / 180);
                                const y1 = cy + (bandRadius + bandThickness / 2) * Math.sin(angle1 * Math.PI / 180);
                                const x2 = cx + (bandRadius + bandThickness / 2) * Math.cos(angle2 * Math.PI / 180);
                                const y2 = cy + (bandRadius + bandThickness / 2) * Math.sin(angle2 * Math.PI / 180);
                                // Inner points (band inner edge)
                                const x3 = cx + (bandRadius - bandThickness / 2) * Math.cos(angle2 * Math.PI / 180);
                                const y3 = cy + (bandRadius - bandThickness / 2) * Math.sin(angle2 * Math.PI / 180);
                                const x4 = cx + (bandRadius - bandThickness / 2) * Math.cos(angle1 * Math.PI / 180);
                                const y4 = cy + (bandRadius - bandThickness / 2) * Math.sin(angle1 * Math.PI / 180);
                                return (
                                    <polygon
                                        points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
                                        fill={style.stripe}
                                        style={{ filter: "drop-shadow(0 0 2px #fff8)" }}
                                    />
                                );
                            })()}
                            <text
                                x={cx + (r / 2) * Math.cos(midAngle) - 90}
                                y={cy + (r / 2) * Math.sin(midAngle)}
                                textAnchor="start"
                                dominantBaseline="middle"
                                fontSize={isSelected ? 20 : 16}
                                fill={
                                    isSelected
                                        ? (style.fill === "#ff3f3fff" ? "#ffd93fff" : "#ef4444")
                                        : isUsed
                                            ? "#888"
                                            : (style.fill === "#ffd93fff" || style.fill === "#fff")
                                                ? "#2d2d2dff"
                                                : "#fff"
                                }
                                fontWeight={isSelected ? "bolder" : "bold"}
                                transform={`rotate(${((startAngle + endAngle) / 2 + 180)},${cx + (r / 2) * Math.cos(midAngle)},${cy + (r / 2) * Math.sin(midAngle)})`}
                                style={{ userSelect: "none", pointerEvents: "none", textShadow: "0 1px 1px rgba(125, 125, 125, 0.53)" }}
                            >
                                {pattern}
                            </text>
                        </g>
                    );
                })}
                {/* White border overlay */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke="#fff"
                    strokeWidth={8}
                    style={{ pointerEvents: "none" }}
                />
            </svg>
            {/* Left-edge selector pointer (triangle) */}
            <svg
                width={32}
                height={64}
                style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
                pointerEvents="none"
            >
                <polygon
                    points="32,32 0,16 0,48"
                    fill="#ef4444" // Tailwind red-500
                    stroke="#fff"
                    strokeWidth={2}
                    filter="drop-shadow(0 1px 2px #0006)"
                />
            </svg>
        </div>
    );
};

export default Wheel;
