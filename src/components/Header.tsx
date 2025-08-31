import React from "react";
import { Link, NavLink, useLocation} from "react-router-dom";

// Jungle assets (reuse what you already have)
import monkey from "../icons/monkey.png";
import elephant from "../icons/elephant.png";
import parrot from "../icons/parrot.png";
import lion from "../icons/lion.png";
import giraffe from "../icons/giraffe.png";
import banner from "../assets/banner.jpg";

/* =========================
   Brand & helpers
   ========================= */
const BRAND = {
  nameTop: "Jungle Kids Early Learning",
  nameSub: "Childcare Center LLC",
  phoneDisplay: "(509) 685-7056",
  phoneTel: "15096857056",
  address: "282 W 1st Ave, Colville, WA 99114",
  hours: "Mon-Fri · 6:00 AM - 6:00 PM",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=282+W+1st+Ave,+Colville,+WA+99114",
  facebookUrl: "https://www.facebook.com/61573180175113",
  brightwheelUrl: "https://mybrightwheel.com/",
};

const NAV = [
  { to: "/", label: "Home", icon: monkey, keywords: ["welcome", "start"] },
  { to: "/about", label: "About", icon: giraffe, keywords: ["mission", "team"] },
  {
    to: "/information",
    label: "Information",
    icon: parrot,
    keywords: ["tuition", "enroll", "policies", "supplies"],
  },
  { to: "/facility", label: "Pictures", icon: lion, keywords: ["gallery"] },
  { to: "/contact", label: "Contact", icon: elephant, keywords: ["call", "visit"] },
] as const;

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

const IconImg: React.FC<{ src: string; alt?: string; className?: string }> = ({
  src,
  alt = "",
  className,
}) => (
  <img
    src={src}
    alt={alt}
    className={cx("h-4 w-4 object-contain", className)}
    loading="lazy"
  />
);

/* =========================
   Hours / Open status
   ========================= */
function useOpenStatus() {
  const [now, setNow] = React.useState<Date>(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Mon-Fri 06:30-18:00 local time
  const day = now.getDay(); // 0=Sun .. 6=Sat
  const isWeekday = day >= 1 && day <= 5;

  const openStart = new Date(now);
  openStart.setHours(6, 30, 0, 0);
  const openEnd = new Date(now);
  openEnd.setHours(18, 0, 0, 0);

  const isOpen = isWeekday && now >= openStart && now <= openEnd;

  // Next open string for tooltip
  const nextOpen = (() => {
    if (isOpen) return "We're open now";
    // If today weekday but before open
    if (isWeekday && now < openStart) return "Opens today 6:30 AM";
    // Find next weekday
    let d = new Date(now);
    for (let i = 0; i < 7; i++) {
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      const w = d.getDay();
      if (w >= 1 && w <= 5) {
        return `Opens ${d.toLocaleDateString(undefined, {
          weekday: "short",
        })} 6:30 AM`;
      }
    }
    return "See hours";
  })();

  return { isOpen, nextOpen };
}


/* =========================
   Tour modal
   ========================= */
function TourModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, post to your API or email service:
    // await fetch('/api/tours', {method:'POST', body: JSON.stringify({name, phone, date})})
    alert(`Thanks ${name}! We'll contact you at ${phone} about a tour on ${date || "your preferred date"}.`);
    setName("");
    setPhone("");
    setDate("");
    onClose();
  };

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-emerald-900">
            Schedule a Tour
          </h2>
          <button
            onClick={onClose}
            className="rounded p-2 text-emerald-700 hover:bg-emerald-50"
            aria-label="Close"
          >
            ✖
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4 px-6 py-5">
          <label className="block text-sm">
            <span className="text-emerald-900">Your name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border border-emerald-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Jane Parent"
            />
          </label>
          <label className="block text-sm">
            <span className="text-emerald-900">Phone</span>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded border border-emerald-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="(555) 555-5555"
            />
          </label>
          <label className="block text-sm">
            <span className="text-emerald-900">Preferred date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded border border-emerald-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </label>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Request Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================
   Header V2
   ========================= */
const HeaderV2: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [showTour, setShowTour] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [announce, setAnnounce] = React.useState(true);
  const { pathname } = useLocation();
  const { isOpen, nextOpen } = useOpenStatus();


  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on route change
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);



  /* ----- Styles ----- */
  const linkBase =
    "px-3 py-2 rounded text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";
  const linkActive = "bg-emerald-700 text-white shadow-sm";
  const linkIdle = "text-emerald-900 hover:bg-emerald-100/80";

  return (
    <>
      {/* Announcement bar */}
      {announce && (
        <div className="relative z-50 w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <span aria-hidden>🌿</span>
              <span className="font-medium">
                Now enrolling! Book a tour to secure your spot.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnnounce(false)}
                className="rounded px-2 py-1 hover:bg-white/15"
                aria-label="Dismiss"
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        className={cx(
          " z-40 border-b border-emerald-100",
          "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60",
          scrolled && "shadow-[0_2px_12px_rgba(16,185,129,0.12)]"
        )}
      >
        

        {/* Top row: brand + status + actions */}
        <div className="mx-auto flex h-25 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3">
            <div
              className="hidden sm:block h-20 w-56 rounded bg-white/70 ring-1 ring-emerald-200 shadow-inner"
              style={{
                backgroundImage: `url(${banner})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              aria-hidden
            />
            <div className="leading-tight">
              <span className="block font-semibold text-emerald-950">
                {BRAND.nameTop}
              </span>
              <span className="block text-[11px] text-emerald-800/80">
                {BRAND.nameSub}
              </span>
            </div>
          </Link>

          {/* Open status */}
          <div
            className="hidden md:flex items-center gap-2 rounded border border-emerald-200 bg-white px-3 py-1.5 text-xs text-emerald-900"
            title={nextOpen}
          >
            <span
              className={cx(
                "inline-block h-2 w-2 rounded",
                isOpen ? "bg-emerald-600" : "bg-rose-500"
              )}
              aria-hidden
            />
            <span className="font-medium">
              {isOpen ? "Open now" : "Closed"}
            </span>
            <span aria-hidden>•</span>
            <span className="hidden sm:inline">{BRAND.hours}</span>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <IconImg src={parrot} /> Call {BRAND.phoneDisplay}
            </a>
          </div>

          {/* Mobile toggles */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded p-2 text-emerald-900 hover:bg-emerald-100"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Second row: nav + quick search (desktop) */}
        <div className="hidden lg:block border-t border-emerald-100 bg-white/60">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    cx(linkBase, isActive ? linkActive : linkIdle)
                  }
                >
                  <span className="flex items-center gap-2">
                    <IconImg src={n.icon} />
                    {n.label}
                  </span>
                </NavLink>
              ))}
            </nav>

          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
          id="mobile-menu"
          className={cx(
            "fixed inset-0 z-30 lg:hidden transition",
            mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-hidden={!mobileOpen}
        >
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-emerald-900/35 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Mobile menu container */}
          <div
            className={cx(
              "absolute inset-x-0 top-35 origin-top rounded-b-3xl bg-white p-4 shadow-2xl ring-1 ring-emerald-200 transition-transform",
              mobileOpen ? "translate-y-0" : "-translate-y-full"
            )}
            style={{ zIndex: 40 }} // Ensure the menu appears above other elements
          >
            <div className="mx-auto max-w-7xl">
              <div className="mb-3 flex items-center justify-between">
    
              </div>

              <div className="grid grid-cols-2 gap-3">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="flex items-center gap-3 rounded border border-emerald-200 bg-white px-4 py-3 text-emerald-900 shadow-sm hover:bg-emerald-50"
                  >
                    <IconImg src={n.icon} className="h-6 w-6" />
                    <span className="text-base font-semibold">{n.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>


      {/* Tour modal */}
      <TourModal open={showTour} onClose={() => setShowTour(false)} />
    </>
  );
};

export default HeaderV2;
