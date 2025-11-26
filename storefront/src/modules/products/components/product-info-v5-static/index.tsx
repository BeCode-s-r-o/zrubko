'use client'

// Statické dáta z Furnitor témy - presne ako v HTML
const FURNITOR_PRODUCT = {
  category: 'accessories',
  title: 'Radial Clock',
  price: '$790.00',
  stock: 11,
  description: 'Minimal, yet bold - LYNEA Plug Lamp adds an architectural addition without the pain of a professional installation.',
  image: '/furnitor/images/product-page-09.jpg',
  colors: [
    { name: 'black', hex: '#000000', selected: true },
    { name: 'brown', hex: '#68412d', selected: false },
    { name: 'green', hex: '#9ec8bb', selected: false },
  ],
  sizes: ['SM', 'MD', 'LG', 'XL'],
  materials: ['SM', 'MD', 'LG', 'XL'], // V HTML sú to isté hodnoty
}

export default function ProductInfoV5Static() {
  return (
    <div>
      <p className="text-muted fs-12 font-weight-500 letter-spacing-05 text-uppercase mb-3">
        {FURNITOR_PRODUCT.category}
      </p>
      <h2 className="fs-30 fs-lg-40 mb-2">{FURNITOR_PRODUCT.title}</h2>
      <p className="fs-20 text-primary mb-4">{FURNITOR_PRODUCT.price}</p>
      <p className="mb-4 d-flex text-primary">
        <span className="d-inline-block mr-2 fs-14">
          <i className="far fa-stopwatch"></i>
        </span>
        <span className="fs-15">
          Only <span className="font-weight-600">{FURNITOR_PRODUCT.stock}</span> Left in Stock
        </span>
      </p>

      <p className="mb-5">{FURNITOR_PRODUCT.description}</p>

      {/* Product Image - presne ako v HTML */}
      <div className="mb-6">
        <img
          className="border"
          src={FURNITOR_PRODUCT.image}
          alt="Image Product"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <form>
        {/* Color Swatches - presne ako v HTML */}
        <div className="form-group shop-swatch mb-6">
          <label className="mb-3">
            <span className="text-primary fs-16 font-weight-bold">Color:</span>{' '}
            <span className="var text-capitalize text-primary">
              {FURNITOR_PRODUCT.colors.find((c) => c.selected)?.name || 'black'}
            </span>
          </label>
          <ul className="list-inline d-flex justify-content-start mb-0">
            {FURNITOR_PRODUCT.colors.map((color, index) => (
              <li
                key={index}
                className={`list-inline-item mr-1 ${color.selected ? 'selected' : ''}`}
              >
                <a
                  href="#"
                  className="d-block swatches-item"
                  data-var={color.name}
                  style={{ backgroundColor: color.hex }}
                  onClick={(e) => e.preventDefault()}
                ></a>
              </li>
            ))}
          </ul>
          <select
            name="swatches"
            className="form-select swatches-select d-none"
            aria-label="Default select example"
            defaultValue="black"
          >
            {FURNITOR_PRODUCT.colors.map((color) => (
              <option key={color.name} value={color.name} selected={color.selected}>
                {color.name.charAt(0).toUpperCase() + color.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Size and Material options - presne ako v HTML */}
        <div className="row">
          <div className="col-sm-6 mb-4 form-group">
            <label className="text-primary fs-16 font-weight-bold mb-3" htmlFor="size">
              Select a Size:{' '}
            </label>
            <select name="size" className="form-control w-100" required id="size">
              <option value="" selected>
                Choose an option
              </option>
              {FURNITOR_PRODUCT.sizes.map((size) => (
                <option key={size} value={size.toLowerCase()}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-6 mb-4 form-group">
            <label className="text-primary fs-16 font-weight-bold mb-3" htmlFor="material">
              Material:{' '}
            </label>
            <select name="size" className="form-control w-100" required id="material">
              <option selected value="">
                Choose an option
              </option>
              {FURNITOR_PRODUCT.materials.map((material) => (
                <option key={material} value={material.toLowerCase()}>
                  {material}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          add to cart
        </button>

        {/* Payment icons - presne ako v HTML */}
        <ul className="list-inline px-xl-8 mb-4 d-flex align-items-center justify-content-center">
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p1.png" alt="Visa" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p2.png" alt="Visa" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p3.png" alt="Visa" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p4.png" alt="Visa" />
          </li>
          <li className="list-inline-item mr-5">
            <img className="" src="/furnitor/images/p5.png" alt="Visa" />
          </li>
        </ul>
      </form>

      <p className="d-flex text-primary justify-content-center">
        <span className="d-inline-block mr-2 fs-14">
          <i className="far fa-lock"></i>
        </span>
        <span className="fs-15">Guarantee Safe and Secure Checkout</span>
      </p>
    </div>
  )
}

