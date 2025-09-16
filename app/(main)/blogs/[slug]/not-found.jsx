import Link from 'next/link'
import { Container } from '@/lib/utils'

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog Post Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blogs"
          className="px-6 py-3 bg-black dark:bg-white dark:text-black text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          Back to All Blogs
        </Link>
      </div>
    </Container>
  )
}
