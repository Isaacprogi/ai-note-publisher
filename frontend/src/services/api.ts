import axios from 'axios';
import type { Note,CreateNoteRequest,AiGenerateRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  // Get all notes
  getAllNotes: (): Promise<Note[]> => 
    api.get('/notes').then(response => response.data),

  // Get single note
  getNote: (id: string): Promise<Note> =>
    api.get(`/notes/${id}`).then(response => response.data),

  // Create note
  createNote: (note: CreateNoteRequest): Promise<Note> =>
    api.post('/notes', note).then(response => response.data),

  // Update note
  updateNote: (id: string, note: Partial<CreateNoteRequest>): Promise<Note> =>
    api.put(`/notes/${id}`, note).then(response => response.data),

  // Delete note
  deleteNote: (id: string): Promise<void> =>
    api.delete(`/notes/${id}`).then(response => response.data),

  // AI Generate note
  generateWithAI: (request: AiGenerateRequest): Promise<Note> =>
    api.post('/ai/generate', request).then(response => response.data),

  // AI Improve note
  improveWithAI: (id: string): Promise<Note> =>
    api.post(`/ai/improve/${id}`).then(response => response.data),
};