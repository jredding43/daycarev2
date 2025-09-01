import React, { useMemo } from "react";

/** Types */
type Program = {
  title: string;
  age_range: string;
  description: string;
  ratio: string;
  tuition: { full_time: number; part_time?: number; drop_in?: number };
  availability: {
    status: string; // "Openings" | "Waitlist" | "Full" | etc.
    max_capacity: number;
    enrolled: number;
    open_spots?: number;
    next_opening?: string;
  };
};
type Closure = { title: string; start: string; end?: string; description?: string };
type Document = { title: string; file: string; description?: string };
type InfoItem = { title: string; description?: string };

/** Helpers */
const fmtUSD = (n?: number) =>
  typeof n === "number"
    ? new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
    : "—";

const fmtDate = (d?: string) => {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? d
    : new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(dt);
};

const badgeClass = (status: string) => {
  const map: Record<string, string> = {
    Open: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    Openings: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    Waitlist: "bg-amber-50 text-amber-900 ring-amber-200",
    Full: "bg-rose-50 text-rose-800 ring-rose-200",
  };
  return map[status] || "bg-slate-50 text-slate-800 ring-slate-200";
};

const capacityPct = (enrolled: number, max: number) =>
  Math.max(0, Math.min(100, Math.round((enrolled / Math.max(1, max)) * 100)));

/** Build-time content loading (no network calls): */
const programModules = import.meta.glob("/src/content/programs/*.json", { eager: true, import: "default" }) as Record<string, Program>;
const closureModules = import.meta.glob("/src/content/closures/*.json", { eager: true, import: "default" }) as Record<string, Closure>;
const documentModules = import.meta.glob("/src/content/documents/*.json", { eager: true, import: "default" }) as Record<string, Document>;
const infoModules = import.meta.glob("/src/content/information/*.json", { eager: true, import: "default" }) as Record<string, InfoItem>;

const programs: Program[] = Object.values(programModules);
const closures: Closure[] = Object.values(closureModules);
const documents: Document[] = Object.values(documentModules);
const infoItems: InfoItem[] = Object.values(infoModules);

const Information: React.FC = () => {
  // Sort closures into upcoming/past
  const sortedClosures = useMemo(() => {
    const now = new Date();
    const toKey = (c: Closure) => new Date(c.start).getTime() || 0;
    const upcoming = closures.filter((c) => new Date(c.end ?? c.start) >= now).sort((a, b) => toKey(a) - toKey(b));
    const past = closures.filter((c) => new Date(c.end ?? c.start) < now).sort((a, b) => toKey(b) - toKey(a));
    return { upcoming, past };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 text-emerald-950">
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight">Information</h1>

      {/* ===== Bulletin Board ===== */}
      <section aria-labelledby="bulletin-title" className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="bulletin-title" className="text-xl font-bold tracking-tight">Bulletin Board</h2>
          {infoItems.length > 0 && (
            <span className="text-xs text-emerald-900/60">{infoItems.length} update{infoItems.length > 1 ? "s" : ""}</span>
          )}
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50/60 to-white p-5 shadow-sm">
          {infoItems.length === 0 ? (
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center text-emerald-900/70">
              No bulletin updates yet.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {infoItems.map((n, idx) => (
                <li key={`${n.title}-${idx}`} className="relative rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                  <span aria-hidden className="absolute -top-2 right-6 h-4 w-4 rotate-12 rounded-full bg-emerald-500" />
                  <h3 className="pr-6 text-sm font-semibold">{n.title}</h3>
                  {n.description && <p className="mt-1 text-sm text-emerald-900/80 whitespace-pre-line">{n.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ===== Programs + Closures/Documents ===== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Programs */}
        <section className="lg:col-span-2">
          <h2 className="mb-3 text-xl font-bold tracking-tight">Programs</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {programs.length === 0 && (
              <div className="md:col-span-2 rounded-2xl border border-emerald-100 bg-white p-6 text-center text-emerald-900/70">
                No programs available.
              </div>
            )}

            {programs.map((p) => {
              const status = p.availability.status === "Openings" ? "Open" : p.availability.status;
              const max = p.availability.max_capacity ?? 0;
              const enrolled = p.availability.enrolled ?? 0;
              const openSpots = typeof p.availability.open_spots === "number" ? p.availability.open_spots : Math.max(0, max - enrolled);
              const pct = capacityPct(enrolled, max);
              const meterTone = pct < 70 ? "bg-emerald-500" : pct < 95 ? "bg-amber-500" : "bg-rose-500";

              return (
                <article key={p.title} className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:shadow-md" aria-label={`${p.title} program`}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${badgeClass(status)}`}>
                      {status}
                    </span>
                  </div>

                  <p className="mb-3 text-sm text-emerald-900/80">{p.description}</p>

                  <div className="mb-3 grid grid-cols-2 gap-3 rounded-xl bg-emerald-50/50 p-3 ring-1 ring-emerald-100">
                    <div className="flex items-center justify-between text-xs"><span className="text-emerald-900/70">Age Range</span><span className="font-medium">{p.age_range}</span></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-emerald-900/70">Ratio</span><span className="font-medium">{p.ratio}</span></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-emerald-900/70">Full-time</span><span className="font-medium">{fmtUSD(p.tuition.full_time)}</span></div>
                    <div className="flex items-center justify-between text-xs"><span className="text-emerald-900/70">Part-time</span><span className="font-medium">{fmtUSD(p.tuition.part_time)}</span></div>
                    <div className="col-span-2 flex items-center justify-between text-xs"><span className="text-emerald-900/70">Drop-in (day)</span><span className="font-medium">{fmtUSD(p.tuition.drop_in)}</span></div>
                  </div>

                  <div className="mb-1 flex items-center justify-between text-xs text-emerald-900/70">
                    <span>Capacity</span>
                    <span>{enrolled}/{max} enrolled · {openSpots} open</span>
                  </div>
                  <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                    <div className={`h-full ${meterTone} transition-[width]`} style={{ width: `${pct}%` }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} />
                  </div>

                  {p.availability.next_opening && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-emerald-900/70">Next opening:</span>
                      <span className="font-medium">{fmtDate(p.availability.next_opening)}</span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Closures */}
          <section>
            <h2 className="mb-3 text-xl font-bold tracking-tight">Closures & Holidays</h2>
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              {sortedClosures.upcoming.length === 0 && sortedClosures.past.length === 0 ? (
                <p className="text-emerald-900/70">No closures or holidays listed.</p>
              ) : (
                <>
                  {sortedClosures.upcoming.length > 0 && (
                    <>
                      <h3 className="mb-1 text-sm font-semibold text-emerald-900/80">Upcoming</h3>
                      <ul className="mb-3 space-y-2">
                        {sortedClosures.upcoming.map((c) => (
                          <li key={`u-${c.title}`}>
                            <p className="text-sm font-medium">{c.title}</p>
                            <p className="text-xs text-emerald-900/70">{fmtDate(c.start)}{c.end ? ` – ${fmtDate(c.end)}` : ""}</p>
                            {c.description && <p className="text-sm text-emerald-900/80">{c.description}</p>}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {sortedClosures.past.length > 0 && (
                    <details>
                      <summary className="cursor-pointer text-sm font-semibold text-emerald-900/80">
                        Past Closures ({sortedClosures.past.length})
                      </summary>
                      <ul className="mt-2 space-y-2">
                        {sortedClosures.past.slice(0, 8).map((c) => (
                          <li key={`p-${c.title}`}>
                            <p className="text-sm font-medium">{c.title}</p>
                            <p className="text-xs text-emerald-900/70">{fmtDate(c.start)}{c.end ? ` – ${fmtDate(c.end)}` : ""}</p>
                            {c.description && <p className="text-sm text-emerald-900/80">{c.description}</p>}
                          </li>
                        ))}
                        {sortedClosures.past.length > 8 && <li className="text-xs text-emerald-900/60">Showing latest 8…</li>}
                      </ul>
                    </details>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Documents */}
          <section>
            <h2 className="mb-3 text-xl font-bold tracking-tight">Documents</h2>
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              {documents.length === 0 ? (
                <p className="text-emerald-900/70">No documents available.</p>
              ) : (
                <ul className="divide-y divide-emerald-100">
                  {documents.map((d) => (
                    <li key={d.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center">
                        <span aria-hidden>📄</span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{d.title}</p>
                        {d.description && <p className="mt-0.5 text-xs text-emerald-900/70">{d.description}</p>}
                        <a href={d.file} className="mt-1 inline-flex text-sm font-medium text-teal-700 hover:underline" target="_blank" rel="noopener noreferrer" aria-label={`Download ${d.title}`}>
                          Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </aside>
      </div>

      <p className="mt-8 text-center text-xs text-emerald-900/50">Questions? Call, text, or email us—happy to help.</p>
    </section>
  );
};

export default Information;
