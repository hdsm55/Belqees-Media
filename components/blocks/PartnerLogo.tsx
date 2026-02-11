import Image from 'next/image';

interface PartnerLogoProps {
  name: string;
  logo: string;
  url?: string;
}

export default function PartnerLogo({ name, logo, url }: PartnerLogoProps) {
  const content = (
    <div className="flex items-center justify-center h-24 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Image
        src={logo}
        alt={name}
        width={120}
        height={48}
        className="object-contain max-h-16 w-auto opacity-70 hover:opacity-100 transition-opacity"
        sizes="120px"
        loading="lazy"
        quality={80}
      />
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
