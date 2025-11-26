'use client';

import CornerBrackets from '@/components/atoms/CornerBrackets';
import { Calendar, Briefcase, Users, CalendarCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface StatItem {
  number: string;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const { t } = useTranslation();
  // Default icons for stats using lucide-react - Reduced size for better balance
  const defaultIcons = [
    // Years of experience - Calendar icon
    <Calendar key="0" className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    // Projects - Briefcase icon
    <Briefcase key="1" className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    // Clients - Users icon
    <Users key="2" className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    // Events - Calendar with check icon
    <CalendarCheck key="3" className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 transition-colors" aria-label={t('common.companyStats')}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" role="list">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 p-6 md:p-8 border border-gray-200 dark:border-gray-700 group cursor-default transition-all duration-300 hover:border-dark dark:hover:border-gray-500 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 rounded"
              role="listitem"
              tabIndex={0}
              aria-label={`${stat.number}${stat.suffix || ''} ${stat.label}`}
            >
              {/* Corner Brackets */}
              <CornerBrackets showOnHover={true} />

              {/* Red Circle in Top Right Corner */}
              <div
                className="absolute top-3 right-3 w-3 h-3 bg-primary-500 rounded-full recording-dot-pulse"
                style={{
                  boxShadow: 'none'
                }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div className="flex items-center justify-center mb-4 md:mb-5 relative text-dark dark:text-gray-100" aria-hidden="true">
                {stat.icon || defaultIcons[index % defaultIcons.length]}
              </div>

              {/* Number */}
              <div className="text-center mb-2">
                <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-dark dark:text-gray-100 tracking-tight">
                  <span aria-label={stat.number}>{stat.number}</span>
                  {stat.suffix && <span className="text-xl md:text-2xl" aria-label={stat.suffix}>{stat.suffix}</span>}
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-xs md:text-sm font-semibold text-dark dark:text-gray-100 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

