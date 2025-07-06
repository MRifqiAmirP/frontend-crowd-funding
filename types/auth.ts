export interface Response<T> {
    success: boolean;
    message: string;
    data: T
    errors?: string[]
}

export type AuthResponse = Response<{
    idToken: string;
}>

export interface RegisterUserData {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: "student" | "mentor" | "donor" | "admin"; // Tambahkan 'admin' jika backend bisa mengembalikan ini
    instance?: string; // Untuk student (Sekolah/Kampus)
    education_level?: string; // Untuk student (Jenjang Pendidikan)
    expertise?: string; // Untuk mentor (Bidang Keahlian)
    email_validated: boolean;
    created_at: string;
    updated_at: string;
    // password tidak perlu ada di sini karena tidak akan di-return ke frontend
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: RegisterUserData;
}

// Tambahkan juga tipe untuk error jika backend mengembalikan struktur error tertentu
export interface ErrorResponse {
    success: boolean;
    message: string;
    errors?: string[]; // Opsional: jika ada detail error validasi
}
