import clientPromise from './mongodb'

export async function testConnection() {
  try {
    const client = await clientPromise
    await client.db("admin").command({ ping: 1 })
    console.log("✅ Successfully connected to MongoDB!")
    return { 
      connected: true, 
      message: "MongoDB connection successful!" 
    }
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
    return { 
      connected: false, 
      error: error.message || "Unknown connection error" 
    }
  }
}
