import json
import time
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import uvicorn
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS IoT configuration
endpoint = os.getenv("AWS_IOT_ENDPOINT")
client_id = os.getenv("AWS_IOT_CLIENT_ID")
topic = os.getenv("AWS_IOT_TOPIC")

cert_path = os.getenv("AWS_IOT_CERT_PATH")
private_key_path = os.getenv("AWS_IOT_PRIVATE_KEY_PATH")
root_ca_path = os.getenv("AWS_IOT_ROOT_CA_PATH")

mqtt_client = AWSIoTMQTTClient(client_id)
mqtt_client.configureEndpoint(endpoint, 8883)
mqtt_client.configureCredentials(root_ca_path, private_key_path, cert_path)

mqtt_client.connect()
print("Connected to AWS IoT Core")

@app.post("/send_command")
async def send_command(action: str):
    valid_actions = ["forward", "backward", "left", "right", "stop"]
    if action not in valid_actions:
        raise HTTPException(status_code=400, detail="Invalid action")
    
    message = json.dumps({"action": action, "timestamp": time.time()})
    mqtt_client.publish(topic, message, 1)
    return {"status": "success", "message": f"Command '{action}' sent to rover"}

@app.get("/")
async def root():
    return {"message": "Welcome to the Rover Control Server"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)