import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface DescriptionInputProps {
  onSubmit: (description: string) => void;
}

export function DescriptionInput({ onSubmit }: DescriptionInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="description" className="block mb-2 text-lg font-semibold text-gray-800">
          Enter your character description
        </Label>
        <Textarea
          id="description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your full character description here..."
          rows={10}
          className="resize-y"
          required
        />
      </div>
      <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 px-6 py-3 rounded-lg shadow-lg">
        Generate Character Designs
      </Button>
    </form>
  );
}
