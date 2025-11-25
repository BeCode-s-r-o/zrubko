export default function ShopLoading() {
  return (
    <main id="content">
      {/* Page Title */}
      <section className="py-8 page-title border-top">
        <div className="container">
          <h1 className="fs-40 my-1 text-capitalize text-center">Shop All</h1>
        </div>
      </section>

      {/* Loading Skeleton */}
      <section className="pt-13 pb-11 pb-lg-14">
        <div className="container">
          <div className="row overflow-hidden">
            {/* Sidebar Skeleton */}
            <div className="col-md-3 mb-10 mb-md-0">
              <div className="card border-0 mb-7">
                <div className="card-header bg-transparent border-0 p-0">
                  <div className="skeleton-box" style={{ width: '120px', height: '24px' }}></div>
                </div>
                <div className="card-body px-0 pt-4 pb-0">
                  <div className="skeleton-box mb-2" style={{ width: '100%', height: '16px' }}></div>
                  <div className="skeleton-box mb-2" style={{ width: '100%', height: '16px' }}></div>
                  <div className="skeleton-box mb-2" style={{ width: '100%', height: '16px' }}></div>
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="col-md-9">
              <div className="d-flex mb-6">
                <div className="skeleton-box" style={{ width: '200px', height: '20px' }}></div>
                <div className="ml-auto">
                  <div className="skeleton-box" style={{ width: '120px', height: '20px' }}></div>
                </div>
              </div>

              <div className="row">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="col-sm-6 col-lg-4 mb-8">
                    <div className="card border-0">
                      <div className="skeleton-box ratio ratio-1-1"></div>
                      <div className="card-body px-0 pt-4 pb-0">
                        <div className="skeleton-box mb-2" style={{ width: '60%', height: '16px' }}></div>
                        <div className="skeleton-box" style={{ width: '80%', height: '20px' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .skeleton-box {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </main>
  )
}


