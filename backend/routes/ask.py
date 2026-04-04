from fastapi import APIRouter, HTTPException
from models.schemas import AskRequest
from services.pdf import extract_text_from_pdf
from services.gemini import get_gemini_response
import os

router = APIRouter()
UPLOAD_DIR = "uploaded_pdfs"

@router.post("/ask")
async def ask_question(request: AskRequest):
    # Jo document_id /upload route ne usay dia, wo hi usne request me bheja. Ab us path pe jao.
    file_path = os.path.join(UPLOAD_DIR, f"{request.document_id}.pdf")
    
    # Bouncer 1: Kya aisi file exixt krti ha? 
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Document not found. Please upload again.")
        
    # Step 1: Mazdur 1 - Jao Text Nikalo and Wapis Laon (Call Service PDF)
    document_text = extract_text_from_pdf(file_path)
    
    if not document_text:
        raise HTTPException(status_code=400, detail="Could not extract text from document.")
        
    # Step 2: Mazdur 2 - Jao ye Text aur Sawaal Gemini ko ddo (Call Service Gemini)
    answer = get_gemini_response(document_text, request.message)
    
    # Return directly to API hit (The user will receive an Answer)
    return {"answer": answer}
