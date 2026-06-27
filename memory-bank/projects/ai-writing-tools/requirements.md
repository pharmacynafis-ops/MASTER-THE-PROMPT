# Project Requirements

## Core Requirements

### Hosting & Infrastructure
- **Hosting Platform**: Firebase (hosting only)
- **Database**: IndexedDB (client-side browser storage)
- **No online database required**
- Fully client-side application

### User Interface
- **Layout**: Simple and user-friendly
- **Navigation**: Three tab buttons positioned at the top middle of the page
- **Settings**: Settings button in top left corner
  - OpenRouter API key input with link to get API key
  - Model selection dropdown
  - Nothing else in settings
- **Theme**: Light theme with green color scheme
- **Style**: Modern design with high performance

### Main Features (Three Tabs)

#### Tab 1: Prompt Improvement
- Large text box for writing prompts
- Fullscreen editing capability
- Send button to process input
- System prompt integration with AI

#### Tab 2: English Grammar & Syntax
- Large text box for writing text/paragraphs
- Fullscreen editing capability
- Send button to process input
- Helps users upgrade English writing experience
- Identifies mistakes in sentences
- System prompt integration with AI

#### Tab 3: Perfect En-Ar Translation
- Large text box for writing text to translate
- Fullscreen editing capability
- Send button to process input
- English to Arabic translation
- System prompt integration with AI

### Text Box Features
- Large text input area
- Fullscreen mode for easy editing
- Word/character count display
- Clear text button
- Clean and intuitive design

### Output Display
- Separate output area below input
- Clear distinction between input and output
- Copy to clipboard button for output
- Loading indicator while processing

### AI Integration
- **Provider**: OpenRouter
- **Model**: DeepSeek V3.2 Flash
- Each tab sends input with a specific system prompt to the AI
- Direct API calls from client-side

## Non-Functional Requirements
- Fast loading and responsive design
- Works offline with IndexedDB for data persistence
- Secure API key handling (stored in IndexedDB)
- Cross-browser compatibility
- Mobile-friendly interface
- Modern frontend design with green color scheme
- High performance with no performance issues
- Optimized for speed and efficiency

## IndexedDB Storage Requirements
- Store OpenRouter API key securely
- Store selected model preference
- Persist user settings

## Out of Scope (For Now)
- No code implementation required at this stage
- Backend server not required
- User authentication not specified
- No online database