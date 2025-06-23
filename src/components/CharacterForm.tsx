import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Palette, Settings, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { CharacterData } from '../App';

interface CharacterFormProps {
  onSubmit: (data: CharacterData) => void;
  onBack: () => void;
  initialData: CharacterData | null;
}

export function CharacterForm({ onSubmit, onBack, initialData }: CharacterFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState<CharacterData>(initialData || {
    name: '',
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
  });

  const steps = [
    {
      title: 'Character Overview',
      icon: User,
      fields: ['name', 'age', 'gender', 'species', 'occupation', 'personalityTraits']
    },
    {
      title: 'Physical Description',
      icon: Palette,
      fields: ['height', 'build', 'skinTone', 'hair', 'eyes']
    },
    {
      title: 'Style & Details',
      icon: Settings,
      fields: ['mainClothing', 'footwear', 'accessories', 'colorPalette', 'uniqueCharacteristics', 'expressions', 'artStyle', 'contextualBackground', 'additionalNotes']
    }
  ];

  const handleInputChange = (field: keyof CharacterData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPersonalityTrait = (trait: string) => {
    if (trait && !formData.personalityTraits.includes(trait)) {
      handleInputChange('personalityTraits', [...formData.personalityTraits, trait]);
    }
  };

  const removePersonalityTrait = (trait: string) => {
    handleInputChange('personalityTraits', formData.personalityTraits.filter(t => t !== trait));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    await onSubmit(formData);
  };

  const canProceed = () => {
    const currentStepFields = steps[currentStep].fields;
    return currentStepFields.every(field => {
      if (field === 'personalityTraits') {
        return formData.personalityTraits.length > 0;
      }
      return formData[field as keyof CharacterData];
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Character Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Aria Moonwhisper"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="e.g., 25 years old"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Input
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  placeholder="e.g., Female, Male, Non-binary, Other"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species">Species/Race *</Label>
                <Input
                  id="species"
                  value={formData.species}
                  onChange={(e) => handleInputChange('species', e.target.value)}
                  placeholder="e.g., Human, Elf, Dragon"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation/Role *</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                placeholder="e.g., Mage, Warrior, Scholar"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personality-traits">Personality Traits * (Add 3-5 traits)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.personalityTraits.map(trait => (
                  <Badge 
                    key={trait} 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => removePersonalityTrait(trait)}
                  >
                    {trait} ×
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="trait-input"
                  placeholder="e.g., Brave, Curious, Mysterious"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addPersonalityTrait(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('trait-input') as HTMLInputElement;
                    addPersonalityTrait(input.value);
                    input.value = '';
                  }}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="height">Height *</Label>
                <Input
                  id="height"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder="e.g., 5'6 feet (168cm)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="build">Build *</Label>
                <Input
                  id="build"
                  value={formData.build}
                  onChange={(e) => handleInputChange('build', e.target.value)}
                  placeholder="e.g., Slender, Athletic, Muscular, Average, Stocky, Petite"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skinTone">Skin Tone *</Label>
              <Input
                id="skinTone"
                value={formData.skinTone}
                onChange={(e) => handleInputChange('skinTone', e.target.value)}
                placeholder="e.g., Pale, Olive, Dark, Golden"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hair">Hair Description *</Label>
              <Textarea
                id="hair"
                value={formData.hair}
                onChange={(e) => handleInputChange('hair', e.target.value)}
                placeholder="e.g., Long flowing silver hair with braids"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eyes">Eyes Description *</Label>
              <Input
                id="eyes"
                value={formData.eyes}
                onChange={(e) => handleInputChange('eyes', e.target.value)}
                placeholder="e.g., Bright blue eyes, almond-shaped"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mainClothing">Main Clothing *</Label>
              <Textarea
                id="mainClothing"
                value={formData.mainClothing}
                onChange={(e) => handleInputChange('mainClothing', e.target.value)}
                placeholder="e.g., Flowing robes with intricate embroidery, leather armor"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="footwear">Footwear *</Label>
                <Input
                  id="footwear"
                  value={formData.footwear}
                  onChange={(e) => handleInputChange('footwear', e.target.value)}
                  placeholder="e.g., Leather boots, sandals"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colorPalette">Color Palette *</Label>
                <Input
                  id="colorPalette"
                  value={formData.colorPalette}
                  onChange={(e) => handleInputChange('colorPalette', e.target.value)}
                  placeholder="e.g., Deep blues and silver"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessories">Accessories *</Label>
              <Textarea
                id="accessories"
                value={formData.accessories}
                onChange={(e) => handleInputChange('accessories', e.target.value)}
                placeholder="e.g., Crystal pendant, leather gauntlets, magic staff"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uniqueCharacteristics">Unique Characteristics *</Label>
              <Textarea
                id="uniqueCharacteristics"
                value={formData.uniqueCharacteristics}
                onChange={(e) => handleInputChange('uniqueCharacteristics', e.target.value)}
                placeholder="e.g., Glowing tattoos, scar across left cheek"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expressions">Notable Expressions *</Label>
              <Input
                id="expressions"
                value={formData.expressions}
                onChange={(e) => handleInputChange('expressions', e.target.value)}
                placeholder="e.g., Confident smile, mysterious gaze"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artStyle">Art Style *</Label>
              <Input
                id="artStyle"
                value={formData.artStyle}
                onChange={(e) => handleInputChange('artStyle', e.target.value)}
                placeholder="e.g., Realistic, Anime, Cartoon, Comic Book, Fantasy Art, Minimalist"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contextualBackground">World/Setting Background *</Label>
              <Textarea
                id="contextualBackground"
                value={formData.contextualBackground}
                onChange={(e) => handleInputChange('contextualBackground', e.target.value)}
                placeholder="e.g., Medieval fantasy world with magic, modern cyberpunk city"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any other details you'd like to emphasize..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center border-0 bg-white/60 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8 space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-16 w-16 mx-auto text-purple-600" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-800">Creating Your Character</h3>
              <p className="text-gray-600">Our AI is generating your character designs...</p>
            </div>
            <motion.div 
              className="h-2 bg-gray-200 rounded-full"
              initial={{ width: 0 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
              />
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="hover:bg-white/60"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentStep ? 'bg-purple-600' : index < currentStep ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {React.createElement(steps[currentStep].icon, { className: "h-8 w-8 text-white" })}
              </div>
              <CardTitle className="text-2xl text-gray-800">
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {renderStepContent()}

              <div className="flex justify-between pt-8">
                <Button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  variant="outline"
                  disabled={currentStep === 0}
                  className="hover:bg-white/60"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Character
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}