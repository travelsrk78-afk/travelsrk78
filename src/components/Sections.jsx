import { useState } from "react";
import { Reveal } from "./Common.jsx";
import { RATES, STONES, FLEET, SERVICES, TICKS, REVIEWS, FAQS, inr, WA, PHONE_TEL, PHONE_DISPLAY, EMAIL, CONTACT_NAME, ADDRESS } from "../data.js";

const initials = n => n.split(" ").map(x => x[0]).slice(0,2).join("").toUpperCase();
const SVC_ICONS = ["🛣️", "🗺️", "🛕", "✈️"];

export function Stones() {
  return (
    <Reveal className="wrap stones-sec" aria-labelledby="stones-h">
      <p className="eyebrow">Popular routes</p>
      <h2 id="stones-h" className="sec-title">Roads we drive every week</h2>
      <p className="sec-sub">Distances are approximate, measured from Vijayawada. Fares for the rest are quoted per trip.</p>
      <div className="stones">
        {STONES.map(([n, km, f]) => (
          <div key={n} className="stone" style={{ "--cap": f ? "#dc2626" : "#0b4ea2" }}>
            <span className="cap">{n}</span><span className="km">{km}</span><span className="u">km one way</span>
            <span className={"fare" + (f ? "" : " q")}>{f || "Quote per trip"}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function Rates() {
  const [k, setK] = useState("hyd");
  const r = RATES[k];
  return (
    <Reveal className="wrap" id="rates" aria-labelledby="rates-h">
      <p className="eyebrow">Transparent pricing</p>
      <h2 id="rates-h" className="sec-title">Rates and tariff</h2>
      <p className="sec-sub">Indicative fares. Tolls and driver allowance are included, and the final quote is confirmed on WhatsApp before you travel.</p>
      <div className="panel rates">
        <div className="rates-head">
          <div className="tabs" role="tablist" aria-label="Rate cards">
            {Object.entries(RATES).map(([key, v]) => (
              <button key={key} role="tab" aria-selected={key === k} onClick={() => setK(key)}>{v.label}</button>
            ))}
          </div>
          <a className="btn btn-ghost btn-sm" href="#book">Get exact fare</a>
        </div>
        <p className="note">{r.note}</p>
        <div className="table-scroll">
          <table key={k} id="rateTable">
            <thead><tr>{r.cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>
              {r.rows.map(row => (
                <tr key={row[0]}>{row.map((c, i) => i === 0 ? <td key={i}>{c}</td> : <td key={i} className="p">{typeof c === "number" ? inr(c) : c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rates-foot">No night charges on Hyderabad route · No hidden charges · Pay directly to driver after trip</p>
      </div>
    </Reveal>
  );
}

export function Fleet() {
  return (
    <Reveal className="wrap" id="fleet" aria-labelledby="fleet-h">
      <p className="eyebrow">Our fleet</p>
      <h2 id="fleet-h" className="sec-title">Pick the car that fits your group</h2>
      <p className="sec-sub">Company-owned cars, cleaned before every trip. All cars include AC, music system and fast tagging.</p>
      <div className="fleet">
        {FLEET.map(([n, sym, s, f]) => {
          const isImg = /^\/|\.(png|jpe?g|webp|avif|svg)$/i.test(sym);
          return (
          <article key={n} className="car">
            {isImg ? <img src={sym} alt={n} loading="lazy" /> : <svg viewBox="0 0 120 48" aria-hidden="true"><use href={`#${sym}`} /></svg>}
            <h3>{n}</h3><span className="seats">{s}</span>
            <span className="from">{f ? <span><small>from</small><b>{f.split(" ")[0]}</b></span> : <span><small>from</small><b>Quote</b></span>}<span>{f ? f.split(" ").slice(1).join(" ") : "per trip"}</span></span>
          </article>
        )})}
      </div>
    </Reveal>
  );
}

export function Services({ onQuote }) {
  return (
    <Reveal className="wrap" id="services" aria-labelledby="svc-h">
      <p className="eyebrow">Services</p>
      <h2 id="svc-h" className="sec-title">What we run</h2>
      <p className="sec-sub">Four ways to travel with us, all with a driver you can call by name.</p>
      <div className="svc">
        {SERVICES.map((s, idx) => (
          <article key={s.t} className={"card" + (s.main ? " svc-a" : "")}>
            <h3><span className="svc-icon" aria-hidden="true">{SVC_ICONS[idx] || "🚗"}</span>{s.t}</h3><p>{s.p}</p>
            <a className="link" href="#book" onClick={() => onQuote(s.to)}>{s.a}</a>
          </article>
        ))}
      </div>
    </Reveal>
  );
}

export function Why() {
  return (
    <Reveal className="wrap" id="why" aria-labelledby="why-h">
      <div className="why">
        <div>
          <p className="eyebrow">Why RK Travels</p>
          <h2 id="why-h" className="sec-title tight">You deal with the owner, not a call centre.</h2>
          <p className="lead sm">We own the cars and manage the drivers ourselves. If something changes on your trip, you call one number and the person who picks up can fix it.</p>
          <div className="why-stats">
            <div><b>7+</b><span>Years in service</span></div>
            <div><b>4,000+</b><span>Trips completed</span></div>
            <div><b>4.9★</b><span>247 reviews</span></div>
          </div>
        </div>
        <ul className="ticks">{TICKS.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}</ul>
      </div>
    </Reveal>
  );
}

export function Reviews() {
  return (
    <Reveal className="wrap" id="reviews" aria-labelledby="rev-h">
      <p className="eyebrow">Customer reviews</p>
      <h2 id="rev-h" className="sec-title">What riders say</h2>
      <p className="sec-sub">4.9 out of 5 from 247 verified reviews.</p>
      <div className="reviews">
        {REVIEWS.map(([q, n, w]) => (
          <blockquote key={n} className="card">
            <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
            <p>{q}</p>
            <footer><span className="avatar">{initials(n)}</span><span><b>{n}</b>{w}</span></footer>
          </blockquote>
        ))}
      </div>
    </Reveal>
  );
}

export function Faq() {
  return (
    <Reveal className="wrap narrow" id="faq" aria-labelledby="faq-h">
      <p className="eyebrow">Help centre</p>
      <h2 id="faq-h" className="sec-title">Questions people ask</h2>
      <p className="sec-sub">Quick answers. For anything else, message us on WhatsApp — we reply in minutes.</p>
      <div className="faq">
        {FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </Reveal>
  );
}

export function Contact() {
  const mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed";
  return (
    <Reveal className="wrap" id="contact" aria-labelledby="contact-h">
      <div className="contact">
        <div>
          <p className="eyebrow on-dark">Contact us</p>
          <h2 id="contact-h" className="sec-title tight">Tell us where you're going.</h2>
          <p className="lead sm">Open every hour of every day. Message on WhatsApp for the fastest reply — most trips are confirmed within minutes.</p>
          <div className="cta-row">
            <a className="btn btn-sun" href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi RK Travels — Tours, Travels & Self-Drive, I need a taxi.")}`} target="_blank" rel="noopener">WhatsApp us</a>
            <a className="btn btn-ghost" href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a>
          </div>
        </div>
        <dl className="offices">
          <div><dt>Contact person</dt><dd>{CONTACT_NAME}<br /><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></dd></div>
          <div><dt>Address</dt><dd>{ADDRESS}</dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
        </dl>
        <div className="contact-map">
          <iframe
            title={`Map showing ${ADDRESS}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </Reveal>
  );
}
