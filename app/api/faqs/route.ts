import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM Faq ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { question, answer } = await request.json();
    
    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }
    
    const [result]: any = await pool.query(
      `INSERT INTO Faq (question, answer, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`,
      [question, answer]
    );
    
    // Fetch newly created record
    const [newRows]: any = await pool.query('SELECT * FROM Faq WHERE id = ?', [result.insertId]);
    
    return NextResponse.json(newRows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'FAQ ID is required' }, { status: 400 });
    }
    
    await pool.query('DELETE FROM Faq WHERE id = ?', [parseInt(id, 10)]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
