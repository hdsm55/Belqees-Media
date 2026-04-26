'use client';

import { useTranslation } from '@/hooks/useTranslation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import CornerBrackets from '@/components/atoms/CornerBrackets';
import Section from '@/components/atoms/Section';
import Image from 'next/image';
import {
  InnovativeEfficiencyIcon,
  BuildingConnectionsIcon,
  ForwardVisionIcon,
} from '@/components/icons/CustomIcons';
import { systems, galleryImages } from '@/data/about';

export default function AboutPageContent() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images-optimized/about-hero.jpg"
          alt={t('about.heroAlt')}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950/90 via-primary-900/20 to-dark-950/90" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollReveal animation="fadeInUp">
            <div className="inline-block relative px-8 py-4 mb-4">
              <CornerBrackets showOnHover={false} className="border-white" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
                {t('about.pageTitle')}
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/80 font-sans max-w-2xl mx-auto leading-relaxed">
              {t('about.pageSubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <Section id="intro" spacing="md" className="bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-900 dark:text-white">
              {t('about.intro.title')}
            </h2>
            <div className="space-y-6 text-lg text-dark-600 dark:text-dark-300 leading-relaxed font-sans">
              <p>{t('about.intro.description')}</p>
              <p>{t('about.intro.services')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Belqees Channel Section */}
      <Section id="channel" spacing="md" className="bg-dark-50 dark:bg-dark-950">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-dark-800 p-8 md:p-12 border border-dark-200 dark:border-dark-700 shadow-xl group">
            <CornerBrackets showOnHover={false} />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-900 dark:text-white mb-6">
              {t('about.channel.title')}
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 leading-relaxed font-sans">
              {t('about.channel.description')}
            </p>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section
        id="values"
        title={t('about.values.title')}
        subtitle={t('about.values.subtitle')}
        centered
        spacing="md"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: InnovativeEfficiencyIcon,
              title: t('about.values.innovativeEfficiency.title'),
              desc: t('about.values.innovativeEfficiency.description'),
            },
            {
              icon: BuildingConnectionsIcon,
              title: t('about.values.buildingConnections.title'),
              desc: t('about.values.buildingConnections.description'),
            },
            {
              icon: ForwardVisionIcon,
              title: t('about.values.forwardVision.title'),
              desc: t('about.values.forwardVision.description'),
            },
          ].map((value, idx) => (
            <div key={idx} className="relative bg-white dark:bg-dark-800 p-8 border border-dark-200 dark:border-dark-700 group hover:border-primary-500 transition-colors h-full flex flex-col items-center text-center">
              <CornerBrackets showOnHover={true} />
              <div className="mb-6 text-primary-500">
                <value.icon className="w-20 h-20" stroke="currentColor" redDotColor="var(--color-primary)" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-4">
                {value.title}
              </h3>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed font-sans">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Systems Section */}
      <Section
        id="systems"
        title={t('about.systems.title')}
        subtitle={t('about.systems.description')}
        spacing="md"
        className="bg-dark-50 dark:bg-dark-950"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systems(t).map((system) => (
            <div key={system.id} className="group relative bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 overflow-hidden shadow-lg hover:border-primary-500 transition-colors">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={system.image}
                  alt={system.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dark-950/20 group-hover:bg-dark-950/0 transition-colors duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-heading font-bold text-dark-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                  {system.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-300 leading-relaxed font-sans">
                  {system.description}
                </p>
              </div>
              <CornerBrackets showOnHover={true} />
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery Section */}
      <Section
        id="gallery"
        title={t('about.gallery.title') || 'معرض الصور'}
        subtitle={t('about.gallery.subtitle') || 'نظرة على بعض أعمالنا وفعالياتنا'}
        centered
        spacing="md"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="group relative aspect-video bg-dark-100 dark:bg-dark-800 overflow-hidden cursor-pointer shadow-lg">
              <Image
                src={img.src}
                alt={t(img.key)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="relative p-6">
                  <CornerBrackets showOnHover={false} className="border-white" />
                  <span className="text-white text-sm font-heading font-bold tracking-widest uppercase">
                    {t('common.viewDetail') || 'عرض التفاصيل'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
