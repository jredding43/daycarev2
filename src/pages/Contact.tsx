// src/pages/Contact.tsx
import React, { useEffect, useState } from "react";
import { Section, Container, Card } from "../components/Primitives";
import FAQs from "../components/FAQs";

/* =========================
   Config
   ========================= */
// Use ONLY the short ID here (not the full URL)
const FORMSPREE_ID = "xldwogev";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

const ORG = {
  name: "Jungle Kids Early Learning",
  phoneDisplay: "(509) 685-7056",
  phoneTel: "15096857056",
  addressLine: "282 W 1st Ave, Colville, WA 99114",
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=282+W+1st+Ave,+Colville,+WA+99114",
};

/* =========================
   Open/closed badge
   ========================= */
function useOpenStatus() {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const d = now.getDay(); // 0=Sun..6=Sat
  const isWeekday = d >= 1 && d <= 5;
  const start = new Date(now); start.setHours(6, 30, 0, 0);
  const end = new Date(now);   end.setHours(18, 0, 0, 0);
  const isOpen = isWeekday && now >= start && now <= end;
  return isOpen;
}

/* =========================
   Page
   ========================= */
const Contact: React.FC = () => {
  const isOpen = useOpenStatus();

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "Tour",
    message: "",
    _gotcha: "", // honeypot
  });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form._gotcha) return; // bot trap

    setSubmitting(true);
    setSent(null);

    try {
      // Formspree JSON payload — keep "email" field for reply-to
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        topic: form.topic,
        message: form.message,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
        _subject: `[${form.topic}] ${form.name} — Website Contact`,
      };

      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSent("ok"); // on-page confirmation
        setForm({
          name: "",
          email: "",
          phone: "",
          topic: "Tour",
          message: "",
          _gotcha: "",
        });
      } 
    } catch {
      setSent("err");
    } finally {
      setSubmitting(false);
    }
  }

  const copy = async (text: string, msg = "Copied!") => {
    try { await navigator.clipboard.writeText(text); toast(msg); } catch { /* empty */ }
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
    <Section className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="border-b border-slate-200 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.08),_transparent_60%)]">
        <Container className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Contact Us
              </h1>
              <p className="mt-2 max-w-prose text-slate-700">
                Schedule a tour, ask about openings, or learn more about our curriculum and family partnerships.
              </p>

              {/* Info chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  <span className="mr-1" aria-hidden>🕒</span>
                  Mon-Fri · 6:00 AM - 6:00 PM
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  <span
                    className="mr-1 inline-block h-2 w-2 rounded-full"
                    style={{ background: isOpen ? "#0ea5a4" : "#ef4444" }}
                  />
                  {isOpen ? "Open now" : "Closed"}
                </span>
              </div>

              {/* Contact cards */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Card className="flex items-start gap-3">
                  <div className="text-xl" aria-hidden></div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900">Phone</div>
                    <a href={`tel:${ORG.phoneTel}`} className="text-sm text-teal-700 underline-offset-4 hover:underline">
                      {ORG.phoneDisplay}
                    </a>
                    <div className="mt-1">
                      <button
                        onClick={() => copy(ORG.phoneDisplay, "Phone copied")}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </Card>

          

                <Card className="sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="text-xl" aria-hidden>📍</div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">Visit</div>
                      <div className="text-sm text-slate-700">{ORG.addressLine}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <a
                          href={ORG.mapsQuery}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
                        >
                          Open in Google Maps
                        </a>
                        <button
                          onClick={() => copy(ORG.addressLine, "Address copied")}
                          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
                        >
                          Copy address
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Map embed */}
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                    <iframe
                      title="Map"
                      loading="lazy"
                      className="h-64 w-full"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=282+W+1st+Ave,+Colville,+WA+99114&output=embed"
                    />
                  </div>
                </Card>
              </div>
            </div>

            {/* Form (Formspree via JSON; no redirects) */}
            <Card>
              <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
                {/* Honey pot for bots */}
                <input
                  type="text"
                  name="_gotcha"
                  value={form._gotcha}
                  onChange={update("_gotcha")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-900">
                    Parent/Guardian
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="Full name"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-900">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-900">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="topic" className="text-sm font-medium text-slate-900">
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={update("topic")}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-300"
                  >
                    <option>Tour</option>
                    <option>Openings/Enrollment</option>
                    <option>Tuition/Policies</option>
                    <option>General Question</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-900">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={update("message")}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-300"
                    placeholder="Tell us about your child & preferred times"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "Send"}
                </button>

                {/* Status */}
                <div aria-live="polite" className="min-h-[1rem] text-sm">
                  {sent === "ok" && (
                    <span className="text-teal-700">
                      Thank you! Your message was sent. We'll reply soon.
                    </span>
                  )}
                  {sent === "err" && (
                    <span className="text-rose-600">
                      Something went wrong sending your message. Please try again or call us.
                    </span>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </div>

      {/* FAQs */}
      <FAQs />
    </Section>
  );
};

export default Contact;
