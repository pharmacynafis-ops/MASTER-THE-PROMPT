// Custom Modal Component - Replaces browser alert/confirm dialogs

const CustomModal = {
    currentResolve: null,
    
    /**
     * Initialize modal functionality
     */
    init() {
        // Create modal HTML immediately
        this.createModalHTML();
        
        // Setup close handlers after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.setupCloseHandlers();
        }, 0);
    },
    
    /**
     * Create modal HTML structure
     */
    createModalHTML() {
        // Check if modal already exists
        if (DOM.getElement('customModalOverlay')) {
            return;
        }
        
        const modalHTML = `
            <div id="customModalOverlay" class="custom-modal-overlay hidden">
                <div class="custom-modal">
                    <div class="custom-modal-header">
                        <div class="custom-modal-icon" id="customModalIcon"></div>
                        <h3 class="custom-modal-title" id="customModalTitle">Title</h3>
                    </div>
                    <div class="custom-modal-body" id="customModalBody">
                        Message content here
                    </div>
                    <div class="custom-modal-footer" id="customModalFooter">
                        <button class="custom-modal-btn secondary" id="customModalCancel">Cancel</button>
                        <button class="custom-modal-btn primary" id="customModalConfirm">OK</button>
                    </div>
                </div>
            </div>
        `;
        
        // Append to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },
    
    /**
     * Setup close handlers
     */
    setupCloseHandlers() {
        // Close on overlay click
        DOM.addEventListener('customModalOverlay', 'click', (e) => {
            if (e.target.id === 'customModalOverlay') {
                this.close(false);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const overlay = DOM.getElement('customModalOverlay');
                if (overlay && !DOM.hasClass(overlay, 'hidden')) {
                    this.close(false);
                }
            }
        });
        
        // Cancel button
        DOM.addEventListener('customModalCancel', 'click', () => {
            this.close(false);
        });
        
        // Confirm button
        DOM.addEventListener('customModalConfirm', 'click', () => {
            this.close(true);
        });
    },
    
    /**
     * Show custom alert
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'warning', 'error', 'info'
     * @param {string} title - Title text
     * @returns {Promise} Promise that resolves when dismissed
     */
    alert(message, type = 'info', title = '') {
        return new Promise((resolve) => {
            this.currentResolve = resolve;
            
            const titles = {
                success: 'Success',
                warning: 'Warning',
                error: 'Error',
                info: 'Information'
            };
            
            const icons = {
                success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
                warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
                error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
                info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
            };
            
            this.show({
                type,
                title: title || titles[type],
                message,
                icon: icons[type],
                showCancel: false,
                confirmText: 'OK'
            });
        });
    },
    
    /**
     * Show custom confirm dialog
     * @param {string} message - Message to display
     * @param {string} title - Title text
     * @param {string} confirmText - Confirm button text
     * @param {string} cancelText - Cancel button text
     * @returns {Promise<boolean>} Promise that resolves to true/false
     */
    confirm(message, title = 'Confirm', confirmText = 'Confirm', cancelText = 'Cancel') {
        return new Promise((resolve) => {
            this.currentResolve = resolve;
            
            const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
            
            this.show({
                type: 'info',
                title,
                message,
                icon,
                showCancel: true,
                confirmText,
                cancelText
            });
        });
    },
    
    /**
     * Show modal with specified options
     * @param {Object} options - Modal options
     */
    show(options) {
        const { type, title, message, icon, showCancel, confirmText, cancelText } = options;
        
        // Set icon
        const iconElement = DOM.getElement('customModalIcon');
        iconElement.innerHTML = icon;
        iconElement.className = `custom-modal-icon ${type}`;
        
        // Set title
        DOM.setText('customModalTitle', title);
        
        // Set message
        DOM.setText('customModalBody', message);
        
        // Setup buttons
        const confirmBtn = DOM.getElement('customModalConfirm');
        const cancelBtn = DOM.getElement('customModalCancel');
        
        confirmBtn.textContent = confirmText || 'OK';
        confirmBtn.className = `custom-modal-btn ${showCancel ? 'primary' : 'primary'}`;
        
        if (showCancel) {
            cancelBtn.textContent = cancelText || 'Cancel';
            cancelBtn.style.display = 'block';
        } else {
            cancelBtn.style.display = 'none';
        }
        
        // Show modal
        DOM.removeClass('customModalOverlay', 'hidden');
        
        // Focus confirm button
        setTimeout(() => confirmBtn.focus(), 100);
    },
    
    /**
     * Close modal
     * @param {boolean} result - Result to resolve promise with
     */
    close(result) {
        DOM.addClass('customModalOverlay', 'hidden');
        
        if (this.currentResolve) {
            this.currentResolve(result);
            this.currentResolve = null;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomModal;
}