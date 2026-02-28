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
    <div className="bg-antique relative overflow-hidden">
      {/* ---------- Decorative background blobs ---------- */}
      <div className="from-teal/12 pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br to-transparent blur-3xl" />
      <div className="from-lavender/8 pointer-events-none absolute top-[40%] -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br to-transparent blur-3xl" />
      <div className="from-amber/8 pointer-events-none absolute -right-20 bottom-[20%] h-[350px] w-[350px] rounded-full bg-gradient-to-br to-transparent blur-3xl" />

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
            <div className="font-heading text-charcoal text-lg leading-tight font-bold tracking-tight">
              Petite <span className="text-teal">Care</span>
            </div>
            <div className="text-muted text-[10px] leading-tight tracking-wide">
              my baby routine
            </div>
          </div>
        </div>
        <Link
          href="/quiz"
          className="bg-teal shadow-teal/20 hover:bg-teal-dark hover:shadow-teal/30 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
        >
          Start Quiz
        </Link>
      </nav>

      {/* ---------- Hero ---------- */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-10 pb-20 md:px-12 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text column */}
          <div>
            <div className="animate-fade-in bg-teal-light text-teal mb-5 inline-block rounded-full px-4 py-1.5 text-sm font-semibold">
              ✨ Science-backed routine planning
            </div>

            <h1 className="animate-slide-up font-heading text-charcoal text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Is your baby&apos;s daily routine{" "}
              <span className="text-teal relative inline-block">
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

            <p className="animate-slide-up text-muted mt-6 max-w-lg text-lg leading-relaxed [animation-delay:0.15s]">
              Take a 3-minute quiz — get a personalized routine plan for your
              baby. Better sleep, organized feeding, and confident parenting
              starts here.
            </p>

            <div className="animate-slide-up mt-8 flex flex-col gap-4 [animation-delay:0.25s] sm:flex-row sm:items-center">
              <Link
                href="/quiz"
                className="group bg-teal shadow-teal/25 hover:bg-teal-dark hover:shadow-teal/30 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl active:scale-[0.98]"
              >
                Start Free Quiz
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <p className="text-muted text-sm">
                No credit card required · 3 min
              </p>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="animate-fade-in relative [animation-delay:0.3s]">
            <Image
              src="/landing.jpg"
              alt="Parent holding a happy baby"
              width={600}
              height={450}
              className="rounded-3xl"
              priority
            />

            {/* Floating rating badge */}
            <div className="animate-float border-border bg-surface absolute -bottom-5 -left-3 rounded-2xl border p-3 shadow-lg md:-left-6">
              <div className="flex items-center gap-2.5">
                <div className="bg-amber-light flex h-10 w-10 items-center justify-center rounded-xl text-xl">
                  ⭐
                </div>
                <div>
                  <div className="text-charcoal text-sm font-bold">
                    4.8 Rating
                  </div>
                  <div className="text-muted text-xs">App Store</div>
                </div>
              </div>
            </div>

            {/* Floating parents count */}
            <div className="animate-float border-border bg-surface absolute top-4 -right-2 rounded-2xl border p-3 shadow-lg [animation-delay:1.5s] md:-right-4">
              <div className="flex items-center gap-2">
                <div className="bg-sage-light flex h-8 w-8 items-center justify-center rounded-lg text-sm">
                  👨‍👩‍👧
                </div>
                <div className="text-xs">
                  <div className="text-charcoal font-bold">50K+</div>
                  <div className="text-muted">parents</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Social proof strip ---------- */}
      <div className="border-border/50 bg-surface/50 relative z-10 border-y backdrop-blur-sm">
        <div className="text-muted mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 px-6 py-4 text-sm sm:gap-8">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="text-amber">⭐</span> 4.8 App Store
          </span>
          <span className="bg-border hidden h-4 w-px sm:block" />
          <span>
            Trusted by <strong className="text-charcoal">50,000+</strong>{" "}
            parents
          </span>
          <span className="bg-border hidden h-4 w-px sm:block" />
          <span>Featured in Parents Magazine</span>
        </div>
      </div>

      {/* ---------- Benefits ---------- */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-12">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="font-heading text-charcoal text-3xl font-bold md:text-4xl">
              Everything you need for a{" "}
              <span className="text-teal">happier day</span>
            </h2>
            <p className="text-muted mx-auto mt-3 max-w-md">
              Our personalized approach helps your whole family thrive
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal delay={100}>
            <div className="group border-border bg-surface hover:shadow-teal/5 rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-teal-light mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110">
                😴
              </div>
              <h3 className="font-heading text-charcoal text-xl font-bold">
                Better mood &amp; less stress
              </h3>
              <p className="text-muted mt-2 leading-relaxed">
                For you AND your baby. Predictable routines mean fewer meltdowns
                and more smiles throughout the day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="group border-border bg-surface hover:shadow-lavender/5 rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-lavender-light mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110">
                🧠
              </div>
              <h3 className="font-heading text-charcoal text-xl font-bold">
                Optimized sleep schedule
              </h3>
              <p className="text-muted mt-2 leading-relaxed">
                No more guessing nap times. Science-backed wake windows tailored
                to your baby&apos;s exact age and needs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="group border-border bg-surface hover:shadow-amber/5 rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-amber-light mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110">
                📊
              </div>
              <h3 className="font-heading text-charcoal text-xl font-bold">
                Track growth confidently
              </h3>
              <p className="text-muted mt-2 leading-relaxed">
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
          <div className="text-muted flex flex-wrap items-center justify-center gap-4 text-sm sm:gap-6">
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
          <h2 className="font-heading text-charcoal text-3xl font-bold md:text-4xl">
            Ready to find your baby&apos;s{" "}
            <span className="text-teal">perfect routine</span>?
          </h2>
          <p className="text-muted mt-4">
            Join thousands of parents who&apos;ve transformed their daily
            routine.
          </p>
          <Link
            href="/quiz"
            className="group bg-teal shadow-teal/25 hover:bg-teal-dark hover:shadow-teal/30 mt-8 inline-flex items-center gap-2 rounded-full px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl active:scale-[0.98]"
          >
            Start Free Quiz
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>
      </Reveal>

      {/* ---------- Footer ---------- */}
      <footer className="border-border/50 bg-surface/40 relative z-10 border-t px-6 py-8 text-center">
        <Image
          src="/logo.png"
          alt="Petite Care"
          width={32}
          height={32}
          className="mx-auto rounded-full"
        />
        <div className="font-heading text-charcoal mt-2 text-lg font-bold tracking-tight">
          Petite <span className="text-teal">Care</span>
        </div>
        <p className="text-muted mt-1 text-sm">
          © 2026 Petite Care. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
