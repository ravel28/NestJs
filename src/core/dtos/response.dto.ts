export class ResponseDto {
  data: any;
  meta: object;
  time: Date;

  static toResponse<T>(_data: T, _meta: object): ResponseDto;
  static toResponse(_data: any, _meta: any): ResponseDto {
    const result = new ResponseDto();
    result.data = _data;
    result.meta = _meta;
    result.time = new Date();
    return result;
  }
}

export class meta {
  status: string;
  currentPage: number;
  totalPage: number;
  totalItems: number;
  keyword: number;
  totalItemsPerPage: number;
}
