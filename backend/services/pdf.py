import fitz  # PyMuPDF is import as fitz

def extract_text_from_pdf(filepath: str) -> str:
    """Takes a PDF filepath and extracts text from all pages"""
    text = ""
    try:
        # Document open karna
        doc = fitz.open(filepath)
        for page in doc:
            # Sab text automatically nikal jayega Page-by-page
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text
