import { useState, useRef, useEffect } from "react";

import photo_kiss from "@/imports/660fd2db-8dc0-4399-b19e-9136542708ca.jpg";
import photo_photobooth from "@/imports/53f750fe-aa11-48d6-af99-bcfc4da9c4de.jpg";
import photo_night from "@/imports/0be79938-4e55-471c-b085-81defd59fc96.jpg";
import photo_mirror from "@/imports/3b9323e6-01c7-4433-b161-12e5830d39a7.jpg";
import photo_cafe from "@/imports/bc8fecf8-16ea-4e4e-b5bd-a9c8854b9ef8.jpg";
import photo_aquarium from "@/imports/81bdba13-38ed-4eb5-b1bc-625ea1da1108.jpg";
import photo_nightout from "@/imports/b65bda61-4da2-4c81-9c33-f09565e37ea9.jpg";
import photo_food from "@/imports/1d05adb2-d464-4ec0-bdfd-497deffc9d1f.jpg";
import photo_plaza from "@/imports/7b357d5d-7c32-48d1-b440-92c75b73db12.jpg";
import song_colors from "@/imports/colors.mp3";

// ─── Decorative SVGs ────────────────────────────────────────────────
function Heart({ size = 16, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function Star({ size = 14, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

function Flower({ size = 20, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className} style={style}>
      <ellipse cx="16" cy="8" rx="4" ry="7" opacity="0.7"/>
      <ellipse cx="16" cy="24" rx="4" ry="7" opacity="0.7"/>
      <ellipse cx="8" cy="16" rx="7" ry="4" opacity="0.7"/>
      <ellipse cx="24" cy="16" rx="7" ry="4" opacity="0.7"/>
      <ellipse cx="10.3" cy="10.3" rx="4" ry="7" transform="rotate(-45 10.3 10.3)" opacity="0.5"/>
      <ellipse cx="21.7" cy="21.7" rx="4" ry="7" transform="rotate(-45 21.7 21.7)" opacity="0.5"/>
      <ellipse cx="21.7" cy="10.3" rx="4" ry="7" transform="rotate(45 21.7 10.3)" opacity="0.5"/>
      <ellipse cx="10.3" cy="21.7" rx="4" ry="7" transform="rotate(45 10.3 21.7)" opacity="0.5"/>
      <circle cx="16" cy="16" r="5"/>
    </svg>
  );
}

function WashiTape({ color, rotation = 0, className = "" }: { color: string; rotation?: number; className?: string }) {
  return (
    <div
      className={`absolute w-14 h-4 opacity-70 rounded-sm ${className}`}
      style={{ backgroundColor: color, transform: `rotate(${rotation}deg)` }}
    />
  );
}

// ─── Polaroid ────────────────────────────────────────────────────────
function Polaroid({
  src, caption, rotation = 0, className = "", onClick
}: {
  src: string; caption: string; rotation?: number; className?: string; onClick?: () => void;
}) {
  return (
    <div
      className={`polaroid cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={onClick}
    >
      <div className="w-full bg-[var(--cream-dark)] overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p className="font-script text-center mt-1 text-[var(--brown)] text-sm leading-tight pt-1">{caption}</p>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home ♡", href: "#hero" },
    { label: "Our Story", href: "#story" },
    { label: "Timeline", href: "#timeline" },
    { label: "Memories", href: "#memories" },
    { label: "Letters", href: "#letter" },
    { label: "Future", href: "#future" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#faf6f0]/90 backdrop-blur-sm shadow-sm border-b border-[var(--pink)]/30" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-script text-[var(--brown)] text-xl">us being us ♡</span>
        {/* Desktop */}
        <ul className="hidden md:flex gap-6">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="font-body text-sm text-[var(--brown-light)] hover:text-[var(--blush)] transition-colors duration-200 font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile hamburger */}
        <button className="md:hidden text-[var(--brown)] p-1" onClick={() => setOpen(!open)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#faf6f0]/95 backdrop-blur border-t border-[var(--pink)]/20 px-6 py-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2.5 font-body text-sm text-[var(--brown)] border-b border-[var(--cream-dark)] last:border-0">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="min-h-screen pt-20 pb-16 relative overflow-hidden flex items-center" style={{ background: "var(--cream)" }}>
      {/* bg doodles */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Star size={12} className="absolute top-24 left-12 text-[var(--yellow)] opacity-60 animate-float" style={{ "--rot": "15deg" } as React.CSSProperties} />
        <Star size={8} className="absolute top-40 right-20 text-[var(--pink)] opacity-50 animate-float" style={{ animationDelay: "1s" } as React.CSSProperties} />
        <Heart size={10} className="absolute bottom-32 left-1/4 text-[var(--blush)] opacity-40 animate-float" style={{ animationDelay: "0.5s" } as React.CSSProperties} />
        <Flower size={28} className="absolute bottom-24 right-12 text-[var(--lavender)] opacity-40 animate-float" style={{ animationDelay: "1.5s" } as React.CSSProperties} />
        <Flower size={20} className="absolute top-32 left-1/3 text-[var(--pink)] opacity-30" />
        <span className="absolute top-20 right-1/3 font-script text-[var(--pink)] text-2xl opacity-30 rotate-12">✦</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div className="relative z-10">
          <p className="font-script text-[var(--blush)] text-xl mb-2 animate-fade-up">a little something made with love…</p>
          <h1 className="font-script text-6xl md:text-7xl text-[var(--brown)] leading-tight mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Us Being Us ♡
          </h1>
          <p className="text-[var(--brown-light)] text-base mb-3 italic animate-fade-up" style={{ animationDelay: "0.2s" }}>
            "Two people, countless little moments, one beautiful journey."
          </p>
          <p className="text-[var(--muted)] text-sm leading-relaxed mb-8 max-w-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
            This is our little corner of the internet — a place for the memories, laughs, random moments, and everything that makes our story ours.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <a href="#story" className="inline-flex items-center gap-2 bg-[var(--brown)] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[var(--brown-light)] transition-colors duration-200 shadow-md">
              Start Our Story ↓
            </a>
            <a href="#memories" className="inline-flex items-center gap-2 bg-[var(--pink-light)] text-[var(--brown)] text-sm font-semibold px-6 py-3 rounded-full border border-[var(--pink)] hover:bg-[var(--pink)] transition-colors duration-200">
              Our Memories ♡
            </a>
          </div>
        </div>

        {/* Scrapbook collage side */}
        <div className="relative h-[500px] md:h-[560px]">
          {/* Polaroid 1 */}
          <div className="absolute top-4 left-4 w-44 animate-float" style={{ "--rot": "-6deg" } as React.CSSProperties}>
            <WashiTape color="var(--pink)" rotation={-10} className="top-[-10px] left-[30px]" />
            <Polaroid
              src={photo_kiss}
              caption="♡"
              rotation={-6}
            />
          </div>
          {/* Polaroid 2 */}
          <div className="absolute top-16 right-0 w-40 animate-float" style={{ animationDelay: "0.8s", "--rot": "5deg" } as React.CSSProperties}>
            <WashiTape color="var(--lavender)" rotation={8} className="top-[-10px] left-[20px]" />
            <Polaroid
              src={photo_photobooth}
              caption="us being us"
              rotation={5}
            />
          </div>
          {/* Polaroid 3 */}
          <div className="absolute bottom-20 left-12 w-48 animate-float" style={{ animationDelay: "1.2s", "--rot": "3deg" } as React.CSSProperties}>
            <WashiTape color="var(--yellow)" rotation={-5} className="top-[-10px] left-[40px]" />
            <Polaroid
              src={photo_night}
              caption="that one day ♡"
              rotation={3}
            />
          </div>
          {/* Polaroid 4 */}
          <div className="absolute bottom-4 right-4 w-36 animate-float" style={{ animationDelay: "0.4s", "--rot": "-4deg" } as React.CSSProperties}>
            <Polaroid
              src={photo_mirror}
              caption="one of my favorites"
              rotation={-4}
            />
          </div>
          {/* Sticky note */}
          <div className="sticky-note absolute top-44 left-1/2 -translate-x-1/2 w-28 text-center rotate-2 text-xs z-10">
            made with love ♡
          </div>
          {/* Doodles */}
          <Heart size={20} className="absolute top-8 right-20 text-[var(--blush)] opacity-70 animate-pulse-heart" />
          <Star size={14} className="absolute bottom-36 right-8 text-[var(--yellow)] opacity-80 animate-wiggle" />
          <span className="absolute top-36 left-0 font-script text-[var(--pink)] text-3xl opacity-50 -rotate-12">✦</span>
          <span className="absolute bottom-10 left-4 font-script text-[var(--lavender)] text-2xl opacity-60 rotate-6">✿</span>
        </div>
      </div>
    </section>
  );
}

// ─── How it Started ───────────────────────────────────────────────────
function HowItStarted() {
  return (
    <section id="story" className="py-20 px-6 relative" style={{ background: "var(--cream-dark)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-12">And Then There Was Us…</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Polaroid */}
          <div className="flex justify-center">
            <div className="relative">
              <WashiTape color="var(--pink)" rotation={-12} className="-top-3 left-12" />
              <Polaroid
                src={photo_kiss}
                caption="I'm so happy we met ♡"
                rotation={-4}
                className="w-56"
              />
              <div className="sticky-note absolute -bottom-8 -right-6 w-28 text-xs rotate-6 z-10">
                chapter one ♡
              </div>
              <span className="absolute -top-4 -left-4 font-script text-[var(--lavender)] text-2xl opacity-60 -rotate-12">little did we know…</span>
            </div>
          </div>
          {/* Journal card */}
          <div className="relative">
            <div className="bg-white rounded-sm p-8 shadow-lg border border-[var(--cream-dark)] relative">
              <WashiTape color="var(--lavender)" rotation={8} className="-top-3 left-8" />
              <p className="font-script text-[var(--blush)] text-sm mb-1">December 23, 2025</p>
              <h3 className="font-script text-3xl text-[var(--brown)] mb-4">The Beginning</h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                Somehow, out of all the people we could have met, our paths crossed. And little did we know that one ordinary moment would become the beginning of something so special.
              </p>
              <p className="text-[var(--muted)] text-sm leading-relaxed">
                I still think about that day. How normal everything seemed, and how nothing would ever be quite the same after it.
              </p>
              <div className="mt-5 flex gap-2 items-center">
                <Heart size={14} className="text-[var(--blush)]" />
                <span className="font-script text-[var(--blush)] text-base">it all started here</span>
              </div>
              {/* Handwritten annotation */}
              <span className="absolute -bottom-5 right-4 font-script text-[var(--pink)] text-lg rotate-3 opacity-70">our story ♡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────
const milestones = [
  { icon: "♡", title: "Our First Conversation", date: "November 25, 2025", desc: "Where our story quietly began. Nag sugod ras panguntana sa diagram, wala man ko katabang pero unexepected blessing kaayo ka b!", color: "var(--pink-light)", border: "var(--pink)" },
  { icon: "✦", title: "The Day We Met", date: "December 04, 2025", desc: "That moment dili jud nako makalimtan, first kita nato na kita ra duha, medyo uwaw pa pero ang feeling dili makalimtan.", color: "var(--lavender-light)", border: "var(--lavender)" },
  { icon: "♡", title: "We Became Us", date: "December 23, 2025", desc: "The day everything officially became ours. I know kupal ra kaayo ko ato b, pero I just don't want to lose you, mao nag pa baga sa nawong!", color: "var(--pink-light)", border: "var(--blush)" },
  { icon: "✈", title: "Our Favorite Adventure", date: "August 29-31, 2026", desc: "A memory we'll probably talk about forever. It was the best moment of my life!", color: "var(--blue-light)", border: "var(--blue)" },
  { icon: "✦", title: "Today", date: "September 6, 2026", desc: "And we're still writing the story. I hope this story never ends until our last breath. I really really love you bb, and I will always love you, bb.", color: "var(--lavender-light)", border: "var(--lavender)" },
];

function Timeline() {
  return (
    <section id="timeline" className="py-20 px-6 relative" style={{ background: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-4">Our Journey ♡</h2>
        <p className="text-center text-[var(--muted)] text-sm mb-14">every chapter, written together</p>
        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line rounded-full" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-md border-2 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: m.color, borderColor: m.border }}>
                    {m.icon}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5 shadow-sm border flex-1 transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5"
                  style={{ borderColor: m.border + "66" }}>
                  <p className="font-script text-sm mb-0.5" style={{ color: m.border }}>{m.date}</p>
                  <h3 className="font-body font-semibold text-[var(--brown)] mb-1 text-base">{m.title}</h3>
                  <p className="text-[var(--muted)] text-sm">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Memory Gallery ───────────────────────────────────────────────────
const photos = [
  { src: photo_kiss, caption: "That one moment ♡", sub: "Still one of my favorite memories." },
  { src: photo_photobooth, caption: "Us being us.", sub: "Nothing special. Just a moment I never want to forget." },
  { src: photo_night, caption: "That night outside ♡", sub: "I love how happy you look here." },
  { src: photo_cafe, caption: "So Pretty, bb ♡", sub: "Whenever I feel sad, I just look at your picture, and somehow, everything feels a little better. ♡" },
  { src: photo_aquarium, caption: "Our little adventure", sub: "You and a giant shark. Classic." },
  { src: photo_nightout, caption: "Best moment of our life", sub: "Every place is better with you." },
  { src: photo_food, caption: "Our kind of date", sub: "Good food, better company." },
  { src: photo_plaza, caption: "Just wandering ♡", sub: "I love getting lost with you." },
];

function MemoryGallery() {
  const [lightbox, setLightbox] = useState<null | typeof photos[0]>(null);
  const rotations = [-3, 2, -1, 4, -2, 3, -2, 1];

  return (
    <section id="memories" className="py-20 px-6 relative" style={{ background: "var(--cream-dark)" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-3">Little Moments, Big Memories ♡</h2>
        <p className="text-center text-[var(--muted)] text-sm mb-12">click any photo to take a closer look</p>
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {photos.map((p, i) => (
            <div key={i} className="break-inside-avoid inline-block w-full mb-6">
              <div
                className="polaroid cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
                style={{ transform: `rotate(${rotations[i]}deg)` }}
                onClick={() => setLightbox(p)}
              >
                {i % 2 === 0 && <WashiTape color={["var(--pink)", "var(--lavender)", "var(--yellow)"][i % 3]} rotation={rotations[i]} className="-top-3 left-8" />}
                <div className="w-full bg-[var(--cream)] overflow-hidden" style={{ aspectRatio: i % 3 === 1 ? "3/4" : "1/1" }}>
                  <img src={p.src} alt={p.caption} className="w-full h-full object-cover" />
                </div>
                <p className="font-script text-center text-[var(--brown)] text-sm pt-1 leading-tight">{p.caption}</p>
                <p className="text-center text-[var(--muted)] text-xs mt-0.5 pb-0.5">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <div className="polaroid max-w-sm w-full animate-fade-up" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src.replace("w=600", "w=800")} alt={lightbox.caption} className="w-full object-cover rounded-sm" />
            <p className="font-script text-center text-[var(--brown)] text-xl pt-2">{lightbox.caption}</p>
            <p className="text-center text-[var(--muted)] text-xs mt-0.5">{lightbox.sub}</p>
          </div>
          <button className="absolute top-6 right-6 text-white text-2xl font-light" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
    </section>
  );
}

// ─── Little Things ─────────────────────────────────────────────────────
const loveThings = [
  "Your smile", "The way you laugh", "Your random stories",
  "Your kindness", "How you get excited about little things", "The way you make ordinary days feel special",
  "Your voice", "How you always show up for me", "Your hugs",
  "The way you listen", "Your silliness", "How you make me feel at home",
];

const noteColors = [
  "var(--yellow)", "var(--pink-light)", "var(--lavender-light)",
  "var(--blue-light)", "var(--peach)", "var(--yellow)",
];

function LittleThings() {
  return (
    <section className="py-20 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-3">Little Things I Love About You ♡</h2>
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="font-script text-[var(--muted)] text-base">Reasons I Love You:</span>
          <span className="font-script text-[var(--blush)] text-3xl">∞</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {loveThings.map((thing, i) => (
            <div
              key={i}
              className="relative p-4 rounded-sm shadow-md text-sm text-[var(--brown)] font-body leading-snug transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                background: noteColors[i % noteColors.length],
                transform: `rotate(${(i % 3 === 0 ? -2 : i % 3 === 1 ? 1.5 : -1)}deg)`,
              }}
            >
              <Heart size={10} className="text-[var(--blush)] mb-2" />
              <p className="font-script text-base leading-snug">{thing}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Things That Are Very Us ───────────────────────────────────────────
const usThings = [
  { emoji: "🍜", label: "Favorite Food", value: "Anything because we love to eat!" },
  { emoji: "🎵", label: "Our Song", value: "Lahi2 man tag music taste b genggeng man akoa!" },
  { emoji: "🎬", label: "Favorite Movie", value: "us being us. Made by both of us!" },
  { emoji: "📍", label: "Favorite Place", value: "Each Other" },
  { emoji: "😂", label: "Inside Joke", value: "Mang-libak!" },
  { emoji: "🎮", label: "Favorite Activity", value: "Playing ML" },
  { emoji: "📸", label: "Favorite Photo", value: "The one from our second trip to cebu" },
  { emoji: "☕", label: "Favorite Date", value: "Anywhere is enough, as long as we’re together. ♡"},
];

function VeryUs() {
  return (
    <section className="py-20 px-6" style={{ background: "var(--cream-dark)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-12">Things That Are Very Us ♡</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {usThings.map((item, i) => {
            const bgs = [
              "var(--pink-light)", "var(--lavender-light)", "var(--yellow-light)", "var(--blue-light)",
              "var(--peach)", "var(--lavender-light)", "var(--pink-light)", "var(--yellow-light)",
            ];
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-[var(--cream-dark)] text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                style={{ borderTopWidth: "3px", borderTopColor: bgs[i] }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl mx-auto mb-3" style={{ background: bgs[i] }}>
                  {item.emoji}
                </div>
                <p className="text-[var(--muted)] text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-script text-[var(--brown)] text-base leading-snug">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Love Letter ──────────────────────────────────────────────────────
const letters = [
  {
    greeting: "Dear bb,",
    body: `I just wanted to take a moment to tell you how much you mean to me. Every day with you is a new adventure, and I cherish every single one of them. Your smile lights up my world, and your laughter is music to my ears. I love the way you make even the simplest moments feel special. Thank you for being you, and for letting me be a part of your life.`,
    sign: "Yours, always ♡",
  },
  {
    greeting: "Hi b,",
    body: `I can still clearly remember the first time we met. It was like the universe conspired to bring us together, and I am forever grateful for that moment. You brought color to my life, bb. Your presence is a constant source of joy and comfort. I love you more than words can express, and I look forward to all the memories we will create together `,
    sign: "Yours, forever",
  },
  {
    greeting: "To my favorite person,",
    body: `No matter how many times we argue, I always come back to you. You are my safe haven, my partner in crime, and my best friend. I love the way we can be silly together, and how we support each other through thick and thin. You make me a better person, bb, and I am so lucky to have you in my life. I promise to always be there for you, to love you unconditionally, and to cherish every moment we share.`,
    sign: "Forever yours, bb ♡",
  },
];

function LoveLetter() {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const letter = letters[idx];

  return (
    <section id="letter" className="py-20 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-12">A Little Letter For You 💌</h2>
        <div className="relative">
          {/* Envelope-look flap */}
          {!open && (
            <div
              className="bg-[var(--pink-light)] border border-[var(--pink)] rounded-xl p-12 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              onClick={() => setOpen(true)}
            >
              <div className="text-5xl mb-4">💌</div>
              <p className="font-script text-[var(--brown)] text-xl mb-2">A letter just for you</p>
              <p className="text-[var(--muted)] text-sm">tap to open ♡</p>
            </div>
          )}
          {open && (
            <div className="letter-paper rounded-lg shadow-lg p-8 md:p-12 border border-[var(--cream-dark)] animate-fade-up relative overflow-hidden">
              {/* Corner flowers */}
              <Flower size={24} className="absolute top-4 right-4 text-[var(--pink)] opacity-30" />
              <Flower size={18} className="absolute bottom-4 left-4 text-[var(--lavender)] opacity-30" />
              <p className="font-script text-[var(--blush)] text-2xl mb-6">{letter.greeting}</p>
              <p className="text-[var(--brown)] text-sm leading-[28px] mb-8">{letter.body}</p>
              <p className="font-script text-[var(--brown)] text-xl">{letter.sign}</p>
              <div className="mt-8 flex justify-center">
                <button
                  className="inline-flex items-center gap-2 text-sm text-[var(--blush)] border border-[var(--pink)] px-5 py-2.5 rounded-full hover:bg-[var(--pink-light)] transition-colors duration-200"
                  onClick={() => { setIdx((idx + 1) % letters.length); }}
                >
                  Open another letter 💌
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Random Memories ──────────────────────────────────────────────────
const randoms = [
  { style: "sticky", color: "var(--yellow)", rot: -3, text: "Kahinumdom ka atong first meet nato kato ni adto tas DIY nya mag uwaw paka kupot sakoa kamot hehe" },
  { style: "chat", color: "var(--pink-light)", rot: 2, text: '"Atong Second date nga ni adto tag marangog the best jud kay bisan klase padayun ang dateee!!' },
  { style: "note", color: "var(--lavender-light)", rot: -2, text: "Bisan walang wala kaayo ko b dili ko nimo biyaan, thank you as always b i love you" },
  { style: "sticky", color: "var(--peach)", rot: 3, text: "First time nako ing ani na feeling, I did not expect na maka feel kog love" },
  { style: "chat", color: "var(--blue-light)", rot: -1, text: '"Im so lucky b to have you, full package na ang bb. Im so sooo lucky jud"' },
  { style: "note", color: "var(--yellow-light)", rot: 2, text: "Tanan moments nato together b dili nako malimtan, kay tanan first time nako ma experience and Im so happy na ikaw" },
];

function RandomMemories() {
  return (
    <section className="py-20 px-6 relative overflow-hidden" style={{ background: "var(--cream-dark)" }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-script text-4xl text-center text-[var(--brown)] mb-3">The Random Stuff That Somehow Became Memories</h2>
        <p className="text-center text-[var(--muted)] text-sm mb-12 italic">"remember when we literally…"</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {randoms.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-sm shadow-md text-sm leading-relaxed transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default"
              style={{
                background: item.color,
                transform: `rotate(${item.rot}deg)`,
                fontFamily: item.style === "chat" ? "var(--font-body)" : "var(--font-script)",
                fontSize: item.style === "chat" ? "13px" : "15px",
                color: "var(--brown)",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.style === "chat" && (
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--blush)]" />
                  <span className="text-[var(--muted)] text-xs font-semibold">conversation ♡</span>
                </div>
              )}
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Music Player ─────────────────────────────────────────────────────
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lyrics synced using the timestamps you provided from the LRC file.
  const lyrics = [
    { time: 0.79, text: "I just want you here tonight", section: "Chorus" },
    { time: 4.02, text: "You make me feel so alive" },
    { time: 7.38, text: "Everything was black and white" },
    { time: 10.33, text: "But you brought color into my life" },
    { time: 13.55, text: "You are so sweet" },
    { time: 16.75, text: "Make my heart skip a beat" },
    { time: 20.02, text: "Everything was black and white" },
    { time: 23.05, text: "But you brought color into my life" },
    { time: 25.65, text: "La la la la la la la la la la la la la" },
    { time: 30.37, text: "Color into my" },
    { time: 32.02, text: "La la la la la la la la la la la" },
    { time: 35.22, text: "Oh" },
    { time: 36.75, text: "Color into my life" },

    { time: 38.81, text: "Clocks ticking I'm looking for my way down", section: "Verse 1" },
    { time: 41.98, text: "I'm searching my head's been lost in the clouds" },
    { time: 45.50, text: "The world was an empty town" },
    { time: 50.20, text: "But then you showed up" },
    { time: 51.95, text: "Brought back the color into my life" },
    { time: 55.18, text: "Saw my reflection inside your eyes" },
    { time: 58.36, text: "Showed me perspective of something new" },
    { time: 62.03, text: "Oh I just need you" },
    { time: 66.80, text: "I've been searching and searching" },
    { time: 68.66, text: "I'm wondering what I need to do" },
    { time: 73.49, text: "There's no need to plan this" },
    { time: 75.10, text: "Our lives, the canvas" },

    { time: 77.55, text: "I just want you here tonight", section: "Chorus" },
    { time: 80.75, text: "You make me feel so alive" },
    { time: 83.98, text: "Everything was black and white" },
    { time: 87.08, text: "But you brought color into my life" },
    { time: 90.37, text: "You are so sweet" },
    { time: 93.57, text: "Make my heart skip a beat" },
    { time: 96.73, text: "Everything was black and white" },
    { time: 99.86, text: "But you brought color into my life" },

    // Instrumental gap from 01:39.86 to 01:54.75 — no lyric displayed.
    { time: 114.75, text: "I was losing my mind, but you came in time, saved me", section: "Verse 2" },
    { time: 118.35, text: "You put the pieces back when my soul was breaking" },
    { time: 121.84, text: "But where do we go, where do we go from here?" },
    { time: 125.05, text: "I don't know" },
    { time: 127.24, text: "All I know is that I want you here with me" },
    { time: 129.61, text: "Let's go paint our masterpiece" },
    { time: 131.24, text: "Melodies and harmonies" },
    { time: 132.61, text: "When you showed up a Symphony" },
    { time: 134.29, text: "Was playing in my head" },
    { time: 135.57, text: "I'm just drawn to your eyes" },
    { time: 137.47, text: "I see you smiling at me, things begin to harmonize" },
    { time: 140.41, text: "Doesn't have to be perfect" },
    { time: 142.32, text: "It'll all still be worth it" },
    { time: 144.02, text: "I was lost floating on by" },
    { time: 146.09, text: "But you showed me where Earth is" },
    { time: 149.45, text: "And now I'm on the surface" },
    { time: 152.00, text: "With you" },
    { time: 155.98, text: "With you" },
    { time: 159.14, text: "Oh oh oh" },
    { time: 163.13, text: "Ohhh ohhh ohhh" },

    { time: 170.16, text: "Can't you stay with me tonight?", section: "Outro" },
    { time: 173.54, text: "I'll help you feel so alive" },
    { time: 177.00, text: "When everything feels black and white" },
    { time: 179.87, text: "I'll bring color to your life" },
    { time: 183.20, text: "You are so sweet" },
    { time: 186.57, text: "Make my heart skip a beat" },
    { time: 189.74, text: "Everything was black and white" },
    { time: 192.74, text: "But you brought color into my life" },
  ];

  const getCurrentLyricIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return -1;
  };

  const currentLyricIndex = getCurrentLyricIndex();

  // Hide lyrics during the instrumental gap.
  const inInstrumentalGap = currentTime >= 99.86 && currentTime < 114.75;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;

    audio.currentTime = Math.max(
      0,
      Math.min(audio.currentTime + seconds, audio.duration)
    );
  };

  const seekToPercentage = (percentage: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;

    audio.currentTime = percentage * audio.duration;
  };

  const toTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <section className="py-20 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-lg mx-auto">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-12">If Our Love Had a Sound ♡</h2>
        <div className="relative">
          <WashiTape color="var(--pink)" rotation={-8} className="-top-3 left-16" />
          <div className="music-player p-6">
            <audio ref={audioRef} src={song_colors} preload="metadata" />

            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--cream-dark)] shadow-md">
                <img
                  src={photo_cafe}
                  alt="album art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-body font-semibold text-[var(--brown)] text-base">Colors</p>
                <p className="text-[var(--muted)] text-sm">Jake Llaguno</p>
                <p className="font-script text-[var(--blush)] text-sm mt-1">our song ♡</p>
              </div>
            </div>

            <div className="min-h-28 flex items-center justify-center text-center mb-5 px-2">
              {playing && !inInstrumentalGap && currentLyricIndex >= 0 && (
                <div
                  key={currentLyricIndex}
                  className="animate-fade-up"
                  style={{ animationDuration: "0.45s" }}
                >
                  {lyrics[currentLyricIndex].section && (
                    <p className="text-[var(--muted)] text-xs uppercase tracking-[0.2em] mb-2">
                      {lyrics[currentLyricIndex].section}
                    </p>
                  )}
                  <p className="font-script text-[var(--brown)] text-2xl md:text-3xl leading-relaxed">
                    “{lyrics[currentLyricIndex].text}” ♡
                  </p>
                </div>
              )}
            </div>

            <div className="mb-3">
              <div
                className="w-full h-1 bg-[var(--cream-dark)] rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPosition = e.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(1, clickPosition / rect.width));
                  seekToPercentage(percentage);
                }}
              >
                <div className="progress-bar h-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[var(--muted)] text-xs">{toTime(currentTime)}</span>
                <span className="text-[var(--muted)] text-xs">{toTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
              <button
                className="text-[var(--muted)] hover:text-[var(--brown)] transition-colors"
                onClick={() => seek(-10)}
                aria-label="Go back 10 seconds"
              >
                ⏮
              </button>
              <button
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: "var(--brown)", color: "white", fontSize: "18px" }}
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? "⏸" : "▶"}
              </button>
              <button
                className="text-[var(--muted)] hover:text-[var(--brown)] transition-colors"
                onClick={() => seek(10)}
                aria-label="Skip forward 10 seconds"
              >
                ⏭
              </button>
            </div>
          </div>
          <div className="sticky-note absolute -bottom-10 -right-6 w-28 text-xs rotate-6">
            this song = us ♡
          </div>
        </div>
      </div>
    </section>
  );
}

function Future() {
  const bucketList = [
    "Watch the sunrise together",
    "Take a trip somewhere new",
    "Make more little memories",
    "Grow old together ♡",
  ];
  const [checked, setChecked] = useState<Set<number>>(new Set([0, 2]));
  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section id="future" className="py-20 px-6 relative" style={{ background: "var(--cream-dark)" }}>
      {/* Bg doodles */}
      <div className="absolute inset-0 pointer-events-none">
        <Star size={14} className="absolute top-16 right-24 text-[var(--yellow)] opacity-40 animate-float" />
        <Flower size={22} className="absolute bottom-20 left-16 text-[var(--pink)] opacity-30 animate-float" style={{ animationDelay: "1s" } as React.CSSProperties} />
        <span className="absolute top-24 left-8 font-script text-[var(--lavender)] text-4xl opacity-20">☁</span>
        <span className="absolute bottom-32 right-8 font-script text-[var(--blue)] text-3xl opacity-20">☁</span>
      </div>
      <div className="max-w-xl mx-auto relative z-10">
        <h2 className="font-script text-5xl text-center text-[var(--brown)] mb-3">More Chapters To Come…</h2>
        <p className="text-center text-[var(--muted)] text-sm mb-12">things I want to do with you ♡</p>
        <div className="bg-white rounded-xl shadow-lg p-8 border border-[var(--cream-dark)]">
          <div className="space-y-4">
            {bucketList.map((item, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-4 group text-left"
                onClick={() => toggle(i)}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${checked.has(i) ? "border-[var(--blush)] bg-[var(--pink-light)]" : "border-[var(--cream-dark)] group-hover:border-[var(--pink)]"}`}>
                  {checked.has(i) && <Heart size={9} className="text-[var(--blush)]" />}
                </div>
                <span className={`text-sm transition-all duration-200 ${checked.has(i) ? "line-through text-[var(--muted)]" : "text-[var(--brown)] group-hover:text-[var(--blush)]"}`}>
                  {item}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-[var(--cream-dark)] text-center">
            <span className="font-script text-[var(--blush)] text-base">
              {checked.size} done · {bucketList.length - checked.size} still to come ♡
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Ending ───────────────────────────────────────────────────────────
function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) setRevealed(true);
  };

  return (
    <div className="relative inline-block">
      <button onClick={handleClick} className="text-[var(--pink)] opacity-40 hover:opacity-80 transition-opacity animate-pulse-heart" title="psst...">
        <Heart size={16} />
      </button>
      {revealed && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white border border-[var(--pink)] rounded-xl px-5 py-4 shadow-xl text-center w-56 animate-fade-up z-50">
          <p className="font-script text-[var(--blush)] text-base leading-snug">Psst… I love you more than you know. ♡</p>
          <button className="mt-2 text-[var(--muted)] text-xs" onClick={() => { setRevealed(false); setClicks(0); }}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function Ending() {
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: "var(--cream)" }}>
      <div className="max-w-2xl mx-auto relative z-10">
        <Flower size={30} className="text-[var(--lavender)] opacity-40 mx-auto mb-8" />
        <h2 className="font-script text-6xl md:text-7xl text-[var(--brown)] mb-6">To be continued… ♡</h2>
        <p className="text-[var(--muted)] text-base leading-relaxed mb-8 max-w-md mx-auto">
          There are still so many places to go, things to try, pictures to take, and memories to make.
        </p>
        <p className="font-script text-4xl md:text-5xl text-[var(--brown)] mb-3">I'm glad it's you.</p>
        <Heart size={28} className="text-[var(--blush)] mx-auto mt-4 animate-pulse-heart" />
      </div>
      <footer className="mt-16 pt-8 border-t border-[var(--cream-dark)] text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[var(--muted)] text-sm">Made with</span>
          <Heart size={12} className="text-[var(--blush)]" />
          <span className="text-[var(--muted)] text-sm">by Kint Sala for the prettiest person in the world - Elaine Fernandez ♡</span>
        </div>
        <p className="text-[var(--muted)] text-xs mb-4">2025 — forever ♡</p>
        <EasterEgg />
      </footer>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-full">
      <Nav />
      <Hero />
      <HowItStarted />
      <Timeline />
      <MemoryGallery />
      <LittleThings />
      <VeryUs />
      <LoveLetter />
      <RandomMemories />
      <MusicPlayer />
      <Future />
      <Ending />
    </div>
  );
}