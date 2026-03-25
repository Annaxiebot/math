# 🎓 Setting Up AI Tutor Mickey

## Quick Start (For Personal/Local Use)

### Step 1: Get Your Free NVIDIA API Key

1. Go to [build.nvidia.com](https://build.nvidia.com/)
2. Sign up or log in (it's free!)
3. Click "Get API Key" or navigate to any model
4. Copy your API key (starts with `nvapi-`)

### Step 2: Create Your Config File

1. In the math folder, copy `config.js.example` to `config.js`:
   ```bash
   cp config.js.example config.js
   ```

2. Open `config.js` and add your API key:
   ```javascript
   const AI_CONFIG = {
       NVIDIA_API_KEY: 'nvapi-YOUR-ACTUAL-KEY-HERE',
       MODEL: 'nvidia/llama-3.1-nemotron-70b-instruct',
       INVOKE_URL: 'https://integrate.api.nvidia.com/v1/chat/completions'
   };
   ```

3. Save the file

### Step 3: Test It!

1. Open `index.html` in your browser
2. Click "🎓 Ask AI Tutor Mickey"
3. Type something like: "Give me 3 slope problems"
4. Click "Ask Mickey!"

## ⚠️ Important Security Notes

### For Personal Use Only:
- **Never commit `config.js` with your real API key to GitHub!**
- The file is already in `.gitignore` to protect you
- Only use this method on your personal computer

### For Sharing/Public Deployment:
If you want to share your math app publicly:

1. **Don't include your API key** - Keep config.js.example as-is
2. **Set up a backend proxy** - See README.md for Cloudflare Workers setup
3. **Or disable AI Tutor** - The rest of the app works fine without it!

## Troubleshooting

### "API Key Not Configured" Warning
- Make sure you created `config.js` (not just the example)
- Check that your API key is correctly pasted
- Refresh the page

### "API Error" Message
- Verify your API key is valid at build.nvidia.com
- Check your internet connection
- Make sure you haven't exceeded the free tier limit

### AI Tutor Button Doesn't Respond
- Open browser console (F12) to see error messages
- Make sure `config.js` is in the same folder as `index.html`
- Try a different browser

## Example Questions to Ask Mickey

- "Give me 5 one-step equations to solve"
- "Create 3 slope problems with negative slopes"
- "I need practice with order of operations using multiplication"
- "Show me area problems with squares"
- "Give me fraction addition problems where I need to find common denominators"

## Model Options

You can change the AI model in `config.js`:

### Fast & Good (Recommended):
```javascript
MODEL: 'nvidia/llama-3.1-nemotron-70b-instruct'
```

### Slower but Smarter:
```javascript
MODEL: 'qwen/qwen3.5-397b-a17b'
```

### Very Capable:
```javascript
MODEL: 'meta/llama-3.1-405b-instruct'
```

## Questions?

Check the main README.md for more detailed setup options!
