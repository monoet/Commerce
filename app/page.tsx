import { Carousel } from 'components/carousel';
import FeaturedItems from 'components/home/featured-items';
import { ThreeItemGrid } from 'components/grid/three-items';
import JewelryHero from 'components/hero/jewelry-hero';
import Footer from 'components/layout/footer';

export const metadata = {
  description:
    'Joyería minimal con piezas nacaradas y detalles cálidos para uso diario.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <JewelryHero />
      <FeaturedItems />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
