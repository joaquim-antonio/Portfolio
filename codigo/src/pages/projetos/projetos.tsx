import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BackButton } from "@/components/back-button"
import { CoverflowCarousel, type CoverflowSlide } from "./carrosel"
import { useProjects } from "./data"

export function Projetos() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const projects = useProjects()

  const slides = useMemo<CoverflowSlide[]>(
    () =>
      projects.map((p) => ({
        src: p.logo,
        alt: p.title.replace("\n", " "),
        title: p.title,
        subtitle: p.credit,
        meta: p.meta?.map((m) => ({ label: "", value: m })),
      })),
    [projects],
  )

  const active = slides[activeIndex]

  return (
    <div className="relative min-h-screen w-full flex items-center bg-zinc-950 overflow-hidden">
      <BackButton />
      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col gap-8">
        {active && (
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-zinc-50 whitespace-pre-line">
              {active.title}
            </h1>
            {active.subtitle && (
              <p className="text-sm text-zinc-400 font-sans uppercase tracking-widest">
                {active.subtitle}
              </p>
            )}
          </div>
        )}
        <CoverflowCarousel
          slides={slides}
          showCaption
          showNavigation
          onActiveChange={setActiveIndex}
          onSlideClick={(i) => navigate(`/projetos/${projects[i].id}`)}
        />
      </div>
    </div>
  )
}