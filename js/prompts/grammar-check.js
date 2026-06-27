// Grammar Check System Prompt

const GrammarCheckPrompt = {
    getSystemPrompt() {
        return SYSTEM_PROMPTS[CONFIG.TABS.GRAMMAR_CHECK];
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
        return 'Enter your text here...';
    },
    
    /**
     * Get tab name
     * @returns {string} Tab name
     */
    getTabName() {
        return 'English Grammar & Syntax';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GrammarCheckPrompt;
}