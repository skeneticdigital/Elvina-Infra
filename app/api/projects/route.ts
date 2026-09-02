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

function getProjects(): Project[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading projects data from fs, falling back to bundled data:', error);
  }
  return projectsData as Project[];
}

function saveProjects(projects: Project[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing projects data:', error);
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
