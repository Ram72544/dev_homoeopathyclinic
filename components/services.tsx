import { site } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="bg-beige-soft py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-teal-mid">
            What We Treat
          </span>
          <h2 className="mt-2 text-3xl font-bold text-teal-dark sm:text-4xl">
            Conditions we care for
          </h2>
          <p className="mt-4 text-lg text-teal-dark/75">
            Holistic homoeopathic treatment across a wide range of acute and
            chronic conditions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-beige bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-teal-dark">
                  {service.title}
                </h3>
                <p className="mt-2 leading-relaxed text-teal-dark/75">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
