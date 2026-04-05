import { Message } from "@/types";

export async function uploadPDF(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch("http://127.0.0.1:8000/upload", { 
    method: "POST", 
    body: formData 
  });
  
  if (!response.ok) {
    throw new Error("Failed to upload PDF");
  }
  
  const data = await response.json();
  return data.documentId;
}

export async function sendChatMessage(documentId: string, message: string, history: Message[]): Promise<string> {
  const response = await fetch("http://127.0.0.1:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document_id: documentId, message, history }),
  });
  
  if (!response.ok) {
    throw new Error("Failed to get response");
  }
  
  const data = await response.json();
  return data.answer;
}
