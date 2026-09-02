import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, status, location, image, featured } = body;

    if (!title || !category || !status || !location) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        category,
        status,
        location,
        image: image || '/placeholder-project.jpg',
        featured: featured || false,
      }
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error('Error processing POST project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing DELETE project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
