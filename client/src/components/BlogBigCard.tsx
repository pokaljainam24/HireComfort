export interface IBlogBigCard {
  bgImage: string;
  title: string;
  heroImage: string;
  authorImg: string;
  authorName: string;
  date: string;
}

function BlogBigCard({
  bgImage,
  authorImg,
  authorName,
  date,
  title,
}: IBlogBigCard) {
  const getImageUrl = (image?: string) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    const cleanPath = image.replace(/\\/g, "/").replace(/^\/+/, "");

    return `http://localhost:5000/${cleanPath}`;
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 col-12">
      <div className="card-grid-5">
        <div
          className="card-grid-5 hover-up"
          style={{
            backgroundImage: `url("${bgImage}")`,
          }}
        >
          <a href="/blog-details">
            <div className="box-cover-img">
              <div className="content-bottom">
                <h3 className="color-white mb-20">{title}</h3>

                <div className="author d-flex align-items-center mr-20">
                  <div className="col-lg-6 col-6">
                    <div className="d-flex">
                      <img
                        className="mr-10"
                        alt="jobBox"
                        src={getImageUrl(authorImg)}
                        width="40"
                        height="40"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />

                      <div className="info-right-img">
                        <span
                          className="font-sm font-bold color-white"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            marginTop: "10px",
                          }}
                        >
                          {authorName}
                        </span>
                      </div>
                    </div>
                  </div>

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
