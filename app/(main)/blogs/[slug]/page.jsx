import { getBlogBySlug, getBlogs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Eye, Heart } from 'lucide-react';
import { Container } from '@/lib/utils';
import ShareButton from '@/components/blogs/ShareButton';
import TableOfContents from '@/components/blogs/TableOfContents';
import ReadingProgress from '@/components/blogs/ReadingProgress';
import AuthorInfo from '@/components/blogs/AuthorInfo';
import RelatedPosts from '@/components/blogs/RelatedPosts';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  // Get related posts from the same category
  const { blogs: allBlogs } = await getBlogs(1, 50);
  const relatedPosts = allBlogs.filter(post => 
    post.category === blog.category && post.id !== blog.id
  ).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
          <Container>
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
            
            <div className="max-w-4xl mx-auto text-center">
              {/* Category */}
              {blog.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full mb-6">
                  {blog.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {blog.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readingTime} min read</span>
                </div>
                {blog.views && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{blog.views} views</span>
                  </div>
                )}
              </div>

              {blog.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}

              {/* Author info in header */}
              {blog.author && (
                <div className="flex items-center justify-center gap-3 mt-6 text-gray-600 dark:text-gray-400">
                  {blog.author.avatar && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>By {blog.author.name}</span>
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="w-full h-[400px] relative">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        {/* Content with Sidebar */}
        <Container>
          <div className="max-w-7xl mx-auto py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article>
                  <div 
                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-img:rounded-lg prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  
                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this post</h3>
                      <ShareButton title={blog.title} />
                    </div>
                  </div>

                  {/* Author Info */}
                  {blog.author && (
                    <div className="mt-8">
                      <AuthorInfo author={blog.author} />
                    </div>
                  )}
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 sticky top-8">
                <div className="space-y-6">
                  {/* Table of Contents */}
                  <TableOfContents content={blog.content} />
                  
                  {/* Quick Stats */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                      Article Stats
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Reading time:</span>
                        <span>{blog.readingTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Published:</span>
                        <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                      </div>
                      {blog.updatedDate && (
                        <div className="flex justify-between">
                          <span>Updated:</span>
                          <span>{new Date(blog.updatedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {blog.views && (
                        <div className="flex justify-between">
                          <span>Views:</span>
                          <span>{blog.views}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <RelatedPosts posts={relatedPosts} currentPostId={blog.id} />
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  return {
    title: `${blog.title} - Blog`,
    description: blog.excerpt || blog.description,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.description,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
    },
  };
}
