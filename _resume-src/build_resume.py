#!/usr/bin/env python3
"""Render _resume-src/resume.html to Anil_Makhija_Resume.pdf with headless Chromium (Playwright).
Usage: python3 _resume-src/build_resume.py [output.pdf]
Fonts: Calibri if installed, otherwise the metric-compatible Carlito."""
import sys, pathlib
from playwright.sync_api import sync_playwright
here = pathlib.Path(__file__).resolve().parent
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else here.parent / "Anil_Makhija_Resume.pdf"
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    pg.goto((here / "resume.html").as_uri()); pg.wait_for_load_state("networkidle")
    pg.pdf(path=str(out), prefer_css_page_size=True, print_background=True)
    b.close()
print("wrote", out)
