import { useEffect, useRef, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot, doc, getDoc } from "firebase/firestore";
import { configured, db } from "../firebase.js";
import { Reveal } from "./Common.jsx";

const DEMO = [
  ["Sedan, ready for Hyderabad", "#0B4EA2", "#000000", "4/3"], ["Innova Crysta", "#DC2626", "#000000", "3/4"],
  ["Tirupati run", "#000000", "#0B4EA2", "1/1"], ["Tempo Traveller", "#DC2626", "#0B4EA2", "4/3"],
  ["Krishna river stop", "#0B4EA2", "#DC2626", "3/4"], ["Airport pickup", "#000000", "#ffffff", "4/3"],
];

export default function Gallery() {
  const [photos, setPhotos] = useState(null); // null = loading / not configured
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(null);     // { id, thumb, caption }
  const [full, setFull] = useState(null);
  const dlg = useRef(null);

  useEffect(() => {
    if (!configured) return;
    return onSnapshot(
      query(collection(db, "gallery"), orderBy("createdAt", "desc"), limit(60)),
      snap => setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      err => { console.warn(err); setFailed(true); }
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    setFull(null);
    dlg.current?.showModal();
    let live = true;
    getDoc(doc(db, "galleryFull", open.id)).then(s => { if (live && s.exists()) setFull(s.data().data); }).catch(console.warn);
    return () => { live = false; };
  }, [open]);

  const empty = failed || (photos && photos.length === 0);

  return (
    <Reveal className="wrap" id="gallery" aria-labelledby="gal-h">
      <p className="eyebrow">Gallery</p>
      <h2 id="gal-h" className="sec-title">Our cars and trips</h2>
      <p className="sec-sub">Photos from the road, added by the team.</p>
      <div className="gallery" aria-live="polite">
        {!configured && DEMO.map(([c, a, b, ar]) => (
          <div key={c} className="shot demo" style={{ "--c1": a, "--c2": b, "--ar": ar }}><span className="cap">{c}</span></div>
        ))}
        {photos?.map((p, i) => (
          <button key={p.id} type="button" className="shot" style={{ animationDelay: Math.min(i * 60, 480) + "ms" }}
            aria-label={p.caption ? "Open photo: " + p.caption : "Open photo"} onClick={() => setOpen(p)}>
            <img src={p.thumb} alt={p.caption || ""} loading="lazy" width={p.w} height={p.h} />
            {p.caption && <span className="cap">{p.caption}</span>}
          </button>
        ))}
      </div>
      {empty && <p className="empty">New photos are on the way. Check back soon.</p>}

      <dialog className="lightbox" ref={dlg} onClose={() => setOpen(null)} onClick={e => e.target === dlg.current && dlg.current.close()}>
        <button className="lb-close" aria-label="Close photo" onClick={() => dlg.current.close()}>×</button>
        {open && <img src={full || open.thumb} alt={open.caption || ""} className={full ? "" : "loading"} />}
        <p>{open?.caption}</p>
      </dialog>
    </Reveal>
  );
}
