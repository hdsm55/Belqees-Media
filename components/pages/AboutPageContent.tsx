'use client';

import { useTranslation } from '@/hooks/useTranslation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import {
  InnovativeEfficiencyIcon,
  BuildingConnectionsIcon,
  ForwardVisionIcon,
} from '@/components/icons/CustomIcons';

export default function AboutPageContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-center text-dark dark:text-gray-100 mb-6">
            {t('about.pageTitle')}
          </h1>
          <p className="text-lg md:text-xl text-center text-dark-light dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.pageSubtitle')}
          </p>
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
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.octopus.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.octopus.description')}
                    </p>
                  </div>

                  {/* Metus MAM */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.metus.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.metus.description')}
                    </p>
                  </div>

                  {/* Brainstorm 3D */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-dark dark:text-gray-100 mb-3">
                      {t('about.systems.brainstorm.title')}
                    </h3>
                    <p className="text-sm md:text-base text-dark-light dark:text-gray-300 leading-relaxed">
                      {t('about.systems.brainstorm.description')}
                    </p>
                  </div>

                  {/* Adobe Creative Cloud */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 group">
                    <CornerBrackets showOnHover={true} />
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
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-gray-400 dark:text-gray-500 text-sm">
                        {t('about.gallery.title')} {i}
                      </span>
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

