import { useState } from "react";
import { PHONE_TEL, PHONE_DISPLAY, EMAIL } from "../data.js";

const LINKS = [["#rates", "Rates"], ["#fleet", "Fleet"], ["#services", "Services"], ["#why", "Why us"], ["#gallery", "Gallery"], ["#reviews", "Reviews"], ["#faq", "FAQ"], ["#contact", "Contact"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <div className="topbar">
        <div className="topbar-in">
          <div className="topbar-left">
            <span className="live"><i />24/7 WhatsApp booking</span>
            <span>4.9 ★ rated · 4,000+ trips</span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </div>
      <nav className="nav wrap" aria-label="Main">
        <a className="brand" href="#top" aria-label="RK Travels - Tours, Travels and Self-Drive - home">
          <img className="brand-logo" src="/rk-logo.jpg" alt="RK Travels logo" width="46" height="46" />
          <span className="brand-text"><span className="brand-name">RK Travels</span><span className="brand-tag">Tours · Travels &amp; Self-Drive</span></span>
        </a>
        <button className="nav-toggle" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(o => !o)}>
          <span /><span />
        </button>
        <div className={"menu" + (open ? " open" : "")} id="menu" onClick={e => e.target.closest("a") && setOpen(false)}>
          {LINKS.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
          <a className="btn btn-sm btn-sun menu-cta" href="#book">Book a taxi</a>
        </div>
        <a className="nav-phone" href={`tel:${PHONE_TEL}`}>
          <span><small>CALL ANYTIME</small>{PHONE_DISPLAY}</span>
        </a>
        <a className="btn btn-sm btn-sun nav-cta" href="#book">Book a taxi</a>
      </nav>
    </header>
  );
}
