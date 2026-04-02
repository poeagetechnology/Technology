/**
 * SEO Utilities for Poeage Technology
 * Provides helper functions for managing meta tags and SEO optimization
 */

const DOMAIN = "https://www.poeagetechnology.com";
const COMPANY_NAME = "Poeage Technology";
const DEFAULT_LOGO = `${DOMAIN}/Poeage_Logo_6.png`;

/**
 * Generate canonical URL for a given path
 * @param {string} path - The page path
 * @returns {string} - Full canonical URL
 */
export const getCanonicalUrl = (path = "") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${DOMAIN}${cleanPath}`.replace(/\/$/, "") || DOMAIN;
};

/**
 * Generate Open Graph image URL with fallback
 * @param {string} image - Custom image path
 * @returns {string} - Full image URL
 */
export const getOgImage = (image = "") => {
  if (image && image.startsWith("http")) return image;
  if (image) return `${DOMAIN}${image.startsWith("/") ? image : `/${image}`}`;
  return DEFAULT_LOGO;
};

/**
 * Generate structured data for Organization
 * @returns {Object} - JSON-LD Organization schema
 */
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  url: DOMAIN,
  logo: DEFAULT_LOGO,
  description:
    "Leading provider of web development, mobile app development, AI solutions, cloud services, and digital transformation.",
  foundingDate: "2020",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "info@poeagetechnology.com",
    availableLanguage: ["en"],
  },
  sameAs: [
    "https://www.facebook.com/poeagetechnology",
    "https://www.linkedin.com/company/poeagetechnology",
    "https://twitter.com/poeagetech",
    "https://www.instagram.com/poeagetech",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
});

/**
 * Generate structured data for Service
 * @param {Object} service - Service details
 * @returns {Object} - JSON-LD Service schema
 */
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: {
    "@type": "Organization",
    name: COMPANY_NAME,
    url: DOMAIN,
  },
  areaServed: "Worldwide",
  serviceType: service.type || "Professional Services",
  url: getCanonicalUrl(service.path),
});

/**
 * Generate structured data for BreadcrumbList
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} - JSON-LD BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: `${DOMAIN}${item.path}`,
  })),
});

/**
 * Generate structured data for FAQPage
 * @param {Array} faqs - Array of FAQ items
 * @returns {Object} - JSON-LD FAQPage schema
 */
export const generateFaqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Generate structured data for BlogPosting
 * @param {Object} post - Blog post details
 * @returns {Object} - JSON-LD BlogPosting schema
 */
export const generateBlogPostSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: getOgImage(post.image),
  datePublished: post.publishedDate,
  dateModified: post.modifiedDate || post.publishedDate,
  author: {
    "@type": "Organization",
    name: COMPANY_NAME,
  },
  publisher: {
    "@type": "Organization",
    name: COMPANY_NAME,
    logo: DEFAULT_LOGO,
  },
});

/**
 * Generate Open Graph meta tags object
 * @param {Object} ogData - OG data object
 * @returns {Object} - Meta tags object for Helmet
 */
export const generateOgTags = (ogData) => {
  const tags = {
    "og:title": ogData.title || `${COMPANY_NAME} - Web, App & AI Solutions`,
    "og:description":
      ogData.description ||
      "Leading provider of web development, app development, AI solutions, and digital transformation.",
    "og:image": getOgImage(ogData.image),
    "og:url": getCanonicalUrl(ogData.path),
    "og:type": ogData.type || "website",
    "og:site_name": COMPANY_NAME,
    "og:locale": "en_US",
  };

  return Object.entries(tags).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

/**
 * Generate Twitter Card meta tags
 * @param {Object} twitterData - Twitter card data
 * @returns {Object} - Meta tags object for Helmet
 */
export const generateTwitterTags = (twitterData) => ({
  "twitter:card": "summary_large_image",
  "twitter:title":
    twitterData.title || `${COMPANY_NAME} - Web, App & AI Solutions`,
  "twitter:description":
    twitterData.description || "Expert technology solutions for enterprises.",
  "twitter:image": getOgImage(twitterData.image),
  "twitter:domain": "poeagetechnology.com",
});

/**
 * Slugify text for URLs
 * @param {string} text - Text to slugify
 * @returns {string} - Slugified text
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/**
 * Truncate text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 160) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Generate SEO-friendly meta description
 * @param {string} description - Original description
 * @returns {string} - Optimized description (160 chars max)
 */
export const generateMetaDescription = (description) => {
  return truncateText(description, 160);
};

/**
 * Generate SEO-friendly title with brand
 * @param {string} pageTitle - Page title
 * @param {boolean} includeBrand - Whether to include brand name
 * @returns {string} - Full title (max 60 chars)
 */
export const generatePageTitle = (pageTitle, includeBrand = true) => {
  const title = includeBrand ? `${pageTitle} | ${COMPANY_NAME}` : pageTitle;
  const maxLength = 60;
  if (title.length > maxLength) {
    return title.substring(0, maxLength - 3) + "...";
  }
  return title;
};

/**
 * Generate keywords with brand name
 * @param {Array} keywords - Array of keywords
 * @returns {string} - Comma-separated keywords string
 */
export const generateKeywords = (keywords = []) => {
  const allKeywords = [COMPANY_NAME, ...keywords];
  return allKeywords.join(", ");
};

/**
 * Get structured data for Rich Snippets
 * @param {string} type - Type of structured data (product, article, etc.)
 * @param {Object} data - Data for the structured data
 * @returns {Object} - JSON-LD structured data
 */
export const getStructuredData = (type, data) => {
  switch (type) {
    case "organization":
      return generateOrganizationSchema();
    case "service":
      return generateServiceSchema(data);
    case "breadcrumb":
      return generateBreadcrumbSchema(data);
    case "faq":
      return generateFaqSchema(data);
    case "blogpost":
      return generateBlogPostSchema(data);
    default:
      return generateOrganizationSchema();
  }
};

export default {
  DOMAIN,
  COMPANY_NAME,
  DEFAULT_LOGO,
  getCanonicalUrl,
  getOgImage,
  generateOrganizationSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateBlogPostSchema,
  generateOgTags,
  generateTwitterTags,
  slugify,
  truncateText,
  generateMetaDescription,
  generatePageTitle,
  generateKeywords,
  getStructuredData,
};
