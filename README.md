# AI Writing Tools Website

A modern, user-friendly web application providing AI-powered writing assistance tools including prompt improvement, English grammar checking, and English-Arabic translation.

## Features

### Three Main Tools

1. **Prompt Improvement** - Enhance and optimize your prompts for better AI results
2. **English Grammar & Syntax** - Check and improve your English writing
3. **Perfect En-Ar Translation** - Translate English text to Arabic

### Key Features

- 🎨 **Modern Green Theme** - Clean, professional light theme with green accents
- 📝 **Fullscreen Editing** - Fullscreen mode for comfortable text editing
- 📊 **Word & Character Count** - Real-time text statistics
- 📋 **Copy to Clipboard** - One-click copy for outputs
- ⚡ **High Performance** - Optimized for speed and efficiency
- 💾 **Offline Storage** - IndexedDB for local data persistence
- 🔒 **Secure** - API keys stored locally in your browser

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: Firebase Hosting
- **Database**: IndexedDB (client-side)
- **AI Provider**: OpenRouter API
- **AI Model**: DeepSeek V3.2 Flash

## Project Structure

```
E:\CURRENT\MasterThePrompt\
├── index.html                 # Main HTML entry point
├── firebase.json             # Firebase hosting configuration
├── PROJECT-STRUCTURE.md      # Detailed project structure documentation
├── README.md                 # This file
│
├── css/                       # Stylesheets
│   ├── main.css              # Main styles and resets
│   ├── themes/
│   │   └── green-theme.css   # Green color scheme variables
│   └── components/           # Component-specific styles
│       ├── header.css
│       ├── tabs.css
│       ├── editor.css
│       ├── settings.css
│       └── history.css
│
├── js/                        # JavaScript modules
│   ├── app.js                # Main application entry point
│   ├── config/
│   │   └── constants.js      # App constants and configuration
│   ├── services/             # Business logic and external integrations
│   │   ├── api.js           # OpenRouter API integration
│   │   ├── storage.js       # IndexedDB operations
│   │   └── history.js       # History management service
│   ├── components/           # UI component logic
│   │   ├── tabs.js
│   │   ├── editor.js
│   │   ├── settings.js
│   │   └── history.js
│   ├── utils/                # Utility functions
│   │   ├── dom.js           # DOM manipulation helpers
│   │   └── helpers.js       # General helper functions
│   └── prompts/              # System prompts for AI
│       ├── prompt-improvement.js
│       ├── grammar-check.js
│       └── translation.js
│
└── assets/                    # Static assets
    └── icons/               # SVG icons
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- OpenRouter API key ([Get one here](https://openrouter.ai/))
- Node.js and npm (for Firebase deployment)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone https://github.com/pharmacynafis-ops/MASTER-THE-PROMPT.git
   cd MasterThePrompt
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Configure API Key**
   - Click the Settings button (top left)
   - Enter your OpenRouter API key
   - Select your preferred model (default: DeepSeek V3.2 Flash)
   - Click Save

### Usage

1. **Select a Tool**: Click on one of the three tabs at the top
2. **Enter Text**: Type or paste your text in the input area
3. **Use Editor Features**:
   - Click the fullscreen button for distraction-free editing
   - View word and character count
   - Clear input/output with the clear button
4. **Send to AI**: Click the "Send" button to process your text
5. **View Output**: Results appear in the separate output area below
6. **Copy Output**: Click the copy button to copy results to clipboard
7. **Access History**: Click the history button (top right) to view past interactions

## Deployment to Firebase

### Prerequisites

- Firebase CLI installed
- Firebase project created

### Steps

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase (if not done)**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

## Features in Detail

### Tab 1: Prompt Improvement
- **Purpose**: Optimize prompts for better AI responses
- **System Prompt**: Expert prompt engineering guidance
- **Output**: Improved, ready-to-use prompt

### Tab 2: English Grammar & Syntax
- **Purpose**: Check and improve English writing
- **System Prompt**: Expert English language teacher
- **Output**: Corrected text with explanations of improvements

### Tab 3: Perfect En-Ar Translation
- **Purpose**: Translate English to Arabic
- **System Prompt**: Professional translator guidance
- **Output**: Natural, fluent Arabic translation


### Settings
- **API Key**: Securely stored in IndexedDB
- **Model Selection**: Choose from available OpenRouter models
- **Get API Key Link**: Direct link to OpenRouter API key page
- **Nothing Else**: Settings limited to API configuration only

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Privacy & Security

- **No Online Database**: All data stored locally in your browser
- **API Key Security**: Keys stored in IndexedDB, never sent to third parties
- **No Tracking**: No analytics or tracking scripts
- **Offline Capable**: Works offline for history and settings

## Performance

- **Optimized Loading**: Minimal dependencies, fast load times
- **Efficient DOM Operations**: Debounced inputs and optimized updates
- **No Build Process**: Direct browser execution
- **Modular Architecture**: Clean, maintainable code structure

## Troubleshooting

### API Key Not Working
- Ensure you've entered a valid OpenRouter API key
- Check that you have credits in your OpenRouter account
- Verify the model is available in your OpenRouter subscription

### History Not Saving
- Check if IndexedDB is enabled in your browser
- Ensure you're not in private/incognito mode
- Check browser console for errors

### Performance Issues
- Clear browser cache
- Disable browser extensions that might interfere
- Try a different browser

## Development

### Adding New Features

1. **New Tab**: Add to `index.html`, create component in `js/components/`, add prompt in `js/prompts/`
2. **New Styles**: Add to appropriate file in `css/components/`
3. **New Services**: Add to `js/services/`

### Code Structure

The project follows a layered architecture:
- **Presentation Layer**: HTML, CSS, UI components
- **Business Logic Layer**: Services (API, Storage, History)
- **Data Access Layer**: IndexedDB operations
- **Infrastructure Layer**: Configuration, utilities

## Contributing

This is a personal project. Feel free to fork and modify for your own use.

## License

MIT License - feel free to use this project as you wish.

## Credits

- Built with vanilla JavaScript for maximum performance
- Uses OpenRouter API for AI capabilities
- Styled with modern CSS3 features
- Data persistence with IndexedDB

## Contact

For issues or questions, please refer to the project documentation.

---

**Last Updated**: 2026-06-27
**Version**: 1.0.0
**Status**: Planning Complete - Ready for Implementation