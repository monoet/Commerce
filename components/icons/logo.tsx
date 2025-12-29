import clsx from 'clsx';

export default function LogoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 64 64"
      {...props}
      className={clsx('h-4 w-4 text-current', props.className)}
    >
      <g stroke="currentColor" strokeWidth="2" opacity="0.95">
        <circle cx="26" cy="32" r="14" />
        <circle cx="38" cy="32" r="14" />
      </g>
      <circle cx="32" cy="32" r="2.6" fill="currentColor" />
    </svg>
  );
}
