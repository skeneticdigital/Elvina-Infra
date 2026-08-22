'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  location: string;
  image: string;
  featured: boolean;
}
const categories = ['All', 'Residential', 'Commercial', 'Road Contract'];

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => 
    activeCategory === 'All' ? true : project.category === activeCategory
  );

  return (
    <section className="py-24 bg-[#050C16] text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Space</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Explore our premium selection of apartments, villas, commercial hubs, and major infrastructure road contracts across top locations.
          </p>
        </div>

        {/* Filter Bar (Pill style instead of boring dropdowns) */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${
                activeCategory === category 
                  ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-lg shadow-[#3B82F6]/30' 
                  : 'bg-[#0E223D] text-neutral-400 border-[#1B4D89]/40 hover:border-[#3B82F6] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid (Uniform aligned layout) */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative group rounded-2xl overflow-hidden shadow-2xl border border-[#1B4D89]/20 bg-[#0E223D] h-[380px] md:h-[420px]"
              >
                {/* Background Image */}
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C16] via-[#050C16]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Badges (Top Left & Top Right) */}
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="bg-[#1B4D89]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded border border-[#3B82F6]/50 shadow-lg">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-5 right-5">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded border backdrop-blur-md shadow-lg ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 
                    project.status === 'Pre-Order' ? 'bg-[#B58529]/20 text-[#B58529] border-[#B58529]/50' : 
                    'bg-neutral-500/20 text-neutral-300 border-neutral-500/50'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Content (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-6 pb-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                    {project.title}
                  </h3>
                  <div className="flex items-center text-neutral-300 text-sm font-medium">
                    <MapPin className="w-4 h-4 mr-1.5 text-[#3B82F6]" />
                    {project.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            No projects found in this category.
          </div>
        )}

      </div>
    </section>
  );
}
