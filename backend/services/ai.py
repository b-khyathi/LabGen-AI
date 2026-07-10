import os
from dotenv import load_dotenv

from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai import Credentials

load_dotenv()

API_KEY = os.getenv("IBM_API_KEY")
PROJECT_ID = os.getenv("PROJECT_ID")
IBM_URL = os.getenv("IBM_URL")

credentials = Credentials(
    url=IBM_URL,
    api_key=API_KEY
)

model = ModelInference(
    model_id="meta-llama/llama-3-3-70b-instruct",
    credentials=credentials,
    project_id=PROJECT_ID,
    params={
        "temperature": 0.2,
        "max_new_tokens": 500,
        "repetition_penalty": 1.15,
        "stop_sequences": [
            "User:",
            "Human:",
            "Student:"
        ]
    }
)


def generate_lab_manual(course, subject, experiment, difficulty, equipment):
    prompt = f"""
You are LabGen AI, an expert university laboratory instructor.

Create a complete, well-structured laboratory manual in Markdown.

Course: {course}
Subject: {subject}
Experiment: {experiment}
Difficulty: {difficulty}
Equipment: {equipment}

Requirements:

- Write professionally.
- Adjust the depth according to the selected difficulty.
- Explain concepts clearly.
- Use proper Markdown headings.
- Use numbered steps where appropriate.
- Use bullet points where appropriate.
- Include practical explanations instead of one-line answers.
- If no equipment is provided, recommend commonly available equipment.
- Never leave any section empty.

Generate the laboratory manual using the following Markdown structure.

Each heading must immediately be followed by its content.

Example:

# Title
<actual experiment title>

# Objective
<objective paragraph>

# Theory
<detailed explanation>

# Apparatus Required
- item 1
- item 2

# Software Required
- software

# Procedure
1. Step one
2. Step two
3. Step three

# Expected Output
<expected observations>

# Result
<result paragraph>

# Viva Questions
1. Question
   Answer

2. Question
   Answer

3. Question
   Answer

4. Question
   Answer

5. Question
   Answer

# Precautions
- Precaution 1
- Precaution 2

Return ONLY valid Markdown.
"""

    response = model.generate(prompt=prompt)

    return response["results"][0]["generated_text"]

def chat_with_ai(message, manual, history):
    message = message.strip()
    message_lower = message.lower()

    greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hola"]
    if message_lower in greetings:
        return "Hello! 👋 How can I help you today?"

    if message_lower in ["thanks", "thank you", "thankyou"]:
        return "You're welcome! 😊"

    if message_lower in ["bye", "goodbye", "see you"]:
        return "Goodbye! 👋 Happy learning."

    manual_keywords = [
        "manual", "experiment", "objective", "theory", "procedure", "steps",
        "apparatus", "equipment", "software", "result", "expected output",
        "precaution", "viva", "observation",
    ]

    manual_context = ""
    if manual and manual.strip() and any(keyword in message_lower for keyword in manual_keywords):
        manual_context = f"""

Laboratory Manual
(Use ONLY if it helps answer the user's question.)

{manual}

"""
        
    conversation_context = ""

    if history:
        conversation_context = "Previous conversation:\n\n"

        for msg in history[-8:]:
            role = "User" if msg["sender"] == "user" else "Assistant"
            conversation_context += f"{role}: {msg['text']}\n\n"

    prompt = f"""
You are LabGen AI, an educational AI assistant for university and college students.

Your job is to teach, explain concepts, answer academic questions, solve programming doubts, assist with laboratory experiments, and help students learn.

Answer naturally and professionally.

Important:

- Stop immediately after answering the user's question.
- Do not continue writing after your answer.
- Do not generate another user message.
- Do not generate fictional conversations.
- Never continue your answer with unrelated information.
- Do not repeat yourself.

Rules:

- Answer ONLY the user's latest question.
- Never invent additional questions.
- Never continue the conversation by yourself.
- Never roleplay a conversation.
- Never write both the user's and assistant's messages.
- Never ask yourself questions.
- Never repeat the answer.
- Never write "In conclusion", "Final answer", "Waiting for your response", "Last chance", or similar phrases.
- Never explain your reasoning process.
- Keep simple questions short.
- Give detailed explanations only when the user asks for them.
- Use Markdown when appropriate.
- If code is requested, provide clean code with a short explanation.
- If the user greets you, greet them briefly.
- Stay focused on education and technology.

{manual_context}

{conversation_context}

Current user question:

{message}

Assistant:
"""

    response = model.generate(prompt=prompt)
    return response["results"][0]["generated_text"]

def improve_notes(text):

    prompt = f"""

You are a text editor.

Rewrite ONLY the text below.

Rules:

- Do NOT add any new facts.
- Do NOT explain anything.
- Do NOT expand the notes.
- Do NOT teach.
- Do NOT include information that is not already present.
- Preserve exactly the same meaning.
- Only improve grammar.
- Only improve sentence flow.
- Only improve formatting.
- Remove duplicated sentences.
- Keep approximately the same length.

Return ONLY the rewritten notes.

Text:

{text}
"""

    response = model.generate(prompt=prompt)

    return response["results"][0]["generated_text"]

def summarize_notes(text):

    prompt = f"""
You summarize notes.

Rules:

- Use ONLY the information below.
- Never add new facts.
- Never explain.
- Never infer.
- Never expand.
- Keep at most 30% of the original length.
- Return bullet points only.

Text:

{text}
"""

    response = model.generate(prompt=prompt)

    return response["results"][0]["generated_text"]