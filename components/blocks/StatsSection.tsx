interface StatItem {
  number: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-default"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 text-dark dark:text-gray-100 transition-all duration-500 group-hover:scale-110 group-hover:text-primary-500 dark:group-hover:text-primary-400">
                {stat.number}
                {stat.suffix && <span className="text-xl sm:text-2xl md:text-3xl">{stat.suffix}</span>}
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg text-dark-light dark:text-gray-400 font-medium group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

