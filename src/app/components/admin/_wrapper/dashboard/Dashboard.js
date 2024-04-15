import React from 'react'

function Dashboard(props) {
  return (
    <div className="content">
      <div className="row">
        <div className="col-3 col-m-6 col-sm-6">
          <div className="counter bg-primary">
            <p>
              <i className="fas fa-tasks" />
            </p>
            <h3>100+</h3>
            <p>To do</p>
          </div>
        </div>
        <div className="col-3 col-m-6 col-sm-6">
          <div className="counter bg-warning">
            <p>
              <i className="fas fa-spinner" />
            </p>
            <h3>100+</h3>
            <p>In progress</p>
          </div>
        </div>
        <div className="col-3 col-m-6 col-sm-6">
          <div className="counter bg-success">
            <p>
              <i className="fas fa-check-circle" />
            </p>
            <h3>100+</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="col-3 col-m-6 col-sm-6">
          <div className="counter bg-danger">
            <p>
              <i className="fas fa-bug" />
            </p>
            <h3>100+</h3>
            <p>Issues</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-m-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3>Doanh thu</h3>
              <div className="toolbar">
                <div className="btn-group">
                  <label className="btn btn-larger btn-outline-secondary">
                    <input id="option-1" type="radio" name="options" autoComplete="off" />
                    Day
                  </label>
                  <label className="btn btn-larger btn-outline-secondary active">
                    <input id="option-2" type="radio" name="options" autoComplete="off" />
                    Month
                  </label>
                  <label className="btn btn-larger btn-outline-secondary">
                    <input id="option-3" type="radio" name="options" autoComplete="off" />
                    Year
                  </label>
                </div>
              </div>
            </div>
            <div className="card-content"></div>
            <div className="card-content"></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8 col-m-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3>Table</h3>
              <i className="fas fa-ellipsis-h" />
            </div>
            <div className="card-content"></div>
          </div>
        </div>
        <div className="col-4 col-m-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3>Progress bar</h3>
              <i className="fas fa-ellipsis-h" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
