import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onNewCharacter: () => void;
  showNewButton: boolean;
}

export function Header({ onNewCharacter, showNewButton }: HeaderProps) {
  return (
    <motion.header 
      className="border-b border-white/20 bg-white/10 backdrop-blur-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Character Designer
            </h1>
            <p className="text-sm text-gray-600">AI-Powered Character Creation</p>
          </div>
        </div>
        
        {showNewButton && (
          <Button 
            onClick={onNewCharacter}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Character
          </Button>
        )}
      </div>
    </motion.header>
  );
}