import SectionHeading, { AnimateIn } from "./SectionHeading";

const AboutSection = () => (
  <section id="about" className="py-20 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Professional Summary" />
      <AnimateIn>
        <div className="neon-border neon-border-hover rounded-lg p-6 sm:p-8 bg-card transition-all duration-300">
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Cybersecurity-focused professional with hands-on experience in IT infrastructure, access control, and incident troubleshooting. Strong foundation in SOC operations, threat detection, and security monitoring, supported by practical exposure to real-world system environments. Experience includes endpoint management, network security basics, and user security practices.
          </p>
        </div>
      </AnimateIn>
    </div>
  </section>
);

export default AboutSection;
