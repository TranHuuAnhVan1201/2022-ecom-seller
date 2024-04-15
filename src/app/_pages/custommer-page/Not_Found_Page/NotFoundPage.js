import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NotFoundPage.scss'
class NotFoundPage extends Component {
  render() {
    return (
      <div className="p404-container" style={{ marginTop: 70 }}>
        <div className="align-self-center">
          <h1>page 404</h1>
          <h2>UH OH! Wow.</h2>
          <p>
            Trang bạn đang tìm kiếm không tồn tại. Làm thế nào bạn có được ở đây là một bí ẩn. Nhưng
            bạn có thể nhấp vào nút bên dưới để quay lại trang chủ
          </p>

          <Link to="/" className="btn green">
            Go home
          </Link>
        </div>
      </div>
    )
  }
}
export default NotFoundPage
