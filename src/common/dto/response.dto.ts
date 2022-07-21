export class GqlResponseDto {
    code: string;
    message: string;

    constructor(partial?: Partial<GqlResponseDto>) {
        Object.assign(this, partial);
    }
}
