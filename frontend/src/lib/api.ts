import { Message } from "@/types";

/**
 * Uploads a PDF document to the backend server.
 * This is a stub function. When you are ready, uncomment the real `fetch` call.
 */
export async function uploadPDF(file: File): Promise<string> {
  // --- REAL IMPLEMENTATION EXAMPLE ---
  // const formData = new FormData();
  // formData.append("file", file);
  // const response = await fetch("YOUR_BACKEND_URL/upload", { method: "POST", body: formData });
  // const data = await response.json();
  // return data.documentId;

  console.log("Mock API Uploading file:", file.name, "Size:", file.size);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("mock-doc-id-12345");
    }, 1000);
  });
}

/**
 * Sends a chat message to the backend and returns the bot's response.
 * Uses the documentId we got from the upload step.
 */
export async function sendChatMessage(documentId: string, message: string, history: Message[]): Promise<string> {
  // --- REAL IMPLEMENTATION EXAMPLE ---
  // const response = await fetch("YOUR_BACKEND_URL/chat", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ documentId, message, history }),
  // });
  // const data = await response.json();
  // return data.answer;

  console.log("Mock API Sending message:", message, "DocID:", documentId);
  console.log("Context History length:", history.length);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`This is an API response placeholder for: "${message}". Your frontend is fully ready to connect to a backend!`);
    }, 1200);
  });
}
