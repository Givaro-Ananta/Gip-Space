export const projects = [
    {
        title: "Dashboard Analisis Gaji",
        description:
            "Dashboard ini dibuat untuk menampilkan analisis gaji di sebuah kantor pemerintah provinsi Lampung tahun 2025.",
        image: "/porto-1.png",
        tags: ["Python", "Streamlit", "Data Analysis", "Data Analyst"],
        liveUrl: "#",
        longDescription:
            "Dashboard interaktif untuk visualisasi dan analisis data penggajian pegawai negeri di lingkungan pemerintah provinsi Lampung tahun 2025. Proyek ini memvisualisasikan data anggaran belanja pegawai secara transparan guna membantu instansi dinas dalam memantau tren pengeluaran daerah secara efisien.",
        features: [
            "📊 Visualisasi total pengeluaran gaji bulanan secara real-time.",
            "🔍 Pencarian & filter interaktif berdasarkan golongan pangkat, jenis jabatan, dan instansi dinas.",
            "📈 Analisis tren kenaikan gaji berkala tahunan.",
            "💼 Breakdown detail tunjangan jabatan, tunjangan keluarga, dan tunjangan fungsional."
        ],
        techStackDetailed: {
            frontend: [
                { name: "Streamlit", version: "1.x", function: "Framework Visualisasi UI" },
                { name: "Matplotlib & Seaborn", version: "—", function: "Pustaka Visualisasi Grafis" }
            ],
            backend: [
                { name: "Python", version: "3.x", function: "Bahasa Pemrograman Utama" },
                { name: "Pandas", version: "—", function: "Manipulasi & Pembersihan Data" }
            ]
        },
        pipeline: null
    },
    {
        title: "Text Feedback Sentiment Analyzer",
        description:
            "Memanfaatkan NLP untuk mendeteksi kepuasan dengan memanfaatkan ulasan pelanggan menggunakan model Machine Learning Naive Bayes.",
        image: "/porto-2.png",
        tags: ["Python", "React", "NLP", "Naive Bayes", "Machine Learning", "Data Scientist"],
        liveUrl: "https://nlp-project-chi.vercel.app/",
        githubUrl: "#",
        longDescription:
            "Aplikasi web analitik sentimen berbasis NLP (Natural Language Processing) untuk mendeteksi tingkat kepuasan pelanggan secara instan. Menggunakan model klasifikasi Machine Learning Naive Bayes yang dilatih dengan teks ulasan pelanggan untuk mengategorikan respons ke dalam kategori Positif, Negatif, atau Netral.",
        features: [
            "📝 Input ulasan teks secara langsung untuk prediksi sentimen instan.",
            "📊 Visualisasi grafik sebaran skor sentimen (Positif, Netral, Negatif).",
            "🧪 Word Cloud generator untuk menampilkan kata kunci terpopuler dari ulasan.",
            "📈 Grafik tren fluktuasi kepuasan pelanggan dari waktu ke waktu."
        ],
        techStackDetailed: {
            frontend: [
                { name: "React.js", version: "18", function: "Library UI Interaktif" },
                { name: "CSS (Vanilla)", version: "—", function: "Styling layout & komponen" }
            ],
            backend: [
                { name: "Python", version: "3.x", function: "Training model ML & Preprocessing NLP" },
                { name: "Scikit-Learn", version: "—", function: "Pelatihan algoritma Naive Bayes" },
                { name: "NLTK", version: "—", function: "Tokenisasi & pembersihan teks (NLP)" },
                { name: "Flask / FastAPI", version: "—", function: "Pembuatan API Model Machine Learning" }
            ]
        },
        pipeline: null
    },
    {
        title: "Fire & Smoke Detection",
        description:
            "Sistem deteksi api dan asap secara real-time menggunakan YOLOv8 deep learning model, dengan backend FastAPI dan frontend web berbasis kamera.",
        image: "/porto-3.png",
        tags: ["Python", "JavaScript", "FastAPI", "React", "YOLOv8", "Deep Learning", "AI Engineer"],
        liveUrl: "https://fire-smoke-detection-xi.vercel.app/",
        longDescription:
            "Sistem Vision AI canggih berbasis Deep Learning yang melatih model deteksi objek YOLOv8 untuk mengenali indikasi kebakaran (api dan asap) secara real-time. Memanfaatkan feed dari kamera CCTV / webcam lokal, sistem mengirimkan sinyal deteksi instan untuk meminimalkan keterlambatan penanganan bencana.",
        features: [
            "📹 Deteksi api & asap real-time dari kamera live feed atau file video.",
            "⚡ Latensi minimal dengan throughput FPS (Frames Per Second) tinggi.",
            "🚨 Bounding box pelacak otomatis beserta persentase kecocokan model (confidence score).",
            "🐳 Dockerized environment untuk kemudahan deployment lintas server."
        ],
        techStackDetailed: {
            frontend: [
                { name: "HTML5 & CSS3", version: "—", function: "Struktur & layout interface" },
                { name: "JavaScript", version: "—", function: "Penanganan video stream & event listener" }
            ],
            backend: [
                { name: "Python", version: "3.9+", function: "Training deep learning & backend logic" },
                { name: "YOLOv8 (Ultralytics)", version: "8.x", function: "Model arsitektur deteksi objek" },
                { name: "FastAPI", version: "—", function: "Server backend streaming video frame-by-frame" },
                { name: "Docker", version: "—", function: "Kontainerisasi aplikasi & environment" }
            ]
        },
        pipeline: null
    },
    {
        title: "Dashboard Penjualan Apotek",
        description:
            "Dashboard analitik interaktif berbasis web untuk visualisasi data penjualan apotek di Indonesia selama tahun 2015, mencakup lebih dari 500.000 transaksi detail obat.",
        image: "/porto-4.png",
        tags: ["Next.js", "TypeScript", "Python", "Recharts"],
        liveUrl: "https://dashboard-penjualan-apotek-tahun-20.vercel.app/",
        githubUrl: "https://github.com/Givaro-Ananta/Dashboard-penjualan-apotek-tahun-2015.git",
        longDescription:
            "Dashboard analitik interaktif berbasis web untuk visualisasi data penjualan apotek di Indonesia selama periode Januari – Desember 2015. Sistem mengolah data mentah sebesar ~70MB SQL dump (511.000+ baris transaksi) menggunakan pipeline pemrosesan data ETL Python, kemudian menyajikannya ke dalam visualisasi dinamis berbasis Next.js untuk menganalisis performa bisnis apotek.",
        features: [
            "📈 Performa Keuangan — Tren pendapatan bulanan, total omzet, akumulasi margin keuntungan, serta rata-rata nilai resep.",
            "💊 Analisis Produk — Menampilkan Top 10 produk obat terlaris berdasarkan qty/nilai jual, sebaran kategori obat, serta analisis margin per produk.",
            "👨‍⚕️ Analisis Dokter — Peringkat performa resep per dokter beserta nilai rata-rata resep yang ditulis.",
            "⏰ Waktu Sibuk (Peak Hours) — Heatmap transaksi per hari dalam seminggu dan sebaran transaksi per jam operasional apotek.",
            "🔄 Pipeline ETL Visual — Flowchart interaktif yang menjelaskan tahapan ETL dari database mentah ke file JSON dashboard."
        ],
        techStackDetailed: {
            frontend: [
                { name: "Next.js", version: "15", function: "Framework React & Routing" },
                { name: "TypeScript", version: "5", function: "Type safety & Stabilitas kode" },
                { name: "Recharts", version: "2.x", function: "Library visualisasi grafik interaktif" },
                { name: "CSS (Vanilla)", version: "—", function: "Styling antarmuka kustom yang efisien" }
            ],
            backend: [
                { name: "Python", version: "3.9+", function: "Preprocessing & scripting analisis data" },
                { name: "Pandas", version: "—", function: "Manipulasi data skala besar (500.000+ baris)" },
                { name: "SQLAlchemy", version: "—", function: "Koneksi database MariaDB & eksekusi query" },
                { name: "Jupyter Notebook", version: "—", function: "Eksplorasi data & prototyping pipeline ETL" }
            ]
        },
        pipeline: [
            "1. Import & Strukturisasi: Parsing file sales.sql (~70MB) dan memetakan relasi antar tabel (ms_product, ms_sales, det_sales).",
            "2. Data Cleaning: Menangani kuantitas negatif (retur obat) dengan flag is_return, menormalkan format NO_RESEP, dan menandai obat harga 0.",
            "3. Feature Engineering: Ekstraksi tahun/bulan/hari/nama hari, kalkulasi margin keuntungan per item, dan klasifikasi jenis transaksi (Rawat Jalan, Rawat Inap, Bebas, dll).",
            "4. Agregasi & Export: Agregasi per dimensi waktu, produk, dokter, dan waktu sibuk ke file JSON siap saji di folder output/.",
            "5. Visualisasi Dashboard: Loading data JSON ke frontend Next.js + Recharts untuk grafik interaktif yang responsif."
        ]
    },
    {
        title: "Satria Data 2026 — Forecasting Harga Pangan",
        description:
            "Time series analysis and forecasting of Indonesian food commodity prices using SARIMA, ETS, and Prophet, with an interactive dashboard (submission untuk kompetisi Satria Data 2026)",
        image: "/porto-5.png",
        tags: ["Next.js", "FastAPI", "Python", "Prophet"],
        liveUrl: "https://satria-data-2026.vercel.app",
        githubUrl: "https://github.com/Givaro-Ananta/Satria-Data-2026.git",
        longDescription:
            "Proyek ini merupakan submission untuk kompetisi Satria Data 2026, berfokus pada analisis deret waktu dan peramalan harga 11 komoditas pangan strategis di Indonesia untuk periode 2026-2045. Menggunakan tiga model forecasting utama (SARIMA, ETS, dan Prophet) serta menyediakan dashboard interaktif untuk simulasi skenario secara real-time.",
        features: [
            "📈 Forecasting Jangka Panjang — Prediksi harga pangan 2026–2030 (menengah) hingga 2031–2045 (3 skenario: baseline, optimistis, pesimistis).",
            "💻 Retraining Real-time — Dashboard interaktif untuk simulasi skenario kustom dengan memasukkan data tambahan atau unggah file CSV.",
            "📊 Composite Food Price Index (CFPI) — Indeks gabungan harga pangan untuk melihat tren inflasi pangan nasional secara agregat.",
            "🔍 Analisis Tren Otomatis — Interpretasi naratif otomatis mengenai arah pergerakan harga dan laju perubahan.",
            "📱 Tampilan Responsif — Antarmuka modern yang ramah pengguna baik di desktop maupun perangkat mobile."
        ],
        techStackDetailed: {
            frontend: [
                { name: "Next.js", version: "16", function: "Framework Web & Interface Utama" },
                { name: "Tailwind CSS", version: "4.x", function: "Styling layout & komponen" },
                { name: "Chart.js", version: "4.x", function: "Visualisasi Grafik Deret Waktu" }
            ],
            backend: [
                { name: "FastAPI", version: "—", function: "Server API & Event Retraining" },
                { name: "Python", version: "3.x", function: "Bahasa Pemrograman Utama" },
                { name: "Prophet (Meta)", version: "—", function: "Model Peramalan Berbasis Additive" },
                { name: "Statsmodels", version: "—", function: "Library Modeling SARIMA & ETS" }
            ]
        },
        pipeline: [
            "1. Eksplorasi Data (EDA): Menganalisis pola musiman, tren, dan menguji stasioneritas data historis menggunakan ADF & KPSS Test.",
            "2. Preprocessing & Pembersihan: Melakukan interpolasi nilai hilang, rekonstruksi data 2024-2026, penanganan outlier, serta data differencing.",
            "3. Modeling & Evaluasi: Membangun model SARIMA, ETS, dan Prophet per komoditas, lalu memilih model terbaik dengan nilai MAPE terkecil.",
            "4. Proyeksi Skenario & Indeks: Membuat simulasi 3 skenario jangka panjang (sampai 2045) dan menghitung Composite Food Price Index (CFPI).",
            "5. Integrasi Dashboard: Menyediakan visualisasi dinamis Next.js yang terhubung dengan API FastAPI untuk retraining on-the-fly."
        ]
    }
]
