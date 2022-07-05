export interface Response {
    status?: number;
    code: number | string;
    message: string;
    result?: any;
}

export interface IFindAndCountAll<Type> {
    count: number;
    rows: Type;
}
