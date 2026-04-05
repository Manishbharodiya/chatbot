from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, ask

app = FastAPI(title="PDF Chatbot Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(ask.router)

@app.get("/")
def read_root():
    return {"message": "Backend server is strictly running! You can hit APIs."}
