# Streamlit Dashboard (dashboard.py)
import streamlit as st
import supabase

st.title("AI Project Manager")
projects = supabase.table('projects').select("*").execute().data

for project in projects:
    st.write(f"**{project['name']}**")
    st.progress(project.get('completion', 0))
    st.button("View Details", key=project['id'])