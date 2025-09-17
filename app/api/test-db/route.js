import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const admin = client.db("admin")
    
    // Test the connection
    const result = await admin.command({ ping: 1 })
    
    if (result.ok === 1) {
      return Response.json({ 
        connected: true, 
        message: "MongoDB connection successful!",
        server: client.options?.hosts?.[0] || "Connected"
      })
    }
  } catch (error) {
    return Response.json({ 
      connected: false, 
      error: error.message 
    }, { status: 500 })
  }
}
