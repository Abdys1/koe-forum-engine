import { Response } from "supertest";

interface ValidationError {
    type: string;
    msg: string;
    path: string;
    location: string;
    value?: unknown;
}

export function assertFieldError(response: Response, fieldName: string, expectedMessages: string[]) {
    assertValidationError(response);

    const fieldErrors = response.body.errors.filter((error: ValidationError) => error.path === fieldName);
    expect(fieldErrors.length).toBeGreaterThan(0);

    const actualMessages = fieldErrors.map((error: ValidationError) => error.msg);

    expect(actualMessages.length, `Path: ${fieldName}\nactualMessages: ${actualMessages}\nexpectedMessages: ${expectedMessages}`)
        .toBe(expectedMessages.length);
    expectedMessages.forEach(expectedMsg => {
        expect(actualMessages).toContain(expectedMsg);
    });
}

function assertValidationError(response: Response, expectedStatus = 400) {
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);
}