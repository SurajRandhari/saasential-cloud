import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const { name, email, company, phone, message } = data;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Store in MongoDB
    const client = await clientPromise;
    const db = client.db('blog');
    
    const demoRequest = {
      name,
      email,
      company: company || '',
      phone: phone || '',
      message,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('demo_requests').insertOne(demoRequest);
    
    // TODO: Send email notification to admin
    // You can integrate with SendGrid, Nodemailer, or other email services here
    
    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully',
      id: result.insertedId
    });
    
  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
