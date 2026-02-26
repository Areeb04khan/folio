import SectionHeading, { AnimateIn } from "./SectionHeading";
import { Briefcase, TrendingUp } from "lucide-react";

const ExperienceSection = () => (
  <section id="experience" className="py-20 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Experience" />

      {/* Job 1 */}
      <AnimateIn className="mb-8">
        <div className="neon-border neon-border-hover rounded-lg p-6 bg-card transition-all duration-300">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-md bg-primary/10">
              <Briefcase size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">IT & Systems Operations Associate</h3>
              <p className="text-sm text-primary font-mono">Kanhaiya Residency and Hotel</p>
              <p className="text-xs text-muted-foreground mt-1">Aug 2025 – Present</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Responsibilities</h4>
              <ul className="space-y-1.5 text-sm text-secondary-foreground">
                {[
                  "IT infrastructure deployment",
                  "LAN/WiFi configuration",
                  "Network security setup",
                  "Captive portal configuration",
                  "OTA integrations & Booking systems",
                  "RBAC implementation",
                  "Staff training & Asset management",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="text-primary mt-1 text-[10px]">▸</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Achievements</h4>
              <ul className="space-y-1.5 text-sm text-secondary-foreground">
                {[
                  "Reduced booking errors by 30%",
                  "Trained 8+ staff members",
                  "Reduced downtime by 25%",
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <TrendingUp size={12} className="text-primary mt-1 shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Internship */}
      <AnimateIn delay={150}>
        <div className="neon-border neon-border-hover rounded-lg p-6 bg-card transition-all duration-300">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-md bg-accent/10">
              <Briefcase size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Product Support Specialist Intern</h3>
              <p className="text-sm text-accent font-mono">Threatcop (Kratikal Tech)</p>
              <p className="text-xs text-muted-foreground mt-1">Jan 2025 – Jul 2025</p>
            </div>
          </div>
          <ul className="space-y-1.5 text-sm text-secondary-foreground">
            {[
              "Phishing simulations & Email security",
              "Client onboarding",
              "Automation scripting",
              "Campaign support",
            ].map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="text-accent mt-1 text-[10px]">▸</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </AnimateIn>
    </div>
  </section>
);

export default ExperienceSection;
