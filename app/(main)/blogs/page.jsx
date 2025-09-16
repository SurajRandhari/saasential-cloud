import BlogBanner from '@/components/blogs/BlogBanner'
import Blogscards from '@/components/blogs/Blogscards'
import { Container } from '@/lib/utils'
import { getBlogs } from '@/lib/blog'

export default async function BlogsPage({ searchParams }) {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { blogs, totalPages, currentPage } = await getBlogs(page, 12);

  return (
    <div className='min-h-screen w-full'>
      <BlogBanner />
      <Container>
        <Blogscards 
          blogs={blogs} 
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Blog - Latest Posts',
  description: 'Explore our latest blog posts and insights',
}
