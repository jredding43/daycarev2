import React from "react";
import { Section, Container, Card, Button } from "../components/Primitives";
import building from "../assets/building.jpg";
import CTA from "../components/CTA";
import FAQs from "../components/FAQs";

/** Leafy chip with subtle jungle styling */
const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-emerald-200/70 bg-emerald-50/70 px-3 py-1 text-[11px] font-medium text-emerald-800">
    <span className="mr-1" aria-hidden>🌿</span>
    {children}
  </span>
);

/** Section title with jungle underline “vine” */
const Title = ({
  kicker,
  title,
  subtitle,
  center,
  as: As = "h2",
  id,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  as?: React.ElementType;
  id?: string;
}) => (
  <header className={center ? "text-center max-w-2xl mx-auto" : ""} id={id}>
    {kicker && (
      <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-emerald-700">
        {kicker}
      </div>
    )}
    <As className="mt-2 text-3xl md:text-[34px] font-extrabold text-emerald-950">
      {title}
    </As>
    <div
      className={`mt-2 h-[6px] w-24 rounded-full bg-gradient-to-r from-emerald-600 via-lime-500 to-amber-400 ${center ? "mx-auto" : ""}`}
      aria-hidden
    />
    {subtitle && (
      <p className="mt-3 text-[15px] leading-6 text-emerald-800/85">{subtitle}</p>
    )}
  </header>
);

/** Round icon tile with leafy vibe */
const JungleIcon: React.FC<{ children: React.ReactNode; className?: string; label?: string }> = ({
  children,
  className,
  label,
}) => (
  <div
    className={`grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 ${className ?? ""}`}
    role={label ? "img" : undefined}
    aria-label={label}
  >
    {children}
  </div>
);

/** JSON-LD helpers (SEO) */
const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

/** ——— Page ——— */
const Home: React.FC = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["ChildCare", "Preschool", "AfterSchoolProgram"],
    name: "Jungle Kids Early Learning Center",
    url: "https://junglekidstest.netlify.app",
    telephone: "+1-509-685-7056",
    description:
      "Licensed early learning center providing play-based academics for infants through school-age, plus afterschool programs. We use Brightwheel for curriculum themes, check-in, and family communication.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Jungle Ave",
      addressLocality: "Your City",
      addressRegion: "WA",
      postalCode: "00000",
      addressCountry: "US",
    },
    image: "https://junglekidstest.netlify.app" + (building as unknown as string),
    openingHours: "Mo-Fr 06:30-18:00",
    sameAs: ["https://mybrightwheel.com/"],
  } as const;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Jungle Kids a daycare or a school?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We are a licensed early learning center. We provide care, but our focus is school-readiness and afterschool enrichment using the Brightwheel curriculum themes.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide meals?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We provide snack times and coordinate lunch options with families; allergy plans are welcomed.",
        },
      },
      {
        "@type": "Question",
        name: "How do you communicate with families?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We use Brightwheel for check-ins, messages, progress snapshots, and daily updates, plus face-to-face conversations at pickup.",
        },
      },
      {
        "@type": "Question",
        name: "What ages do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We serve infants through school-age (up to 13). Contact us for current openings and placement options.",
        },
      },
    ],
  } as const;

  return (
    <div className="bg-white text-emerald-950">
      {/* SEO structured data */}
      <JsonLd data={orgSchema} />
      <JsonLd data={faqSchema} />

      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[999] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to main content
      </a>

      {/* Decorative jungle haze (non-interactive) */}
      <div className="pointer-events-none fixed inset-x-0 top-[-12rem] z-0 mx-auto h-72 w-[38rem] rounded-[999px] bg-lime-200/40 blur-3xl" aria-hidden />
      <div className="pointer-events-none fixed right-[-8rem] top-40 z-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />

      {/* HERO */}
      <Section aria-label="Welcome">
        <Container className="py-12 md:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <nav aria-label="Highlights" className="inline-flex items-center gap-2">
                <Chip>Early Learning Center</Chip>
                <Chip>Afterschool Enrichment</Chip>
                <Chip>Brightwheel Curriculum</Chip>
              </nav>

              <h1 className="mt-4 text-[32px] sm:text-[40px] font-extrabold leading-tight tracking-[-0.01em]">
                More than childcare—school-ready learning for early ages, plus afterschool.
              </h1>

              <p className="mt-3 text-[16px] leading-7 text-emerald-900/80 max-w-prose">
                We're a licensed early learning center where children build strong foundations through purposeful play
                and monthly Brightwheel themes. Families count on our calm routines during the day and our afterschool
                homework & enrichment in the afternoons.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" aria-label="Schedule a tour via contact form">Schedule a Tour</Button>
                <Button variant="ghost" href="tel:15096857056" aria-label="Call Jungle Kids at (509) 685-7056">
                  Call (509) 685-7056
                </Button>
              </div>

              {/* Quick trust bullets for LCP adjacency */}
              <ul className="mt-6 grid grid-cols-2 gap-2 text-[13px] text-emerald-900/80">
                <li className="flex items-center gap-2">
                  <JungleIcon label="Low ratios"><span aria-hidden>👨‍👩‍👧</span></JungleIcon>
                  Low teacher-child ratios
                </li>
                <li className="flex items-center gap-2">
                  <JungleIcon label="Background checks"><span aria-hidden>🛡️</span></JungleIcon>
                  Background-checked staff
                </li>
                <li className="flex items-center gap-2">
                  <JungleIcon label="Parent app"><span aria-hidden>📲</span></JungleIcon>
                  Daily updates in Brightwheel
                </li>
                <li className="flex items-center gap-2">
                  <JungleIcon label="Allergy aware"><span aria-hidden>🥜</span></JungleIcon>
                  Allergy-aware snacks
                </li>
              </ul>
            </div>

            <figure className="rounded overflow-hidden ring-1 ring-emerald-200 shadow-sm">
              <img
                src={building}
                alt="Bright, welcoming classroom at Jungle Kids early learning center"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption className="sr-only">Our facility emphasizes natural light, safety, and calm spaces.</figcaption>
            </figure>
          </div>
        </Container>

        {/* Trust & Enrollment strip */}
        <Container className="pb-10 pt-0" aria-label="Trusted tools and enrollment">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Brightwheel */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white" aria-hidden>
                  ✨
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">We use Brightwheel</div>
                  <div className="text-xs text-slate-600">Monthly learning themes • Check-in • Messaging • Progress</div>
                </div>
                <a
                  href="https://mybrightwheel.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-slate-50"
                  aria-label="Learn more about Brightwheel"
                >
                  Learn more
                </a>
              </div>

              {/* Divider (large screens) */}
              <div className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden />

              {/* Now Enrolling */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 ring-1 ring-inset ring-teal-200">
                  Now Enrolling
                </span>
                <div className="text-sm text-slate-700">
                  Infants • Toddlers • Preschool • Afterschool (K-8)
                </div>
                <Button href="/contact" className="ml-1" aria-label="Apply or contact Jungle Kids">
                  Apply / Contact
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* HIGHLIGHTS — Jungle badges */}
      <Section aria-labelledby="highlights">
        <Container className="py-8">
          <Title as="h2" id="highlights" title="Highlights families love" subtitle="Little details that add up to big peace of mind." />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Licensed Center", desc: "State licensed & inspected", icon: "✅" },
              { title: "CPR / First Aid", desc: "All staff certified", icon: "➕" },
              { title: "Secure Entrances", desc: "Monitored & controlled", icon: "🔒" },
              { title: "Healthy Snacks", desc: "Allergy-aware options", icon: "🍎" },
            ].map(({ title, desc, icon }) => (
              <div
                key={title}
                className="group flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <JungleIcon label={title}><span aria-hidden>{icon}</span></JungleIcon>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{title}</div>
                  <div className="truncate text-xs text-emerald-900/70">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROGRAMS OVERVIEW */}
      <Section className="bg-emerald-50/50" aria-labelledby="programs">
        <Container className="py-12">
          <Title
            center
            as="h2"
            id="programs"
            kicker="Programs"
            title="Early learning by stage, plus afterschool"
            subtitle="Purposeful play and structured skill-building with Brightwheel monthly themes."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Early Learners (0-12 Months)",
                desc: "Warm, responsive care with sensory play, language exposure, and routines that build security.",
                icon: "🍼",
              },
              {
                title: "Preschool Prep (12-36 Months)",
                desc: "Sights, sounds, and colors introduce early literacy, math, art, and social skills through play-based centers and projects.",
                icon: "🎨",
              },
              {
                title: "Afterschool (K-8 Grade)",
                desc: "Before- and after-school care with Brightwheel curriculum learning, snack, homework help, and rotating enrichment clubs.",
                icon: "📚",
              },
            ].map(({ title, desc, icon }) => (
              <Card key={title} className="p-6">
                <div className="flex items-start gap-3">
                  <JungleIcon className="h-9 w-9" label={title}>{icon}</JungleIcon>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-emerald-900/85">{desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CURRICULUM & COMMITMENTS */}
      <Section aria-labelledby="promise">
        <Container className="py-12">
          <Title
            center
            as="h2"
            id="promise"
            kicker="Our Jungle Promise"
            title="Care, connection, and purposeful play"
            subtitle="From birth through age 13, we pair warm relationships with a structured, play-based curriculum."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Comprehensive Curriculum",
                desc: "Monthly Brightwheel themes guide hands-on projects across literacy, math, science, and the arts.",
                icon: "✨",
              },
              {
                title: "Daily Learning Activities",
                desc: "Developmentally-appropriate centers, small-group lessons, and outdoor gross-motor play.",
                icon: "🧩",
              },
              {
                title: "Progress Snapshots",
                desc: "We share checklists, photos, and notes so you can see growth and celebrate milestones.",
                icon: "📈",
              },
              {
                title: "Nutrition",
                desc: "Nutritious meals and snacks to fuel growth and focus.",
                icon: "🥗",
              },
              {
                title: "Safety First",
                desc: "Secured entries, background-checked staff, and practiced routines.",
                icon: "🛡️",
              },
              {
                title: "Family Partnership",
                desc: "Open communication and shared goals for every child.",
                icon: "🤝",
              },
            ].map(({ title, desc, icon }) => (
              <Card key={title} className="p-6">
                <div className="flex items-start gap-3">
                  <JungleIcon className="h-9 w-9" label={title}>{icon}</JungleIcon>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-emerald-900/85">{desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* DAILY FLOW */}
      <main id="main">
      <Section aria-labelledby="day">
        <Container className="py-12">
          <Title
            center
            as="h2"
            id="day"
            kicker="A Day in the Jungle"
            title="Calm structure, playful learning"
            subtitle="Times may vary slightly by age group."
          />

          {/* LIST VIEW */}
          <ol className="mt-10 w-full divide-y divide-emerald-100 rounded-2xl bg-white ring-1 ring-emerald-200/70">
            {[
              { time: "6:00", title: "Arrival", note: "Wash hands, warm greetings, and settle in with quiet play.", icon: "👋" },
              { time: "7:30", title: "Wash Up for Breakfast", note: "Transition and handwashing before meal.", icon: "🧼" },
              { time: "7:40", title: "Breakfast", note: "Nutritious breakfast and table manners.", icon: "🥞" },
              { time: "8:00", title: "Circle Time", note: "Songs, stories, calendar, and group learning.", icon: "🎶" },
              { time: "8:30", title: "Writing", note: "Early literacy and pre-writing practice.", icon: "✍️" },
              { time: "9:00", title: "Outside Play", note: "Gross motor play and fresh air.", icon: "🛝" },
              { time: "10:00", title: "Snack Time", note: "Wash hands, enjoy a healthy snack.", icon: "🍎" },
              { time: "10:30", title: "Math", note: "Hands-on counting, shapes, and number games.", icon: "🔢" },
              { time: "11:00", title: "Outside Play", note: "More movement and social play outdoors.", icon: "🌳" },
              { time: "11:30", title: "Lunch", note: "Wash up, eat balanced meal together.", icon: "🥗" },
              { time: "12:30–1:00", title: "Quiet / Nap Time", note: "Rest, nap, or quiet activities.", icon: "😴" },
              { time: "1:00", title: "Art & Craft", note: "Creative projects and hands-on making.", icon: "🎨" },
              { time: "2:00", title: "Outside Play", note: "Wrap up the day with outdoor fun.", icon: "☀️" },
            ].map(({ time, title, note, icon }) => (
              <li key={time} className="group">
                <article className="flex items-start gap-4 p-4 sm:p-5 hover:bg-emerald-50/40">
                  <div className="flex items-center gap-3 shrink-0">
                    <JungleIcon className="h-9 w-9" label={title}>{icon}</JungleIcon>
                    <time className="rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-emerald-200 text-emerald-900/80 bg-emerald-50">
                      {time}
                    </time>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-emerald-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-emerald-900/85">{note}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-center text-xs text-emerald-900/70">
            Schedule may adjust for weather, special activities, and age-specific needs.
          </p>
        </Container>
      </Section>
    </main>

      {/* CTA — your existing component (with QR) */}
      <Section aria-label="Get in touch">
        <Container className="py-12">
          <CTA />
        </Container>
      </Section>

      {/* FAQs (collapsible + indexed by JSON-LD above) */}
      <Section>
        <FAQs />
      </Section>
    </div>
  );
};

export default Home;
