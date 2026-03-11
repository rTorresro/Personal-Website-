const { useState, useEffect, useRef } = React;

function RadarChart() {
  const skills = RADAR_SKILLS;
  const N = skills.length;
  const cx = 150, cy = 150, R = 90;

  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const duration = 1100;

          const animate = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(eased);
            if (p < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getAngle = (i) => (i * 2 * Math.PI) / N - Math.PI / 2;

  const getPoint = (i, value) => {
    const a = getAngle(i);
    const r = R * (value / 100);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const rings = [25, 50, 75, 100];

  const skillPoints = skills.map((s, i) => getPoint(i, s.value * progress));
  const polygonPoints = skillPoints.map((p) => p.join(",")).join(" ");

  return (
    <div className="radar-chart-wrapper" ref={containerRef}>
      <svg viewBox="0 0 300 300" className="radar-chart-svg" aria-label="Skills radar chart">
        {rings.map((r) => {
          const pts = skills
            .map((_, i) => getPoint(i, r))
            .map((p) => p.join(","))
            .join(" ");
          return <polygon key={r} points={pts} className="radar-ring" />;
        })}

        {skills.map((_, i) => {
          const [ax, ay] = getPoint(i, 100);
          return (
            <line key={i} x1={cx} y1={cy} x2={ax} y2={ay} className="radar-axis" />
          );
        })}

        <polygon points={polygonPoints} className="radar-polygon" />

        {skillPoints.map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r="4" className="radar-dot" />
        ))}

        {skills.map((skill, i) => {
          const [lx, ly] = getPoint(i, 122);
          const anchor =
            Math.abs(lx - cx) < 8 ? "middle" : lx > cx ? "start" : "end";
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              className="radar-label"
              textAnchor={anchor}
              dominantBaseline="middle"
            >
              {skill.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
