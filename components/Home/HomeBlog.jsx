import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getBlogs } from '@/lib/blog';
import { BlogCard } from '../blogs/BlogCard';
import { GradientButton } from '../common/my-button/GradientButton';
export const dynamic = "force-dynamic";

export default async function HomeBlog() {
  let blogs = [];
  let error = null;

  try {
    const { blogs: fetchedBlogs } = await getBlogs(1, 3); // Fetch latest 3 blogs
    blogs = fetchedBlogs;
  } catch (err) {
    console.error('Error fetching latest blogs:', err);
    error = 'Failed to load blog posts';
  }

  if (error) {
    return (
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 mb-4">
            <BookOpen className="h-12 w-12 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }


  if (blogs.length === 0) {
    return (
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-500 mb-4">
            <BookOpen className="h-12 w-12 mx-auto mb-2" />
            <p>No blog posts available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Latest Insights
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Our Blog
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in business and technology
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id || blog._id} blog={blog} />
          ))}
        </div>

        {/* View All Button - Using your GradientButton */}
        <div className="text-center">
          <Link href="/blogs">
            <GradientButton 
              variant="gradient"
              size="lg"
              className=" "
            >
              View All Blog Posts
              <ArrowRight className="h-5 w-5 ml-2" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
