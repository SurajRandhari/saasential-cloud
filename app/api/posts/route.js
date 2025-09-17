import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request) {
  try {
    const client = await clientPromise
    const db = client.db('blog')
    
    const postData = await request.json()
    
    // Add timestamp
    const post = {
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    const result = await db.collection('posts').insertOne(post)
    
    if (!result.acknowledged) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Post created successfully!', 
      id: result.insertedId 
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('blog')
    
    const posts = await db.collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
