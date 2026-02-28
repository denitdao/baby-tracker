# Web Quiz Funnel — Baby Routine Optimization App

> **Goal:** Paid traffic (Facebook/Instagram/TikTok) → Web quiz → Email capture → Web paywall OR app install  
> **Benchmark:** Quiz-funnel users convert to paid 2–3× higher than direct installs (Headway data)  
> **Target length:** 18–22 screens, ~3–4 minutes

---

## Funnel Architecture

```
Ad → Landing Page → Quiz (18-22 screens) → "Building Plan" → Results Preview → Email Capture → Paywall → App Install
```

**3 phases inside the quiz:**

1. **Personalization** (screens 1–10): Collect data, build emotional investment
2. **Education + Problem Framing** (screens 11–15): Napper-style "Problem #1, #2" screens that teach WHY they need you
3. **Promise + Conversion** (screens 16–22): Show personalized results, capture email, paywall

---

## Phase 0: Landing Page (pre-quiz)

**Headline:** "Is your baby's daily routine working against you?"  
**Subheadline:** "Take a 3-minute quiz — get a personalized routine plan for your baby"

**Elements:**

- Hero: Parent + baby illustration (warm, not clinical)
- Social proof strip: "Trusted by X parents" · ⭐ 4.8 App Store · "Featured in [publication]"
- Single CTA button: "Start Free Quiz →"
- Below fold: 3 benefit cards (mirrors Napper's welcome):
  - 🧠 "Better mood and less stress — for you AND your baby"
  - 😴 "Optimized sleep — no more guessing nap times"
  - 📊 "Track growth confidently — milestones, feeding, everything"
- Trust: "No credit card required · 2 min quiz · Science-backed"

---

## Phase 1: Personalization (Screens 1–10)

### Screen 1 — Welcome / Value Selection
>
> **"Hi there! 👋"**  
> "Your baby's perfect routine is just a few questions away. What matters most to you right now?"
>
> **3 selectable cards** (like Napper's "Hi there!" screen):
>
> - 😴 **Better sleep for everyone** — "Fewer night wake-ups, predictable naps"
> - 📋 **An organized daily routine** — "Know what to do and when, less guessing"
> - 💪 **Confidence in your baby's growth** — "Track milestones, feeding, development"
>
> CTA: "Let's go!"

*Purpose: Segments user journey. Their selection influences which "Problem" screens and paywall messaging they see.*

---

### Screen 2 — Attribution
>
> **"How did you find us?"**
>
> - TikTok
> - Instagram / Facebook
> - Google search
> - YouTube
> - Friend / family recommendation
> - Blog / article
> - Other
>
> CTA: "Next"

*Purpose: Marketing attribution — critical for ad optimization. Put it early when drop-off hasn't started. Napper does this too.*

---

### Screen 3 — Baby's Name
>
> **"Let's get to know your little one! What's their name?"**
>
> Text input with placeholder "Baby's name"  
> Illustration: Cute mascot character (baby version) waving  
>
> CTA: "Next"

*Purpose: Emotional investment starts. Every subsequent screen uses the baby's name.*

---

### Screen 4 — Baby's Birthday
>
> **"When was [name] born?"**  
> Subtitle: "We need this to calculate the perfect routine ✨"
>
> Date picker  
> Link: "My baby is not born yet" → branches to due-date flow
>
> CTA: "Next"

*Purpose: Core data for personalization engine. Subtitle explains WHY (like Napper's "We need this to do sleep calculations ✨")*

---

### Screen 5 — First-born?
>
> **"Is [name] your first baby?"**
>
> - Yes
> - No
>
> CTA: "Next"

*Purpose: First-time parents need more guidance → affects content recommendations and messaging intensity. Also segments for ad retargeting.*

---

### Screen 6 — Who are you?
>
> **"And who are you to [name]?"**
>
> - Mom
> - Dad  
> - Other caregiver
>
> CTA: "Next"

*Purpose: Personalizes language throughout ("Hey mama" vs neutral). Dads are an underserved segment — if selected, highlight "partner sync" feature later.*

---

### Screen 7 — Your Name
>
> **"And what's YOUR name?"**
>
> Text input  
> Mascot (parent version) waving
>
> CTA: "Next"

*Purpose: Makes all subsequent screens personally addressed. "Hi [parent name], based on [baby name]'s age..."*

---

### Screen 8 — 🎉 Affirmation Screen
>
> **"[parent name] + [baby name] — what a team! 🎉"**
>
> Illustration: Parent mascot + baby mascot together (like Napper's "Omg! What. A. Team!" screen)  
> Subtitle: "We're your biggest fans. Let's build the perfect routine together."
>
> CTA: "Next"

*Purpose: Emotional reward for data entry. Reduces quiz fatigue. Creates belonging.*

---

### Screen 9 — Goals (multi-select)
>
> **"What would make the biggest difference for your family?"**  
> Subtitle: "Select all that apply"
>
> - 😴 Fewer night wake-ups
> - ⏰ Predictable nap schedule
> - 🍼 Organized feeding routine
> - 📈 Track growth milestones confidently
> - 🧘 Less daily stress and overwhelm
> - ⚡ More energy during the day
> - 👶 Know if [name] is developing on track
> - 🕐 Faster, easier bedtime
>
> CTA: "Next" / Option: "Skip for now"

*Purpose: KEY screen. Their selections directly shape:*
*1. Which "Problem" education screens appear*
*2. Paywall benefit messaging*
*3. Post-conversion push notification topics*
*4. Email nurture sequence content*

---

### Screen 10 — Current Biggest Struggle
>
> **"What's the hardest part of your day with [name] right now?"**
>
> - "I never know when [name] should nap"
> - "Night time is a battle"
> - "I'm not sure if [name] is eating enough"
> - "I feel like I'm winging it every day"
> - "I worry about [name]'s development"
> - "I barely have time for myself"
>
> CTA: "Got it — we hear you 💙"

*Purpose: Pain-point identification. The CTA copy acknowledges their struggle (empathy). This answer determines the LEAD problem/solution screen.*

---

## Phase 2: Education + Problem Framing (Screens 11–15)

> **Napper's pattern:** They show "Problem #1", "Problem #2" etc. with beautiful data visualizations.  
> **Your adaptation:** Same structure, but cover YOUR three pillars — Sleep, Feeding, Development — not just sleep.

The screens shown depend on the user's goal selection from Screen 9. Show 2–3 problem screens max. Below are all 5 possible problem screens; the engine selects 2–3 based on quiz answers.

---

### Screen 11 — Problem: Sleep Pressure (if sleep goals selected)
>
> **Problem #1**  
> **"Babies don't sleep like adults"**
>
> **Visualization:** Sleep pressure wave graph (like Napper) — showing adult's smooth sine wave vs baby's jagged pattern with multiple nap resets  
> Toggle: "[name]" / "You" (to switch between views)
>
> "Adults build sleep pressure over a full day. [name]'s battery drains in just 1–3 hours at [age]. Missing the right window by even 20 minutes can mean an overtired, cranky baby — and a stressful night for you."
>
> CTA: "Next"

---

### Screen 12 — Problem: Feeding Rhythm (if feeding goals selected)
>
> **Problem #2**  
> **"Feeding isn't just about hunger"**
>
> **Visualization:** 24-hour circular clock (like Napper's circadian rhythm screen) — showing how feeding times connect to sleep quality, energy, and digestion across the day
>
> "[name]'s feeding schedule directly affects sleep quality and mood. At [age], most babies need [X] feeds per day, timed around wake windows — not just when they cry."
>
> CTA: "Next"

---

### Screen 13 — Problem: Development Tracking (if milestone goals selected)
>
> **Problem #3**  
> **"Every baby develops at their own pace — but milestones still matter"**
>
> **Visualization:** Timeline graphic showing expected vs actual milestone windows — highlighting the "normal range" band
>
> "At [age], [name] is in a critical window for [relevant milestone]. 73% of parents worry they're missing something. The key is knowing what to look for — and when."
>
> CTA: "Next"

---

### Screen 14 — Problem: Parental Stress (if stress/energy goals selected)
>
> **Problem #4**  
> **"When baby doesn't have a routine, neither do you"**
>
> **Visualization:** Split screen — chaotic day (random icons scattered) vs organized day (neat timeline)
>
> "New parents lose an average of 44 days of sleep in the first year. But it's not just about sleep — it's the unpredictability. When you don't know what's coming next, every hour feels harder than it needs to."
>
> CTA: "Next"

---

### Screen 15 — Solution Bridge / Promise Screen
>
> **"Here's the good news, [parent name] 💛"**
>
> **"A personalized routine changes everything."**
>
> "Based on [name]'s age ([calculated age]), we can calculate:"
>
> - ✅ Optimal wake windows and nap times
> - ✅ The right feeding rhythm for [name]'s stage
> - ✅ Which milestones to watch for this month
> - ✅ A daily schedule that gives YOU breathing room
>
> "[X]% of parents who follow a personalized routine report better sleep within 2 weeks."
>
> CTA: "Build my plan →"

*Purpose: The BRIDGE between problems and paywall. Positions the app as the direct solution to the problems just shown. Social proof stat reinforces credibility.*

---

## Phase 3: Promise + Conversion (Screens 16–22)

### Screen 16 — "Building Your Plan" Loading Screen
>
> Animated progress screen (3–5 seconds):
>
> "Analyzing [name]'s age and stage..."  
> "Calculating optimal wake windows..."  
> "Building feeding schedule..."  
> "Checking developmental milestones..."  
> "Personalizing your routine plan..."  
> ✅ "Your plan is ready!"
>
> Progress bar fills from 0 to 100%

*Purpose: Perceived effort = perceived value. BetterMe, Noom, Flo all use this. It makes the "plan" feel computed, not generic.*

---

### Screen 17 — Personalized Results Preview
>
> **"[name]'s Optimized Daily Routine"**
>
> Visual daily timeline showing:
>
> - 🌅 7:00 AM — Wake up
> - 🍼 7:15 AM — Morning feed
> - 😴 9:00 AM — Nap 1 (1.5 hrs)
> - 🍼 10:45 AM — Feed
> - 🎯 11:30 AM — Activity time (milestone: [specific])
> - 😴 12:30 PM — Nap 2 (1 hr)
> - ...
> - 🌙 7:00 PM — Bedtime routine
>
> **BLURRED/LOCKED** below the first 3 entries  
> Overlay: "Unlock [name]'s full routine plan"
>
> **Key stat badge:** "Based on [name]'s age, ideal bedtime window: 6:30–7:30 PM"

*Purpose: THIS IS THE AHA MOMENT. They see the value, it's personalized to their baby, but it's gated. Loss aversion kicks in — they've invested 3 min in the quiz and can see their plan exists.*

---

### Screen 18 — Social Proof
>
> **"Join [X] parents already using personalized routines"**
>
> 3 testimonial cards:
>
> - ⭐⭐⭐⭐⭐ "Within a week, [daughter] went from 4 wake-ups to 1. I finally feel like myself again." — Sarah, mom of 6-month-old
> - ⭐⭐⭐⭐⭐ "I stopped second-guessing everything. The routine just works." — James, first-time dad
> - ⭐⭐⭐⭐⭐ "The feeding + sleep tracking together is what makes this different." — Maria, mom of 2
>
> App Store badge: ⭐ 4.8 rating
>
> CTA: "Get my plan →"

---

### Screen 19 — Email Capture
>
> **"Where should we send [name]'s routine plan?"**
>
> Email input field  
> Subtitle: "We'll also send you [name]'s weekly milestone updates and expert tips"
>
> CTA: "Send my plan"  
> Privacy note: "No spam, ever. Unsubscribe anytime."

*Purpose: Email is captured BEFORE paywall. Even if they don't convert now, you can nurture them via email. This is the lead gen value of web funnels vs in-app.*

---

### Screen 20 — Paywall
>
> **"Start [name]'s personalized routine today"**
>
> **Trial explanation strip:**  
> Day 1: Full access starts → Day 5: Reminder before trial ends → Day 7: Your trial ends  
> "You won't be charged during the free trial"
>
> **Plans:**
>
> | | Monthly | Yearly ⭐ |
> |---|---|---|
> | Price | $12.99/mo | $59.99/yr |
> | Per week | $3.25/week | **$1.15/week** |
> | Label | "Flexible" | "BEST VALUE — Save 62%" |
> | Trial | 7 days free | 7 days free |
>
> **Yearly pre-selected by default**
>
> **What's included:**
>
> - ✅ [name]'s full personalized routine
> - ✅ Smart sleep & feeding tracker
> - ✅ Weekly milestone alerts for [age range]
> - ✅ Expert tips personalized to [name]'s stage
> - ✅ Push reminders (never miss a nap window)
> - ✅ Weekly progress reports
>
> **Primary CTA:** "Start My Free 7-Day Trial"  
> **Trust elements:** 🔒 Cancel anytime · Money-back guarantee · No charge for 7 days
>
> **Secondary:** "Continue with limited free version →" (small text, bottom)

*Key design choices:*
*- Only 2 plans (not 3) — simpler decision on web, higher conversion*
*- Per-week pricing makes yearly feel cheap ($1.15 vs $3.25)*
*- Features reference baby's name — feels personalized, not generic*
*- Web paywall = you keep ~85% revenue (no App Store 30% cut)*

---

### Screen 21 — Payment / App Install Fork

**If they subscribe on web:**
> "🎉 Welcome to the family, [parent name]!"  
> "[name]'s routine plan is ready. Download the app to get started."  
>
> [App Store button] [Google Play button]  
> "Your subscription is already active — just sign in with [email]"

**If they chose "continue free":**
> "No worries! Download the app to start tracking [name]'s day."  
> [App Store button] [Google Play button]  
> "Your personalized plan will be waiting when you're ready to upgrade 💛"

---

### Screen 22 — Post-Quiz Thank You (web page)
>
> "Check your email! We just sent [name]'s routine overview to [email]."
>
> **While you wait:**
>
> - 📱 Download the app → [links]
> - 📖 Read: "5 signs your baby's sleep schedule needs adjusting"
> - 👥 Join our parent community

---

## Post-Quiz Email Nurture Sequence

| Day | Subject Line | Content |
|---|---|---|
| 0 (immediate) | "[name]'s routine plan is ready 💛" | Routine preview (partial) + app download CTA |
| 1 | "Why [name]'s nap timing matters more than duration" | Educational content based on goal selection + "unlock full plan" |
| 2 | "What [name] should be doing this week (milestone: [X])" | Milestone content personalized to age |
| 3 | "[parent name], here's what 2 weeks of tracking looks like" | Before/after social proof + trial CTA |
| 5 | "Your free trial is still waiting ⏰" | Urgency + recap of plan + CTA (only if not subscribed) |
| 7 | "Last chance: [name]'s personalized routine expires soon" | Scarcity + final CTA |
| 14 | "Quick update: [name] just hit [X] weeks!" | Re-engagement with age-relevant content |

---

## A/B Test Priorities

| Test | Variant A | Variant B | Why |
|---|---|---|---|
| **Landing page headline** | "Is your baby's routine working against you?" | "Your baby's perfect day — planned by science" | Fear vs aspiration framing |
| **Quiz length** | 18 screens (full) | 12 screens (trimmed) | Measure completion rate vs conversion quality |
| **Plan preview (Screen 17)** | Blurred timeline | Fully visible but with "upgrade for reminders" | Test loss aversion vs goodwill |
| **Paywall plans** | 2 plans (monthly + yearly) | 3 plans (monthly + quarterly + yearly) | Decoy effect |
| **Email gate position** | Before paywall (Screen 19) | After paywall (post-skip) | Lead capture vs friction |
| **Problem screens** | 2 problems shown | 3 problems shown | Education depth vs drop-off |
| **Trial length** | 3-day trial | 7-day trial | Urgency vs trust |

---

## Technical Implementation Notes

**Recommended tools for building web quiz funnel:**

- **FunnelFox** — purpose-built for subscription app web funnels, A/B testing included
- **Typeform / Outgrow** — if you want fast MVP quiz without custom dev
- **Custom build** (Next.js + Vercel) — most control, best for later optimization
- **Adapty / RevenueCat** — for web paywall + subscription management that syncs with app

**Analytics to track:**

- Landing page → quiz start rate (target: 40–60%)
- Quiz start → completion rate (target: 50–70%)
- Quiz completion → email capture rate (target: 60–80%)
- Email capture → trial start rate (target: 15–30%)
- Trial → paid conversion (target: 40–60%)
- Overall: Visit → paid (target: 3–8%)

**Revenue note:** Web subscriptions avoid the App Store's 30% commission. At $59.99/year, you keep ~$51 via web vs ~$42 via App Store. At scale, this compounds significantly.
