import type { Content } from './types'

export const en: Content = {
  meta: {
    title: 'Hasan Hüseyin Tayap · AI Engineer',
    description:
      'AI engineer building LLM agents and computer vision systems, and taking them to production. Computer engineering graduate of Eskişehir Technical University.',
  },
  ui: {
    skipToContent: 'Skip to content',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    langLabel: 'Language',
    present: 'Present',
    private: 'Live · closed source',
    loadPlayer: 'Play',
    loadPlayerHint: 'Loads the player from the streaming service',
    openOn: 'Listen on',
    backToTop: 'Back to top',
    languagesLabel: 'Languages',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'focus', label: 'What I do' },
    { id: 'experience', label: 'Experience' },
    { id: 'work', label: 'Work' },
    { id: 'stack', label: 'Stack' },
    { id: 'offduty', label: 'Off duty' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'AI engineer · open to new opportunities',
    name: 'Hasan Hüseyin Tayap',
    roles: ['AI Engineer', 'Agentic AI Developer', 'Computer Vision & Industrial AI', 'Full Stack Developer'],
    tagline:
      'I build LLM agents and computer vision systems, and I stay with them until they run in production: from a PLC on a factory line to Google Cloud Run.',
    primaryCta: { label: 'See what I do', href: '#focus' },
    secondaryCta: { label: 'Get in touch', href: '#contact' },
    chips: ['Agents · RAG · evals', 'YOLO · OCR · anomaly detection', 'Jetson Orin NX · edge', 'Docker · CI/CD · cloud'],
  },
  about: {
    title: 'About',
    paragraphs: [
      'I like AI as a working system, not a demo. I graduated in Computer Engineering from Eskişehir Technical University in 2023, and today I am the AI engineer in a company’s business development team.',
      'I started out building systems for industry: software that talks to PLCs over Modbus, interfaces for I/O cards, cameras that find the defective part on a production line. On a line there is no such thing as “almost working”, and I brought that habit to LLM agents.',
      'Now I own the whole job, from finding the need to putting it live: assistants that answer customer questions, agent teams for content and SEO, and solutions that connect processes and the ERP. The apps run on Google Cloud Run.',
      'At university I founded the software community and served as its president. Away from the desk I ride my motorcycle, photograph sunrises and play guitar.',
    ],
    facts: [
      { label: 'Based in', value: 'Türkiye' },
      { label: 'Graduated', value: 'B.Sc. Computer Engineering, Eskişehir Technical University, 2023' },
      { label: 'Working in', value: 'AI engineering and business development' },
    ],
    languages: [
      { name: 'Turkish', level: 'Native', score: 5 },
      { name: 'English', level: 'C1', score: 4 },
      { name: 'German', level: 'A2', score: 2 },
    ],
  },
  visuals: {
    terminal: {
      title: 'agents — demo run',
      command: 'python run.py "ship the feature"',
      steps: [
        { agent: 'planner', text: 'breaks the task into small steps' },
        { agent: 'researcher', text: 'reads the docs and the codebase' },
        { agent: 'coder', text: 'writes the change and its tests' },
        { agent: 'reviewer', text: 'checks it against the goal, asks for one fix' },
      ],
      done: 'done: tests pass, ready to merge',
    },
    pipeline: {
      title: 'From camera to dashboard',
      steps: [
        { label: 'Sense', items: ['Cameras', 'MJPEG streams', 'PLC: Modbus TCP', 'Profinet / Siemens S7'], output: 'frames · registers' },
        { label: 'Think', items: ['YOLO detection', 'Agents with tools', 'Anomaly detection', 'PaddleOCR', 'Vision-language models'], output: 'boxes · text · actions' },
        { label: 'Serve', items: ['FastAPI', 'Uvicorn', 'WebSocket', 'Pydantic'], output: 'JSON · events' },
        { label: 'Store', items: ['SQLite', 'MySQL', 'MS SQL Server'], output: 'rows' },
        { label: 'Show', items: ['React + Vite', 'Flutter', 'React Native + Expo'], output: 'views' },
      ],
    },
  },
  focus: {
    title: 'What I do',
    intro: 'Five areas that fit together, from the model all the way to the meeting room.',
    areas: [
      {
        id: 'agents',
        title: 'LLM applications, agents & generative AI',
        summary: 'Agents with a job description: they call tools, read the right documents and get measured.',
        points: [
          'Tool and function calling: agents that call code, APIs and databases',
          'RAG and vector databases: answers grounded in the right documents',
          'Prompt and context engineering, including prompt optimization',
          'Evals and guardrails: measuring what an agent produces and keeping it inside limits',
          'Multi-agent systems and generative AI for text and video',
          'Providers: Claude, OpenAI, Gemini',
        ],
      },
      {
        id: 'vision',
        title: 'Computer vision & edge AI',
        summary: 'From a camera frame to a decision on the line, running on the device itself.',
        points: [
          'Object detection (YOLO), OCR (PaddleOCR), anomaly detection and vision-language models',
          'CNN models I train myself, for example for defect detection and handwritten digit recognition',
          'Modbus TCP, Profinet and Siemens S7 PLCs, camera streams over MJPEG and WebSocket',
          'Optimizing models to run locally on NVIDIA Jetson Orin NX instead of in the cloud',
        ],
      },
      {
        id: 'production',
        title: 'Production',
        summary: 'A model is only finished when it runs somewhere other than my laptop.',
        points: [
          'Docker for packaging and deploying',
          'CI/CD with GitHub Actions',
          'Running apps on Google Cloud Run, plus AWS and Azure',
          'Monitoring and logging once it is live',
          'Tests with pytest and Playwright',
        ],
      },
      {
        id: 'backend',
        title: 'Backend & apps',
        summary: 'Everything around the model: the API, the database, the screen.',
        points: [
          'Python services with FastAPI and SQLAlchemy',
          'MySQL, MS SQL Server and SQLite',
          'React, Vite and TypeScript interfaces',
          'Flutter and React Native apps, Qt and .NET desktop tools',
        ],
      },
      {
        id: 'bizdev',
        title: 'Business development',
        summary: 'Finding the problem worth solving before writing a line of code.',
        points: [
          'Finding where AI actually helps a company: customer support, marketing and SEO, content',
          'Handling business development processes end to end, including the ERP',
          'Turning a business need into a scoped plan',
          'Staying close until delivery, because I can take care of the engineering side too',
        ],
      },
    ],
  },
  experience: {
    title: 'Experience',
    intro: 'From industrial automation to LLM agents. The tools changed, the standard did not: it has to work in production.',
    jobs: [
      {
        role: 'Artificial Intelligence Engineer',
        org: 'Çetin Family',
        period: 'Jun 2026 – Present',
        kind: 'work',
        points: [
          'AI engineer in the business development team: I find where AI can take repetitive work off people, build it and carry it into daily use.',
          'Built so far: assistants that answer customer questions, agent setups for SEO and content, and AI-assisted video production. I also look after business processes end to end, including the ERP.',
        ],
      },
      {
        role: 'AI Training Expert',
        org: 'Scale AI',
        period: 'Sep 2024 – Jan 2026',
        kind: 'freelance',
        points: ['Reviewed, corrected and validated AI model outputs across NLP and computer vision tasks.'],
      },
      {
        role: 'Software & Automation Engineer',
        org: 'Bilginoğlu Makine',
        period: 'Feb 2025 – May 2025',
        kind: 'work',
        points: [
          'Built a .NET desktop quality control application for production automation and monitoring.',
          'Hands-on work with PLC programming, ladder logic, industrial communication and automation workflows.',
          'Worked on electrical and electronic systems, bridging software and hardware in real industrial projects.',
        ],
      },
      {
        role: 'Software Engineer',
        org: 'Inovako',
        period: 'Aug 2024 – Jan 2025',
        kind: 'work',
        points: [
          'Developed AI and computer vision based anomaly detection and quality control for industrial processes.',
          'Implemented PLC communication with Python and Modbus on Linux for automation and data exchange.',
          'Built real-time computer vision systems for image processing and defect detection.',
          'Developed full-stack applications with React frontends and scalable backend services.',
        ],
      },
      {
        role: 'Software Engineer',
        org: 'Event Gates',
        period: 'Aug 2023 – Jun 2024',
        kind: 'work',
        points: [
          'Developed Python/Qt desktop interfaces for monitoring and controlling I/O cards in automation systems.',
          'Built a system health monitoring API with automated status checks and email notifications on Linux.',
          'Integrated and optimized open-source anomaly detection solutions for real-time applications.',
        ],
      },
      {
        role: 'Artificial Intelligence Intern',
        org: 'Anot Group',
        period: 'Aug 2022 – Sep 2022',
        kind: 'intern',
        points: [
          'Built a deep learning anomaly detection system that finds irregular patterns and defects, including a project that detects defective oven buttons with image processing and a CNN.',
          'Learned PLC fundamentals: control logic and industrial automation basics.',
        ],
      },
      {
        role: 'Game Developer Intern',
        org: 'Tunga Games',
        period: 'Jul 2022 – Aug 2022',
        kind: 'intern',
        points: ['Developed hyper-casual mobile games with Unity, focused on gameplay, optimization and user experience.'],
      },
    ],
  },
  education: {
    title: 'Education & community',
    schools: [
      {
        school: 'Eskişehir Technical University',
        degree: 'B.Sc. Computer Engineering',
        period: '2019 – 2023',
        status: 'Graduated 2023',
        highlights: [
          'Founded the ESTÜ Software Community and served as its president',
          'Built a TÜBİTAK-supported AI project: soil nutrient detection with image processing and a CNN',
          'Deep learning coursework, including real-time handwritten digit recognition',
        ],
      },
      {
        school: 'Tofaş Science High School',
        degree: 'Science high school',
        status: 'Graduated',
      },
    ],
    communitiesTitle: 'Communities',
    communities: [
      { name: 'ESTÜ Software Community', role: 'Founder & president', period: 'Oct 2022 – Sep 2023' },
      { name: 'Global AI Hub', role: 'Member', period: 'Mar 2022 – Aug 2023' },
      { name: 'ESTÜ UAV', role: 'Software crew member', period: 'Oct 2022 – Jan 2023' },
      { name: 'ESTÜ Civil Aviation Community', role: 'Member', period: 'Jan 2022 – Oct 2022' },
    ],
    academicProjectsTitle: 'Academic projects',
    academicProjects: [
      {
        name: 'Soil Tester',
        text: 'An AI project supported by TÜBİTAK that detects soil nutrients with image processing and a CNN.',
      },
      {
        name: 'Realtime Handwritten Digit Recognition',
        text: 'A deep learning project from the Introduction to Deep Learning course that recognizes handwritten digits in real time and from drawings.',
      },
    ],
  },
  privateWork: {
    title: 'Projects that run in production, code I can’t share',
    intro: 'What I describe here is not hypothetical: these are real projects I built and took live at work. They belong to the client, so I can’t share code or screenshots, but I am happy to walk through what I did and how in an interview.',
    projects: [
      {
        title: 'Question-answering assistants for customer teams',
        text: 'Assistants that read the questions coming in from channels like online marketplaces and prepare accurate, consistent and kind replies. The team’s repetitive load gets lighter, and people have more time for the cases that deserve real care.',
        tags: ['LLM', 'Customer experience'],
      },
      {
        title: 'Agent teams for content and marketing',
        text: 'Setups where agents complement each other and work side by side: from SEO analysis to producing promotional films, they carry the work step by step from the first idea to something ready to hand over.',
        tags: ['Multi-agent', 'Generative AI'],
      },
      {
        title: 'Business processes and ERP solutions',
        text: 'I find the places where a company’s daily workflows get stuck and turn them into solutions connected to the ERP. I run it end to end, from spotting the need to going live; the applications run on Google Cloud Run.',
        tags: ['ERP', 'Process automation'],
      },
    ],
  },
  publicWork: {
    title: 'Projects with open code',
    intro: 'Smaller projects you can read and run yourself. Each one has a README, tests and its own repository.',
    linkLabel: 'View code',
    projects: [
      {
        title: 'Defect Detection using Deep Learning',
        text: 'A CNN that sorts photos of metal buttons into OK and defective. It comes with metrics, figures and a command line.',
        tags: ['TensorFlow', 'CNN'],
        href: 'https://github.com/DeveloperHHT/Defect-Detection-using-Deep-Learning',
      },
      {
        title: 'Realtime Handwritten Digit Recognition',
        text: 'A CNN trained on MNIST that reaches 99.1\u00a0% on the test digits. Draw a digit with the mouse, hold one up to a webcam or read image files.',
        tags: ['TensorFlow', 'OpenCV'],
        href: 'https://github.com/DeveloperHHT/Realtime-Handwritten-Digit-Recognition',
      },
      {
        title: 'Denpointment',
        text: 'A dentist appointment system built with Flask, a joint project with its original author. After the fork I split the backend into layers, rebuilt the interface and added tests and a user guide.',
        tags: ['Flask', 'MySQL / SQLite'],
        href: 'https://github.com/DeveloperHHT/Denpointment',
      },
    ],
  },
  stack: {
    title: 'Stack',
    groups: [
      { name: 'LLMs & agents', items: ['Claude', 'OpenAI', 'Gemini', 'Hugging Face', 'NVIDIA'] },
      { name: 'ML & vision', items: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'scikit-learn', 'Pandas', 'NumPy'] },
      { name: 'Backend & data', items: ['FastAPI', 'Flask', 'Java', '.NET', 'MySQL', 'MS SQL Server', 'SQLite', 'SQLAlchemy'] },
      { name: 'Frontend, mobile & games', items: ['React', 'Vite', 'TypeScript', 'Flutter', 'Dart', 'Qt', 'Unity', 'C#'] },
      { name: 'Cloud, DevOps & testing', items: ['Docker', 'GitHub Actions', 'AWS', 'Azure', 'Google Cloud', 'Google Cloud Run', 'Linux', 'Git', 'Raspberry Pi', 'pytest', 'Playwright'] },
    ],
  },
  music: {
    title: 'Off duty',
    intro: 'I play guitar and sing. Singles and covers are on Spotify, Apple Music, YouTube Music and YouTube.',
    tracks: [
      { title: 'Kız Kulesi', slug: 'kiz-kulesi', spotifyId: '1u8Ge4sbeYH65RIBmIKQqa' },
      { title: 'Yarım', slug: 'yarim', spotifyId: '4BSlgtbFsNd5He26h6NNpC' },
      { title: 'Düş Sen De', slug: 'dus-sen-de', spotifyId: '6FWi3PS2Ji3APJ3GfJs1qg' },
      { title: 'İlkbahar', slug: 'ilkbahar', spotifyId: '7LbPxI0BDMOIDQjhsYLdi0' },
      { title: 'Kalmadı İnandığım', slug: 'kalmadi-inandigim', spotifyId: '7dRnLwBbABxaNKZdaZOtH8' },
    ],
    platforms: [
      { label: 'Spotify', href: 'https://open.spotify.com/artist/1ESLAOiHre7ZBbjbfFN3VS' },
      { label: 'Apple Music', href: 'https://music.apple.com/us/artist/1763636919' },
      { label: 'YouTube Music', href: 'https://music.youtube.com/channel/UCIdkSGXDtUf8nURZkIJaT8w' },
      { label: 'YouTube', href: 'https://youtube.com/@hasanhuseyintayap' },
    ],
  },
  ride: {
    title: 'On the road',
    text: 'I share the journeys I take by motorcycle and the moments I catch along the way: short escapes, long routes and plenty of sunrises.',
    instagram: { label: '@bikerandvibes', href: 'https://instagram.com/bikerandvibes' },
    photography: {
      title: 'Behind the lens',
      text: 'I photograph nature and landscapes, drawn most to sunrise and sunset, when the light is at its softest.',
      link: { label: '@hhtthephotographer', href: 'https://instagram.com/hhtthephotographer' },
    },
  },
  contact: {
    title: 'Let’s talk',
    text: 'I am open to new opportunities and projects: AI agents, computer vision, or both, in a team or on your own product. The quickest way to reach me is LinkedIn. The code is on GitHub.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hasanhuseyintayap/' },
      { label: 'GitHub', href: 'https://github.com/DeveloperHHT' },
    ],
  },
}
