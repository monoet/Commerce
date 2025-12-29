import { ImageResponse } from 'next/og';
import LogoIcon from './icons/logo';

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: process.env.SITE_NAME
    },
    ...props
  };

  return new ImageResponse(
    (
      <div tw="flex h-full w-full flex-col items-center justify-center bg-[#FBF7F2]">
        <div tw="flex flex-none items-center justify-center border border-[#9C6B2F] h-[160px] w-[160px] rounded-3xl">
          <LogoIcon width="64" height="58" fill="#9C6B2F" />
        </div>
        <p tw="mt-12 text-6xl font-bold text-[#1E1A16]">{title}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
