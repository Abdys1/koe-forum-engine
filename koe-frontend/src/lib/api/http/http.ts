import { cookies } from "next/headers";

export type HttpResponse<ResponseBodyType> = {
    status: number,
    data: ResponseBodyType,
    headers: Headers
}

export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async post(path: string, body?: any, headers?: HeadersInit): Promise<HttpResponse<any>> {
        return this.sendRequest('POST', path, body, headers);
    }

    public async get(path: string, headers?: HeadersInit): Promise<HttpResponse<any>> {
        return this.sendRequest('GET', path, undefined, headers);
    }

    public async put(path: string, body?: any, headers?: HeadersInit): Promise<HttpResponse<any>> {
        return this.sendRequest('PUT', path, body, headers);
    }

    public async delete(path: string, headers?: HeadersInit): Promise<HttpResponse<any>> {
        return this.sendRequest('DELETE', path, undefined, headers);
    }

    private async sendRequest(method: string, path: string, body?: any, headers?: HeadersInit): Promise<HttpResponse<any>> {
        const resp: Response = await fetch(`${this.baseUrl}${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        });
        if (resp.ok) {
            const data = await resp.json();
            return {
                status: resp.status,
                data: data,
                headers: resp.headers
            };
        } else {
            throw new HttpResponseError(resp); 
        }
    }
}

export class HttpResponseError extends Error {
    public resp: Response;

    constructor(resp: Response) {
        super(`Api response with ${resp.status} status from ${resp.url} endpoint.`);
        this.resp = resp;
    }
}