import React from "react";
import { Link } from "react-router-dom";
import { FiShare2 } from "react-icons/fi"; // For Share Icon
import vines from "../icons/vines.png"; // optional; keep if you want subtle texture

const CTA: React.FC<{
  title?: string;
  subtitle?: string;
  contactTo?: string;
  contactLabel?: string;
}> = ({
  title = "Ready to visit?",
  subtitle = "Book a quick tour — see classrooms, meet teachers, and get answers.",
  contactTo = "/contact",
  contactLabel = "Go to Contact",
}) => {
  const onShare = async () => {
    const url = `${window.location.origin}/contact`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Jungle Kids • Contact", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast("Link copied");
      }
    } catch {
      await navigator.clipboard.writeText(url);
      toast("Link copied");
    }
  };

  const toast = (msg: string) => {
    const el = document.createElement("div");
    el.textContent = msg;
    el.className =
      "fixed bottom-4 right-4 z-[70] rounded-lg bg-teal-700 px-3 py-1.5 text-sm text-white shadow";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-lg ring-1 ring-teal-800/20 transition duration-300 hover:shadow-2xl">
        {/* Soft glow accents */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -right-20 -bottom-28 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl animate-pulse" />

        {/* Optional subtle vines texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(${vines})`,
            backgroundSize: "600px",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,.2) 70%, rgba(0,0,0,0))",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,.2) 70%, rgba(0,0,0,0))",
          }}
          aria-hidden
        />

        <div className="relative grid items-center gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto_auto]">
          {/* Title and Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
            <p className="mt-1 text-white/90">{subtitle}</p>
          </div>

          {/* Contact Button */}
          <Link
            to={contactTo}
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-teal-800 shadow transition hover:bg-teal-50 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
            aria-label="Go to the contact page"
          >
            {contactLabel}
          </Link>

          {/* Share Link Button */}
          <button
            onClick={onShare}
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-700"
            title="Share contact link"
            aria-label="Share contact link"
          >
            <FiShare2 className="mr-2" aria-hidden="true" /> Share Link
          </button>
        </div>

        {/* Clean wave trim */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 text-white"
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0 0h1440v16c-160 10-320 12-480 12S800 22 640 24 320 22 160 22 0 24 0 24V0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default CTA;