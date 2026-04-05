import os
import google.generativeai as genai
from dotenv import load_dotenv

# .env se secret keys read karwana
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def get_gemini_response(context_text: str, user_question: str) -> str:
    """Sends the document text + user question to Gemini AI"""
    try:
        # Gemini 2.5 Flash is the latest supported version for your api key
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # Ek Accha prompt define karna zaroori hai model instructions ke liye. 
        prompt = f"""
        Based on the following document context, please answer the user's question clearly.
        If the answer is not in the context, you can mention that.
        
        Document Context:
        {context_text}
        
        User Question: {user_question}
        """
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Sorry, an error occurred with the AI: {str(e)}"
