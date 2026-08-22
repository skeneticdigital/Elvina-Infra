import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqsFilePath = path.join(process.cwd(), 'chatbot_faqs.json');

function getFAQs(): FAQ[] {
  try {
    if (!fs.existsSync(faqsFilePath)) {
      fs.writeFileSync(faqsFilePath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(faqsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading FAQs:', error);
    return [];
  }
}

function saveFAQs(faqs: FAQ[]) {
  try {
    fs.writeFileSync(faqsFilePath, JSON.stringify(faqs, null, 2));
  } catch (error) {
    console.error('Error saving FAQs:', error);
  }
}

export async function GET() {
  const faqs = getFAQs();
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  try {
    const newFAQ = await request.json();
    const faqs = getFAQs();
    
    const faq: FAQ = {
      id: Date.now(),
      question: newFAQ.question,
      answer: newFAQ.answer,
    };
    
    faqs.push(faq);
    saveFAQs(faqs);
    
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
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
    
    let faqs = getFAQs();
    faqs = faqs.filter(faq => faq.id !== Number(id));
    saveFAQs(faqs);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
