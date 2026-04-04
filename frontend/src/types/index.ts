export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface PDFDocument {
  file: File;
  name: string;
  size: number;
}
