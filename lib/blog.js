// lib/blog.js
import { DATABASE_CONFIG } from '@/lib/config'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const { DB_NAME, COLLECTIONS } = DATABASE_CONFIG

export async function getBlogs(page = 1, limit = 12) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME) // ✅ Using shared config instead of 'blog'
    
    const skip = (page - 1) * limit
    
    // Get published posts with pagination
    const blogs = await db.collection(COLLECTIONS.POSTS) // ✅ Using shared config
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    
    // Get total count for pagination
    const totalCount = await db.collection(COLLECTIONS.POSTS).countDocuments({ status: 'published' }) // ✅ Using shared config
    
    return {
      blogs: blogs.map(blog => ({
        id: blog._id.toString(),
        title: blog.title,
        description: blog.excerpt || blog.content?.substring(0, 150) + '...' || '',
        image: blog.featuredImage || '/images/placeholder-blog.jpg',
        link: `/blogs/${blog.slug || blog._id}`,
        publishDate: blog.createdAt,
        category: blog.category,
        readingTime: blog.readingTime || 5
      })),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return { blogs: [], totalCount: 0, totalPages: 0, currentPage: 1 }
  }
}

export async function getBlogBySlug(slug) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME) // ✅ Using shared config instead of 'blog'
    
    // Check if the slug is a valid ObjectId format
    let query
    if (ObjectId.isValid(slug)) {
      query = {
        $or: [{ slug }, { _id: new ObjectId(slug) }],
        status: 'published'
      }
    } else {
      // If not a valid ObjectId, only search by slug
      query = {
        slug,
        status: 'published'
      }
    }
    
    const blog = await db.collection(COLLECTIONS.POSTS).findOne(query) // ✅ Using shared config
    
    if (!blog) return null
    
    return {
      id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      featuredImage: blog.featuredImage,
      publishDate: blog.createdAt,
      updatedDate: blog.updatedAt,
      category: blog.category,
      tags: blog.tags || [],
      readingTime: blog.readingTime || 5,
      slug: blog.slug,
      views: blog.views || 0,
      author: blog.author || {
        name: 'Anonymous',
        bio: '',
        avatar: '/images/default-avatar.jpg',
        social: {
          twitter: '',
          linkedin: '',
          website: ''
        }
      }
    }
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}
