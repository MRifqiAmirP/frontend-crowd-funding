import { Response } from "@/types/api";
import apiClient from "./apiClient";

export interface Project {
    id: string; // ID proyek, bisa string atau number tergantung API
    userId: string; // ID proyek, bisa string atau number tergantung API
    projectName: string;
    provider: string; // Nama sekolah/kampus
    educationLevel: string;
    institutionName: string;
    shortDescription: string;
    fullDescription: string;
    aboutProject: string;
    categoryNames: string[]; // Array of strings
    target: number; // Target dana
    funded: number; // Dana terkumpul (asumsi API memberikan ini)
    backers: number; // Jumlah pendukung (asumsi API memberikan ini)
    deadline: string; // Tanggal deadline (YYYY-MM-DD)
    thumbnailUrl: string; // URL thumbnail
    galleries: string[]; // Array of gallery image URLs
    videoUrl?: string; // URL video (opsional)
    status: 'active' | 'draft' | 'completed' | 'rejected'; // Status proyek
    // Tambahkan properti lain sesuai respons API Anda
}

export const createProject = async (formData: FormData) => {
    try {
        const response = await apiClient.post('/api/projects/create', formData);
        return response.data;
    } catch (error: any) {
        console.error('An error occurred during project creation:', error.response?.data?.message || error.message);
        throw error.response?.data || new Error('Failed to create project');
    }
};

export const getProjects = async (): Promise<Response<Project[]>> => {
    try {
        const response = await apiClient.get('/api/projects');
        // Asumsi API mengembalikan array proyek langsung di data
        return response.data;
    } catch (error: any) {
        console.error('An error occurred while fetching projects:', error.response?.data?.message || error.message);
        throw error.response?.data || new Error('Failed to fetch projects');
    }
};