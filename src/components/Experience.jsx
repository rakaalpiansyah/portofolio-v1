import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const experiences = [
    {
      period: 'Magang / Internship',
      role: 'Backend Web Developer',
      company: 'CV Milionare Aromas',
      location: 'Indonesia',
      type: 'work',
      highlights: [
        'Mengembangkan dan memelihara arsitektur backend e-commerce menggunakan framework Laravel end-to-end.',
        'Mengintegrasikan Payment Gateway untuk memproses transaksi pembayaran pelanggan secara otomatis, aman, dan real-time.',
        'Mengimplementasikan API logistik KiriminAja untuk mengotomatisasi kalkulasi ongkos kirim dinamis (berat aktual vs volumetrik) serta otomasi request pickup dan pembuatan AWB.',
        'Membangun sistem notifikasi pesan otomatis menggunakan API Watzap.id untuk pengiriman invoice dan status pesanan WhatsApp langsung ke pelanggan.',
        'Mengonfigurasi layanan SMTP Brevo untuk pengiriman email transaksional yang dilengkapi otentikasi domain DKIM dan SPF.',
      ],
      skills: ['Laravel', 'PHP', 'MySQL', 'Payment Gateway', 'KiriminAja API', 'Watzap API', 'Brevo SMTP'],
    },
    {
      period: '2023 - Sekarang',
      role: 'S1 Teknik Informatika (Semester 5)',
      company: 'UIN Sunan Gunung Djati Bandung',
      location: 'Bandung, Indonesia',
      type: 'education',
      highlights: [
        'Fokus akademik: Software Engineering, Web & Mobile Development dengan raihan IPK 3.64 / 4.00.',
        'Meraih Juara Harapan 1 Lomba Karya Tulis MIPA Tingkat Nasional 2024 di Universitas Jambi bertema SDGs dengan solusi website pengelolaan sampah terpadu.',
        'Mendalami arsitektur perangkat lunak modular, clean code, algoritma struktur data, dan pengembangan aplikasi Flutter.',
      ],
      skills: ['Software Engineering', 'Flutter/Dart', 'Web Development', 'Algorithms', 'Database Modeling'],
    },
    {
      period: 'Okt 2021 - Des 2021',
      role: 'Magang / Praktik Kerja Lapangan (PKL)',
      company: 'PT POS INDONESIA (PERSERO)',
      location: 'Ciamis, Indonesia',
      type: 'work',
      highlights: [
        'Menangani proses entri data paket logistik menggunakan sistem internal perusahaan dengan tingkat akurasi tinggi.',
        'Melakukan maintenance berkala jaringan lokal (LAN) kantor untuk memastikan stabilitas koneksi operasional harian.',
        'Memberikan dukungan teknis (troubleshooting) perangkat keras dan perangkat lunak kepada seluruh staf kantor.',
      ],
      skills: ['LAN Maintenance', 'Hardware & Software Troubleshooting', 'Data Logistics Operations'],
    },
    {
      period: '2020 - 2023',
      role: 'SMK Taruna Bangsa',
      company: 'Ciamis, Indonesia',
      location: 'Jawa Barat',
      type: 'education',
      highlights: [
        'Membangun fondasi komputasi jaringan, konfigurasi perangkat router & switch Cisco, dan administrasi server Linux.',
        'Menyelesaikan sertifikasi resmi Cisco Networking Academy (CCNA: Intro to Networks, Linux Essentials).',
        'Menyelesaikan sertifikasi resmi Oracle Academy (Database Programming with SQL, Database Design).',
      ],
      skills: ['Cisco CCNA', 'Linux Essentials', 'Oracle SQL', 'Database Design', 'Packet Tracer'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(timelineRef.current?.children || [], {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 82%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
        Pengalaman Kerja &amp; Pendidikan
      </h2>
      <p className="text-zinc-400 text-sm sm:text-base max-w-lg mb-14">
        Rekam jejak terverifikasi dalam rekayasa backend industri, studi akademik teknik informatika, 
        dan infrastruktur jaringan.
      </p>

      <div
        ref={timelineRef}
        className="relative pl-8 space-y-8 before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-800"
      >
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative">
            {/* Timeline node */}
            <div className="absolute -left-[29px] top-3 w-2 h-2 rounded-full bg-zinc-600" />

            <div className="card-surface p-6 sm:p-7 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-zinc-400">
                  {exp.period}
                </span>
                <span className="text-xs text-zinc-500">
                  {exp.location}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white mb-1">
                {exp.role}
              </h3>

              <div className="text-sm text-zinc-400 mb-4 flex items-center gap-2">
                {exp.type === 'work' ? (
                  <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
                )}
                <span className="text-zinc-300">{exp.company}</span>
              </div>

              <ul className="space-y-2 mb-5">
                {exp.highlights.map((item, hIdx) => (
                  <li key={hIdx} className="text-zinc-400 text-xs sm:text-sm flex items-start gap-2 leading-relaxed">
                    <span className="text-zinc-600 mt-1">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-zinc-800/40 text-zinc-400 border border-zinc-800/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
