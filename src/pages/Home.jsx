import { useState } from "react";
import { SpriteDefs } from "../components/Common.jsx";
import Nav from "../components/Nav.jsx";
import RouteMap from "../components/RouteMap.jsx";
import BookForm from "../components/BookForm.jsx";
import Gallery from "../components/Gallery.jsx";
import { Stones, Rates, Fleet, Services, Why, Reviews, Faq, Contact } from "../components/Sections.jsx";
import { WA, PHONE_TEL, PHONE_DISPLAY, EMAIL } from "../data.js";

export default function Home() {
  const [prefill, setPrefill] = useState(null);
  const quote = to => setPrefill(p => ({ to, n: (p?.n || 0) + 1 }));
  return (
    <>
      <SpriteDefs />
      <Nav />
      <main id="top">
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="hero-badge"><i /> Owner-run since 2018 · Vijayawada, AP &amp; Telangana</span>
            <p className="telugu" lang="te">ప్రయాణం సుఖంగా</p>
            <h1>Leave Vijayawada with a driver you can <span>call by name.</span></h1>
            <p className="lead">RK Travels — Tours, Travels &amp; Self-Drive. Outstation and local cabs across Andhra Pradesh and Telangana. Fixed all-inclusive fares, police-verified drivers, GPS on every car. <em>Your Journey, Our Passion!</em></p>
            <div className="hero-cta">
              <a className="btn btn-sun" href="#book">Get an instant fare</a>
              <a className="btn btn-ghost" href="#rates">View rates</a>
            </div>
            <p className="hero-note">No advance payment · Free cancellation · <b>Confirmed on WhatsApp in minutes</b></p>
            <ul className="chips">
              <li className="chip"><span className="star">★</span> <b>4.9</b> from 247 reviews</li>
              <li className="chip"><span className="tick">✓</span> Police-verified drivers</li>
              <li className="chip"><span className="tick">✓</span> 4,000+ trips completed</li>
            </ul>
            <RouteMap />
          </div>
          <BookForm prefill={prefill} />
        </section>
        <Stones />
        <Rates />
        <Fleet />
        <Services onQuote={quote} />
        <Why />
        <Gallery />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <footer className="foot">
        <div className="foot-in">
          <div>
            <span className="foot-brand"><img src="/rk-logo.jpg" alt="" width="42" height="42" /> RK Travels</span>
            <p>Tours, Travels &amp; Self-Drive. Owner-run taxi and outstation cabs from Vijayawada. Your Journey, Our Passion!</p>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><a href="#rates">Rates</a></li>
              <li><a href="#fleet">Fleet</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><a href={`https://wa.me/${WA}`} target="_blank" rel="noopener">WhatsApp us</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} RK Travels — Tours, Travels &amp; Self-Drive. All rights reserved.</span>
          <a href="admin.html" className="adminlink" rel="nofollow">Staff login</a>
        </div>
      </footer>
      <a className="wa-fab" href={`https://wa.me/${WA}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.5-2-1-1 .7a4 4 0 0 1-1.900-1.900l.7-1-1-2z" fill="currentColor" stroke="none" /></svg>
      </a>
    </>
  );
}
