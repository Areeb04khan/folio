import { useEffect, useRef, useState, useMemo } from "react";
import SectionHeading, { AnimateIn } from "./SectionHeading";
import { Mail, MapPin, Linkedin, Github, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

/** Builds email at runtime so scrapers can't read it from HTML source */
const useObfuscatedEmail = () =>
  useMemo(() => {
    const u = "areeb4khan";
    const d = "gmail";
    const t = "com";
    return `${u}@${d}.${t}`;
  }, []);

const ContactSection = () => {
  const email = useObfuscatedEmail();
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.sendForm(
        "service_nelr00t",   // ← replace
        "template_5wgfcxl",  // ← replace
        formRef.current!,
        "P9H7xWcY63tQrUeT1"    // ← replace
      );
      setSent(true);
      formRef.current?.reset();
    } catch (err: any) {
      setError("Failed to send. Please email me directly.");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "areeb4khan",
      href: "https://www.linkedin.com/in/areeb4khan",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Areeb04khan",
      href: "https://github.com/Areeb04khan",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Let's discuss cybersecurity" />

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {contactCards.map((c, i) => (
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

        {/* Contact form */}
        <AnimateIn delay={260}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="neon-border rounded-lg p-6 sm:p-8 bg-card space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">Send me a message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="from_name"
                required
                maxLength={100}
                placeholder="Your Name"
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                name="from_email"
                type="email"
                required
                maxLength={255}
                placeholder="Your Email"
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <textarea
              name="message"
              required
              maxLength={2000}
              rows={5}
              placeholder="Your Message"
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            {sent && <p className="text-sm text-green-400">Message sent successfully!</p>}
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300 disabled:opacity-50"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </AnimateIn>

        <AnimateIn delay={350}>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin size={14} />
            <span>Noida, Uttar Pradesh, India</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};

export default ContactSection;
