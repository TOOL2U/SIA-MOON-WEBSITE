import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import { ClientOnly } from "./components/ClientOnly";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./styles/global.css";
import "react-datepicker/dist/react-datepicker.css";
// Make sure this comes BEFORE your custom styles
import "./tailwind.css";
import "./styles/fonts.css";
// Import responsive adjustments
import "./styles/responsive.css";
// Import mobile calendar dropdown styles
import "./styles/mobile-calendar-dropdown.css";
import "./styles/mobile-availability-calendar-dropdown.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lenis from '@studio-freight/lenis';

export const links: LinksFunction = () => [

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://db.onlinewebfonts.com/c/d414e85093c9a428dbde5f2b4c39f187?family=Berling+Nova+Sans+W04+Regular",
  },
  {
    rel: "stylesheet",
    href: "https://db.onlinewebfonts.com/c/21b2809e6e69b9e96ed194863cd472a5?family=Calluna",
  },
  {
    rel: "stylesheet",
    href: "https://db.onlinewebfonts.com/c/f4ccc6647d1ac4e3f399f420fcfe93dd?family=Ela+Sans+W01+Regular",
  },
  {
    rel: "stylesheet",
    href: "https://db.onlinewebfonts.com/c/baff705f6501235566092e28f1be0afc?family=Arioso",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Initialize AOS - only on client side
  const ClientAOS = () => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
          easing: 'ease-in-out'
        });
      }
    }, []);
    return null;
  };

  // Initialize Lenis for smooth scrolling - only on client side
  const ClientLenis = () => {
    useEffect(() => {
      if (typeof window === 'undefined') return;

      // Using type assertion to handle newer Lenis options that might not be in the type definitions
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
        autoResize: true, // Automatically resize on window resize
        syncTouch: false, // Better performance on touch devices
      } as any);

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }, []);
    return null;
  };

  // Scroll to top on route change - only on client side
  const ScrollToTop = () => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }, [location.pathname]);
    return null;
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen bg-deep-green">
          {children}
        </main>
        <Footer />
        <ClientOnly>
          <ClientAOS />
          <ClientLenis />
          <ScrollToTop />
        </ClientOnly>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
