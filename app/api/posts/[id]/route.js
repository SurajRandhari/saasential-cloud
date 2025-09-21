// app/api/posts/[id]/route.js
import { NextResponse } from 'next/server'
import { DATABASE_CONFIG } from '@/lib/config'
import { deletePost, getPostById, updatePost } from '@/lib/services/posts'

const { DB_NAME, COLLECTIONS } = DATABASE_CONFIG

// GET single post
export async function GET(request, { params }) {
  try {
    const post = await getPostById(params.id)
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// UPDATE post
export async function PUT(request, { params }) {
  try {
    const updateData = await request.json()
    delete updateData._id // Remove _id from update data
    
    const result = await updatePost(params.id, updateData)
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post updated successfully' 
    })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE post (updated version)
export async function DELETE(request, { params }) {
  try {
    const result = await deletePost(params.id)
    
    if (!result.success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}