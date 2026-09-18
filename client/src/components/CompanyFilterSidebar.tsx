import React, { useEffect, useState } from "react";
import { fetchJobCategories, type CategoryData } from "../api/categoryApi";

export interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

interface CompanyFilterSidebarProps {
  isFilterOpen: boolean;
  onCloseFilter: () => void;
  selectedCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  onResetFilters?: () => void;
}

const CompanyFilterSidebar: React.FC<CompanyFilterSidebarProps> = ({
  isFilterOpen,
  onCloseFilter,
  selectedCategory: propsSelectedCategory,
  onCategoryChange,
  onResetFilters,
}) => {
  const [internalCategories, setInternalCategories] = useState<FilterOption[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    propsSelectedCategory || "all",
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (propsSelectedCategory !== undefined) {
      setSelectedCategory(propsSelectedCategory);
    }
  }, [propsSelectedCategory]);

  useEffect(() => {
    const loadCategoriesData = async () => {
      setLoading(true);
      try {
        const catList = await fetchJobCategories();
        const mappedCategories: FilterOption[] = [
          { id: "all", name: "All Categories" },
          ...catList.map((c: CategoryData) => ({
            id: c._id,
            name: c.name,
          })),
        ];
        setInternalCategories(mappedCategories);
      } catch (err) {
        console.error("Error loading categories sidebar data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoriesData();
  }, []);

  const categories = internalCategories;
  const handleCategorySelect = (id: string) => {
    const newCategory = selectedCategory === id ? "all" : id;
    setSelectedCategory(newCategory);
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategory("all");
    if (onResetFilters) {
      onResetFilters();
    } else {
      if (onCategoryChange) onCategoryChange("all");
    }
  };

  return (
    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
      <div
        className={`sidebar-shadow none-shadow mb-30 company-filter-sidebar ${
          isFilterOpen ? "company-filter-sidebar-open" : ""
        }`}
      >
        <div className="sidebar-filters">
          {/* MOBILE FILTER HEADER */}
          <div className="company-mobile-filter-header">
            <h5>Advance Filter</h5>

            <button
              type="button"
              className="company-filter-close"
              onClick={onCloseFilter}
              aria-label="Close filters"
            >
              <i className="fi-rr-cross-small"></i>
            </button>
          </div>

          {/* DESKTOP FILTER HEADER */}
          <div className="filter-block head-border mb-30 company-desktop-filter-header">
            <h5>
              Advance Filter{" "}
              <a className="link-reset" href="#" onClick={handleReset}>
                Reset
              </a>
            </h5>
          </div>

          {/* MOBILE RESET */}
          <div className="company-mobile-reset">
            <a href="#" onClick={handleReset}>
              Reset
            </a>
          </div>

          {loading ? (
            <div className="p-3 text-center text-muted">
              Loading categories...
            </div>
          ) : (
            <>
              {/* CATEGORIES FILTER */}
              <div className="filter-block mb-30">
                <h5 className="medium-heading mb-15">Categories</h5>
                <div className="form-group">
                  <ul
                    className="list-checkbox"
                    style={{
                      maxHeight: "450px",
                      overflowY: "auto",
                      paddingRight: "6px",
                    }}
                  >
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <label className="cb-container">
                          <input
                            type="checkbox"
                            checked={selectedCategory === cat.id}
                            onChange={() => handleCategorySelect(cat.id)}
                          />
                          <span className="text-small">{cat.name}</span>
                          <span className="checkmark"></span>
                        </label>
                        {cat.count !== undefined && (
                          <span className="number-item">{cat.count}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyFilterSidebar;
