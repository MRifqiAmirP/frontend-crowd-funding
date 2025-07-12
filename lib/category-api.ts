// lib/category-api.ts
import apiClient from "@/lib/apiClient"; // Assuming apiClient.ts is in the same lib directory or accessible via @/lib

// Define the structure of a category item as expected from your API
export interface Category {
    id: string;
    category_name: string;
    // Add any other properties your category API returns, e.g., description, icon
}

interface CategoriesApiResponse {
    success: boolean;
    message?: string;
    data: Category[]; // Assuming the API returns an array of categories under a 'data' key
}

/**
 * Fetches a list of categories from the backend API.
 * @returns A promise that resolves with an array of Category objects.
 * @throws An error if the API call fails.
 */
export const getCategories = async (): Promise<Category[]> => {
    try {
        // Make a GET request to your category API endpoint
        const response = await apiClient.get<CategoriesApiResponse>('/api/category/');

        if (response.data.success) {
            return response.data.data; // Return the array of categories
        } else {
            throw new Error(response.data.message || 'Failed to fetch categories.');
        }
    } catch (error: any) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        // Re-throw the error to be caught by the calling component
        throw new Error(error.response?.data?.message || 'Failed to fetch categories.');
    }
};
