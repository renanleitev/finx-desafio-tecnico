export interface PaginationInfo {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPageUrl: string | null
  prevPageUrl: string | null
}
