# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing site for the "Expensive Problem" weekend workshop. The entire site is one HTML file (`index.html`) with embedded CSS and minimal JavaScript. No build tools, no framework, no package.json.

## Development

Open `index.html` directly in a browser or serve with any static file server. No build step required.

## Architecture

**Single file**: `index.html` (~720 lines) contains all markup, styles, and scripts.

**Two-section layout**:
- **Dark section** (#0a0a0a): Hero, audience description, problem definition, example scenarios carousel
- **Light section** (#f4ebe1): Outcomes, facilitator bios, workshop format, pricing, CTA

**Typography**: Instrument Sans (body) and Instrument Serif (headings), loaded both via Google Fonts CDN and local .ttf files.

**Carousel**: Splide.js v4.1.4 loaded from CDN. Initialized at the bottom of the file. Slides have 3D perspective transforms with rotateY.

**Color system**: Dark backgrounds use #e0e0e0 text; light section uses #1a1a1a text; accent red is #c41e1e.

**Responsive**: Breakpoints at 768px and 480px. Typography uses CSS `clamp()` for fluid scaling.

## External Services

- **Application form**: Tally.so (https://tally.so/r/eqrBBJ)
- **CDN**: Google Fonts, Splide.js

## Git

- **Remote**: https://github.com/andrewblevins/expensive-problem.git
- **Main branch**: `main`
- **Active branch**: `final-edits`
