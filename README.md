# AI SVG Creator

**Experimental prototype — not a production-ready application.**

An early prompt-to-SVG experiment using Hugging Face inference APIs. The
repository contains a Python generation/validation prototype and a legacy
browser UI, but the end-to-end application is not currently integrated or
verified as runnable.

## Current implementation

| Area | Current state |
|---|---|
| Python SVG generation | `src/ai_svg_creator.py` calls a Hugging Face chat-completions model to request SVG markup |
| SVG validation | Parses XML and checks a fixed 512×512 `viewBox`, allowed element names, and a minimum output size |
| Iterative refinement | The prototype can ask the model to analyze a rejected SVG and feed feedback into another attempt |
| Scoring | A heuristic ranker exists in the Python prototype; it is not a substitute for human or task-specific visual evaluation |
| Browser interface | Legacy HTML/CSS/JavaScript UI; it calls backend routes that are not implemented by the current Flask placeholder |
| Packaging and deployment | Not ready: `requirements.txt` and `setup.py` are empty, and no supported deployment workflow is documented |

## Known blockers

- The Python prompt loader references `src\\PRIMER.md`, while the checked-in
  prompt is under `src/prompts/PRIMER.md`; initialization therefore needs a
  path fix before the generation class can be considered runnable on a normal
  checkout.
- `src/generate_svg.py` uses `os.path` without importing `os`.
- The Flask `app.py` is an incomplete project-queue sketch: it references
  `Redis` without importing/configuring it and leaves `process_project` as
  `pass`.
- The browser UI calls `/generate/` and `/bookmarks/`, but the current
  backend does not implement those routes.
- Some legacy experiment files contain placeholder API-key values. Supply
  credentials through environment/configuration in any future implementation;
  never commit real tokens.

These are documented as blockers, not silently presented as working features.
There is currently no supported one-command install or deployment path.

## Not implemented / future ideas

The following remain proposals, not shipped capabilities:

- Local model download, pruning, or quantization.
- A VAE/diffusion image-generation pipeline and image-to-SVG conversion.
- Animated SVG/story composition, timeline editing, or video export.
- MCP integration, game-asset workflows, and Scratch integration.
- A complete PWA with offline model execution.

See [Status and recovery plan](docs/STATUS.md) for the current blockers and
recommended order of work. [PLANNING.md](docs/PLANNING.md) is retained as
historical ideation rather than a statement of implemented functionality.

## Repository layout

- `src/ai_svg_creator.py` — Hugging Face-backed SVG prompt/refinement prototype.
- `src/prompts/PRIMER.md` — generation constraints used by the Python prototype.
- `web/` — legacy browser interface.
- `app.py` — incomplete Flask project-queue sketch.
- `docs/` — planning and status documentation.

## License

MIT. See [LICENSE](LICENSE).
