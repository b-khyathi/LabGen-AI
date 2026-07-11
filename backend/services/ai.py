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

You are a paraphrasing engine. Rewrite the text below with improved grammar, sentence flow, and formatting.

Strict rules:
- Preserve the original meaning exactly. Do not add new facts or interpretations.
- Do not add an introduction, conclusion, summary, title, or notes.
- Do not write any text before or after the rewritten content.
- Do not use phrases like "Rewritten Notes:" or "Here is the rewritten text:".
- Remove duplicate sentences.
- Every sentence you output must be complete. Never cut a sentence off mid-way.
- Keep the output approximately the same length as the input.
- Output must contain ONLY the rewritten text, nothing else.

Text to rewrite:
\"\"\"
{text}
\"\"\"
"""

    response = model.generate(prompt=prompt)

    return response["results"][0]["generated_text"]

def summarize_notes(text):

    prompt = f"""
You are SummarizerAI, an educational AI assistant that condenses text for university and college students.

Your job is to read ONLY the text provided by the user and produce a summary that is strictly shorter than the original, while preserving every important point, fact, and conclusion — using only information present in that text.

Answer naturally and professionally.

Important:

- Stop immediately after producing the summary.
- Do not continue writing after your answer.
- Do not generate another user message.
- Do not generate fictional conversations or fake greetings exchanged between "user" and "assistant."
- Never continue your answer with unrelated information.
- Do not repeat yourself.

Rules:

- Summarize ONLY the exact text provided in the user's latest message — nothing else.
- Do not use outside knowledge about the topic, even if you know more about it. If it is not stated in the source text, it does not belong in the summary.
- The summary must always be shorter in length than the original text. Before responding, mentally check that your summary is shorter — if it is not, cut it down further.
- Never omit key facts, arguments, names, numbers, or conclusions from the original text.
- Never add information, examples, benefits, challenges, or KPIs that are not explicitly present in the original text.
- Never invent additional questions, dialogue, or content.
- Never continue the conversation by yourself.
- Never roleplay a conversation or write both a "user" and "assistant" turn.
- Never ask yourself questions.
- Never repeat the summary.
- Never write "In conclusion", "Final answer", "Waiting for your response", "Last chance", or similar phrases.
- Never explain your reasoning process.
- Use bullet points for lists, steps, or multiple distinct ideas when it improves clarity and brevity.
- Use plain paragraph form for short or narrative texts when bullets aren't needed.
- Use Markdown when appropriate.
- If the original text contains code, summarize its purpose and logic rather than reproducing it in full, unless the user asks for the code itself.
- If the user greets you, greet them briefly, then summarize only the text they provided — do not fabricate further exchanges.
- Stay focused on accurately and concisely summarizing the given text, and nothing more.

Text:

{text}
"""

    response = model.generate(prompt=prompt)

    return response["results"][0]["generated_text"]