export class ApiResponseError extends Error {
    public resp: Response;
    public body: unknown;

    constructor(resp: Response, body?: unknown) {
        super(`Api response with ${resp.status} status from ${resp.url} endpoint.`);
        this.resp = resp;
        this.body = body;
    }
}
