import { renderRangeNumbers } from '@/utils/helper'
import { useMemo } from 'react'
import { BiDotsHorizontal } from 'react-icons/bi'

const DOTS = <BiDotsHorizontal size={18} />

const usePagination = ({
  totalCount = 0,
  currentPage = 1,
  sibling = 1,
  totalPages = 0,
}) => {
  const paginationArray = useMemo(() => {
    const totalVisibleNumbers = 2 * sibling + 5 // first + last + current + siblings + 2 DOTS

    if (totalPages <= totalVisibleNumbers) {
      return renderRangeNumbers(1, totalPages)
    }

    const isShowLeftDots = currentPage > sibling + 3
    const isShowRightDots = currentPage < totalPages - sibling - 2

    const siblingLeft = Math.max(currentPage - sibling, 1)
    const siblingRight = Math.min(currentPage + sibling, totalPages)

    if (!isShowLeftDots && isShowRightDots) {
      const leftItemCount = 3 + 2 * sibling
      const leftRange = renderRangeNumbers(1, leftItemCount)
      return [...leftRange, DOTS, totalPages]
    }

    if (isShowLeftDots && !isShowRightDots) {
      const rightItemCount = 3 + 2 * sibling
      const rightRange = renderRangeNumbers(totalPages - rightItemCount + 1, totalPages)
      return [1, DOTS, ...rightRange]
    }

    if (isShowLeftDots && isShowRightDots) {
      const middleRange = renderRangeNumbers(siblingLeft, siblingRight)
      return [1, DOTS, ...middleRange, DOTS, totalPages]
    }
  }, [totalCount, currentPage, sibling, totalPages])

  return paginationArray
}

export default usePagination
