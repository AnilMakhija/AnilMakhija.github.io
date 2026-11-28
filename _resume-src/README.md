# Resume source

`resume.html` is the source of `../Anil_Makhija_Resume.pdf`. Edit it, then regenerate:

    pip install playwright && playwright install chromium
    python3 _resume-src/build_resume.py

The script prints with headless Chromium to a Letter-size PDF. Calibri is used if installed, otherwise the metric-compatible Carlito. Check the page count (two pages) and that no section heading is left at the bottom of page 1 before replacing the PDF.
