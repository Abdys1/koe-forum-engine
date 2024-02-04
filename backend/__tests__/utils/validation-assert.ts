/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO valahogy tipizálni
export default function assertValidations(errors: any[], expectedErrors: any[]) {
    expect(errors.length).toBe(expectedErrors.length);
    for(let i = 0; i < errors.length; i++) {
        const error = errors[i];
        const expected = expectedErrors[i];
        expect(error.location).toBe(expected.location);
        expect(error.path).toBe(expected.path);
        expect(error.type).toBe(expected.type);
    }
}