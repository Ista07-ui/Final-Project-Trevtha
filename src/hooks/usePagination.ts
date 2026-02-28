"use client";

import { useState, useMemo, useCallback } from "react";

export type PaginationState = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginationConfig = {
  itemsPerPage?: number;
  initialPage?: number;
};

/**
 * Hook untuk mengelola pagination data
 * Otomatis menghitung halaman, index, dan navigasi
 *
 * @example
 * const { currentItems, pagination, goToPage, nextPage, prevPage } = usePagination(
 *   items,
 *   { itemsPerPage: 10 }
 * );
 */
export function usePagination<T>(items: T[], config?: PaginationConfig) {
  const itemsPerPage = config?.itemsPerPage ?? 10;
  const initialPage = config?.initialPage ?? 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  // Hitung pagination state
  const pagination = useMemo<PaginationState>(() => {
    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const validPage = Math.max(1, Math.min(currentPage, totalPages));

    const startIndex = (validPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      currentPage: validPage,
      totalPages,
      totalItems,
      itemsPerPage,
      startIndex,
      endIndex,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1,
    };
  }, [currentPage, items.length, itemsPerPage]);

  // Ambil items untuk halaman saat ini
  const currentItems = useMemo<T[]>(() => {
    return items.slice(pagination.startIndex, pagination.endIndex);
  }, [items, pagination.startIndex, pagination.endIndex]);

  // Navigation methods
  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, page);
    setCurrentPage(validPage);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setCurrentPage(pagination.totalPages);
  }, [pagination.totalPages]);

  /**
   * Buat array nomor halaman untuk render button
   * Misal: [1,2,3,4,5] atau [1...3,4,5,6...10]
   */
  const pageNumbers = useMemo<Array<number | string>>(() => {
    const pages: Array<number | string> = [];
    const totalPages = pagination.totalPages;
    const current = pagination.currentPage;
    const delta = 2; // Jumlah halaman yang ditampilkan sekeliling halaman saat ini

    // Selalu tampilkan halaman 1
    pages.push(1);

    // Jika ada gap, tambahkan "..."
    if (current - delta > 2) {
      pages.push("...");
    }

    // Tampilkan halaman di sekitar halaman saat ini
    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(totalPages - 1, current + delta);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Jika ada gap ke halaman terakhir, tambahkan "..."
    if (current + delta < totalPages - 1) {
      pages.push("...");
    }

    // Selalu tampilkan halaman terakhir (jika ada)
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }, [pagination.currentPage, pagination.totalPages]);

  return {
    // Current state
    currentItems,
    pagination,

    // Navigation
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.totalItems,

    // Methods
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,

    // Helpers
    pageNumbers,
    isFirstPage: pagination.currentPage === 1,
    isLastPage: pagination.currentPage === pagination.totalPages,
  };
}
