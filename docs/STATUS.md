# Status and recovery plan

**Status: experimental / incomplete.** This repository is an early SVG-generation
prototype. It should not currently be advertised as a complete PWA, deployable
web application, or local-model image-generation platform.

## Verified from the checked-in tree

- `src/ai_svg_creator.py` defines a Hugging Face `InferenceClient` workflow
  that requests SVG text from a chat-completions model.
- It includes XML parsing, fixed dimensions/viewBox checks, an allowlist of
  SVG element names, a minimum output-size check, a model-based analyzer, and
  a heuristic ranker.
- `web/index.html` and `web/js/` contain a legacy browser interface.
- `app.py` contains only a partial Flask route sketch.

This is source inspection, not a successful end-to-end execution test.

## Blocking defects before a supported run

1. Fix the prompt path in `src/ai_svg_creator.py` to resolve
   `src/prompts/PRIMER.md` relative to the module, not the current working
   directory.
2. Fix missing imports and file-path handling in `src/generate_svg.py`.
3. Define and pin supported Python dependencies; currently `requirements.txt`
   and `setup.py` are empty.
4. Remove or isolate incomplete scratch modules (`gensvg.py`,
   `deepseek.py`, `validate_api.py`) so they cannot be mistaken for supported
   application entry points.
5. Decide whether the browser UI is retained. If retained, implement the
   `/generate/` and `/bookmarks/` routes it calls, replace unsafe DOM
   interpolation with safe DOM APIs, and add browser tests.
6. Remove the placeholder Flask queue sketch or finish it with explicit
   Redis/Supabase configuration, authentication, request validation, and
   bounded job execution. Do not deploy the current `app.py` as-is.
7. Move all provider credentials to environment variables and add secret
   scanning; never store real API tokens in source.
8. Add end-to-end tests that generate an SVG, parse it, verify constraints,
   and render it in a browser. Model-generated text must be treated as
   untrusted input and sanitized before insertion into the DOM.

## Recommended scope decision

Prefer a small, reproducible Python CLI first:

1. Define a typed configuration object and environment-based Hugging Face
   token loading.
2. Fix prompt loading and return a structured result containing SVG, attempts,
   validation errors, and provider metadata.
3. Add deterministic XML/SVG sanitization (reject scripts, event attributes,
   external references, foreignObject, and unsupported elements).
4. Add unit tests for valid, malformed, oversized, and unsafe SVG documents.
5. Add a CLI that writes output to a user-selected directory without executing
   generated content.
6. Only then decide whether to rebuild the browser UI as a supported product.

## Acceptance criteria for changing status

Do not upgrade the project from experimental until:

- A clean environment can install pinned dependencies.
- A documented command can generate and save a valid SVG.
- Tests cover XML parsing, sanitization, size/dimension limits, and failure
  handling.
- The generated SVG is rendered safely in a browser test.
- No credentials or user prompts are logged or committed.
- The browser backend and frontend are either integrated and tested or
  explicitly removed from the supported product scope.
