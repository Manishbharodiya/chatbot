from pydantic import BaseModel

# BaseModel ke zariye hum FastAPI ko btate hain ki jo 'ask' request hai usme kya kya format aana chaiye
class AskRequest(BaseModel):
    document_id: str
    message: str
    history: list = []  # Empty array by default agar pehli bar chat ho rahi ho
