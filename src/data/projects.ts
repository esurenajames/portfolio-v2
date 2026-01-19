
import fileGridHome from '@/assets/projects/filegrid/Home.webp';
import fileGridGif from '@/assets/projects/filegrid/GIF.gif';
import fileGridFeatures from '@/assets/projects/filegrid/Features.webp';
import fileGridAbout from '@/assets/projects/filegrid/About.webp';
import fileGridBlog from '@/assets/projects/filegrid/Blog.webp';
import fileGridBlog1 from '@/assets/projects/filegrid/Blog 1.webp';
import fileGridHowItWorks from '@/assets/projects/filegrid/How it works.webp';
import fileGridSession from '@/assets/projects/filegrid/Session.webp';
import fileGridIcon from '@/assets/projects/filegrid/icon.svg';
import seaSaltHome from '@/assets/projects/seasalt/Home.webp';
import seaSaltGif from '@/assets/projects/seasalt/GIF.gif';
import seaSaltLogo from '@/assets/projects/seasalt/logo.png';
import seaSaltAbout from '@/assets/projects/seasalt/About.webp';
import seaSaltDine from '@/assets/projects/seasalt/Dine.webp';
import seaSaltGallery from '@/assets/projects/seasalt/Gallery.webp';
import seaSaltLocations from '@/assets/projects/seasalt/Locations.webp';
import seaSaltMenu from '@/assets/projects/seasalt/Menu.webp';
import seaSaltTestimony from '@/assets/projects/seasalt/Testimony.webp';

import monoHero from '@/assets/projects/mono/Hero.webp';
import monoShop from '@/assets/projects/mono/Shop.webp';
import monoProduct from '@/assets/projects/mono/Product.webp';
import monoCheckout from '@/assets/projects/mono/Checkout.webp';
import monoReceipt from '@/assets/projects/mono/Receipt.webp';
import monoAbout from '@/assets/projects/mono/About.webp';
import monoHeadphones from '@/assets/projects/mono/Headphones.webp';
import monoGif from '@/assets/projects/mono/GIF.gif';
import favicon from '@/assets/projects/mono/favicon.ico';

export interface Project {
  id: number;
  title: string;
  name?: string;
  year: string;
  category?: string;
  image: string;
  gif?: string;
  logo?: string | null;
  techStack: string[];
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
  disabled?: boolean;
}

export const projects: Project[] = [
  {
    id: 8,
    title: 'MONO',
    name: 'MONO Audio Experience',
    category: 'E-commerce',
    year: '2026',
    description: 'A high-performance, aesthetically driven e-commerce platform designed for premium audio equipment. Features an immersive 3D hero section, dynamic product navigation, and a smart checkout experience.',
    image: monoHero,
    gif: monoGif,
    logo: favicon,
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Zod'],
    gallery: [
      monoShop,
      monoProduct,
      monoCheckout,
      monoReceipt,
      monoAbout,
      monoHeadphones,
    ],
    liveUrl: 'https://mono-audiophile.vercel.app/',
    githubUrl: 'https://github.com/esurenajames/mono'
  },
  {
    id: 7,
    title: 'FILEGRID',
    name: 'File Grid Platform',
    category: 'Web Application',
    year: '2025',
    description: 'A robust real-time file management system built with Laravel and Vue.js. Features live updates using WebSockets, a modern interface with Shadcn UI, and secure data handling with MySQL.',
    image: fileGridHome,
    gif: fileGridGif,
    logo: fileGridIcon,
    techStack: ['Vue 3', 'Shadcn Vue', 'Tailwind CSS', 'Socket.io', 'Laravel', 'MySQL'],
    gallery: [
      fileGridFeatures,
      fileGridAbout,
      fileGridBlog,
      fileGridBlog1,
      fileGridHowItWorks,
      fileGridSession,
    ],
    liveUrl: 'https://filegrid.vercel.app/',
    githubUrl: 'https://github.com/esurenajames/file-grid'
  },
  {
    id: 1,
    title: 'SEASALT BUCKET',
    name: 'Seasalt Bucket',
    category: 'Restaurant Website',
    year: '2024',
    description: 'A modern landing page for Seasalt Bucket, featuring a dynamic menu, location finder, and gallery. Built with Vue 3 and Tailwind CSS for a responsive and appetizing user experience.',
    image: seaSaltHome,
    gif: seaSaltGif,
    logo: seaSaltLogo,
    techStack: ['Vue 3', 'Javascript', 'Tailwind CSS'],
    gallery: [
      seaSaltMenu,
      seaSaltDine,
      seaSaltLocations,
      seaSaltGallery,
      seaSaltAbout,
      seaSaltTestimony,
      seaSaltHome
    ],
    liveUrl: 'https://seasalt-bucket.vercel.app/',
    githubUrl: 'https://github.com/esurenajames/seasalt-bucket'
  },
  {
    id: 9,
    title: 'BOARDLY',
    name: 'Boardly - AI Kanban Board',
    category: 'Productivity Tool',
    year: '2026',
    description: 'An intelligent Kanban board powered by AI. Features smart task management, automated organization, and seamless collaboration.',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Boardly',
    techStack: ['Next.js', 'Supabase', 'React', 'GSAP', 'OpenAI', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 10,
    title: 'GEM UI',
    name: 'Vue UI Component Library',
    category: 'Design System',
    year: '2026',
    description: 'A comprehensive collection of reusable UI components built with Vue 3 and Tailwind CSS. Designed for speed, accessibility, and modern aesthetics.',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Vue+UI',
    techStack: ['Vue', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    githubUrl: '#'
  },
];
