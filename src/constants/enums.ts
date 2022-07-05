import { registerEnumType } from '@nestjs/graphql';

export enum ErrorResponsePrefix {
    UnauthorizedError = 'UnauthorizedError',
    NotFoundError = 'NotFoundError',
    SystemError = 'SystemError',
    ValidationError = 'ValidationError',
    InternalServerError = 'InternalServerError',
    UnavailableServiceError = 'UnavailableServiceError',
    ForbiddenError = 'ForbiddenError',
    BadRequestError = 'BadRequestError',
    ApiNotFoundError = 'ApiNotFoundError',
}

export enum OrderType {
    asc = 'asc',
    desc = 'desc',
    ASC = 'ASC',
    DESC = 'DESC',
}
registerEnumType(OrderType, {
    name: 'OrderType',
});

export enum Pagination {
    yes = 'true',
    no = 'false',
}
registerEnumType(Pagination, {
    name: 'Pagination',
});

export enum PetOrderBy {
    id = 'id',
    name = 'name',
    created_at = 'created_at',
    updated_at = 'updated_at',
    deleted_at = 'deleted_at',
}
registerEnumType(PetOrderBy, {
    name: 'PetOrderBy',
});
