# Xinyu Fu — Personal Homepage

Static academic homepage hosted at https://fluorine-brian.github.io/.

- `index.html`: profile, publications, experiences and photos.
- `main.css`: layout, responsive styles and themes.
- `js/main.js`: theme preference and back-to-top interaction.
- `images/`: image assets.
- `work/`: CV, papers, patents and certificates.

Preview locally with `python -m http.server 8000`, then open http://localhost:8000.
No package installation or build step is required.

Keep profile links in the header and footer consistent when editing. Encode `#` in asset URLs as `%23`.

Responsive layout is maintained in `main.css`: phone below 640px, tablet from 640px, desktop navigation from 1024px. The menu supports touch and keyboard; galleries scroll manually. Validate at 320, 390, 768, 1024 and 1440px when previewing layout changes.
