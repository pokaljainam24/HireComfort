export interface IBlogLatestPostCard {
  heroImg: string;
  type: string;
  title: string;
  description: string;
  authorImg: string;
  authorName: string;
  date: string;
  durationInMin: string;
}

function BlogLatestPostCard({
  heroImg,
  authorImg,
  authorName,
  date,
  description,
  durationInMin,
  title,
  type,
}: IBlogLatestPostCard) {
  return (
    <div className="col-lg-6 mb-30">
      <div className="card-grid-3 hover-up">
        <div className="text-center card-grid-3-image">
          <a href="blog-details">
            <figure>
              <img alt="jobBox" src={heroImg} />
            </figure>
          </a>
        </div>
        <div className="card-block-info">
          <div className="tags mb-15">
            <a className="btn btn-tag" href="blog-grid">
              {type}
            </a>
          </div>
          <h5>
            <a href="blog-details">{title}</a>
          </h5>
          <p className="mt-10 color-text-paragraph font-sm">{description}</p>
          <div className="card-2-bottom mt-20">
            <div className="row">
              <div className="col-lg-6 col-6">
                <div className="d-flex">
                  <img className="img-rounded" src={authorImg} />
                  <div className="info-right-img">
                    <span className="font-sm font-bold color-brand-1 op-70">
                      {authorName}
                    </span>
                    <br />
                    <span className="font-xs color-text-paragraph-2">
                      {date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 text-end col-6 pt-15">
                <span className="color-text-paragraph-2 font-xs">
                  {durationInMin} mins to read
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogLatestPostCard;
