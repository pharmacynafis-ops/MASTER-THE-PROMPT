// Editor Component - Handles text editor functionality

const EditorComponent = {
    /**
     * Initialize editor functionality for all tabs
     */
    init() {
        this.setupAllEditors();
        this.setupFullscreen();
        this.setupClearButtons();
        this.setupSendButtons();
        this.setupCopyButtons();
    },
    
    /**
     * Setup all editor instances
     */
    setupAllEditors() {
        const editors = [
            { input: 'promptInput', tab: CONFIG.TABS.PROMPT_IMPROVEMENT },
            { input: 'grammarInput', tab: CONFIG.TABS.GRAMMAR_CHECK },
            { input: 'translationInput', tab: CONFIG.TABS.TRANSLATION }
        ];
        
        editors.forEach(editor => {
            this.setupEditor(editor.input, editor.tab);
        });
    },
    
    /**
     * Setup individual editor
     * @param {string} inputId - Input element ID
     * @param {string} tab - Tab name
     */
    setupEditor(inputId, tab) {
        const inputElement = DOM.getElement(inputId);
        if (!inputElement) return;
        
        // Character count update
        const updateCharCount = Helpers.debounce(() => {
            const charCount = DOM.getElement(inputId.replace('Input', 'Count'));
            if (charCount) {
                const count = Helpers.countCharacters(inputElement.value);
                const words = Helpers.countWords(inputElement.value);
                charCount.textContent = `${count} characters | ${words} words`;
            }
        }, CONFIG.DEBOUNCE_DELAY);
        
        inputElement.addEventListener('input', updateCharCount);
        
        // Initial count
        updateCharCount();
    },
    
    /**
     * Setup fullscreen functionality
     */
    setupFullscreen() {
        document.querySelectorAll('.fullscreen-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const editorContainer = e.target.closest('.editor-container');
                const textarea = editorContainer.querySelector('.editor-input');
                
                if (textarea.classList.contains('fullscreen')) {
                    // Exit fullscreen
                    textarea.classList.remove('fullscreen');
                    btn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <polyline points="9 21 3 21 3 15"></polyline>
                            <line x1="21" y1="3" x2="14" y2="10"></line>
                            <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                    `;
                    btn.title = 'Fullscreen';
                } else {
                    // Enter fullscreen
                    textarea.classList.add('fullscreen');
                    btn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="4 8 4 4 8 4"></polyline>
                            <polyline points="20 16 20 20 16 20"></polyline>
                            <line x1="4" y1="4" x2="20" y2="20"></line>
                            <line x1="20" y1="4" x2="4" y2="20"></line>
                        </svg>
                    `;
                    btn.title = 'Exit Fullscreen';
                }
            });
        });
        
        // Exit fullscreen on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const fullscreenTextarea = document.querySelector('.editor-input.fullscreen');
                if (fullscreenTextarea) {
                    fullscreenTextarea.classList.remove('fullscreen');
                    // Reset all fullscreen buttons
                    document.querySelectorAll('.fullscreen-btn').forEach(btn => {
                        btn.innerHTML = `
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <polyline points="9 21 3 21 3 15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                        `;
                        btn.title = 'Fullscreen';
                    });
                }
            }
        });
    },
    
    /**
     * Setup clear buttons
     */
    async setupClearButtons() {
        document.querySelectorAll('.clear-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const editorContainer = e.target.closest('.editor-container');
                const textarea = editorContainer.querySelector('.editor-input');
                const outputContent = editorContainer.querySelector('.output-content');
                
                if (textarea.value.trim() !== '' || outputContent.textContent.trim() !== '') {
                    const confirmed = await CustomModal.confirm(
                        'Are you sure you want to clear both input and output?',
                        'Clear Content',
                        'Clear',
                        'Cancel'
                    );
                    
                    if (confirmed) {
                        textarea.value = '';
                        outputContent.textContent = '';
                        textarea.dispatchEvent(new Event('input'));
                    }
                }
            });
        });
    },
    
    /**
     * Setup send buttons
     */
    setupSendButtons() {
        document.querySelectorAll('.send-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const editorContainer = e.target.closest('.editor-container');
                const textarea = editorContainer.querySelector('.editor-input');
                const outputContent = editorContainer.querySelector('.output-content');
                const tabContent = editorContainer.closest('.tab-content');
                const tabId = tabContent.id.replace('tab-', '');
                
                await this.processInput(tabId, textarea, outputContent, btn);
            });
        });
    },
    
    /**
     * Process user input
     * @param {string} tab - Tab name
     * @param {HTMLElement} inputElement - Input textarea
     * @param {HTMLElement} outputElement - Output container
     * @param {HTMLElement} sendButton - Send button
     */
    async processInput(tab, inputElement, outputElement, sendButton) {
        const input = inputElement.value.trim();
        
        if (!input) {
            await CustomModal.alert('Please enter some text first.', 'warning', 'Input Required');
            return;
        }
        
        // Get API key and model
        const apiKey = await StorageService.getApiKey();
        const model = await StorageService.getModel();
        
        if (!apiKey) {
            await CustomModal.alert('Please configure your OpenRouter API key in settings first.', 'warning', 'API Key Required');
            SettingsComponent.open();
            return;
        }
        
        // Get system prompt
        let systemPrompt;
        switch (tab) {
            case CONFIG.TABS.PROMPT_IMPROVEMENT:
                systemPrompt = PromptImprovementPrompt.getSystemPrompt();
                break;
            case CONFIG.TABS.GRAMMAR_CHECK:
                systemPrompt = GrammarCheckPrompt.getSystemPrompt();
                break;
            case CONFIG.TABS.TRANSLATION:
                systemPrompt = TranslationPrompt.getSystemPrompt();
                break;
            default:
                return;
        }
        
        // Disable button (no loading overlay for better streaming UX)
        sendButton.disabled = true;
        sendButton.textContent = 'Generating...';
        
        try {
            // Clear output and prepare for streaming
            outputElement.textContent = '';
            
            // Send streaming request to API
            const response = await APIService.sendStreamingRequest(
                input, 
                systemPrompt, 
                apiKey, 
                model,
                (chunk, fullText) => {
                    // Update output in real-time as chunks arrive
                    outputElement.textContent = fullText;
                    // Scroll to output to keep up with streaming
                    DOM.scrollIntoView(outputElement);
                }
            );
            
            // Final output is already set by streaming callback
            // Scroll to output one final time
            DOM.scrollIntoView(outputElement);
            
        } catch (error) {
            outputElement.innerHTML = `<span style="color: var(--error);">Error: ${Helpers.escapeHtml(error.message)}</span>`;
            console.error('Processing error:', error);
        } finally {
            // Re-enable button
            sendButton.disabled = false;
            sendButton.textContent = 'Send';
        }
    },
    
    /**
     * Setup copy buttons
     */
    setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const outputContent = e.target.closest('.output-container').querySelector('.output-content');
                const text = outputContent.textContent;
                
                if (!text) {
                    await CustomModal.alert('No output to copy.', 'info', 'Nothing to Copy');
                    return;
                }
                
                const success = await Helpers.copyToClipboard(text);
                
                if (success) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                    `;
                    btn.classList.add('copied');
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('copied');
                    }, 2000);
                } else {
                    await CustomModal.alert('Failed to copy to clipboard.', 'error', 'Copy Failed');
                }
            });
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EditorComponent;
}