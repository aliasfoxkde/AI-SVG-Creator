import os
from huggingface_hub import InferenceClient
from PIL.Image import Image


class CreateSVG:
    def __init__(self, prompt):
        self.root_path, self.filename = os.path.splitext(__file__)
        self.api_key = ""
        self.prompt = prompt

    def prompt_enhancer(self):
        pass

    def generate_image(self, prompt="unicorn."):
        system = "Use a white background; Use smooth shapes, playful and whimsical, cartoon-style; use " \
                 "symbolism over realistic that clearly represents the users request. Use clean and " \
                 "refined lines. LIMIT TO ONLY 2 COLORS!"
        image = client.text_to_image(
            system+prompt, model="stabilityai/stable-diffusion-3.5-medium"
        )
        with open(os.path.join(self.root_path, "out", "image.jpg"), "wb+") as file:
            file.write(image)

    def convert_img_to_svg(self):
        pass

    def predict(self, prompt):
        return self.model.predict(prompt)

"""
client = InferenceClient(
    api_key=""
    )

messages = [
    {
        "role": "user",
        "content": "What is the capital of France?"
    }
]

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
    messages=messages,
    max_tokens=500,
)

print(completion.choices[0].message)
"""

# Initialize client
client = InferenceClient(
    api_key=""  # Replace with your actual API key
)

try:
    # Generate image
    image: Image = client.text_to_image(
        "Astronaut riding a horse",
        model="stabilityai/stable-diffusion-3.5-medium",
        negative_prompt="blurry, low quality",
        width=512,
        height=512,
        num_inference_steps=20
    )

    # Save the image
    if image:
        image.save("astronaut_horse.png")
        print("Image saved successfully!")
    else:
        print("No image was generated.")

except Exception as e:
    print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    print("The script is not intended to be executed directly.")

