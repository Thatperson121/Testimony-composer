import OpenAI from 'openai';
import { AIResponse } from '../types';

export async function getAISuggestions(
  content: string,
  apiKey: string
): Promise<AIResponse> {
  try {
    const effectiveApiKey = import.meta.env.VITE_API_KEY || apiKey;
    
    if (!effectiveApiKey || effectiveApiKey.trim() === '') {
      return {
        suggestions: [],
        error: 'No API key provided. Please add your OpenAI API key in the settings or .env.local file.'
      };
    }

    if (!effectiveApiKey.startsWith('sk-')) {
      return {
        suggestions: [],
        error: 'Invalid API key format. OpenAI API keys should start with "sk-".'
      };
    }

    const openai = new OpenAI({
      apiKey: effectiveApiKey,
      dangerouslyAllowBrowser: true
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides guidance for writing personal religious testimonies. Provide thoughtful, respectful suggestions that help individuals express their faith journey and beliefs."
        },
        {
          role: "user",
          content: `Based on this testimony draft, provide 3 specific suggestions for improvement or additional points to consider: "${content}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const suggestions = completion.choices[0].message.content
      ?.split('\n')
      .filter(s => s.trim().length > 0) || [];

    return { suggestions };
  } catch (error: any) {
    console.error('AI suggestion error:', error);
    
    // Handle specific OpenAI API errors
    if (error.error?.type === 'invalid_request_error') {
      return {
        suggestions: [],
        error: 'Invalid API key. Please check your OpenAI API key and try again.'
      };
    }

    if (error.error?.type === 'insufficient_quota') {
      return {
        suggestions: [],
        error: 'Your OpenAI API key has insufficient quota. Please check your usage limits.'
      };
    }

    return {
      suggestions: [],
      error: 'Failed to get AI suggestions. Please check your API key and try again.'
    };
  }
}