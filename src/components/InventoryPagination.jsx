import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import useWindowWidth from "./hooks/useWindowWidth";

const generatePaginationItems = (
  currentPageIndex,
  totalPages,
  onPageChange,
  isSmallScreen
) => {
  const items = [];

  // Primera página
  items.push(
    <Pagination.Item
      key={0}
      onClick={() => onPageChange(0)}
      active={currentPageIndex === 0}
    >
      1
    </Pagination.Item>
  );

  const showEllipsisStart = isSmallScreen
    ? currentPageIndex > 1
    : currentPageIndex > 2;
  const showEllipsisEnd = isSmallScreen
    ? currentPageIndex < totalPages - 2
    : currentPageIndex < totalPages - 3;

  // Elipsis inicial
  if (showEllipsisStart) {
    items.push(<Pagination.Ellipsis key="ellipsis-start" />);
  }

  // Páginas vecinas o actual
  const startPage = isSmallScreen
    ? currentPageIndex
    : Math.max(1, currentPageIndex - 1);
  const endPage = isSmallScreen
    ? currentPageIndex
    : Math.min(totalPages - 2, currentPageIndex + 1);

  for (let i = startPage; i <= endPage; i++) {
    if (i > 0 && i < totalPages - 1) {
      items.push(
        <Pagination.Item
          key={i}
          onClick={() => onPageChange(i)}
          active={i === currentPageIndex}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
  }

  // Elipsis final
  if (showEllipsisEnd) {
    items.push(<Pagination.Ellipsis key="ellipsis-end" />);
  }

  // Última página
  if (totalPages > 1) {
    items.push(
      <Pagination.Item
        key={totalPages - 1}
        onClick={() => onPageChange(totalPages - 1)}
        active={currentPageIndex === totalPages - 1}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return items;
};

function InventoryPagination({
  currentPageIndex,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageChange,
}) {
  const windowWidth = useWindowWidth();
  const isSmallScreen = windowWidth < 480;

  if (totalPages <= 1) return null;

  return (
    <Pagination className="table-pagination d-flex flex-row justify-content-center mt-3 w-100">
      <Pagination.Prev
        onClick={onPreviousPage}
        disabled={currentPageIndex === 0}
        aria-label={isSmallScreen ? "Página anterior" : "Anterior"}
      >
        {isSmallScreen ? "Ant." : "Anterior"}
      </Pagination.Prev>

      {generatePaginationItems(
        currentPageIndex,
        totalPages,
        onPageChange,
        isSmallScreen
      )}

      <Pagination.Next
        onClick={onNextPage}
        disabled={currentPageIndex === totalPages - 1}
        aria-label={isSmallScreen ? "Página siguiente" : "Siguiente"}
      >
        {isSmallScreen ? "Sig." : "Siguiente"}
      </Pagination.Next>
    </Pagination>
  );
}

InventoryPagination.propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPreviousPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default InventoryPagination;
