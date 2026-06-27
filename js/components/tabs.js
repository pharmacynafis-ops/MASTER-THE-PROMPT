// Tabs Component - Handles tab switching functionality

const TabsComponent = {
    /**
     * Initialize tabs functionality
     */
    init() {
        this.setupTabListeners();
    },
    
    /**
     * Setup tab click listeners
     */
    setupTabListeners() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                this.switchTab(tabName);
            });
        });
    },
    
    /**
     * Switch to a specific tab
     * @param {string} tabName - Tab name to switch to
     */
    switchTab(tabName) {
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            DOM.removeClass(btn, 'active');
        });
        
        // Add active class to clicked tab button
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeButton) {
            DOM.addClass(activeButton, 'active');
        }
        
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            DOM.removeClass(content, 'active');
        });
        
        // Show selected tab content
        const tabContent = DOM.getElement(`tab-${tabName}`);
        if (tabContent) {
            DOM.addClass(tabContent, 'active');
        }
    },
    
    /**
     * Get current active tab
     * @returns {string} Active tab name
     */
    getActiveTab() {
        const activeButton = document.querySelector('.tab-btn.active');
        if (activeButton) {
            return activeButton.dataset.tab;
        }
        return CONFIG.TABS.PROMPT_IMPROVEMENT;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabsComponent;
}