import React from "react";
import info from "../content/information.json";

/** Matches your legacy “Information Page” collection */
type InfoJSON = {
  title?: string;
  body?: string; // plain text from CMS
};

const Information: React.FC = () => {
  const data = (info ?? {}) as InfoJSON;
  const title = typeof data.title === "string" && data.title.trim() ? data.title : "Information";
  const body = typeof data.body === "string" ? data.body : "";

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 text-emerald-950">
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight">{title}</h1>

      {body ? (
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          {/* Preserve line breaks from CMS “plain text” */}
          <p className="whitespace-pre-line leading-7 text-emerald-900/90">{body}</p>
        </div>
      ) : (
        <p className="text-center text-emerald-900/70">No content yet. Add text in the CMS.</p>
      )}
    </section>
  );
};

export default Information;
