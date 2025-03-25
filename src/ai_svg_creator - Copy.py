import os
import requests
import xml.etree.ElementTree as ET
from tempfile import NamedTemporaryFile


class ai_svg_creator:
    def __init__(self):
        self.model = "DeepSeek-R1-Distill-Qwen-14B-GGUF"
        self.ollama_url = "http://localhost:11434/api/generate"
        self.system_prompt = self._load_system_prompt()
        
    def _load_system_prompt(self):
        with open(r"src\PRIMER.md", "r") as f:
            return f.read()
        
    def svg_refiner(self, user_input, max_attempts=5):
        best_svg = None
        best_score = 0
        
        for attempt in range(1, max_attempts+1):
            print(f"Attempt {attempt} of {max_attempts}")
            svg_code = self._generate_svg(user_input)
            
            if not self.svg_validation(svg_code):
                print("Validation failed, refining...")
                feedback = self.svg_analyzer(svg_code)
                user_input += f"\n\nPrevious attempt issues:\n{feedback}"
                continue
                
            current_score = self.svg_ranker(svg_code)
            if current_score > best_score:
                best_svg = svg_code
                best_score = current_score
                
            if best_score >= 0.9:  # Early exit if high quality
                break
                
        return best_svg
    
    def _generate_svg(self, user_input):
        response = requests.post(self.ollama_url, json={
            "model": self.model,
            "prompt": f"{self.system_prompt}\n\nUser request:\n{user_input}",
            "stream": False
        })
        
        return response.json()['response'].strip()
    
    def svg_validation(self, svg_code):
        # Basic XML validation
        try:
            root = ET.fromstring(svg_code)
        except ET.ParseError:
            return False
        
        # Check required attributes
        if (root.attrib.get('width') != '512' or 
            root.attrib.get('height') != '512' or 
            root.attrib.get('viewBox') != '0 0 512 512'):
            return False
        
        # Check only path elements are used
        if any(elem.tag.split('}')[-1] not in ['path', 'g', 'defs', 'linearGradient', 'radialGradient'] 
               for elem in root.iter()):
            return False
        
        # File size check (10KB min)
        with NamedTemporaryFile('w+', delete=False) as tmp:
            tmp.write(svg_code)
            tmp_size = os.path.getsize(tmp.name)
        return tmp_size >= 10240
    
    def svg_analyzer(self, svg_code):
        analysis_prompt = (
            "Analyze this SVG code for compliance with the system prompt requirements. "
            "Identify any violations of constraints and suggest specific improvements. "
            "Check for proper layering, path usage, color schemes, and file structure. "
            "SVG code:\n\n" + svg_code
        )
        
        response = requests.post(self.ollama_url, json={
            "model": self.model,
            "prompt": analysis_prompt,
            "stream": False
        })
        
        return response.json()['response'].strip()
    
    def svg_ranker(self, svg_code):
        # Simple scoring based on element count and complexity
        try:
            root = ET.fromstring(svg_code)
            path_count = len(list(root.iter('{http://www.w3.org/2000/svg}path')))
            group_count = len(list(root.iter('{http://www.w3.org/2000/svg}g')))
            size = len(svg_code.encode('utf-8'))
            
            # Score formula: paths (40%) + groups (30%) + size (30%)
            return (path_count * 0.4 + group_count * 0.3 + (size/1024)*0.3) / 100
        except:
            return 0.0


if __name__ == "__main__":
    print("The script is not intended to be executed directly.")
