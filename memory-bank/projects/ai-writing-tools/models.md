# Available Models on OpenRouter

## Free Models (No Cost)

### Recommended Free Models for Writing Tasks

1. **Google: Gemma 4 31B (free)**
   - Model ID: `google/gemma-4-31b-it:free`
   - Context: 262,144 tokens
   - Multimodal: Text + Image + Video
   - Good for: General writing tasks, grammar checking

2. **Qwen: Qwen3 Next 80B A3B Instruct (free)**
   - Model ID: `qwen/qwen3-next-80b-a3b-instruct:free`
   - Context: 262,144 tokens
   - Good for: Complex reasoning, prompt improvement

3. **NVIDIA: Nemotron 3 Ultra (free)**
   - Model ID: `nvidia/nemotron-3-ultra-550b-a55b:free`
   - Context: 1,000,000 tokens
   - Good for: Long-context writing tasks

4. **Meta: Llama 3.3 70B Instruct (free)**
   - Model ID: `meta-llama/llama-3.3-70b-instruct:free`
   - Context: 131,072 tokens
   - Good for: General writing, translation tasks

5. **Qwen: Qwen3 Coder 480B A35B (free)**
   - Model ID: `qwen/qwen3-coder:free`
   - Context: 1,048,576 tokens
   - Good for: Technical writing, code-related prompts

6. **NVIDIA: Nemotron 3 Nano Omni (free)**
   - Model ID: `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`
   - Context: 256,000 tokens
   - Multimodal: Text + Image + Audio + Video
   - Good for: Multimodal writing tasks

7. **Poolside: Laguna M.1 (free)**
   - Model ID: `poolside/laguna-m.1:free`
   - Context: 262,144 tokens
   - Good for: Coding-related writing tasks

8. **Google: Gemma 4 26B A4B (free)**
   - Model ID: `google/gemma-4-26b-a4b-it:free`
   - Context: 262,144 tokens
   - Multimodal: Text + Image + Video
   - Good for: Efficient writing tasks

## Paid Models (High Performance)

### Premium Models for Best Results

1. **DeepSeek: DeepSeek V3.2**
   - Model ID: `deepseek/deepseek-v3.2`
   - Context: 131,072 tokens
   - Cost: Low ($0.0000002288 per prompt token)
   - Good for: All writing tasks, currently the default

2. **Google: Gemini 2.5 Flash**
   - Model ID: `google/gemini-2.5-flash`
   - Context: 1,048,576 tokens
   - Cost: Low ($0.0000003 per prompt token)
   - Good for: Fast, efficient writing tasks

3. **Qwen: Qwen3.6 Flash**
   - Model ID: `qwen/qwen3.6-flash`
   - Context: 1,000,000 tokens
   - Cost: Very Low ($0.0000001875 per prompt token)
   - Good for: Fast multilingual writing

4. **Anthropic: Claude Sonnet 4.5**
   - Model ID: `anthropic/claude-sonnet-4.5`
   - Context: 1,000,000 tokens
   - Cost: Medium ($0.000003 per prompt token)
   - Good for: High-quality writing, grammar checking

5. **OpenAI: GPT-4.1 Mini**
   - Model ID: `openai/gpt-4.1-mini`
   - Context: 1,047,576 tokens
   - Cost: Low ($0.0000004 per prompt token)
   - Good for: Fast, reliable writing tasks

## Model Selection Strategy

### For Best Performance (Paid)
- **Default**: DeepSeek V3.2 (cost-effective, good performance)
- **Premium**: Claude Sonnet 4.5 (best quality, higher cost)
- **Fast**: Gemini 2.5 Flash (fastest, large context)

### For Free Usage
- **Recommended**: Google Gemma 4 31B or Qwen3 Next 80B
- **Long Context**: NVIDIA Nemotron 3 Ultra (1M tokens)
- **Balanced**: Meta Llama 3.3 70B

## Implementation Notes

- Store selected model in IndexedDB
- Default to DeepSeek V3.2 for paid users
- Provide free alternatives for users without API credits
- Allow users to switch between models
- Display model information in settings

## Last Updated
2026-06-28