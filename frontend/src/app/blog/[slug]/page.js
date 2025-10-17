'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Eye, ThumbsUp, ArrowLeft, Share2, TrendingUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import BlogPostStructuredData from '@/components/BlogPostStructuredData'
import SocialShare from '@/components/SocialShare'

export default function BlogPostPage() {
  const params = useParams()
  const API = 'http://localhost:5000/api'
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchPost()
    }
  }, [params.slug])

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/posts/${params.slug}`)
      setPost(response.data)
      
      // Tegishli postlarni olish
      const relatedResponse = await axios.get(
        `${API}/posts?category=${response.data.category}&limit=3`
      )
      setRelatedPosts(relatedResponse.data.posts.filter(p => p.slug !== params.slug))
    } catch (error) {
      console.error('Postni yuklashda xato:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (liked || !post) return

    try {
      await axios.post(`${API}/posts/${params.slug}/like`)
      setPost({ ...post, likes: post.likes + 1 })
      setLiked(true)
    } catch (error) {
      console.error('Like qo\'shishda xato:', error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Havola nusxalandi!')
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryLabel = (category) => {
    const labels = {
      'web-development': 'Web Development',
      'telegram-bots': 'Telegram Botlar',
      'chatbots': 'Chatbotlar',
      'automation': 'Avtomatlashtirish',
      'ai-integration': 'AI Integratsiya',
      'news': 'Yangiliklar'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-32 rounded mb-8"></div>
            <div className="bg-gray-200 h-12 rounded mb-4"></div>
            <div className="bg-gray-200 h-6 w-48 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-4">Post topilmadi</h1>
          <Link href="/blog" className="text-primary-600 hover:underline">
            Blogga qaytish
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <BlogPostStructuredData post={post} />
      <div className="py-20 bg-gray-50">
        <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Blogga qaytish
        </Link>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-full">
              {getCategoryLabel(post.category)}
            </span>
            {post.category === 'news' && post.subcategory && (
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {getCategoryLabel(post.subcategory)}
              </span>
            )}
            {post.isAIGenerated && (
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                AI Generated
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {formatDate(post.createdAt)}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {post.views} ko'rishlar
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              {post.likes} likes
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                a: ({node, ...props}) => <a className="text-primary-600 hover:underline" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Social Share */}
          <div className="mb-8">
            <SocialShare 
              title={post.title}
              text={post.excerpt}
              url={typeof window !== 'undefined' ? window.location.href : ''}
              hashtags={post.tags || []}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                liked
                  ? 'bg-primary-100 text-primary-700 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              {liked ? 'Like qo\'shildi' : 'Like'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              Ulashish
            </button>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">O'xshash maqolalar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug}`}>
                  <div className="card group hover:scale-105 cursor-pointer h-full">
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full inline-block mb-3">
                      {getCategoryLabel(relatedPost.category)}
                    </span>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  )
}