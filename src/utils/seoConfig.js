/**
 * Advanced SEO Configuration & Best Practices
 * Comprehensive SEO strategy for Poeage Technology
 */

const SEO_CONFIG = {
  // Site Information
  site: {
    name: "Poeage Technology",
    domain: "https://www.poeagetechnology.com",
    email: "info@poeagetechnology.com",
    phone: "+1-XXX-XXX-XXXX", // Update with actual phone
    description:
      "Leading provider of web development, mobile app development, AI solutions, cloud services, and digital transformation.",
  },

  // Keywords Strategy
  keywords: {
    primary: [
      "web development",
      "app development",
      "AI solutions",
      "cloud services",
      "digital transformation",
      "software development",
    ],
    secondary: [
      "custom software development",
      "enterprise solutions",
      "AI consulting",
      "cloud migration",
      "technology consulting",
      "software engineering",
      "ReactJS",
      "Node.js",
      "cloud computing",
    ],
    long_tail: [
      "web development company",
      "mobile app development services",
      "AI solution provider",
      "cloud infrastructure services",
      "digital transformation consultant",
      "enterprise software development",
    ],
  },

  // Content Strategy
  contentStrategy: {
    blog_update_frequency: "bi-weekly",
    case_study_frequency: "monthly",
    page_update_frequency: "quarterly",
    target_blog_posts_per_month: 4,
    target_case_studies_per_quarter: 1,
  },

  // Link Building Strategy
  linkBuilding: {
    internal_linking_target: {
      homepage_outgoing_links: 15,
      service_page_outgoing_links: 10,
      blog_post_outgoing_links: 5,
    },
    backlink_targets: [
      "Technology blogs",
      "Industry directories",
      "Business directories",
      "News websites",
      "Medium publications",
      "Dev community sites",
    ],
  },

  // Local SEO Configuration
  localSeo: {
    enabled: false, // Enable if serving specific geographical areas
    locations: [],
    google_business_profile: {
      name: "Poeage Technology",
      address: "Update with actual address",
      phone: "+1-XXX-XXX-XXXX",
      website: "https://www.poeagetechnology.com",
    },
  },

  // Technical SEO Requirements
  technicalSeo: {
    xmlSitemap: "https://www.poeagetechnology.com/sitemap.xml",
    robotsTxt: "https://www.poeagetechnology.com/robots.txt",

    // Core Web Vitals Targets
    coreWebVitals: {
      LCP: 2.5, // Seconds
      FID: 0.1, // Seconds
      CLS: 0.1, // Score
    },

    // Lighthouse Score Targets
    lighthouseTargets: {
      performance: 90,
      accessibility: 90,
      bestPractices: 90,
      seo: 100,
    },

    // Mobile Optimization
    mobile: {
      viewport: "width=device-width, initial-scale=1.0",
      fontSizeMinimum: 12,
      tapTargetMinimum: 48,
    },

    // Security Headers
    securityHeaders: {
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "1; mode=block",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' *.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;",
    },
  },

  // Analytics & Tracking
  tracking: {
    googleAnalytics: {
      enabled: true,
      trackingId: "G-YOUR_GA_ID", // Update with actual ID
    },
    googleSearchConsole: {
      enabled: true,
      verification: "YOUR_VERIFICATION_CODE", // Update with actual code
    },
    heatmapping: {
      enabled: true,
      provider: "Hotjar", // or similar
    },
    crossOriginTracking: true,
  },

  // Social Media Configuration
  socialMedia: {
    facebook: "https://www.facebook.com/poeagetechnology",
    linkedin: "https://www.linkedin.com/company/poeagetechnology",
    twitter: "https://twitter.com/poeagetech",
    instagram: "https://www.instagram.com/poeagetech",
    github: "https://github.com/poeagetech",
  },

  // Schema Markup (Structured Data)
  schemaMarkup: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Poeage Technology",
      url: "https://www.poeagetechnology.com",
      logo: "https://www.poeagetechnology.com/Poeage_Logo_6.png",
    },
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Poeage Technology",
      address: "Update with actual address",
      telephone: "+1-XXX-XXX-XXXX",
    },
  },

  // Sitemaps
  sitemaps: {
    main: "https://www.poeagetechnology.com/sitemap.xml",
    news: null, // Enable if publishing news
    video: null, // Enable if hosting videos
    image: null, // Enable if publishing high-quality images
  },

  // Robots.txt Configuration
  robotsTxt: {
    allow: ["/"],
    disallow: ["/admin/", "/private/", "/temp/", "/test/"],
    userAgents: {
      all: { crawlDelay: 1 },
      googlebot: { crawlDelay: 0 },
      bingbot: { crawlDelay: 1 },
    },
  },

  // URL Structure Best Practices
  urlStructure: {
    protocol: "https://",
    useWWW: true,
    preferHyphen: true,
    avoidDates: true,
    descriptiveSlug: true,
    maxLength: 75,
    examples: {
      service: "/web-development/",
      blog: "/blog/ultimate-guide-to-web-development/",
      caseStudy: "/case-studies/project-name/",
    },
  },

  // Content Guidelines
  contentGuidelines: {
    minimumWordCount: {
      homepage: 300,
      service_page: 500,
      blog_post: 1500,
      pillar_page: 2500,
    },
    headingStructure: {
      h1: "Only one per page",
      h2: "Multiple allowed",
      h3: "Use for subsections",
      h4: "For detailed breakdowns",
    },
    imageOptimization: {
      format: "WebP with fallback",
      maxFileSize: "250KB",
      descriptiveAltText: true,
      imageRatio: "16:9",
    },
  },

  // Competitor Analysis Targets
  competitorAnalysis: {
    competitors: [
      // Add your main competitors here
      "Example Competitor 1",
      "Example Competitor 2",
    ],
    monitoringFrequency: "weekly",
    metrics: [
      "Backlink profile",
      "Keyword rankings",
      "Content strategy",
      "Technical SEO",
      "Site structure",
    ],
  },

  // Page Speed Optimization
  pageSpeed: {
    enableCompression: true,
    minifyCSS: true,
    minifyJS: true,
    lazyLoadImages: true,
    deferNonCriticalCSS: true,
    asyncScripts: true,
    cacheStrategy: "aggressively",
  },

  // Monitoring & Alerts
  monitoring: {
    dailyRankingTracking: true,
    weeklyBacklinkMonitoring: true,
    monthlyCompetitorAnalysis: true,
    alertThresholds: {
      rankingDrop: 5, // positions
      trafficDrop: 10, // percentage
      crawlError: true,
    },
  },
};

// SEO Monthly Checklist
const monthlySegChecklist = [
  "Review keyword rankings",
  "Analyze backlink profile",
  "Check Core Web Vitals",
  "Review search console data",
  "Update internal links",
  "Optimize underperforming pages",
  "Publish new blog content",
  "Check for broken links",
  "Analyze user behavior",
  "Review competitor strategies",
];

// SEO Quick Wins (implement immediately)
const quickWins = [
  "Implement structured data markup",
  "Optimize meta descriptions",
  "Create XML sitemap",
  "Set up robots.txt",
  "Implement internal linking strategy",
  "Optimize page titles",
  "Add alt text to images",
  "Implement schema markup",
  "Set up Google Search Console",
  "Set up Google Analytics 4",
];

export { SEO_CONFIG, monthlySegChecklist, quickWins };

export default SEO_CONFIG;
