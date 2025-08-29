import React, { useEffect, useState } from "react";

/** Types for collections */
type Program = {
  title: string;
  age_range: string;
  description: string;
  ratio: string;
  tuition: {
    full_time: number;
    part_time?: number;
    drop_in?: number;
  };
  availability: {
    status: string;
    max_capacity: number;
    enrolled: number;
    open_spots: number;
    next_opening?: string;
  };
};

type Closure = {
  title: string;
  start: string; // Date
  end?: string; // Date
  description?: string;
};

type Document = {
  title: string;
  file: string; // File URL
  description?: string;
};

const Information: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [closures, setClosures] = useState<Closure[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Programs
        const programsResponse = await fetch("/content/programs.json");
        const programsList: string[] = await programsResponse.json(); 
        const programsData = await Promise.all(
          programsList.map(async (file) => {
            const response = await fetch(`/content/programs/${file}`);
            return response.json();
          })
        );
        setPrograms(programsData);

        // Fetch Closures
        const closuresResponse = await fetch("/content/closures.json");
        const closuresList: string[] = await closuresResponse.json(); 
        const closuresData = await Promise.all(
          closuresList.map(async (file) => {
            const response = await fetch(`/content/closures/${file}`);
            return response.json();
          })
        );
        setClosures(closuresData);

        // Fetch Documents
        const documentsResponse = await fetch("/content/documents.json");
        const documentsList: string[] = await documentsResponse.json(); 
        const documentsData = await Promise.all(
          documentsList.map(async (file) => {
            const response = await fetch(`/content/documents/${file}`);
            return response.json();
          })
        );
        setDocuments(documentsData);
      } catch (err) {
        setError((err as Error).message || "An error occurred while fetching data.");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-emerald-950">
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight">Information</h1>

      {/* Error Handling */}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* Programs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Programs</h2>
        {programs.length > 0 ? (
          programs.map((program) => (
            <div key={program.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm mb-6">
              <h3 className="text-xl font-semibold">{program.title}</h3>
              <p className="text-sm text-emerald-800">Age Range: {program.age_range}</p>
              <p className="text-sm text-emerald-800">Ratio: {program.ratio}</p>
              <p className="text-sm text-emerald-800">{program.description}</p>
              <p className="text-sm text-emerald-800">
                Tuition: Full Time (${program.tuition.full_time}/month), Part Time (${program.tuition.part_time || "N/A"}/month), Drop-in (${program.tuition.drop_in || "N/A"}/day)
              </p>
              <p className="text-sm text-emerald-800">
                Availability: {program.availability.status} (Enrolled: {program.availability.enrolled}/Max: {program.availability.max_capacity}, Open Spots: {program.availability.open_spots})
              </p>
              {program.availability.next_opening && <p className="text-sm text-emerald-800">Next Opening: {program.availability.next_opening}</p>}
            </div>
          ))
        ) : (
          <p>No programs available.</p>
        )}
      </div>

      {/* Closures Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Closures & Holidays</h2>
        {closures.length > 0 ? (
          closures.map((closure) => (
            <div key={closure.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm mb-6">
              <h3 className="text-xl font-semibold">{closure.title}</h3>
              <p className="text-sm text-emerald-800">Start: {closure.start}</p>
              {closure.end && <p className="text-sm text-emerald-800">End: {closure.end}</p>}
              {closure.description && <p className="text-sm text-emerald-800">{closure.description}</p>}
            </div>
          ))
        ) : (
          <p>No closures or holidays listed.</p>
        )}
      </div>

      {/* Documents Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Documents</h2>
        {documents.length > 0 ? (
          documents.map((document) => (
            <div key={document.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm mb-6">
              <h3 className="text-xl font-semibold">{document.title}</h3>
              <p className="text-sm text-emerald-800">{document.description}</p>
              <a href={document.file} className="text-teal-700 hover:underline" target="_blank" rel="noopener noreferrer">
                Download Document
              </a>
            </div>
          ))
        ) : (
          <p>No documents available.</p>
        )}
      </div>
    </section>
  );
};

export default Information;