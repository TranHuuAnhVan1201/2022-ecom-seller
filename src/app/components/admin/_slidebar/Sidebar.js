import React, { useState } from 'react'
// import adminVi from "../../../../newee/admin-nav/vi.png";
import { AiOutlineFileSearch, AiOutlineUser, AiFillIdcard, AiOutlineUsergroupAdd, AiOutlineContacts, AiOutlineBarChart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
function Sidebar(props) {
    const [toggle, setToggle] = useState(false)
    const [active, setActive] = useState(2)
    const collapseSidebarDashboard = (toggle, id) => {
        setActive(id)
        props.collapseSidebar(!toggle)
        setToggle(!toggle)
    }

    return (
        <div className="nw-sidebar v0404-2022">
            <ul className="nw-sidebar-nav">
                <li className="nw-sidebar-nav-item">
                    <Link
                        to={'/admin/users'}
                        className={
                            active === 2 ? 'nw-sidebar-nav-link active' : 'nw-sidebar-nav-link'
                        }
                        onClick={() => collapseSidebarDashboard(toggle, 2)}
                    >
                        <div className="nw-icon">
                            <AiOutlineUser />
                        </div>
                        <span>Tài khoản</span>
                    </Link>
                </li>

                <li className="nw-sidebar-nav-item">
                    <Link
                        to={'/admin/sale'}
                        className={
                            active === 4 ? 'nw-sidebar-nav-link active' : 'nw-sidebar-nav-link'
                        }
                        onClick={() => collapseSidebarDashboard(toggle, 4)}
                    >
                        <div className="nw-icon">
                            <AiOutlineFileSearch />
                        </div>

                        <span>Đơn hàng</span>
                    </Link>
                </li>

                <li className="nw-sidebar-nav-item">
                    <Link
                        to={'/admin/banking'}
                        className={
                            active === 6 ? 'nw-sidebar-nav-link active' : 'nw-sidebar-nav-link'
                        }
                        onClick={() => collapseSidebarDashboard(toggle, 6)}
                    >
                        <div className="nw-icon">
                            <AiFillIdcard />
                        </div>

                        <span>Ví</span>
                    </Link>
                </li>
                <li className="nw-sidebar-nav-item">
                    <Link
                        to={'/admin/analysis-bank'}
                        className={
                            active === 7 ? 'nw-sidebar-nav-link active' : 'nw-sidebar-nav-link'
                        }
                        onClick={() => collapseSidebarDashboard(toggle, 7)}
                    >
                        <div className="nw-icon">
                            <AiOutlineBarChart />
                        </div>
                        <span>Doanh thu</span>
                    </Link>
                </li>

                <li className="nw-sidebar-nav-item">
                    <Link
                        to={'/admin/custommer'}
                        className={
                            active === 8 ? 'nw-sidebar-nav-link active' : 'nw-sidebar-nav-link'
                        }
                        onClick={() => collapseSidebarDashboard(toggle, 8)}
                    >
                        <div className="nw-icon">
                            <AiOutlineContacts />
                        </div>

                        <span>Danh sách khách hàng</span>
                    </Link>
                </li>

                {/* <li className="sidebar-nav-item">
          <Link
            to={'/admin/notifications'}
            className={active === 9 ? 'sidebar-nav-link active' : 'sidebar-nav-link'}
            onClick={() => collapseSidebarDashboard(toggle, 9)}
          >
            <div>
              <i className="fas fa-bell" />
            </div>
            <span>Thông báo</span>
          </Link>
        </li> */}
            </ul>
        </div>
    )
}

export default Sidebar
