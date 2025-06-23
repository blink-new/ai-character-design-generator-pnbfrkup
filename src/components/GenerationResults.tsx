import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Share2, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CharacterData } from '../App';

interface GenerationResultsProps {
  images: {
    front: string;
    side: string;
    back: string;
    description: string;
  };
  characterData: CharacterData;
  onBack: () => void;
  onNewCharacter: () => void;
}

export function GenerationResults({ images, characterData, onBack, onNewCharacter }: GenerationResultsProps) {
  const [selectedView, setSelectedView] = useState<'front' | 'side' | 'back'>('front');

  const views = [
    { key: 'front' as const, label: 'Front View', description: 'Shows facial features and main clothing details' },
    { key: 'side' as const, label: 'Side View', description: 'Highlights profile, posture, and silhouette' },
    { key: 'back' as const, label: 'Back View', description: 'Reveals back details of outfit and hair' }
  ];

  const handleDownload = (view: string) => {
    // In a real implementation, this would download the actual image
    const link = document.createElement('a');
    link.href = images[view as keyof typeof images] as string;
    link.download = `${characterData.name}-${view}-view.jpg`;
    link.click();
  };

  const handleDownloadAll = () => {
    views.forEach(view => {
      setTimeout(() => handleDownload(view.key), 100 * views.indexOf(view));
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="hover:bg-white/60"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Edit Character
        </Button>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleDownloadAll}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0"
          >
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
          <Button 
            onClick={onNewCharacter}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            New Character
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-3xl font-bold">
              {characterData.name}
            </CardTitle>
            <p className="text-purple-100">
              {characterData.age} • {characterData.species} • {characterData.occupation}
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Image Display */}
              <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                <div className="space-y-6">
                  {/* View Selector */}
                  <div className="flex justify-center space-x-2">
                    {views.map((view) => (
                      <Button
                        key={view.key}
                        onClick={() => setSelectedView(view.key)}
                        variant={selectedView === view.key ? "default" : "outline"}
                        className={`${
                          selectedView === view.key 
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0" 
                            : "hover:bg-white/60"
                        }`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {view.label}
                      </Button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <motion.div
                    key={selectedView}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center"
                  >
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
                      <img
                        src={images[selectedView]}
                        alt={`${characterData.name} - ${selectedView} view`}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/20 text-white backdrop-blur-sm">
                          {views.find(v => v.key === selectedView)?.label}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleDownload(selectedView)}
                        className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm border-0"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>

                  <p className="text-center text-gray-600 text-sm max-w-md mx-auto">
                    {views.find(v => v.key === selectedView)?.description}
                  </p>
                </div>
              </div>

              {/* Character Details */}
              <div className="bg-white p-8 space-y-6 overflow-y-auto max-h-96">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Character Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{images.description}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Personality Traits</h4>
                  <div className="flex flex-wrap gap-1">
                    {characterData.personalityTraits.map(trait => (
                      <Badge key={trait} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Physical</h4>
                    <p className="text-xs text-gray-600">{characterData.height} • {characterData.build} build</p>
                    <p className="text-xs text-gray-600">{characterData.skinTone} skin • {characterData.eyes}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Style</h4>
                    <p className="text-xs text-gray-600">{characterData.artStyle} art style</p>
                    <p className="text-xs text-gray-600">{characterData.colorPalette} palette</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Setting</h4>
                    <p className="text-xs text-gray-600">{characterData.contextualBackground}</p>
                  </div>
                </div>

                {characterData.additionalNotes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">Additional Notes</h4>
                      <p className="text-xs text-gray-600">{characterData.additionalNotes}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="bg-gray-50 p-6 border-t">
              <h4 className="font-semibold text-gray-800 mb-4 text-center">All Views</h4>
              <div className="grid grid-cols-3 gap-4">
                {views.map((view) => (
                  <motion.div
                    key={view.key}
                    whileHover={{ scale: 1.05 }}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${
                      selectedView === view.key ? 'ring-4 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedView(view.key)}
                  >
                    <img
                      src={images[view.key]}
                      alt={`${characterData.name} - ${view.label}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                      <p className="text-xs font-medium text-center">{view.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Share Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <Card className="border-0 bg-white/40 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Love your character?</h3>
                <p className="text-gray-600 text-sm mb-4">Share it with others or create another unique design!</p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" className="hover:bg-white/60">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Design
                  </Button>
                  <Button 
                    onClick={onNewCharacter}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                  >
                    Create Another
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}