"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, ArrowRight, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Routing ke liye
import { getSavedProjects } from '@/services/savedProjectsApi';

export default function SavedProjects() {
  const router = useRouter(); // Initialize router
  const [loading, setLoading] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);

  const getSavedProj = async () => {
    try {
      const res = await getSavedProjects();
      console.log("API Response:", res);
      // Agar response me success true hai, toh savedProjects state me data daal do
      if (res && res.success) {
        setSavedProjects(res.savedProjects);
      }
    } catch (error) {
      console.error("Failed to fetch saved projects:", error);
    } finally {
      // API call poori hone ke baad loading false kardo
      setLoading(false); 
    }
  };

  useEffect(() => {
    getSavedProj();
  }, []);

  // Loading State UI (Skeleton)
  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-10 bg-[#E5E7EB] rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-white border border-[#E5E7EB] rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Saved Projects</h1>
        <p className="text-[#6B7280]">Your curated bookmarks, patterns, and reference architectures.</p>
      </div>

      {savedProjects.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.97, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-12"
        >
          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-full text-[#6B7280] mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold">No Bookmarked Code Repositories</h3>
          <p className="text-sm text-[#6B7280] max-w-xs mt-2 mb-6">
            When browsing the global exploration page, click the bookmark action icon to save core files here.
          </p>
          <button 
            onClick={() => router.push('/explore')} 
            className="bg-[#2563EB] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:bg-[#3B82F6] transition-colors"
          >
            <span>Browse Explore Feed</span> <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProjects.map((project) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Project Thumbnail */}
              <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image Found
                  </div>
                )}
              </div>
              
              {/* Card Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-2 py-1 rounded-md">
                    <Heart className="w-3.5 h-3.5 mr-1 fill-gray-400 text-gray-400" />
                    {project.likes?.length || 0}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                  {project.description}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <hr className="border-gray-100 mb-4" />

                {/* Footer: Owner Info & Action Button */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={project.owner?.profileImage || 'https://via.placeholder.com/40'} 
                      alt={project.owner?.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700 truncate w-24" title={project.owner?.name}>
                      {project.owner?.name}
                    </span>
                  </div>
                  
                  {/* Open Project Button */}
                  <button 
                    onClick={() => router.push(`/projects/${project._id}`)}
                    className="flex items-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Open <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}