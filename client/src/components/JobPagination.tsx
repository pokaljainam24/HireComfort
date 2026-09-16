import React from "react";

interface JobPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const JobPagination: React.FC<JobPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="paginations">
      <ul className="pager">
        <li>
          <button
            className="pager-prev btn btn-link"
            disabled={page === 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
          ></button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
          <li key={pNum}>
            <a
              className={`pager-number ${page === pNum ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pNum);
              }}
            >
              {pNum}
            </a>
          </li>
        ))}
        <li>
          <button
            className="pager-next btn btn-link"
            disabled={page === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          ></button>
        </li>
      </ul>
    </div>
  );
};

export default JobPagination;

