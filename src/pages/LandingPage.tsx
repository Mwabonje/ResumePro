import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  FileText,
  Sparkles,
  Linkedin,
  ClipboardList,
  Users,
  ArrowRight,
  Check,
  Star,
  Menu,
  X,
  ChevronDown,
  Award,
  Zap,
  ShieldCheck,
  Copy,
  Sun,
  Moon,
} from "lucide-react";

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,560;9..144,650&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  .rp-root {
    --paper: #F7F5F0;
    --paper-rgb: 247,245,240;
    --raised: #FFFFFF;
    --ink: #14181F;
    --ink-soft: #3A4048;
    --slate: #6B7280;
    --line: #E3DFD5;
    --line-soft: #ECE8DE;
    --signal: #1F7A5C;
    --signal-dark: #17604A;
    --signal-soft: #E7F2EC;
    --signal-on-contrast: #5FBE9A;
    --amber: #B8792E;
    --amber-soft: #F5EBDC;
    --contrast-bg: #14181F;
    --contrast-text: #FFFFFF;
    --contrast-sub: #9CA3AF;
    background: var(--paper);
    color: var(--ink);
    font-family: 'Inter', sans-serif;
    transition: background-color 0.35s ease, color 0.35s ease;
  }

  .rp-root.theme-dark {
    --paper: #101318;
    --paper-rgb: 16,19,24;
    --raised: #181B22;
    --ink: #F2F0EA;
    --ink-soft: #C7CCD6;
    --slate: #8A93A0;
    --line: #272C34;
    --line-soft: #1E232B;
    --signal: #3FCB98;
    --signal-dark: #2FAE82;
    --signal-soft: #163529;
    --signal-on-contrast: #6EE7B7;
    --amber: #E0A458;
    --amber-soft: #2E2417;
    --contrast-bg: #0D2A20;
    --contrast-text: #F2F0EA;
    --contrast-sub: #8FB6A6;
  }

  .rp-root .header-surface {
    background: rgba(var(--paper-rgb), 0.92);
    backdrop-filter: blur(8px);
    transition: background-color 0.35s ease, border-color 0.35s ease;
  }

  .rp-root .doc-card,
  .rp-root .contrast-panel,
  .rp-root .line-bar,
  .rp-root .btn-ghost,
  .rp-root .btn-primary {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .rp-root .contrast-panel { background: var(--contrast-bg); color: var(--contrast-text); }
  .rp-root .contrast-sub { color: var(--contrast-sub); }
  .rp-root .contrast-accent-text { color: var(--signal-on-contrast); }
  .rp-root .contrast-cta { background: var(--signal); color: #08130F; }
  .rp-root .theme-dark .contrast-cta { color: #08130F; }

  .rp-root .theme-toggle {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line);
    background: transparent;
    color: var(--ink);
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
  }
  .rp-root .theme-toggle:hover { border-color: var(--ink-soft); background: var(--raised); }
  .rp-root .theme-toggle:active { transform: scale(0.94); }

  .rp-root .f-display { font-family: 'Fraunces', serif; }
  .rp-root .f-mono { font-family: 'IBM Plex Mono', monospace; }
  .rp-root .t-ink { color: var(--ink); }
  .rp-root .t-ink-soft { color: var(--ink-soft); }
  .rp-root .t-slate { color: var(--slate); }
  .rp-root .t-signal { color: var(--signal); }
  .rp-root .t-amber { color: var(--amber); }
  .rp-root .bg-paper { background: var(--paper); }
  .rp-root .bg-raised { background: var(--raised); }
  .rp-root .bg-signal { background: var(--signal); }
  .rp-root .bg-signal-soft { background: var(--signal-soft); }
  .rp-root .bg-amber-soft { background: var(--amber-soft); }
  .rp-root .bd-line { border-color: var(--line); }
  .rp-root .bd-signal { border-color: var(--signal); }
  .rp-root .rule { border-top: 1px solid var(--line); }

  .rp-root .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--signal);
  }
  .rp-root .eyebrow::before {
    content: "";
    width: 20px;
    height: 1px;
    background: var(--signal);
    display: inline-block;
  }
  .rp-root .eyebrow.contrast-accent-text { color: var(--signal-on-contrast); }
  .rp-root .eyebrow.contrast-accent-text::before { background: var(--signal-on-contrast); }

  .rp-root .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--ink);
    color: var(--paper);
    transition: background 0.2s ease, transform 0.15s ease;
  }
  .rp-root .btn-primary:hover { background: var(--signal-dark); }
  .rp-root .btn-primary:active { transform: scale(0.98); }

  .rp-root .btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line);
    color: var(--ink);
    background: transparent;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .rp-root .btn-ghost:hover { border-color: var(--ink); background: var(--raised); }

  .rp-root a:focus-visible,
  .rp-root button:focus-visible,
  .rp-root [tabindex]:focus-visible {
    outline: 2px solid var(--signal);
    outline-offset: 2px;
  }

  .rp-root .doc-card {
    background: var(--raised);
    border: 1px solid var(--line);
    box-shadow: 0 1px 2px rgba(20,24,31,0.04);
  }
  .rp-root .doc-card:hover {
    border-color: var(--ink-soft);
    box-shadow: 0 12px 24px -12px rgba(20,24,31,0.18);
  }

  .rp-root .line-bar { background: var(--line); border-radius: 2px; }
  .rp-root .line-bar.hit { background: var(--signal-soft); position: relative; }

  .rp-root .scanline {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--signal) 20%, var(--signal) 80%, transparent);
    box-shadow: 0 0 12px 2px rgba(31,122,92,0.55);
    top: -2px;
    opacity: 0;
  }
  .rp-root .scanline.run {
    animation: rp-scan 1.9s cubic-bezier(0.65,0,0.35,1) 1;
  }
  @keyframes rp-scan {
    0% { top: 0%; opacity: 1; }
    92% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  .rp-root .chip-in {
    animation: rp-chip 0.4s ease forwards;
    opacity: 0;
  }
  @keyframes rp-chip {
    from { opacity: 0; transform: translateY(3px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .rp-root .scanline.run { animation: none; opacity: 0; }
    .rp-root .chip-in { animation: none; opacity: 1; }
  }
`;

const FEATURES = [
  {
    icon: FileText,
    title: "Resume builder",
    body: "Ten structured sections, drag-and-drop ordering, and autosave on every keystroke. Export a clean PDF whenever you're ready.",
  },
  {
    icon: ShieldCheck,
    title: "ATS templates",
    body: "Five layouts built around parser behavior, not just looks. Switch templates and your content reflows instantly.",
  },
  {
    icon: Sparkles,
    title: "AI writing assistant",
    body: "Turn a flat duty into a measurable achievement, tighten your summary, or match your resume to a specific job post.",
  },
  {
    icon: Copy,
    title: "Cover letters",
    body: "Draft a first version in seconds, then edit line by line. Every letter ties back to the resume it accompanies.",
  },
  {
    icon: Linkedin,
    title: "LinkedIn optimizer",
    body: "Paste your headline and About section. Get specific rewrites and the keywords recruiters are searching for.",
  },
  {
    icon: ClipboardList,
    title: "Application tracker",
    body: "Log every application with status, interview dates, and notes. See your response rate change month over month.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Build your resume",
    body: "Fill in your experience once. Reuse it across as many versions as you need.",
  },
  {
    n: "02",
    title: "Optimize for the role",
    body: "Paste a job description. The assistant flags missing keywords and rewrites weak lines.",
  },
  {
    n: "03",
    title: "Track what happens",
    body: "Apply, log it, and watch your interview rate move as you refine your approach.",
  },
];

const TEMPLATES = [
  { name: "Modern ATS", note: "Two-column header, single-column body. Widest use case." },
  { name: "Professional ATS", note: "Dense and formal. Built for finance, law, and operations." },
  { name: "Executive ATS", note: "Generous spacing for 15+ year careers and board bios." },
  { name: "Creative ATS", note: "One accent rule, still fully parser-safe." },
  { name: "Minimal ATS", note: "No graphics, no columns. The safest possible parse." },
];

const TESTIMONIALS = [
  {
    quote:
      "I rewrote four bullet points with the assistant and started getting callbacks the same week. The keyword match score was the part that actually changed my behavior.",
    name: "Operations Manager",
    context: "Hired at a logistics company, 6 years experience",
  },
  {
    quote:
      "The tracker is the reason I kept applying. Seeing forty rows instead of a vague feeling made the search feel like a project I was running, not one I was lost in.",
    name: "Marketing Lead",
    context: "Career changer, from agency to in-house",
  },
  {
    quote:
      "The executive template handled a 20-year career without looking crowded. That was the first template that didn't make me cut things I wanted to keep.",
    name: "VP of Finance",
    context: "Executive job search, 20+ years experience",
  },
];

const FAQS = [
  {
    q: "What does the Free plan actually include?",
    a: "One resume, the Minimal ATS template, and a limited monthly allowance of AI credits so you can try the assistant before upgrading.",
  },
  {
    q: "Will my resume actually pass ATS software?",
    a: "Every template is tested against common parsers for section detection, contact extraction, and reading order. We show you a match score, not a guarantee — no platform can promise a specific outcome for every applicant tracking system.",
  },
  {
    q: "Can I cancel Premium anytime?",
    a: "Yes. Cancel from your billing settings and you'll keep Premium access through the end of the period you already paid for.",
  },
  {
    q: "How does the resume review marketplace work?",
    a: "Upload a resume, pay the review fee, and a human reviewer sends back a written feedback report — typically within two business days.",
  },
];

function ScanWidget() {
  const [phase, setPhase] = useState("idle"); // idle -> scanning -> done
  const [score, setScore] = useState(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion.current) {
      setPhase("done");
      setScore(94);
      return;
    }

    let timers: any[] = [];
    const run = () => {
      setPhase("scanning");
      setScore(0);
      timers.push(
        setTimeout(() => {
          setPhase("done");
          let s = 0;
          const iv = setInterval(() => {
            s += 2;
            if (s >= 94) {
              s = 94;
              clearInterval(iv);
            }
            setScore(s);
          }, 22);
        }, 1900)
      );
    };
    run();
    const loop = setInterval(run, 7500);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  const checklistItems = [
    "Contact details detected",
    "Section headings recognized",
    "12 of 14 keywords matched",
  ];

  return (
    <div className="doc-card rounded-xl overflow-hidden w-full max-w-md">
      <div className="flex items-center justify-between px-5 py-3 rule border-b bd-line">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bd-line" style={{ background: "var(--line)" }} />
          <span className="w-2.5 h-2.5 rounded-full bd-line" style={{ background: "var(--line)" }} />
          <span className="f-mono text-xs t-slate ml-2">morgan_taylor_resume.pdf</span>
        </div>
        <div
          className={`f-mono text-xs px-2 py-1 rounded transition-colors duration-300 ${
            phase === "done" ? "bg-signal-soft t-signal" : "t-slate"
          }`}
        >
          {phase === "done" ? `${score}% match` : "scanning…"}
        </div>
      </div>

      <div className="relative px-6 py-6">
        <div className={`scanline ${phase === "scanning" ? "run" : ""}`} />

        <div className="f-display text-lg t-ink mb-1">Morgan Taylor</div>
        <div className="f-mono text-[11px] t-slate mb-5">
          Senior Product Manager &nbsp;·&nbsp; San Diego, CA
        </div>

        <div className="eyebrow mb-3">Experience</div>
        <div className="space-y-2 mb-5">
          <div
            className={`h-2 w-full line-bar ${phase === "done" ? "chip-in hit" : ""}`}
            style={{ animationDelay: "0.05s" }}
          />
          <div
            className={`h-2 w-11/12 line-bar ${phase === "done" ? "chip-in hit" : ""}`}
            style={{ animationDelay: "0.15s" }}
          />
          <div className="h-2 w-4/5 line-bar" />
          <div
            className={`h-2 w-full line-bar ${phase === "done" ? "chip-in hit" : ""}`}
            style={{ animationDelay: "0.25s" }}
          />
          <div className="h-2 w-3/5 line-bar" />
        </div>

        <div className="eyebrow mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {["Roadmapping", "SQL", "A/B testing", "Stakeholder mgmt"].map((k, i) => (
            <span
              key={k}
              className={`f-mono text-[10px] px-2 py-1 rounded border bd-line ${
                phase === "done" ? "chip-in bg-signal-soft t-signal" : "t-slate"
              }`}
              style={{ animationDelay: `${0.3 + i * 0.1}s`, borderColor: phase === "done" ? "transparent" : undefined }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="rule border-t bd-line px-6 py-4 space-y-2">
        {checklistItems.map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-2 text-xs t-ink-soft ${phase === "done" ? "chip-in" : "opacity-0"}`}
            style={{ animationDelay: `${0.4 + i * 0.15}s` }}
          >
            <Check className="w-3.5 h-3.5 t-signal shrink-0" strokeWidth={2.5} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumeProLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(0);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) setTheme("dark");
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const price = billing === "monthly" ? "$12" : "$8";
  const priceNote = billing === "monthly" ? "per month" : "per month, billed annually";

  return (
    <div className={`rp-root min-h-screen ${theme === "dark" ? "theme-dark" : ""}`}>
      <style>{FONT_STYLES}</style>

      {/* Nav */}
      <header className="header-surface sticky top-0 z-30 rule border-b bd-line">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-sm bg-signal flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="f-display text-lg t-ink tracking-tight">ResumePro</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm t-ink-soft">
            <a href="#templates" className="hover:text-signal transition-colors">Templates</a>
            <a href="#features" className="hover:text-signal transition-colors">Features</a>
            <a href="#pricing" className="hover:text-signal transition-colors">Pricing</a>
            <a href="#reviews" className="hover:text-signal transition-colors">Reviews</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link to="/auth" className="btn-ghost text-sm px-4 py-2 rounded-md">Log in</Link>
            <Link to="/auth" className="btn-primary text-sm px-4 py-2 rounded-md flex items-center gap-1.5">
              Build my resume <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button className="md:hidden text-ink" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
              {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm t-ink-soft bg-paper">
            <a href="#templates" onClick={() => setNavOpen(false)}>Templates</a>
            <a href="#features" onClick={() => setNavOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setNavOpen(false)}>Pricing</a>
            <a href="#reviews" onClick={() => setNavOpen(false)}>Reviews</a>
            <Link to="/auth" className="btn-primary text-sm px-4 py-2 rounded-md mt-2 w-full text-center">Build my resume</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="eyebrow mb-6">ATS-tested resume platform</div>
          <h1 className="f-display text-4xl md:text-[3.1rem] leading-[1.08] t-ink mb-6">
            Built to pass the machine.
            <br />
            Designed to impress the human.
          </h1>
          <p className="text-base md:text-lg t-slate leading-relaxed mb-8 max-w-md">
            Write a resume that clears applicant tracking software and still reads like it was
            written by someone who knows what they're worth.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link to="/auth" className="btn-primary text-sm font-medium px-5 py-3 rounded-md flex items-center gap-2">
              Build my resume free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="btn-ghost text-sm font-medium px-5 py-3 rounded-md">
              Browse templates
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 f-mono text-xs t-slate">
            <span>No credit card required</span>
            <span>1 free resume, always</span>
            <span>Cancel anytime</span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <ScanWidget />
        </div>
      </section>

      {/* Trust strip */}
      <section className="rule border-y bd-line bg-raised">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm t-slate">
          <span>Used by candidates hired at Fortune 500 companies, high-growth startups, and top consulting firms</span>
          <span className="f-mono text-xs t-signal">40,000+ resumes scanned this year</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="eyebrow mb-4">Everything in one place</div>
        <h2 className="f-display text-3xl md:text-4xl t-ink mb-4 max-w-lg">
          One platform, from first draft to signed offer
        </h2>
        <p className="t-slate max-w-lg mb-14">
          Seven tools that share your data instead of making you re-enter it seven times.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="doc-card rounded-lg p-6 transition-all duration-200">
              <f.icon className="w-5 h-5 t-signal mb-4" strokeWidth={1.75} />
              <h3 className="font-semibold t-ink mb-2">{f.title}</h3>
              <p className="text-sm t-slate leading-relaxed">{f.body}</p>
            </div>
          ))}

          <div className="rounded-lg p-6 bg-signal-soft flex flex-col justify-between">
            <div>
              <Award className="w-5 h-5 t-signal mb-4" strokeWidth={1.75} />
              <h3 className="font-semibold t-ink mb-2">Expert resume review</h3>
              <p className="text-sm t-ink-soft leading-relaxed">
                Submit your resume for a paid review. A human writes back with a specific,
                line-by-line feedback report.
              </p>
            </div>
            <button className="text-sm font-medium t-signal flex items-center gap-1 mt-4 self-start">
              Learn how it works <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-raised rule border-y bd-line">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="eyebrow mb-4">The process</div>
          <h2 className="f-display text-3xl md:text-4xl t-ink mb-14 max-w-lg">
            Three steps, repeated for every application
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {STEPS.map((s, i) => (
              <div key={s.n} className={i > 0 ? "md:pl-10 md:border-l bd-line" : ""}>
                <div className="f-mono text-sm t-signal mb-3">{s.n}</div>
                <h3 className="f-display text-xl t-ink mb-2">{s.title}</h3>
                <p className="text-sm t-slate leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="max-w-6xl mx-auto px-6 py-24">
        <div className="eyebrow mb-4">Five layouts, one parser standard</div>
        <h2 className="f-display text-3xl md:text-4xl t-ink mb-14 max-w-lg">
          Templates built around how software reads, not just how pages look
        </h2>

        <div className="grid md:grid-cols-[220px_1fr] gap-10">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {TEMPLATES.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActiveTemplate(i)}
                className={`text-left px-4 py-3 rounded-md text-sm whitespace-nowrap md:whitespace-normal transition-colors ${
                  activeTemplate === i
                    ? "bg-signal-soft t-signal font-medium"
                    : "t-ink-soft hover:bg-raised"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="doc-card rounded-xl p-8 min-h-[320px] flex flex-col justify-between">
            <div>
              <h3 className="f-display text-2xl t-ink mb-3">{TEMPLATES[activeTemplate].name}</h3>
              <p className="t-slate max-w-md leading-relaxed">{TEMPLATES[activeTemplate].note}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="col-span-1 space-y-2">
                <div className="h-2 w-full line-bar" />
                <div className="h-2 w-4/5 line-bar" />
                <div className="h-2 w-3/5 line-bar" />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="h-2 w-full line-bar" />
                <div className="h-2 w-full line-bar" />
                <div className="h-2 w-2/3 line-bar" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-raised rule border-y bd-line">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="eyebrow mb-4">From the job search</div>
          <h2 className="f-display text-3xl md:text-4xl t-ink mb-14 max-w-lg">
            What changed for people who used it
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="doc-card rounded-lg p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 t-amber" fill="#B8792E" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm t-ink-soft leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                <div className="rule border-t bd-line pt-4">
                  <div className="text-sm font-medium t-ink">{t.name}</div>
                  <div className="f-mono text-[11px] t-slate mt-0.5">{t.context}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
        <div className="eyebrow mb-4">Pricing</div>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <h2 className="f-display text-3xl md:text-4xl t-ink max-w-lg">
            Start free. Upgrade when the search gets serious.
          </h2>
          <div className="flex items-center gap-1 bg-raised rounded-md p-1 border bd-line">
            <button
              onClick={() => setBilling("monthly")}
              className={`f-mono text-xs px-3 py-2 rounded ${
                billing === "monthly" ? "bg-signal text-white" : "t-slate"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`f-mono text-xs px-3 py-2 rounded ${
                billing === "annual" ? "bg-signal text-white" : "t-slate"
              }`}
            >
              Annual — save 33%
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="doc-card rounded-xl p-8">
            <h3 className="f-display text-xl t-ink mb-1">Free</h3>
            <p className="text-sm t-slate mb-6">For your first pass at a real resume.</p>
            <div className="f-display text-4xl t-ink mb-6">
              $0 <span className="text-base t-slate font-normal">/ forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["1 resume", "Minimal ATS template", "5 AI credits per month", "PDF export"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm t-ink-soft">
                  <Check className="w-4 h-4 t-signal shrink-0" /> {i}
                </li>
              ))}
            </ul>
            <Link to="/auth" className="btn-ghost w-full text-sm font-medium py-3 rounded-md mt-auto">
              Start free
            </Link>
          </div>

          <div className="contrast-panel rounded-xl p-8 relative overflow-hidden flex flex-col">
            <div className="eyebrow contrast-accent-text mb-1">Most popular</div>
            <h3 className="f-display text-xl mb-1 mt-2">Premium</h3>
            <p className="text-sm contrast-sub mb-6">
              For an active search across multiple roles.
            </p>
            <div className="f-display text-4xl mb-1">
              {price} <span className="text-base font-normal contrast-sub">/ mo</span>
            </div>
            <div className="f-mono text-xs contrast-accent-text mb-6">{priceNote}</div>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited resumes",
                "All five ATS templates",
                "Unlimited AI assistant use",
                "Cover letter builder",
                "LinkedIn optimizer",
                "Application tracker",
              ].map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 shrink-0 contrast-accent-text" /> {i}
                </li>
              ))}
            </ul>
            <Link to="/auth" className="contrast-cta inline-flex items-center justify-center w-full text-sm font-medium py-3 rounded-md mt-auto">
              Get Premium
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-raised rule border-t bd-line">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="eyebrow mb-4">Questions</div>
          <h2 className="f-display text-3xl t-ink mb-10">Before you start</h2>
          <div className="divide-y bd-line border-t border-b bd-line">
            {FAQS.map((f, i) => (
              <div key={f.q} className="rule bd-line">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span className="font-medium t-ink pr-4">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 t-slate shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-sm t-slate leading-relaxed pb-5 max-w-xl">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <Zap className="w-6 h-6 t-signal mx-auto mb-6" />
        <h2 className="f-display text-3xl md:text-4xl t-ink mb-4 max-w-xl mx-auto">
          Your next resume takes about ten minutes
        </h2>
        <p className="t-slate mb-8 max-w-md mx-auto">
          Start with the free plan. Upgrade the day you need more than one resume.
        </p>
        <Link to="/auth" className="btn-primary text-sm font-medium px-6 py-3.5 rounded-md inline-flex items-center gap-2">
          Build my resume free <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="rule border-t bd-line bg-raised">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-signal flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
            <span className="f-display t-ink">ResumePro</span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm t-slate">
            <a href="#templates" className="hover:text-signal transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-signal transition-colors">Pricing</a>
            <a href="#reviews" className="hover:text-signal transition-colors">Reviews</a>
            <a href="#" className="hover:text-signal transition-colors">Blog</a>
            <a href="#" className="hover:text-signal transition-colors">Privacy</a>
          </div>
          <span className="f-mono text-xs t-slate">© 2026 ResumePro AI Career Hub</span>
        </div>
      </footer>
    </div>
  );
}
