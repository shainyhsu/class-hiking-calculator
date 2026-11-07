# Hiking Time Estimator (步程試算)

Estimate how long a hiking route will take from a GPX track. Accounts for grade, terrain, rain, pack weight, and group pace.

**Live demo:** https://shainyhsu.github.io/class-hiking-calculator/

## Features

- Default model: average of **Tobler’s hiking function** and **DIN 33466**
- Upload past GPX logs and fit a group-specific **Lorentz speed curve** (Gauss–Newton); once fitted, that curve becomes the base speed
- Per-segment tags: normal trail / roots & rock / muddy grass / forest road, heavy vs light pack, rain, running
- Elevation profile, checkpoints, timetable, short stops, and an optional 10% buffer
- Export image, GPX (with segment and timing settings), or plain-text summary

## How to use

1. Open the link above (fully client-side; nothing is uploaded to a server)
2. Load a route GPX, or try the sample
3. Adjust settings, terrain segments, and checkpoints as needed
4. Optionally upload historical GPX files to optimize the Lorentz parameters
5. Review the timetable and summary, then share or download

## Tech

Single HTML page on GitHub Pages. No backend, no install.

## License / notes

Personal tool. Formula sources and limitations are documented in the in-app “how the model works” section.
