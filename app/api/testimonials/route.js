import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all testimonials
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    
    let filter = {};
    if (status) filter.status = status;
    if (featured === 'true') filter.featured = true;
    
    const testimonials = await db.collection('testimonials')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      testimonials: testimonials.map(testimonial => ({
        ...testimonial,
        id: testimonial._id.toString(),
        _id: testimonial._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST - Create new testimonial
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const data = await request.json();
    
    const testimonial = {
      heading: data.heading || '',
      testimony: data.testimony || '',
      name: data.name || '',
      image: data.image || '',
      city: data.city || '',
      company: data.company || '',
      position: data.position || '',
      rating: parseInt(data.rating) || 5,
      status: data.status || 'published',
      featured: data.featured || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('testimonials').insertOne(testimonial);
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial created successfully',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
