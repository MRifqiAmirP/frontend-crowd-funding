export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        idToken: string;
    }
}