from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, ask

# The main Door open hota ha Backend ka yahan -> App Initialised. 
app = FastAPI(title="PDF Chatbot Backend")

# Next JS Localhost 3000 pe hota hai, default server blocks outside hosts. 
# So hum CORS ka bouncer laga ke btate ha "Han localhost:3000 se jo aye ussay andr ane do!"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Manager/Department Setup (The Router Injection) 
# MainGate(app) ko pata chal gaya ke konsay root routes hai.
app.include_router(upload.router)
app.include_router(ask.router)

# Health Check Api. (Awaen Check karna chal raha server ya nahi)
@app.get("/")
def read_root():
    return {"message": "Backend server is strictly running! You can hit APIs."}
