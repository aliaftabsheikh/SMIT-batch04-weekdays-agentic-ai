import { BadgePercent, Navigation, Timer } from "lucide-react";

const features = [
  {
    icon: BadgePercent,
    title: "Daily Discounts",
    text: "Save more every day with exclusive member-only deals.",
  },
  {
    icon: Navigation,
    title: "Live Tracking",
    text: "Follow your rider in real time from kitchen to doorstep.",
  },
  {
    icon: Timer,
    title: "Quick Delivery",
    text: "Hot, fresh food delivered in 30 minutes or less.",
  },
];

export function FeaturesStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-[var(--shadow-card)] sm:grid-cols-3 md:p-12">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <div className="grid size-16 place-items-center rounded-2xl bg-brand/15 text-cta">
                <f.icon className="size-8" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold text-gray-900">
                {f.title}
              </h3>
              <p className="mt-2 max-w-xs text-gray-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
