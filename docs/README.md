# README

## Improvements
- Add animated SVG options
- Add advanced gradient options
- Add support for number of colors and transparency
- Build logic to download and run AI model locally in Kaggle/Jupyter Notebook.

## Methodology
1. Takes in user prompt
2. Enhance prompt
3. Generate SVG-like image (using custom VAE, settings, etc.)
4. Convert image to SVG (cleanup, smoothing, reduce, etc.)
5. Analyze image to confirm accuracy/confidence (else retry)
6. Saves the graphic (filename represents initial prompt)
7. Done.

## Goals
- Prune and quantize the AI model to reduce it's size by retaining only required functionality.
- Use the smallest all-in-one model available (Janus Pro 1B; vision, image gen, chat).

## Future Scope
- Create web-based PWA application 
- Allows for configuring options, etc.
- Light weight, client side, and fast

## Analysis/Grading/Validation (_report): 
  """Instructions: ONLY return a valid JSON oject: 
     {"success": "True|False", "valid": "True|False", "confidence": "0-100"}. 
     {"success": "True|False", "rules_pass": "True|False", "match": "0-100", "confidence": "0-100", "colors": "2-16"}

     1. In a broad sense does this image align with the prompt: {prompt}?
     2. Does the image meet ALL the criteria of the PRIMER? Estimate a percentage match (0-100 ONLY)?
     3. What is the confidence grade (in percent) you would give it. Number 0-100 ONLY.
  """
  - Use SVG Analysis Tool/Code:
    - How many colors are used in the image (append valid dictionary)?
    - Determine coverage ratio/percentage of shape/objects to the image.
    - Filesize is under max constraint?
  - Make deterministic (or programatic) changes to settings and test again.
  - Create a comparision line chart after each iterative change
  - Does the resulting image/SVG meet the constraints and criteria?
  - Additional context, such as blank image, noisy, etc.
  - Other uses X number of colors or less, black and white flagging, etc.
  - Check valid JSON, else return {"success": "Null", "valid": "Null", "confidence": "0"}.
    - Do Human Eval spot checking for validation.
    - Retry X number attempts if needed
  - Reduce colors and smooth programatically BEFORE converting to SVG?
  - Crush details in image to reduce size if over max (if within range)
  - Use own CLIP Ranker to get peliminary score before submitting.
    https://lightning.ai/docs/torchmetrics/stable/multimodal/clip_score.html
    https://github.com/Taited/clip-score

## VAE 
  - Either use VAE directly and refine with a Diffusion Model (imageGen)
  - Or use VAE with the Diffusion Model directly.

## PWA Development
  - 