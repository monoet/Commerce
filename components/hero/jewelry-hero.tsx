import Link from 'next/link';
import LightPillar from './light-pillar';
import styles from './light-pillar.module.css';

const LIGHT_PILLAR_PRESETS = {
  subtle: {
    topColor: '#F7F1E9',
    bottomColor: '#D6C4AE',
    accentColor: '#E9D2C5',
    intensity: 0.75,
    rotationSpeed: 0.14,
    timeSpeed: 0.28,
    glowAmount: 0.004,
    pillarWidth: 2.5,
    pillarHeight: 0.58,
    noiseIntensity: 0.18,
    shimmer: 0.2,
    opacity: 1,
    mixBlendMode: 'soft-light' as const,
    interactive: false,
    pillarRotation: -8,
    className: styles.mask
  },
  balanced: {
    topColor: '#F7F1E9',
    bottomColor: '#D6C4AE',
    accentColor: '#E9D2C5',
    intensity: 1.08,
    rotationSpeed: 0.14,
    timeSpeed: 0.42,
    glowAmount: 0.0085,
    pillarWidth: 2.45,
    pillarHeight: 0.6,
    noiseIntensity: 0.16,
    shimmer: 0.36,
    opacity: 1,
    mixBlendMode: 'screen' as const,
    interactive: false,
    pillarRotation: -8,
    className: styles.mask
  },
  strong: {
    topColor: '#FAF3EA',
    bottomColor: '#D2B89B',
    accentColor: '#F0D2C2',
    intensity: 1.15,
    rotationSpeed: 0.18,
    timeSpeed: 0.55,
    glowAmount: 0.009,
    pillarWidth: 2.35,
    pillarHeight: 0.62,
    noiseIntensity: 0.12,
    shimmer: 0.45,
    opacity: 1,
    mixBlendMode: 'screen' as const,
    interactive: false,
    pillarRotation: -10,
    className: ''
  }
};

export default function JewelryHero() {
  const preset = LIGHT_PILLAR_PRESETS.balanced;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(90deg,rgb(var(--hero-sand)),rgb(var(--hero-ivory)))]">
      <div className="hero-beam absolute inset-0 pointer-events-none" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgb(var(--bg)))]" />
      <LightPillar
        className={preset.className}
        topColor={preset.topColor}
        bottomColor={preset.bottomColor}
        accentColor={preset.accentColor}
        intensity={preset.intensity}
        rotationSpeed={preset.rotationSpeed}
        timeSpeed={preset.timeSpeed}
        glowAmount={preset.glowAmount}
        pillarWidth={preset.pillarWidth}
        pillarHeight={preset.pillarHeight}
        noiseIntensity={preset.noiseIntensity}
        shimmer={preset.shimmer}
        opacity={preset.opacity}
        mixBlendMode={preset.mixBlendMode}
        interactive={preset.interactive}
        pillarRotation={preset.pillarRotation}
      />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-16 sm:px-6 md:pt-24">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[rgb(var(--accent))]">
            Atelier de perlas
          </p>
          <h1 className="hero-title mt-5 text-4xl text-[rgb(var(--fg))] md:text-6xl">
            Joyeria minimal con
            <br />
            brillo nacarado.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--muted))] md:text-lg">
            Piezas esenciales, luz suave y un acabado calido que se siente
            editorial. Disenado para acompanarte todos los dias.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/search"
              className="rounded-full border border-[rgb(var(--primary))] bg-[rgb(var(--primary))] px-6 py-3 text-sm font-medium text-[rgb(var(--bg))] transition hover:bg-[rgb(36,42,39)]"
            >
              Ver coleccion
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-[rgb(var(--border))] bg-transparent px-6 py-3 text-sm font-medium text-[rgb(var(--accent))] transition hover:bg-[rgb(var(--bg))]"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
        <div className="grid max-w-3xl gap-6 text-sm text-[rgb(var(--muted))] sm:grid-cols-3">
          <div>
            <p className="text-[rgb(var(--fg))]">Bano premium</p>
            <p className="mt-1">Acabado perlado y resistencia diaria.</p>
          </div>
          <div>
            <p className="text-[rgb(var(--fg))]">Envio cuidado</p>
            <p className="mt-1">Empaque delicado y protegido.</p>
          </div>
          <div>
            <p className="text-[rgb(var(--fg))]">Edicion limitada</p>
            <p className="mt-1">Series pequenas y seleccionadas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

