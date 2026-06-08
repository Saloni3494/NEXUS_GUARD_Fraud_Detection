from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

class EIFRequest(BaseModel):
    features: list[float]

@app.post("/v1/eif/score")
def score_endpoint(req: EIFRequest):
    # Dummy mock implementation
    score = 0.65
    confidence = round(abs(score - 0.5) * 2, 3)
    is_anomalous = int(score >= 0.5)
    return JSONResponse(
        content={
            "model": "EIF",
            "version": "v2.1",
            "score": score,
            "isAnomalous": is_anomalous,
            "confidence": confidence,
            "topFactors": {
                "velocity": 0.4,
                "burst": 0.3
            },
            "explanation": "High velocity anomaly detected by mocked EIF service."
        }
    )

@app.get("/health")
def health():
    return {"status": "ok"}
