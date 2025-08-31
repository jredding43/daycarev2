import React, { useEffect, useMemo, useRef, useState } from "react";
import { Section, Container } from "../components/Primitives";


const modules = import.meta.glob(
  "/src/assets/pictures/**/*.{png,jpg,jpeg,webp,avif,gif}",
  { eager: true, as: "url" }
) as Record<string, string>;

type AlbumKey =   "kids" | "outside" | "toddlers" | "misc" | "documents";
type Slide = { src: string; alt: string; caption: string };
type Album = { key: AlbumKey; title: string; description?: string; items: Slide[] };

const TITLE_MAP: Record<AlbumKey, string> = {
  kids: "Kids Sections",
  outside: "Outdoor Spaces",
  toddlers: "Toddler/Infants Section",
  misc: "Additional Rooms",
  documents: "Documents",
};

const DESC_MAP: Record<AlbumKey, string> = {
  kids: "Learning, play, and joyful moments.",
  outside: "Playyards, structures, and fresh air.",
  toddlers: "Care routines, exploration.",
  misc: "Kitchen, changing rooms, bathrooms.",
    documents: "Menus, calendars, and center notices for families.",
};

function humanizeFilename(path: string) {
  const file = path.split("/").pop() || "";
  const base = file.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

/* Build albums from folder structure */
function useAlbums(): Album[] {
  const albums = useMemo(() => {
    const buckets: Record<AlbumKey, Slide[]> = {
      kids: [],
      outside: [],
      toddlers: [],
      misc: [],
      documents: [],
    };

    Object.entries(modules).forEach(([fullPath, url]) => {
      // fullPath like: /src/assets/pictures/kids/photo1.jpg
      const parts = fullPath.toLowerCase().split("/");

      // find folder name after 'pictures'
      const idx = parts.indexOf("pictures");
      const bucket = parts[idx + 1] as AlbumKey | undefined;

      if (!bucket || !(bucket in buckets)) return;

      const alt = humanizeFilename(fullPath);
      buckets[bucket as AlbumKey].push({
        src: url,
        alt,
        caption: alt,
      });
    });

    // Sort slides by caption for stable order
    (Object.keys(buckets) as AlbumKey[]).forEach((k) => {
      buckets[k].sort((a, b) => a.caption.localeCompare(b.caption));
    });

    const out: Album[] = (Object.keys(buckets) as AlbumKey[]).map((key) => ({
      key,
      title: TITLE_MAP[key],
      description: DESC_MAP[key],
      items: buckets[key],
    }));

    // Filter out empty albums
    return out.filter((a) => a.items.length > 0);
  }, []);

  return albums;
}

/* =========================
   Simple Lightbox
   ========================= */
const Lightbox: React.FC<{
  album: Album;
  index: number;
  onClose: () => void;
}> = ({ album, index, onClose }) => {
  const [i, setI] = useState(index);
  const hasPrev = i > 0;
  const hasNext = i < album.items.length - 1;
  const onPrev = () => hasPrev && setI((n) => n - 1);
  const onNext = () => hasNext && setI((n) => n + 1);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const id = setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[61] mx-auto mt-10 w-[min(96vw,1100px)] overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-emerald-950">{album.title}</h2>
            <p className="text-xs text-emerald-900/70">
              {i + 1} / {album.items.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={album.items[i].src}
              download
              className="hidden sm:inline rounded-lg border border-emerald-100 bg-white px-3 py-1.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
            >
              Download
            </a>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-50"
              aria-label="Close"
            >
              ✖
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center bg-emerald-50">
          <img
            src={album.items[i].src}
            alt={album.items[i].alt}
            className="max-h-[72vh] w-auto object-contain"
            loading="eager"
            decoding="async"
          />
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-900 shadow hover:bg-white"
              aria-label="Previous"
            >
              ‹
            </button>
          )}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-emerald-900 shadow hover:bg-white"
              aria-label="Next"
            >
              ›
            </button>
          )}
        </div>

        {/* Caption + Thumbs */}
        <div className="border-t">
          <div className="px-4 py-3 text-sm text-emerald-900/85 sm:px-6">{album.items[i].caption}</div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-3 sm:px-6">
            {album.items.map((s, idx) => (
              <button
                key={s.src + idx}
                onClick={() => setI(idx)}
                title={s.caption}
                className={
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border " +
                  (idx === i ? "border-emerald-600 ring-2 ring-emerald-500" : "border-emerald-100")
                }
              >
                <img src={s.src} alt={s.alt} className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   Main Component (Simplified UI)
   ========================= */
const Facility: React.FC = () => {
  const albums = useAlbums();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<{ albumIdx: number; slideIdx: number } | null>(null);

  const current = albums[active];

  return (
    <Section className="bg-gradient-to-b from-emerald-50/40 to-white">
      {/* Hero */}
      <div className="border-b border-emerald-100/70 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_60%)]">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950">
                Facility Gallery
              </h1>
              <p className="mt-2 max-w-2xl text-emerald-900/80">
                A quick look at our environment—from classrooms to outdoor spaces. Click any image to view full size.
              </p>
              <p className="mt-3 text-sm text-emerald-900/70">
                <span className="font-semibold">More than daycare:</span> we are an early learning institution focused on
                transitional kindergarten readiness, rich play-based academics, and afterschool enrichment.
              </p>
            </div>
          </div>

          {/* Tabs */}
          {albums.length > 0 && (
            <div role="tablist" aria-label="Albums" className="mt-6 flex flex-wrap gap-2">
              {albums.map((a, i) => (
                <button
                  key={a.key}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                    (active === i
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-emerald-100 bg-white text-emerald-900 hover:bg-emerald-50")
                  }
                  title={a.description}
                >
                  {a.title} <span className="ml-1 text-emerald-900/60">{a.items.length}</span>
                </button>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Grid */}
      <Container className="py-10">
        {!current ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center text-emerald-900/70 shadow-sm">
            No images found. Add photos to <code className="font-mono">src/assets/pictures/*</code>.
          </div>
        ) : (
          <>
            {current.description && (
              <p className="mb-4 text-sm text-emerald-900/80">{current.description}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {current.items.map((s, idx) => (
                <button
                  key={s.src + idx}
                  onClick={() => setLightbox({ albumIdx: active, slideIdx: idx })}
                  className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                  title={s.caption}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="px-3 py-2 text-left">
                    <div className="truncate text-sm font-medium text-emerald-950">{s.caption}</div>
                    <div className="text-xs text-emerald-900/70">{current.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </Container>

      {/* Lightbox */}
      {lightbox && albums[lightbox.albumIdx] && (
        <Lightbox
          album={albums[lightbox.albumIdx]}
          index={lightbox.slideIdx}
          onClose={() => setLightbox(null)}
        />
      )}
    </Section>
  );
};

export default Facility;
