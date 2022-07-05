export interface IPet {
    id?: bigint;
    role_id: number;
    client_id?: number;
    name: string;
    email: string;
    password: string;
    phone_number?: string;
    is_active?: boolean;
    is_verified?: boolean;
    last_login_at?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
export interface IOptionalPet {
    id?: bigint;
    role_id?: number;
    client_id?: number;
    name?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    is_active?: boolean;
    is_verified?: boolean;
    last_login_at?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
