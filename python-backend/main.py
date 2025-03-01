import os
import pathlib
import dotenv
import textwrap
import google.generativeai as genai
from IPython.display import Markdown
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

dotenv.load_dotenv()

app = FastAPI()
api = os.environ.get("GEMINI_API")

allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["X-Requested-With", "Content-Type"],
)


def to_markdown(text):
    text = text.replace("•", "  *")
    return Markdown(textwrap.indent(text, "> ", predicate=lambda _: True))


def convert(text: str, type: str) -> str:
    genai.configure(api_key=api)
    model = genai.GenerativeModel("gemini-pro")
    if type == "grammar":
        query = f"Fix the grammar and spelling of this text and give me the corrected text only: {text}"
    else:
        query = f"Improvise this text and give me the improvised text only: {text}"
    response = model.generate_content(query)
    if response.parts:
        converted_text = "\n".join([part.text for part in response.parts])
    else:
        converted_text = to_markdown(response.text)
    return converted_text


class Request(BaseModel):
    content: str


@app.post("/grammar/")
async def grammar(req: Request):
    text = req.content
    return {"text": convert(text, "grammar")}


@app.post("/improvise/")
async def improvise(req: Request):
    text = req.content
    return {"text": convert(text, "improvise")}
