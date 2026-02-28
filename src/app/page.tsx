"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Scroll-reveal helper                                               */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Landing Page                                                       */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden bg-antique">
      {/* ---------- Decorative background blobs ---------- */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal/12 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[40%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-lavender/8 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-[20%] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-amber/8 to-transparent blur-3xl" />

      {/* ---------- Navigation ---------- */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Petite Care"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="font-heading text-lg font-bold leading-tight tracking-tight text-charcoal">
              Petite <span className="text-teal">Care</span>
            </div>
            <div className="text-[10px] leading-tight tracking-wide text-muted">
              my baby routine
            </div>
          </div>
        </div>
        <Link
          href="/quiz"
          className="rounded-full bg-teal px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-teal/20 transition-all hover:bg-teal-dark hover:shadow-lg hover:shadow-teal/30"
        >
          Start Quiz
        </Link>
      </nav>

      {/* ---------- Hero ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10 md:px-12 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
          <div>
            <div className="mb-5 inline-block animate-fade-in rounded-full bg-teal-light px-4 py-1.5 text-sm font-semibold text-teal">
              ✨ Science-backed routine planning
            </div>

            <h1 className="animate-slide-up font-heading text-4xl font-bold leading-[1.15] tracking-tight text-charcoal sm:text-5xl lg:text-[3.4rem]">
              Is your baby&apos;s daily routine{" "}
              <span className="relative inline-block text-teal">
                working against you?
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 286 9"
                  fill="none"
                >
                  <path
                    d="M2 6.5C50 2.5 100 1 143 3.5C186 6 236 7 284 3"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-lg animate-slide-up text-lg leading-relaxed text-muted [animation-delay:0.15s]">
              Take a 3-minute quiz — get a personalized routine plan for your
              baby. Better sleep, organized feeding, and confident parenting
              starts here.
            </p>

            <div className="mt-8 flex animate-slide-up flex-col gap-4 [animation-delay:0.25s] sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-teal px-8 py-4 text-lg font-bold text-white shadow-xl shadow-teal/25 transition-all hover:bg-teal-dark hover:shadow-2xl hover:shadow-teal/30 active:scale-[0.98]"
              >
                Start Free Quiz
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <p className="text-sm text-muted">
                No credit card required · 3 min
              </p>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="relative animate-fade-in [animation-delay:0.3s]">
            <Image
              src="/landing.jpg"
              alt="Parent holding a happy baby"
              width={600}
              height={450}
              className="rounded-3xl"
              priority
            />

            {/* Floating rating badge */}
            <div className="absolute -bottom-5 -left-3 animate-float rounded-2xl border border-border bg-surface p-3 shadow-lg md:-left-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-light text-xl">
                  ⭐
                </div>
                <div>
                  <div className="text-sm font-bold text-charcoal">
                    4.8 Rating
                  </div>
                  <div className="text-xs text-muted">App Store</div>
                </div>
              </div>
            </div>

            {/* Floating parents count */}
            <div className="absolute -right-2 top-4 animate-float rounded-2xl border border-border bg-surface p-3 shadow-lg [animation-delay:1.5s] md:-right-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-light text-sm">
                  👨‍👩‍👧
                </div>
                <div className="text-xs">
                  <div className="font-bold text-charcoal">50K+</div>
                  <div className="text-muted">parents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Social proof strip ---------- */}
      <div className="relative z-10 border-y border-border/50 bg-surface/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 px-6 py-4 text-sm text-muted sm:gap-8">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="text-amber">⭐</span> 4.8 App Store
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span>
            Trusted by{" "}
            <strong className="text-charcoal">50,000+</strong> parents
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span>Featured in Parents Magazine</span>
        </div>
      </div>

      {/* ---------- Benefits ---------- */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-12">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
              Everything you need for a{" "}
              <span className="text-teal">happier day</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Our personalized approach helps your whole family thrive
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={100}>
            <div className="group rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/5">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-light text-2xl transition-transform duration-300 group-hover:scale-110">
                😴
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Better mood &amp; less stress
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                For you AND your baby. Predictable routines mean fewer meltdowns
                and more smiles throughout the day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="group rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-lavender/5">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender-light text-2xl transition-transform duration-300 group-hover:scale-110">
                🧠
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Optimized sleep schedule
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                No more guessing nap times. Science-backed wake windows tailored
                to your baby&apos;s exact age and needs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="group rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber/5">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-light text-2xl transition-transform duration-300 group-hover:scale-110">
                📊
              </div>
              <h3 className="font-heading text-xl font-bold text-charcoal">
                Track growth confidently
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                Milestones, feeding, everything in one place. Know exactly where
                your baby is and what comes next.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Trust bar ---------- */}
      <Reveal>
        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-12">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted sm:gap-6">
            <span>🔒 Your data is private &amp; secure</span>
            <span className="hidden sm:inline">·</span>
            <span>📧 No spam, ever</span>
            <span className="hidden sm:inline">·</span>
            <span>🔬 Science-backed methods</span>
          </div>
        </div>
      </Reveal>

      {/* ---------- Bottom CTA ---------- */}
      <Reveal>
        <section className="relative z-10 mx-auto max-w-2xl px-6 pb-24 text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal md:text-4xl">
            Ready to find your baby&apos;s{" "}
            <span className="text-teal">perfect routine</span>?
          </h2>
          <p className="mt-4 text-muted">
            Join thousands of parents who&apos;ve transformed their daily
            routine.
          </p>
          <Link
            href="/quiz"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-10 py-4 text-lg font-bold text-white shadow-xl shadow-teal/25 transition-all hover:bg-teal-dark hover:shadow-2xl hover:shadow-teal/30 active:scale-[0.98]"
          >
            Start Free Quiz
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>
      </Reveal>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 border-t border-border/50 bg-surface/40 px-6 py-8 text-center">
        <Image
          src="/logo.png"
          alt="Petite Care"
          width={32}
          height={32}
          className="mx-auto rounded-full"
        />
        <div className="mt-2 font-heading text-lg font-bold tracking-tight text-charcoal">
          Petite <span className="text-teal">Care</span>
        </div>
        <p className="mt-1 text-sm text-muted">
          © 2026 Petite Care. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
