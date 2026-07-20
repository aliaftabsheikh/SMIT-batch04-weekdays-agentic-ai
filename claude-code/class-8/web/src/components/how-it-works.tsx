import { MapPin, ScrollText, Bike } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Select location",
    text: "Choose the location where your food will be delivered.",
  },
  {
    icon: ScrollText,
    title: "Choose order",
    text: "Check over hundreds of menus to pick your favorite food.",
  },
  {
    icon: Bike,
    title: "Enjoy meals",
    text: "Your order will be delivered quickly to your doorstep.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
          How does it work
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map((step) => (
            <div key={step.title} className="flex flex-col items-center">
              <div className="grid size-20 place-items-center rounded-full bg-brand/15 text-cta shadow-[var(--shadow-food)]">
                <step.icon className="size-9" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
