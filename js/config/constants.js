// Application Constants and Configuration

const CONFIG = {
    // OpenRouter API
    API_BASE_URL: 'https://openrouter.ai/api/v1',
    DEFAULT_MODEL: 'deepseek/deepseek-chat',
    
    // IndexedDB
    DB_NAME: 'AIWritingToolsDB',
    DB_VERSION: 1,
    
    // Storage Keys
    STORAGE_KEYS: {
        API_KEY: 'apiKey',
        MODEL: 'selectedModel'
    },
    
    // UI
    TABS: {
        PROMPT_IMPROVEMENT: 'prompt-improvement',
        GRAMMAR_CHECK: 'grammar-check',
        TRANSLATION: 'translation'
    },
    
    // Animation Durations
    ANIMATION_DURATION: 300,
    
    // Debounce Delay
    DEBOUNCE_DELAY: 300
};

// System Prompts
const SYSTEM_PROMPTS = {
    [CONFIG.TABS.PROMPT_IMPROVEMENT]: `You are an expert prompt engineer. Your task is to improve and optimize the user's prompt to get better results from AI systems.

Guidelines:
- Make the prompt more specific, clear, and detailed
- Add context and constraints if missing
- Structure the prompt for better AI understanding
- Maintain the user's original intent
- Provide the improved version only, without explanations unless requested
- Use proper formatting and structure

Output format: Provide only the improved prompt, ready to use.`,

    [CONFIG.TABS.GRAMMAR_CHECK]: `You are an expert English language teacher and editor. Your task is to analyze the user's text for grammar, syntax, and writing quality issues.

Check for:
- Grammar errors (subject-verb agreement, tenses, articles, etc.)
- Punctuation mistakes
- Spelling errors
- Sentence structure and flow
- Word choice and vocabulary
- Clarity and readability

Output format:
1. First, provide the corrected version of the text
2. Then, list all improvements made with brief explanations
3. If no errors found, confirm the text is correct

Be constructive and educational in your feedback.`,

    [CONFIG.TABS.TRANSLATION]: `You are a professional English to Arabic translator. Your task is to provide accurate, natural, and culturally appropriate translations.

Guidelines:
- Translate the meaning accurately, not word-for-word
- Use natural, fluent Arabic that native speakers would use
- Maintain the tone and style of the original text
- Handle idioms and expressions appropriately
- Preserve formatting and structure when possible
- Use Modern Standard Arabic (MSA) for formal content
- Use appropriate dialect if the context suggests informal content

Output format: Provide only the Arabic translation, without explanations unless the text is ambiguous.`
};

// Available Models
const AVAILABLE_MODELS = [
    // Free Models
    { id: 'google/gemma-4-31b-it:free', name: 'Google Gemma 4 31B (Free)', free: true },
    { id: 'qwen/qwen3-next-80b-a3b-instruct:free', name: 'Qwen3 Next 80B (Free)', free: true },
    { id: 'nvidia/nemotron-3-ultra-550b-a55b:free', name: 'NVIDIA Nemotron 3 Ultra 550B (Free)', free: true },
    { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Meta Llama 3.3 70B (Free)', free: true },
    { id: 'qwen/qwen3-coder:free', name: 'Qwen3 Coder 480B (Free)', free: true },
    { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', name: 'NVIDIA Nemotron 3 Nano Omni (Free)', free: true },
    { id: 'poolside/laguna-m.1:free', name: 'Poolside Laguna M.1 (Free)', free: true },
    { id: 'google/gemma-4-26b-a4b-it:free', name: 'Google Gemma 4 26B (Free)', free: true },
    
    // Paid Models
    { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3.2 Flash', free: false },
    { id: 'google/gemini-2.5-flash', name: 'Google Gemini 2.5 Flash', free: false },
    { id: 'qwen/qwen3.6-flash', name: 'Qwen3.6 Flash', free: false },
    { id: 'anthropic/claude-sonnet-4.5', name: 'Anthropic Claude Sonnet 4.5', free: false },
    { id: 'openai/gpt-4.1-mini', name: 'OpenAI GPT-4.1 Mini', free: false }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, SYSTEM_PROMPTS, AVAILABLE_MODELS };
}