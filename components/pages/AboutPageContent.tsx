'use client';

import { useTranslation } from '@/hooks/useTranslation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import Image from 'next/image';
import {
  InnovativeEfficiencyIcon,
  BuildingConnectionsIcon,
  ForwardVisionIcon,
} from '@/components/icons/CustomIcons';

export default function AboutPageContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section - Compact with static image background */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt={t('about.heroAlt')}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(217, 0, 0, 0.3), rgba(0, 0, 0, 0.8))' }}></div>
        </div>

        {/* Corner Brackets - White borders */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="opacity-30">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollReveal animation="fadeInUp">
            <div className="relative inline-block">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white opacity-50"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white opacity-50"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 px-6 py-3">
                {t('about.pageTitle')}
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeInUp" delay={200}>
            <p className="text-base md:text-lg lg:text-xl text-white text-opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('about.pageSubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            {/* Introduction */}
            <ScrollReveal animation="fadeInUp">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">
                  {t('about.intro.title')}
                </h2>
                <p className="text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed mb-4">
                  {t('about.intro.description')}
                </p>
                <p className="text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed">
                  {t('about.intro.services')}
                </p>
              </div>
            </ScrollReveal>

            {/* Belqees Channel */}
            <ScrollReveal animation="fadeInUp">
              <div className="relative bg-white dark:bg-gray-800 p-6 md:p-8 border border-gray-200 dark:border-gray-700 group">
                <CornerBrackets showOnHover={true} />
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">
                  {t('about.channel.title')}
                </h2>
                <p className="text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed">
                  {t('about.channel.description')}
                </p>
              </div>
            </ScrollReveal>

            {/* Our Values */}
            <ScrollReveal animation="fadeInUp">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-dark dark:text-gray-100 mb-2 md:mb-3">
                  {t('about.values.title')}
                </h2>
                <p className="text-base md:text-lg text-dark-light dark:text-gray-300 mb-6 md:mb-8">
                  {t('about.values.subtitle')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Innovative Efficiency */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <div className="mb-4 flex items-center justify-center">
                      <InnovativeEfficiencyIcon
                        className="w-16 h-16 md:w-20 md:h-20"
                        stroke="currentColor"
                        redDotColor="#FC473C"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3 text-center">
                      {t('about.values.innovativeEfficiency.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed text-center">
                      {t('about.values.innovativeEfficiency.description')}
                    </p>
                  </div>

                  {/* Building Connections */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <div className="mb-4 flex items-center justify-center">
                      <BuildingConnectionsIcon
                        className="w-16 h-16 md:w-20 md:h-20"
                        stroke="currentColor"
                        redDotColor="#FC473C"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3 text-center">
                      {t('about.values.buildingConnections.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed text-center">
                      {t('about.values.buildingConnections.description')}
                    </p>
                  </div>

                  {/* Forward Vision */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <div className="mb-4 flex items-center justify-center">
                      <ForwardVisionIcon
                        className="w-16 h-16 md:w-20 md:h-20"
                        stroke="currentColor"
                        redDotColor="#FC473C"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3 text-center">
                      {t('about.values.forwardVision.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed text-center">
                      {t('about.values.forwardVision.description')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Broadcast & Media Systems */}
            <ScrollReveal animation="fadeInUp">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">
                  {t('about.systems.title')}
                </h2>
                <p className="text-base md:text-lg text-dark-light dark:text-gray-300 leading-relaxed mb-6 md:mb-8">
                  {t('about.systems.description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Octopus Newsroom */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group overflow-hidden">
                    <CornerBrackets showOnHover={true} />
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src="/images/systems/octopus-newsroom.jpg"
                        alt={t('about.systems.octopus.title')}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.octopus.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.octopus.description')}
                    </p>
                  </div>

                  {/* Metus MAM */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group overflow-hidden">
                    <CornerBrackets showOnHover={true} />
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src="/images/systems/metus-mam.jpg"
                        alt={t('about.systems.metus.title')}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.metus.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.metus.description')}
                    </p>
                  </div>

                  {/* Brainstorm 3D */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group overflow-hidden">
                    <CornerBrackets showOnHover={true} />
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src="/images/systems/brainstorm-3d.jpg"
                        alt={t('about.systems.brainstorm.title')}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.brainstorm.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.brainstorm.description')}
                    </p>
                  </div>

                  {/* Adobe Creative Cloud */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group overflow-hidden">
                    <CornerBrackets showOnHover={true} />
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src="/images/systems/adobe-creative-cloud.jpg"
                        alt={t('about.systems.adobe.title')}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.adobe.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.adobe.description')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Placeholder */}
            <ScrollReveal animation="fadeInUp">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark dark:text-gray-100 mb-4 md:mb-6">
                  {t('about.gallery.title')}
                </h2>
                <p className="text-base md:text-lg text-dark-light dark:text-gray-300 mb-6 md:mb-8">
                  {t('about.gallery.subtitle')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { src: '/images/nobel-peace-prize.jpg', key: 'common.galleryImage1' },
                    { src: '/images/yemen-researchers-conference.jpg', key: 'common.galleryImage2' },
                    { src: '/images/approach.jpg', key: 'common.galleryImage3' },
                    { src: '/images/events-hero.jpg', key: 'common.galleryImage4' },
                    { src: '/images/services-hero.jpg', key: 'common.galleryImage5' },
                    { src: '/images/systems/octopus-newsroom.jpg', key: 'common.galleryImage6' },
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={img.src}
                        alt={t(img.key)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="text-white text-xs font-medium border border-white/40 px-3 py-1 scale-90 group-hover:scale-100 transition-transform duration-300">
                          {t('common.viewDetail') || 'عرض التفاصيل'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </>
  );
}
