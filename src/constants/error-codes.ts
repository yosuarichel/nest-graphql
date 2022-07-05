import { ErrorResponsePrefix } from './enums';

export const VALIDATION_ERROR = {
    code: ErrorResponsePrefix.ValidationError,
    message: 'Validation error',
};
export const UNAUTHORIZED_ERROR = {
    code: ErrorResponsePrefix.UnauthorizedError,
    message: 'Unauthorized',
};
export const SYSTEM_ERROR = {
    code: ErrorResponsePrefix.InternalServerError,
    message: 'System error',
};
export const SERVICE_NOT_AVAILABLE_ERROR = {
    code: ErrorResponsePrefix.UnavailableServiceError,
    message: 'Service unavailable',
};
export const FORBIDDEN_ERROR = {
    code: ErrorResponsePrefix.ForbiddenError,
    message: 'Forbidden',
};
export const BAD_REQUEST_ERROR = {
    code: ErrorResponsePrefix.BadRequestError,
    message: 'Bad request',
};
export const NOT_FOUND_ERROR = {
    code: ErrorResponsePrefix.BadRequestError,
    message: 'Not found',
};
