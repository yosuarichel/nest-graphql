export interface IPet {
    id?: bigint;
    name: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
export interface IOptionalPet {
    id?: bigint;
    name?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
