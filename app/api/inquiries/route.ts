import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the shape of an inquiry
export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  timestamp: string;
}

// Path to store inquiries data locally
const dataFilePath = path.join(process.cwd(), 'inquiries.json');

// Helper function to read inquiries from file
function getInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading inquiries data:', error);
  }
  return []; // Return empty array if file doesn't exist or error occurs
}

// Helper function to write inquiries to file
function saveInquiries(inquiries: Inquiry[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(inquiries, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing inquiries data:', error);
  }
}

export async function GET() {
  const inquiries = getInquiries();
  // Sort by timestamp descending (newest first)
  inquiries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return NextResponse.json(inquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectType, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const newInquiry: Inquiry = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name,
      phone: phone || '',
      email,
      projectType: projectType || '',
      message,
      status: 'Unread',
      timestamp: new Date().toISOString(),
    };

    const inquiries = getInquiries();
    inquiries.push(newInquiry);
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    console.error('Error processing POST inquiry:', error);
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

    const inquiries = getInquiries();
    const index = inquiries.findIndex(inq => inq.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    inquiries[index].status = status;
    saveInquiries(inquiries);

    return NextResponse.json({ success: true, inquiry: inquiries[index] });
  } catch (error) {
    console.error('Error processing PATCH inquiry:', error);
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

    let inquiries = getInquiries();
    const initialLength = inquiries.length;
    inquiries = inquiries.filter(inq => inq.id !== id);

    if (inquiries.length === initialLength) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    saveInquiries(inquiries);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing DELETE inquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
