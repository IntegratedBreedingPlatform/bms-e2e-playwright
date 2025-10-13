// HttpClient.ts
import {request, APIRequestContext, APIResponse, Page} from '@playwright/test';

export interface HttpResponse<T = any> {
  status: number;
  ok: boolean;
  body: T;
}

export class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private apiContext: APIRequestContext | null = null;

  constructor(baseURL: any, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async init(page: Page): Promise<void> {
    // Step 1: Retrieve the token from localStorage
    const xAuthToken = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('bms.xAuthToken')).token || null;
    });

    console.log('xAuthToken:', xAuthToken);

    // Step 2: Add the Authorization header if token exists
    if (xAuthToken) {
      this.defaultHeaders['Authorization'] = `Bearer ${xAuthToken}`;
    }

    // Step 3: Create the API request context with updated headers
    this.apiContext = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: this.defaultHeaders,
    });
  }

  async get<T = any>(path: string, headers: Record<string, string> = {}): Promise<HttpResponse<T>> {
    return this._request<T>('GET', path, null, headers);
  }

  async post<T = any>(path: string, data: any = {}, headers: Record<string, string> = {}): Promise<HttpResponse<T>> {
    return this._request<T>('POST', path, data, headers);
  }

  async put<T = any>(path: string, data: any = {}, headers: Record<string, string> = {}): Promise<HttpResponse<T>> {
    return this._request<T>('PUT', path, data, headers);
  }

  async delete<T = any>(path: string, headers: Record<string, string> = {}): Promise<HttpResponse<T>> {
    return this._request<T>('DELETE', path, null, headers);
  }

  private async _request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: any,
    headers: Record<string, string> = {}
  ): Promise<HttpResponse<T>> {
    if (!this.apiContext) {
      throw new Error('HttpClient not initialized. Call init() first.');
    }

    const options: any = {
      method,
      headers,
    };

    if (data) {
      options.data = data;
    }

    const response: APIResponse = await this.apiContext.fetch(path, options);
    const body = await response.json();

    return {
      status: response.status(),
      ok: response.ok(),
      body,
    };
  }

  async dispose(): Promise<void> {
    if (this.apiContext) {
      await this.apiContext.dispose();
      this.apiContext = null;
    }
  }
}
