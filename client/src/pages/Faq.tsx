import React, { useEffect, useState } from "react";
import { getFaqsApi } from "../api/faq/faqApi.ts";

interface Faq {
  _id: string;
  keyName: string;
  que?: string;
  ans: string;
  isActive?: boolean;
  isDisplay?: boolean;
}

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        setLoading(true);

        const response = await getFaqsApi();

        console.log("FAQ API RESPONSE:", response);

        const data: Faq[] = Array.isArray(response?.faqs)
          ? response.faqs
          : Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
              ? response.data
              : [];

        console.log("FAQ DATA:", data);

        const activeFaqs = data.filter(
          (faq) => faq.isActive !== false && faq.isDisplay !== false,
        );

        console.log("ACTIVE FAQS:", activeFaqs);

        setFaqs(activeFaqs);
      } catch (error) {
        console.error("FAQ API ERROR:", error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFaqs();
  }, []);

  return (
    <section className="faq-section">
      <div className="container">
        {/* =====================================
            FAQ HEADER
        ===================================== */}

        <div className="faq-section-header">

          <h1>
            Frequently Asked <span>Questions</span>
          </h1>

          <p>
            Find answers to the most common questions about HireComfort, jobs,
            applications, recruiters and more.
          </p>
        </div>

        {/* =====================================
            LOADING
        ===================================== */}

        {loading && <div className="faq-loading">Loading FAQs...</div>}

        {/* =====================================
            EMPTY
        ===================================== */}

        {!loading && faqs.length === 0 && (
          <div className="faq-empty">No FAQs available.</div>
        )}

        {/* =====================================
            FAQ CONTENT
        ===================================== */}

        {!loading && faqs.length > 0 && (
          <div className="faq-content-wrapper">
            {faqs.map((faq) => (
              <div className="faq-category" key={faq._id}>
                {/* Category / Subject */}

                <div className="faq-category-title">{faq.keyName}</div>

                {/* TinyMCE HTML */}

                <div
                  className="faq-website-content"
                  dangerouslySetInnerHTML={{
                    __html: faq.ans || "",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Faq;
