import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import projectsData from '../../../projects.json';

export interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  location: string;
  image: string;
  featured: boolean;
}

const dataFilePath = path.join(process.cwd(), 'projects.json');

// In-memory cache for Vercel (since it's a read-only filesystem)
let memoryProjects: Project[] | null = null;

function getProjects(): Project[] {
  if (memoryProjects) return memoryProjects;

  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      memoryProjects = JSON.parse(fileData);
      return memoryProjects as Project[];
    }
  } catch (error) {
    console.error('Error reading projects data from fs, falling back to bundled data:', error);
  }
  
  memoryProjects = [...(projectsData as Project[])];
  return memoryProjects;
}

function saveProjects(projects: Project[]) {
  memoryProjects = projects; // Update in-memory state
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    // This is expected on Vercel, so we just log and continue since in-memory is updated
    console.warn('Could not write to fs (likely Vercel environment). Data saved in memory only.');
  }
}

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, status, location, image, featured } = body;

    if (!title || !category || !status || !location || !image) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const projects = getProjects();
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    
    const newProject: Project = {
      id: newId,
      title,
      category,
      status,
      location,
      image,
      featured: featured || false,
    };

    projects.push(newProject);
    saveProjects(projects);

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

    let projects = getProjects();
    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== parseInt(id));

    if (projects.length === initialLength) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    saveProjects(projects);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing DELETE project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
