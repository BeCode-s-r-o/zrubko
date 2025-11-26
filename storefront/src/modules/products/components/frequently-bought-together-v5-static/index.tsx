'use client'

// Statické produkty z Furnitor témy - presne ako v HTML
const FURNITOR_PRODUCTS = [
  { id: '1', image: '/furnitor/images/product-19.jpg', name: 'Product 1' },
  { id: '2', image: '/furnitor/images/product-02.jpg', name: 'Product 2' },
  { id: '3', image: '/furnitor/images/product-06.jpg', name: 'Product 3' },
]

export default function FrequentlyBoughtTogetherV5Static() {
  return (
    <section className="pb-11 pb-lg-14">
      <div className="container">
        <h2 className="fs-md-40 fs-30 mb-9 text-center">Frequently Bought Together</h2>
        <form>
          <div className="row frequently-bought-together align-items-center mb-4 mb-lg-7">
            {FURNITOR_PRODUCTS.map((product, index) => (
              <div key={product.id} className="col-sm-6 col-lg-3 item mb-6 mb-lg-0">
                <div className="form-check position-relative pl-0">
                  <input
                    className="form-check-input position-absolute pos-fixed-center"
                    type="checkbox"
                    value=""
                    name="product[]"
                    id={`item-${index + 1}`}
                  />
                  <label
                    className="form-check-label position-relative z-index-2"
                    htmlFor={`item-${index + 1}`}
                  >
                    <img src={product.image} alt="Image Product" />
                    <span className="icon position-absolute pos-fixed-top-right z-index-3 rounded-circle bg-primary p-1 fs-12 text-white mt-3 mr-6 d-flex align-items-center justify-content-center">
                      <i className="far fa-plus"></i>
                    </span>
                  </label>
                </div>
              </div>
            ))}
            <div className="col-sm-6 col-lg-3 item mb-6 mb-sm-0">
              <div className="pl-lg-5">
                <p className="text-primary mb-3">
                  Total price:<span className="font-weight-bold">$360.00</span>
                </p>
                <button type="submit" className="btn btn-primary">
                  Add Selected Items
                </button>
              </div>
            </div>
          </div>
          <ul className="list-unstyled list-bought-together mb-0">
            <li className="form-group d-flex align-items-center mb-0 flex-wrap">
              <label htmlFor="item1" className="mb-0 text-primary font-weight-500">
                <span className="fs-12 text-primary d-inline-block mr-2">
                  <i className="fas fa-scrubber"></i>
                </span>
                This item:
              </label>
              <select
                id="item1"
                className="form-control form-control-sm fs-16 border-0 pl-sm-0 pr-2"
              >
                <option>Riarien Beige / S / none - $120.00</option>
                <option>Riarien Beige / S / none - $120.00</option>
                <option>Riarien Beige / S / none - $120.00</option>
              </select>
            </li>
            <li className="form-group d-flex align-items-center mb-0 flex-wrap">
              <label htmlFor="item2" className="mb-0">
                <span className="fs-12 text-primary d-inline-block mr-2">
                  <i className="fas fa-scrubber"></i>
                </span>
                Tralisien
              </label>
              <select
                id="item2"
                className="form-control form-control-sm fs-16 border-0 pr-2"
              >
                <option>Red - $120.00 Stassinos Navi Multi - $120.00</option>
                <option>Red - $120.00 Stassinos Navi Multi - $120.00</option>
                <option>Red - $120.00 Stassinos Navi Multi - $120.00</option>
              </select>
            </li>
            <li className="form-group d-flex align-items-center mb-0 flex-wrap">
              <label htmlFor="item3" className="mb-0">
                <span className="fs-12 text-primary d-inline-block mr-2">
                  <i className="fas fa-scrubber"></i>
                </span>
                Stassinos
              </label>
              <select
                id="item3"
                className="form-control form-control-sm fs-16 py-0 border-0 pr-2"
              >
                <option>Navi Multi - $120.00</option>
                <option>Navi Multi - $120.00</option>
                <option>Navi Multi - $120.00</option>
              </select>
            </li>
          </ul>
        </form>
      </div>
    </section>
  )
}

