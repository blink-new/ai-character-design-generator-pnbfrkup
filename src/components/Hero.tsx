import React from 'react';
import { motion } from 'framer-motion';
import { User, Palette, Camera, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface HeroProps {
  onStartCreating: () => void;
}

export function Hero({ onStartCreating }: HeroProps) {
  const features = [
    {
      icon: User,
      title: "Detailed Characters",
      description: "Create rich character profiles with personality, background, and physical traits"
    },
    {
      icon: Camera,
      title: "Three View Design",
      description: "Generate front, side, and back views for complete character visualization"
    },
    {
      icon: Palette,
      title: "Multiple Art Styles",
      description: "Choose from realistic, anime, cartoon, and other artistic styles"
    }
  ];

  return (
    <div className="text-center space-y-12">
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          Create Amazing<br />Character Designs
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transform your character ideas into stunning visual designs with our AI-powered tool. 
          Get detailed front, side, and back views in your preferred art style.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onStartCreating}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl shadow-xl border-0 group"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          >
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1">
              <CardContent className="p-8 text-center space-y-4">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-2">
            <div className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">1</div>
            <h4 className="font-semibold text-gray-800">Fill Character Details</h4>
            <p className="text-gray-600 text-sm">Provide comprehensive information about your character's appearance, personality, and background.</p>
          </div>
          <div className="space-y-2">
            <div className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">2</div>
            <h4 className="font-semibold text-gray-800">AI Generation</h4>
            <p className="text-gray-600 text-sm">Our AI processes your inputs and creates detailed character designs in your chosen art style.</p>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">3</div>
            <h4 className="font-semibold text-gray-800">Download Results</h4>
            <p className="text-gray-600 text-sm">Get your character designs with front, side, and back views plus detailed descriptions.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}