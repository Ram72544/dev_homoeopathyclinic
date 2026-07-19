import { site } from "@/lib/site-config";

export function WhyHomeopathy() {
  return (
    <section id="why" className="bg-teal-dark py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            The homoeopathy difference
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Trusted by millions of families across India, homoeopathy offers
            gentle, individualised care focused on lasting wellbeing.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-teal-mid">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
