import { useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { BackButton } from "@/components/back-button"
import { useProjectById } from "./data"
import { Galeria, Lightbox } from "./galeria"

export function ProjetoDetalhe() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const project = useProjectById(id)
  const [logoAberta, setLogoAberta] = useState(false)
  const [videoAberta, setVideoAberta] = useState(false)

  if (!project) {
    return <Navigate to={"*"} replace/>
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-50 font-sans">

      <BackButton />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 flex flex-col gap-10">
        <header className="flex flex-col md:flex-row items-start gap-6">
          <button
            type="button"
            aria-label={t("pages.projetos.ampliarLogo", { titulo: project.title.replace("\n", " ") })}
            onClick={() => setLogoAberta(true)}
            className="cursor-zoom-in transition hover:opacity-80"
          >
            <img
              src={project.logo}
              alt={t("pages.projetos.logoAlt", { titulo: project.title.replace("\n", " ") })}
              className="w-20 h-20 rounded-2xl object-cover border border-zinc-800"
            />
          </button>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight whitespace-pre-line">
              {project.title}
            </h1>
            {project.credit && (
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-zinc-500">
                {project.credit}
              </p>
            )}
          </div>
        </header>

        {project.demo.endsWith(".mp4") ? (
          <video
            src={project.demo}
            autoPlay
            loop
            muted
            playsInline
            onClick={() => setVideoAberta(true)}
            aria-label={project.title.replace("\n", " ")}
            className="w-full cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 object-contain aspect-video"
          />
        ) : (
          <img
            src={project.demo}
            alt={project.title.replace("\n", " ")}
            onClick={() => setVideoAberta(true)}
            className="w-full cursor-zoom-in rounded-2xl border border-zinc-800 bg-zinc-900 object-contain aspect-video"
          />
        )}

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-mono uppercase tracking-[0.14em] text-zinc-500">
            {t("pages.projetos.sobre")}
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed">
            {project.description}
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-mono uppercase tracking-[0.14em] text-zinc-500">
            {t("pages.projetos.contribuicao")}
          </h2>
          <ul className="flex flex-col gap-2">
            {project.contributions.map((c) => (
              <li key={c} className="flex items-start gap-2 text-zinc-300 text-lg ">
                <span className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-mono uppercase tracking-[0.14em] text-zinc-500">
            {t("pages.projetos.stack")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-700 bg-zinc-800/60 px-4 py-1.5 text-sm text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-mono uppercase tracking-[0.14em] text-zinc-500">
            {t("pages.projetos.links")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/60 px-5 py-2 text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-400 hover:text-white"
              >
                <ExternalLink size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-mono uppercase tracking-[0.14em] text-zinc-500">
              {t("pages.projetos.galeria")}
            </h2>
            <Galeria images={project.gallery} title={project.title} />
          </section>
        )}
      </div>

      <Lightbox
        src={project.logo}
        alt={t("pages.projetos.logoAlt", { titulo: project.title.replace("\n", " ") })}
        open={logoAberta}
        onClose={() => setLogoAberta(false)}
        media="image"
      />

      <Lightbox
        src={project.demo}
        alt={project.title.replace("\n", " ")}
        open={videoAberta}
        onClose={() => setVideoAberta(false)}
        media="video"
      />


    </div>
  )
}