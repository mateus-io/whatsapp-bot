interface ApiResponse<T> {
  status: number
  error?: Error
  data?: T
}

interface ApiHeaders {
  [key: string]: string
}

interface ApiData {
  [key: string]: any
}

interface ApiParams {
  endpoint: string
  data?: ApiData
  headers?: ApiHeaders
}

interface CreateApiInstanceParams {
  baseURL: string
  headers?: ApiHeaders
}

const defaultHeaders = {
  'Content-Type': 'application/json',
}

interface ApiBase<T> {
  instance: T
}

interface ApiQueryAble {
  get<T>(params: ApiParams): Promise<ApiResponse<T>>
}

interface ApiInsertAble {
  post<T>(params: ApiParams): Promise<ApiResponse<T>>
}

interface ApiUpgradeAble {
  put<T>(params: ApiParams): Promise<ApiResponse<T>>
  patch<T>(params: ApiParams): Promise<ApiResponse<T>>
}

interface ApiRemovAble {
  delete<T>(params: ApiParams): Promise<ApiResponse<T>>
}

export {
  ApiBase,
  ApiData,
  ApiHeaders,
  ApiInsertAble,
  ApiParams,
  ApiQueryAble,
  ApiRemovAble,
  ApiResponse,
  ApiUpgradeAble,
  defaultHeaders,
  CreateApiInstanceParams,
}
