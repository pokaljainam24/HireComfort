import { useEffect, useState } from "react";
import IconGridHover from "../assets/imgs/template/icons/icon-grid-hover.svg";
import IconList from "../assets/imgs/template/icons/icon-list.svg";
import NewsletterRight from "../assets/imgs/template/newsletter-right.png";
import NewsletterLeft from "../assets/imgs/template/newsletter-left.png";
import { getJobCategories } from "../recruiterDashboard/api/jobCategoryApi.ts";
import { jobApi } from "../recruiterDashboard/api/jobApi.ts";
import type { JobCategory } from "../recruiterDashboard/types/jobCategory.ts";
import type { Job } from "../recruiterDashboard/types/job.ts";
import JobCard from "../components/JobCard.tsx";

function Jobs() {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  // const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    Promise.all([getJobCategories(), jobApi.getAll()])
      .then(([categoriesData, jobsData]) => {
        setCategories(categoriesData || []);
        setJobs(jobsData || []);
      })
      .catch((err) => console.error("Failed to load jobs/categories", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesIndustry = selectedIndustry
      ? job.categoryId === selectedIndustry
      : true;
    // const matchesKeyword = searchKeyword
    //   ? job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    //   job.description?.toLowerCase().includes(searchKeyword.toLowerCase())
    //   : true;
    // return matchesIndustry && matchesKeyword;
    return matchesIndustry;

  });

  return (
    <>
      <main className="main">
        <section className="section-box-2">
          <div className="container">
            <div className="banner-hero banner-single banner-single-bg">
              <div className="block-banner text-center">
                <h3 className="wow animate__animated animate__fadeInUp">
                  <span className="color-brand-2">{jobs.length} Jobs</span> Available Now
                </h3>
                <div
                  className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".1s"
                >
                  Find your next dream job from top recruiters and companies worldwide.
                </div>
                <div
                  className="form-find text-start mt-40 wow animate__animated animate__fadeInUp"
                  data-wow-delay=".2s"
                >
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="box-industry">
                      <select
                        className="form-input mr-10 select-active input-industry"
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                      >
                        <option value="">All Industries</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <select className="form-input mr-10 select-active">
                      <option value="">Location</option>
                      <option value="AX">Aland Islands</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="PW">Belau</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BQ">
                        Bonaire, Saint Eustatius and Saba
                      </option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="VG">British Virgin Islands</option>
                      <option value="BN">Brunei</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo (Brazzaville)</option>
                      <option value="CD">Congo (Kinshasa)</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">Cura&Ccedil;ao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">
                        Heard Island and McDonald Islands
                      </option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran</option>
                      <option value="IQ">Iraq</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="CI">Ivory Coast</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Laos</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macao S.A.R., China</option>
                      <option value="MK">Macedonia</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldova</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="AN">Netherlands Antilles</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="KP">North Korea</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PS">Palestinian Territory</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="QA">Qatar</option>
                      <option value="IE">Republic of Ireland</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russia</option>
                      <option value="RW">Rwanda</option>
                      <option value="ST">
                        S&atilde;o Tom&eacute; and Pr&iacute;ncipe
                      </option>
                      <option value="BL">Saint Barth&eacute;lemy</option>
                      <option value="SH">Saint Helena</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="SX">Saint Martin (Dutch part)</option>
                      <option value="MF">Saint Martin (French part)</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">
                        Saint Vincent and the Grenadines
                      </option>
                      <option value="SM">San Marino</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">South Georgia/Sandwich Islands</option>
                      <option value="KR">South Korea</option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syria</option>
                      <option value="TW">Taiwan</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom (UK)</option>
                      <option value="US">USA (US)</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VA">Vatican</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam</option>
                      <option value="WF">Wallis and Futuna</option>
                      <option value="EH">Western Sahara</option>
                      <option value="WS">Western Samoa</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                    </select>
                    <input
                      className="form-input input-keysearch mr-10"
                      type="text"
                      placeholder="Your keyword... "
                      value={""}
                      onChange={(e) => { console.log(e.target.value) }}
                    />
                    <button className="btn btn-default btn-find font-sm" type="button">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-box mt-30">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                <div className="content-page">
                  <div className="box-filters-job">
                    <div className="row">
                      <div className="col-xl-6 col-lg-5">
                        <span className="text-small text-showing">
                          Showing <strong>1-{filteredJobs.length} </strong>of{" "}
                          <strong>{jobs.length} </strong>jobs
                        </span>
                      </div>
                      <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
                        <div className="display-flex2">
                          <div className="box-border mr-10">
                            <span className="text-sortby">Show:</span>
                            <div className="dropdown dropdown-sort">
                              <button
                                className="btn dropdown-toggle"
                                id="dropdownSort"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                              >
                                <span>12</span>
                                <i className="fi-rr-angle-small-down"></i>
                              </button>
                              <ul
                                className="dropdown-menu dropdown-menu-light"
                                aria-labelledby="dropdownSort"
                              >
                                <li>
                                  <a className="dropdown-item active" href="#">
                                    10
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    12
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    20
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="box-border">
                            <span className="text-sortby">Sort by:</span>
                            <div className="dropdown dropdown-sort">
                              <button
                                className="btn dropdown-toggle"
                                id="dropdownSort2"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-display="static"
                              >
                                <span>Newest Post</span>
                                <i className="fi-rr-angle-small-down"></i>
                              </button>
                              <ul
                                className="dropdown-menu dropdown-menu-light"
                                aria-labelledby="dropdownSort2"
                              >
                                <li>
                                  <a className="dropdown-item active" href="#">
                                    Newest Post
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Oldest Post
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Rating Post
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="box-view-type">
                            <a className="view-type" href="jobs-list">
                              <img src={IconList} alt="jobBox" />
                            </a>
                            <a className="view-type" href="jobs-grid">
                              <img src={IconGridHover} alt="jobBox" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {loading ? (
                      <div className="col-12 text-center py-5">
                        <h4>Loading jobs...</h4>
                      </div>
                    ) : filteredJobs.length === 0 ? (
                      <div className="col-12 text-center py-5">
                        <h4>No jobs found</h4>
                        <p className="text-muted">Try adjusting your filters or search keywords.</p>
                      </div>
                    ) : (
                      filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
                    )}
                  </div>
                  <div className="paginations">
                    <ul className="pager">
                      <li>
                        <a className="pager-prev" href="#"></a>
                      </li>
                      <li>
                        <a className="pager-number" href="#">
                          1
                        </a>
                      </li>
                      <li>
                        <a className="pager-number" href="#">
                          2
                        </a>
                      </li>
                      <li>
                        <a className="pager-number" href="#">
                          3
                        </a>
                      </li>
                      <li>
                        <a className="pager-number" href="#">
                          4
                        </a>
                      </li>
                      <li>
                        <a className="pager-number" href="#">
                          5
                        </a>
                      </li>
                      <li>
                        <a className="pager-number active" href="#">
                          6
                        </a>
                      </li>
                      <li>
                        <a className="pager-number" href="#">
                          7
                        </a>
                      </li>
                      <li>
                        <a className="pager-next" href="#"></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="sidebar-shadow none-shadow mb-30">
                  <div className="sidebar-filters">
                    <div className="filter-block head-border mb-30">
                      <h5>
                        Advance Filter{" "}
                        <a className="link-reset" href="#">
                          Reset
                        </a>
                      </h5>
                    </div>
                    <div className="filter-block mb-30">
                      <div className="form-group select-style select-style-icon">
                        <select className="form-control form-icons select-active">
                          <option>New York, US</option>
                          <option>London</option>
                          <option>Paris</option>
                          <option>Berlin</option>
                        </select>
                        <i className="fi-rr-marker"></i>
                      </div>
                    </div>
                    <div className="filter-block mb-20">
                      <h5 className="medium-heading mb-15">Industry</h5>
                      <div className="form-group">
                        <ul className="list-checkbox">
                          <li>
                            <label className="cb-container">
                              <input
                                type="radio"
                                name="industrySidebar"
                                checked={selectedIndustry === ""}
                                onChange={() => setSelectedIndustry("")}
                              />
                              <span className="text-small">All</span>
                              <span className="checkmark"></span>
                            </label>
                            <span className="number-item">{jobs.length}</span>
                          </li>
                          {categories.map((cat) => {
                            const count = jobs.filter((j) => j.categoryId === cat._id).length;
                            return (
                              <li key={cat._id}>
                                <label className="cb-container">
                                  <input
                                    type="radio"
                                    name="industrySidebar"
                                    checked={selectedIndustry === cat._id}
                                    onChange={() => setSelectedIndustry(cat._id)}
                                  />
                                  <span className="text-small">{cat.name}</span>
                                  <span className="checkmark"></span>
                                </label>
                                <span className="number-item">{count}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-25">Salary Range</h5>
                        <div className="list-checkbox pb-20">
                          <div className="row position-relative mt-10 mb-20">
                            <div className="col-sm-12 box-slider-range">
                              <div id="slider-range"></div>
                            </div>
                            <div className="box-input-money">
                              <input
                                className="input-disabled form-control min-value-money"
                                type="text"
                                name="min-value-money"
                                disabled={false}
                                defaultValue=""
                              />
                              <input
                                className="form-control min-value"
                                type="hidden"
                                name="min-value"
                                value=""
                              />
                            </div>
                          </div>
                          <div className="box-number-money">
                            <div className="row mt-30">
                              <div className="col-sm-6 col-6">
                                <span className="font-sm color-brand-1">$0</span>
                              </div>
                              <div className="col-sm-6 col-6 text-end">
                                <span className="font-sm color-brand-1">
                                  $500
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-20">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">All</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">145</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$0k - $20k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$20k - $40k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">37</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$40k - $60k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">75</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$60k - $80k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">98</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$80k - $100k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">14</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$100k - $200k</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">25</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Popular Keyword</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Software</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Developer</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">45</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Web</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">57</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Position</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Senior</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Junior</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">35</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Fresher</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Experience Level</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Internship</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Entry Level</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">87</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Associate</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Mid Level</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">45</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Director</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">76</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Executive</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">89</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Onsite/Remote</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">On-site</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Remote</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Hybrid</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">58</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Job Posted</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">All</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">78</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">1 day</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">7 days</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">30 days</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">56</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-15">Job type</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Full Time</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">25</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked />
                                <span className="text-small">Part Time</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">64</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Remote Jobs</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">78</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Freelancer</span>
                                <span className="checkmark"></span>
                              </label>
                              <span className="number-item">97</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div >
          </div>
        </section >
        <section className="section-box mt-50 mb-20">
          <div className="container">
            <div className="box-newsletter">
              <div className="row">
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={NewsletterLeft} alt="joxBox" />
                </div>
                <div className="col-lg-12 col-xl-6 col-12">
                  <h2 className="text-md-newsletter text-center">
                    New Things Will Always
                    <br /> Update Regularly
                  </h2>
                  <div className="box-form-newsletter mt-40">
                    <form className="form-newsletter">
                      <input
                        className="input-newsletter"
                        type="text"
                        defaultValue=""
                        placeholder="Enter your email here"
                      />
                      <button className="btn btn-default font-heading icon-send-letter">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                  <img src={NewsletterRight} alt="joxBox" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main >
    </>
  );
}

export default Jobs;
