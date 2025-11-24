interface StatItem {
  number: string;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

interface StatsSectionProps {
  stats: StatItem[];
}

import CornerBrackets from '@/components/atoms/CornerBrackets';

export default function StatsSection({ stats }: StatsSectionProps) {
  // Default icons for stats - Natural and clear icons with red circles
  const defaultIcons = [
    // Years of experience - Calendar icon
    <svg key="0" className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" fill="#D90000" />
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>,
    // Projects - Briefcase icon
    <svg key="1" className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" fill="#D90000" />
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>,
    // Clients - Users icon
    <svg key="2" className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" fill="#D90000" />
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>,
    // Events - Calendar with check icon
    <svg key="3" className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="2.5" fill="#D90000" />
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 16l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>,
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 p-6 md:p-8 border border-gray-200 dark:border-gray-700 group cursor-default transition-all duration-300 hover:border-dark dark:hover:border-gray-500 hover:shadow-lg"
            >
              {/* Corner Brackets */}
              <CornerBrackets showOnHover={true} />

              {/* Icon with red circle */}
              <div className="flex items-center justify-center mb-6 relative text-dark dark:text-gray-100">
                {stat.icon || defaultIcons[index % defaultIcons.length]}
              </div>

              {/* Number */}
              <div className="text-center mb-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark dark:text-gray-100">
                  {stat.number}
                  {stat.suffix && <span className="text-2xl md:text-3xl">{stat.suffix}</span>}
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-sm md:text-base font-bold text-dark dark:text-gray-100 uppercase tracking-wide">
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

