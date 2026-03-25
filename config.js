// AI Tutor Configuration
// ⚠️ TEMPORARY - For testing only
// After Cloudflare Worker is deployed, this will be removed

const AI_CONFIG = {
    // Test API key - will move to secure Cloudflare Worker
    NVIDIA_API_KEY: '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',
    
    // Working model
    MODEL: 'meta/llama-3.1-8b-instruct',
    
    // Direct to NVIDIA for now - will change to worker URL after deployment
    INVOKE_URL: 'https://integrate.api.nvidia.com/v1/chat/completions'
};

function isAITutorAvailable() {
    return AI_CONFIG.NVIDIA_API_KEY && AI_CONFIG.NVIDIA_API_KEY.length > 0;
}
