// lib/funding-api.ts
import apiClient from "@/lib/apiClient";

interface FundingPayload {
    supportPackageId: string | null;
    projectId: string;
    amount: number;
    isAnonymous: boolean;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

interface FundingResponse {
    success: boolean;
    message: string;
    data?: {
        snapToken: string;
        redirectUrl: string;
    };
}

/**
 * Sends a funding request to the backend API.
 * @param payload The data required for the funding request.
 * @returns A promise that resolves with the funding response.
 * @throws An error if the API call fails.
 */
export const sendFundingRequest = async (payload: FundingPayload): Promise<FundingResponse> => {
    try {
        const response = await apiClient.post<FundingResponse>('/api/funding', payload);
        return response.data;
    } catch (error: any) {
        console.error('Error sending funding request:', error.response?.data || error.message);
        // Re-throw the error to be caught by the calling component
        throw new Error(error.response?.data?.message || 'Failed to send funding request.');
    }
};
