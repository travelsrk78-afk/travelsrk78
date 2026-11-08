import "./styles.css"; // bundled by Vite, so the stylesheet can never be a broken link
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home.jsx";

document.documentElement.classList.add("js");
createRoot(document.getElementById("root")).render(<StrictMode><Home /></StrictMode>);
