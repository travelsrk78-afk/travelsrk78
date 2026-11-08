import { useEffect, useRef, useState } from "react";

export const Sky = () => null;

export const SpriteDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
    <defs>
      <symbol id="car-sedan" viewBox="0 0 120 48"><g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 35v-6q0-4 5-5l17-2 11-11h32q4 0 7 3l11 9 17 3q4 1 4 5v4z" /><path d="M42 11l-6 11h44l-9-11" /><circle cx="32" cy="37" r="7" fill="#000000" /><circle cx="90" cy="37" r="7" fill="#000000" /></g></symbol>
      <symbol id="car-suv" viewBox="0 0 120 48"><g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 37V26q0-4 5-5l13-1 9-12h50q4 0 7 3l11 11 5 2q4 1 4 5v8z" /><path d="M37 9l-6 11h66l-9-11M64 9v11" /><circle cx="30" cy="38" r="7.5" fill="#000000" /><circle cx="90" cy="38" r="7.5" fill="#000000" /></g></symbol>
      <symbol id="car-van" viewBox="0 0 120 48"><g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 38V13q0-4 4-4h77q4 0 6 3l17 17q3 3 3 7v6z" /><path d="M14 17h12v10H14zM32 17h12v10H32zM50 17h12v10H50zM68 17h14l9 10H68z" /><circle cx="28" cy="39" r="7" fill="#000000" /><circle cx="90" cy="39" r="7" fill="#000000" /></g></symbol>
    </defs>
  </svg>
);

/* Fades a block in when it scrolls into view. Content stays visible if JS or
   IntersectionObserver is unavailable (the .js class is added in main.jsx). */
export function Reveal({ as: Tag = "section", className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${className} rv${shown ? " in" : ""}`} {...rest}>{children}</Tag>;
}
