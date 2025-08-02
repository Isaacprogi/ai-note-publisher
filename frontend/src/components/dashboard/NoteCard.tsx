import React from "react";
import { type Note } from "../../types";
import { Pencil, Trash2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onImprove: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onImprove,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const navigate = useNavigate();
  const content =
    note.content.length > 150
      ? note.content.slice(0, 150) + "..."
      : note.content;
  return (
    <div
      onClick={() => navigate(`/${note._id}`)}
      className="border border-gray-200 px-4 py-5 hover:bg-gray-50 transition duration-200 h-full"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-end items-center mb-1">
          {note.isAiGenerated && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              AI
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-sm text-gray-700 mb-2 line-clamp-3">
          <ReactMarkdown>{content}</ReactMarkdown>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-sm text-blue-500 mb-2">
          {note.tags.map((tag, index) => (
            <span key={index} className="hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>

        {/* Spacer to push icons down */}
        <div className="flex-1" />

        {/* Footer (date + icons) */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 mt-2">
          <span>{formatDate(note.createdAt)}</span>

          <div className="flex gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onImprove(note._id);
              }}
              title="AI Improve"
              className="hover:text-green-600 transition"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(note);
              }}
              title="Edit Note"
              className="hover:text-blue-600 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(note._id);
              }}
              title="Delete Note"
              className="hover:text-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
