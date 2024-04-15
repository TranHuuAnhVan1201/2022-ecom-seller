import React, { useEffect } from "react";
import BarPage from "../chart/BarPage";
import DoughnutPage from "../chart/DoughnutPage";
import './HomeAdmin.scss';


function HomeAdmin(props) {
  useEffect(() => { }, []);
  
  return (


    <div className="page-container">
      {/* Content Wrapper START */}
      <div className="main-content">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="avatar avatar-icon avatar-lg avatar-blue">
                    <i className="anticon anticon-dollar" />
                  </div>
                  <div className="m-l-15">
                    <h2 className="m-b-0">$23,523</h2>
                    <p className="m-b-0 text-muted">Profit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="avatar avatar-icon avatar-lg avatar-cyan">
                    <i className="anticon anticon-line-chart" />
                  </div>
                  <div className="m-l-15">
                    <h2 className="m-b-0">+ 17.21%</h2>
                    <p className="m-b-0 text-muted">Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="avatar avatar-icon avatar-lg avatar-gold">
                    <i className="anticon anticon-profile" />
                  </div>
                  <div className="m-l-15">
                    <h2 className="m-b-0">3,685</h2>
                    <p className="m-b-0 text-muted">Orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="avatar avatar-icon avatar-lg avatar-purple">
                    <i className="anticon anticon-user" />
                  </div>
                  <div className="m-l-15">
                    <h2 className="m-b-0">1,832</h2>
                    <p className="m-b-0 text-muted">Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Sản phẩm bán chạy nhất</h5>
                  <div>
                    <div className="btn-group"></div>
                  </div>
                </div>
                <div className="m-t-5" style={{ height: 350 }}>
                  <BarPage />
                  {/* <canvas className="chart" id="revenue-chart" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="m-b-0">Customers</h5>
                <div className="m-v-20 text-center" style={{ height: 150 }}>
                  <DoughnutPage />
                </div>
                <div className="row border-top p-t-25">
                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <div className="media align-items-center">
                        <span className="badge badge-success badge-dot m-r-10" />
                        <div className="m-l-5">
                          <h4 className="m-b-0">350</h4>
                          <p className="m-b-0 muted">New</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <div className="media align-items-center">
                        <span className="badge badge-secondary badge-dot m-r-10" />
                        <div className="m-l-5">
                          <h4 className="m-b-0">450</h4>
                          <p className="m-b-0 muted">Return</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <div className="media align-items-center">
                        <span className="badge badge-warning badge-dot m-r-10" />
                        <div className="m-l-5">
                          <h4 className="m-b-0">100</h4>
                          <p className="m-b-0 muted">Others</p>
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
      {/* Content Wrapper END */}
    </div>
  );
}

export default HomeAdmin;
