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
        const resp: Response = await fetch(`${this.baseUrl}${path}`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
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
    private resp: Response;

    constructor(resp: Response) {
        super();
        this.resp = resp;
    }
}