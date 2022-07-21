export interface Response {
    status?: number;
    code: number | string;
    message: string;
    result?: any;
}

export interface GqlResponse {
    code: number | string;
    message: string;
}

export interface IFindAndCountAll<Type> {
    count: number;
    rows: Type;
}
