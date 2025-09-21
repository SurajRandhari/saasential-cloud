// lib/services/whitepaper.js
import { DATABASE_CONFIG } from '@/lib/config'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const { DB_NAME, COLLECTIONS } = DATABASE_CONFIG

export async function createWhitepaper(doc) {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const res = await db.collection(COLLECTIONS.WHITEPAPERS).insertOne({
    ...doc,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return { success: true, id: res.insertedId }
}

export async function listWhitepapers() {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  return await db.collection(COLLECTIONS.WHITEPAPERS).find({}).sort({ createdAt: -1 }).toArray()
}

export async function getWhitepaperById(id) {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  return await db.collection(COLLECTIONS.WHITEPAPERS).findOne({ _id: new ObjectId(id) })
}

export async function getWhitepaperBySlug(slug) {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  return await db.collection(COLLECTIONS.WHITEPAPERS).findOne({ slug })
}

export async function updateWhitepaper(id, update) {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const res = await db.collection(COLLECTIONS.WHITEPAPERS).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...update, updatedAt: new Date() } }
  )
  return { success: res.modifiedCount > 0 }
}

export async function deleteWhitepaper(id) {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const res = await db.collection(COLLECTIONS.WHITEPAPERS).deleteOne({ _id: new ObjectId(id) })
  return { success: res.deletedCount > 0 }
}

export async function createDownload({ name, email, company, whitepaperId, whitepaperTitle }) {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const res = await db.collection(COLLECTIONS.DOWNLOADS).insertOne({
    name,
    email,
    company,
    whitepaperId: new ObjectId(whitepaperId),
    whitepaperTitle,
    createdAt: new Date(),
  })
  return { success: true, id: res.insertedId }
}

export async function listDownloads() {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  return await db.collection(COLLECTIONS.DOWNLOADS).find({}).sort({ createdAt: -1 }).toArray()
}
