/**
 * 🍕 CRAVE — Premium Food Delivery App
 * A Dribbble/Awwwards-quality food delivery UI
 * Built with React, Tailwind CSS, Framer Motion, Lucide Icons
 *
 * Pages: Landing | Login | Dashboard | Cart
 * Features: Glassmorphism, Gradients, Animations, Dark Theme
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── LUCIDE ICONS (inline SVG to avoid import issues) ───────────────────────
const Icon = ({ path, size = 20, className = "", strokeWidth = 1.8, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const Icons = {
  Search: (p) => <Icon {...p} path="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />,
  Star: (p) => <Icon {...p} path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />,
  ShoppingBag: (p) => <Icon {...p} path="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />,
  Clock: (p) => <Icon {...p} path="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-6V12l4-2" />,
  MapPin: (p) => <Icon {...p} path="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />,
  Plus: (p) => <Icon {...p} path="M12 5v14M5 12h14" />,
  Minus: (p) => <Icon {...p} path="M5 12h14" />,
  X: (p) => <Icon {...p} path="M18 6 6 18M6 6l12 12" />,
  ChevronRight: (p) => <Icon {...p} path="M9 18l6-6-6-6" />,
  ChevronLeft: (p) => <Icon {...p} path="M15 18l-6-6 6-6" />,
  Flame: (p) => <Icon {...p} path="M12 2c0 0-3 4-3 8a3 3 0 0 0 6 0c0-1-.5-2-1-3 0 0 2 2 2 5a5 5 0 0 1-10 0c0-6 6-10 6-10z" />,
  Heart: (p) => <Icon {...p} path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  User: (p) => <Icon {...p} path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  LayoutDashboard: (p) => <Icon {...p} path="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z" />,
  Truck: (p) => <Icon {...p} path="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  Settings: (p) => <Icon {...p} path="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />,
  LogOut: (p) => <Icon {...p} path="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  ArrowRight: (p) => <Icon {...p} path="M5 12h14M12 5l7 7-7 7" />,
  Check: (p) => <Icon {...p} path="M20 6 9 17l-5-5" />,
  Filter: (p) => <Icon {...p} path="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />,
  Quote: (p) => <Icon {...p} path="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />,
  Menu: (p) => <Icon {...p} path="M3 12h18M3 6h18M3 18h18" />,
  Bell: (p) => <Icon {...p} path="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />,
  Percent: (p) => <Icon {...p} path="M19 5 5 19M6.5 6.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M16.5 16.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0" />,
  Zap: (p) => <Icon {...p} path="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 1, name: "Pizza", emoji: "🍕", color: "from-orange-500 to-red-600", count: 48 },
  { id: 2, name: "Burgers", emoji: "🍔", color: "from-amber-500 to-orange-600", count: 32 },
  { id: 3, name: "Sushi", emoji: "🍣", color: "from-rose-500 to-pink-600", count: 27 },
  { id: 4, name: "Indian", emoji: "🍛", color: "from-yellow-500 to-amber-600", count: 41 },
  { id: 5, name: "Desserts", emoji: "🍰", color: "from-purple-500 to-pink-600", count: 55 },
  { id: 6, name: "Ramen", emoji: "🍜", color: "from-red-500 to-rose-600", count: 19 },
];

const RESTAURANTS = [
  { id: 1, name: "Napoli's Kitchen", category: "Pizza", rating: 4.9, reviews: 2341, time: "20-30", delivery: "Free", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", featured: true, tag: "⭐ Top Rated" },
  { id: 2, name: "Tokyo Garden", category: "Sushi", rating: 4.8, reviews: 1876, time: "25-40", delivery: "$1.99", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80", featured: true, tag: "🔥 Trending" },
  { id: 3, name: "Spice Route", category: "Indian", rating: 4.7, reviews: 3102, time: "30-45", delivery: "Free", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", featured: false, tag: "🌶️ Spicy" },
  { id: 4, name: "Burger District", category: "Burgers", rating: 4.6, reviews: 987, time: "15-25", delivery: "$0.99", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80", featured: true, tag: "⚡ Fast" },
  { id: 5, name: "Sweet Dreams", category: "Desserts", rating: 4.9, reviews: 4521, time: "20-30", delivery: "Free", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80", featured: false, tag: "💜 Popular" },
  { id: 6, name: "Ramen Republic", category: "Ramen", rating: 4.7, reviews: 1432, time: "25-35", delivery: "$1.49", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80", featured: false, tag: "🍜 New" },
];

const FOODS = [
  { id: 1, name: "Truffle Margherita", restaurant: "Napoli's Kitchen", price: 18.99, originalPrice: 24.99, rating: 4.9, calories: 720, image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80", category: "Pizza", hot: true },
  { id: 2, name: "Dragon Roll Supreme", restaurant: "Tokyo Garden", price: 22.50, rating: 4.8, calories: 480, image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80", category: "Sushi", hot: false },
  { id: 3, name: "Butter Chicken Royale", restaurant: "Spice Route", price: 16.99, rating: 4.7, calories: 650, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", category: "Indian", hot: true },
  { id: 4, name: "Smash Double Wagyu", restaurant: "Burger District", price: 19.99, originalPrice: 25.99, rating: 4.6, calories: 980, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", category: "Burgers", hot: false },
  { id: 5, name: "Galaxy Cheesecake", restaurant: "Sweet Dreams", price: 12.99, rating: 4.9, calories: 560, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80", category: "Desserts", hot: true },
  { id: 6, name: "Black Garlic Ramen", restaurant: "Ramen Republic", price: 17.50, rating: 4.7, calories: 820, image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", category: "Ramen", hot: false },
  { id: 7, name: "Pepperoni Volcano", restaurant: "Napoli's Kitchen", price: 21.99, rating: 4.8, calories: 890, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80", category: "Pizza", hot: true },
  { id: 8, name: "Mango Sticky Rice", restaurant: "Sweet Dreams", price: 9.99, rating: 4.9, calories: 420, image: "https://images.unsplash.com/photo-1591299177061-2151e53fcaea?w=400&q=80", category: "Desserts", hot: false },
];

const TESTIMONIALS = [
  { id: 1, name: "Aria Chen", role: "Food Blogger", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80", text: "CRAVE completely transformed my dinner routine. The UI is insanely beautiful and the food arrives hotter than my ex's temper.", rating: 5 },
  { id: 2, name: "Marcus Webb", role: "Software Engineer", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", text: "As a dev, I appreciate the seamless UX. As a human, I appreciate the truffle pizza at 2am. This app gets me.", rating: 5 },
  { id: 3, name: "Sofia Reyes", role: "UX Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", text: "Finally a food app that doesn't look like it was designed in 2009. The glassmorphism UI is absolutely *chef's kiss*.", rating: 5 },
];

// ─── ANIMATION UTILITIES ──────────────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: #080810;
      --surface: #0f0f1a;
      --surface2: #13131f;
      --border: rgba(255,255,255,0.06);
      --border-hover: rgba(255,255,255,0.12);
      --text: #f0f0ff;
      --text-muted: rgba(240,240,255,0.45);
      --accent: #ff4d6d;
      --accent2: #ff8c42;
      --glow: rgba(255,77,109,0.3);
      --glass: rgba(255,255,255,0.04);
      --glass-border: rgba(255,255,255,0.08);
    }

    html { scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    
    .font-display { font-family: 'Syne', sans-serif; }
    .font-clash { font-family: 'Clash Display', sans-serif; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    /* Glass card */
    .glass {
      background: var(--glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
    }

    /* Glow effects */
    .glow-text { text-shadow: 0 0 40px rgba(255,77,109,0.6); }
    .glow-btn { box-shadow: 0 0 30px rgba(255,77,109,0.4), 0 0 60px rgba(255,77,109,0.15); }

    /* Gradient text */
    .grad-text {
      background: linear-gradient(135deg, #ff4d6d 0%, #ff8c42 50%, #ffd700 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Noise texture overlay */
    .noise::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none;
      border-radius: inherit;
    }

    /* Animated gradient border */
    .grad-border {
      position: relative;
      background: linear-gradient(var(--bg), var(--bg)) padding-box,
                  linear-gradient(135deg, rgba(255,77,109,0.6), rgba(255,140,66,0.3), rgba(255,77,109,0.6)) border-box;
      border: 1px solid transparent;
    }

    /* Card hover */
    .card-hover {
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
    }
    .card-hover:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,77,109,0.15);
    }

    /* Slide animations */
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
    @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(255,77,109,0.3); } 50% { box-shadow: 0 0 40px rgba(255,77,109,0.7), 0 0 80px rgba(255,77,109,0.2); } }
    @keyframes shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes drawIn { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }

    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
    .animate-marquee { animation: marquee 25s linear infinite; }
    .animate-fade-in { animation: fadeIn 0.5s ease forwards; }

    .anim-slide-up { animation: slideUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .anim-slide-up-delay-1 { animation: slideUp 0.7s 0.1s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
    .anim-slide-up-delay-2 { animation: slideUp 0.7s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
    .anim-slide-up-delay-3 { animation: slideUp 0.7s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
    .anim-slide-in { animation: slideIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .anim-scale-in { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .anim-draw-in { animation: drawIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

    /* Skeleton loading */
    .skeleton {
      background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite;
    }

    /* Input focus */
    input:focus, textarea:focus { outline: none; }

    /* Scrollbar hide */
    .hide-scroll { scrollbar-width: none; }
    .hide-scroll::-webkit-scrollbar { display: none; }

    /* Custom checkbox */
    input[type="checkbox"]:checked { accent-color: var(--accent); }

    /* Toast */
    .toast {
      animation: drawIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    /* Button ripple */
    .btn-primary {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #ff4d6d, #ff8c42);
      transition: all 0.3s;
    }
    .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }
    .btn-primary:active { transform: translateY(0); }

    /* Nav link underline */
    .nav-link { position: relative; }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 0; height: 2px;
      background: var(--accent);
      transition: width 0.3s ease;
      border-radius: 1px;
    }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    /* Orb backgrounds */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    /* Price strike */
    .price-old { text-decoration: line-through; color: var(--text-muted); }

    /* Quantity btn */
    .qty-btn {
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,77,109,0.15); border: 1px solid rgba(255,77,109,0.3);
      color: #ff4d6d; cursor: pointer;
      transition: all 0.2s;
    }
    .qty-btn:hover { background: #ff4d6d; color: white; transform: scale(1.1); }

    /* Category pill */
    .cat-pill {
      padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 500;
      border: 1px solid var(--border); background: var(--glass);
      cursor: pointer; transition: all 0.25s; white-space: nowrap;
      color: var(--text-muted);
    }
    .cat-pill:hover, .cat-pill.active {
      background: rgba(255,77,109,0.15);
      border-color: rgba(255,77,109,0.4);
      color: #ff4d6d;
    }

    /* Sidebar item */
    .sidebar-item {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 12px;
      color: var(--text-muted); cursor: pointer;
      transition: all 0.25s;
      font-size: 14px; font-weight: 500;
    }
    .sidebar-item:hover { background: rgba(255,255,255,0.05); color: var(--text); }
    .sidebar-item.active { background: rgba(255,77,109,0.12); color: #ff4d6d; }
    .sidebar-item.active svg { color: #ff4d6d; }

    /* Rating stars */
    .stars { color: #fbbf24; display: flex; gap: 2px; }

    /* Smooth page transitions */
    .page-enter { animation: fadeIn 0.4s ease forwards; }

    /* Grid responsive */
    @media (max-width: 768px) {
      .hero-title { font-size: 2.8rem !important; }
      .dashboard-layout { flex-direction: column !important; }
      .sidebar-full { display: none !important; }
    }

    /* Badge */
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .badge-red { background: rgba(255,77,109,0.15); color: #ff4d6d; border: 1px solid rgba(255,77,109,0.25); }
    .badge-green { background: rgba(52,211,153,0.15); color: #34d399; border: 1px solid rgba(52,211,153,0.25); }
    .badge-gold { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25); }

    /* Marquee wrapper */
    .marquee-wrapper { overflow: hidden; }
    .marquee-inner { display: flex; width: max-content; }
  `}</style>
);

// ─── TOAST COMPONENT ─────────────────────────────────────────────────────────
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="toast" style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 20px", borderRadius: 14,
      background: type === "success" ? "rgba(52,211,153,0.15)" : "rgba(255,77,109,0.15)",
      border: `1px solid ${type === "success" ? "rgba(52,211,153,0.3)" : "rgba(255,77,109,0.3)"}`,
      backdropFilter: "blur(20px)", maxWidth: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    }}>
      <span style={{ fontSize: 18 }}>{type === "success" ? "✓" : "!"}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{message}</span>
      <button onClick={onClose} style={{ marginLeft: "auto", opacity: 0.6, background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
        <Icons.X size={16} />
      </button>
    </div>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage, cartCount, isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0 24px",
      background: scrolled ? "rgba(8,8,16,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", height: 72, gap: 32 }}>
        {/* Logo */}
        <button onClick={() => setPage("landing")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: "linear-gradient(135deg, #ff4d6d, #ff8c42)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 20px rgba(255,77,109,0.4)",
          }}>🍕</div>
          <span className="font-display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#ff4d6d" }}>CRAVE</span>
          </span>
        </button>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 28, marginLeft: 16 }}>
          {[
            { label: "Explore", id: "landing" },
            { label: "Dashboard", id: "dashboard" },
          ].map(({ label, id }) => (
            <button key={id} onClick={() => setPage(id)}
              className={`nav-link ${page === id ? "active" : ""}`}
              style={{ background: "none", border: "none", cursor: "pointer", color: page === id ? "#f0f0ff" : "rgba(240,240,255,0.5)", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.05)", borderRadius: 999, padding: "8px 16px",
          border: "1px solid rgba(255,255,255,0.08)", }}>
          <Icons.Search size={15} style={{ color: "rgba(240,240,255,0.4)" }} />
          <input placeholder="Search food..." style={{
            background: "none", border: "none", color: "#f0f0ff",
            fontSize: 13, width: 140, fontFamily: "inherit",
          }} />
        </div>

        {/* Cart */}
        <button onClick={() => setPage("cart")} style={{
          position: "relative", background: "rgba(255,77,109,0.1)",
          border: "1px solid rgba(255,77,109,0.25)", borderRadius: 12,
          width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#ff4d6d", transition: "all 0.2s",
        }}>
          <Icons.ShoppingBag size={18} />
          {cartCount > 0 && (
            <span style={{
              position: "absolute", top: -6, right: -6,
              background: "linear-gradient(135deg, #ff4d6d, #ff8c42)",
              borderRadius: "50%", width: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "white",
            }}>{cartCount}</span>
          )}
        </button>

        {/* Auth */}
        {isLoggedIn ? (
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", cursor: "pointer", border: "2px solid rgba(255,77,109,0.4)" }}>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="user" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : (
          <button onClick={() => setPage("login")} className="btn-primary"
            style={{ padding: "9px 20px", borderRadius: 10, border: "none", cursor: "pointer", color: "white", fontSize: 13, fontWeight: 600 }}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

// ─── STAR RATING ──────────────────────────────────────────────────────────────
const Stars = ({ rating, size = 12 }) => (
  <div className="stars">
    {[1,2,3,4,5].map(i => (
      <Icons.Star key={i} size={size} style={{ opacity: i <= Math.round(rating) ? 1 : 0.2 }} />
    ))}
  </div>
);

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div style={{ borderRadius: 20, overflow: "hidden", background: "var(--surface2)", border: "1px solid var(--border)" }}>
    <div className="skeleton" style={{ height: 200 }} />
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="skeleton" style={{ height: 18, borderRadius: 6, width: "70%" }} />
      <div className="skeleton" style={{ height: 14, borderRadius: 6, width: "50%" }} />
      <div className="skeleton" style={{ height: 14, borderRadius: 6, width: "40%" }} />
    </div>
  </div>
);

// ─── FOOD CARD ────────────────────────────────────────────────────────────────
const FoodCard = ({ food, onAddToCart }) => {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [ref, inView] = useInView();

  const handleAdd = () => {
    onAddToCart(food);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div ref={ref} className="card-hover" style={{
      borderRadius: 20, overflow: "hidden",
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      opacity: inView ? 1 : 0,
      transition: "opacity 0.6s ease",
    }}>
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={food.image} alt={food.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"} />
        
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
        
        {/* Top badges */}
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between" }}>
          {food.hot && <span className="badge badge-red"><Icons.Flame size={10} />Hot</span>}
          {food.originalPrice && <span className="badge badge-green"><Icons.Percent size={10} />Sale</span>}
          <button onClick={() => setLiked(!liked)} style={{ marginLeft: "auto", background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: liked ? "#ff4d6d" : "white", transition: "all 0.2s" }}>
            <Icons.Heart size={14} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Bottom price */}
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "white", fontFamily: "Syne, sans-serif" }}>${food.price}</span>
            {food.originalPrice && <span className="price-old" style={{ fontSize: 13 }}>${food.originalPrice}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, flex: 1 }}>{food.name}</h3>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>{food.restaurant}</p>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Stars rating={food.rating} />
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>{food.rating}</span>
          </div>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{food.calories} kcal</span>
        </div>

        <button onClick={handleAdd} style={{
          marginTop: 14, width: "100%", padding: "10px",
          borderRadius: 12, border: "none", cursor: "pointer",
          background: added ? "rgba(52,211,153,0.15)" : "rgba(255,77,109,0.12)",
          color: added ? "#34d399" : "#ff4d6d",
          border: `1px solid ${added ? "rgba(52,211,153,0.3)" : "rgba(255,77,109,0.25)"}`,
          fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "all 0.3s",
          fontFamily: "inherit",
        }}>
          {added ? <><Icons.Check size={14} />Added!</> : <><Icons.Plus size={14} />Add to Cart</>}
        </button>
      </div>
    </div>
  );
};

// ─── RESTAURANT CARD ──────────────────────────────────────────────────────────
const RestaurantCard = ({ restaurant }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="card-hover" style={{
      borderRadius: 20, overflow: "hidden",
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      opacity: inView ? 1 : 0, transition: "opacity 0.6s ease",
      cursor: "pointer",
    }}>
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <img src={restaurant.image} alt={restaurant.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "white", background: "rgba(0,0,0,0.5)", padding: "4px 10px", borderRadius: 999, backdropFilter: "blur(10px)" }}>
            {restaurant.tag}
          </span>
        </div>
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.4)", padding: "3px 8px", borderRadius: 6, backdropFilter: "blur(10px)" }}>
            {restaurant.category}
          </span>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{restaurant.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--text-muted)", fontSize: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Stars rating={restaurant.rating} size={11} />
            <span style={{ fontWeight: 600, color: "#fbbf24" }}>{restaurant.rating}</span>
            <span>({restaurant.reviews.toLocaleString()})</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icons.Clock size={12} />{restaurant.time} min</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Icons.Truck size={12} />{restaurant.delivery} delivery</span>
        </div>
      </div>
    </div>
  );
};

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const HeroSection = ({ setPage }) => {
  const [search, setSearch] = useState("");
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 600, height: 600, top: -100, right: -100, background: "radial-gradient(circle, rgba(255,77,109,0.2) 0%, transparent 70%)" }} />
      <div className="orb" style={{ width: 400, height: 400, bottom: -50, left: -100, background: "radial-gradient(circle, rgba(255,140,66,0.15) 0%, transparent 70%)" }} />

      {/* Animated grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", paddingTop: 72 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", minHeight: "calc(100vh - 72px)" }}>

          {/* Left content */}
          <div style={{ paddingTop: 40 }}>
            {/* Badge */}
            <div className="anim-slide-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px 6px 8px", borderRadius: 999, background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.25)", marginBottom: 28 }}>
              <span style={{ background: "linear-gradient(135deg, #ff4d6d, #ff8c42)", borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700, color: "white" }}>NEW</span>
              <span style={{ fontSize: 13, color: "#ff8c42", fontWeight: 500 }}>500+ restaurants now available</span>
            </div>

            {/* Headline */}
            <h1 className="anim-slide-up-delay-1 hero-title font-display" style={{ fontSize: "5rem", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", marginBottom: 24 }}>
              Food that
              <br />
              <span className="grad-text">fuels your</span>
              <br />
              <span style={{ position: "relative" }}>
                cravings
                <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #ff4d6d, transparent)", borderRadius: 2 }} />
              </span>
            </h1>

            <p className="anim-slide-up-delay-2" style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
              Order from the finest restaurants around you. Premium food, lightning-fast delivery, unforgettable taste.
            </p>

            {/* Search */}
            <div className="anim-slide-up-delay-2" style={{ position: "relative", marginBottom: 32 }}>
              <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.05)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", padding: "0 16px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                  <Icons.Search size={18} style={{ color: "var(--text-muted)" }} />
                </div>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Pizza, Sushi, Burgers..."
                  style={{ flex: 1, padding: "16px 16px", background: "none", border: "none", color: "#f0f0ff", fontSize: 15, fontFamily: "inherit" }} />
                <div style={{ display: "flex", alignItems: "center", padding: "8px", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
                  <button onClick={() => setPage("dashboard")} className="btn-primary" style={{ padding: "10px 24px", borderRadius: 10, border: "none", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                    Find Food
                  </button>
                </div>
              </div>

              {/* Search suggestions */}
              <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                {["🍕 Pizza", "🍔 Burgers", "🍣 Sushi", "🍛 Indian"].map(s => (
                  <button key={s} onClick={() => setPage("dashboard")} style={{
                    padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 500,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-muted)", cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = "rgba(255,77,109,0.4)"; e.target.style.color = "#ff4d6d"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "var(--text-muted)"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="anim-slide-up-delay-3" style={{ display: "flex", gap: 32 }}>
              {[
                { num: "50K+", label: "Happy customers" },
                { num: "500+", label: "Restaurants" },
                { num: "4.9", label: "Average rating" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-display" style={{ fontSize: 26, fontWeight: 800, color: "#ff4d6d", letterSpacing: "-0.03em" }}>{num}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Image */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Floating card 1 */}
            <div className="animate-float glass" style={{
              position: "absolute", top: "15%", left: "-5%", zIndex: 10,
              padding: "14px 18px", borderRadius: 16, display: "flex", alignItems: "center", gap: 12,
              animation: "float 6s ease-in-out infinite", animationDelay: "0s",
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=100&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Truffle Margherita</div>
                <div style={{ fontSize: 11, color: "#fbbf24", display: "flex", gap: 2 }}>★★★★★</div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="glass" style={{
              position: "absolute", bottom: "20%", right: "-5%", zIndex: 10,
              padding: "12px 16px", borderRadius: 16, animation: "float 6s ease-in-out infinite", animationDelay: "2s",
            }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Your order is</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", display: "flex", alignItems: "center", gap: 6 }}>
                <Icons.Truck size={14} /> On the way! 🚀
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Est. 15 min</div>
            </div>

            {/* Main hero image */}
            <div style={{ position: "relative", width: "90%", aspectRatio: "1", borderRadius: "50%", overflow: "hidden" }}>
              {/* Rotating ring */}
              <div className="animate-spin-slow" style={{
                position: "absolute", inset: -20,
                border: "2px dashed rgba(255,77,109,0.2)",
                borderRadius: "50%",
              }} />
              <div style={{
                width: "100%", height: "100%",
                background: "radial-gradient(circle at 40% 40%, rgba(255,77,109,0.25) 0%, rgba(255,140,66,0.1) 50%, transparent 70%)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80"
                  alt="Hero food"
                  style={{ width: "85%", height: "85%", objectFit: "cover", borderRadius: "50%", animation: "float 8s ease-in-out infinite" }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,77,109,0.6), transparent)" }} />
      </div>
    </section>
  );
};

// ─── CATEGORY GRID ────────────────────────────────────────────────────────────
const CategoryGrid = ({ activeCategory, setActiveCategory }) => {
  const [ref, inView] = useInView(0.2);
  return (
    <section ref={ref} style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4d6d", fontWeight: 600 }}>Categories</span>
          <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 800, marginTop: 8, letterSpacing: "-0.03em" }}>
            What are you <span className="grad-text">craving?</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {CATEGORIES.map((cat, i) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ${i * 0.05}s`,
                background: activeCategory === cat.name ? "rgba(255,77,109,0.1)" : "var(--surface2)",
                border: `1px solid ${activeCategory === cat.name ? "rgba(255,77,109,0.4)" : "var(--border)"}`,
                borderRadius: 20, padding: "24px 16px", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                fontFamily: "inherit", transition: "all 0.3s",
                transform: "translateY(0)",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{
                width: 60, height: 60, borderRadius: 16, fontSize: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg, ${cat.color.split(" ")[1]}, ${cat.color.split(" ")[3]})`,
                opacity: 0.9, boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
              }}>
                {cat.emoji}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{cat.count} items</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
const MarqueeStrip = () => {
  const items = ["🍕 Free delivery on orders over $25", "⚡ 30-minute guarantee", "🌟 10,000+ five-star reviews", "🎁 First order 20% off", "🔥 New restaurants every week", "🌿 Vegan options available"];
  return (
    <div style={{ background: "linear-gradient(135deg, #ff4d6d, #ff8c42)", padding: "14px 0", overflow: "hidden", marginBottom: 0 }}>
      <div className="marquee-wrapper">
        <div className="marquee-inner animate-marquee">
          {[...items, ...items].map((item, i) => (
            <span key={i} style={{ padding: "0 32px", fontSize: 13, fontWeight: 600, color: "white", whiteSpace: "nowrap" }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const [ref, inView] = useInView(0.2);
  return (
    <section ref={ref} style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4d6d", fontWeight: 600 }}>Testimonials</span>
          <h2 className="font-display" style={{ fontSize: "2.5rem", fontWeight: 800, marginTop: 8, letterSpacing: "-0.03em" }}>
            Loved by <span className="grad-text">foodies</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: `all 0.7s ${i * 0.15}s`,
              background: "var(--surface2)", borderRadius: 24,
              padding: 28, border: "1px solid var(--border)",
              position: "relative",
            }}>
              {/* Quote icon */}
              <div style={{ position: "absolute", top: 20, right: 20, color: "rgba(255,77,109,0.2)" }}>
                <Icons.Quote size={32} />
              </div>

              {/* Stars */}
              <div style={{ marginBottom: 16 }}><Stars rating={t.rating} size={14} /></div>

              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(240,240,255,0.7)", marginBottom: 20, fontStyle: "italic" }}>
                "{t.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={t.avatar} alt={t.name} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,77,109,0.3)" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CTA SECTION ─────────────────────────────────────────────────────────────
const CTASection = ({ setPage }) => {
  const [ref, inView] = useInView(0.3);
  return (
    <section ref={ref} style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          borderRadius: 32, padding: "72px 48px", position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, rgba(255,77,109,0.15) 0%, rgba(255,140,66,0.08) 100%)",
          border: "1px solid rgba(255,77,109,0.2)",
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : "scale(0.95)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          textAlign: "center",
        }}>
          <div className="orb" style={{ width: 400, height: 400, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(255,77,109,0.25) 0%, transparent 70%)" }} />

          <h2 className="font-display" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.04em", position: "relative" }}>
            Ready to <span className="grad-text">CRAVE?</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Join 50,000+ food lovers who order with CRAVE every day.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
            <button onClick={() => setPage("login")} className="btn-primary glow-btn"
              style={{ padding: "14px 32px", borderRadius: 14, border: "none", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
              Get Started Free <Icons.ArrowRight size={16} />
            </button>
            <button onClick={() => setPage("dashboard")}
              style={{ padding: "14px 32px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(10px)" }}>
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const LandingPage = ({ setPage, cart, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filteredFoods = activeCategory ? FOODS.filter(f => f.category === activeCategory) : FOODS;

  return (
    <div className="page-enter">
      <HeroSection setPage={setPage} />
      <MarqueeStrip />
      <CategoryGrid activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Featured Restaurants */}
      <section style={{ padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4d6d", fontWeight: 600 }}>Restaurants</span>
              <h2 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, marginTop: 6, letterSpacing: "-0.03em" }}>
                Featured <span className="grad-text">picks</span>
              </h2>
            </div>
            <button onClick={() => setPage("dashboard")} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 999, padding: "8px 20px", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,77,109,0.4)"; e.target.style.color = "#ff4d6d"; }}
              onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text-muted)"; }}>
              View all <Icons.ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {loading
              ? [1, 2, 3].map(i => <SkeletonCard key={i} />)
              : RESTAURANTS.slice(0, 3).map(r => <RestaurantCard key={r.id} restaurant={r} />)
            }
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section ref={ref} style={{ padding: "0 0 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <span style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4d6d", fontWeight: 600 }}>Popular</span>
              <h2 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, marginTop: 6, letterSpacing: "-0.03em" }}>
                Trending <span className="grad-text">dishes</span>
                {activeCategory && <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 400, marginLeft: 12 }}>— {activeCategory}</span>}
              </h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {loading
              ? [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
              : filteredFoods.slice(0, 8).map(f => <FoodCard key={f.id} food={f} onAddToCart={onAddToCart} />)
            }
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection setPage={setPage} />

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🍕</div>
        <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#ff4d6d", marginBottom: 8 }}>CRAVE</div>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Delivering happiness, one meal at a time. © 2025 CRAVE Inc.</p>
      </footer>
    </div>
  );
};

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
// ─── FIXED CREDENTIALS (hardcoded for demo) ──────────────────────────────────
const DEMO_EMAIL = "user@crave.com";
const DEMO_PASSWORD = "crave123";

const LoginPage = ({ setPage, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    // Validate against fixed credentials
    if (isLogin) {
      if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        setError("Invalid email or password. Use the demo credentials below.");
        return;
      }
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    onLogin();
    setPage("dashboard");
  };

  const inputStyle = (name) => ({
    width: "100%", padding: "14px 16px",
    background: focused === name ? "rgba(255,77,109,0.05)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === name ? "rgba(255,77,109,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 12, color: "#f0f0ff", fontSize: 14,
    fontFamily: "inherit",
    transition: "all 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(255,77,109,0.1)" : "none",
  });

  return (
    <div className="page-enter" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left — Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80"
          alt="food"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,8,16,0.7) 0%, rgba(255,77,109,0.2) 100%)" }} />
        
        {/* Overlay content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 48 }}>
          <button onClick={() => setPage("landing")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🍕</div>
            <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "white" }}>CRAVE</span>
          </button>

          <div>
            <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
              {TESTIMONIALS.slice(0, 1).map(t => (
                <div key={t.id} className="glass" style={{ padding: "20px 24px", borderRadius: 20, maxWidth: 380 }}>
                  <Stars rating={5} size={13} />
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, margin: "12px 0" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={t.avatar} alt="" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{t.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "white", lineHeight: 1.2, fontFamily: "Syne, sans-serif", letterSpacing: "-0.03em" }}>
              Discover the best<br /><span style={{ color: "#ff8c42" }}>food near you</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 48, background: "var(--surface)" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Toggle */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, marginBottom: 36, border: "1px solid var(--border)" }}>
            {["Sign In", "Sign Up"].map((tab, i) => (
              <button key={tab} onClick={() => setIsLogin(i === 0)}
                style={{
                  flex: 1, padding: "10px", borderRadius: 9, border: "none", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                  background: (i === 0) === isLogin ? "linear-gradient(135deg, #ff4d6d, #ff8c42)" : "transparent",
                  color: (i === 0) === isLogin ? "white" : "var(--text-muted)",
                  transition: "all 0.3s",
                  boxShadow: (i === 0) === isLogin ? "0 4px 12px rgba(255,77,109,0.3)" : "none",
                }}>
                {tab}
              </button>
            ))}
          </div>

          <h2 className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 6, letterSpacing: "-0.03em" }}>
            {isLogin ? "Welcome back 👋" : "Join CRAVE 🍕"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
            {isLogin ? "Sign in to your account to continue" : "Create your free account today"}
          </p>

          {/* ── Demo Credentials Box ── */}
          {isLogin && (
            <div style={{
              background: "rgba(255,140,66,0.08)", border: "1px solid rgba(255,140,66,0.25)",
              borderRadius: 14, padding: "14px 18px", marginBottom: 20,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#ff8c42", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  🔑 Demo Credentials
                </span>
                <button onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setError(""); }}
                  style={{ fontSize: 11, fontWeight: 700, color: "#ff8c42", background: "rgba(255,140,66,0.15)", border: "1px solid rgba(255,140,66,0.35)", borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontFamily: "inherit" }}>
                  Auto-fill ⚡
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)", width: 60 }}>Email</span>
                  <code style={{ color: "#f0f0ff", background: "rgba(255,255,255,0.07)", padding: "2px 8px", borderRadius: 5, fontSize: 12 }}>{DEMO_EMAIL}</code>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <span style={{ color: "var(--text-muted)", width: 60 }}>Password</span>
                  <code style={{ color: "#f0f0ff", background: "rgba(255,255,255,0.07)", padding: "2px 8px", borderRadius: 5, fontSize: 12 }}>{DEMO_PASSWORD}</code>
                </div>
              </div>
            </div>
          )}

          {/* Social buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { icon: "G", label: "Google", color: "#EA4335" },
              { icon: "f", label: "Facebook", color: "#1877F2" },
            ].map(({ icon, label, color }) => (
              <button key={label} style={{
                padding: "12px", borderRadius: 12, border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)", color: "#f0f0ff",
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}>
                <span style={{ color, fontWeight: 800, fontSize: 16 }}>{icon}</span>
                Continue with {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Full Name</label>
                <input placeholder="Your name" style={inputStyle("name")}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" style={inputStyle("email")}
                onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inputStyle("password")}
                onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} />
            </div>
          </div>

          {isLogin && (
            <div style={{ textAlign: "right", marginTop: 8, marginBottom: 0 }}>
              <button style={{ background: "none", border: "none", color: "#ff4d6d", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                Forgot password?
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div style={{
              marginTop: 14, padding: "10px 14px", borderRadius: 10,
              background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.3)",
              fontSize: 13, color: "#ff4d6d", display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <button onClick={handleSubmit} className="btn-primary glow-btn"
            style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: 12, border: "none", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? (
              <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin-slow 0.8s linear infinite" }} />
            ) : (
              <>{isLogin ? "Sign In" : "Create Account"} <Icons.ArrowRight size={16} /></>
            )}
          </button>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#ff4d6d", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ cart, onAddToCart, setPage }) => {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const filters = ["All", "Pizza", "Sushi", "Burgers", "Indian", "Desserts", "Ramen"];

  const filteredFoods = FOODS.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "All" || f.category === activeFilter;
    return matchSearch && matchFilter;
  });

  const sidebarItems = [
    { id: "discover", label: "Discover", icon: Icons.Zap },
    { id: "orders", label: "My Orders", icon: Icons.Truck },
    { id: "favorites", label: "Favorites", icon: Icons.Heart },
    { id: "notifications", label: "Notifications", icon: Icons.Bell },
    { id: "settings", label: "Settings", icon: Icons.Settings },
  ];

  return (
    <div className="page-enter" style={{ minHeight: "100vh", display: "flex", paddingTop: 72 }}>
      {/* Sidebar */}
      <div className="sidebar-full" style={{
        width: sidebarCollapsed ? 68 : 220, minHeight: "calc(100vh - 72px)",
        background: "var(--surface)", borderRight: "1px solid var(--border)",
        padding: "24px 12px", display: "flex", flexDirection: "column", gap: 4,
        position: "sticky", top: 72, height: "calc(100vh - 72px)",
        transition: "width 0.3s",
        flexShrink: 0,
      }}>
        {/* Collapse btn */}
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{ alignSelf: sidebarCollapsed ? "center" : "flex-end", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)", marginBottom: 16, transition: "all 0.2s" }}>
          {sidebarCollapsed ? <Icons.ChevronRight size={14} /> : <Icons.ChevronLeft size={14} />}
        </button>

        {sidebarItems.map(({ id, label, icon: Ic }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`sidebar-item ${activeTab === id ? "active" : ""}`}
            style={{ justifyContent: sidebarCollapsed ? "center" : "flex-start", fontFamily: "inherit", background: "none", border: "none" }}>
            <Ic size={18} />
            {!sidebarCollapsed && <span>{label}</span>}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* User mini profile */}
        {!sidebarCollapsed && (
          <div style={{ padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Marcus Webb</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Pro Member</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "32px 32px", overflowY: "auto", minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 className="font-display" style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>
              Good evening, Marcus 👋
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>What are you craving today?</p>
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 16px", border: "1px solid var(--border)", width: 260 }}>
            <Icons.Search size={15} style={{ color: "var(--text-muted)" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dishes or restaurants..."
              style={{ background: "none", border: "none", color: "#f0f0ff", fontSize: 13, flex: 1, fontFamily: "inherit" }} />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <Icons.X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Orders", value: "47", icon: "📦", color: "#ff4d6d" },
            { label: "Saved Restaurants", value: "12", icon: "❤️", color: "#8b5cf6" },
            { label: "This Month", value: "$284", icon: "💰", color: "#34d399" },
            { label: "Loyalty Points", value: "1,240", icon: "⭐", color: "#fbbf24" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: "var(--surface2)", borderRadius: 16, padding: "20px", border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -15, right: -15, width: 60, height: 60, background: `${color}20`, borderRadius: "50%" }} />
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div className="font-display" style={{ fontSize: 24, fontWeight: 800, color, letterSpacing: "-0.03em" }}>{value}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="hide-scroll" style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
          <Icons.Filter size={16} style={{ color: "var(--text-muted)", flexShrink: 0, marginTop: 5 }} />
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`cat-pill ${activeFilter === f ? "active" : ""}`}
              style={{ fontFamily: "inherit" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Restaurants */}
        <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>
          Popular Restaurants
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          {RESTAURANTS.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>

        {/* Foods */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="font-display" style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {activeFilter === "All" ? "All Dishes" : activeFilter}
            <span style={{ marginLeft: 8, fontSize: 14, color: "var(--text-muted)", fontWeight: 400 }}>({filteredFoods.length})</span>
          </h2>
        </div>

        {filteredFoods.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>No dishes found for "{searchQuery}"</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {filteredFoods.map(f => <FoodCard key={f.id} food={f} onAddToCart={onAddToCart} />)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CART PAGE ────────────────────────────────────────────────────────────────
const CartPage = ({ cart, updateQty, removeItem, setPage }) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const delivery = subtotal > 25 ? 0 : 2.99;
  const total = subtotal - discount + delivery;

  const handleCheckout = async () => {
    setCheckingOut(true);
    await new Promise(r => setTimeout(r, 1500));
    setCheckingOut(false);
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="page-enter" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 72 }}>
        <div style={{ textAlign: "center", maxWidth: 420, padding: 48 }}>
          <div style={{ fontSize: 80, marginBottom: 24, animation: "float 3s ease-in-out infinite" }}>🎉</div>
          <h2 className="font-display" style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.03em" }}>Order Placed!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Your food is being prepared. Estimated delivery in 25-35 minutes. We'll notify you when it's on the way!
          </p>
          <div className="glass" style={{ borderRadius: 20, padding: 24, marginBottom: 28, textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#34d399" }}>
              <Icons.Truck size={20} />
              <span style={{ fontWeight: 600 }}>Estimated: 30 minutes</span>
            </div>
          </div>
          <button onClick={() => setPage("dashboard")} className="btn-primary glow-btn"
            style={{ padding: "14px 32px", borderRadius: 12, border: "none", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
            Track Order 🚴
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ minHeight: "100vh", paddingTop: 72 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <button onClick={() => setPage("dashboard")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)", transition: "all 0.2s" }}>
            <Icons.ChevronLeft size={18} />
          </button>
          <h1 className="font-display" style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Your Cart
            <span style={{ fontSize: 16, color: "var(--text-muted)", fontWeight: 400, marginLeft: 10 }}>({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
          </h1>
        </div>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🛒</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>Add some delicious food to get started!</p>
            <button onClick={() => setPage("dashboard")} className="btn-primary"
              style={{ padding: "12px 28px", borderRadius: 12, border: "none", color: "white", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, alignItems: "flex-start" }}>
            {/* Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: "var(--surface2)", borderRadius: 20, padding: 20, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 20, transition: "all 0.3s" }}>
                  <img src={item.image} alt={item.name} style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.name}</h3>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>{item.restaurant}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Stars rating={item.rating} size={11} />
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.rating}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><Icons.Minus size={12} /></button>
                    <span style={{ fontSize: 15, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}><Icons.Plus size={12} /></button>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: "right" }}>
                    <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#ff4d6d" }}>${(item.price * item.qty).toFixed(2)}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>${item.price} each</div>
                  </div>

                  <button onClick={() => removeItem(item.id)}
                    style={{ background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.2)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ff4d6d", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,77,109,0.25)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,77,109,0.1)"}>
                    <Icons.X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ background: "var(--surface2)", borderRadius: 24, padding: 28, border: "1px solid var(--border)", position: "sticky", top: 90 }}>
              <h3 className="font-display" style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 24, letterSpacing: "-0.02em" }}>Order Summary</h3>

              {/* Delivery address */}
              <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,77,109,0.07)", border: "1px solid rgba(255,77,109,0.15)", marginBottom: 20, display: "flex", gap: 10 }}>
                <Icons.MapPin size={16} style={{ color: "#ff4d6d", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>Delivery Address</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>123 Main Street, Apt 4B, New York, NY 10001</div>
                </div>
              </div>

              {/* Promo code */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <input value={promoCode} onChange={e => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "#f0f0ff", fontSize: 13, fontFamily: "inherit" }} />
                <button onClick={() => { if (promoCode) setPromoApplied(true); }}
                  style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,77,109,0.3)", background: "rgba(255,77,109,0.1)", color: "#ff4d6d", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                  Apply
                </button>
              </div>
              {promoApplied && (
                <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#34d399", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                  <Icons.Check size={12} /> 10% discount applied!
                </div>
              )}

              {/* Price breakdown */}
              {[
                { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
                { label: "Delivery fee", value: delivery === 0 ? "FREE" : `$${delivery.toFixed(2)}`, color: delivery === 0 ? "#34d399" : undefined },
                promoApplied && { label: "Discount (10%)", value: `-$${discount.toFixed(2)}`, color: "#34d399" },
              ].filter(Boolean).map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: color || "inherit" }}>{value}</span>
                </div>
              ))}

              <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                <span className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "#ff4d6d" }}>${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} disabled={checkingOut} className="btn-primary glow-btn"
                style={{ width: "100%", padding: "15px", borderRadius: 14, border: "none", color: "white", fontWeight: 700, fontSize: 15, cursor: checkingOut ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {checkingOut ? (
                  <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin-slow 0.8s linear infinite" }} />
                ) : (
                  <><Icons.Truck size={16} /> Place Order</>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 12 }}>
                🔒 Secure payment · Free returns
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const addToCart = useCallback((food) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === food.id);
      if (exists) return prev.map(i => i.id === food.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...food, qty: 1 }];
    });
    showToast(`${food.name} added to cart! 🛒`);
  }, [showToast]);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }, []);

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast("Item removed from cart", "error");
  }, [showToast]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        {page !== "login" && (
          <Navbar page={page} setPage={setPage} cartCount={cartCount} isLoggedIn={isLoggedIn} />
        )}

        {page === "landing" && (
          <LandingPage setPage={setPage} cart={cart} onAddToCart={addToCart} />
        )}
        {page === "login" && (
          <LoginPage setPage={setPage} onLogin={() => setIsLoggedIn(true)} />
        )}
        {page === "dashboard" && (
          <Dashboard cart={cart} onAddToCart={addToCart} setPage={setPage} />
        )}
        {page === "cart" && (
          <CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} setPage={setPage} />
        )}

        {toast && (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </>
  );
}
