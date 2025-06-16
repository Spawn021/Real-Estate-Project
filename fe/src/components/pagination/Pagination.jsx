import usePagination from '@/hooks/usePagination'

import PaginationItem from './PaginationItem'
import Button from '../commons/Button'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

const Pagination = ({
  totalCount,
  currentPage,
  sibling = 1,
  totalPages,
  onPageChange,
}) => {
  const paginations = usePagination({
    totalCount,
    currentPage,
    sibling,
    totalPages,
  })

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="bg-main-50 text-main-500 hover:bg-main-700 hover:text-white"
        disabled={currentPage <= 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <FaArrowLeft size={18} />
      </Button>
      {paginations.map((page, index) => (
        <PaginationItem
          key={index}
          content={page}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          isActive={currentPage === page}
        />
      ))}
      <Button
        className="bg-main-50 text-main-500 hover:bg-main-700 hover:text-white"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <FaArrowRight size={18} />
      </Button>
    </div>
  )
}

export default Pagination
