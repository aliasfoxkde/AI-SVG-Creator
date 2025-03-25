# Flask Backend (app.py)
from flask import Flask, request
from pydantic import BaseModel
import rq
import supabase

app = Flask(__name__)
queue = rq.Queue('ai-tasks', connection=Redis())

class ProjectForm(BaseModel):
    name: str
    scope: str
    deadline: str

@app.route('/submit-project', methods=['POST'])
def submit_project():
    data = ProjectForm(**request.json)
    # Save to Supabase
    supabase.table('projects').insert(data.dict()).execute()
    # Queue AI task
    queue.enqueue(process_project, data)
    return {"status": "queued"}

def process_project(project):
    # AI logic here (e.g., risk prediction, task breakdown)
    pass