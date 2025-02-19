import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonyService } from '../services/testimony';
import { useTestimonyStore } from '../store/testimonyStore';
import { Testimony } from '../types/testimony';

// Simple chevron SVG components
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// Add TrashIcon component
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const testimonies = testimonyService.getAllTestimonies();
  const categories = testimonyService.getAllCategories();
  const allTags = testimonyService.getAllTags();
  
  const { setContent, setTitle } = useTestimonyStore();

  const filteredTestimonies = testimonies.filter(testimony => {
    const matchesSearch = searchTerm === '' || 
      testimony.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimony.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || 
      testimony.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => testimony.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const loadTestimony = (id: string) => {
    const testimony = testimonyService.getTestimonyById(id);
    if (testimony) {
      setContent(testimony.content);
      setTitle(testimony.title);
    }
  };

  const deleteTestimony = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this testimony?')) {
      testimonyService.deleteTestimony(id);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <motion.div
      initial={{ width: 300 }}
      animate={{ width: isOpen ? 300 : 50 }}
      className="fixed left-0 top-0 h-screen bg-white shadow-lg flex z-10"
    >
      <div className="flex-1 overflow-hidden">
        {isOpen && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Saved Testimonies</h2>
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search testimonies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
            />

            {/* Categories */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Tags */}
            <div className="mb-4 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Testimony List */}
            <div className="space-y-2">
              {filteredTestimonies.length === 0 ? (
                <p className="text-gray-500 text-sm">No testimonies found</p>
              ) : (
                filteredTestimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="relative group"
                  >
                    <button
                      onClick={() => loadTestimony(testimony.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h3 className="font-medium truncate">{testimony.title}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {testimony.content.substring(0, 50)}...
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                          {testimony.category}
                        </span>
                        {testimony.tags.map(tag => (
                          <span key={tag} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 block mt-1">
                        {new Date(testimony.updatedAt).toLocaleDateString()}
                      </span>
                    </button>
                    <button
                      onClick={(e) => deleteTestimony(e, testimony.id)}
                      className="absolute right-2 top-2 p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-24 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors absolute -right-6 top-1/2 transform -translate-y-1/2 rounded-r-lg"
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </motion.div>
  );
}; 