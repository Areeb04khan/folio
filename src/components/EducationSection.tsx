import SectionHeading, { AnimateIn } from "./SectionHeading";
import { GraduationCap, Award } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="py-20 px-4 sm:px-6 bg-card/30">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Education & Certifications" />

      {/* Education */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          { degree: "MCA", school: "Sharda University", year: "2023 – 2025" },
          { degree: "BCA", school: "Integral University", year: "2020 – 2023" },
        ].map((edu, i) => (
          <AnimateIn key={edu.degree} delay={i * 100}>
            <div className="neon-border neon-border-hover rounded-lg p-5 bg-card h-full transition-all duration-300 hover:-translate-y-1">
              <GraduationCap size={18} className="text-primary mb-3" />
              <h3 className="font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-sm text-muted-foreground">{edu.school}</p>
              <p className="text-xs text-primary font-mono mt-1">{edu.year}</p>
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* Certifications */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          "Cybersecurity Analyst Job Simulation – Tata",
          "Penetration Testing – LinkedIn",
          "Ethical Hacking – CompTIA & IIBA",
          "Cloud Security – LinkedIn",
        ].map((cert, i) => (
          <AnimateIn key={cert} delay={i * 80}>
            <div className="flex items-center gap-3 neon-border neon-border-hover rounded-lg p-4 bg-card transition-all duration-300 hover:-translate-y-1">
              <Award size={16} className="text-primary shrink-0" />
              <span className="text-sm text-secondary-foreground">{cert}</span>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default EducationSection;
