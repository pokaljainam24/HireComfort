import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import CompanyBanner from "../components/CompanyBanner";
import CompanySortHeader from "../components/CompanySortHeader";
import CompanyFilterSidebar from "../components/CompanyFilterSidebar";
import JobPagination from "../components/JobPagination";
import {
  fetchAllCompanies,
  type Company as CompanyType,
} from "../api/companyApi";

function Company() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [companies, setCompanies] = useState<any[]>([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetchAllCompanies({
          page,
          limit: 12,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          sortBy,
        });
        if (isMounted) {
          const rawCompanies = response.companies || [];
          if (rawCompanies.length > 0) {
            const mapped = rawCompanies.map((c: CompanyType) => {
              let logoUrl = c.companyLogo || "";
              if (
                logoUrl &&
                !logoUrl.startsWith("http") &&
                !logoUrl.startsWith("data:")
              ) {
                logoUrl = `http://localhost:5000${logoUrl}`;
              }

              return {
                id: c._id,
                name: c.companyName || "Unnamed Company",
                companyLogo: logoUrl,
                logo: logoUrl,
                reviews: 12,
                location: c.address || "N/A",
                jobsOpen: 5,
                href: `/companies/details/${c._id}`,
              };
            });
            setCompanies(mapped);
            setTotalCompanies(response.totalCompanies || mapped.length);
            setTotalPages(response.totalPages || 1);
          } else {
            setCompanies([]);
            setTotalCompanies(0);
            setTotalPages(1);
          }
        }
      } catch (err) {
        console.error("Failed to fetch companies:", err);
        if (isMounted) {
          setCompanies([]);
          setTotalCompanies(0);
          setTotalPages(1);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCompanies();

    return () => {
      isMounted = false;
    };
  }, [page, selectedCategory, sortBy]);

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSortBy("newest");
    setPage(1);
  };

  const showingStart = companies.length > 0 ? (page - 1) * 12 + 1 : 0;
  const showingEnd = Math.min(page * 12, totalCompanies);

  return (
    <main className="main">
      {/* RESPONSIVE FILTER OVERLAY */}
      {isFilterOpen && (
        <div className="company-filter-overlay" onClick={closeFilter}></div>
      )}

      {/* BANNER */}
      <CompanyBanner />

      {/* MAIN CONTENT */}
      <section className="section-box mt-30">
        <div className="container">
          <div className="row flex-row-reverse">
            {/* COMPANY LIST SECTION */}
            <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
              <div className="content-page">
                {/* FILTER TOP BAR */}
                <CompanySortHeader
                  onOpenFilter={() => setIsFilterOpen(true)}
                  showingStart={showingStart}
                  showingEnd={showingEnd}
                  totalCompanies={totalCompanies}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                />

                {/* COMPANY CARDS */}
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">
                        Loading companies...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    {companies.map((company, ind) => (
                      <CompanyCard
                        key={company.id || `company-${ind}`}
                        {...company}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* PAGINATION */}
              <JobPagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>

            {/* FILTER SIDEBAR */}
            <CompanyFilterSidebar
              isFilterOpen={isFilterOpen}
              onCloseFilter={closeFilter}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Company;
