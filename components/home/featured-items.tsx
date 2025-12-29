import Image from 'next/image';

const ITEMS = [
  {
    title: 'Collar Aurora',
    price: '$48',
    image:
      'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Argollas Lino',
    price: '$36',
    image:
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Anillo Marfil',
    price: '$28',
    image:
      'https://images.pexels.com/photos/2697616/pexels-photo-2697616.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Pulsera Bruma',
    price: '$42',
    image:
      'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Ear Cuff Perla',
    price: '$24',
    image:
      'https://images.pexels.com/photos/1721944/pexels-photo-1721944.jpeg?auto=compress&cs=tinysrgb&w=900'
  },
  {
    title: 'Set Champagne',
    price: '$64',
    image:
      'https://images.pexels.com/photos/2950298/pexels-photo-2950298.jpeg?auto=compress&cs=tinysrgb&w=900'
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
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-2xl border border-[#E6DDD2] bg-[#F6EFE6]/70"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FBF7F2]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-[#8A6A3D]">{item.title}</p>
                <p className="mt-1 text-xs text-[#6F655C]">Acabado perlado</p>
              </div>
              <span className="text-sm font-semibold text-[#8A6A3D]">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
