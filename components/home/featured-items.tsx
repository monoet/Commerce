import Image from 'next/image';

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
    <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-8 sm:px-10 lg:px-16">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#8A6A3D]">
            Favoritos del atelier
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#8A6A3D] sm:text-4xl">
            Piezas nuevas con brillo suave
          </h2>
        </div>
        <span className="text-sm text-[#8A6A3D]">Edicion limitada</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => {
          const primaryImage = item.images?.[0];
          const secondaryImage = item.images?.[1];

          return (
          <div
            key={item.title}
            className="group overflow-hidden rounded-2xl border border-[#E6DDD2] bg-white/40"
          >
            <div className="relative w-full overflow-hidden bg-[#FBF7F2] aspect-square sm:aspect-[3/4]">
              {primaryImage ? (
                <Image
                  src={primaryImage}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03] group-hover:opacity-0"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-xs text-[#6F655C]">
                  Sin imagen
                </div>
              )}
              {secondaryImage ? (
                <Image
                  src={secondaryImage}
                  alt={`${item.title} detalle`}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                />
              ) : null}
              {item.tag ? (
                <span className="absolute left-4 top-4 rounded-full bg-[#F4EDE4]/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8A6A3D]">
                  {item.tag}
                </span>
              ) : null}
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-[#2C2621] group-hover:underline">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[#6F655C]">Acabado perlado</p>
              </div>
              <span className="text-sm font-semibold text-[#8A6A3D]">
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
