export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

export interface SocialLinks {
  instagram: string;
  facebook?: string;
  pinterest?: string;
  tiktok?: string;
  linkedin?: string;
}

export interface Brand {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: Address;
  hours: BusinessHours[];
  social: SocialLinks;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface IntroSection {
  heading: string;
  text: string;
  image: string;
  cta_text: string;
  cta_link: string;
}

export interface FeaturedService {
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface WhyUsFeature {
  title: string;
  description: string;
  icon: string;
}

export interface WhyUsSection {
  heading: string;
  features: WhyUsFeature[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface CTABanner {
  headline: string;
  subheadline: string;
  cta_text: string;
  cta_link: string;
}

export interface HomeContent {
  hero: HeroSection;
  stats: Stat[];
  intro: IntroSection;
  featured_services: FeaturedService[];
  why_us: WhyUsSection;
  testimonials: Testimonial[];
  cta_banner: CTABanner;
}

export interface Service {
  name: string;
  duration: string;
  price: number;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

export interface ConsultationCTA {
  heading: string;
  text: string;
  cta_text: string;
  cta_link: string;
}

export interface ServicesContent {
  page_heading: string;
  page_subheading: string;
  categories: ServiceCategory[];
  consultation_cta: ConsultationCTA;
}

export interface GalleryImage {
  id: number;
  src: string;
  category: string;
  alt: string;
}

export interface GalleryContent {
  categories: string[];
  images: GalleryImage[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
  social: SocialLinks;
}

export interface TeamContent {
  page_heading: string;
  intro: string;
  members: TeamMember[];
}

export interface BookingStep {
  number: number;
  title: string;
}

export interface BookingService {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export interface BookingStylist {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface BookingConfirmation {
  heading: string;
  message: string;
  cta_text: string;
  cta_link: string;
}

export interface BookingContent {
  page_heading: string;
  page_subheading: string;
  steps: BookingStep[];
  services_list: BookingService[];
  stylists: BookingStylist[];
  time_slots: string[];
  confirmation: BookingConfirmation;
}

export interface StorySection {
  heading: string;
  subheading: string;
  text: string;
  image: string;
}

export interface MissionSection {
  heading: string;
  text: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

export interface SustainabilitySection {
  heading: string;
  text: string;
  certifications: string[];
  image: string;
}

export interface Award {
  title: string;
  source: string;
  year: string;
}

export interface AboutContent {
  story: StorySection;
  mission: MissionSection;
  timeline: TimelineEvent[];
  values: Value[];
  sustainability: SustainabilitySection;
  awards: Award[];
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export interface ContactContent {
  page_heading: string;
  page_subheading: string;
  form_fields: FormField[];
  map_embed_url: string;
  form_success_message: string;
}

export interface SiteContent {
  brand: Brand;
  navigation: NavItem[];
  home: HomeContent;
  services: ServicesContent;
  gallery: GalleryContent;
  team: TeamContent;
  booking: BookingContent;
  about: AboutContent;
  contact: ContactContent;
}
