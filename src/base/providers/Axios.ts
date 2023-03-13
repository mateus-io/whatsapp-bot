import axios, { AxiosInstance } from 'axios'
import {
  ApiBase,
  ApiParams,
  ApiInsertAble,
  ApiResponse,
  CreateApiInstanceParams,
  defaultHeaders,
} from '../Api'

export class Axios implements ApiBase<AxiosInstance>, ApiInsertAble {
  instance
  constructor({ baseURL, headers = defaultHeaders }: CreateApiInstanceParams) {
    this.instance = axios.create({
      baseURL,
      headers,
    })
  }
  async post<T>({ endpoint, data, headers }: ApiParams): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(endpoint, data, {
        headers,
      })
      return { status: 200, data: response.data }
    } catch (error: unknown) {
      return { status: 400, error: error as Error }
    }
  }
}
