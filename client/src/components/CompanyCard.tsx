import starIcon from "../assets/imgs/template/icons/star.svg";

interface CompanyCardProps {
  name: string;
  logo: string;
  reviews: number;
  location: string;
  jobsOpen: number;
  href?: string;
}

const CompanyCard = ({
  name,
  logo,
  reviews,
  location,
  jobsOpen,
  href = "/Companies/Details",
}: CompanyCardProps) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="card-grid-1 hover-up wow animate__animated animate__fadeIn">
        <div className="image-box">
          <a href={href}>
            <img src={logo} alt={name} />
          </a>
        </div>

        <div className="info-text mt-10">
          <h5 className="font-bold">
            <a href={href}>{name}</a>
          </h5>

          <div className="mt-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <img key={star} src={starIcon} alt="jobBox" />
            ))}

            <span className="font-xs color-text-mutted ml-10">({reviews})</span>
          </div>

          <span className="card-location">{location}</span>

          <div className="mt-30">
            <a className="btn btn-grey-big" href="jobs-grid">
              <span>{jobsOpen}</span>
              <span> Jobs Open</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
