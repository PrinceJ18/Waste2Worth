import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, BarChart3, Search } from "lucide-react";
import { diyProjects, type DIYProject } from "../data/diyData";

const categories = ["All", "Home", "Garden", "Farming", "Decor"] as const;
const difficultyColor: Record<string, string> = {
  Beginner: "text-primary",
  Medium: "text-amber-600",
  Advanced: "text-red-600",
};

const DIYPage = () => {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = diyProjects.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.wasteType.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">DIY Upcycling</h1>
          <p className="text-muted-foreground">Browse creative ways to turn waste into useful items.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card rounded-[8px] card-surface text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-[8px] text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card card-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              expanded={expanded === project.id}
              onToggle={() => setExpanded(expanded === project.id ? null : project.id)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No projects found.</p>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({
  project,
  expanded,
  onToggle,
}: {
  project: DIYProject;
  expanded: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    layout
    className="bg-card rounded-2xl card-surface overflow-hidden"
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
        </div>
        <span className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
          {project.wasteType}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{project.overview}</p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {project.time}
        </span>
        <span className={`flex items-center gap-1 font-semibold ${difficultyColor[project.difficulty]}`}>
          <BarChart3 className="h-3.5 w-3.5" />
          {project.difficulty}
        </span>
      </div>
      <button
        onClick={onToggle}
        className="text-sm font-medium text-primary hover:underline"
      >
        {expanded ? "Hide steps" : "View full guide →"}
      </button>
    </div>

    {expanded && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        className="border-t border-border px-6 py-5"
      >
        <h4 className="text-sm font-semibold text-foreground mb-2">Materials</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
          {project.materials.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <h4 className="text-sm font-semibold text-foreground mb-2">Steps</h4>
        <ol className="space-y-2">
          {project.steps.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground">
              <span className="font-semibold text-primary flex-shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </motion.div>
    )}
  </motion.div>
);

export default DIYPage;
