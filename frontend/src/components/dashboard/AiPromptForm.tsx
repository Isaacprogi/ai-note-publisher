import React, { useState } from 'react';
import type { AiGenerateRequest } from '../../types';

interface Props {
  onGenerate: (data: AiGenerateRequest) => void;
  isLoading: boolean;
}

const AiPromptForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ prompt });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the note you want AI to generate..."
        className="w-full p-2 border border-gray-300 rounded h-40"
        required
      />
      <div className="flex justify-end gap-2">
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-purple-500 text-white rounded">
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </form>
  );
};

export default AiPromptForm;
