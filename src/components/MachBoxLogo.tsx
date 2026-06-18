import Image from 'next/image'

import { BRAND } from '@/lib/site'

const SIZES = {
  sm: { className: 'h-9 w-9', px: 36 },
  md: { className: 'h-12 w-12', px: 48 },
  lg: { className: 'h-20 w-20 md:h-24 md:w-24', px: 96 },
} as const

type MachBoxLogoProps = {
  size?: keyof typeof SIZES
  className?: string
  priority?: boolean
}

export function MachBoxLogo({ size = 'sm', className = '', priority = false }: MachBoxLogoProps) {
  const { className: sizeClass, px } = SIZES[size]

  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-lg border border-mach-border bg-mach-panel-soft ${sizeClass} ${className}`}
    >
      <Image
        src={BRAND.logo}
        alt=""
        fill
        className="object-contain p-0.5"
        sizes={`${px}px`}
        priority={priority}
      />
    </span>
  )
}
