export interface IBlogBigCard {
  bgImage: string;
  title: string;
  heroImage: string;
  author: string;
  date: string;
}

function BlogBigCard({
  bgImage,
  author,
  date,
  heroImage,
  title,
}: IBlogBigCard) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="card-grid-5">
        <div
          className="card-grid-5 hover-up"
          style={{ backgroundImage: bgImage }}
        >
          <a href="blog-details">
            <div className="box-cover-img">
              <div className="content-bottom">
                <h3 className="color-white mb-20">{title}</h3>
                <div className="author d-flex align-items-center mr-20">
                  <img className="mr-10" alt="jobBox" src={heroImage} />
                  <span className="color-white font-sm mr-25">{author}</span>
                  <span className="color-white font-sm">{date}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogBigCard;
