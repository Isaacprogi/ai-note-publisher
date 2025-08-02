export interface Note {
  _id: string;
  prompt: string;
  content: string;
  tags: string[];
  isAiGenerated: boolean;
  aiPrompt?: string;
  published: boolean;
  telegramMessageId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  content: string;
  tags?: string[];
  published?: boolean;
}

export interface AiGenerateRequest {
  prompt: string;
  title?: string;
}