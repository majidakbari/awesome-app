import * as timekeeper from "timekeeper";
import webhookAccessCheckHandler from "../../../middlewares/webhookAccessCheckHandler";
import {NextFunction, Request, Response} from "express";
import AccessDeniedError from "../../../errors/clinetErrors/accessDeniedError";

const oldEnv = process.env;
const signingSecret = '9e2bb174144943d98df25f7fbd89753d';

beforeAll((): void => {
    process.env.SIGNING_SECRET = signingSecret;
    timekeeper.freeze(new Date(1649315898057));
})

afterAll((): void => {
    process.env = oldEnv;
    timekeeper.reset();
});

describe('webhookAccessCheck middleware should accept or reject requests based on the request body and headers', () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    it('should fail when there is no proper header in request.', () => {
        try {
            webhookAccessCheckHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(true).toBe(false);
        } catch (e) {
            expect(nextFunction).not.toHaveBeenCalled();
            expect(e).toBeInstanceOf(AccessDeniedError);
        }
    });

    it('should fail when custom headers hold invalid values.', () => {
        mockRequest = {
            headers: {
                "x-tribe-signature": "foobarbuzzfooad3553f79a75a186162053da99b3215e75c5359a0a3d91fb285",
                "x-tribe-request-timestamp": "1649300000000"
            }
        };
        try {
            webhookAccessCheckHandler(mockRequest as Request, mockResponse as Response, nextFunction);
            expect(true).toBe(false);
        } catch (e) {
            expect(nextFunction).not.toHaveBeenCalled();
            expect(e).toBeInstanceOf(AccessDeniedError);
        }
    });

    it('should call next function when security headers are right.', () => {
        const body = {
            networkId: 'jpLyIGaMxu',
            context: 'NETWORK',
            currentSettings: [],
            type: 'TEST',
            data: {challenge: '22b4c546752f27207399d5f835a90808b3c6a34c'}
        };
        const xSignature = 'b6544929f924aad3553f79a75a186162053da99b3215e75c5359a0a3d91fb285';
        const xTime = "1649315900181";

        mockRequest = {
            headers: {
                "x-tribe-signature": xSignature,
                "x-tribe-request-timestamp": xTime
            },
            body: body
        };
        webhookAccessCheckHandler(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
    });
})