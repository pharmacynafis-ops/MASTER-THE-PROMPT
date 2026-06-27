# AI Writing Tools Website - Project Structure

## Overview
This document outlines the organized folder structure for the AI Writing Tools Website project, following best practices for maintainability and scalability.

## Root Directory Structure

```
E:\CURRENT\MasterThePrompt\
├── index.html                 # Main HTML entry point
├── css/                       # Stylesheets
│   ├── main.css              # Main styles and resets
│   ├── components/           # Component-specific styles
│   │   ├── header.css
│   │   ├── tabs.css
│   │   ├── editor.css
│   │   └── settings.css
│   └── themes/
│       └── green-theme.css   # Green color scheme variables
├── js/                        # JavaScript modules
│   ├── app.js                # Main application entry point
│   ├── config/
│   │   └── constants.js      # App constants and configuration
│   ├── services/             # Business logic and external integrations
│   │   ├── api.js           # OpenRouter API integration
│   │   └── storage.js       # IndexedDB operations
│   ├── components/           # UI component logic
│   │   ├── tabs.js
│   │   ├── editor.js
│   │   └── settings.js
│   ├── utils/                # Utility functions
│   │   ├── dom.js           # DOM manipulation helpers
│   │   └── helpers.js       # General helper functions
│   └── prompts/              # System prompts for AI
│       ├── prompt-improvement.js
│       ├── grammar-check.js
│       └── translation.js
├── assets/                    # Static assets
│   └── icons/               # SVG icons (if needed)
├── firebase.json            # Firebase hosting configuration
├── firestore.rules          # Firestore rules (if needed)
└── PROJECT-STRUCTURE.md     # This file
```

## Layer Organization

### Presentation Layer (css/)
- **main.css**: Global styles, resets, and base typography
- **components/**: Modular CSS for each UI component
- **themes/**: Color schemes and theme variables

### Business Logic Layer (js/services/)
- **api.js**: Handles all OpenRouter API communications
- **storage.js**: Manages IndexedDB operations (CRUD for API key, model preference)

### Component Layer (js/components/)
- **tabs.js**: Tab switching and management
- **editor.js**: Text editor functionality (fullscreen, word count, clear)
- **settings.js**: Settings modal and API configuration

### Infrastructure Layer (js/config/)
- **constants.js**: Application-wide constants (API endpoints, default values)

### Shared/Common Layer (js/utils/)
- **dom.js**: Reusable DOM manipulation functions
- **helpers.js**: General utility functions (validation, formatting)

## Data Flow

```
User Input → Component → Service → API/Storage
                                    ↓
                              Response/Data
                                    ↓
                              Component → UI Update
```

## Key Design Principles

1. **Separation of Concerns**: Each file has a single, well-defined responsibility
2. **Modularity**: Components and services are independent and reusable
3. **No Circular Dependencies**: Dependencies flow inward (UI → Services → Utils)
4. **Performance**: Minimal DOM operations, efficient IndexedDB queries
5. **Maintainability**: Clear naming conventions and organized structure

## File Naming Conventions

- **CSS files**: kebab-case (e.g., `main.css`, `editor.css`)
- **JS files**: camelCase (e.g., `api.js`, `storage.js`)
- **Folders**: lowercase with hyphens (e.g., `components/`, `services/`)

## Next Steps

1. Create the folder structure
2. Implement IndexedDB service first (data layer)
3. Implement API service (integration layer)
4. Build UI components (presentation layer)
5. Wire everything together in app.js