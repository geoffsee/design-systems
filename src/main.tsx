import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type DesignSystem = {
  id: string;
  name: string;
  file: string;
  summary: string;
  category: string;
  sections: string[];
  colors: string[];
};

const systems: DesignSystem[] = [
  {
    id: "nasa",
    name: "NASA-inspired",
    file: "nasa-1976.html",
    summary:
      "Editorial, federal-agency styling with source framing, audit criteria, restrained color, and drop-in CSS tokens.",
    category: "Editorial system",
    sections: [
      "Method",
      "Color",
      "Type",
      "Components",
      "Demo Post",
      "Drop-in CSS",
      "Audit and Governance",
    ],
    colors: ["#FC3D21", "#0B3D91", "#0A0A0A", "#F1ECE0", "#6E6A60"],
  },
  {
    id: "music",
    name: "Audio Visual UI",
    file: "audio-visual-console.html",
    summary:
      "Dark software interface language for audio tools with research framing, accessibility criteria, and governance notes.",
    category: "Product system",
    sections: [
      "Color tokens",
      "Typography",
      "Buttons",
      "Forms",
      "Utility patterns",
      "Research frame",
      "Accessibility criteria",
      "Governance model",
    ],
    colors: ["#66C7F4", "#182BFF", "#F77B85", "#F3F55A", "#0EE6A8", "#F56F12"],
  },
];

function App() {
  const [activeId, setActiveId] = useState(systems[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const filteredSystems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return systems;
    }

    return systems.filter((system) => {
      const haystack = [
        system.name,
        system.file,
        system.summary,
        system.category,
        ...system.sections,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [query]);

  const activeSystem =
    systems.find((system) => system.id === activeId) ??
    filteredSystems[0] ??
    systems[0];
  const activeSystemPath = activeSystem
    ? `design-systems/${activeSystem.file}`
    : "";

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Design systems">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            DS
          </span>
          <div>
            <p className="eyebrow">Local library</p>
            <h1>Design Systems</h1>
          </div>
        </div>

        <label className="search">
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, file, section"
            type="search"
          />
        </label>

        <div className="system-list">
          {filteredSystems.map((system) => (
            <button
              className={
                system.id === activeSystem?.id
                  ? "system-item active"
                  : "system-item"
              }
              key={system.id}
              onClick={() => setActiveId(system.id)}
              type="button"
            >
              <span>
                <strong>{system.name}</strong>
                <small>{system.file}</small>
              </span>
              <span className="system-count">{system.sections.length}</span>
            </button>
          ))}
        </div>
      </aside>

      {activeSystem ? (
        <section className="workspace">
          <header className="detail-header">
            <div>
              <p className="eyebrow">{activeSystem.category}</p>
              <h2>{activeSystem.name}</h2>
              <p>{activeSystem.summary}</p>
            </div>
            <div className="actions">
              <a href={activeSystemPath} target="_blank" rel="noreferrer">
                Open file
              </a>
            </div>
          </header>

          <section
            className="overview"
            aria-label={`${activeSystem.name} overview`}
          >
            <div className="panel">
              <h3>Sections</h3>
              <div className="tags">
                {activeSystem.sections.map((section) => (
                  <span key={section}>{section}</span>
                ))}
              </div>
            </div>
            <div className="panel">
              <h3>Palette</h3>
              <div className="swatches">
                {activeSystem.colors.map((color) => (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            className="preview-panel"
            aria-label={`${activeSystem.name} preview`}
          >
            <div className="preview-toolbar">
              <span>{activeSystem.file}</span>
              <a href={activeSystemPath} target="_blank" rel="noreferrer">
                Inspect full page
              </a>
            </div>
            <iframe
              src={activeSystemPath}
              title={`${activeSystem.name} preview`}
            />
          </section>
        </section>
      ) : (
        <section className="empty-state">
          <h2>No design systems found</h2>
          <p>Try a different search term.</p>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
