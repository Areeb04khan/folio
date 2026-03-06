import { useState, useRef, useEffect } from "react";
import { AnimateIn } from "./SectionHeading";
import SectionHeading from "./SectionHeading";
import {
  Shield,
  Mail,
  Monitor,
  Lock,
  Globe,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ─────────── MITRE ATT&CK descriptions ─────────── */
const mitreDescriptions: Record<string, string> = {
  T1566: "Phishing — Adversaries send messages to gain access or deploy payloads via user interaction.",
  T1547: "Boot or Logon Autostart Execution — Adversaries configure persistence via startup entries.",
  T1110: "Brute Force — Adversaries use credential-guessing techniques to obtain account access.",
};

/* ─────────── Case-study data ─────────── */
interface CaseStudy {
  id: number;
  title: string;
  icon: typeof Shield;
  accent: string;
  overview: string;
  environment: string;
  steps: string[];
  tools: string[];
  findings: string;
  mitre: { id: string; name: string }[];
  lessons: string;
  logSnippet: string;
  skills: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Phishing Email Analysis",
    icon: Mail,
    accent: "primary",
    overview:
      "A suspicious email claiming to be from a financial institution was reported by a user.",
    environment: "Email headers, DNS records, sender domain information.",
    steps: [
      "Extracted email headers from the reported message",
      "Analyzed SPF, DKIM, and DMARC authentication results",
      "Verified sender domain reputation via threat-intel feeds",
      "Checked embedded links for redirection behavior",
    ],
    tools: ["MXToolbox", "Header Analyzer", "DNS Lookup"],
    findings:
      "SPF authentication failure and DKIM misalignment indicated domain spoofing.",
    mitre: [{ id: "T1566", name: "Phishing" }],
    lessons:
      "Importance of email authentication policies and user awareness training.",
    logSnippet: `Received: from mail-out.attacker.com (192.168.1.50)
Authentication-Results: spf=fail smtp.mailfrom=legit-bank.com
  dkim=fail header.d=legit-bank.com
  dmarc=fail action=none header.from=legit-bank.com
X-Spam-Status: Yes, score=8.2 required=5.0
Subject: Urgent: Verify Your Account`,
    skills: ["Log Analysis", "Email Security", "Threat Detection"],
  },
  {
    id: 2,
    title: "Email Deliverability & Auth Investigation",
    icon: Globe,
    accent: "accent",
    overview:
      "Phishing simulation emails were failing to reach target inboxes.",
    environment: "Microsoft 365 / Google Workspace email infrastructure.",
    steps: [
      "Reviewed SPF records for the sending domain",
      "Checked DKIM selectors for correct key alignment",
      "Evaluated DMARC policies and reporting",
      "Tested domain authentication alignment end-to-end",
    ],
    tools: ["M365 Admin Center", "Google Admin Console", "DNS Lookup"],
    findings:
      "Incorrect SPF configuration and DKIM selector mismatch caused delivery failures.",
    mitre: [{ id: "T1566", name: "Phishing (simulation context)" }],
    lessons:
      "Proper domain authentication configuration is critical for email security operations.",
    logSnippet: `dig TXT _dmarc.example.com
;; ANSWER SECTION:
_dmarc.example.com. 3600 IN TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com"

dig TXT example.com
;; ANSWER SECTION:
example.com. 3600 IN TXT "v=spf1 include:_spf.google.com ~all"`,
    skills: ["Email Security", "DNS Analysis", "Configuration Audit"],
  },
  {
    id: 3,
    title: "Endpoint Malware Investigation",
    icon: Monitor,
    accent: "primary",
    overview:
      "Users reported unexpected browser behavior and advertisement popups.",
    environment: "Windows workstation with endpoint protection.",
    steps: [
      "Analyzed startup applications via msconfig",
      "Inspected Windows registry persistence keys (Run / RunOnce)",
      "Reviewed endpoint security logs for flagged events",
      "Checked running processes for unknown executables",
    ],
    tools: ["Registry Editor", "Task Manager", "Endpoint Logs"],
    findings:
      "Malicious startup entry indicating persistence mechanism via registry run key.",
    mitre: [
      { id: "T1547", name: "Boot or Logon Autostart Execution" },
    ],
    lessons:
      "Monitoring persistence mechanisms is essential in endpoint investigations.",
    logSnippet: `[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run]
"ChromeUpdate"="C:\\Users\\Public\\svchost_update.exe --silent"

Process: svchost_update.exe
PID: 4892  |  Parent: explorer.exe
Network: 203.0.113.42:443  (C2 beacon interval ~60s)`,
    skills: ["Endpoint Forensics", "Malware Analysis", "Registry Analysis"],
  },
  {
    id: 4,
    title: "Suspicious Login / Brute Force Investigation",
    icon: Lock,
    accent: "accent",
    overview:
      "Multiple failed login attempts detected on a corporate account.",
    environment: "Windows security event logs.",
    steps: [
      "Identified repeated Event ID 4625 failures in Security log",
      "Correlated timestamps and source IP addresses",
      "Checked for successful login (4624) following failures",
      "Cross-referenced IP geolocation for anomalies",
    ],
    tools: ["Event Viewer", "Log Analysis Tools", "IP Geolocation"],
    findings:
      "Pattern consistent with brute-force login attempts from a single external IP.",
    mitre: [{ id: "T1110", name: "Brute Force" }],
    lessons:
      "Monitoring authentication logs helps detect credential attacks early.",
    logSnippet: `EventID: 4625  | Logon Type: 10
Account: admin@corp.local
Source IP: 45.33.32.156
Failure Reason: Unknown user name or bad password
Timestamp: 2025-01-15T03:22:14Z  (attempt 47 of 312)

EventID: 4624  | Logon Type: 10
Account: admin@corp.local  ← SUCCESS after 312 failures
Source IP: 45.33.32.156`,
    skills: ["Log Analysis", "Incident Detection", "Threat Intelligence"],
  },
  {
    id: 5,
    title: "DNS Security & Email Auth Troubleshooting",
    icon: Shield,
    accent: "primary",
    overview:
      "Emails failed authentication checks due to DNS misconfiguration.",
    environment: "Domain DNS records and email authentication policies.",
    steps: [
      "Reviewed DNS TXT records for SPF / DKIM / DMARC",
      "Validated SPF includes and IP ranges",
      "Checked DKIM key alignment with sending service",
      "Evaluated DMARC policy enforcement and reporting",
    ],
    tools: ["DNS Lookup", "MXToolbox", "DMARC Analyzer"],
    findings:
      "Incorrect SPF configuration caused authentication failures across mail flow.",
    mitre: [{ id: "T1566", name: "Phishing (defensive context)" }],
    lessons:
      "Proper DNS configuration is fundamental for preventing email spoofing.",
    logSnippet: `$ nslookup -type=txt example.com
Non-authoritative answer:
example.com  text = "v=spf1 include:mailgun.org ~all"
                     ↑ MISSING: include:_spf.google.com

DMARC report aggregate:
  source_ip: 209.85.220.41 (Google)
  result: fail  |  disposition: none
  spf_domain: example.com  spf_result: softfail`,
    skills: ["DNS Analysis", "Email Security", "Security Configuration"],
  },
];

/* ─────────── Log Viewer component ─────────── */
const LogViewer = ({ log }: { log: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(log);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-[hsl(220,20%,3%)]">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/60 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-destructive/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-primary/70" />
          <span className="ml-3 text-xs font-mono text-muted-foreground">
            investigation.log
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-xs sm:text-sm font-mono text-neon-green/90 overflow-x-auto leading-relaxed whitespace-pre-wrap">
        {log}
      </pre>
    </div>
  );
};

/* ─────────── Timeline ─────────── */
const Timeline = ({ steps }: { steps: string[] }) => (
  <div className="relative pl-6 space-y-4">
    <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
    {steps.map((step, i) => (
      <div key={i} className="relative flex items-start gap-3 group">
        <span className="absolute left-[-15px] top-[6px] w-[7px] h-[7px] rounded-full bg-primary ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all" />
        <p className="text-sm text-secondary-foreground leading-relaxed">
          <span className="font-mono text-xs text-muted-foreground mr-2">
            {String(i + 1).padStart(2, "0")}
          </span>
          {step}
        </p>
      </div>
    ))}
  </div>
);

/* ─────────── MITRE tag ─────────── */
const MitreTag = ({ id, name }: { id: string; name: string }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={`https://attack.mitre.org/techniques/${id}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-colors"
        >
          {id}
          <ExternalLink size={10} />
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        <p className="font-semibold mb-1">{name}</p>
        <p className="text-muted-foreground">
          {mitreDescriptions[id] || "MITRE ATT&CK technique."}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

/* ─────────── Skill tags with viewport animation ─────────── */
const SkillTags = ({ skills }: { skills: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {skills.map((s, i) => (
        <span
          key={s}
          className={`px-2.5 py-1 text-xs font-mono rounded-full border border-primary/20 text-primary bg-primary/5 transition-all duration-500 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          {s}
        </span>
      ))}
    </div>
  );
};

/* ─────────── Modal ─────────── */
const CaseStudyModal = ({
  cs,
  onClose,
}: {
  cs: CaseStudy;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const Icon = cs.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm overflow-y-auto py-10 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-card border border-border rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${cs.accent}/10`}>
              <Icon size={20} className={`text-${cs.accent}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{cs.title}</h3>
              <p className="text-xs font-mono text-muted-foreground">
                Case Study #{cs.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Overview */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Incident Overview
            </h4>
            <p className="text-sm text-secondary-foreground leading-relaxed">
              {cs.overview}
            </p>
          </div>

          {/* Environment */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Environment / Data Sources
            </h4>
            <p className="text-sm text-secondary-foreground">{cs.environment}</p>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Investigation Timeline
            </h4>
            <Timeline steps={cs.steps} />
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Tools Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {cs.tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Log viewer */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Log Evidence
            </h4>
            <LogViewer log={cs.logSnippet} />
          </div>

          {/* Findings */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Key Findings
            </h4>
            <p className="text-sm text-secondary-foreground">{cs.findings}</p>
          </div>

          {/* MITRE */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              MITRE ATT&CK Mapping
            </h4>
            <div className="flex flex-wrap gap-2">
              {cs.mitre.map((m) => (
                <MitreTag key={m.id} id={m.id} name={m.name} />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Skills Applied
            </h4>
            <SkillTags skills={cs.skills} />
          </div>

          {/* Lessons */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h4 className="text-xs uppercase tracking-wider text-primary mb-2">
              Lessons Learned
            </h4>
            <p className="text-sm text-secondary-foreground">{cs.lessons}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────── Card ─────────── */
const CaseStudyCard = ({
  cs,
  index,
  onOpen,
}: {
  cs: CaseStudy;
  index: number;
  onOpen: () => void;
}) => {
  const Icon = cs.icon;

  return (
    <AnimateIn delay={index * 120}>
      <button
        onClick={onOpen}
        className="w-full text-left group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)] hover:-translate-y-1"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-lg bg-${cs.accent}/10`}>
            <Icon size={20} className={`text-${cs.accent}`} />
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            #{String(cs.id).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {cs.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {cs.overview}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {cs.mitre.map((m) => (
            <span
              key={m.id}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-destructive/10 text-destructive border border-destructive/20"
            >
              {m.id}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Investigation <ChevronRight size={14} />
        </div>
      </button>
    </AnimateIn>
  );
};

/* ─────────── Section ─────────── */
const CaseStudiesSection = () => {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-20 px-4 sm:px-6 relative">
      {/* subtle bg grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          title="Security Case Studies"
          subtitle="Real-world SOC investigations demonstrating hands-on threat detection and incident response"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard
              key={cs.id}
              cs={cs}
              index={i}
              onOpen={() => setActiveStudy(cs)}
            />
          ))}
        </div>
      </div>

      {activeStudy && (
        <CaseStudyModal
          cs={activeStudy}
          onClose={() => setActiveStudy(null)}
        />
      )}
    </section>
  );
};

export default CaseStudiesSection;
