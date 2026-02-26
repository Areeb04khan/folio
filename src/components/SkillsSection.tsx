import SectionHeading, { AnimateIn } from "./SectionHeading";
import { Shield, Bug, Lock, Globe, Monitor, Terminal, Brain } from "lucide-react";

const skillGroups = [
  {
    title: "Security Operations",
    icon: Shield,
    skills: ["Security Monitoring", "Incident Detection & Response", "Log Analysis"],
  },
  {
    title: "Threat Management",
    icon: Bug,
    skills: ["Vulnerability Assessment", "Threat Identification", "Risk Mitigation"],
  },
  {
    title: "Security Tools",
    icon: Monitor,
    skills: ["SIEM (Basic)", "IDS", "Email Security"],
  },
  {
    title: "Access & Identity",
    icon: Lock,
    skills: ["IAM", "RBAC"],
  },
  {
    title: "Networking",
    icon: Globe,
    skills: ["TCP/IP", "DNS", "HTTP/HTTPS", "Network Protocols"],
  },
  {
    title: "Platforms",
    icon: Monitor,
    skills: ["Google Workspace Security", "Microsoft 365 Security"],
  },
  {
    title: "Scripting",
    icon: Terminal,
    skills: ["Google Apps Script", "PowerShell (Basic)"],
  },
  {
    title: "Soft Skills",
    icon: Brain,
    skills: ["Problem Solving", "Analytical Thinking", "Communication"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-20 px-4 sm:px-6 bg-card/30">
    <div className="max-w-6xl mx-auto">
      <SectionHeading title="Skills" subtitle="SOC-focused competencies" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillGroups.map((group, i) => (
          <AnimateIn key={group.title} delay={i * 80}>
            <div className="neon-border neon-border-hover rounded-lg p-5 bg-card h-full transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4">
                <group.icon size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
