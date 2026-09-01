// ============================================================================
// SEO HELPER UTILITIES
// ============================================================================

/**
 * Generate SEO-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Generate meta description (150-160 chars)
 */
export function generateMetaDescription(text: string, length: number = 160): string {
  const trimmed = text.substring(0, length);
  return trimmed.endsWith('.') ? trimmed : trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...';
}

/**
 * Generate SEO title with keyword
 */
export function generateSEOTitle(keyword: string, brand: string, length: number = 60): string {
  const title = `${keyword} | ${brand}`;
  return title.length > length ? title.substring(0, length - 3) + '...' : title;
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate FAQ Schema markup
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * Generate Article Schema markup
 */
export function generateArticleSchema(
  title: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string,
  imageUrl: string,
  articleBody: string
): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': description,
    'author': {
      '@type': 'Person',
      'name': author,
    },
    'datePublished': datePublished,
    'dateModified': dateModified,
    'image': imageUrl,
    'articleBody': articleBody,
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

/**
 * Optimize image for web
 */
export interface ImageOptimization {
  original: string;
  webp: string;
  thumbnail: string;
  altText: string;
  title: string;
}

export function getImageOptimization(
  imagePath: string,
  altText: string,
  title: string
): ImageOptimization {
  return {
    original: imagePath,
    webp: imagePath.replace(/\.[^.]+$/, '.webp'),
    thumbnail: imagePath.replace(/\.[^.]+$/, '-thumb.jpg'),
    altText,
    title,
  };
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, limit: number = 10): string[] {
  // Simple keyword extraction (production would use NLP)
  const words = text.toLowerCase().split(/\s+/);
  const wordFreq = new Map<string, number>();

  words.forEach(word => {
    if (word.length > 3) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });

  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}
