from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parser import parse_mbank_csv
import uvicorn

app = FastAPI(title="Budget Tracker API")

origins = [
    "http://localhost:5173",
    "http://localhost:3000", 
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Pozwalamy tylko tym adresom
    allow_credentials=True,
    allow_methods=["*"],    # Pozwalamy na POST, GET, OPTIONS itd.
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "API is running", "message": "Go to /docs to test upload"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Endpoint przyjmuje plik .csv, parsuje go i zwraca JSON z podsumowaniem.
    """
    # Sprawdzenie czy to na pewno CSV
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV")

    try:
        content = await file.read()
        
        result = parse_mbank_csv(content)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)