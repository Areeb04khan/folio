import SectionHeading, { AnimateIn } from "./SectionHeading";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-20 px-4 sm:px-6 bg-card/30">
    <div className="max-w-4xl mx-auto">
      <SectionHeading title="Get In Touch" subtitle="Let's discuss cybersecurity" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Phone, label: "Phone", value: "6393368686", href: "tel:6393368686" },
          { icon: Mail, label: "Email", value: "areeb4khan@gmail.com", href: "mailto:areeb4khan@gmail.com" },
          { icon: Linkedin, label: "LinkedIn", value: "areeb4khan", href: "https://www.linkedin.com/in/areeb4khan" },
          { icon: Github, label: "GitHub", value: "Areeb04khan", href: "https://github.com/Areeb04khan" },
        ].map((c, i) => (
          <AnimateIn key={c.label} delay={i * 80}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="block neon-border neon-border-hover rounded-lg p-5 bg-card text-center transition-all duration-300 hover:-translate-y-1"
            >
              <c.icon size={20} className="text-primary mx-auto mb-3" />
              <p className="text-xs text-muted-foreground mb-1">{c.label}</p>
              <p className="text-sm text-foreground font-medium break-all">{c.value}</p>
            </a>
          </AnimateIn>
        ))}
      </div>
      <AnimateIn delay={350}>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span>Noida, Uttar Pradesh, India</span>
        </div>
      </AnimateIn>
    </div>
  </section>
);

export default ContactSection;
