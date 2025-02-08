import os
import base64
from dotenv import load_dotenv
from google.cloud import vision
import openai
from langchain.prompts import PromptTemplate

load_dotenv()

openai.api_key = os.getenv("OPENAI_KEY")

# Path to your image file
IMAGE_PATH = "fis.jpg"

def detect_fish(image_path):
    """Detects the presence of a fish using Google Cloud Vision API."""
    client = vision.ImageAnnotatorClient()
    with open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    labels = client.label_detection(image=image).label_annotations
    for label in labels:
        if "fish" in label.description.lower() or "fin" in label.description.lower() or "aquatic animal" in label.description.lower():
            print(f"Detected: {label.description}")
            return True
          
    return False

def encode_image_to_base64(image_path):
    """Encodes the image to base64."""
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
        return encoded_string


def identify_species_with_openai(image_base64, img_type="image/jpeg"):  # Added img_type
    """Identifies the fish species using OpenAI (Corrected for Vision API)."""

    prompt_template = """
    I have an image of a fish. Please identify the species of the fish in the image. Be as specific as possible. If you are unsure of the species, I want you to give me the species that resembles it the most. Provide your reasoning for your identification. What visual cues in the image did you use to make your determination? Return the identified species and a confidence score (0-1) representing your confidence in the identification.  Format your response like this:

    Species: <species_name>
    Confidence: <confidence_score>
    Reasoning: <your_reasoning>

    Here are some common fish characteristics to consider (you can refer to your internal knowledge as well):

    * Walleye: Elongated body, large mouth with prominent teeth, dark blotches on the dorsal fin, white tip on the lower tail fin.
    * Sauger: Similar to walleye but smaller, less prominent teeth, saddle-shaped blotches on the dorsal fin, no white tip on the tail.
    * Shorthead redhorse: ... (Add descriptions for other relevant species)
    * ... (Add more species descriptions)
    """

    prompt = PromptTemplate(
        input_variables=[],  # No input variables needed now
        template=prompt_template,
    )

    final_prompt = prompt.format() # No variables to format

    try:
        response = openai.chat.completions.create(  # Correct method
            model="gpt-4o-mini",  # Or other vision model
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": final_prompt},  # Prompt as text
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:{img_type};base64,{image_base64}"},  # Image
                        },
                    ],
                }
            ],
        )

        llm_output = response.choices[0].message.content  # Access content correctly
        print(f"LLM Output: {llm_output}")  
        # Robust Parsing
        import re
        species_match = re.search(r"Species:\s*(.+)", llm_output)
        confidence_match = re.search(r"Confidence:\s*([\d.]+)", llm_output)

        species = species_match.group(1).strip() if species_match else "Unknown"
        confidence = float(confidence_match.group(1)) if confidence_match else 0.0

        return species, confidence

    except Exception as e:
        print(f"Error with OpenAI API: {e}")
        return "Unknown", 0.0

if __name__ == "__main__":
    if detect_fish(IMAGE_PATH):
        image_base64 = encode_image_to_base64(IMAGE_PATH)
        species, confidence = identify_species_with_openai(image_base64)  # Call OpenAI function
        print(f"Identified Species: {species}")
        print(f"Confidence: {confidence}")
    else:
        print("No fish detected in the image.")