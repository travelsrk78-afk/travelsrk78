import { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, writeBatch } from "firebase/firestore";
import { configured, db, getAuthLazy, ADMIN_EMAIL } from "../firebase.js";
// no Sky component in normal theme

const isAdmin = u => !!(u && u.email && ADMIN_EMAIL && u.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());

/* Resize in the browser so photos fit comfortably inside Firestore documents. */
async function resize(file, max, q, limit) {
  const bmp = await createImageBitmap(file);
  let scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  for (let tries = 0; tries < 8; tries++) {
    const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    c.getContext("2d").drawImage(bmp, 0, 0, w, h);
    let quality = q;
    for (let i = 0; i < 4; i++) {
      const url = c.toDataURL("image/jpeg", quality);
      if (!limit || url.length <= limit) return { url, w, h };
      quality -= 0.12;
    }
    scale *= 0.8;
  }
  throw new Error("too large");
}

function QueueItem({ file, onDone, onError }) {
  const [status, setStatus] = useState("Ready");
  const [caption, setCaption] = useState("");
  const [preview] = useState(() => URL.createObjectURL(file));
  const cap = useRef("");
  cap.current = caption;

  useEffect(() => {
    let dead = false;
    // short pause so the admin can type a caption before the upload starts
    const timer = setTimeout(async () => {
      try {
        setStatus("Resizing");
        const full = await resize(file, 1600, 0.82, 780000);
        const thumb = await resize(file, 520, 0.72, 60000);
        if (dead) return;
        setStatus("Uploading");
        const id = doc(collection(db, "gallery")).id;
        const batch = writeBatch(db);
        batch.set(doc(db, "galleryFull", id), { data: full.url, createdAt: serverTimestamp() });
        batch.set(doc(db, "gallery", id), { caption: cap.current.trim(), thumb: thumb.url, w: thumb.w, h: thumb.h, createdAt: serverTimestamp() });
        await batch.commit();
        setStatus("Added");
        setTimeout(() => onDone(), 1500);
      } catch (e) {
        console.error(e);
        setStatus("Failed");
        onError(e.code === "permission-denied"
          ? "Permission denied. Check that firestore.rules has your admin email."
          : "Could not add " + file.name + ". Try a smaller image.");
      }
    }, 1800);
    return () => { dead = true; clearTimeout(timer); };
  }, []); // eslint-disable-line

  useEffect(() => () => URL.revokeObjectURL(preview), [preview]);

  return (
    <div className="q-item">
      <img src={preview} alt="" />
      <input placeholder="Caption (optional)" aria-label="Caption" value={caption} disabled={status === "Added"} onChange={e => setCaption(e.target.value)} />
      <span className="st">{status}</span>
    </div>
  );
}

export default function Admin() {
  const auth = getAuthLazy();
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [loginErr, setLoginErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [queue, setQueue] = useState([]);
  const [msg, setMsg] = useState(null);
  const [over, setOver] = useState(false);
  const qid = useRef(0);

  useEffect(() => { document.body.classList.add("admin-body"); }, []);

  const toast = (text, ok) => { setMsg({ text, ok }); setTimeout(() => setMsg(null), 5000); };

  useEffect(() => {
    if (!configured) return;
    return onAuthStateChanged(auth, async u => {
      if (u && !isAdmin(u)) {
        await signOut(auth);
        setLoginErr("This account is not allowed to manage photos.");
        setUser(null);
        return;
      }
      setUser(u);
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!user) return;
    return onSnapshot(query(collection(db, "gallery"), orderBy("createdAt", "desc")),
      snap => setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [user]);

  const login = async e => {
    e.preventDefault(); setLoginErr(""); setBusy(true);
    const fd = new FormData(e.target);
    try { await signInWithEmailAndPassword(auth, String(fd.get("email")).trim(), String(fd.get("password"))); }
    catch { setLoginErr("Email or password is wrong. Check both and try again."); }
    finally { setBusy(false); }
  };

  const addFiles = list => {
    const imgs = [...list].filter(f => f.type.startsWith("image/"));
    if (!imgs.length) return toast("Choose image files (JPG, PNG or WebP).");
    setQueue(q => [...q, ...imgs.map(file => ({ id: ++qid.current, file }))]);
  };

  const remove = async p => {
    if (!confirm("Delete this photo from the website? This cannot be undone.")) return;
    try {
      const b = writeBatch(db);
      b.delete(doc(db, "gallery", p.id)); b.delete(doc(db, "galleryFull", p.id));
      await b.commit(); toast("Photo deleted.", true);
    } catch { toast("Could not delete the photo. Check your connection and try again."); }
  };

  return (
    <>
      <header className="nav-wrap"><nav className="nav">
        <a className="brand" href="index.html"><img className="brand-logo" src="/rk-logo.jpg" alt="RK Travels logo" width="44" height="44" /><span className="brand-text"><span className="brand-name">RK Travels</span><span className="brand-tag">Tours, Travels &amp; Self-Drive</span></span></a>
        <a className="btn btn-ghost btn-sm" href="index.html">View site</a>
      </nav></header>

      <main className="admin" id="app">
        {!configured && (
          <div className="login">
            <h1>Connect Firebase</h1>
            <p className="muted">Copy <b>.env.example</b> to <b>.env</b>, fill in your Firebase values and admin email, then restart. The steps are in README.md.</p>
          </div>
        )}

        {configured && user === null && (
          <form className="login" onSubmit={login}>
            <h1>Staff login</h1>
            <p className="muted small">Only the admin account can add or delete gallery photos.</p>
            {loginErr && <div className="alert">{loginErr}</div>}
            <label className="field"><span>Email</span><input type="email" name="email" autoComplete="username" required /></label>
            <div className="field">
              <span>Password</span>
              <div className="pw-wrap">
                <input type={showPw ? "text" : "password"} name="password" autoComplete="current-password" required />
                <button type="button" className="pw-eye" aria-label={showPw ? "Hide password" : "Show password"} aria-pressed={showPw} onClick={() => setShowPw(s => !s)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />{showPw && <path d="M3 3l18 18" />}</svg>
                </button>
              </div>
            </div>
            <button className="btn btn-sun btn-block" type="submit" disabled={busy}>{busy ? "Logging in" : "Log in"}</button>
          </form>
        )}

        {configured && user && (
          <section>
            <div className="bar">
              <h1>Gallery</h1>
              <div><span className="muted small">{user.email}</span> <button className="btn btn-ghost btn-sm" onClick={() => signOut(auth)}>Log out</button></div>
            </div>
            {msg && <div className={"alert" + (msg.ok ? " ok" : "")}>{msg.text}</div>}
            <label className={"drop" + (over ? " over" : "")}
              onDragOver={e => { e.preventDefault(); setOver(true); }} onDragEnter={e => { e.preventDefault(); setOver(true); }}
              onDragLeave={e => { e.preventDefault(); setOver(false); }}
              onDrop={e => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}>
              <input type="file" accept="image/*" multiple onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />
              <b>Add photos</b>
              <span className="muted small">Drop images here or tap to choose. They are resized automatically.</span>
            </label>
            <div className="queue">
              {queue.map(q => (
                <QueueItem key={q.id} file={q.file} onDone={() => setQueue(l => l.filter(x => x.id !== q.id))} onError={toast} />
              ))}
            </div>
            <div className="agrid">
              {photos.map(p => (
                <div key={p.id} className="aitem">
                  <img src={p.thumb} alt="" />
                  <span className="cap">{p.caption || "No caption"}</span>
                  <button className="del" aria-label="Delete photo" onClick={() => remove(p)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                  </button>
                </div>
              ))}
            </div>
            {photos.length === 0 && <p className="empty">No photos yet. Add the first one above.</p>}
          </section>
        )}
      </main>
    </>
  );
}
