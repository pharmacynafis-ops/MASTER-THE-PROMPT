// OpenRouter API Service

const APIService = {
    /**
     * Send request to OpenRouter API
     * @param {string} userInput - User's input text
     * @param {string} systemPrompt - System prompt for the AI
     * @param {string} apiKey - OpenRouter API key
     * @param {string} model - Model ID to use
     * @returns {Promise<string>} AI response
     */
    async sendRequest(userInput, systemPrompt, apiKey, model) {
        if (!apiKey) {
            throw new Error('API key is required. Please configure it in settings.');
        }
        
        if (!userInput || userInput.trim() === '') {
            throw new Error('Input text is required.');
        }
        
        const url = `${CONFIG.API_BASE_URL}/chat/completions`;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.href,
            'X-Title': 'AI Writing Tools'
        };
        
        const body = {
            model: model || CONFIG.DEFAULT_MODEL,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userInput
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.9,
            frequency_penalty: 0.3,
            presence_penalty: 0.3,
            stream: false
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }
            
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },
    
    /**
     * Send streaming request to OpenRouter API
     * @param {string} userInput - User's input text
     * @param {string} systemPrompt - System prompt for the AI
     * @param {string} apiKey - OpenRouter API key
     * @param {string} model - Model ID to use
     * @param {function} onChunk - Callback function called with each chunk of text
     * @returns {Promise<string>} Complete AI response
     */
    async sendStreamingRequest(userInput, systemPrompt, apiKey, model, onChunk) {
        if (!apiKey) {
            throw new Error('API key is required. Please configure it in settings.');
        }
        
        if (!userInput || userInput.trim() === '') {
            throw new Error('Input text is required.');
        }
        
        const url = `${CONFIG.API_BASE_URL}/chat/completions`;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.href,
            'X-Title': 'AI Writing Tools'
        };
        
        const body = {
            model: model || CONFIG.DEFAULT_MODEL,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userInput
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
            top_p: 0.9,
            frequency_penalty: 0.3,
            presence_penalty: 0.3,
            stream: true
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error?.message || errorData.message || errorMessage;
                } catch (e) {
                    // Use default error message if parsing fails
                }
                throw new Error(errorMessage);
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';
            
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) {
                    break;
                }
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        
                        if (data === '[DONE]') {
                            return fullResponse;
                        }
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content;
                            
                            if (content) {
                                fullResponse += content;
                                if (onChunk) {
                                    onChunk(content, fullResponse);
                                }
                            }
                        } catch (e) {
                            // Skip invalid JSON lines
                        }
                    }
                }
            }
            
            return fullResponse;
            
        } catch (error) {
            console.error('Streaming API request failed:', error);
            throw error;
        }
    },
    
    /**
     * Test API connection with provided key
     * @param {string} apiKey - API key to test
     * @param {string} model - Model to test with
     * @returns {Promise<boolean>} Connection success
     */
    async testConnection(apiKey, model) {
        try {
            const testPrompt = 'Hello, this is a test message. Please respond with "OK" to confirm the connection is working.';
            const systemPrompt = 'You are a helpful assistant. Respond with "OK" only.';
            
            await this.sendRequest(testPrompt, systemPrompt, apiKey, model);
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    },
    
    /**
     * Get available models from OpenRouter
     * @param {string} apiKey - OpenRouter API key
     * @returns {Promise<Array>} List of available models
     */
    async getModels(apiKey) {
        if (!apiKey) {
            throw new Error('API key is required');
        }
        
        const url = `${CONFIG.API_BASE_URL}/models`;
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data.data || [];
            
        } catch (error) {
            console.error('Failed to fetch models:', error);
            throw error;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIService;
}