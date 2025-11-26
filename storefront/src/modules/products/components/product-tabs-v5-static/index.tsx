'use client'

export default function ProductTabsV5Static() {
  return (
    <section className="pb-11 pb-lg-13">
      <div className="container">
        <div className="collapse-tabs">
          {/* Desktop Tabs Navigation */}
          <ul
            className="nav nav-pills mb-3 justify-content-center d-md-flex d-none"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active show fs-lg-32 fs-24 font-weight-600 p-0 mr-md-10 mr-4"
                id="pills-description-tab"
                data-toggle="pill"
                href="#pills-description"
                role="tab"
                aria-controls="pills-description"
                aria-selected="false"
              >
                Description
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fs-lg-32 fs-24 font-weight-600 p-0 mr-md-10 mr-4"
                id="pills-infomation-tab"
                data-toggle="pill"
                href="#pills-infomation"
                role="tab"
                aria-controls="pills-infomation"
                aria-selected="false"
              >
                Infomation
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fs-lg-32 fs-24 font-weight-600 p-0"
                id="pills-reviews-tab"
                data-toggle="pill"
                href="#pills-reviews"
                role="tab"
                aria-controls="pills-reviews"
                aria-selected="true"
              >
                Reviews (3)
              </a>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content bg-white-md shadow-none py-md-5 p-0">
            <div id="collapse-tabs-accordion-01">
              {/* Description Tab */}
              <div
                className="tab-pane tab-pane-parent fade show active"
                id="pills-description"
                role="tabpanel"
              >
                <div className="card border-0 bg-transparent">
                  {/* Mobile Accordion Header */}
                  <div
                    className="card-header border-0 d-block d-md-none bg-transparent px-0 py-1"
                    id="headingDetails-01"
                  >
                    <h5 className="mb-0">
                      <button
                        className="btn lh-2 fs-18 py-1 px-6 shadow-none w-100 collapse-parent border text-primary"
                        data-toggle="false"
                        data-target="#description-collapse-01"
                        aria-expanded="true"
                        aria-controls="description-collapse-01"
                      >
                        Description
                      </button>
                    </h5>
                  </div>
                  {/* Mobile Accordion Body */}
                  <div
                    id="description-collapse-01"
                    className="collapsible collapse show"
                    aria-labelledby="headingDetails-01"
                    data-parent="#collapse-tabs-accordion-01"
                  >
                    <div
                      id="accordion-style-01"
                      className="accordion accordion-01 border-md-0 border p-md-0 p-6"
                    >
                      <div className="text-center pt-md-7">
                        <img
                          src="/furnitor/images/description-product.jpg"
                          alt="Description Product"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                      <p className="mt-6 mt-md-10 mxw-830 mx-auto mb-0">
                        Perfect for Equestrian homes or every horse lover. Designer premium
                        signature aluminum alloy all Arthur Court is compliance with FDA
                        regulations. Aluminum Serveware can be chilled in the freezer or
                        refrigerator and warmed in the oven to 350. Wash by hand with mild dish
                        soap and dry immediately – do not put in the dishwasher. Comes in Gift
                        Box perfect for Equestrian home or Horse lover in your life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Tab */}
              <div
                className="tab-pane tab-pane-parent fade"
                id="pills-infomation"
                role="tabpanel"
              >
                <div className="card border-0 bg-transparent">
                  {/* Mobile Accordion Header */}
                  <div
                    className="card-header border-0 d-block d-md-none bg-transparent px-0 py-1"
                    id="headinginfomation-01"
                  >
                    <h5 className="mb-0">
                      <button
                        className="btn lh-2 fs-18 py-1 px-6 shadow-none w-100 collapse-parent border collapsed text-primary"
                        data-toggle="collapse"
                        data-target="#infomation-collapse-01"
                        aria-expanded="false"
                        aria-controls="infomation-collapse-01"
                      >
                        Infomation
                      </button>
                    </h5>
                  </div>
                  {/* Mobile Accordion Body */}
                  <div
                    id="infomation-collapse-01"
                    className="collapsible collapse"
                    aria-labelledby="headinginfomation-01"
                    data-parent="#collapse-tabs-accordion-01"
                  >
                    <div
                      id="accordion-style-01-2"
                      className="accordion accordion-01 border-md-0 border p-md-0 p-6"
                    >
                      <div className="mxw-830 mx-auto pt-md-4">
                        <div className="table-responsive mb-md-7">
                          <table className="table table-border-top-0 mb-0">
                            <tbody>
                              <tr>
                                <td className="pl-0">Material</td>
                                <td className="text-right pr-0">Steel, Wood, Marble</td>
                              </tr>
                              <tr>
                                <td className="pl-0">Dimensions</td>
                                <td className="text-right pr-0">55.1"W X 14.6"D X 23.6"H</td>
                              </tr>
                              <tr>
                                <td className="pl-0">Weight</td>
                                <td className="text-right pr-0">Weight 23 lbs</td>
                              </tr>
                              <tr>
                                <td className="pl-0">Origin</td>
                                <td className="text-right pr-0">Denmark</td>
                              </tr>
                              <tr>
                                <td className="pl-0">Brand</td>
                                <td className="text-right pr-0">FLOYD</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="row">
                          <div className="col-sm-3 col-md-2 mb-6 mb-sm-0">
                            <img
                              className="border"
                              src="/furnitor/images/product-page-09.jpg"
                              alt="Image Product"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </div>
                          <div className="col-sm-9 col-md-10">
                            Perfect for Equestrian homes or every horse lover. Designer premium
                            signature aluminum alloy all Arthur Court is compliance with FDA
                            regulations. Aluminum Serveware can be chilled in the freezer or
                            refrigerator and warmed in the oven to 350. Wash by hand with mild dish
                            soap and dry immediately – do not put in the dishwasher. Comes in Gift
                            Box perfect for Equestrian home or Horse lover in your life.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Tab */}
              <div
                className="tab-pane tab-pane-parent fade"
                id="pills-reviews"
                role="tabpanel"
              >
                <div className="card border-0 bg-transparent">
                  {/* Mobile Accordion Header */}
                  <div
                    className="card-header border-0 d-block d-md-none bg-transparent px-0 py-1"
                    id="headingreviews-01"
                  >
                    <h5 className="mb-0">
                      <button
                        className="btn lh-2 fs-18 py-1 px-6 shadow-none w-100 collapse-parent border collapsed text-primary"
                        data-toggle="collapse"
                        data-target="#reviews-collapse-01"
                        aria-expanded="false"
                        aria-controls="reviews-collapse-01"
                      >
                        Reviews (3)
                      </button>
                    </h5>
                  </div>
                  {/* Mobile Accordion Body */}
                  <div
                    id="reviews-collapse-01"
                    className="collapsible collapse"
                    aria-labelledby="headingreviews-01"
                    data-parent="#collapse-tabs-accordion-01"
                  >
                    <div
                      id="accordion-style-01-3"
                      className="accordion accordion-01 border-md-0 border p-md-0 p-6"
                    >
                      <div className="comment-product mxw-830 mx-auto pt-md-4">
                        {/* Average Rating */}
                        <ul className="list-inline mb-3 d-flex justify-content-center rating-result">
                          <li className="list-inline-item fs-18 text-primary">
                            <i className="fas fa-star"></i>
                          </li>
                          <li className="list-inline-item fs-18 text-primary">
                            <i className="fas fa-star"></i>
                          </li>
                          <li className="list-inline-item fs-18 text-primary">
                            <i className="fas fa-star"></i>
                          </li>
                          <li className="list-inline-item fs-18 text-primary">
                            <i className="fas fa-star"></i>
                          </li>
                          <li className="list-inline-item fs-18 text-primary">
                            <i className="fas fa-star"></i>
                          </li>
                        </ul>
                        <p className="text-center mb-9 fs-15 text-primary lh-1">
                          <span className="d-inline-block border-right pr-1 mr-1">5.0</span>
                          Base on 3 Reviews
                        </p>

                        {/* Reviews List - presne ako v HTML */}
                        <div className="media border-bottom pb-6 mb-6">
                          <div className="w-70px d-block mr-6">
                            <img src="/furnitor/images/tes_01.png" alt="Dean. D" />
                          </div>
                          <div className="media-body">
                            <div className="row no-gutters mb-2 align-items-center rating-result">
                              <ul className="list-inline mb-0 mr-auto d-flex col-sm-6">
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                              </ul>
                              <div className="col-sm-6 text-sm-right">
                                <span className="fs-12 text-primary">Nov 20, 2020</span>
                              </div>
                            </div>
                            <p className="text-gray-01 lh-175 mb-2">
                              It has a really nice fit however it loses many fluffs and is kind of
                              see-through because the fabric is quite wid-meshed. Nevertheless it's
                              a really good and comfy staple that goes with every kind.
                            </p>
                            <span className="font-weight-600 text-primary d-block">Dean. D</span>
                          </div>
                        </div>

                        <div className="media border-bottom pb-6 mb-6">
                          <div className="w-70px d-block mr-6">
                            <img src="/furnitor/images/tes_02.png" alt="Dean. D" />
                          </div>
                          <div className="media-body">
                            <div className="row no-gutters mb-2 align-items-center rating-result">
                              <ul className="list-inline mb-0 mr-auto d-flex col-sm-6">
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                              </ul>
                              <div className="col-sm-6 text-sm-right">
                                <span className="fs-12 text-primary">Nov 20, 2020</span>
                              </div>
                            </div>
                            <p className="text-gray-01 lh-175 mb-2">
                              It has a really nice fit however it loses many fluffs and is kind of
                              see-through because the fabric is quite wid-meshed. Nevertheless it's
                              a really good and comfy staple that goes with every kind.
                            </p>
                            <span className="font-weight-600 text-primary d-block">Dean. D</span>
                          </div>
                        </div>

                        <div className="media">
                          <div className="w-70px d-block mr-6">
                            <img src="/furnitor/images/tes_03.png" alt="Dean. D" />
                          </div>
                          <div className="media-body">
                            <div className="row no-gutters mb-2 align-items-center rating-result">
                              <ul className="list-inline mb-0 mr-auto d-flex col-sm-6">
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                                <li className="list-inline-item fs-12 text-primary">
                                  <i className="fas fa-star"></i>
                                </li>
                              </ul>
                              <div className="col-sm-6 text-sm-right">
                                <span className="fs-12 text-primary">Nov 20, 2020</span>
                              </div>
                            </div>
                            <p className="text-gray-01 lh-175 mb-2">
                              It has a really nice fit however it loses many fluffs and is kind of
                              see-through because the fabric is quite wid-meshed. Nevertheless it's
                              a really good and comfy staple that goes with every kind.
                            </p>
                            <span className="font-weight-600 text-primary d-block">Dean. D</span>
                          </div>
                        </div>

                        {/* Write Review Button */}
                        <div className="text-center mt-6 mt-md-9">
                          <a
                            href="#"
                            className="btn btn-outline-primary write-review"
                            onClick={(e) => {
                              e.preventDefault()
                              const formReview = document.querySelector('.form-review')
                              if (formReview) {
                                formReview.classList.toggle('hide')
                              }
                            }}
                          >
                            write a review
                          </a>
                        </div>

                        {/* Review Form - Hidden by default */}
                        <div className="card border-0 mt-9 form-review hide">
                          <div className="card-body p-0">
                            <h3 className="fs-40 text-center mb-9">Write A Review</h3>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault()
                                alert('Review submission functionality coming soon!')
                              }}
                            >
                              <div className="d-flex flex-wrap">
                                <p className="text-primary font-weight-bold mb-0 mr-2 mb-2">
                                  Your Rating
                                </p>
                                <div className="form-group mb-6 d-flex justify-content-start">
                                  <div className="rate-input">
                                    <input type="radio" id="star5" name="rate" value="5" />
                                    <label htmlFor="star5" title="text" className="mb-0 mr-1 lh-1">
                                      <i className="fal fa-star"></i>
                                    </label>
                                    <input type="radio" id="star4" name="rate" value="4" />
                                    <label htmlFor="star4" title="text" className="mb-0 mr-1 lh-1">
                                      <i className="fal fa-star"></i>
                                    </label>
                                    <input type="radio" id="star3" name="rate" value="3" />
                                    <label htmlFor="star3" title="text" className="mb-0 mr-1 lh-1">
                                      <i className="fal fa-star"></i>
                                    </label>
                                    <input type="radio" id="star2" name="rate" value="2" />
                                    <label htmlFor="star2" title="text" className="mb-0 mr-1 lh-1">
                                      <i className="fal fa-star"></i>
                                    </label>
                                    <input type="radio" id="star1" name="rate" value="1" />
                                    <label htmlFor="star1" title="text" className="mb-0 mr-1 lh-1">
                                      <i className="fal fa-star"></i>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="form-group mb-6">
                                    <input
                                      placeholder="Your Name*"
                                      className="form-control"
                                      type="text"
                                      name="name"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group mb-6">
                                    <input
                                      type="email"
                                      placeholder="Your Email*"
                                      name="email"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group mb-8">
                                <textarea
                                  className="form-control"
                                  placeholder="Your Review"
                                  name="message"
                                  rows={5}
                                  required
                                ></textarea>
                              </div>
                              <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                  submit now
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

