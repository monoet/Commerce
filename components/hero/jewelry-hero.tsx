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
    intensity: 1.08,
    rotationSpeed: 0.14,
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
    <section className="relative isolate overflow-hidden bg-[#FAF5EE]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_55%_30%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.00)_60%),radial-gradient(60%_70%_at_18%_40%,rgba(30,26,22,0.08)_0%,rgba(30,26,22,0.00)_62%)]" />
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
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-24 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#8A6A3D]">
            Atelier de perlas
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-white drop-shadow-[0_2px_20px_rgba(30,26,22,0.28)] sm:text-6xl">
            Joyeria minimal con
            <br />
            brillo nacarado.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#8A6A3D]">
            Piezas esenciales, luz suave y un acabado calido que se siente
            editorial. Disenado para acompanarte todos los dias.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/search"
              className="rounded-full border border-[#D8CBBE] bg-[#E9DDCE] px-6 py-3 text-sm font-medium text-[#6F655C] transition hover:bg-[#F4EDE4]"
            >
              Ver coleccion
            </Link>
            <Link
              href="/search"
              className="rounded-full border border-[#D8CBBE] bg-white/35 px-6 py-3 text-sm font-medium text-[#8A6A3D] transition hover:bg-white/55"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
        <div className="grid max-w-3xl gap-6 text-sm text-[#6F655C] sm:grid-cols-3">
          <div>
            <p className="text-[#8A6A3D]">Bano premium</p>
            <p className="mt-1">Acabado perlado y resistencia diaria.</p>
          </div>
          <div>
            <p className="text-[#8A6A3D]">Envio cuidado</p>
            <p className="mt-1">Empaque delicado y protegido.</p>
          </div>
          <div>
            <p className="text-[#8A6A3D]">Edicion limitada</p>
            <p className="mt-1">Series pequenas y seleccionadas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

