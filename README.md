# 🎀 Mickey's Math Quest - Grade 6 Math Practice

An interactive Grade 6 math learning app with AI tutor powered by NVIDIA!

## Features

### 📚 Practice Topics
- **Solving Equations** - One-step, two-step, and distributive property
- **Slope & Linear Equations** - Calculate slope, understand y=mx+b, find points
- **Order of Operations** - BEDMAS/PEMDAS practice
- **Fractions** - Adding, subtracting, multiplying, dividing
- **Area & Perimeter** - Rectangles, squares, triangles

### 🎓 AI Tutor Mickey
Ask Mickey to create custom practice problems for you!

## Setting Up AI Tutor Mickey

### Option 1: Personal Use (Simple but exposes API key)

1. Get a free NVIDIA API key from [build.nvidia.com](https://build.nvidia.com/)
2. Edit `config.js` and add your API key:
   ```javascript
   const AI_CONFIG = {
       NVIDIA_API_KEY: 'nvapi-YOUR-KEY-HERE',
       MODEL: 'nvidia/llama-3.1-nemotron-70b-instruct',
       INVOKE_URL: 'https://integrate.api.nvidia.com/v1/chat/completions'
   };
   ```
3. **⚠️ IMPORTANT:** If using this method:
   - Do NOT commit config.js with your real API key to a public repo
   - Add `config.js` to `.gitignore`
   - This is only suitable for personal/local use

### Option 2: Secure Production Setup (Recommended for public deployment)

For a secure public deployment, you need a backend proxy:

#### Using Cloudflare Workers (Free tier available):

1. Create a Cloudflare Worker with this code:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = await request.json();
  
  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NVIDIA_API_KEY}`, // Set as Worker secret
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
```

2. Set `NVIDIA_API_KEY` as a secret environment variable in Cloudflare
3. Update `config.js` to use your worker URL:

```javascript
const AI_CONFIG = {
    NVIDIA_API_KEY: '', // Not needed - worker handles it
    MODEL: 'nvidia/llama-3.1-nemotron-70b-instruct',
    INVOKE_URL: 'https://your-worker.your-subdomain.workers.dev'
};
```

## Local Development

1. Clone the repo
2. Open `index.html` in a browser
3. For AI Tutor, set up API key using one of the methods above

## Deployment

### GitHub Pages
1. Push to your GitHub repo
2. Enable GitHub Pages in repository settings
3. Site will be live at `https://username.github.io/repo-name/`

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools needed!)
- NVIDIA NIM API for AI tutoring
- Responsive design (works on phones, tablets, TVs)
- Mickey Mouse themed! 🎀

## API Models

The app uses NVIDIA's hosted LLM models:

- **Fast model:** `nvidia/llama-3.1-nemotron-70b-instruct` - Quick responses, great for tutoring
- **Smart model:** `qwen/qwen3.5-397b-a17b` - Slower but more capable

You can change the model in `config.js`.

## Security Note

**Never commit real API keys to public repositories!**

For local/personal use:
- Keep config.js with your API key locally
- Add config.js to .gitignore

For public deployment:
- Use a backend proxy (Cloudflare Workers, Vercel Functions, etc.)
- Store API keys as server-side secrets

## License

MIT - Feel free to use and modify!

## Credits

Created with ❤️ for Grade 6 math students who love Mickey Mouse! 🎀
