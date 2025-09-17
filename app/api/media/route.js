import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all media files
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'image', 'video', or null for all
    const category = searchParams.get('category'); // 'homepage', 'website', etc.
    
    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    const media = await db.collection('media')
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      media: media.map(item => ({
        ...item,
        id: item._id.toString(),
        _id: item._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

// POST - Create new media record
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    
    const data = await request.json();
    
    const mediaItem = {
      title: data.title || '',
      description: data.description || '',
      url: data.url || '',
      publicId: data.publicId || '',
      type: data.type || 'image', // 'image' or 'video'
      category: data.category || 'website', // 'homepage', 'website', 'general'
      size: data.size || 0,
      width: data.width || 0,
      height: data.height || 0,
      format: data.format || '',
      tags: data.tags || [],
      altText: data.altText || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('media').insertOne(mediaItem);
    
    return NextResponse.json({
      success: true,
      message: 'Media uploaded successfully',
      id: result.insertedId
    });
  } catch (error) {
    console.error('Error saving media:', error);
    return NextResponse.json({ error: 'Failed to save media' }, { status: 500 });
  }
}

// DELETE - Delete media file
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('blog');
    
    const result = await db.collection('media').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Media deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
