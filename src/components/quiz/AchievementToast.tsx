"use client";

import { toast } from "sonner";

type AchievementVariant = "teal" | "lavender" | "amber";

type AchievementConfig = {
  emoji: string;
  title: string;
  description: string;
  variant?: AchievementVariant;
};

const VARIANT_STYLES: Record<AchievementVariant, string> = {
  teal: "border-l-[#2b9185] bg-[#e0f0ed]",
  lavender: "border-l-[#a78bfa] bg-[#ede9fe]",
  amber: "border-l-[#fbbf24] bg-[#fef3c7]",
};

function AchievementContent({
  emoji,
  title,
  description,
  variant = "teal",
}: AchievementConfig) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border-l-4 px-4 py-3 shadow-lg shadow-black/5 ${VARIANT_STYLES[variant]}`}
    >
      <span className="mt-0.5 text-2xl leading-none">{emoji}</span>
      <div className="min-w-0">
        <p className="font-heading text-charcoal text-sm font-bold">{title}</p>
        <p className="text-muted mt-0.5 text-xs">{description}</p>
      </div>
    </div>
  );
}

export function showAchievement(config: AchievementConfig) {
  toast.custom(() => <AchievementContent {...config} />, {
    duration: 3000,
    position: "top-center",
  });
}
