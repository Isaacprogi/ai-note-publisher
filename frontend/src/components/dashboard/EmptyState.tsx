import React from 'react';

interface Props {
  notesExist: boolean;
  onCreate: () => void;
  onGenerate: () => void;
}

export const EmptyState: React.FC<Props> = ({ notesExist, onCreate, onGenerate }) => (
  <div className="text-center py-12">
    <div className="text-gray-400 text-6xl mb-4">📝</div>
    <h3 className="text-xl font-medium text-gray-900 mb-2">No notes found</h3>
    <p className="text-gray-500 mb-6">
      {notesExist ? 'Try adjusting your search or filter criteria.' : 'Create your first note or generate one with AI!'}
    </p>
    {!notesExist && (
      <div className="flex justify-center gap-3">
        <button onClick={onGenerate} className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors">
          Generate with AI
        </button>
        <button onClick={onCreate} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
          Create Manually
        </button>
      </div>
    )}
  </div>
);
