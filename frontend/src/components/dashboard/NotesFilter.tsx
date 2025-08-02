import React from 'react';

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterTag: string;
  onTagChange: (value: string) => void;
  allTags: string[];
}

export const NoteSearchFilter: React.FC<Props> = ({
  searchTerm,
  onSearchChange,
  filterTag,
  onTagChange,
  allTags,
}) => (
  <div className="flex flex-col md:flex-row gap-4">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search notes..."
      className="w-full max-w-[20rem] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <select
      value={filterTag}
      onChange={(e) => onTagChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Tags</option>
      {allTags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  </div>
);
