import React from 'react';

interface IconProps {
  className?: string;
  stroke?: string;
  fill?: string;
  redDotColor?: string;
}

// 1. أيقونة الإعلان (Advertising)
export const AdvertisingIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'none',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="68"
      height="45"
      viewBox="0 0 68 45"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M31.3845 32.58V32.58C30.6641 35.2687 32.2597 38.0323 34.9483 38.7527V38.7527C37.637 39.4732 40.4006 37.8776 41.1211 35.1889V35.1889"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M67 1.50002V43.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="22.5" r="6" fill={redDotColor} />
      <path
        d="M18 17.5L18 27.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M66.2197 7.38002L19.1598 19.9897"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M66.2197 37.6297L19.1598 25.02"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// 2. أيقونة المحتوى المؤسسي (Corporate Content)
export const CorporateContentIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'currentColor',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="59"
      height="49"
      viewBox="0 0 59 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2.95376L57 2.95377V36.7959L51.2262 36.7959H48.5C47.9477 36.7959 47.5 37.2436 47.5 37.7959C47.5 38.3482 47.9477 38.7959 48.5 38.7959H51.2262H57C58.1046 38.7959 59 37.9004 59 36.7959V2.95377C59 1.8492 58.1046 0.953766 57 0.953766H2C0.895431 0.953766 0 1.84919 0 2.95376V38.7959V46.0427C0 47.6742 1.84816 48.6192 3.17083 47.6642L14.9282 39.1744C15.269 38.9283 15.6786 38.7959 16.099 38.7959H43.5C44.0523 38.7959 44.5 38.3482 44.5 37.7959C44.5 37.2436 44.0523 36.7959 43.5 36.7959H16.099C15.2583 36.7959 14.4389 37.0608 13.7573 37.5529L2 46.0427V38.7959V2.95376Z"
        fill={fill}
      />
      <ellipse cx="15" cy="19.9538" rx="6" ry="6" fill={redDotColor} />
      <ellipse cx="30" cy="19.9538" rx="6" ry="6" fill={redDotColor} />
      <ellipse cx="45" cy="19.9538" rx="6" ry="6" fill={redDotColor} />
    </svg>
  );
};

// 3. أيقونة الوثائقيات (Documentaries)
export const DocumentariesIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'none',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="59"
      height="47"
      viewBox="0 0 59 47"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="1"
        y="18"
        width="40"
        height="28"
        rx="1"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M58 21.5061L41 28.664V35.336L58 42.4939L58 21.5061Z"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="1"
        y="-1"
        width="18"
        height="7"
        rx="3.5"
        transform="matrix(1 0 0 -1 39 7.00002)"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M17.0801 14.04V14.04C17.0801 11.2565 14.8236 9.00002 12.0401 9.00002V9.00002C9.25656 9.00002 7.00008 11.2565 7.00008 14.04V14.04"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36.04 4.00002L34 4.00002C32.3432 4.00002 31 5.34316 31 7.00001L31 9.04002L31 14.08"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="21" cy="32" rx="6" ry="6" fill={redDotColor} />
    </svg>
  );
};

// 4. أيقونة الإنتاج المصغر (Microproductions)
export const MicroproductionsIcon: React.FC<IconProps> = ({
  className = '',
  stroke = '#131414',
  fill = 'none',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="63"
      height="63"
      viewBox="0 0 63 63"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="31.5476" cy="31.5" rx="6" ry="6" fill={redDotColor} />
      <path
        d="M20.6523 11.0733V19.7524C20.6523 20.3047 20.2046 20.7524 19.6523 20.7524H10.9733"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.78865 4.89546C5.39813 4.50494 4.76496 4.50494 4.37444 4.89546C3.98391 5.28599 3.98391 5.91915 4.37444 6.30968L5.78865 4.89546ZM4.37444 6.30968L19.5243 21.4595L20.9385 20.0453L5.78865 4.89546L4.37444 6.30968Z"
        fill={stroke}
      />
      <path
        d="M42.3477 51.9701V43.291C42.3477 42.7387 42.7954 42.291 43.3477 42.291H52.0267"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M57.2114 58.1479C57.6019 58.5384 58.235 58.5384 58.6256 58.1479C59.0161 57.7574 59.0161 57.1242 58.6256 56.7337L57.2114 58.1479ZM58.6256 56.7337L43.4757 41.5839L42.0615 42.9981L57.2114 58.1479L58.6256 56.7337Z"
        fill={stroke}
      />
      <path
        d="M11.1309 42.4044L19.8099 42.4044C20.3622 42.4044 20.8099 42.8521 20.8099 43.4044L20.8099 52.0834"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.95281 57.2679C4.56228 57.6584 4.56228 58.2916 4.95281 58.6821C5.34333 59.0726 5.97649 59.0726 6.36702 58.6821L4.95281 57.2679ZM6.36702 58.6821L21.5168 43.5322L20.1026 42.118L4.95281 57.2679L6.36702 58.6821Z"
        fill={stroke}
      />
      <path
        d="M51.9839 20.5956L43.3048 20.5956C42.7525 20.5956 42.3048 20.1479 42.3048 19.5956L42.3048 10.9166"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M58.1619 5.73215C58.5525 5.34162 58.5525 4.70846 58.1619 4.31793C57.7714 3.92741 57.1383 3.92741 56.7477 4.31793L58.1619 5.73215ZM56.7477 4.31793L41.5979 19.4678L43.0121 20.882L58.1619 5.73215Z"
        fill={stroke}
      />
    </svg>
  );
};

// 5. أيقونة الهاتف (Phone)
export const PhoneIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'currentColor',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 484.4 484.4"
      fill={fill}
      className={className}
    >
      <path d="M467.844,350.3c-20.3-20.5-40.6-40.7-60.3-60.2c-10.7-10.6-23.2-16.2-36.3-16.2c-13.1,0-25.6,5.6-36.2,16.1l-2.7,2.7c-10.7,10.6-21.8,21.6-32.5,32.6c-2.2-1.1-4.4-2.2-6.5-3.3c-4.9-2.4-9.6-4.7-13.7-7.3c-32.2-20.2-61.8-47.1-90.4-82.4c-13.9-17.1-23.6-32.3-30.4-47.7c9.5-9.2,18.8-18.6,27.9-27.8c2.3-2.3,4.7-4.7,7-7c22.3-22.4,22.2-51.4-0.1-73.9c-6.8-6.9-13.8-13.8-20.5-20.5c-3-3-6-6-9-9c-3.2-3.2-6.3-6.3-9.5-9.5c-6.8-6.9-13.9-14-21-20.9c-10.7-10.5-23.3-16-36.3-16s-25.6,5.5-36.2,16c-5.1,5.1-10.3,10.2-15.2,15.2c-7.2,7.3-14.7,14.8-22.2,22c-14,13.3-21.8,30.1-23.3,50c-2.3,31.3,6.4,59.6,14.2,80.8c17.8,47.9,45,93.3,83.2,138.8c47.6,56.6,104.9,101.4,170.3,133.3c36,17.5,66.9,26.4,97,28.1c2.2,0.1,4.4,0.2,6.5,0.2c25.4,0,46.3-9,62.1-26.6c6.8-7.6,14.1-14.7,21.8-22.2c3.9-3.8,7.9-7.7,11.9-11.7C489.844,401.4,489.944,372.6,467.844,350.3z" />
    </svg>
  );
};

// 6. أيقونة الكفاءة المبتكرة (Innovative Efficiency) - مصباح كهربائي
export const InnovativeEfficiencyIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'none',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="66"
      height="63"
      viewBox="0 0 66 63"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="33.5" cy="33.5002" rx="6" ry="6" fill={redDotColor} className="dot-inner" />
      <path d="M28.5 49.5002H38.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M26.5 55.5002H40.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M28.5 61.5002H38.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M56.5 33.5002H64.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M1.5 33.5002H9.5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M33.5 1.50024L33.5 9.50024" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M55.1567 10.5002L49.4999 16.1571" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M17.1567 16.1571L11.4999 10.5003" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.5 48.5C42.5 48.1424 42.6856 47.8119 42.9823 47.6121C47.517 44.5591 50.5 39.378 50.5 33.5002C50.5 24.1114 42.8888 16.5002 33.5 16.5002C24.1112 16.5002 16.5 24.1114 16.5 33.5002C16.5 39.378 19.483 44.5591 24.0177 47.6121C24.3144 47.8119 24.5 48.1424 24.5 48.5C24.5 49.2852 23.6644 49.7785 23.0101 49.3445C17.8813 45.9421 14.5 40.116 14.5 33.5002C14.5 23.0068 23.0066 14.5002 33.5 14.5002C43.9934 14.5002 52.5 23.0068 52.5 33.5002C52.5 40.116 49.1187 45.9421 43.9899 49.3445C43.3356 49.7785 42.5 49.2852 42.5 48.5Z"
        fill={stroke}
      />
    </svg>
  );
};

// 7. أيقونة بناء العلاقات (Building Connections) - شبكة
export const BuildingConnectionsIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'none',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="62"
      height="55"
      viewBox="0 0 62 55"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse className="dot-inner" cx="55.75" cy="11.5002" rx="6" ry="6" fill={redDotColor} />
      <ellipse className="dot-inner" cx="6.25" cy="43.5002" rx="6" ry="6" fill={redDotColor} />
      <path
        d="M31.25 16.5002L31.25 14.0002C31.25 7.09668 25.584 1.50024 18.6804 1.50024V1.50024C11.8533 1.50024 6.25 7.03472 6.25 13.8618V13.8618"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M30.75 38.5002L30.75 41.0002C30.75 47.9038 36.416 53.5002 43.3196 53.5002V53.5002C50.1467 53.5002 55.75 47.9658 55.75 41.1386V41.1386"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M6.25 32L6.25 20" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M55.916 34L55.916 22" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="31.25" cy="27.5" rx="6" ry="6" fill={redDotColor} className="dot-inner" />
    </svg>
  );
};

// 8. أيقونة الرؤية المستقبلية (Forward Vision) - أسهم
export const ForwardVisionIcon: React.FC<IconProps> = ({
  className = '',
  stroke = 'currentColor',
  fill = 'none',
  redDotColor = '#FC473C',
}) => {
  return (
    <svg
      width="80"
      height="61"
      viewBox="0 0 80 61"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.0869 1.50024H2.59147C1.8278 1.50024 1.34595 2.32166 1.71862 2.98823L16.8271 30.0123C16.9967 30.3155 16.9967 30.685 16.8271 30.9882L1.71862 58.0123C1.34595 58.6788 1.82779 59.5002 2.59147 59.5002H14.0869C14.4491 59.5002 14.783 59.3044 14.9597 58.9882L30.6139 30.9882C30.7834 30.685 30.7834 30.3155 30.6139 30.0123L14.9597 2.01225C14.783 1.6961 14.4491 1.50024 14.0869 1.50024Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.0869 1.50024H29.5915C28.8278 1.50024 28.346 2.32166 28.7186 2.98823L43.8271 30.0123C43.9967 30.3155 43.9967 30.685 43.8271 30.9882L28.7186 58.0123C28.346 58.6788 28.8278 59.5002 29.5915 59.5002H41.0869C41.4491 59.5002 41.783 59.3044 41.9597 58.9882L57.6139 30.9882C57.7834 30.685 57.7834 30.3155 57.6139 30.0123L41.9597 2.01225C41.783 1.6961 41.4491 1.50024 41.0869 1.50024Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="73.1143" cy="30.5002" rx="7" ry="7" fill={redDotColor} className="dot-inner" />
    </svg>
  );
};

