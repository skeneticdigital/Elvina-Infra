'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Search, LogOut, Briefcase, Plus, X, Image as ImageIcon, MapPin } from 'lucide-react';
import TransparentLogo from '@/components/TransparentLogo';
import type { Inquiry } from '../api/inquiries/route';
import type { Project } from '../api/projects/route';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects' | 'chatbot'>('inquiries');

  // Chatbot State
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchInquiry, setSearchInquiry] = useState('');
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  
  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Residential',
    status: 'Live',
    location: '',
    image: '',
    featured: false,
  });

  // Check auth state on mount
  useEffect(() => {
    const authState = localStorage.getItem('elvina_admin_auth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
      fetchProjects();
      fetchFaqs();
    }
  }, [isAuthenticated]);

  const fetchFaqs = async () => {
    setIsLoadingFaqs(true);
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
    } finally {
      setIsLoadingFaqs(false);
    }
  };

  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('elvina_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('elvina_admin_auth');
    setUsername('');
    setPassword('');
  };

  // Inquiry Actions
  const markAsRead = async (id: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Read' }),
      });
      if (res.ok) {
        fetchInquiries(); // Refresh list
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchInquiries(); // Refresh list
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    }
  };

  // Project Actions
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        fetchProjects();
        setShowAddProject(false);
        setNewProject({
          title: '',
          category: 'Residential',
          status: 'Live',
          location: '',
          image: '',
          featured: false,
        });
      } else {
        alert('Failed to add project. Please check fields.');
      }
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProjects(); // Refresh list
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  // Chatbot FAQ Actions
  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaq),
      });
      if (res.ok) {
        fetchFaqs();
        setNewFaq({ question: '', answer: '' });
      } else {
        alert('Failed to add FAQ.');
      }
    } catch (error) {
      console.error('Failed to add FAQ:', error);
    }
  };

  const deleteFaq = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/faqs?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchFaqs();
      }
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
    }
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter(inq => 
    inq.name.toLowerCase().includes(searchInquiry.toLowerCase()) || 
    inq.email.toLowerCase().includes(searchInquiry.toLowerCase()) ||
    inq.projectType.toLowerCase().includes(searchInquiry.toLowerCase())
  );

  const unreadCount = inquiries.filter(i => i.status === 'Unread').length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#071220] flex items-center justify-center p-4">
        <div className="bg-[#0E223D]/80 backdrop-blur-md border border-[#1B4D89]/40 p-10 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B82F6] to-[#0E223D]" />
          
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-[#050C16] rounded-xl flex items-center justify-center border border-[#1B4D89]/30 shadow-inner">
              <TransparentLogo className="object-contain w-full h-full scale-[1.2]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white text-center mb-8 uppercase tracking-widest">Admin Portal</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs font-mono text-center">{loginError}</p>
            )}

            <button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-widest text-sm py-3 rounded-lg transition-colors mt-4">
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071220] text-white flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0E223D] border-b md:border-b-0 md:border-r border-[#1B4D89]/40 md:min-h-screen flex flex-col sticky top-0 z-50 md:h-screen flex-shrink-0">
        <div className="p-4 md:p-6 border-b border-[#1B4D89]/40 flex flex-row md:flex-col items-center justify-between md:justify-start">
          <div className="flex items-center gap-4 md:flex-col md:mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#050C16] rounded-lg flex items-center justify-center border border-[#1B4D89]/30">
              <TransparentLogo className="object-contain w-full h-full scale-[1.2]" />
            </div>
            <h1 className="text-sm font-bold uppercase tracking-widest text-center hidden md:block">Admin Dashboard</h1>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={handleLogout} className="flex items-center space-x-1 text-neutral-400 hover:text-white transition-colors p-2 bg-[#050C16] rounded-md border border-[#1B4D89]/30">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Tabs - Stacked Vertically on Desktop, Scrollable horizontally on Mobile */}
        <nav className="p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`flex-shrink-0 md:w-full text-left px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'inquiries' ? 'bg-[#3B82F6] text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-neutral-400 hover:text-white hover:bg-[#1B4D89]/20'}`}
          >
            Inquiries
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-shrink-0 md:w-full text-left px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'projects' ? 'bg-[#3B82F6] text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-neutral-400 hover:text-white hover:bg-[#1B4D89]/20'}`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('chatbot')}
            className={`flex-shrink-0 md:w-full text-left px-4 py-3 text-xs md:text-sm font-bold uppercase tracking-wider rounded-md transition-colors ${activeTab === 'chatbot' ? 'bg-[#3B82F6] text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-neutral-400 hover:text-white hover:bg-[#1B4D89]/20'}`}
          >
            Chatbot FAQs
          </button>
        </nav>

        <div className="p-6 border-t border-[#1B4D89]/40 mt-auto hidden md:flex flex-col gap-4">
          <div className="text-xs font-mono text-neutral-400 text-center">
            Welcome, <span className="text-white font-bold">Admin</span>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center space-x-2 text-neutral-400 hover:text-white transition-colors w-full bg-[#050C16] hover:bg-red-500/10 hover:text-red-400 py-3 rounded-md border border-[#1B4D89]/30 hover:border-red-500/30">
            <LogOut className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow p-4 md:p-10 w-full h-full md:h-screen md:overflow-y-auto">
        <div className="max-w-6xl mx-auto">
        
        {/* INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#0E223D]/50 border border-[#1B4D89]/30 rounded-xl p-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">Total Inquiries</p>
                <p className="text-4xl font-black text-white">{inquiries.length}</p>
              </div>
              <div className="bg-[#0E223D]/50 border border-[#1B4D89]/30 rounded-xl p-6 relative overflow-hidden">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">Unread</p>
                <p className={`text-4xl font-black ${unreadCount > 0 ? 'text-[#3B82F6]' : 'text-white'}`}>{unreadCount}</p>
                {unreadCount > 0 && <div className="absolute top-0 right-0 w-2 h-full bg-[#3B82F6]" />}
              </div>
              <div className="bg-[#0E223D]/50 border border-[#1B4D89]/30 rounded-xl p-6">
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">Replied</p>
                <p className="text-4xl font-black text-white">{inquiries.filter(i => i.status === 'Replied').length}</p>
              </div>
            </div>

            {/* Tools Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-wider">Inquiries</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Search inquiries..." 
                  value={searchInquiry}
                  onChange={(e) => setSearchInquiry(e.target.value)}
                  className="w-full sm:w-80 bg-[#0E223D] border border-[#1B4D89]/40 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-6">
              {isLoadingInquiries ? (
                <div className="text-center py-20 text-neutral-500 font-mono">Loading inquiries...</div>
              ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-20 text-neutral-500 bg-[#0E223D]/20 rounded-xl border border-dashed border-[#1B4D89]/30">
                  No inquiries found.
                </div>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className={`bg-[#0E223D]/50 border rounded-xl p-6 transition-colors ${inquiry.status === 'Unread' ? 'border-[#3B82F6]/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-[#1B4D89]/30'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-[#1B4D89]/20">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold">{inquiry.name}</h3>
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                            inquiry.status === 'Unread' ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/50' : 
                            'bg-neutral-800 text-neutral-400 border border-neutral-700'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-neutral-400 font-mono gap-4">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(inquiry.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {inquiry.status === 'Unread' && (
                          <button onClick={() => markAsRead(inquiry.id)} className="flex items-center justify-center p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20 transition-colors" title="Mark as Read">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button onClick={() => deleteInquiry(inquiry.id)} className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-colors" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">Email</p>
                        <div className="flex items-center text-sm text-neutral-300">
                          <Mail className="w-4 h-4 mr-2 text-[#3B82F6]" /> {inquiry.email}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">Phone</p>
                        <div className="flex items-center text-sm text-neutral-300">
                          <Phone className="w-4 h-4 mr-2 text-[#3B82F6]" /> {inquiry.phone || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">Project Type</p>
                        <p className="text-sm text-neutral-300">{inquiry.projectType || 'N/A'}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Message</p>
                      <div className="bg-[#050C16] p-4 rounded-lg border border-[#1B4D89]/20 text-sm text-neutral-300 whitespace-pre-wrap">
                        {inquiry.message}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-wider">Manage Projects</h2>
              <button 
                onClick={() => setShowAddProject(!showAddProject)}
                className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors"
              >
                {showAddProject ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Project</>}
              </button>
            </div>

            {/* Add Project Form */}
            {showAddProject && (
              <div className="bg-[#0E223D]/80 border border-[#3B82F6]/50 rounded-xl p-6 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest border-b border-[#1B4D89]/30 pb-4">Add New Project</h3>
                <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Project Title</label>
                    <input 
                      type="text" 
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Category</label>
                    <select 
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                      required
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Road Contract">Road Contract</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Status</label>
                    <select 
                      value={newProject.status}
                      onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                      className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                      required
                    >
                      <option value="Live">Live</option>
                      <option value="Pre-Order">Pre-Order</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Location</label>
                    <input 
                      type="text" 
                      value={newProject.location}
                      onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                      className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Image URL</label>
                    <div className="relative">
                      <ImageIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                      <input 
                        type="url" 
                        value={newProject.image}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                        required
                      />
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1 font-mono">Use direct image links (e.g. from Unsplash or image hosting services).</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={newProject.featured}
                        onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                        className="w-5 h-5 rounded border-[#1B4D89] bg-[#050C16] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-[#050C16]"
                      />
                      <span className="text-sm font-mono text-neutral-300">Featured Project</span>
                    </label>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors">
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isLoadingProjects ? (
                <div className="col-span-2 text-center py-20 text-neutral-500 font-mono">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="col-span-2 text-center py-20 text-neutral-500 bg-[#0E223D]/20 rounded-xl border border-dashed border-[#1B4D89]/30">
                  No projects found.
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="bg-[#0E223D]/50 border border-[#1B4D89]/30 rounded-xl p-4 flex gap-4 transition-colors hover:border-[#1B4D89]/60 group">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden relative bg-[#050C16]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg leading-tight mb-1">{project.title}</h3>
                          <button onClick={() => deleteProject(project.id)} className="p-1.5 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-[#1B4D89]/50 bg-[#050C16] text-neutral-300">{project.category}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            project.status === 'Live' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 
                            project.status === 'Pre-Order' ? 'bg-[#B58529]/10 text-[#B58529] border-[#B58529]/30' : 
                            'bg-neutral-500/10 text-neutral-300 border-neutral-500/30'
                          }`}>{project.status}</span>
                        </div>
                        <div className="flex items-center text-xs text-neutral-400">
                          <MapPin className="w-3 h-3 mr-1 text-[#3B82F6]" /> {project.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* CHATBOT TAB */}
        {activeTab === 'chatbot' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-wider">Manage Chatbot FAQs</h2>
            </div>

            {/* Add FAQ Form */}
            <div className="bg-[#0E223D]/80 border border-[#3B82F6]/50 rounded-xl p-6 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              <h3 className="text-lg font-bold mb-4 uppercase tracking-widest border-b border-[#1B4D89]/30 pb-4">Add New Pre-defined Question</h3>
              <form onSubmit={handleAddFaq} className="flex flex-col gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Question</label>
                  <input 
                    type="text" 
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                    placeholder="e.g. What services do you offer?"
                    className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6]" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Answer</label>
                  <textarea 
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                    placeholder="Provide the predefined answer for the chatbot to reply with..."
                    rows={3}
                    className="w-full bg-[#050C16] border border-[#1B4D89]/40 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#3B82F6] resize-none" 
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors">
                    Add Question
                  </button>
                </div>
              </form>
            </div>

            {/* FAQs List */}
            <div className="grid grid-cols-1 gap-6">
              {isLoadingFaqs ? (
                <div className="text-center py-20 text-neutral-500 font-mono">Loading FAQs...</div>
              ) : faqs.length === 0 ? (
                <div className="text-center py-20 text-neutral-500 bg-[#0E223D]/20 rounded-xl border border-dashed border-[#1B4D89]/30">
                  No FAQs found.
                </div>
              ) : (
                faqs.map((faq) => (
                  <div key={faq.id} className="bg-[#0E223D]/50 border border-[#1B4D89]/30 rounded-xl p-6 transition-colors hover:border-[#1B4D89]/60 group relative">
                    <button 
                      onClick={() => deleteFaq(faq.id)} 
                      className="absolute top-4 right-4 p-2 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="mb-2 pr-10">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Question</span>
                      <h4 className="font-bold text-lg text-white">"{faq.question}"</h4>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">Answer</span>
                      <p className="text-sm text-neutral-300 whitespace-pre-wrap bg-[#050C16] p-4 rounded border border-[#1B4D89]/20">{faq.answer}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
        </div>
      </div>
    </main>
  );
}
