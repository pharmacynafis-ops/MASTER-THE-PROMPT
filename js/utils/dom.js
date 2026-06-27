// DOM Manipulation Helper Functions

const DOM = {
    /**
     * Get element by ID
     * @param {string} id - Element ID
     * @returns {HTMLElement} DOM element
     */
    getElement(id) {
        return document.getElementById(id);
    },

    /**
     * Get all elements by selector
     * @param {string} selector - CSS selector
     * @returns {NodeList} List of elements
     */
    getElements(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Add event listener to element
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    addEventListener(element, event, handler) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.addEventListener(event, handler);
        }
    },

    /**
     * Remove event listener from element
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     */
    removeEventListener(element, event, handler) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.removeEventListener(event, handler);
        }
    },

    /**
     * Add class to element
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} className - Class name to add
     */
    addClass(element, className) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.classList.add(className);
        }
    },

    /**
     * Remove class from element
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} className - Class name to remove
     */
    removeClass(element, className) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} className - Class name to toggle
     */
    toggleClass(element, className) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.classList.toggle(className);
        }
    },

    /**
     * Check if element has class
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} className - Class name to check
     * @returns {boolean} Has class
     */
    hasClass(element, className) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            return el.classList.contains(className);
        }
        return false;
    },

    /**
     * Set element text content
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} text - Text content
     */
    setText(element, text) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.textContent = text;
        }
    },

    /**
     * Set element HTML content
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} html - HTML content
     */
    setHtml(element, html) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.innerHTML = html;
        }
    },

    /**
     * Get element value
     * @param {string|HTMLElement} element - Element or ID
     * @returns {string} Element value
     */
    getValue(element) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            return el.value;
        }
        return '';
    },

    /**
     * Set element value
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} value - Value to set
     */
    setValue(element, value) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.value = value;
        }
    },

    /**
     * Show element
     * @param {string|HTMLElement} element - Element or ID
     */
    show(element) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.style.display = '';
        }
    },

    /**
     * Hide element
     * @param {string|HTMLElement} element - Element or ID
     */
    hide(element) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.style.display = 'none';
        }
    },

    /**
     * Create element with attributes and children
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {string|HTMLElement|Array} children - Child elements or text
     * @returns {HTMLElement} Created element
     */
    createElement(tag, attributes = {}, children = null) {
        const element = document.createElement(tag);
        
        // Set attributes
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'style' && typeof attributes[key] === 'object') {
                Object.assign(element.style, attributes[key]);
            } else if (key === 'dataset' && typeof attributes[key] === 'object') {
                Object.keys(attributes[key]).forEach(dataKey => {
                    element.dataset[dataKey] = attributes[key][dataKey];
                });
            } else {
                element[key] = attributes[key];
            }
        });
        
        // Add children
        if (children) {
            if (Array.isArray(children)) {
                children.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else if (child instanceof HTMLElement) {
                        element.appendChild(child);
                    }
                });
            } else if (typeof children === 'string') {
                element.textContent = children;
            } else if (children instanceof HTMLElement) {
                element.appendChild(children);
            }
        }
        
        return element;
    },

    /**
     * Clear all children from element
     * @param {string|HTMLElement} element - Element or ID
     */
    clear(element) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.innerHTML = '';
        }
    },

    /**
     * Disable element
     * @param {string|HTMLElement} element - Element or ID
     * @param {boolean} disabled - Whether to disable
     */
    setDisabled(element, disabled) {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.disabled = disabled;
        }
    },

    /**
     * Scroll element into view
     * @param {string|HTMLElement} element - Element or ID
     * @param {string} behavior - Scroll behavior ('smooth' or 'auto')
     */
    scrollIntoView(element, behavior = 'smooth') {
        const el = typeof element === 'string' ? this.getElement(element) : element;
        if (el) {
            el.scrollIntoView({ behavior, block: 'nearest' });
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DOM;
}