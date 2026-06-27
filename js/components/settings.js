// Settings Component - Handles settings modal and API configuration

const SettingsComponent = {
    /**
     * Initialize settings functionality
     */
    init() {
        this.setupSettingsButton();
        this.setupModalClose();
        this.setupSaveButton();
        this.loadSavedSettings();
    },
    
    /**
     * Setup settings button click listener
     */
    setupSettingsButton() {
        DOM.addEventListener('settingsBtn', 'click', () => {
            this.open();
        });
    },
    
    /**
     * Open settings modal
     */
    open() {
        DOM.addClass('settingsModal', 'active');
        this.loadSavedSettings();
    },
    
    /**
     * Close settings modal
     */
    close() {
        DOM.removeClass('settingsModal', 'active');
    },
    
    /**
     * Setup modal close button
     */
    setupModalClose() {
        // Close button
        const closeBtn = document.querySelector('#settingsModal .close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.close();
            });
        }
        
        // Click outside modal to close
        DOM.addEventListener('settingsModal', 'click', (e) => {
            if (e.target.id === 'settingsModal') {
                this.close();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const settingsModal = DOM.getElement('settingsModal');
                if (settingsModal && DOM.hasClass(settingsModal, 'active')) {
                    this.close();
                }
            }
        });
    },
    
    /**
     * Setup save button
     */
    setupSaveButton() {
        const saveBtn = document.querySelector('#settingsModal .save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', async () => {
                await this.saveSettings();
            });
        }
    },
    
    /**
     * Load saved settings into form
     */
    async loadSavedSettings() {
        try {
            const apiKey = await StorageService.getApiKey();
            const model = await StorageService.getModel();
            
            DOM.setValue('apiKey', apiKey);
            DOM.setValue('modelSelect', model);
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    },
    
    /**
     * Save settings from form
     */
    async saveSettings() {
        try {
            const apiKey = DOM.getValue('apiKey').trim();
            const model = DOM.getValue('modelSelect');
            
            // Validate API key
            if (!Helpers.validateApiKey(apiKey)) {
                alert('Please enter a valid API key.');
                return;
            }
            
            // Save to IndexedDB
            await StorageService.saveApiKey(apiKey);
            await StorageService.saveModel(model);
            
            // Show success feedback
            const saveBtn = document.querySelector('#settingsModal .save-btn');
            const originalText = saveBtn.textContent;
            saveBtn.textContent = 'Saved!';
            saveBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.backgroundColor = '';
            }, 2000);
            
            // Close modal after short delay
            setTimeout(() => {
                this.close();
            }, 1000);
            
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('Failed to save settings. Please try again.');
        }
    },
    
    /**
     * Test API connection
     */
    async testConnection() {
        const apiKey = DOM.getValue('apiKey').trim();
        const model = DOM.getValue('modelSelect');
        
        if (!Helpers.validateApiKey(apiKey)) {
            alert('Please enter a valid API key first.');
            return;
        }
        
        const testBtn = document.querySelector('#settingsModal .test-btn');
        if (testBtn) {
            testBtn.disabled = true;
            testBtn.textContent = 'Testing...';
        }
        
        try {
            const success = await APIService.testConnection(apiKey, model);
            
            if (success) {
                alert('Connection successful! Your API key is working correctly.');
            } else {
                alert('Connection failed. Please check your API key and try again.');
            }
        } catch (error) {
            alert(`Connection test failed: ${error.message}`);
        } finally {
            if (testBtn) {
                testBtn.disabled = false;
                testBtn.textContent = 'Test Connection';
            }
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsComponent;
}