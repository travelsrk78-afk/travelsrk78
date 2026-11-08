import { useEffect, useRef } from "react";

const D = "M40 150 C 130 150, 150 70, 250 90 S 400 150, 470 80 S 540 50, 560 40";

export default function RouteMap() {
  const figRef = useRef(null);

  useEffect(() => {
    const fig = figRef.current;
    const path = fig.querySelector("#line"), car = fig.querySelector("#car-dot");
    const svg = path.ownerSVGElement, vb = svg.viewBox.baseVal, len = path.getTotalLength();
    const tags = [...fig.querySelectorAll(".tag")], stops = [...fig.querySelectorAll(".stop")];
    const stopT = stops.map(s => +s.dataset.at);
    const place = (el, t) => { const p = path.getPointAtLength(len * t); el.setAttribute("transform", `translate(${p.x} ${p.y})`); };

    const layoutTags = () => {
      const box = svg.getBoundingClientRect(), fb = fig.getBoundingClientRect();
      stops.forEach((s, i) => {
        const p = path.getPointAtLength(len * stopT[i]);
        const x = box.left - fb.left + (p.x / vb.width) * box.width, y = box.top - fb.top + (p.y / vb.height) * box.height;
        const t = tags[i], w = t.offsetWidth;
        const left = Math.max(8, Math.min(x - w / 2, fb.width - w - 8));
        t.style.left = left + "px"; t.style.top = (i === 0 || i === 2 ? y + 14 : y - 34) + "px";
        place(s, stopT[i]);
      });
    };
    layoutTags();
    addEventListener("resize", layoutTags);

    let raf = 0, timer = 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(car, 1); stops.forEach(s => s.classList.add("on")); tags.forEach(t => t.classList.add("on"));
    } else {
      place(car, 0);
      const dur = 3400, ease = x => 1 - Math.pow(1 - x, 3);
      let t0;
      const step = ts => {
        t0 ??= ts;
        const k = Math.min(1, (ts - t0) / dur), t = ease(k);
        place(car, t);
        stops.forEach((s, i) => { if (t >= stopT[i] - 0.01) { s.classList.add("on"); tags[i].classList.add("on"); } });
        if (k < 1) raf = requestAnimationFrame(step);
      };
      timer = setTimeout(() => { raf = requestAnimationFrame(step); }, 500);
    }
    return () => {
      removeEventListener("resize", layoutTags); clearTimeout(timer); cancelAnimationFrame(raf);
      stops.forEach(s => s.classList.remove("on")); tags.forEach(t => t.classList.remove("on"));
    };
  }, []);

  return (
    <figure className="route" ref={figRef} aria-label="Vijayawada to Hyderabad route, about 275 kilometres">
      <figcaption>The road most people book: Vijayawada to Hyderabad, 275 km, from ₹5,500</figcaption>
      <svg viewBox="0 0 600 190" role="img" aria-hidden="true">
        <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stopColor="#0B4EA2" /><stop offset="1" stopColor="#DC2626" /></linearGradient></defs>
        <path id="road" d={D} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
        <path id="line" d={D} fill="none" stroke="url(#rg)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
        <g className="stop" data-at="0"><circle r="6" fill="#000000" /></g>
        <g className="stop" data-at=".36"><circle r="4.5" fill="#000000" opacity=".8" /></g>
        <g className="stop" data-at=".7"><circle r="4.5" fill="#000000" opacity=".8" /></g>
        <g className="stop" data-at="1"><circle r="6" fill="#DC2626" stroke="#000000" strokeWidth="1" /></g>
        <g id="car-dot"><circle r="11" fill="#DC2626" opacity=".25" /><circle r="6" fill="#DC2626" /></g>
      </svg>
      <span className="tag t0">Vijayawada</span>
      <span className="tag t1">Nandigama</span>
      <span className="tag t2">Suryapet</span>
      <span className="tag t3">Hyderabad</span>
    </figure>
  );
}
