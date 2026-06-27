# Project: AI Writing Tools Website

## Description
A user-friendly web application providing AI-powered writing assistance tools including prompt improvement, English grammar checking, and English-Arabic translation.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla or lightweight framework)
- **Hosting**: Firebase (hosting only)
- **Database**: IndexedDB (client-side browser storage)
- **AI Provider**: OpenRouter API
- **AI Model**: DeepSeek V3.2 Flash

## Status
- Phase: Planning
- Last updated: 2026-06-27

## Key Features
- Three main tool tabs: Prompt Improvement, English Grammar & Syntax, En-Ar Translation
- Large text input areas with fullscreen editing capability
- Send button for each tool
- System prompts for AI interactions
- User-friendly interface with clean layout
- No backend database required (IndexedDB for client-side storage)
- Settings button in top left for API key and model selection
- Direct link to get OpenRouter API key in settings

## Architecture
- Single-page application
- Client-side only (no backend server)
- Firebase for static hosting
- IndexedDB for local data persistence
- Direct API calls to OpenRouter from client