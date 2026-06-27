// Prompt Improvement System Prompt

const PromptImprovementPrompt = {
    getSystemPrompt() {
        return SYSTEM_PROMPTS[CONFIG.TABS.PROMPT_IMPROVEMENT];
    },
    
    /**
     * Validate user input
     * @param {string} input - User input
     * @returns {boolean} Is valid
     */
    validateInput(input) {
        if (!input || typeof input !== 'string') return false;
        return input.trim().length > 0;
    },
    
    /**
     * Get placeholder text
     * @returns {string} Placeholder
     */
    getPlaceholder() {
        return 'Enter your prompt here...';
    },
    
    /**
     * Get tab name
     * @returns {string} Tab name
     */
    getTabName() {
        return 'Prompt Improvement';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptImprovementPrompt;
}