import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Instagram, GitHub } from "./icons";
import { ArrowUpRight } from "./icons";

export default function PersonalBrand() {
  const personalInfo = {
    name: "Rasul Ravshanbekov",
    fullName: "Abdurasul Ravshanbekov Sobir o‘g‘li",
    title: "Junior+ Frontend Developer",
    location: "Tashkent, Uzbekistan",
    education: "Mars IT School",
    portfolio: "https://rasulweb.uz/",
    instagram: "https://www.instagram.com/rasul_ravshanbekov/",
    github: "https://github.com/frezocsss-cmd",
    phone: "+998938271902",
  };

  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript ES6+",
    "React.js",
    "React Hooks",
    "Zustand",
    "CRUD operations",
    "Component-based architecture",
    "Reusable components",
    "API integration",
    "Responsive web design",
    "Git va GitHub",
    "UX/UI design principles",
  ];

  const projects = [
    { name: "Formo.uz", url: "https://formo.uz/" },
    { name: "Zolvi.uz", url: "https://zolvi.uz/" },
  ];

  return (
    <section id="personal-brand" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            align="left"
            index="07"
            kicker="SHAXSIY BRANDING"
            title={
              <>
                Professional <span className="text-serif-italic font-medium text-champagne">ma'lumotlar</span>
              </>
            }
            description="Rasul Ravshanbekov — Junior+ Frontend Developer"
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="rounded-2xl border border-hairline bg-card/70 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-espresso">Men haqimda</h3>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-mocha">Ism familiya</dt>
                  <dd className="mt-1 text-sm text-espresso">{personalInfo.fullName}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-mocha">Qisqartirilgan ism</dt>
                  <dd className="mt-1 text-sm text-espresso">{personalInfo.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-mocha">Kasb</dt>
                  <dd className="mt-1 text-sm text-espresso">{personalInfo.title}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-mocha">Manzil</dt>
                  <dd className="mt-1 text-sm text-espresso">{personalInfo.location}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-mocha">Ta'lim</dt>
                  <dd className="mt-1 text-sm text-espresso">{personalInfo.education}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-mocha">Aloqa</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-cream-2/60 px-3 py-1.5 text-xs text-espresso transition-colors hover:border-champagne/60 hover:text-champagne"
                    >
                      +998 93 827 19 02
                    </a>
                    <a
                      href={personalInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-cream-2/60 px-3 py-1.5 text-xs text-espresso transition-colors hover:border-champagne/60 hover:text-champagne"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-cream-2/60 px-3 py-1.5 text-xs text-espresso transition-colors hover:border-champagne/60 hover:text-champagne"
                    >
                      <GitHub className="h-4 w-4" />
                      GitHub
                    </a>
                    <a
                      href={personalInfo.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-cream-2/60 px-3 py-1.5 text-xs text-espresso transition-colors hover:border-champagne/60 hover:text-champagne"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      Portfolio
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={120}>
              <div className="rounded-2xl border border-hairline bg-card/70 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-espresso">Texnik ko‘nikmalar</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-hairline bg-cream-2/60 px-3 py-1.5 text-xs text-espresso"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-2xl border border-hairline bg-card/70 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-espresso">Loyihalar</h3>
                <ul className="mt-6 space-y-3">
                  {projects.map((project) => (
                    <li key={project.name}>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-hairline bg-cream/70 px-4 py-3 transition-all hover:border-champagne/60 hover:bg-card"
                      >
                        <span className="text-sm font-medium text-espresso">{project.name}</span>
                        <ArrowUpRight className="h-4 w-4 text-mocha transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
