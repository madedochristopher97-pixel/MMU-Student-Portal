
  import { createRoot } from "react-dom/client";
  import { Analytics } from "@vercel/analytics/react";
  import App from "./App.tsx";
  import "./index.css";
  import { initScrollReveal } from './lib/scrollReveal';

  createRoot(document.getElementById("root")!).render(
    <>
      <App />
      <Analytics />
    </>
  );
  // Initialize scroll reveal after mount
  setTimeout(() => {
    try { initScrollReveal(); } catch (e) {}
  }, 300);
  