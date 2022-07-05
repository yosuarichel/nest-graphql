import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ForbiddenException,
    HttpException,
    NotFoundException,
    ServiceUnavailableException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
// import {
//     BAD_REQUEST_ERROR,
//     FORBIDDEN_ERROR,
//     SERVICE_NOT_AVAILABLE_ERROR,
//     SYSTEM_ERROR,
//     UNAUTHORIZED_ERROR,
//     VALIDATION_ERROR,
//     NOT_FOUND_ERROR,
// } from '../constants/error-codes';
// import { Response } from '../interfaces/index.interface';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost): Promise<any> {
        // const gqlHost = GqlArgumentsHost.create(host);
        // const context = gqlHost.switchToHttp();
        // const response = context.getResponse();

        if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.info('Exception response from error filter =>', exception);
        }

        if (exception instanceof BadRequestException) {
            // const res = exception.getResponse() as Response;
            // return response.status(exception.getStatus()).json({
            //     status: exception.getStatus(),
            //     code: res.code || BAD_REQUEST_ERROR.code,
            //     message: res.message || BAD_REQUEST_ERROR.message,
            //     result: res.result,
            // });
            return exception;
        }
        if (exception instanceof UnauthorizedException) {
            // const res = exception.getResponse() as Response;
            // return response.status(exception.getStatus()).json({
            //     status: exception.getStatus(),
            //     code: res.code || UNAUTHORIZED_ERROR.code,
            //     message: res.message || UNAUTHORIZED_ERROR.message,
            //     result: res.result,
            // });
            return exception;
        }
        if (exception instanceof ForbiddenException) {
            // const res = exception.getResponse() as Response;
            // return response.status(exception.getStatus()).json({
            //     status: exception.getStatus(),
            //     code: res.code || FORBIDDEN_ERROR.code,
            //     message: res.message || FORBIDDEN_ERROR.message,
            //     result: res.result,
            // });
            return exception;
        }
        if (exception instanceof NotFoundException) {
            // const res = exception.getResponse() as Response;
            // return response.status(exception.getStatus()).json({
            //     status: exception.getStatus(),
            //     code: res.code || NOT_FOUND_ERROR.code,
            //     message: res.message || NOT_FOUND_ERROR.message,
            //     result: res.result,
            // });
            return exception;
        }
        if (exception instanceof UnprocessableEntityException) {
            // const res = exception.getResponse() as Response;
            // return response.status(exception.getStatus()).json({
            //     status: exception.getStatus(),
            //     code: res.code || VALIDATION_ERROR.code,
            //     message: res.message || VALIDATION_ERROR.message,
            //     result: res.result,
            // });
            return exception;
        }
        if (exception instanceof ServiceUnavailableException) {
            // const res = exception.getResponse() as Response;
            // return response.status(exception.getStatus()).json({
            //     status: exception.getStatus(),
            //     code: res.code || SERVICE_NOT_AVAILABLE_ERROR.code,
            //     message: res.message || SERVICE_NOT_AVAILABLE_ERROR.message,
            //     result: res.result,
            // });
            return exception;
        }

        return exception;
    }
}
