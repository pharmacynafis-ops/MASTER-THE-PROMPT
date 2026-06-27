// Main Application Entry Point

const App = {
    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('Initializing AI Writing Tools...');
            
            // Initialize IndexedDB
            await StorageService.init();
            console.log('IndexedDB initialized');
            
            // Initialize default settings
            await StorageService.initDefaults();
            console.log('Default settings loaded');
            
            // Initialize all components
            TabsComponent.init();
            EditorComponent.init();
            SettingsComponent.init();
            CustomModal.init();
            
            console.log('AI Writing Tools initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            await CustomModal.alert('Failed to initialize application. Please refresh the page.', 'error', 'Initialization Error');
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    // DOM is already loaded
    App.init();
}