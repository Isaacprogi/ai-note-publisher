import React, { useState } from 'react';
import type { Note,CreateNoteRequest } from '../../types';

interface Props {
  note?: Note;
  onSubmit: (data: CreateNoteRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const NoteForm: React.FC<Props> = ({ note, onSubmit, onCancel, isLoading }) => {
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: CreateNoteRequest = {
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 border border-gray-300 rounded h-40"
        required
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
