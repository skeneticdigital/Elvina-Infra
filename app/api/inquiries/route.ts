import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM Inquiry ORDER BY timestamp DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const id = uuidv4();

    await pool.query(
      `INSERT INTO Inquiry (id, name, email, phone, projectType, message, status, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, 'Unread', NOW())`,
      [id, name, email, phone || null, projectType || null, message]
    );

    // Fetch the newly created record
    const [newRows]: any = await pool.query('SELECT * FROM Inquiry WHERE id = ?', [id]);

    return NextResponse.json({ success: true, inquiry: newRows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    await pool.query('UPDATE Inquiry SET status = ? WHERE id = ?', [status, id]);

    // Fetch the updated record
    const [updatedRows]: any = await pool.query('SELECT * FROM Inquiry WHERE id = ?', [id]);

    return NextResponse.json({ success: true, inquiry: updatedRows[0] });
  } catch (error) {
    console.error('Error updating inquiry:', error);
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

    await pool.query('DELETE FROM Inquiry WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
