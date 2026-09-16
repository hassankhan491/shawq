'use client';

import { useState } from 'react';

export default function TestInteractivity() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = ['All', 'Fresh', 'Flower', 'Wood'];
  
  return (
    <div className="p-12">
      <h1 className="text-4xl font-serif mb-8">Interactivity Test</h1>
      
      {/* Test 1: Button Click */}
      <div className="mb-8">
        <p className="mb-4">Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-6 py-3 bg-[#2A2520] text-white"
        >
          Increment
        </button>
      </div>
      
      {/* Test 2: Tab Clicking */}
      <div className="mb-8">
        <p className="mb-4">Active Tab: {activeTab}</p>
        <div className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-4 py-2 border ${
                activeTab === tab.toLowerCase() 
                  ? 'border-[#2A2520] bg-[#2A2520] text-white' 
                  : 'border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Test 3: Filter Drawer */}
      <FilterTest />
    </div>
  );
}

function FilterTest() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 border border-[#2A2520]"
      >
        Open Filter Drawer
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/30" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-96 bg-[#FAF7F2] p-6">
            <button 
              onClick={() => setIsOpen(false)}
              className="mb-6 text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-serif mb-6">Filters</h2>
            <p>Drawer is working!</p>
          </div>
        </div>
      )}
    </div>
  );
}