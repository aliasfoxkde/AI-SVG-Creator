from huggingface_hub import InferenceClient

client = InferenceClient(
    # provider="hf-inference",
    api_key=""
)

messages = [
    {
        "role": "user",
        "content": "What is the capital of France?"
    }
]

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-Distill-Qwen-32B",
    messages=messages,
    max_tokens=500
)

print(list(completion))
# print(completion.choices[0].message)
