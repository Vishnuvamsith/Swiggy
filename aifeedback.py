from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel, Field
import google.generativeai as genai
from langchain.chains import LLMChain

# Load environment variables
load_dotenv()
# print(os.getenv("GOOGLE_API_KEY"))
# Configure GenAI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Define Pydantic model for structured feedback
class FeedbackSummary(BaseModel):
    key_strengths: str = Field(description="Key strengths identified from the feedback")
    development_areas: str = Field(description="Areas for improvement based on feedback")

def create_feedback_chain():
    # Initialize the parser
    parser = PydanticOutputParser(pydantic_object=FeedbackSummary)
    
    # Create prompt template
    prompt = PromptTemplate(
        template="""
        You are an AI specializing in performance review analysis.
        Given the following raw feedback, extract and summarize it into two key points:
        1. Strengths of the employee.
        2. Development areas that need improvement.

        Feedback:
        {feedback_text}
        
        Provide clear, concise, and professional insights.
        {format_instructions}
        """,
        input_variables=["feedback_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )
    
    # Initialize LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash-latest",
        temperature=0.7,
        top_p=0.9,
        top_k=40
    )
    
    # Create LLM chain
    chain = LLMChain(
        llm=llm,
        prompt=prompt,
        output_parser=parser
    )
    
    return chain

@app.route('/api/feedback-summary', methods=['POST'])
def generate_feedback_summary():
    try:
        # Get feedback text from request
        feedback_text = request.form.get('feedback_text')
        
        if not feedback_text:
            return jsonify({"error": "Feedback text is required"}), 400
            
        # Generate AI summary using LLM chain
        chain = create_feedback_chain()
        response = chain.run(feedback_text=feedback_text)
        
        # Convert response to dictionary and return as JSON
        return jsonify({
            'status': 'success',
            'response': response.dict()
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == "__main__":
    app.run(port=5020, debug=True)
