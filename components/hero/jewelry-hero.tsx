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
    intensity: 0.95,
    rotationSpeed: 0.14,
    glowAmount: 0.006,
    pillarWidth: 2.45,
    pillarHeight: 0.6,
    noiseIntensity: 0.16,
    shimmer: 0.3,
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
    <section
      className="relative isolate overflow-hidden px-6 py-20 sm:px-10 lg:px-16"
      style={{
        background:
          'radial-gradient(circle at 50% 30%, #FAF5EE 0%, #F3E8DA 45%, #E9DDCE 100%)'
      }}
    >
      <LightPillar
        className={preset.className}
        topColor={preset.topColor}
        bottomColor={preset.bottomColor}
        accentColor={preset.accentColor}
        intensity={preset.intensity}
        rotationSpeed={preset.rotationSpeed}
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
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 text-neutral-800">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
            Atelier de perlas
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Joyeria minimal con brillo nacarado.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Piezas esenciales, luz suave y un acabado calido que se siente
            editorial. Disenado para acompanarte todos los dias.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/search"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium tracking-wide text-neutral-50 transition hover:bg-neutral-800"
          >
            Ver colección
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-neutral-300 bg-white/80 px-6 py-3 text-sm font-medium tracking-wide text-neutral-700 backdrop-blur transition hover:border-neutral-400 hover:text-neutral-900"
          >
            Comprar ahora
          </Link>
        </div>
        <div className="grid max-w-3xl gap-6 text-sm text-neutral-600 sm:grid-cols-3">
          <div>
            <p className="text-neutral-900">Bano premium</p>
            <p className="mt-1">Acabado perlado y resistencia diaria.</p>
          </div>
          <div>
            <p className="text-neutral-900">Envio cuidado</p>
            <p className="mt-1">Empaque delicado y protegido.</p>
          </div>
          <div>
            <p className="text-neutral-900">Edicion limitada</p>
            <p className="mt-1">Series pequenas y seleccionadas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
