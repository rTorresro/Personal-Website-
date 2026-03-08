const { useState: useSurvState, useEffect: useSurvEffect } = React;

function Surveillance() {
  const [time, setTime] = useSurvState(new Date());

  useSurvEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const ts = `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${pad(time.getDate())} ${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  return (
    <div className="surveillance-overlay">
      <div className="surv-rec">
        <span className="surv-rec-dot"></span>
        <span>REC</span>
      </div>
      <div className="surv-timestamp">{ts}</div>
      <div className="surv-info">CAM-01 // SECTOR-7G</div>
    </div>
  );
}
