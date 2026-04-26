import { 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  WhatsappIcon 
} from '../components/icons/SocialIcons';

export const contactInfo = (t: any) => ({
  address: {
    label: t('contact.address'),
    value: t('contact.addressValue'),
    link: 'https://www.google.com/maps/search/?api=1&query=TAHTAKALE+MAH.+ISPARTAKULE+BLV.+T2+BLOK+NO:2M+AVCILAR+ISTANBUL',
  },
  phones: [
    { label: t('contact.phone1'), value: '+902124122060' },
    { label: t('contact.phone2'), value: '+908508113366' },
  ],
  mobile: { label: t('contact.mobile1'), value: '+905393346032' },
  email: { label: t('contact.emailValue'), value: 'Contact@belqeesmedia.com' },
});

export const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/belqeesmedia',
    icon: FacebookIcon,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/belqeesmedia',
    icon: InstagramIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/belqeesmedia',
    icon: LinkedinIcon,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/908508113366',
    icon: WhatsappIcon,
  },
];
