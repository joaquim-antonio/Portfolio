import * as React from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface LightboxProps {
  src: string
  alt: string
  open: boolean
  onClose: () => void
  media?: "image" | "video"
  onPrev?: () => void
  onNext?: () => void
  label?: string
}

export function Lightbox({
  src,
  alt,
  open,
  onClose,
  media = "image",
  onPrev,
  onNext,
  label,
}: LightboxProps) {
  React.useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      } else if (event.key === "ArrowLeft" && onPrev) {
        onPrev()
      } else if (event.key === "ArrowRight" && onNext) {
        onNext()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose, onPrev, onNext])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200 sm:p-8"
    >
      {media === "video" ? (
        <video
          src={src}
          controls
          autoPlay
          playsInline
          onClick={(event) => event.stopPropagation()}
          className="max-h-[92vh] max-w-[92vw] rounded-lg bg-zinc-900"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onClick={(event) => event.stopPropagation()}
          className="max-h-[92vh] max-w-[92vw] rounded-lg object-contain"
        />
      )}

      {onPrev && (
        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={(event) => {
            event.stopPropagation()
            onPrev()
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-300 backdrop-blur transition hover:border-zinc-400 hover:text-white"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {onNext && (
        <button
          type="button"
          aria-label="Próxima imagem"
          onClick={(event) => {
            event.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-300 backdrop-blur transition hover:border-zinc-400 hover:text-white"
        >
          <ChevronRight size={22} />
        </button>
      )}

      <button
        type="button"
        aria-label="Fechar"
        onClick={(event) => {
          event.stopPropagation()
          onClose()
        }}
        className="fixed right-4 top-4 z-10 rounded-full border border-zinc-700 bg-zinc-900/80 p-2 text-zinc-300 backdrop-blur transition hover:border-zinc-400 hover:text-white"
      >
        <X size={18} />
      </button>

      {label && (
        <p className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-zinc-900/80 px-4 py-1.5 font-sans text-xs tracking-widest text-zinc-300 backdrop-blur">
          {label}
        </p>
      )}
    </div>
  )
}

function useColumns(): 1 | 2 {
  const [columns, setColumns] = React.useState<1 | 2>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 640px)").matches
        ? 2
        : 1
      : 1,
  )

  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)")
    const update = () => setColumns(query.matches ? 2 : 1)
    query.addEventListener("change", update)
    update()
    return () => query.removeEventListener("change", update)
  }, [])

  return columns
}

interface GaleriaProps {
  images: string[]
  title: string
}

export function Galeria({ images, title }: GaleriaProps) {
  const columns = useColumns()
  const totalSlides = Math.ceil(images.length / columns)
  const len = images.length
  const lastPageStart = Math.floor((len - 1) / columns) * columns
  const [raw, setRaw] = React.useState(0)
  const [lightbox, setLightbox] = React.useState<number | null>(null)
  const [noTransition, setNoTransition] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)

  React.useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => setContainerWidth(el.getBoundingClientRect().width)
    update()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update)
      observer.observe(el)
      return () => observer.disconnect()
    }

    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      setNoTransition(true)
      setRaw(len)
      requestAnimationFrame(() => setNoTransition(false))
    })
    return () => cancelAnimationFrame(id)
  }, [columns, len])

  const current = Math.floor((raw - len) / columns)

  if (len === 0) return null

  const altFor = (index: number) => `${title.replace("\n", " ")} ${index + 1}`
  const step = containerWidth > 0 ? containerWidth / columns : 0

  const jump = (index: number) => {
    setNoTransition(true)
    setRaw(index)
    requestAnimationFrame(() => setNoTransition(false))
  }

  const next = () => {
    if (raw - len + columns < len) {
      setRaw(raw + columns)
    } else {
      jump(len)
    }
  }

  const prev = () => {
    if (raw - len - columns >= 0) {
      setRaw(raw - columns)
    } else {
      jump(len + lastPageStart)
    }
  }

  const goTo = (index: number) => setRaw(index * columns + len)

  const moveLightbox = (delta: number) =>
    setLightbox((slide) =>
      slide === null ? slide : (slide + delta + len) % len,
    )

  return (
    <div className="flex w-full flex-col gap-4">
      <div ref={containerRef} className="w-full overflow-hidden">
        <div
          className={cn(
            "flex",
            noTransition
              ? "duration-0"
              : "transition-transform duration-300 ease-out",
          )}
          style={{ transform: `translateX(-${raw * step}px)` }}
        >
          {[0, 1].map((copy) =>
            images.map((src, index) => (
              <div
                key={`${copy}-${index}`}
                style={{ width: step, flex: `0 0 ${step}px` }}
              >
                <button
                  type="button"
                  aria-label={`Ampliar ${altFor(index)}`}
                  onClick={() => setLightbox(index)}
                  className="group block w-full cursor-zoom-in px-1"
                >
                  <img
                    src={src}
                    alt={altFor(index)}
                    loading="lazy"
                    className="aspect-video w-full rounded-xl border border-zinc-800 bg-zinc-900 object-contain transition group-hover:border-zinc-600"
                  />
                </button>
              </div>
            )),
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={prev}
          className="rounded-full border border-zinc-700 bg-zinc-800/60 p-2 text-zinc-300 transition hover:border-zinc-400 hover:text-white"
        >
          <ChevronLeft size={18} />
        </button>

        {totalSlides > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para ${index + 1}`}
                aria-current={current === index}
                onClick={() => goTo(index)}
                className={cn(
                  "size-2 rounded-full bg-zinc-400 transition",
                  current === index
                    ? "opacity-100"
                    : "opacity-35 hover:opacity-70",
                )}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label="Próxima imagem"
          onClick={next}
          className="rounded-full border border-zinc-700 bg-zinc-800/60 p-2 text-zinc-300 transition hover:border-zinc-400 hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {lightbox !== null && (
        <Lightbox
          src={images[lightbox]}
          alt={altFor(lightbox)}
          open
          onClose={() => setLightbox(null)}
          media="image"
          onPrev={() => moveLightbox(-1)}
          onNext={() => moveLightbox(1)}
          label={`${lightbox + 1} / ${images.length}`}
        />
      )}
    </div>
  )
}