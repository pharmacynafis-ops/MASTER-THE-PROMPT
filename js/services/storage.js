// IndexedDB Storage Service

const StorageService = {
    db: null,
    
    /**
     * Initialize IndexedDB
     * @returns {Promise<IDBDatabase>} Database instance
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);
            
            request.onerror = () => {
                reject(new Error('Failed to open IndexedDB'));
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create API Key store
                if (!db.objectStoreNames.contains('settings')) {
                    const settingsStore = db.createObjectStore('settings', { keyPath: 'key' });
                    settingsStore.createIndex('key', 'key', { unique: true });
                }
                
            };
        });
    },
    
    /**
     * Generic method to add/update data
     * @param {string} storeName - Object store name
     * @param {Object} data - Data to store
     * @returns {Promise} Transaction promise
     */
    async set(storeName, data) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to save data'));
        });
    },
    
    /**
     * Generic method to get data by key
     * @param {string} storeName - Object store name
     * @param {string} key - Key to retrieve
     * @returns {Promise<Object>} Retrieved data
     */
    async get(storeName, key) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(new Error('Failed to get data'));
        });
    },
    
    /**
     * Generic method to get all data from a store
     * @param {string} storeName - Object store name
     * @returns {Promise<Array>} All data
     */
    async getAll(storeName) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(new Error('Failed to get all data'));
        });
    },
    
    /**
     * Delete data by key
     * @param {string} storeName - Object store name
     * @param {string} key - Key to delete
     * @returns {Promise} Transaction promise
     */
    async delete(storeName, key) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to delete data'));
        });
    },
    
    /**
     * Clear all data from a store
     * @param {string} storeName - Object store name
     * @returns {Promise} Transaction promise
     */
    async clear(storeName) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Failed to clear store'));
        });
    },
    
    // Settings Methods
    
    /**
     * Save API key
     * @param {string} apiKey - API key to save
     * @returns {Promise} Save promise
     */
    async saveApiKey(apiKey) {
        return this.set('settings', {
            key: CONFIG.STORAGE_KEYS.API_KEY,
            value: apiKey
        });
    },
    
    /**
     * Get API key
     * @returns {Promise<string>} API key
     */
    async getApiKey() {
        const result = await this.get('settings', CONFIG.STORAGE_KEYS.API_KEY);
        return result ? result.value : '';
    },
    
    /**
     * Save selected model
     * @param {string} model - Model ID to save
     * @returns {Promise} Save promise
     */
    async saveModel(model) {
        return this.set('settings', {
            key: CONFIG.STORAGE_KEYS.MODEL,
            value: model
        });
    },
    
    /**
     * Get selected model
     * @returns {Promise<string>} Model ID
     */
    async getModel() {
        const result = await this.get('settings', CONFIG.STORAGE_KEYS.MODEL);
        return result ? result.value : CONFIG.DEFAULT_MODEL;
    },
    
    /**
     * Initialize default settings if not exists
     * @returns {Promise} Init promise
     */
    async initDefaults() {
        const apiKey = await this.getApiKey();
        if (!apiKey) {
            await this.saveApiKey('');
        }
        
        const model = await this.getModel();
        if (!model) {
            await this.saveModel(CONFIG.DEFAULT_MODEL);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageService;
}