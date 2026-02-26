import { Shield, Github, Linkedin, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neon-border mb-8 opacity-0 animate-fade-in">
          <Shield size={14} className="text-primary" />
          <span className="text-xs font-mono text-primary tracking-wider uppercase">
            Security Operations
          </span>
        </div>

        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="text-foreground">Areeb </span>
          <span className="gradient-text">Khan</span>
        </h1>

        <p
          className="font-mono text-sm sm:text-base text-primary mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Cybersecurity Analyst &nbsp;|&nbsp; SOC Enthusiast
        </p>

        <p
          className="text-muted-foreground max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed opacity-0 animate-fade-in"
          style={{ animationDelay: "0.45s" }}
        >
          Securing digital landscapes through proactive threat detection, incident response, and robust security monitoring.
        </p>

        <div
          className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#projects"
            className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-md border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            Contact Me
          </a>
          <a
            href="https://github.com/Areeb04khan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/areeb4khan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
};

export default HeroSection;
