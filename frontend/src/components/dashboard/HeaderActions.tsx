import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

interface Props {
  onAiGenerate: () => void;
  onCreateNote: () => void;
}

export const HeaderActions: React.FC<Props> = ({ onAiGenerate, onCreateNote }) => (
  <div className="flex gap-3">
    <button
      onClick={onAiGenerate}
      className="group p-2 rounded-xl border border-gray-300 bg-white hover:shadow-xl hover:border-purple-500 transition-all"
      aria-label="AI Generate"
    >
      <Sparkles className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
    </button>
    <button
      onClick={onCreateNote}
      className="group p-2 rounded-xl border border-gray-300 bg-white hover:shadow-xl hover:border-blue-500 transition-all"
      aria-label="New Note"
    >
      <Plus className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
    </button>
  </div>
);
