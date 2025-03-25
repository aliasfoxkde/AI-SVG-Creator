from src.ai_svg_creator import ai_svg_creator


def write_svg(user_prompt, api_key):
    creator = ai_svg_creator(api_key)
    root_path = "./outputs"
    final_svg = creator.svg_refiner(user_prompt)
    output_file = os.path.join(root_path, "_".join(user_prompt.split()) + ".svg")

    os.makedirs(root_path, exist_ok=True)
    with open(output_file, "w") as f:
        f.write(final_svg)


if __name__ == "__main__":
    HF_API_KEY = ""
    write_svg("Create a detailed SVG of a robotic owl with glowing eyes", HF_API_KEY)
