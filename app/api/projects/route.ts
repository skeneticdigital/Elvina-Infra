import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM Project ORDER BY createdAt DESC');
    return NextResponse.json(rows);
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

    const [result]: any = await pool.query(
      `INSERT INTO Project (title, category, status, location, image, featured, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, category, status, location, image || '/placeholder-project.jpg', featured || false]
    );

    // Fetch the newly created record
    const [newRows]: any = await pool.query('SELECT * FROM Project WHERE id = ?', [result.insertId]);

    return NextResponse.json({ success: true, project: newRows[0] }, { status: 201 });
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

    await pool.query('DELETE FROM Project WHERE id = ?', [parseInt(id, 10)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing DELETE project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
