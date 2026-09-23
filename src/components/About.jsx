import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, CheckCircle, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      title: 'Juara Harapan 1 Nasional MIPA SDGs 2024',
      org: 'Universitas Jambi',
      desc: 'Inovasi website pengelolaan sampah terintegrasi model bisnis pengumpulan sampah berkelanjutan.',
      icon: Award,
    },
    {
      title: 'S1 Teknik Informatika (IPK 3.64 / 4.00)',
      org: 'UIN Sunan Gunung Djati Bandung',
      desc: 'Semester 5 dengan fokus rekayasa perangkat lunak, sistem backend, dan aplikasi mobile.',
      icon: BookOpen,
    },
    {
      title: 'Sertifikasi Jaringan Cisco CCNA & Linux',
      org: 'Cisco Networking Academy',
      desc: 'Fondasi kuat dalam administrasi sistem operasi Linux dan konfigurasi protokol jaringan.',
      icon: Server,
    },
    {
      title: 'Sertifikasi Basis Data SQL & Desain',
      org: 'Oracle Academy',
      desc: 'Pemodelan relasional dan optimasi query terstruktur untuk integritas data tingkat enterprise.',
      icon: CheckCircle,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Heading */}
        <div className="lg:col-span-4">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight sticky top-28">
            Tentang Saya &amp; Fondasi Teknis
          </h2>
        </div>

        {/* Right: Narrative & Verified Accomplishments */}
        <div className="lg:col-span-8">
          <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-5">
            Saya <strong>Raka Alpiansyah</strong>, seorang Software Engineer yang berakar dari Ciamis dan 
            kini menempuh studi S1 Teknik Informatika di UIN Sunan Gunung Djati Bandung. Minat rekayasa saya 
            terfokus pada arsitektur backend, otomasi API, pengembangan aplikasi mobile dengan Flutter, serta 
            infrastruktur jaringan dan database.
          </p>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10">
            Perjalanan teknologi saya dimulai dari SMK Taruna Bangsa, di mana saya 
            membangun pemahaman mendalam tentang topologi jaringan, protokol routing, dan sistem operasi Linux. 
            Pengalaman praktis di industri melalui magang backend Laravel di CV Milionare Aromas dan operasional jaringan di 
            PT POS Indonesia membentuk komitmen saya terhadap kode yang efisien, aman, dan siap pakai di lingkungan produksi.
          </p>

          {/* Real accomplishments grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-800/80">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="card-surface p-5 rounded-2xl">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Icon className="w-4 h-4 text-sky-400" />
                    <span className="font-mono text-[11px] text-zinc-400">{item.org}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
