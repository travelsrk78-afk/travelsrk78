import { useEffect, useState } from "react";
import { RATES, CARS, PLACES, WA, PHONE_TEL, PHONE_DISPLAY, inr } from "../data.js";

const TRIPS = ["One way", "Round trip", "Local", "Airport"];
const carKey = c => (c.startsWith("Sedan") ? 0 : c.startsWith("SUV") ? 1 : c.startsWith("Innova") ? 2 : c.startsWith("Tempo") ? 3 : -1);
const today = () => new Date().toISOString().slice(0, 10);

export default function BookForm({ prefill }) {
  const [f, setF] = useState({ trip: "One way", from: "Vijayawada", to: "", date: "", car: "Sedan", name: "" });
  const set = (k, v) => setF(s => ({ ...s, [k]: v }));

  // Service cards ("Quote this trip") fill the form, then the page scrolls to it.
  useEffect(() => {
    if (!prefill?.n) return;
    if (prefill.to === "Airport") setF(s => ({ ...s, trip: "Airport", to: "Gannavaram Airport" }));
    else if (prefill.to) setF(s => ({ ...s, to: prefill.to }));
  }, [prefill]);

  let estimate = "";
  const i = carKey(f.car), to = f.to.toLowerCase();
  if (i >= 0 && to.includes("hyderabad") && f.trip !== "Local" && f.trip !== "Airport") {
    const row = RATES.hyd.rows[i];
    estimate = <>Indicative fare: <b>{inr(f.trip === "Round trip" ? row[2] : row[1])}</b> all-inclusive.</>;
  } else if (i >= 0 && i < 3 && to.includes("tirupati")) {
    estimate = <>Indicative fare: <b>{inr(RATES.tpt.rows[i][1])}</b> return, with darshan waiting.</>;
  }

  const submit = e => {
    e.preventDefault();
    const when = new Date(f.date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    const msg = `Hi RK Travels (Tours, Travels & Self-Drive), I'd like a fare.\n${f.trip}: ${f.from} to ${f.to}\nDate: ${when}\nCar: ${f.car}${f.name ? `\nName: ${f.name}` : ""}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <aside className="book" id="book" aria-labelledby="book-h">
      <div className="book-head">
        <h2 id="book-h"><span className="icon">✦</span> Get an instant fare</h2>
        <p className="book-sub">Fill what you know. We reply within minutes, any hour.</p>
      </div>
      <form onSubmit={submit} autoComplete="off">
        <div className="seg" role="radiogroup" aria-label="Trip type">
          {TRIPS.map(t => (
            <label key={t}><input type="radio" name="trip" value={t} checked={f.trip === t} onChange={() => set("trip", t)} /><span>{t}</span></label>
          ))}
        </div>
        <div className="row2">
          <label className="field"><span>From</span><input name="from" value={f.from} onChange={e => set("from", e.target.value)} required /></label>
          <label className="field"><span>To</span>
            <input name="to" list="places" placeholder="Hyderabad" value={f.to} onChange={e => set("to", e.target.value)} required />
            <datalist id="places">{PLACES.map(p => <option key={p}>{p}</option>)}</datalist>
          </label>
        </div>
        <div className="row2">
          <label className="field"><span>Date</span><input type="date" name="date" min={today()} value={f.date} onChange={e => set("date", e.target.value)} required /></label>
          <label className="field"><span>Car</span>
            <select name="car" value={f.car} onChange={e => set("car", e.target.value)}>{CARS.map(c => <option key={c}>{c}</option>)}</select>
          </label>
        </div>
        <label className="field"><span>Your name</span><input name="name" placeholder="Optional" value={f.name} onChange={e => set("name", e.target.value)} /></label>
        {estimate && <p className="indicative">{estimate}</p>}
        <button className="btn btn-sun btn-block" type="submit">Send on WhatsApp →</button>
      </form>
      <div className="book-trust" aria-hidden="true">
        <span><i>✓</i>Free cancellation</span>
        <span><i>✓</i>Verified drivers</span>
        <span><i>✓</i>GPS tracked</span>
      </div>
      <p className="small call">Prefer a call? <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
    </aside>
  );
}
