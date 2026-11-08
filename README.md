# Best Car Travels (React + Vite + Firebase backend)

React front end. Firebase is used **only as the backend**: Firestore (database) and
Authentication (admin login). Nothing is hosted on Firebase, so you can put the built
site on any host (Netlify, Vercel, Cloudflare Pages, cPanel, your own server).

## 1. Firebase backend (free Spark plan, about 10 minutes)

1. https://console.firebase.google.com > create a project.
2. **Build > Firestore Database** > Create database (production mode).
3. **Build > Authentication** > Get started > enable **Email/Password**.
   Open the **Users** tab > **Add user** with the admin email and a strong password.
   This is the only account. The site has no sign-up page.
4. **Project settings > Your apps > Web (`</>`)** > register the app (skip "Firebase Hosting").
   Copy the config values.
5. Publish the security rules. Open `firestore.rules`, replace `admin@example.com` with your
   admin email, then paste the file into **Firestore > Rules > Publish**
   (or `firebase deploy --only firestore:rules`, which does not deploy any hosting).

## 2. Run locally

```
npm install
cp .env.example .env     # fill in the values from step 4 and your admin email
npm run dev
```

Site: http://localhost:5173/   Admin: http://localhost:5173/admin.html

## 3. Build and deploy anywhere

```
npm run build
```

Upload the contents of `dist/` to your host. On Netlify, Vercel or Cloudflare Pages, connect the
repo, set the build command to `npm run build`, the output folder to `dist`, and add the
`VITE_FIREBASE_*` and `VITE_ADMIN_EMAIL` values from `.env` as environment variables
(they are read at build time).

There are no rewrite rules to configure. The site is two plain pages, `index.html` and
`admin.html`, and every CSS and JS path is relative, so it also works from a sub-folder.
The stylesheet is imported by the JavaScript (`src/main.jsx`), so Vite bundles it and it
cannot end up as a broken `<link>`.

## Using the admin

Open `/admin.html` (also linked as "Staff login" in the footer), log in, drop photos in.
They appear on the public gallery straight away. The trash icon deletes a photo.

## How photos are stored

Photos are resized in the browser (1600px full size, 520px thumbnail) and saved in Firestore,
so the free plan is enough and no Cloud Storage bucket is needed. The gallery loads only
thumbnails and fetches the full image when someone opens it. For hundreds of high-resolution
photos, move to Cloud Storage (needs the Blaze plan).

## Security

Firestore rules allow public reads and allow writes only when the signed-in email equals the
admin email. Even if someone created another account, they could not add or delete anything.

## Where to edit content

- Rates, routes, fleet, reviews, FAQ, phone number: `src/data.js`
- Look and feel: `src/styles.css`
- Sections: `src/components/`, page: `src/pages/Home.jsx`, admin: `src/pages/Admin.jsx`
