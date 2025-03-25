"""from huggingface_hub import InferenceClient

client = InferenceClient(
    # provider="sambanova",
    api_key=""
)

messages = [
    {
        "role": "user",
        "content": "What is the capital of France?"
    }
]

stream = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1",
    messages=messages,
    max_tokens=500,
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")
"""

from huggingface_hub import InferenceClient

client = InferenceClient(
    # provider="hf-inference",
    api_key=""
)

messages = [
    {
        "role": "system",
        "content": "Only provide the answer, not thinking tokens."
    },
    {
        "role": "user",
        "content": "What is the capital of France?"
    }
]

stream = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    messages=messages,
    max_tokens=8000,
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")
