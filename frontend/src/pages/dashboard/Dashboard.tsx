import React, { useEffect, useState } from "react";
import { notesApi } from "../../services/api";
import type { Note, CreateNoteRequest, AiGenerateRequest } from "../../types";
import { HeaderActions } from "../../components/dashboard/HeaderActions";
import { NoteSearchFilter } from "../../components/dashboard/NotesFilter";
import { NotificationToast } from "../../components/dashboard/NotificationToast";
import Modal from "../../components/Modal";
import { NoteGrid } from "../../components/dashboard/NoteGrid";
import { EmptyState } from "../../components/dashboard/EmptyState";
import NoteForm from "../../components/dashboard/NoteForm";
import AiPromptForm from "../../components/dashboard/AiPromptForm";

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const fetchedNotes = await notesApi.getAllNotes();
      setNotes(fetchedNotes);
    } catch {
      showNotification("Failed to fetch notes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNote = async (noteData: CreateNoteRequest) => {
    try {
      setIsLoading(true);
      const newNote = await notesApi.createNote(noteData);
      setNotes((prev) => [newNote, ...prev]);
      setShowCreateModal(false);
      showNotification("Note created successfully!", "success");
    } catch {
      showNotification("Failed to create note", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (noteData: CreateNoteRequest) => {
    if (!editingNote) return;
    try {
      setIsLoading(true);
      const updatedNote = await notesApi.updateNote(editingNote._id, noteData);
      setNotes((prev) =>
        prev.map((note) => (note._id === editingNote._id ? updatedNote : note))
      );
      setEditingNote(null);
      showNotification("Note updated successfully!", "success");
    } catch {
      showNotification("Failed to update note", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await notesApi.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      showNotification("Note deleted successfully!", "success");
    } catch {
      showNotification("Failed to delete note", "error");
    }
  };

  const handleImproveNote = async (id: string) => {
    try {
      setIsLoading(true);
      const improvedNote = await notesApi.improveWithAI(id);
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? improvedNote : note))
      );
      showNotification("Note improved with AI!", "success");
    } catch {
      showNotification("Failed to improve note", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiGenerate = async (request: AiGenerateRequest) => {
    try {
      setIsLoading(true);
      const generatedNote = await notesApi.generateWithAI(request);
      setNotes((prev) => [generatedNote, ...prev]);
      setShowAiModal(false);
      showNotification("AI note generated successfully!", "success");
    } catch {
      showNotification("Failed to generate AI note", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !filterTag || note.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  return (
    <div className="min-h-screen bg-white">
      {notification && <NotificationToast {...notification} />}

      <header className="bg-white  border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            📝 AI Note Publisher
          </h1>
          <HeaderActions
            onAiGenerate={() => setShowAiModal(true)}
            onCreateNote={() => setShowCreateModal(true)}
          />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white mb-6">
          <NoteSearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterTag={filterTag}
            onTagChange={setFilterTag}
            allTags={allTags}
          />
        </div>

        {isLoading && notes.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <EmptyState
            notesExist={notes.length > 0}
            onCreate={() => setShowCreateModal(true)}
            onGenerate={() => setShowAiModal(true)}
          />
        ) : (
          <NoteGrid
            notes={filteredNotes}
            onEdit={setEditingNote}
            onDelete={handleDeleteNote}
            onImprove={handleImproveNote}
          />
        )}
      </div>

      <Modal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        title="Generate Note with AI"
        showCancelButton={true}
        hasOverflow={true}
        extraStyle="max-w-[500px] mx-auto"
      >
        <AiPromptForm onGenerate={handleAiGenerate} isLoading={isLoading} />
      </Modal>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Note"
        showCancelButton={true}
        hasOverflow={true}
        extraStyle="max-w-[500px] mx-auto"
      >
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => setShowCreateModal(false)}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        title="Edit Note"
        showCancelButton={true}
        hasOverflow={true}
        extraStyle="max-w-[500px] mx-auto"
      >
        <NoteForm
          note={editingNote || undefined}
          onSubmit={handleUpdateNote}
          onCancel={() => setEditingNote(null)}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
