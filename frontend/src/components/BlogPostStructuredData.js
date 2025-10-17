export default function BlogPostStructuredData({ post }) {
  if (!post) return null

  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || "https://evolvoai.uz/og-image.jpg",
    "author": {
      "@type": "Organization",
      "name": "EvolvoAI",
      "url": "https://evolvoai.uz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EvolvoAI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://evolvoai.uz/logo.png"
      }
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt || post.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://evolvoai.uz/blog/${post.slug}`
    },
    "url": `https://evolvoai.uz/blog/${post.slug}`,
    "keywords": post.tags?.join(", "),
    "articleSection": post.category,
    "wordCount": post.content?.length || 0,
    "inLanguage": "uz-UZ",
    "isAccessibleForFree": true,
    "genre": ["Technology", "IT Services", "Web Development"],
    "about": {
      "@type": "Thing",
      "name": post.category
    }
  }

  // Agar AI tomonidan yaratilgan bo'lsa
  if (post.isAIGenerated) {
    articleData.creativeWorkStatus = "Published"
    articleData.copyrightNotice = "© 2024 EvolvoAI. AI yordamida yaratilgan kontent."
  }

  // Agar RSS dan olingan bo'lsa
  if (post.isRewritten && post.originalSource) {
    articleData.isBasedOn = {
      "@type": "CreativeWork",
      "name": post.metadata?.originalTitle || post.title,
      "url": post.originalLink,
      "author": {
        "@type": "Organization", 
        "name": post.originalSource
      }
    }
    articleData.copyrightNotice = `© 2024 EvolvoAI. ${post.originalSource} asosida qayta ishlangan.`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  )
}
