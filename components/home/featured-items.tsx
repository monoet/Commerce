import Image from 'next/image';

const FALLBACK_IMAGE = '/images/placeholder.jpg';

const ITEMS = [
  {
    title: 'Collar Aurora',
    price: '$48',
    tag: 'Nuevo',
    images: [
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    title: 'Argollas Lino',
    price: '$36',
    tag: 'Brilla',
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2697616/pexels-photo-2697616.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    title: 'Anillo Marfil',
    price: '$28',
    images: [
      'https://images.pexels.com/photos/2697616/pexels-photo-2697616.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1721944/pexels-photo-1721944.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    title: 'Pulsera Bruma',
    price: '$42',
    tag: 'Nuevo',
    images: [
      'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2950298/pexels-photo-2950298.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    title: 'Ear Cuff Perla',
    price: '$24',
    images: [
      'https://images.pexels.com/photos/1721944/pexels-photo-1721944.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  },
  {
    title: 'Set Champagne',
    price: '$64',
    images: [
      'https://images.pexels.com/photos/2950298/pexels-photo-2950298.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=900'
    ]
  }
];

export default function FeaturedItems() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[rgb(var(--fg))]">
            Favoritos del atelier
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[rgb(var(--fg))] sm:text-4xl">
            Piezas nuevas con brillo suave
          </h2>
        </div>
        <span className="text-sm text-[rgb(var(--fg))]">Edicion limitada</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => {
          const primaryImage = item.images?.[0] ?? FALLBACK_IMAGE;
          const secondaryImage = item.images?.[1] ?? FALLBACK_IMAGE;

          return (
          <div
            key={item.title}
            className="group flex h-[360px] w-full flex-col overflow-hidden rounded-2xl bg-[rgb(var(--bg))] shadow-md"
          >
            <div className="relative h-[200px] w-full overflow-hidden bg-[rgb(var(--bg))]">
              <Image
                src={primaryImage}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:opacity-0"
              />
              <Image
                src={secondaryImage}
                alt={`${item.title} detalle`}
                fill
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              />
              {item.tag ? (
                <span className="absolute left-4 top-4 rounded-full bg-[rgb(var(--bg))]/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[rgb(var(--fg))]">
                  {item.tag}
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-2 p-4">
              <div>
                <p className="text-base font-semibold text-[rgb(var(--fg))]">
                  {item.title}
                </p>
                <p className="text-sm text-[rgb(var(--muted))]">Acabado perlado</p>
              </div>
              <span className="text-sm font-semibold text-[rgb(var(--fg))]">
                {item.price}
              </span>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
}
