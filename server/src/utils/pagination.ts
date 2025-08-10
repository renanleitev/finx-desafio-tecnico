import { IPaginationParams, PaginationInfo } from '@/types/api'

export class PaginationUtils {
  static applyPagination<T>(data: T[], params: IPaginationParams): T[] {
    const { page, limit } = params
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    return data.slice(startIndex, endIndex)
  }

  static createPaginationInfo(
    totalItems: number,
    currentPage: number,
    itemsPerPage: number,
    baseUrl: string,
    queryParams: URLSearchParams,
  ): PaginationInfo {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const hasNextPage = currentPage < totalPages
    const hasPrevPage = currentPage > 1

    // Construir URLs de navegação
    const nextPageUrl = hasNextPage
      ? `${baseUrl}?page=${currentPage + 1}&${queryParams.toString()}`
      : null

    const prevPageUrl = hasPrevPage
      ? `${baseUrl}?page=${currentPage - 1}&${queryParams.toString()}`
      : null

    return {
      currentPage,
      itemsPerPage,
      totalPages,
      totalItems,
      hasNextPage,
      hasPrevPage,
      nextPageUrl,
      prevPageUrl,
    }
  }

  static validatePaginationParams(page: string, limit: string): { page: number; limit: number } {
    const validatedPage = Math.max(1, parseInt(page) || 1)
    const validatedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10))

    return {
      page: validatedPage,
      limit: validatedLimit,
    }
  }
}
