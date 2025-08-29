import React from "react";
import { Link } from "react-router-dom";
import { Section, Container, Card } from "../components/Primitives";

import class1 from "../assets/class1.jpg";
import FAQs from "../components/FAQs";

const ORG = {
  name: "Jungle Kids Early Learning",
  phoneDisplay: "(509) 952-9001",
  phoneTel: "15099529001",
  address: "282 W 1st Ave, Colville, WA 99114",
  hours: "Mon-Fri · 6:00 AM - 6:00 PM",
  facebookUrl: "https://www.facebook.com/61573180175113",
};

/* =========================
   Staff
   ========================= */
type Staff = {
  name: string;
  role: string;
  bio: string;
  badges: string[];
  photo?: string;
};

const STAFF: Staff[] = [
  {
    name: "Amber Lewis",
    role: "Center Director",
    bio: "Leads our team and family partnerships; 10+ years in early childhood leadership.",
    badges: ["CPR/First Aid", "ECE Admin", "Background-checked"],
    // photo: amber,
  },
  {
    name: "Riley Chen",
    role: "Lead Teacher — Preschool",
    bio: "Play-based literacy, emergent curriculum, and joyful classroom rituals.",
    badges: ["ECE Certified", "CDA", "5+ yrs exp."],
    // photo: riley,
  },
  {
    name: "Jordan Smith",
    role: "Assistant Teacher",
    bio: "Supports small groups, centers, and outdoor play with patience and warmth.",
    badges: ["CPR/First Aid", "Food Handler"],
    // photo: jordan,
  },
  {
    name: "Kayla Nguyen",
    role: "Lead Teacher — Infant/Toddler",
    bio: "Attachment-focused care with responsive routines and sensory exploration.",
    badges: ["ECE Infant/Toddler", "CDA"],
    // photo: kayla,
  },
  {
    name: "Mia Patel",
    role: "Support Staff",
    bio: "Helps across classrooms; maintains clean, safe environments.",
    badges: ["Background-checked", "CPR/First Aid"],
    // photo: mia,
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs text-slate-700">
    {children}
  </span>
);

/* =========================
   Reusable bits
   ========================= */
const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700">
    {children}
  </span>
);

const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-2">
    <span aria-hidden>•</span>
    <span>{children}</span>
  </li>
);

/* =========================
   Page
   ========================= */
const About: React.FC = () => {
  return (
    <Section className="bg-gradient-to-b from-slate-50 to-white">
      {/* SEO: ChildCare structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ChildCare",
            name: ORG.name,
            telephone: `+1-${ORG.phoneDisplay}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: "282 W 1st Ave",
              addressLocality: "Colville",
              addressRegion: "WA",
              postalCode: "99114",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 06:00-18:00",
            sameAs: [ORG.facebookUrl],
          }),
        }}
      />

      {/* Hero */}
      <div className="border-b border-slate-200 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.08),_transparent_60%)]">
        <Container className="py-12 sm:py-16">
          <div className="grid items-center gap-8 sm:grid-cols-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                About {ORG.name}
              </h1>
              <p className="mt-4 text-slate-700">
                We're a locally-owned early learning center rooted in
                relationships, play, and family partnership. Our team blends
                structure with creativity—bringing literacy, STEAM, music, and
                outdoor play to life every day.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Pill>Licensed & background-checked staff</Pill>
                <Pill>Play-based + developmentally appropriate</Pill>
                <Pill>Family communication</Pill>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-teal-700"
                >
                  Schedule a Tour
                </Link>
                <Link
                  to="/information"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Read Policies & FAQs
                </Link>
              </div>
            </div>

            {/* Visual panel */}
            <div className="rounded overflow-hidden ring-1 ring-emerald-200 shadow-sm">
              <img
                src={class1}
                alt="Children learning in a bright classroom surrounded by friendly jungle decor"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Quick facts */}
      <Container className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Hours", value: ORG.hours },
            { label: "Phone", value: ORG.phoneDisplay, href: `tel:${ORG.phoneTel}` },
            {
              label: "Address",
              value: ORG.address,
              href: "https://www.google.com/maps/search/?api=1&query=282+W+1st+Ave,+Colville,+WA+99114",
            },
            { label: "Family App", value: "Brightwheel", href: "https://mybrightwheel.com/" },
          ].map((fact) => (
            <Card key={fact.label} className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wide text-slate-500">{fact.label}</div>
              {fact.href ? (
                <a
                  href={fact.href}
                  target={fact.href.startsWith("http") ? "_blank" : undefined}
                  rel={fact.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-sm font-semibold text-slate-900 underline decoration-teal-200 underline-offset-4 hover:decoration-teal-400"
                >
                  {fact.value}
                </a>
              ) : (
                <div className="text-sm font-semibold text-slate-900">{fact.value}</div>
              )}
            </Card>
          ))}
        </div>
      </Container>

      {/* Our Approach */}
      <Container className="py-4">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-slate-900">Our Philosophy</h2>
            <p className="mt-2 text-sm text-slate-700">
              Children learn best through secure relationships, purposeful play,
              and rich language. We scaffold learning with warm guidance and
              open-ended materials so each child can explore, try, and grow.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-700">
              <Bullet>Play-based, child-led exploration</Bullet>
              <Bullet>Social-emotional learning every day</Bullet>
              <Bullet>Family partnership & open communication</Bullet>
            </ul>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">Curriculum Pillars</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["📚 Literacy", "Storytime, songs, print-rich spaces"],
                ["🔬 STEAM", "Hands-on science, math, and building"],
                ["🎨 Art", "Open-ended, process-focused creativity"],
                ["🎵 Music & Movement", "Rhythm, coordination, and joy"],
                ["🧠 SEL", "Feelings, friendships, problem-solving"],
                ["🌿 Outdoor Play", "Gross motor skills & fresh air"],
              ].map(([title, desc]) => (
                <div
                  key={title as string}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="text-sm font-semibold text-slate-900">{title}</div>
                  <div className="mt-1 text-sm text-slate-700">{desc}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>

      {/* Safety & Licensing + Daily Rhythm */}
      <Container className="py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-slate-900">Safety & Licensing</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <Bullet>Licensed childcare center; staff are background-checked.</Bullet>
              <Bullet>Daily health checks, secure entry, and sign-in/out procedures.</Bullet>
              <Bullet>CPR/First Aid trained staff; regular safety drills.</Bullet>
              <Bullet>Cleanliness standards and toy/equipment sanitization routines.</Bullet>
              <Bullet>Allergies noted; we work with families on care plans.</Bullet>
            </ul>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-slate-900">A Day at a Glance</h2>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
              <div>
                <div className="font-semibold text-slate-900">Morning</div>
                <ul className="mt-1 space-y-1">
                  <li>Welcome & centers</li>
                  <li>Circle time & literacy</li>
                  <li>Snack & outdoor play</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-slate-900">Afternoon</div>
                <ul className="mt-1 space-y-1">
                  <li>Lunch & rest time</li>
                  <li>STEAM / art invitations</li>
                  <li>Music, movement & pickup</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Exact schedules vary by classroom and age group.
            </p>
          </Card>
        </div>
      </Container>

      {/* Meet the Staff */}
      <Container className="py-10">
        <div className="mb-6 flex items-end justify-between gap-3">
            <div>
            <h2 id="staff" className="text-2xl sm:text-3xl font-bold text-slate-900">Meet the Staff</h2>
            <p className="mt-1 max-w-2xl text-slate-700">
                Warm, experienced educators who know each child by name, interests, and needs.
            </p>
            </div>
        </div>

        {/* Bigger photo + info to the right */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {STAFF.map((s) => (
            <Card key={s.name} className="overflow-hidden p-0">
                <div className="flex flex-col sm:flex-row">
                {/* Photo / Initials */}
                <div className="relative w-full sm:w-56 md:w-64 flex-shrink-0">
                    {s.photo ? (
                    <img
                        src={s.photo}
                        alt={`${s.name}, ${s.role}`}
                        className="h-56 w-full sm:h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-slate-100 text-4xl font-semibold text-slate-500 sm:h-full sm:w-56 md:w-64">
                        {initials(s.name)}
                    </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 p-4 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900">{s.name}</h3>
                        <p className="text-sm text-slate-600">{s.role}</p>
                    </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-700">{s.bio}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                    {s.badges.map((b) => (
                        <Badge key={b}>{b}</Badge>
                    ))}
                    </div>
                </div>
                </div>
            </Card>
            ))}
        </div>
        </Container>


      {/* FAQs */}
      <Container className="py-8">
        <FAQs />
      </Container>

      {/* CTA */}
      <Container className="py-10">
        <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6 text-slate-900 sm:p-8">
          <div className="grid items-center gap-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <h3 className="text-xl font-semibold text-slate-900">
                Ready to visit {ORG.name}?
              </h3>
              <p className="mt-1 text-sm text-slate-700">
                We'd love to meet your family, show you our classrooms, and answer your questions.
              </p>
            </div>
            <div className="flex gap-3 sm:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-teal-700"
              >
                Schedule a Tour
              </Link>
              <a
                href={`tel:${ORG.phoneTel}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Call {ORG.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
