// app/api/posts/route.js
import { NextResponse } from 'next/server'
import { DATABASE_CONFIG } from '@/lib/config'
import { getAllPosts, createPost } from '@/lib/services/posts'


const { DB_NAME, COLLECTIONS } = DATABASE_CONFIG

export async function POST(request) {
  try {
    const postData = await request.json()
    const result = await createPost(postData)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to create post' }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post created successfully!', 
      id: result.id 
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
