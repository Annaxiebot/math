// AI Tutor Configuration - Secure Vercel Proxy

const AI_CONFIG = {
    // API key is stored securely in Vercel Environment Variables
    NVIDIA_API_KEY: '',
    
    // Working model
    MODEL: 'meta/llama-3.1-8b-instruct',
    
    // Clean Vercel proxy (NO API keys in GitHub!)
    INVOKE_URL: 'https://math-api-proxy-vercel.vercel.app/api'
};

function isAITutorAvailable() {
    return true; // Always available via secure proxy
}
