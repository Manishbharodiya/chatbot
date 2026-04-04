from fastapi import APIRouter, File, UploadFile, HTTPException
import os
import uuid

# Ye APIRouter main.py me add_router ke zariye include kiya jayega (Modularity)
router = APIRouter()

# PDF ko bachane ke leye folder
UPLOAD_DIR = "uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    # Check if format is actually PDF
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Generate unique ID (taki agar purana "resume.pdf" pehale ka ho to wo override na ho)
    doc_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{doc_id}.pdf")
    
    try:
        # Path pe file save kardo backend me temporary
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # doc_id bhej dete hain wapis, taki frontend jab saawal puche "Ask" pe, to bata saky mujhe kis ID wale doc se parhna ha 
        return {"documentId": doc_id, "message": "File uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
