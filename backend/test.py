import os
from dotenv import load_dotenv
from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference

# Load environment variables
load_dotenv()

API_KEY = os.getenv("IBM_API_KEY")
PROJECT_ID = os.getenv("PROJECT_ID")
URL = os.getenv("IBM_URL")

credentials = Credentials(
    url=URL,
    api_key=API_KEY
)

model = ModelInference(
    model_id="meta-llama/llama-3-3-70b-instruct",
    credentials=credentials,
    project_id=PROJECT_ID,
    params={
        "max_new_tokens": 800,
        "temperature": 0.3
    }
)

prompt = """
Generate a lab manual for the following experiment.

Subject: Computer Networks
Experiment: Stop and Wait ARQ

Include:
- Objective
- Theory
- Apparatus
- Procedure
- Viva Questions
"""

response = model.generate_text(prompt=prompt)

print("\n========== RESPONSE ==========\n")
print(response)