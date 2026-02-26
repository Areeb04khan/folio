import SectionHeading, { AnimateIn } from "./SectionHeading";
import { Search, FileSearch, HardDrive, AlertTriangle, Activity } from "lucide-react";

const ProjectsSection = () => (
  <section id="projects" className="py-20 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Projects" />
      <AnimateIn>
        <div className="neon-border neon-border-hover rounded-lg p-6 sm:p-8 bg-card transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-md bg-primary/10">
              <Search size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Cyber Forensic Investigation</h3>
              <p className="text-xs text-muted-foreground font-mono">Digital forensics & malware analysis</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: AlertTriangle, text: "Investigated malware breach" },
              { icon: HardDrive, text: "Crypto miner analysis" },
              { icon: FileSearch, text: "Registry & Log inspection" },
              { icon: Activity, text: "Endpoint review & Attack vector ID" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors duration-200"
              >
                <item.icon size={14} className="text-primary shrink-0" />
                <span className="text-sm text-secondary-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>
    </div>
  </section>
);

export default ProjectsSection;
