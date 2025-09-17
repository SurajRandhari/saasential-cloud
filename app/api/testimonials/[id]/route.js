import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch single testimonial
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const testimonial = await db.collection('testimonials').findOne({
      _id: new ObjectId(params.id)
    });
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      testimonial: {
        ...testimonial,
        id: testimonial._id.toString(),
        _id: testimonial._id.toString()
      }
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
  }
}

// PUT - Update testimonial
export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const data = await request.json();
    
    const updateData = {
      heading: data.heading,
      testimony: data.testimony,
      name: data.name,
      image: data.image,
      city: data.city,
      company: data.company,
      position: data.position,
      rating: parseInt(data.rating),
      status: data.status,
      featured: data.featured,
      updatedAt: new Date()
    };
    
    const result = await db.collection('testimonials').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial updated successfully'
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

// DELETE - Delete testimonial
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const result = await db.collection('testimonials').deleteOne({
      _id: new ObjectId(params.id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
