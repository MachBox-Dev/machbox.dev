import type { Metadata } from 'next'

import { SiteFooter } from '@/components/SiteFooter'
import { ArmoryFeatures } from '@/components/armory/ArmoryFeatures'
import { ArmoryHeader } from '@/components/armory/ArmoryHeader'
import { ArmoryHero } from '@/components/armory/ArmoryHero'
import { ArmoryInstall } from '@/components/armory/ArmoryInstall'
import { BRAND, PRODUCTS, SITE } from '@/lib/site'
import { getArmoryRelease } from '@/lib/armory-release'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Mach Armory',
  description: PRODUCTS.armory.description,
  openGraph: {
    title: `Mach Armory · ${SITE.name}`,
    description: PRODUCTS.armory.description,
    url: PRODUCTS.armory.href,
    images: [
      {
        url: BRAND.ogImage,
        width: BRAND.ogImageWidth,
        height: BRAND.ogImageHeight,
        alt: BRAND.ogImageAlt,
      },
    ],
  },
}

export default async function ArmorySitePage() {
  const release = await getArmoryRelease()

  return (
    <>
      <ArmoryHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-6 pb-20 pt-4 md:px-10 md:pt-8">
        <ArmoryHero release={release} />
        <ArmoryFeatures />
        <ArmoryInstall release={release} />
      </main>

      <SiteFooter />
    </>
  )
}
