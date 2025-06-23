import React, { useState } from 'react';
import { Header } from './components/Header';
import { DescriptionInput } from './components/DescriptionInput';
import { GenerationResults } from './components/GenerationResults';

export interface CharacterData {
  name: string;
  age: string;
  gender: string;
  species: string;
  occupation: string;
  personalityTraits: string[];
  height: string;
  build: string;
  skinTone: string;
  hair: string;
  eyes: string;
  mainClothing: string;
  footwear: string;
  accessories: string;
  colorPalette: string;
  uniqueCharacteristics: string;
  expressions: string;
  artStyle: string;
  contextualBackground: string;
  additionalNotes: string;
}

function App() {
  const [generatedImages, setGeneratedImages] = useState<{
    front: string;
    side: string;
    back: string;
    description: string;
  } | null>(null);

  const handleSubmit = (desc: string) => {
    // Simulate AI generation with placeholder images
    setTimeout(() => {
      setGeneratedImages({
        front: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=face',
        side: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
        back: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
        description: desc
      });
    }, 2000);
  };

  const handleReset = () => {
    setGeneratedImages(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <Header onNewCharacter={handleReset} showNewButton={!!generatedImages} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!generatedImages ? (
          <DescriptionInput onSubmit={handleSubmit} />
        ) : (
          <GenerationResults 
            images={generatedImages} 
            characterData={{
              name: 'Character',
              age: '',
              gender: '',
              species: '',
              occupation: '',
              personalityTraits: [],
              height: '',
              build: '',
              skinTone: '',
              hair: '',
              eyes: '',
              mainClothing: '',
              footwear: '',
              accessories: '',
              colorPalette: '',
              uniqueCharacteristics: '',
              expressions: '',
              artStyle: '',
              contextualBackground: '',
              additionalNotes: ''
            }}
            onBack={handleReset}
            onNewCharacter={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;