interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

class PaginatedDTO<TData> {
  items: TData[];
  meta: PaginationMeta;
}

export { PaginatedDTO, PaginationMeta };
