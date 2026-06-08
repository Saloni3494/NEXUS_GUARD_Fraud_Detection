Write-Host "Starting NexusGuard Services..."

Start-Process powershell -ArgumentList "-NoExit", "-Command", "title AI-Engine; cd ai-engine; python -m uvicorn inference_service:app --port 8001"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "title EIF-Mock; cd visual-analytics\eif_v_2; python -m uvicorn mock_eif:app --port 8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "title Security-Forensics; cd security-forensics; .\mvnw.cmd spring-boot:run"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "title Backend-Controller; cd backend; .\mvnw.cmd spring-boot:run"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "title Control-Tower-UI; cd control-tower; npm run dev"

Write-Host "All services launched in separate windows!"
