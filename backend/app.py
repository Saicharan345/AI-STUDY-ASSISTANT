from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dotenv import load_dotenv
from groq import Groq

from prompt import PROMPT

import os
import json

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Schema
class TopicRequest(BaseModel):
    topic: str


# Home Route
@app.get("/")
def home():
    return {
        "message": "AI Study Assistant Backend Running Successfully 🚀"
    }


# Generate Route
@app.post("/generate")
def generate(data: TopicRequest):

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": PROMPT
                },
                {
                    "role": "user",
                    "content": data.topic
                }
            ],
            temperature=0.5,
        )

        ai_output = response.choices[0].message.content.strip()

        # Remove Markdown code fences if Groq returns them
        if ai_output.startswith("```"):
            ai_output = ai_output.replace("```json", "")
            ai_output = ai_output.replace("```", "")
            ai_output = ai_output.strip()

        # Convert JSON string to Python dictionary
        result = json.loads(ai_output)

        # Validate response structure
        if (
            "flashcards" not in result
            or "quiz" not in result
        ):
            raise HTTPException(
                status_code=500,
                detail="Invalid AI response format."
            )

        return result

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )