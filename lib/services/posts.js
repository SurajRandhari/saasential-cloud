// services/post.js
import { DATABASE_CONFIG } from '@/lib/config'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const { DB_NAME, COLLECTIONS } = DATABASE_CONFIG

export async function createPost(postData) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTIONS.POSTS)
    
    const post = {
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    const result = await collection.insertOne(post)
    return { success: true, id: result.insertedId }
  } catch (error) {
    console.error('Error creating post:', error)
    return { success: false, error: error.message }
  }
}

export async function getAllPosts() {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTIONS.POSTS)
    
    const posts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
      
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostById(id) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTIONS.POSTS)
    
    const post = await collection.findOne({ _id: new ObjectId(id) })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function updatePost(id, updateData) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTIONS.POSTS)
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        }
      }
    )
    
    return { success: result.modifiedCount > 0 }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, error: error.message }
  }
}

export async function deletePost(id) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTIONS.POSTS)
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    
    return { success: result.deletedCount > 0 }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: error.message }
  }
}
