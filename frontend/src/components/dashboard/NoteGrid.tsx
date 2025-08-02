import React from 'react';
import type { Note } from '../../types';
import NoteCard from './NoteCard';

interface NoteGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onImprove: (id: string) => void;
}

export const NoteGrid: React.FC<NoteGridProps> = ({ notes, onEdit, onDelete, onImprove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note._id)}
          onImprove={() => onImprove(note._id)}
        />
      ))}
    </div>
  );
};
