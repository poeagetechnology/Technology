/**
 * Performance Optimization Configuration
 * Optimizes build and runtime performance for better SEO scores
 */

// Webpack configuration recommendations (used by react-scripts via CRACO)
const performanceConfig = {
  // Code Splitting Configuration
  codeSpitting: {
    chunks: "all",
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        priority: 10,
        reuseExistingChunk: true,
      },
      common: {
        minChunks: 2,
        priority: 5,
        reuseExistingChunk: true,
        enforce: true,
      },
    },
  },

  // Compression settings
  compression: {
    algorithm: "gzip",
    level: 9, // Maximum compression
    minRatio: 0.8,
  },

  // Cache settings for production
  cache: {
    type: "filesystem",
    cacheDirectory: ".webpack_cache",
    buildDependencies: {
      config: [__filename],
    },
  },

  // Image optimization
  imageOptimization: {
    maxWidth: 1200,
    quality: 80,
    formats: ["webp", "jpeg", "png"],
  },

  // Performance budgets (in bytes)
  performanceBudgets: {
    bundle: {
      main: 250000, // 250 KB
      vendors: 400000, // 400 KB
      total: 700000, // 700 KB
    },
  },
};

// Lighthouse recommendations
const lighthouseTargets = {
  performance: 90,
  accessibility: 90,
  bestPractices: 90,
  seo: 100,
  pwa: 90,
};

// Core Web Vitals Targets
const coreWebVitalTargets = {
  LCP: 2500, // Largest Contentful Paint (2.5s)
  FID: 100, // First Input Delay (100ms)
  CLS: 0.1, // Cumulative Layout Shift (0.1)
  TTFB: 600, // Time to First Byte (600ms)
};

module.exports = {
  performanceConfig,
  lighthouseTargets,
  coreWebVitalTargets,
};
