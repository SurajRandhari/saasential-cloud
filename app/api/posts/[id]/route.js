import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// GET single post
export async function GET(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db('blog')
    
    const post = await db.collection('posts').findOne({
      _id: new ObjectId(params.id)
    })
    
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
    const client = await clientPromise
    const db = client.db('blog')
    
    const updateData = await request.json()
    delete updateData._id // Remove _id from update data
    
    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(params.id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
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

// DELETE post (keep existing delete function)
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise
    const db = client.db('blog')
    
    const result = await db.collection('posts').deleteOne({
      _id: new ObjectId(params.id)
    })
    
    if (result.deletedCount === 0) {
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
