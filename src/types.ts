export type Language = 'id' | 'en';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  contributions: string[];
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface OrganizationalData {
  id: string;
  role: string;
  organization: string;
  period: string;
  points: string[];
}

export interface TranslationDict {
  header: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role1: string;
    role2: string;
    role3: string;
    sub: string;
    ctaProjects: string;
    ctaContact: string;
    availability: string;
  };
  about: {
    title: string;
    subtitle: string;
    bioParagraph: string;
    educationTitle: string;
    degree: string;
    university: string;
    gpa: string;
    highlights: {
      solutive: string;
      solutiveDesc: string;
      adaptive: string;
      adaptiveDesc: string;
      quality: string;
      qualityDesc: string;
    };
  };
  skills: {
    title: string;
    subtitle: string;
    categories: {
      os: string;
      networking: string;
      programming: string;
      general: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    demoButton: string;
    hideDemoButton: string;
    techStackTitle: string;
    contributionsTitle: string;
    lb: {
      title: string;
      simTitle: string;
      addTraffic: string;
      autoTraffic: string;
      servers: string;
      metrics: string;
      activeConn: string;
      cpuLoad: string;
      status: string;
      stable: string;
      overloaded: string;
      btnStop: string;
      btnStart: string;
      config: string;
      roundRobinExplanation: string;
    };
    pharmacy: {
      title: string;
      simTitle: string;
      searchPlaceholder: string;
      addStock: string;
      quickSale: string;
      medName: string;
      medStock: string;
      medPrice: string;
      outOfStock: string;
      lowStock: string;
      salesToday: string;
      alerts: string;
      btnBuy: string;
      btnRestock: string;
      formTitle: string;
      formName: string;
      formQty: string;
      formPrice: string;
      formBtnAdd: string;
    };
    ecommerce: {
      title: string;
      simTitle: string;
      addToCart: string;
      sqlLogTitle: string;
      consolePlaceholder: string;
      cartTitle: string;
      checkoutBtn: string;
      emptyCart: string;
      productsTitle: string;
    };
  };
  experience: {
    title: string;
    subtitle: string;
    orgTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendBtn: string;
    successMsg: string;
    copySuccess: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  id: {
    header: {
      about: 'Tentang Saya',
      skills: 'Keahlian',
      projects: 'Proyek Teknis',
      experience: 'Pengalaman',
      contact: 'Hubungi Saya',
    },
    hero: {
      greeting: 'Halo, saya',
      role1: 'IT Support Specialist',
      role2: 'Network & Cloud Researcher',
      role3: 'Junior Developer',
      sub: 'Lulusan Teknik Informatika yang berfokus pada administrasi sistem Linux, infrastruktur jaringan, komputasi awan, dan pemrograman aplikasi.',
      ctaProjects: 'Lihat Portofolio',
      ctaContact: 'Hubungi Saya',
      availability: 'Tersedia untuk Peluang Kerja',
    },
    about: {
      title: 'Tentang Saya',
      subtitle: 'Mari mengenal lebih dekat latar belakang dan motivasi saya.',
      bioParagraph: 'Saya adalah lulusan Sarjana Teknik Informatika dari Universitas Mercu Buana dengan IPK 3.57/4.00. Memiliki ketertarikan kuat dan keahlian praktis dalam administrasi sistem Linux, infrastruktur jaringan, cloud computing, serta pemrograman aplikasi. Berbekal pengalaman magang di sektor perbankan, pelayanan industri kreatif, dan penyelesaian proyek riset teknologi canggih, saya adalah pribadi yang solutif, adaptif, dan siap memberikan hasil kerja terbaik.',
      educationTitle: 'Pendidikan',
      degree: 'Sarjana Komputer (S.Kom) - Teknik Informatika',
      university: 'Universitas Mercu Buana',
      gpa: 'IPK: 3.57 / 4.00',
      highlights: {
        solutive: 'Pribadi Solutif',
        solutiveDesc: 'Mampu menganalisis masalah teknis yang kompleks dan menemukan solusi yang efisien dan andal.',
        adaptive: 'Adaptif & Tangguh',
        adaptiveDesc: 'Cepat menyesuaikan diri dengan teknologi baru dan lingkungan kerja dinamis.',
        quality: 'Fokus Kualitas',
        qualityDesc: 'Berkomitmen penuh untuk memberikan hasil kerja terbaik yang rapi dan terdokumentasi dengan baik.',
      },
    },
    skills: {
      title: 'Keahlian & Alat Kerja',
      subtitle: 'Kumpulan keahlian teknis dan teknologi yang saya kuasai dan gunakan.',
      categories: {
        os: 'Sistem Operasi',
        networking: 'Jaringan & Cloud',
        programming: 'Pemrograman & Basis Data',
        general: 'Peralatan Umum',
      },
    },
    projects: {
      title: 'Proyek Teknis',
      subtitle: 'Eksplorasi proyek rekayasa sistem, jaringan, dan aplikasi yang dilengkapi simulasi interaktif.',
      demoButton: 'Buka Simulator Proyek',
      hideDemoButton: 'Tutup Simulator',
      techStackTitle: 'Teknologi & Alat',
      contributionsTitle: 'Kontribusi Utama',
      lb: {
        title: 'SDN Load Balancer',
        simTitle: 'Simulasi SDN Round-Robin Load Balancer',
        addTraffic: 'Kirim Paket Data',
        autoTraffic: 'Lalu Lintas Otomatis',
        servers: 'Status Server Backend',
        metrics: 'Metrik Jaringan',
        activeConn: 'Koneksi Aktif',
        cpuLoad: 'Beban CPU',
        status: 'Status Sistem',
        stable: 'Sistem Stabil',
        overloaded: 'Overload Terdeteksi!',
        btnStop: 'Hentikan',
        btnStart: 'Mulai',
        config: 'Konfigurasi Jaringan',
        roundRobinExplanation: 'Algoritma Round Robin mendistribusikan lalu lintas secara merata ke semua server aktif secara bergantian untuk mencegah overload pada satu server.',
      },
      pharmacy: {
        title: 'Aplikasi Manajemen Apotek',
        simTitle: 'Uji Coba Panel Apotek (Real-time)',
        searchPlaceholder: 'Cari obat...',
        addStock: 'Tambah Stok',
        quickSale: 'Transaksi Cepat',
        medName: 'Nama Obat',
        medStock: 'Stok',
        medPrice: 'Harga',
        outOfStock: 'Habis',
        lowStock: 'Stok Menipis',
        salesToday: 'Transaksi Hari Ini',
        alerts: 'Notifikasi Sistem',
        btnBuy: 'Jual / Kurangi',
        btnRestock: 'Restock',
        formTitle: 'Tambah Inventaris Baru',
        formName: 'Nama Obat',
        formQty: 'Jumlah Stok',
        formPrice: 'Harga (Rp)',
        formBtnAdd: 'Simpan ke Database',
      },
      ecommerce: {
        title: 'E-Commerce Platform',
        simTitle: 'Simulasi Transaksi & Live Query SQL Database',
        addToCart: 'Tambah Ke Keranjang',
        sqlLogTitle: 'Aktivitas Server & Log Query Oracle SQL (Real-time)',
        consolePlaceholder: 'Lakukan interaksi di toko untuk melihat log query basis data...',
        cartTitle: 'Keranjang Belanja',
        checkoutBtn: 'Lakukan Checkout',
        emptyCart: 'Keranjang kosong. Pilih produk di atas.',
        productsTitle: 'Katalog Produk',
      },
    },
    experience: {
      title: 'Pengalaman Profesional',
      subtitle: 'Riwayat kontribusi profesional dan magang kerja saya di berbagai industri.',
      orgTitle: 'Pengalaman Organisasi',
    },
    contact: {
      title: 'Hubungi Saya',
      subtitle: 'Silakan hubungi saya melalui kontak di bawah ini untuk berkolaborasi atau mendiskusikan peluang kerja.',
      infoTitle: 'Informasi Kontak',
      formTitle: 'Kirim Pesan',
      nameLabel: 'Nama Lengkap',
      emailLabel: 'Alamat Email',
      messageLabel: 'Isi Pesan',
      sendBtn: 'Kirim Pesan',
      successMsg: 'Pesan Anda berhasil dikirim secara lokal! Terima kasih.',
      copySuccess: 'Tersalin ke clipboard!',
    },
  },
  en: {
    header: {
      about: 'About Me',
      skills: 'Skills',
      projects: 'Technical Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello, I'm",
      role1: 'IT Support Specialist',
      role2: 'Network & Cloud Researcher',
      role3: 'Junior Developer',
      sub: 'Computer Science graduate focusing on Linux system administration, network infrastructure, cloud computing, and software development.',
      ctaProjects: 'View Projects',
      ctaContact: 'Get In Touch',
      availability: 'Available for Opportunities',
    },
    about: {
      title: 'About Me',
      subtitle: 'Let’s explore my academic background, motivation, and professional drive.',
      bioParagraph: 'I am a Computer Science graduate from Mercu Buana University with a GPA of 3.57/4.00. I have a strong passion and hands-on expertise in Linux system administration, network infrastructure, cloud computing, and application development. Equipped with internship experiences in the banking sector, creative industry customer services, and cutting-edge tech research projects, I am a highly resourceful, adaptive individual ready to deliver top-tier engineering solutions.',
      educationTitle: 'Education',
      degree: 'Bachelor of Computer Science (B.Kom) - Informatics',
      university: 'Mercu Buana University',
      gpa: 'GPA: 3.57 / 4.00',
      highlights: {
        solutive: 'Resourceful & Solutive',
        solutiveDesc: 'Able to analyze complex technical malfunctions and establish highly reliable, efficient workarounds.',
        adaptive: 'Adaptive & Resilient',
        adaptiveDesc: 'Quick to adjust to new technologies and excel in fast-paced collaborative workspaces.',
        quality: 'Quality Driven',
        qualityDesc: 'Deeply committed to providing highly clean, thoroughly documented, and structured results.',
      },
    },
    skills: {
      title: 'Skills & Tools',
      subtitle: 'A compilation of technical expertise and tooling I specialize in and utilize.',
      categories: {
        os: 'Operating Systems',
        networking: 'Networking & Cloud',
        programming: 'Programming & Databases',
        general: 'General Tools',
      },
    },
    projects: {
      title: 'Technical Projects',
      subtitle: 'Exploring systems engineering, networking, and software projects complete with interactive live previews.',
      demoButton: 'Launch Project Simulator',
      hideDemoButton: 'Close Simulator',
      techStackTitle: 'Tech Stack & Tools',
      contributionsTitle: 'Key Contributions',
      lb: {
        title: 'SDN Load Balancer',
        simTitle: 'SDN Round-Robin Load Balancer Simulation',
        addTraffic: 'Send Data Packet',
        autoTraffic: 'Automate Traffic',
        servers: 'Backend Servers Status',
        metrics: 'Network Metrics',
        activeConn: 'Active Connections',
        cpuLoad: 'CPU Load',
        status: 'System Status',
        stable: 'System Stable',
        overloaded: 'Overload Detected!',
        btnStop: 'Stop',
        btnStart: 'Start',
        config: 'Network Configuration',
        roundRobinExplanation: 'The Round Robin algorithm distributes incoming data packets sequentially across all active servers to ensure optimal resource sharing and prevent any single server crash.',
      },
      pharmacy: {
        title: 'Pharmacy Management App',
        simTitle: 'Interactive Pharmacy Dashboard Preview (Real-time)',
        searchPlaceholder: 'Search medicine...',
        addStock: 'Restock Item',
        quickSale: 'Quick Sell',
        medName: 'Medicine Name',
        medStock: 'Stock',
        medPrice: 'Price',
        outOfStock: 'Out of Stock',
        lowStock: 'Low Stock',
        salesToday: "Today's Sales",
        alerts: 'System Notifications',
        btnBuy: 'Sell / Dispense',
        btnRestock: 'Restock',
        formTitle: 'Add New Inventory Record',
        formName: 'Medicine Name',
        formQty: 'Initial Stock',
        formPrice: 'Price ($ / Rp)',
        formBtnAdd: 'Commit to Database',
      },
      ecommerce: {
        title: 'E-Commerce Platform',
        simTitle: 'Interactive Cart & Live Oracle SQL Transaction Logs',
        addToCart: 'Add to Cart',
        sqlLogTitle: 'Backend Controller & Oracle SQL Query Log (Real-time)',
        consolePlaceholder: 'Interact with the shop items above to generate relational database and PHP logs...',
        cartTitle: 'Shopping Cart',
        checkoutBtn: 'Execute Checkout',
        emptyCart: 'Cart is empty. Select products from the catalog.',
        productsTitle: 'Product Catalog',
      },
    },
    experience: {
      title: 'Professional Experience',
      subtitle: 'My journey of contributing to banking networks, customer operations, and technical teams.',
      orgTitle: 'Organizational Experience',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Feel free to contact me through the details below to discuss collaboration or career opportunities.',
      infoTitle: 'Contact Information',
      formTitle: 'Send a Message',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      messageLabel: 'Your Message',
      sendBtn: 'Send Message',
      successMsg: 'Your message was sent locally! Thank you for reaching out.',
      copySuccess: 'Copied to clipboard!',
    },
  },
};

export const technicalProjects = [
  {
    id: 'sdn-load-balancer',
    techStack: ['Ubuntu Linux', 'Mininet', 'Software-Defined Networking (SDN)', 'Python', 'Azure Cloud Infrastructure'],
    translations: {
      id: {
        title: 'Cloud Computing & SDN Load Balancer',
        category: 'Systems & Networking',
        description: 'Mengembangkan sistem load balancing berbasis algoritma Round Robin pada jaringan cloud computing untuk mengoptimalkan distribusi lalu lintas data dan mencegah kelancaran server dari overload.',
        contributions: [
          'Membangun dan mengonfigurasi topologi jaringan virtual menggunakan Mininet di lingkungan Ubuntu.',
          'Mengintegrasikan infrastruktur jaringan lokal dengan kontainer Azure Cloud untuk manajemen data hasil pengujian.',
          'Menulis skrip otomatisasi pengujian menggunakan Python untuk mengukur metrik performa sistem jaringan.'
        ]
      },
      en: {
        title: 'Cloud Computing & SDN Load Balancer',
        category: 'Systems & Networking',
        description: 'Developed a Round Robin-based load balancing system on a cloud computing network to optimize data traffic distribution and prevent server overload, ensuring seamless server performance.',
        contributions: [
          'Built and configured virtual network topologies using Mininet within an Ubuntu Linux environment.',
          'Integrated local network infrastructure with Azure Cloud containers for systematic testing data management.',
          'Wrote automated evaluation scripts in Python to measure and track key network performance metrics.'
        ]
      }
    }
  },
  {
    id: 'pharmacy-app',
    techStack: ['Java SE', 'OOP', 'Swing UI', 'Local SQLite Database'],
    translations: {
      id: {
        title: 'Aplikasi Manajemen Apotek (Desktop)',
        category: 'Desktop Software',
        description: 'Membangun aplikasi sistem informasi manajemen internal apotek untuk mengelola data obat, transaksi penjualan, dan laporan inventaris barang.',
        contributions: [
          'Merancang arsitektur aplikasi modular berbasis Object-Oriented Programming (OOP).',
          'Membuat antarmuka pengguna (UI) desktop yang fungsional dan intuitif untuk apoteker.',
          'Mengimplementasikan logika penanganan data stok obat dan pembukuan transaksi secara real-time.'
        ]
      },
      en: {
        title: 'Pharmacy Management Application (Desktop)',
        category: 'Desktop Software',
        description: 'Built an internal pharmacy management information system desktop application to handle drug records, track sales, and generate automated inventory reports.',
        contributions: [
          'Designed modular application architectures adhering strictly to Object-Oriented Programming (OOP) patterns.',
          'Created a highly functional and intuitive desktop graphical user interface (GUI) for daily pharmacy operations.',
          'Implemented relational database handling rules to process real-time stock deductions and sales logging.'
        ]
      }
    }
  },
  {
    id: 'ecommerce-platform',
    techStack: ['CodeIgniter Framework', 'PHP', 'Oracle SQL Database', 'Bootstrap', 'Web Standards'],
    translations: {
      id: {
        title: 'Platform E-Commerce (Web Application)',
        category: 'Web Application',
        description: 'Merancang dan mengembangkan website e-commerce interaktif untuk memfasilitasi proses belanja daring, katalog produk, dan manajemen transaksi.',
        contributions: [
          'Menyusun struktur basis data relasional menggunakan Oracle SQL untuk performa query yang tinggi.',
          'Mengimplementasikan framework MVC CodeIgniter PHP untuk mempercepat proses routing dan keamanan aplikasi.',
          'Merancang UI front-end yang ramah pengguna dengan integrasi sistem keranjang belanja dinamis.'
        ]
      },
      en: {
        title: 'E-Commerce Platform (Web Application)',
        category: 'Web Application',
        description: 'Designed and engineered an interactive e-commerce website to facilitate online shopping catalogs, user carts, and transactional management.',
        contributions: [
          'Structured scalable relational schemas using Oracle SQL with robust transaction controls.',
          'Implemented CodeIgniter MVC PHP framework to streamline application routing and improve site-wide security.',
          'Designed a highly user-friendly e-commerce storefront integrated with active basket processing capabilities.'
        ]
      }
    }
  }
];

export const professionalExperiences = [
  {
    id: 'brimen-bri',
    company: 'Bank BRI Kramat Jati',
    period: 'Februari 2022 – Mei 2022',
    translations: {
      id: {
        role: 'Internship BRIMEN',
        points: [
          'IT Maintenance: Melakukan pemeliharaan berkala pada perangkat komputer, jaringan kantor, dan memastikan stabilitas sistem transaksi elektronik.',
          'Technical Troubleshooting: Mendiagnosis dan memperbaiki kendala teknis ringan pada mesin EDC (Electronic Data Capture) perbankan agar layanan nasabah berjalan tanpa hambatan.',
          'Digitalization Support: Membantu proses digitalisasi pembukaan rekening nasabah serta memberikan edukasi menyeluruh mengenai fitur-fitur aplikasi BRImo.'
        ]
      },
      en: {
        role: 'IT & Digitalization Intern (BRIMEN)',
        points: [
          'IT Maintenance: Conducted scheduled diagnostics and hardware/software maintenance for office computers, local network appliances, and digital transaction hubs.',
          'Technical Troubleshooting: Diagnosed and resolved local network conflicts and hardware issues on banking EDC terminals, preventing customer queue delays.',
          'Digitalization Support: Assisted customers in digital onboarding for bank account setup, and conducted informational sessions on BRImo mobile app services.'
        ]
      }
    }
  },
  {
    id: 'dcost-foh',
    company: 'PT Pendekar Bodoh (D\'Cost Seafood)',
    period: 'April 2024 – April 2026',
    translations: {
      id: {
        role: 'Front of House (FOH) Service Crew',
        points: [
          'Sistem Operasional: Mengoperasikan sistem POS (Point of Sales) kasir untuk pemrosesan transaksi belanja konsumen secara cepat, akurat, dan aman.',
          'Komunikasi & Sales: Berhasil melakukan strategi up-selling produk menu andalan dan promosi harian yang berkontribusi langsung pada peningkatan omzet restoran.'
        ]
      },
      en: {
        role: 'Front of House (FOH) Service Crew',
        points: [
          'Operational Systems: Operated modern Point of Sales (POS) terminals to process customer food purchases rapidly, accurately, and securely.',
          'Communication & Sales: Successfully executed up-selling strategies for flagship menus and daily specials, contributing directly to restaurant revenue targets.'
        ]
      }
    }
  }
];

export const organizationalExperiences = [
  {
    id: 'umb-archery',
    organization: 'UMB Archery (Unit Kegiatan Mahasiswa)',
    period: 'Agustus 2019 – Juni 2022',
    translations: {
      id: {
        role: 'Anggota Divisi Teknis & Inventaris',
        points: [
          'Asset Management: Bertanggung jawab penuh terhadap pemeliharaan rutin, pendataan berkala, dan verifikasi kelayakan seluruh inventaris alat olahraga organisasi.',
          'Technical Setup: Mengelola persiapan teknis infrastruktur lapangan untuk simulasi latihan rutin mingguan maupun turnamen olahraga skala antar-universitas.'
        ]
      },
      en: {
        role: 'Technical & Inventory Division Member',
        points: [
          'Asset Management: Fully held accountability over routine audits, maintenance logs, and safety evaluations of all archery club equipment assets.',
          'Technical Setup: Managed local field layouts and logistical configurations for weekly practices as well as inter-university athletic tournaments.'
        ]
      }
    }
  }
];

export const skillCategories = [
  {
    id: 'os',
    translations: { id: { title: 'Sistem Operasi' }, en: { title: 'Operating Systems' } },
    skills: [
      { name: 'Linux (Ubuntu Server/Desktop)', level: 85, icon: 'terminal' },
      { name: 'Windows OS & Server', level: 90, icon: 'laptop' }
    ]
  },
  {
    id: 'networking',
    translations: { id: { title: 'Jaringan & Cloud' }, en: { title: 'Networking & Cloud' } },
    skills: [
      { name: 'Software-Defined Networking (SDN)', level: 80, icon: 'network' },
      { name: 'Mininet Network Simulation', level: 85, icon: 'cpu' },
      { name: 'Azure Cloud Infrastructure', level: 75, icon: 'cloud' },
      { name: 'TCP/IP, Routing & Switching', level: 85, icon: 'router' }
    ]
  },
  {
    id: 'programming',
    translations: { id: { title: 'Pemrograman & DB' }, en: { title: 'Programming & DB' } },
    skills: [
      { name: 'Python (Scripting & Automation)', level: 80, icon: 'code' },
      { name: 'Java (OOP & Desktop App)', level: 75, icon: 'coffee' },
      { name: 'PHP (CodeIgniter MVC)', level: 80, icon: 'globe' },
      { name: 'Oracle SQL & Relational DB', level: 85, icon: 'database' }
    ]
  },
  {
    id: 'general',
    translations: { id: { title: 'Peralatan & Lainnya' }, en: { title: 'Tools & General' } },
    skills: [
      { name: 'Git & Version Control', level: 80, icon: 'git-branch' },
      { name: 'POS (Point of Sales) Systems', level: 90, icon: 'credit-card' },
      { name: 'Microsoft Office (Word, Excel, PPT)', level: 95, icon: 'file-text' },
      { name: 'Hardware & EDC Troubleshooting', level: 85, icon: 'wrench' }
    ]
  }
];
