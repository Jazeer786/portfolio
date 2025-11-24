# Muhammed Jazeer Abbas – Portfolio

A modern, responsive personal portfolio for an IT Support Engineer. The site is built with semantic HTML, modular CSS, and vanilla JavaScript for theme toggling, navigation, and subtle animations.

## Tech Stack
- HTML5
- CSS3 (custom properties, responsive grid utilities)
- Vanilla JavaScript (ES modules not required)
- Feather Icons CDN

## Project Structure
```
portfolio-site/
├── assets/
│   ├── favicon.svg
│   └── Muhammed_Jazeer_Abbas_Resume.pdf
├── css/
│   └── style.css
├── js/
│   └── main.js
└── index.html
```

## Replace the Content
1. **Hero/About/Experience** – all copy lives in `index.html`. Update the relevant section text or add new `<article>` blocks to extend timelines or certifications.
2. **Skills** – edit the `<span class="skill-pill">` elements inside the `#skills` section. Icons use the `data-feather` attribute, so refer to the [Feather Icons list](https://feathericons.com/) for valid names.
3. **Resume Download** – replace `assets/Muhammed_Jazeer_Abbas_Resume.pdf` with your most recent resume, keeping the same filename or updating the `href` in the hero CTA.
4. **Contact Form** – the form is front-end only. Hook it to your preferred service (Formspree, Netlify Forms, etc.) by adding an `action` attribute and updating `main.js` if you intend to process submissions.
5. **Theme & Colors** – tweak CSS custom properties in `css/style.css` (`:root` and `[data-theme="dark"]`) to swap palettes globally.

## Development
1. Open the folder in your editor/IDE.
2. Use any static-server (e.g., `npx serve .` or VS Code Live Server) to enable local live reload.
3. Adjust copy, images, or styles as needed. Run a formatter or linter if you integrate one.

## Deploy to GitHub Pages
1. Create a new GitHub repository (public is recommended for Pages).
2. Push the contents of `portfolio-site/` to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` as the branch and `/ (root)` as the folder, then save.
6. Wait for GitHub Pages to build; your site will be available at `https://<username>.github.io/<repo>/`.

## Color Palette & Fonts
- **Primary:** `#2563EB` (Royal blue)
- **Primary-soft:** `rgba(37, 99, 235, 0.12)`
- **Dark accent:** `#0F172A`
- **Background:** `#F5F7FB` (light) / `#0B1120` (dark)
- **Fonts:** `Space Grotesk` for headings, `Inter` for body text – both served via Google Fonts.

Feel free to adapt the palette to your brand, keeping accessibility (contrast ratios) in mind.

