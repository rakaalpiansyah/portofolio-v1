/**
 * Verified Projects Data for Raka Alpiansyah.
 * All repository and live links are verified real assets.
 */
export const projectsData = [
  {
    id: 'rehat',
    num: '01',
    category: 'Mobile Engineering · Google Play',
    title: '"Rehat" Mental Productivity',
    shortTitle: 'Rehat App',
    badge: 'Live on Google Play Store',
    tagline: 'Aplikasi Produktivitas & Manajemen Interval Istirahat Mental',
    description:
      'Aplikasi mobile berbasis Flutter & Dart yang terpublikasi secara global di Google Play Store untuk membantu pengguna mengelola ritme kerja fokus dan mencegah burnout melalui interval istirahat terukur.',
    descriptionEn:
      'A cross-platform mobile application built with Flutter & Dart published globally on Google Play Store to help users maintain focus rhythm and prevent burnout through structured break intervals.',
    challenge:
      'Menjaga efisiensi konsumsi baterai saat interval notifikasi berjalan di latar belakang dan mempertahankan performa rendering 60 FPS tanpa jank.',
    challengeEn:
      'Maintaining optimal battery consumption while scheduling background interval notifications, and ensuring 60 FPS UI performance.',
    solution:
      'Menerapkan modular clean architecture, isolated reactive state management, scheduled local notifications, dan penyimpanan SQLite lokal yang ringan.',
    solutionEn:
      'Engineered with modular clean architecture, isolated reactive state, scheduled local notifications, and lightweight SQLite local sync.',
    techStack: ['Flutter', 'Dart', 'Android Studio', 'SQLite', 'Play Console'],
    githubUrl: 'https://github.com/rakaalpiansyah/rehat-app',
    liveUrl: 'https://play.google.com',
    liveLabel: 'Google Play Store',
    image: '/projects/rehat.webp',
    metrics: 'Global Play Store Release',
    featured: true,
  },
  {
    id: 'meeting-ai',
    num: '02',
    category: 'AI Engineering · Speech Intelligence',
    title: 'Meeting AI: Real-time Speech & Diarization',
    shortTitle: 'Meeting AI',
    badge: 'Live on Railway Production',
    tagline: 'Backend Transkripsi Otomatis, Speaker Diarization, & Analisis Rapat',
    description:
      'Layanan kecerdasan buatan berbasis FastAPI dan model Whisper AI untuk pemrosesan audio rapat, transkripsi real-time berlatensi rendah, pemisahan suara multi-pembicara (speaker diarization), dan analisis ringkasan cerdas.',
    descriptionEn:
      'An AI microservice built with FastAPI and Whisper AI for meeting audio processing, low-latency transcription, multi-speaker diarization, and smart summaries.',
    challenge:
      'Tingginya latensi inferensi saat memproses file audio berdurasi panjang dan kompleksitas pemisahan suara tumpang tindih.',
    challengeEn:
      'High inference latency when processing lengthy audio and algorithmic complexity of overlapping speech separation.',
    solution:
      'Pipeline asynchronous berbasis FastAPI, chunking audio streaming teroptimasi, caching semantic, dan deployment containerized di Railway Cloud.',
    solutionEn:
      'Asynchronous FastAPI pipeline, streaming audio chunking, semantic caching, and containerized deployment on Railway Cloud.',
    techStack: ['Python 3.11', 'FastAPI', 'Whisper AI', 'PyTorch', 'Railway', 'Docker'],
    githubUrl: 'https://github.com/rakaalpiansyah/Meeting-AI-Backend',
    liveUrl: 'https://meeting-ai-backend-production-b61e.up.railway.app/docs',
    liveLabel: 'Railway Swagger Docs',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    metrics: 'FastAPI Production Microservice',
    featured: true,
  },
  {
    id: 'agritrace',
    num: '03',
    category: 'Enterprise Blockchain · Smart Contracts',
    title: 'AgriTraceChain: Blockchain Traceability',
    shortTitle: 'AgriTraceChain',
    badge: 'Hyperledger Fabric & Caliper',
    tagline: 'Platform Rantai Pasok Pertanian & Smart Contract Multi-Organisasi',
    description:
      'Platform blockchain konsorsium enterprise berbasis Hyperledger Fabric untuk melacak perjalanan komoditas pertanian dari petani hingga pembeli secara transparan dan tamper-proof, dengan 4 smart contract (chaincode) serta benchmark performa via Hyperledger Caliper.',
    descriptionEn:
      'An enterprise consortium blockchain platform powered by Hyperledger Fabric to track agricultural commodities with tamper-proof transparency, 4 smart contracts (chaincode), and Caliper performance benchmarks.',
    challenge:
      'Menghilangkan ketergantungan pada server pusat yang rentan manipulasi data dan mengkoordinasikan konsensus di antara 5 organisasi independen.',
    challengeEn:
      'Eliminating single-point-of-failure vulnerabilities in centralized servers and coordinating consensus among 5 independent organizations.',
    solution:
      'Merancang arsitektur konsorsium 5 organisasi (Farmer, Aggregator, Processor, Regulator, Buyer), deployment 4 smart contract modular, dan settlement otomatis Letter of Credit (LoC).',
    solutionEn:
      'Architected a 5-organization consortium, deployed 4 modular chaincodes, and automated Letter of Credit (LoC) settlement.',
    techStack: ['Hyperledger Fabric', 'Go / Node Chaincode', 'Docker', 'Hyperledger Caliper', 'Cryptography'],
    githubUrl: 'https://github.com/rakaalpiansyah/agritraceChain',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    metrics: '5-Org Consortium · Caliper Benchmarked',
    featured: true,
  },
  {
    id: 'plantvillage',
    num: '04',
    category: 'Computer Vision · Deep Learning',
    title: 'PlantVillage AI: Deep Learning Crop Vision',
    shortTitle: 'PlantVillage AI',
    badge: '97.12% Test Accuracy · Edge TFLite',
    tagline: 'Klasifikasi Patologi Penyakit Daun Tanaman Berbasis CNN & TFLite',
    description:
      'Sistem diagnosis citra patologi tanaman menggunakan arsitektur Custom CNN 4-Blok Konvolusi yang berhasil meraih akurasi pengujian 97.12% dan dikuantisasi ke TensorFlow Lite untuk inferensi edge CPU dalam ~6ms.',
    descriptionEn:
      'A plant pathology diagnostic computer vision system using a Custom 4-Block CNN achieving 97.12% test accuracy, quantized to TensorFlow Lite for edge CPU inference in ~6ms.',
    challenge:
      'Variasi pencahayaan dan background bising pada daun di lapangan, serta kebutuhan inferensi cepat tanpa ketergantungan GPU cloud.',
    challengeEn:
      'Variable field lighting and noisy backgrounds, plus the need for ultra-fast on-device inference without GPU reliance.',
    solution:
      'Pipeline augmentasi citra variatif, arsitektur CNN dengan dropout regularized, serta optimasi ekspor TensorFlow Lite berbobot ringan.',
    solutionEn:
      'Diverse image augmentation pipeline, regularized dropout CNN architecture, and lightweight TensorFlow Lite quantization.',
    techStack: ['Python', 'TensorFlow', 'Keras', 'TensorFlow Lite', 'OpenCV', 'NumPy'],
    githubUrl: 'https://github.com/rakaalpiansyah/plantvillage-disease-detection',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1200&auto=format&fit=crop',
    metrics: '97.12% Test Accuracy · ~6ms CPU',
    featured: true,
  },
  {
    id: 'greenv',
    num: '05',
    category: 'Web Architecture · Sustainable Tech',
    title: 'GreenV: Smart Waste Management & SDGs',
    shortTitle: 'GreenV Platform',
    badge: 'Juara 1 Nasional MIPA SDGs 2024',
    tagline: 'Inovasi Digital Pengelolaan Sampah Terpadu & Reward Daur Ulang',
    description:
      'Platform web terpadu yang menghubungkan masyarakat penghasil limbah dengan pengepul daur ulang berizin, mengantarkan Juara 1 Lomba Karya Tulis Ilmiah Nasional SDGs 2024 di Universitas Jambi.',
    descriptionEn:
      'An integrated web platform connecting waste producers with licensed recycling centers, winning 1st Place in the 2024 National Scientific Paper Competition at Universitas Jambi.',
    challenge:
      'Rendahnya motivasi pemilahan sampah mandiri dan ketiadaan koordinasi logistik rute penjemputan limbah bernilai ekonomi.',
    challengeEn:
      'Low public incentives for waste sorting and lack of coordinated logistics routes for recyclable pickups.',
    solution:
      'Membangun modul kalkulator reward poin sampah otomatis, pemantauan titik jemput kurir terintegrasi, dan analitik sirkulasi limbah.',
    solutionEn:
      'Engineered automated waste reward calculators, integrated courier pickup coordination, and recycling circulation analytics.',
    techStack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'REST API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rakaalpiansyah/web-GreenV',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
    metrics: 'Juara 1 Nasional MIPA SDGs 2024',
    featured: true,
  },
  {
    id: 'royale',
    num: '06',
    category: 'Enterprise Backend · Logistics',
    title: 'PT. Royale Essence Indonesia E-Commerce',
    shortTitle: 'Royale Essence',
    badge: 'Production Backend · KiriminAja API',
    tagline: 'Arsitektur Backend E-Commerce & Otomasi Ekspedisi Logistik',
    description:
      'Sistem backend e-commerce skala produksi dengan orkestrasi kurir logistik otomatis via KiriminAja API (pembandingan volumetrik vs aktual), payment gateway instan, dan webhook notifikasi transaksi WhatsApp.',
    descriptionEn:
      'Production-grade e-commerce backend with automated shipping logistics via KiriminAja API (volumetric vs actual weight), payment gateway, and WhatsApp order webhooks.',
    challenge:
      'Kesalahan perhitungan ongkir manual pada paket berukuran besar dan beban verifikasi bukti transfer perbankan konvensional.',
    challengeEn:
      'Manual shipping calculation discrepancies on bulky packages and the overhead of manual bank transfer verifications.',
    solution:
      'Integrasi API logistik KiriminAja untuk pembuatan AWB otomatis, payment gateway real-time terotentikasi, dan bot WhatsApp otomatisasi invoice.',
    solutionEn:
      'Integrated KiriminAja logistics for automated AWB generation, real-time payment gateway, and WhatsApp invoice notification bots.',
    techStack: ['Laravel 11', 'PHP', 'MySQL', 'KiriminAja API', 'Payment Gateway', 'Watzap API', 'Brevo SMTP'],
    githubUrl: 'https://github.com/rakaalpiansyah',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1200&auto=format&fit=crop',
    metrics: 'End-to-End Automated Orders & Shipping',
    featured: true,
  },
];
