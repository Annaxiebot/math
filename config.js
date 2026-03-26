// AI Tutor Configuration - Secure Vercel Proxy

const AI_CONFIG = {
    // API key is now stored securely on Vercel server - not needed here!
    NVIDIA_API_KEY: '',
    
    // Working model
    MODEL: 'meta/llama-3.1-8b-instruct',
    
    // Vercel proxy endpoint (secure!)
    INVOKE_URL: 'https://math-api-proxy1.vercel.app/api'
};

function isAITutorAvailable() {
    return true; // Always available via proxy
}
