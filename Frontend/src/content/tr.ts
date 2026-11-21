import type { Content } from './types'
import { en } from './en'

/**
 * Türkçe içerik. Bağlantılar ve parça kimlikleri İngilizce sürümle ortaktır;
 * yalnızca metinler burada çevrilir.
 */
export const tr: Content = {
  meta: {
    title: 'Hasan Hüseyin Tayap · Yapay Zeka Mühendisi',
    description:
      'LLM ajanları ve bilgisayarlı görü sistemleri geliştiren, bunları canlıya taşıyan yapay zeka mühendisi. Eskişehir Teknik Üniversitesi Bilgisayar Mühendisliği mezunu.',
  },
  ui: {
    skipToContent: 'İçeriğe geç',
    themeToLight: 'Açık temaya geç',
    themeToDark: 'Koyu temaya geç',
    langLabel: 'Dil',
    present: 'Devam ediyor',
    private: 'Canlıda · kapalı kaynak',
    loadPlayer: 'Oynat',
    loadPlayerHint: 'Oynatıcı, müzik servisinden yüklenir',
    openOn: 'Dinle:',
    backToTop: 'Başa dön',
    languagesLabel: 'Diller',
    mainNav: 'Ana gezinme',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
  },
  nav: [
    { id: 'about', label: 'Hakkımda' },
    { id: 'focus', label: 'Ne yapıyorum' },
    { id: 'experience', label: 'Deneyim' },
    { id: 'work', label: 'Çalışmalar' },
    { id: 'stack', label: 'Teknolojiler' },
    { id: 'offduty', label: 'Mesai dışı' },
    { id: 'contact', label: 'İletişim' },
  ],
  hero: {
    eyebrow: 'Yapay zeka mühendisi · yeni fırsatlara açık',
    name: 'Hasan Hüseyin Tayap',
    roles: ['Yapay Zeka Mühendisi', 'Agentic AI Geliştiricisi', 'Bilgisayarlı Görü ve Endüstriyel YZ', 'Full Stack Geliştirici'],
    tagline:
      'LLM ajanları ve bilgisayarlı görü sistemleri kuruyorum; fabrika hattındaki PLC’den Google Cloud Run’a kadar, canlıya çıkana dek peşini bırakmıyorum.',
    primaryCta: { label: 'Neler yaptığıma bak', href: '#focus' },
    secondaryCta: { label: 'İletişime geç', href: '#contact' },
    chips: ['Ajanlar · RAG · değerlendirme', 'YOLO · OCR · anomali tespiti', 'Jetson Orin NX · uç cihaz', 'Docker · CI/CD · bulut'],
  },
  about: {
    title: 'Hakkımda',
    paragraphs: [
      'Yapay zekayı demo olarak değil, çalışan bir sistem olarak seviyorum. 2023’te Eskişehir Teknik Üniversitesi Bilgisayar Mühendisliği’nden mezun oldum; bugün bir şirketin iş geliştirme ekibinde yapay zeka mühendisiyim.',
      'İşe sanayi için sistemler yazarak başladım: PLC’lerle Modbus üzerinden konuşan yazılımlar, I/O kartları için arayüzler, üretim hattındaki hatalı parçayı bulan kameralar. Orada “neredeyse çalışıyor” diye bir şey yoktur; bu alışkanlığı LLM ajanlarına da taşıdım.',
      'Şimdi ihtiyacı bulmaktan canlıya almaya kadar işin tamamı bende: müşteri sorularını yanıtlayan asistanlar, içerik ve SEO için ajan ekipleri, süreçleri ve ERP’yi birbirine bağlayan çözümler. Uygulamalar Google Cloud Run’da çalışıyor.',
      'Üniversitede yazılım topluluğunu kurdum ve başkanlığını yaptım. Masadan kalkınca motosiklete biniyor, gün doğumunda fotoğraf çekiyor, gitar çalıyorum.',
    ],
    facts: [
      { label: 'Yaşadığım yer', value: 'Türkiye' },
      { label: 'Mezuniyet', value: 'Bilgisayar Mühendisliği, Eskişehir Teknik Üniversitesi, 2023' },
      { label: 'Çalıştığım alan', value: 'Yapay zeka mühendisliği ve iş geliştirme' },
    ],
    languages: [
      { name: 'Türkçe', level: 'Ana dil', score: 5 },
      { name: 'İngilizce', level: 'C1', score: 4 },
      { name: 'Almanca', level: 'A2', score: 2 },
    ],
  },
  visuals: {
    terminal: {
      title: 'ajanlar — demo çalıştırma',
      command: 'python run.py "özelliği teslim et"',
      steps: [
        { agent: 'planner', text: 'işi küçük adımlara böler' },
        { agent: 'researcher', text: 'dokümanları ve kod tabanını okur' },
        { agent: 'coder', text: 'değişikliği ve testlerini yazar' },
        { agent: 'reviewer', text: 'hedefe göre kontrol eder, bir düzeltme ister' },
      ],
      done: 'bitti: testler geçti, birleştirmeye hazır',
    },
    pipeline: {
      title: 'Kameradan panele',
      steps: [
        { label: 'Algıla', items: ['Kameralar', 'MJPEG akışları', 'PLC: Modbus TCP', 'Profinet / Siemens S7'], output: 'kareler · register’lar' },
        { label: 'Düşün', items: ['YOLO tespiti', 'Araç kullanan ajanlar', 'Anomali tespiti', 'PaddleOCR', 'Görü-dil modelleri'], output: 'kutular · metin · aksiyonlar' },
        { label: 'Sun', items: ['FastAPI', 'Uvicorn', 'WebSocket', 'Pydantic'], output: 'JSON · olaylar' },
        { label: 'Sakla', items: ['SQLite', 'MySQL', 'MS SQL Server'], output: 'satırlar' },
        { label: 'Göster', items: ['React + Vite', 'Flutter', 'React Native + Expo'], output: 'ekranlar' },
      ],
    },
  },
  focus: {
    title: 'Ne yapıyorum',
    intro: 'Modelden toplantı masasına kadar, birbirini tamamlayan beş alan.',
    areas: [
      {
        id: 'agents',
        title: 'LLM uygulamaları, ajanlar ve üretken yapay zeka',
        summary: 'İş tanımı olan ajanlar: araç çağırır, doğru dokümanı okur, ölçülür.',
        points: [
          'Tool ve function calling: kodu, API’leri ve veritabanlarını çağıran ajanlar',
          'RAG ve vektör veritabanları: doğru dokümanlara dayanan cevaplar',
          'Prompt ve bağlam mühendisliği, prompt optimizasyonu dahil',
          'Evals ve guardrail: bir ajanın ürettiğini ölçmek ve sınırlar içinde tutmak',
          'Çok ajanlı sistemler, metin ve video için üretken yapay zeka',
          'Sağlayıcılar: Claude, OpenAI, Gemini',
        ],
      },
      {
        id: 'vision',
        title: 'Bilgisayarlı görü ve uç cihazda yapay zeka',
        summary: 'Kamera karesinden hattaki karara, cihazın kendi üzerinde.',
        points: [
          'Nesne tespiti (YOLO), OCR (PaddleOCR), anomali tespiti ve görü-dil modelleri',
          'Kendi eğittiğim CNN modelleri, örneğin hata tespiti ve el yazısı rakam tanıma için',
          'Modbus TCP, Profinet ve Siemens S7 PLC’ler, MJPEG ve WebSocket üzerinden kamera akışları',
          'Modelleri bulutta değil, NVIDIA Jetson Orin NX üzerinde yerelde çalışacak şekilde optimize etmek',
        ],
      },
      {
        id: 'production',
        title: 'Canlıya alma',
        summary: 'Model, benim bilgisayarımın dışında çalışmaya başlayınca bitmiş sayılır.',
        points: [
          'Paketleme ve dağıtım için Docker',
          'GitHub Actions ile CI/CD',
          'Google Cloud Run’da uygulama çalıştırma, ayrıca AWS ve Azure',
          'Canlıya çıktıktan sonra izleme ve loglama',
          'pytest ve Playwright ile testler',
        ],
      },
      {
        id: 'backend',
        title: 'Arka uç ve uygulamalar',
        summary: 'Modelin etrafındaki her şey: API, veritabanı, ekran.',
        points: [
          'FastAPI ve SQLAlchemy ile Python servisleri',
          'MySQL, MS SQL Server ve SQLite',
          'React, Vite ve TypeScript arayüzleri',
          'Flutter ve React Native uygulamaları, Qt ve .NET masaüstü araçları',
        ],
      },
      {
        id: 'bizdev',
        title: 'İş geliştirme',
        summary: 'Tek satır kod yazmadan önce çözmeye değer sorunu bulmak.',
        points: [
          'Yapay zekanın bir şirkete gerçekten nerede fayda sağladığını bulmak: müşteri destek, pazarlama ve SEO, içerik',
          'ERP dahil iş geliştirme süreçlerini baştan sona yürütmek',
          'İş ihtiyacını kapsamı belli bir plana çevirmek',
          'Teslime kadar sürecin içinde kalmak, çünkü mühendislik tarafını da üstlenebiliyorum',
        ],
      },
    ],
  },
  experience: {
    title: 'Deneyim',
    intro: 'Endüstriyel otomasyondan LLM ajanlarına. Araçlar değişti, ölçü değişmedi: canlıda çalışacak.',
    jobs: [
      {
        role: 'Yapay Zeka Mühendisi',
        org: 'Çetin Family',
        period: 'Haz 2026 – Devam ediyor',
        kind: 'work',
        points: [
          'İş geliştirme ekibinde yapay zeka mühendisiyim: yapay zekanın insanların üzerinden tekrar eden işi nerede alabileceğini buluyor, kuruyor ve günlük kullanıma taşıyorum.',
          'Şimdiye kadar: müşteri sorularını yanıtlayan asistanlar, SEO ve içerik için ajan düzenleri ve yapay zeka destekli video üretimi. İş süreçlerini de ERP dahil baştan sona yürütüyorum.',
        ],
      },
      {
        role: 'Yapay Zeka Eğitim Uzmanı',
        org: 'Scale AI',
        period: 'Eyl 2024 – Oca 2026',
        kind: 'freelance',
        points: ['NLP ve bilgisayarlı görü görevlerinde yapay zeka modeli çıktılarını inceledim, düzelttim ve doğruladım.'],
      },
      {
        role: 'Yazılım ve Otomasyon Mühendisi',
        org: 'Bilginoğlu Makine',
        period: 'Şub 2025 – May 2025',
        kind: 'work',
        points: [
          'Üretim otomasyonu ve izleme için .NET ile masaüstü kalite kontrol uygulaması geliştirdim.',
          'PLC programlama, ladder logic, endüstriyel haberleşme ve otomasyon iş akışlarında sahada çalıştım.',
          'Elektrik ve elektronik sistemlerle çalışarak gerçek endüstriyel projelerde yazılımla donanım arasında köprü kurdum.',
        ],
      },
      {
        role: 'Yazılım Mühendisi',
        org: 'Inovako',
        period: 'Ağu 2024 – Oca 2025',
        kind: 'work',
        points: [
          'Endüstriyel süreçler için yapay zeka ve bilgisayarlı görü tabanlı anomali tespiti ve kalite kontrol geliştirdim.',
          'Linux’ta Python ve Modbus ile otomasyon ve veri alışverişi için PLC haberleşmesini kurdum.',
          'Görüntü işleme ve kusur tespiti için gerçek zamanlı bilgisayarlı görü sistemleri yaptım.',
          'React arayüzleri ve ölçeklenebilir arka uç servisleriyle full stack uygulamalar geliştirdim.',
        ],
      },
      {
        role: 'Yazılım Mühendisi',
        org: 'Event Gates',
        period: 'Ağu 2023 – Haz 2024',
        kind: 'work',
        points: [
          'Otomasyon sistemlerindeki I/O kartlarını izleyip kontrol etmek için Python/Qt masaüstü arayüzleri geliştirdim.',
          'Linux’ta otomatik durum kontrolleri ve e-posta bildirimleri olan bir sistem sağlığı izleme API’si yaptım.',
          'Açık kaynak anomali tespiti çözümlerini gerçek zamanlı kullanım için entegre edip optimize ettim.',
        ],
      },
      {
        role: 'Yapay Zeka Stajyeri',
        org: 'Anot Group',
        period: 'Ağu 2022 – Eyl 2022',
        kind: 'intern',
        points: [
          'Düzensiz desenleri ve kusurları bulan bir derin öğrenme anomali tespit sistemi yaptım, buna görüntü işleme ve CNN ile hatalı fırın düğmelerini tespit eden proje de dahil.',
          'PLC temellerini öğrendim: kontrol mantığı ve endüstriyel otomasyonun temelleri.',
        ],
      },
      {
        role: 'Oyun Geliştirici Stajyeri',
        org: 'Tunga Games',
        period: 'Tem 2022 – Ağu 2022',
        kind: 'intern',
        points: ['Unity ile oynanış, optimizasyon ve kullanıcı deneyimine odaklanan hyper-casual mobil oyunlar geliştirdim.'],
      },
    ],
  },
  education: {
    title: 'Eğitim ve topluluklar',
    schools: [
      {
        school: 'Eskişehir Teknik Üniversitesi',
        degree: 'Bilgisayar Mühendisliği Lisans',
        period: '2019 – 2023',
        status: 'Mezun, 2023',
        highlights: [
          'ESTÜ Yazılım Topluluğu’nu kurdum ve başkanlığını yaptım',
          'TÜBİTAK destekli bir yapay zeka projesi geliştirdim: görüntü işleme ve CNN ile toprak besin değeri tespiti',
          'Derin öğrenme dersi projeleri, gerçek zamanlı el yazısı rakam tanıma dahil',
        ],
      },
      {
        school: 'Tofaş Fen Lisesi',
        degree: 'Fen lisesi',
        status: 'Mezun',
      },
    ],
    communitiesTitle: 'Topluluklar',
    communities: [
      { name: 'ESTÜ Yazılım Topluluğu', role: 'Kurucu ve başkan', period: 'Eki 2022 – Eyl 2023' },
      { name: 'Global AI Hub', role: 'Üye', period: 'Mar 2022 – Ağu 2023' },
      { name: 'ESTÜ İHA', role: 'Yazılım ekibi üyesi', period: 'Eki 2022 – Oca 2023' },
      { name: 'ESTÜ Sivil Havacılık Topluluğu', role: 'Üye', period: 'Oca 2022 – Eki 2022' },
    ],
    academicProjectsTitle: 'Akademik projeler',
    academicProjects: [
      {
        name: 'Toprak Test Cihazı',
        text: 'Görüntü işleme ve CNN ile toprak besin değerlerini tespit eden, TÜBİTAK destekli bir yapay zeka projesi.',
      },
      {
        name: 'Gerçek Zamanlı El Yazısı Rakam Tanıma',
        text: 'Derin Öğrenmeye Giriş dersinde yapılan, el yazısı rakamları gerçek zamanlı ve çizimden tanıyan bir derin öğrenme projesi.',
      },
    ],
  },
  privateWork: {
    title: 'Canlıda çalışan, kodunu paylaşamadığım projeler',
    intro: 'Burada anlattıklarım hayali değil; işyerinde geliştirdiğim ve canlıya aldığım gerçek projeler. Müşteriye ait oldukları için kod ya da ekran görüntüsü paylaşamıyorum, ama ne yaptığımı ve nasıl yaptığımı bir görüşmede ayrıntısıyla anlatırım.',
    projects: [
      {
        title: 'Müşteri ekipleri için soru-cevap asistanları',
        text: 'Online pazaryeri gibi kanallardan gelen soruları okuyup doğru, tutarlı ve nazik cevaplar hazırlayan asistanlar. Ekibin tekrar eden yükü hafifliyor, insanlar da gerçekten özen isteyen konulara daha çok vakit ayırabiliyor.',
        tags: ['LLM', 'Müşteri deneyimi'],
      },
      {
        title: 'İçerik ve pazarlama için ajan ekipleri',
        text: 'Birbirini tamamlayan ajanların yan yana çalıştığı düzenler: SEO analizinden tanıtım filmi üretimine, ilk fikirden teslime hazır bir sonuca kadar işi adım adım ilerletiyorlar.',
        tags: ['Çok ajanlı', 'Üretken YZ'],
      },
      {
        title: 'İş süreçleri ve ERP çözümleri',
        text: 'Bir şirketin günlük iş akışlarında işlerin tıkandığı yerleri bulup bunları ERP ile bağlantılı çözümlere dönüştürüyorum. İhtiyacın tespitinden canlıya almaya kadar baştan sona ben yürütüyorum; uygulamalar Google Cloud Run’da çalışıyor.',
        tags: ['ERP', 'Süreç otomasyonu'],
      },
    ],
  },
  publicWork: {
    title: 'Kodu açık projeler',
    intro: 'Kodunu okuyup kendi bilgisayarında çalıştırabileceğin, daha küçük projeler. Her birinin README dosyası, testleri ve kendi reposu var.',
    linkLabel: 'Koda bak',
    projects: [
      {
        title: 'Defect Detection using Deep Learning',
        text: 'Metal düğme fotoğraflarını sağlam ve kusurlu diye ayıran bir CNN. Ölçümler, grafikler ve bir komut satırı aracı var.',
        tags: en.publicWork.projects[0].tags,
        href: en.publicWork.projects[0].href,
      },
      {
        title: 'Realtime Handwritten Digit Recognition',
        text: 'MNIST üzerinde eğitilmiş, test rakamlarında %99,1 başarıya ulaşan bir CNN. Fareyle rakam çiz, kameraya bir rakam göster ya da resim dosyası ver.',
        tags: en.publicWork.projects[1].tags,
        href: en.publicWork.projects[1].href,
      },
      {
        title: 'Denpointment',
        text: 'Flask ile yazılmış bir diş randevu sistemi; asıl yazarıyla ortak bir proje. Fork sonrası arka ucu katmanlara böldüm, arayüzü yeniden yaptım, testleri ve kullanım kılavuzunu ekledim.',
        tags: en.publicWork.projects[2].tags,
        href: en.publicWork.projects[2].href,
      },
    ],
  },
  stack: {
    title: 'Teknolojiler',
    groups: [
      { name: 'LLM ve ajanlar', items: en.stack.groups[0].items },
      { name: 'ML ve görü', items: en.stack.groups[1].items },
      { name: 'Arka uç ve veri', items: en.stack.groups[2].items },
      { name: 'Arayüz, mobil ve oyun', items: en.stack.groups[3].items },
      { name: 'Bulut, DevOps ve test', items: en.stack.groups[4].items },
    ],
  },
  music: {
    title: 'Mesai dışı',
    intro: 'Gitar çalıp şarkı söylüyorum. Single’lar ve cover’lar Spotify, Apple Music, YouTube Music ve YouTube’da.',
    tracks: en.music.tracks,
    platforms: en.music.platforms,
  },
  ride: {
    title: 'Yolda',
    text: 'Motosikletle çıktığım yolculukları ve yol boyunca yakaladığım anları paylaşıyorum: kısa kaçamaklar, uzun rotalar ve çok sayıda gün doğumu.',
    instagram: en.ride.instagram,
    photography: {
      title: 'Objektifin arkasında',
      text: 'Doğa ve manzara fotoğrafları çekiyorum; ışığın en yumuşak olduğu gün doğumu ve gün batımı beni en çok çeken anlar.',
      link: en.ride.photography.link,
    },
  },
  contact: {
    title: 'Konuşalım',
    text: 'Yeni fırsatlara ve projelere açığım: yapay zeka ajanları, bilgisayarlı görü ya da ikisi birden, bir ekipte ya da kendi ürününde. Bana en hızlı LinkedIn’den ulaşırsın. Kodlar GitHub’da.',
    links: en.contact.links,
  },
}
