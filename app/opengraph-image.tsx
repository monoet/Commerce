import OpengraphImage from 'components/opengraph-image';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Image() {
  return await OpengraphImage();
}
