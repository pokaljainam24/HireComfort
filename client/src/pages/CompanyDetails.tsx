import { useEffect, useState } from "react";
import { useParams } from "react-router";
import img from "../assets/imgs/page/company/img.png";
import company from "../assets/imgs/page/company/company.png";
import NewsletterBox from "../components/NewsletterBox";
import CompanyHeader from "../components/CompanyHeader";
import CompanyAboutTab from "../components/CompanyAboutTab";
import CompanySidebar from "../components/CompanySidebar";
import { fetchCompanyById, type Company } from "../api/companyApi";

function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const [comp, setComp] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchCompanyById(id)
        .then((data) => {
          setComp(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading company details:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <main className="main">
        <div className="container mt-50 mb-50 text-center">
          <h4>Loading company details...</h4>
        </div>
      </main>
    );
  }

  if (!comp) {
    return (
      <main className="main">
        <div className="container mt-50 mb-50 text-center">
          <h4>Company not found</h4>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <CompanyHeader
        bannerImg={comp.bannerImage || img}
        logoImg={comp.companyLogo || company}
        companyName={comp.companyName}
        location={comp.address}
      />
      <section className="section-box mt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <CompanyAboutTab
                htmlContent={
                  comp.aboutCompany || "<p>No description available.</p>"
                }
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
              <CompanySidebar
                companyName={comp.companyName}
                location={comp.address}
                field={comp.industry?.name || "N/A"}
                exactLocation={comp.address}
                memberSince={
                  comp.createdAt
                    ? new Date(comp.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"
                }
                addressLines={[comp.address]}
                phone={comp.contactNumber}
                email={comp.companyEmail}
                website={comp.website}
                facebook={comp.facebook}
                twitter={comp.twitter}
                linkedin={comp.linkedin}
                instagram={comp.instagram}
              />
            </div>
          </div>
        </div>
      </section>
      <NewsletterBox />
    </main>
  );
}

export default CompanyDetails;
