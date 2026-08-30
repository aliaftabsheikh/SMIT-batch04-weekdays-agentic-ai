import Image from "next/image";
import { Apple, Play, Star } from "lucide-react";

function StoreBadge({
  icon,
  top,
  bottom,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-3 text-white transition hover:bg-gray-800"
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[11px] text-white/70">{top}</span>
        <span className="block font-heading text-lg font-bold">{bottom}</span>
      </span>
    </a>
  );
}

export function AppDownload() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-center gap-12 rounded-3xl bg-brand/10 p-8 md:p-14 lg:grid-cols-2">
          {/* Phone mockup */}
          <div className="relative mx-auto flex justify-center">
            <div className="relative h-[460px] w-[230px] rounded-[2.5rem] border-[10px] border-gray-900 bg-white shadow-[var(--shadow-food)]">
              <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900" />
              <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem]">
                <div className="relative h-48">
                  <Image
                    src="/foodwagon/burger.png"
                    alt="Featured meal in the FoodWagon app"
                    fill
                    sizes="230px"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-cta px-2 py-0.5 text-xs font-bold text-white">
                    -20%
                  </span>
                </div>
                <div className="flex-1 p-4">
                  <h4 className="font-heading font-bold text-gray-900">
                    Cheese Burger
                  </h4>
                  <div className="mt-1 flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-brand text-brand" />
                    <span className="font-semibold text-gray-700">4.8</span>
                  </div>
                  <div className="mt-3 h-9 rounded-lg bg-cta" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-gray-100" />
                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy + badges */}
          <div className="text-center lg:text-left">
            <h2 className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Install the app &amp; order in a tap
            </h2>
            <p className="mt-4 max-w-md text-gray-600 lg:mx-0">
              We&apos;ll send you a link, open it on your phone to download the
              app and start ordering your favorite meals in seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <StoreBadge
                icon={<Play className="size-7 fill-white" />}
                top="GET IT ON"
                bottom="Google Play"
              />
              <StoreBadge
                icon={<Apple className="size-7 fill-white" />}
                top="Download on the"
                bottom="App Store"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
