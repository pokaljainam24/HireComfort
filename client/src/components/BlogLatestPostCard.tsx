export interface IBlogLatestPostCard {
  blogImg: string;
  category: string;
  title: string;
  description: string;
  authorImg: string;
  authorName: string;
  date: string;
  durationInMin: string;
}

function BlogLatestPostCard({
  blogImg,
  authorImg,
  authorName,
  date,
  description,
  durationInMin,
  title,
  category,
}: IBlogLatestPostCard) {
  const getImageUrl = (image?: string) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    const cleanPath = image.replace(/\\/g, "/").replace(/^\/+/, "");

    return `http://localhost:5000/${cleanPath}`;
  };

  const blogImageUrl = getImageUrl(blogImg);

  return (
    <div className="col-lg-6 mb-30">
      <div className="card-grid-3 hover-up">
        <div className="text-center card-grid-3-image">
          <a href="blog-details">
            <figure>
              <img
                alt={title}
                src={blogImageUrl}
                onError={() => {
                  console.log("BLOG IMAGE FAILED:", blogImageUrl);
                }}
              />
            </figure>
          </a>
        </div>

        <div className="card-block-info">
          <div className="tags mb-15">
            <a className="btn btn-tag" href="blog-grid">
              {category}
            </a>
          </div>

          <h5
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            <a href="blog-details">{title}</a>
          </h5>

          <p
            className="mt-10 color-text-paragraph font-sm"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          <div className="card-2-bottom mt-20">
            <div className="row">
              <div className="col-lg-6 col-6">
                <div className="d-flex">
                  <img
                    className="img-rounded"
                    src={getImageUrl(authorImg)}
                    alt={authorName}
                  />

                  <div className="info-right-img">
                    <span
                      className="font-sm font-bold color-brand-1 op-70"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
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
