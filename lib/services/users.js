import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'

export async function createUser(userData) {
  try {
    const client = await clientPromise
    const db = client.db('blog')
    const collection = db.collection('users')
    
    // Check if user already exists
    const existingUser = await collection.findOne({ email: userData.email })
    if (existingUser) {
      return { success: false, error: 'User already exists' }
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    const user = {
      email: userData.email,
      password: hashedPassword,
      name: userData.name || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    const result = await collection.insertOne(user)
    return { success: true, id: result.insertedId }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, error: error.message }
  }
}

export async function getUserByEmail(email) {
  try {
    const client = await clientPromise
    const db = client.db('blog')
    const collection = db.collection('users')
    
    const user = await collection.findOne({ email })
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function validateUser(email, password) {
  try {
    const user = await getUserByEmail(email)
    if (!user) return null
    
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null
    
    return { id: user._id, email: user.email, name: user.name }
  } catch (error) {
    console.error('Error validating user:', error)
    return null
  }
}
