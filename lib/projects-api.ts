// lib/projects-api.ts
import apiClient from "@/lib/apiClient"; // Assuming apiClient.ts is in the same lib directory or accessible via @/lib

// Define the structure of a project item as expected by the frontend components
export interface Project {
    id: string;
    title: string; // Mapped from projectName
    description: string; // Mapped from shortDescription
    image: string; // Mapped from thumbnailUrl
    category: string; // Mapped from categories[0].category.category_name
    school: string; // Mapped from institutionName
    currentFunding: number; // NOTE: This is NOT provided by your API response. Initializing to 0.
    targetFunding: number; // Mapped from target
    daysLeft: number; // Calculated from deadline
    backers: number; // NOTE: This is NOT provided by your API response. Initializing to 0.
}

// Define the structure of the raw project data from your API
interface RawProjectData {
    id: string;
    userId: string;
    projectName: string;
    provider: string;
    educationLevel: string;
    institutionName: string;
    shortDescription: string;
    fullDescription: string;
    aboutProject: string;
    target: number;
    deadline: string; // ISO string
    thumbnailUrl: string;
    createdAt: string;
    categories: Array<{
        projectId: string;
        categoryId: string;
        category: {
            id: string;
            category_name: string;
        };
    }>;
    galleries: Array<{
        id: string;
        title: string;
        caption: string;
        imageUrl: string;
    }>;
    supportPackages: Array<{
        id: string;
        packageName: string;
        nominal: number;
        benefit: string;
    }>;
    // Add other raw fields if they exist in your API response
}

interface ProjectsApiResponse {
    success: boolean;
    message?: string;
    data: RawProjectData[]; // The API returns an array of raw project data
}

/**
 * Calculates the number of days left until a given deadline.
 * @param deadlineDateString The deadline date string (e.g., "2025-12-31T00:00:00.000Z").
 * @returns The number of days left, or 0 if the deadline is in the past.
 */
const calculateDaysLeft = (deadlineDateString: string): number => {
    const deadline = new Date(deadlineDateString);
    const now = new Date();
    // Set time to 00:00:00 for accurate day calculation
    deadline.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays); // Ensure daysLeft is not negative
};

/**
 * Fetches a list of projects from the backend API and transforms them for the frontend.
 * @returns A promise that resolves with an array of Project objects.
 * @throws An error if the API call fails.
 */
export const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await apiClient.get<ProjectsApiResponse>('/api/projects/');

        if (response.data.success) {
            // Transform the raw API data into the Project interface expected by the frontend
            const transformedProjects: Project[] = response.data.data.map(rawProject => ({
                id: rawProject.id,
                title: rawProject.projectName,
                description: rawProject.shortDescription,
                image: "https://picsum.photos/800/600", // Use placeholder if no thumbnail
                // image: rawProject.thumbnailUrl || "https://picsum.photos/800/600", // Use placeholder if no thumbnail
                // Take the first category name, or an empty string if no categories
                category: rawProject.categories.length > 0 ? rawProject.categories[0].category.category_name : "Uncategorized",
                school: rawProject.institutionName,
                currentFunding: 0, // Your API response does not provide this. Set to 0.
                targetFunding: rawProject.target,
                daysLeft: calculateDaysLeft(rawProject.deadline),
                backers: 0, // Your API response does not provide this. Set to 0.
            }));
            return transformedProjects;
        } else {
            throw new Error(response.data.message || 'Failed to fetch projects.');
        }
    } catch (error: any) {
        console.error('Error fetching projects:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch projects.');
    }
};


