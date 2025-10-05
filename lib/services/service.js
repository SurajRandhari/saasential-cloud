// lib/services/services.js
import { DATABASE_CONFIG } from '@/lib/config';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from "mongodb";

const { DB_NAME, COLLECTIONS } = DATABASE_CONFIG;

// CREATE a service
export async function createService(doc) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const res = await db.collection(COLLECTIONS.SERVICES).insertOne({
    ...doc,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { success: true, id: res.insertedId };
}

// LIST all services (optionally sorted)
export async function listServices() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return await db.collection(COLLECTIONS.SERVICES)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
}

// GET a service by slug
export async function getServiceBySlug(slug) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return await db.collection(COLLECTIONS.SERVICES).findOne({ slug });
}

// GET a service by _id
export async function getServiceById(id) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return await db.collection(COLLECTIONS.SERVICES).findOne({ _id: new ObjectId(id) });
}

// UPDATE a service by slug (preferred) or _id
export async function updateServiceBySlug(slug, update) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const res = await db.collection(COLLECTIONS.SERVICES).updateOne(
    { slug },
    { $set: { ...update, updatedAt: new Date() } }
  );
  return { success: res.modifiedCount > 0 };
}
// If you want, add updateServiceById as well:

export async function updateServiceById(id, update) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const res = await db.collection(COLLECTIONS.SERVICES).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...update, updatedAt: new Date() } }
  );
  return { success: res.modifiedCount > 0 };
}

// DELETE a service by slug
export async function deleteServiceBySlug(slug) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const res = await db.collection(COLLECTIONS.SERVICES).deleteOne({ slug });
  return { success: res.deletedCount > 0 };
}

// DELETE by _id (just in case)
export async function deleteServiceById(id) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const res = await db.collection(COLLECTIONS.SERVICES).deleteOne({ _id: new ObjectId(id) });
  return { success: res.deletedCount > 0 };
}
