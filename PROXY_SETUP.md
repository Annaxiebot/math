# 🔒 Secure Proxy Setup for AI Tutor Mickey

## Why Do You Need a Proxy?

**The Problem:**
- Client-side JavaScript (GitHub Pages) exposes ALL code to users
- Anyone can view source and steal your API key
- This is fine for personal use, but NOT for public deployment

**The Solution:**
- Put the API key on a **server** (backend proxy)
- Your GitHub Pages site calls YOUR proxy
- The proxy calls NVIDIA with the hidden API key

## How a Proxy Works

```
User Browser          Your Proxy Server       NVIDIA API
    |                       |                      |
    |  1. "Give me         |                      |
    |     slope problems"   |                      |
    |---------------------->|                      |
    |                       |  2. Request with     |
    |                       |     SECRET API key   |
    |                       |--------------------->|
    |                       |                      |
    |                       |  3. Math problems    |
    |                       |<---------------------|
    |  4. Math problems     |                      |
    |<----------------------|                      |
    |                       |                      |

✅ API key never leaves your server!
✅ Users can't see or steal it!
```

## Option 1: Cloudflare Workers (Easiest & Free!)

### Step 1: Sign up for Cloudflare
1. Go to https://dash.cloudflare.com/sign-up
2. Free tier is perfect for this!

### Step 2: Create a Worker

1. Click "Workers & Pages" in left sidebar
2. Click "Create Application"
3. Choose "Create Worker"
4. Name it `math-tutor-proxy`
5. Click "Deploy"

### Step 3: Paste This Code

Click "Edit Code" and replace everything with:

```javascript
export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      // Get request body from your app
      const body = await request.json();
      
      // Call NVIDIA API with YOUR secret key
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.NVIDIA_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      // Return to your app
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
      
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
  }
}
```

### Step 4: Add Your Secret API Key

1. Click "Settings" tab
2. Scroll to "Environment Variables"
3. Click "Add variable"
4. Name: `NVIDIA_API_KEY`
5. Value: `nvapi-YOUR-KEY-HERE`
6. Type: "Secret" (encrypted!)
7. Click "Save"

### Step 5: Deploy

1. Click "Deploy" button
2. Copy your worker URL: `https://math-tutor-proxy.YOUR-USERNAME.workers.dev`

### Step 6: Update Your App

Edit `config.js`:

```javascript
const AI_CONFIG = {
    NVIDIA_API_KEY: '', // Empty! Not needed anymore
    MODEL: 'meta/llama-3.1-8b-instruct',
    INVOKE_URL: 'https://math-tutor-proxy.YOUR-USERNAME.workers.dev' // Your proxy!
};
```

### Step 7: Test & Deploy

1. Test locally - AI Tutor should work!
2. Commit and push to GitHub
3. Your API key is now SAFE! ✅

---

## Option 2: Vercel Serverless Function

### Create `api/tutor.js`:

```javascript
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Deploy to Vercel:
1. `npm install -g vercel`
2. `vercel` (in your project folder)
3. Add environment variable in Vercel dashboard: `NVIDIA_API_KEY`
4. Update `INVOKE_URL` to your Vercel URL

---

## Option 3: Simple Node.js Server (Your Own VPS)

### Create `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

app.post('/tutor', async (req, res) => {
  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
```

### Run:
```bash
export NVIDIA_API_KEY="nvapi-YOUR-KEY"
node server.js
```

---

## Comparison

| Option | Difficulty | Cost | Setup Time | Best For |
|--------|-----------|------|------------|----------|
| **Cloudflare Workers** | ⭐ Easy | Free | 10 min | Public deployment |
| **Vercel** | ⭐⭐ Medium | Free | 15 min | Developers |
| **Own Server** | ⭐⭐⭐ Hard | Varies | 30+ min | Full control |

## Recommendation

**For this project: Use Cloudflare Workers!**
- Completely free
- Takes 10 minutes
- No credit card needed
- Perfect for student projects

## Testing Your Proxy

Use curl to test:

```bash
curl -X POST https://your-proxy-url.workers.dev \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-3.1-8b-instruct",
    "messages": [{"role": "user", "content": "Test"}],
    "max_tokens": 100
  }'
```

If you get a response, it works! 🎉

## Questions?

Check the main README.md or ask in the repo issues!
