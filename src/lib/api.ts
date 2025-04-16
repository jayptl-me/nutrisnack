// Base API URL from environment variable or default to relative URLs (for same-origin requests)
const API_URL = import.meta.env.VITE_API_URL || '';

// Helper for creating the full API URL
export const getApiUrl = (endpoint: string): string => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // Ensure endpoint starts with slash if not already present
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    return `${apiBaseUrl}${formattedEndpoint}`;
};

// Generic API request function
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = getApiUrl(endpoint);

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            error: `Request failed with status ${response.status}`
        }));
        throw new Error(error.error || 'An unknown error occurred');
    }

    return response.json();
}

// Add any auth-related or other API functions here