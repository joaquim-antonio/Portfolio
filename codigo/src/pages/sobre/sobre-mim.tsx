import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { BackButton } from "@/components/back-button";
import { Marquee, Logos } from "@/components/stack-carrousel";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full flex flex-col items-center text-center gap-6">
      <div className="relative mb-2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white via-grey to-white opacity-60 blur-lg animate-glow" />
        <img
          src="/eu.jpeg"
          alt="minha-foto"
          className="relative size-64 rounded-full shadow-xl z-10 object-cover"
        />
      </div>
      <h1 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight font-sans drop-shadow-lg">
        {t("pages.sobreMim.saudacao")} <strong>Joaquim</strong>
      </h1>
      <p className="text-xl md:text-xl text-zinc-300 max-w-lg mx-auto font-sans font-normal">
        <Trans i18nKey="pages.sobreMim.bio" components={{ strong: <strong /> }} />
      </p>
      <p className="text-xl md:text-xl text-zinc-300 max-w-lg mx-auto font-sans font-normal">
        <Trans
          i18nKey="pages.sobreMim.cta"
          components={{
            1: <Link to="/experiencia" className="text-sky-300 font-bold hover:underline" />,
            3: <Link to="/projetos" className="text-sky-300 font-bold hover:underline" />,
            5: <Link to="/contatos" className="text-sky-300 font-bold hover:underline" />,
          }}
        />
      </p>
    </section>
  );
};

export const SobreMim = () => {
  const arr = [Logos.tailwindcss, Logos.framer, Logos.nextjs, Logos.aws,]

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 px-4 py-16 text-zinc-50 font-sans relative overflow-hidden">
      <BackButton />
      <div className="w-full max-w-3xl flex flex-col items-center gap-12 z-10">
        <HeroSection />
        <Marquee>
          {arr.map((Logo, index) => (
            <div
              key={index}
              className="relative h-full w-fit mx-[4rem] flex items-center justify-start"
            >
              <Logo />
            </div>
          ))}
        </Marquee>
      </div>

    </div>
  );
};
