import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { Section, Container } from "../components/Primitives";
import f0 from "../assets/facility0.jpg";
import f2 from "../assets/facility2.jpg";
import f3 from "../assets/facility3.jpg";
import f4 from "../assets/facility4.jpg";
import f5 from "../assets/facility5.jpg";

/* =========================
   Types & Data
   ========================= */
type Category = "Classrooms" | "Outdoor" | "Activities";

type Slide = {
  src: string;
  alt: string;
  caption: string;
  w?: number;
  h?: number;
};

type Album = {
  title: string;
  category: Category;
  description?: string;
  items: Slide[];
};

const albums: Album[] = [
  {
    title: "Sunflower Classroom",
    category: "Classrooms",
    description: "Reading corners, learning stations, and cozy spaces.",
    items: [
      { src: f0, alt: "Classroom reading area", caption: "Reading corner in Sunflower room" },
      { src: f4, alt: "Reading nook with books", caption: "Cozy reading nook with rotating titles" },
    ],
  },
  {
    title: "Outdoor Play",
    category: "Outdoor",
    description: "Safe play areas with shade and age-appropriate equipment.",
    items: [
      { src: f2, alt: "Outdoor play area", caption: "Shaded outdoor play" },
      { src: f5, alt: "Playground structure", caption: "Age-appropriate playground equipment" },
    ],
  },
  {
    title: "Art & Activities",
    category: "Activities",
    description: "Hands-on projects that spark creativity and curiosity.",
    items: [
      { src: f3, alt: "Kids painting during art time", caption: "Creative time with non-toxic paints" },
    ],
  },
];

/* =========================
   Helpers
   ========================= */
function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function useOpenCloseKeys(onPrev?: () => void, onNext?: () => void, onClose?: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext, onClose]);
}

/* =========================
   Component
   ========================= */
const Facility: React.FC = () => {
  const [view, setView] = useState<"masonry" | "grid">("grid");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const searchId = useId();

  // Lightbox state
  const [albumIndex, setAlbumIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openAlbum = (idx: number, startSlide = 0) => {
    setAlbumIndex(idx);
    setSlideIndex(startSlide);
  };
  const closeAlbum = () => setAlbumIndex(null);

  const allCategories = useMemo(() => {
    const base: Array<"All" | Category> = ["All", "Classrooms", "Outdoor", "Activities"];
    return base;
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: albums.length };
    for (const a of albums) map[a.category] = (map[a.category] ?? 0) + 1;
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return albums.filter((a) => {
      const inCat = filter === "All" ? true : a.category === filter;
      if (!inCat) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.items.some((s) => s.caption.toLowerCase().includes(q))
      );
    });
  }, [query, filter]);

  const currentAlbum = useMemo(() => (albumIndex !== null ? albums[albumIndex] : null), [albumIndex]);
  const hasPrev = albumIndex !== null && slideIndex > 0;
  const hasNext = albumIndex !== null && currentAlbum ? slideIndex < currentAlbum.items.length - 1 : false;
  const goPrev = () => hasPrev && setSlideIndex((i) => i - 1);
  const goNext = () => hasNext && setSlideIndex((i) => i + 1);

  // Keyboard navigation for lightbox
  useOpenCloseKeys(goPrev, goNext, closeAlbum);

  // Preload neighbors
  useEffect(() => {
    if (albumIndex === null || !currentAlbum) return;
    const prev = currentAlbum.items[slideIndex - 1]?.src;
    const next = currentAlbum.items[slideIndex + 1]?.src;
    [prev, next].forEach((s) => {
      if (!s) return;
      const img = new Image();
      img.src = s;
    });
  }, [albumIndex, slideIndex, currentAlbum]);

  // Focus trap when modal opens
  useEffect(() => {
    if (albumIndex === null) return;
    const prevActive = document.activeElement as HTMLElement | null;
    // Delay focus until element exists
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(id);
      prevActive?.focus?.();
    };
  }, [albumIndex]);

 return (
  <Section className="bg-gradient-to-b from-emerald-50/40 to-white">
    {/* Hero / Controls */}
    <div className="border-b border-emerald-100/70 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_60%)]">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950">
              Facility Gallery
            </h1>
            <p className="mt-2 max-w-2xl text-emerald-900/80">
              Explore albums — open any card to view a lightbox, swipe/arrow through photos, and download originals.
            </p>
          </div>

          {/* View toggle */}
          <div
            role="tablist"
            aria-label="Gallery layout"
            className="ml-auto inline-flex items-center gap-1 rounded-2xl border border-emerald-200 bg-white/80 p-1 backdrop-blur supports-[backdrop-filter]:bg-white/60"
          >
            <button
              role="tab"
              aria-selected={view === "grid"}
              onClick={() => setView("grid")}
              className={cx(
                "rounded-xl px-3 py-2 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                view === "grid"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-emerald-900 hover:bg-emerald-50"
              )}
              title="Grid view"
            >
              Grid
            </button>
            <button
              role="tab"
              aria-selected={view === "masonry"}
              onClick={() => setView("masonry")}
              className={cx(
                "rounded-xl px-3 py-2 text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                view === "masonry"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-emerald-900 hover:bg-emerald-50"
              )}
              title="Masonry view"
            >
              Masonry
            </button>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {allCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                filter === c
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                  : "border-emerald-100 bg-white text-emerald-900 hover:bg-emerald-50"
              )}
            >
              {c}
              <span className="ml-1 text-emerald-900/60">
                {counts[c as keyof typeof counts] ?? 0}
              </span>
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5">
            <label htmlFor={searchId} className="text-xs text-emerald-900/70">
              Search
            </label>
            <div className="relative">
              <input
                id={searchId}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rooms, activities..."
                className="w-48 rounded-full px-8 py-1 text-sm outline-none placeholder:text-emerald-900/40"
              />
              {/* Search icon */}
              <svg
                className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-900/50"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a7 7 0 1 1 1.414-1.414l3.387 3.387a1 1 0 0 1-1.414 1.414l-3.387-3.387ZM14 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {(query || filter !== "All") && (
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
                className="rounded-full px-2 py-1 text-xs font-medium text-emerald-900 hover:bg-emerald-50"
                title="Clear filters"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>

    {/* Albums */}
    <Container className="py-10">
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center text-emerald-900/70 shadow-sm">
          No albums match your search.
        </div>
      ) : view === "masonry" ? (
        /* Masonry columns of album covers */
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {filtered.map((album) => {
            const cover = album.items[0]?.src;
            return (
              <article
                key={album.title}
                className="mb-5 break-inside-avoid overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative group">
                  {!loaded.has(cover) && (
                    <div className="absolute inset-0 animate-pulse bg-emerald-100/40" />
                  )}
                  <img
                    src={cover}
                    alt={`${album.title} cover`}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{ aspectRatio: "4 / 3" }}
                    onLoad={() => setLoaded((s) => new Set(s).add(cover))}
                    onClick={() => openAlbum(albums.indexOf(album))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openAlbum(albums.indexOf(album))}
                  />
                  {/* Overlay */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-4 text-white">
                    <h3 className="text-lg font-semibold">{album.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-xs opacity-90">
                      <span className="rounded-full bg-white/20 px-2 py-0.5">
                        {album.category}
                      </span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5">
                        {album.items.length} {album.items.length === 1 ? "photo" : "photos"}
                      </span>
                    </div>
                  </div>
                </div>
                {album.description && (
                  <p className="px-4 pb-4 pt-3 text-sm text-emerald-900/80">
                    {album.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        /* Grid of album covers */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((album) => {
            const cover = album.items[0]?.src;
            return (
              <article
                key={album.title}
                className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative group">
                  {!loaded.has(cover) && (
                    <div className="absolute inset-0 animate-pulse bg-emerald-100/40" />
                  )}
                  <img
                    src={cover}
                    alt={`${album.title} cover`}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    onLoad={() => setLoaded((s) => new Set(s).add(cover))}
                    onClick={() => openAlbum(albums.indexOf(album))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && openAlbum(albums.indexOf(album))}
                  />
                  {/* Title chip */}
                  <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-emerald-900">
                      {album.title}
                    </span>
                    <span className="hidden rounded-full bg-white/90 px-2.5 py-1 text-xs text-emerald-900/70 sm:inline">
                      {album.items.length} {album.items.length === 1 ? "photo" : "photos"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="text-sm font-medium text-emerald-950">
                      {album.category}
                    </div>
                    {album.description && (
                      <div className="text-xs text-emerald-900/70">
                        {album.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => openAlbum(albums.indexOf(album))}
                    className="rounded-lg border border-emerald-100 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 hover:bg-emerald-50"
                  >
                    View album
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </Container>

    {/* Lightbox / Album modal (unchanged) */}
    {albumIndex !== null && currentAlbum && (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        ref={modalRef}
      >
        <div
          className="absolute inset-0 bg-emerald-950/70 backdrop-blur-sm"
          onClick={closeAlbum}
        />
        <div className="relative z-[61] w-full max-w-6xl overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-emerald-950">
                {currentAlbum.title}
              </h2>
              <p className="text-xs text-emerald-900/70">
                {currentAlbum.category} • {slideIndex + 1} / {currentAlbum.items.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={currentAlbum.items[slideIndex].src}
                download
                className="hidden sm:inline rounded-lg border border-emerald-100 bg-white px-3 py-1.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
              >
                Download
              </a>
              <button
                ref={closeBtnRef}
                onClick={closeAlbum}
                className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-50"
                aria-label="Close"
              >
                ✖
              </button>
            </div>
          </div>

          {/* Image area */}
          <div className="relative flex items-center justify-center bg-emerald-50">
            <img
              src={currentAlbum.items[slideIndex].src}
              alt={currentAlbum.items[slideIndex].alt}
              className="max-h-[72vh] w-auto object-contain"
              loading="eager"
              decoding="async"
            />

            {hasPrev && (
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-900 shadow hover:bg-white"
                aria-label="Previous"
              >
                ‹
              </button>
            )}
            {hasNext && (
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-900 shadow hover:bg-white"
                aria-label="Next"
              >
                ›
              </button>
            )}
          </div>

          {/* Caption + Thumbnails */}
          <div className="border-t">
            <div className="px-4 py-3 text-sm text-emerald-900/85 sm:px-6">
              {currentAlbum.items[slideIndex].caption}
            </div>
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-3 sm:px-6">
              {currentAlbum.items.map((s, i) => (
                <button
                  key={s.src + i}
                  onClick={() => setSlideIndex(i)}
                  className={cx(
                    "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border",
                    i === slideIndex
                      ? "border-emerald-600 ring-2 ring-emerald-500"
                      : "border-emerald-100"
                  )}
                  title={s.caption}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </Section>
);
};

export default Facility;
