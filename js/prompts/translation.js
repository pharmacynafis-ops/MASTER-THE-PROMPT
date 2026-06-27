// Translation System Prompt

const TranslationPrompt = {
    getSystemPrompt() {
        return SYSTEM_PROMPTS[CONFIG.TABS.TRANSLATION];
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
        return 'Enter English text to translate...';
    },
    
    /**
     * Get tab name
     * @returns {string} Tab name
     */
    getTabName() {
        return 'Perfect En-Ar Translation';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationPrompt;
}