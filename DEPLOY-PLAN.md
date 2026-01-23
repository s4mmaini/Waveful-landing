# Piano Deploy: 3 Landing Pages Waveful su GitHub Pages

## Obiettivo
Pubblicare 3 landing page separate in un'unica repository GitHub, accessibili tramite GitHub Pages con URL distinti.

---

## Struttura Attuale del Progetto

```
waveful-landing/
├── superlikes-genz-landing/        (Vite + React 19)
├── superlike-housewife-landing/    (Next.js 16)
└── superlike-adult-landing/        (Next.js 16)
```

---

## URL Finali

```
https://[USERNAME].github.io/waveful-landing/           (hub con link)
https://[USERNAME].github.io/waveful-landing/genz/      (Gen Z landing)
https://[USERNAME].github.io/waveful-landing/housewife/ (Housewife landing)
https://[USERNAME].github.io/waveful-landing/adult/     (Adult landing)
```

---

## Checklist Implementazione

### 1. Modificare le Configurazioni dei Progetti

#### 1.1 File: `superlikes-genz-landing/vite.config.ts`

Sostituire il contenuto con:

```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: process.env.GITHUB_ACTIONS ? '/waveful-landing/genz/' : '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        outDir: 'dist',
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

---

#### 1.2 File: `superlike-housewife-landing/next.config.mjs`

Sostituire il contenuto con:

```javascript
/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGitHubActions ? '/waveful-landing/housewife' : '',
  assetPrefix: isGitHubActions ? '/waveful-landing/housewife/' : '',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

---

#### 1.3 File: `superlike-adult-landing/next.config.mjs`

Sostituire il contenuto con:

```javascript
/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGitHubActions ? '/waveful-landing/adult' : '',
  assetPrefix: isGitHubActions ? '/waveful-landing/adult/' : '',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

---

### 2. Sostituire Vercel Analytics con Google Analytics 4

#### 2.1 File: `superlike-housewife-landing/app/layout.tsx`

1. Rimuovere:
```tsx
import { Analytics } from "@vercel/analytics/next"
```

2. Rimuovere il componente `<Analytics />` dal JSX

3. Aggiungere import Script:
```tsx
import Script from 'next/script'
```

4. Aggiungere prima di `</head>` o all'inizio del `<body>`:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

**NOTA**: Sostituire `G-XXXXXXXXXX` con il tuo Measurement ID GA4 quando lo avrai.

#### 2.2 File: `superlike-adult-landing/app/layout.tsx`

Stesse modifiche del punto 2.1.

---

### 3. Creare File nella Root del Progetto

#### 3.1 Creare: `.gitignore`

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
out/
.next/

# Environment files
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Lock files (opzionale - tieni solo quello che usi)
# package-lock.json
# pnpm-lock.yaml
```

---

#### 3.2 Creare: `.github/workflows/deploy.yml`

```yaml
name: Deploy Landing Pages to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      # ========== BUILD GEN Z (Vite) ==========
      - name: Install dependencies (GenZ)
        working-directory: superlikes-genz-landing
        run: pnpm install

      - name: Build GenZ Landing
        working-directory: superlikes-genz-landing
        run: pnpm build
        env:
          GITHUB_ACTIONS: true

      # ========== BUILD HOUSEWIFE (Next.js) ==========
      - name: Install dependencies (Housewife)
        working-directory: superlike-housewife-landing
        run: pnpm install

      - name: Build Housewife Landing
        working-directory: superlike-housewife-landing
        run: pnpm build
        env:
          GITHUB_ACTIONS: true
          NODE_ENV: production

      # ========== BUILD ADULT (Next.js) ==========
      - name: Install dependencies (Adult)
        working-directory: superlike-adult-landing
        run: pnpm install

      - name: Build Adult Landing
        working-directory: superlike-adult-landing
        run: pnpm build
        env:
          GITHUB_ACTIONS: true
          NODE_ENV: production

      # ========== COMBINE BUILDS ==========
      - name: Prepare deployment directory
        run: |
          mkdir -p _site
          cp -r superlikes-genz-landing/dist _site/genz
          cp -r superlike-housewife-landing/out _site/housewife
          cp -r superlike-adult-landing/out _site/adult

      - name: Create root index.html
        run: |
          cat > _site/index.html << 'EOF'
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Waveful Landing Pages</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
              }
              .container { max-width: 400px; width: 100%; }
              h1 { color: white; text-align: center; margin-bottom: 30px; font-size: 24px; }
              a {
                display: block;
                padding: 18px 24px;
                margin: 12px 0;
                background: rgba(255,255,255,0.95);
                color: #333;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 500;
                transition: transform 0.2s, box-shadow 0.2s;
              }
              a:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
              }
              .label { font-size: 14px; color: #666; margin-top: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Waveful Superlike</h1>
              <a href="./genz/">
                <strong>Gen Z Landing</strong>
                <div class="label">Target: Gen Z</div>
              </a>
              <a href="./housewife/">
                <strong>Housewife Landing</strong>
                <div class="label">Target: Housewife</div>
              </a>
              <a href="./adult/">
                <strong>Adult Landing</strong>
                <div class="label">Target: Adult</div>
              </a>
            </div>
          </body>
          </html>
          EOF

      - name: Create .nojekyll
        run: touch _site/.nojekyll

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '_site'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### 4. Push su GitHub

#### 4.1 Creare Repository su GitHub
1. Vai su https://github.com/new
2. Nome repository: `waveful-landing`
3. Visibilità: Public (o Private se hai GitHub Pro)
4. NON inizializzare con README

#### 4.2 Comandi Git

```bash
cd /Users/samuelemaini/Desktop/waveful-landing

# Inizializza repository
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Initial commit: 3 Waveful Superlike landing pages"

# Aggiungi remote (sostituisci USERNAME)
git remote add origin https://github.com/USERNAME/waveful-landing.git

# Push
git push -u origin main
```

---

### 5. Configurare GitHub Pages

1. Vai su **Settings** della repository
2. Menu laterale: **Pages**
3. Source: seleziona **"GitHub Actions"**
4. Salva

---

### 6. Verifica Deploy

1. Vai su tab **Actions** per monitorare il workflow
2. Quando completato (circa 2-3 minuti), visita gli URL:
   - `https://USERNAME.github.io/waveful-landing/`
   - `https://USERNAME.github.io/waveful-landing/genz/`
   - `https://USERNAME.github.io/waveful-landing/housewife/`
   - `https://USERNAME.github.io/waveful-landing/adult/`

---

## Troubleshooting

### Il build fallisce
- Controlla i log nella tab Actions
- Verifica che tutte le dipendenze siano installate correttamente
- Assicurati che `output: 'export'` sia presente nei next.config.mjs

### Le immagini non caricano
- Verifica che `assetPrefix` sia configurato correttamente
- Controlla che `images.unoptimized: true` sia presente

### 404 sulle sottopagine
- Assicurati che `trailingSlash: true` sia configurato per Next.js
- Il file `.nojekyll` deve essere presente nella root del deploy

### Analytics non funziona
- Verifica di aver sostituito `G-XXXXXXXXXX` con il tuo Measurement ID
- Controlla la console del browser per errori

---

## TODO Prima del Deploy

- [ ] Modificare `superlikes-genz-landing/vite.config.ts`
- [ ] Modificare `superlike-housewife-landing/next.config.mjs`
- [ ] Modificare `superlike-adult-landing/next.config.mjs`
- [ ] Sostituire Vercel Analytics in housewife `layout.tsx`
- [ ] Sostituire Vercel Analytics in adult `layout.tsx`
- [ ] Creare `.gitignore`
- [ ] Creare `.github/workflows/deploy.yml`
- [ ] Creare repository su GitHub
- [ ] Git init, add, commit, push
- [ ] Configurare GitHub Pages
- [ ] Creare Measurement ID GA4 e inserirlo nel codice
