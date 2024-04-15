import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { adminApiPr } from '../../../../../../api/private'
import lv0 from '../../../../../../newee/rank/lv0.png'
import lv1 from '../../../../../../newee/rank/lv1.png'
import lv2 from '../../../../../../newee/rank/lv2.png'
import lv3 from '../../../../../../newee/rank/lv3.png'
import lv4 from '../../../../../../newee/rank/lv4.png'
import imgLv0 from '../../../../../../newee/rank/ranking/ranklv0.png'
import imgLv1 from '../../../../../../newee/rank/ranking/ranklv1.png'
import imgLv2 from '../../../../../../newee/rank/ranking/ranklv2.png'
import imgLv3 from '../../../../../../newee/rank/ranking/ranklv3.png'
import imgLv4 from '../../../../../../newee/rank/ranking/ranklv4.png'
import './process.scss'

function RankBasic(props) {
  const {
    user,
    cart: { cartItems, cartLength },
    userInfo,
  } = useSelector((state) => state.FetchAllProduct)

  const [active, setActive] = useState(0)

  const [point, setPoint] = useState(0)
  const [line, setLine] = useState('80%')
  const [flag, setFlag] = useState('-1%')

  const [section, setSection] = useState('')
  const [avt, setAvt] = useState(null)
  const [imgLv, setImgLv] = useState(null)

  const handleClick = (id) => {
    console.log(typeof id)
    setActive(id)
    // setLine(data[id].line);
    setAvt(data[id].lv)
    setImgLv(data[id].imgLv)
  }

  var data = [
    {
      id: 0,
      className: 'step step01',
      title: 'LEVEL 0',
      line: '2%',
      flag: '-2%',
      lv: lv0,
      imgLv: imgLv0,
      section: 'SECTION LEVEL 0',
      description: '1 Description <br/> 2 <br/> 3',
    },
    {
      id: 1,
      className: 'step step02',
      title: 'LEVEL 1',
      line: '25%',
      flag: '24%',
      lv: lv1,
      imgLv: imgLv1,
      section: 'SECTION LEVEL 1',
      description: '2 Description <br/> 2 <br/> 3',
    },
    {
      id: 2,
      className: 'step step03',
      title: 'LEVEL 2',
      line: '50%',
      flag: '49%',
      lv: lv2,
      imgLv: imgLv2,
      section: 'SECTION LEVEL 2',
      description: '3 Description <br/> 2 <br/> 3',
    },
    {
      id: 3,
      className: 'step step04',
      title: 'LEVEL 3',
      line: '75%',
      flag: '74%',
      lv: lv3,
      imgLv: imgLv3,
      section: 'SECTION LEVEL 3',
      description: '4 Description <br/> 2 <br/> 3',
    },
    {
      id: 4,
      className: 'step step05',
      title: 'LEVEL 4',
      line: '100%',
      flag: '99%',
      lv: lv4,
      imgLv: imgLv4,
      section: 'SECTION LEVEL 4',
      description: '5 Description <br/> 2 <br/> 3',
    },
  ]

  useEffect(() => {
    actionPointRank()
  }, [])

  // ACTION = POINT RANK
  const actionPointRank = async () => {
    try {
      const response = await adminApiPr.getRanking(user.code)
      var calc = 0
      var fl = -1
      setPoint(response.point)

      if (response.point <= 5000000) {
        calc = (response.point * 25) / 5000000
        fl = calc - 3
        setLine(`${calc}%`)
        setFlag(`${fl}%`)
        console.log('calc TH1 => ', calc, fl)
        setImgLv(data[0].imgLv)
        setActive(0)
      } else if (5000000 < response.point && response.point <= 25000000) {
        calc = (response.point * 25) / 25000000 + 25

        fl = calc - 3
        setLine(`${calc}%`)
        setFlag(`${fl}%`)
        console.log('calc TH2 => ', calc, fl)
        setImgLv(data[1].imgLv)
        setActive(1)
      } else if (25000000 < response.point && response.point <= 50000000) {
        calc = (response.point * 50) / 50000000 + 25
        fl = calc - 3
        setLine(`${calc}%`)
        setFlag(`${fl}%`)
        console.log('calc TH3 => ', calc, fl)
        setImgLv(data[2].imgLv)
        setActive(2)
      } else if (50000000 < response.point && response.point <= 100000000) {
        calc = (response.point * 50) / 100000000 + 50
        fl = calc - 3
        setLine(`${calc}%`)
        setFlag(`${fl}%`)
        console.log('calc TH4 => ', calc, fl)
        setImgLv(data[3].imgLv)
        setActive(3)
      } else if (100000000 < response.point) {
        setLine(`100%`)
        setFlag(`98%`)
        console.log('TH5')
        setImgLv(data[4].imgLv)
        setActive(4)
      }
    } catch (error) {
      console.log('ranking', error)
    }
  }

  // FORMAT VND
  const formatVND = (str) => {
    if (typeof str !== 'string') {
      let toStr = String(str)

      if (toStr.split('.')[1] !== undefined) {
        return (
          toStr
            .split('.')[0]
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
              return (index % 3 ? next : next + ',') + prev
            }) +
          '.' +
          toStr.split('.')[1]
        )
      } else {
        return toStr
          .split('')
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ',') + prev
          })
      }
    }
  }

  return (
    <div className="rank">
      <div className="rank-header">
        <div className="d-flex-space-between col-lg-12 col-12 p-0 m-0">
          <div className="col-4 d-flex justify-content-center">
            <span className="text-right">
              Cấp bậc hiện tại <br />
              của bạn
            </span>
          </div>

          <div className="col-4 img-lv d-flex justify-content-center">
            <img
              className="imgLv"
              src={imgLv ? imgLv : imgLv0}
              height={130}
              alt="newee asia ranking"
            ></img>
          </div>
          <div className="col-4 money d-flex justify-content-center text-center">
            <span className="text-left">
              Doanh thu hiện tại <br />
              {formatVND(point)} Đ
            </span>
          </div>
        </div>
      </div>
      <div className="process-wrapper">
        <div className="header">
          <h2>Tiêu chí:</h2>
          <h3>
            Nhà Bán Hàng chỉ cần đạt được mức doanh thu tích luỹ ở cách mốc thì sẽ được lên cấp
          </h3>
        </div>
        <div id="progress-bar-container">
          <ul>
            {data.map((value, key) => {
              return (
                <li
                  className={
                    active === value.id || value.id < active
                      ? value.className + ' active'
                      : value.className
                  }
                  onClick={() => handleClick(value.id)}
                  key={key}
                >
                  <div className="arrow arrow-first"></div>
                  <div className="arrow arrow-second"></div>

                  <div className="step-inner">{value.title}</div>
                </li>
              )
            })}
          </ul>
          <div id="line">
            <div id="line-progress" style={{ width: line }} />
            <div id="flag" style={{ left: line }}>
              <div className="flag-hover">{formatVND(point)} VND</div>
            </div>
          </div>
        </div>

        <div id="progress-content-section">
          <div
            className={
              active === 0
                ? 'section-content discovery lv-0 active'
                : 'section-content discovery lv-0'
            }
          >
            <span className="caretup"></span>
            <h4>Doanh thu tích luỹ</h4>
            <h3> KHÔNG ÁP DỤNG</h3>
            <h2>LEVEL 0</h2>

            <div className="progess-content-flex">
              <p className="title">Tham gia chương trình khuyến mãi</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>
          </div>
          <div
            className={
              active === 1
                ? 'section-content strategy lv-1 active'
                : 'section-content strategy lv-1'
            }
          >
            <span className="caretup"></span>
            <h4>Doanh thu tích luỹ</h4>
            <h3> 5.000.000 VND</h3>

            <h2>LEVEL 1</h2>
            <div className="progess-content-flex">
              <p className="title">Tham gia chương trình khuyến mãi</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>

            <div className="progess-content-flex">
              <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
              <p className="icon">1%</p>
            </div>
          </div>
          <div
            className={
              active === 2
                ? 'section-content creative lv-2 active'
                : 'section-content creative lv-2'
            }
          >
            <span className="caretup"></span>
            <h4>Doanh thu tích luỹ</h4>
            <h3>25.000.000 VND </h3>

            <h2>LEVEL 2</h2>
            <div className="progess-content-flex">
              <p className="title">Tham gia chương trình khuyến mãi</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>
            <div className="progess-content-flex">
              <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
              <p className="icon">2%</p>
            </div>
            <div className="progess-content-flex">
              <p className="title">FreeShip đơn hàng tháng</p>
              <p className="icon">5</p>
            </div>
            <div className="progess-content-flex">
              <p className="title">Tham gia Newee's Seller Day</p>
              <p className="icon">
                {' '}
                <i className="fas fa-check"></i>
              </p>
            </div>
          </div>
          <div
            className={
              active === 3
                ? 'section-content production lv-3 active'
                : 'section-content production lv-3'
            }
          >
            <span className="caretup"></span>
            <h4>Doanh thu tích luỹ</h4>
            <h3> 50.000.000 VND</h3>

            <h2>LEVEL 3</h2>

            <div className="progess-content-flex">
              <p className="title">Tham gia chương trình khuyến mãi</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>
            <div className="progess-content-flex">
              <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
              <p className="icon">3%</p>
            </div>
            <div className="progess-content-flex">
              <p className="title">FreeShip đơn hàng tháng</p>
              <p className="icon">5</p>
            </div>
            <div className="progess-content-flex">
              <p className="title">Tham gia Newee's Seller Day</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>
          </div>
          <div
            className={
              active === 4
                ? 'section-content analysis lv-4 active'
                : 'section-content analysis lv-4'
            }
          >
            <span className="caretup"></span>
            <h4>Doanh thu tích luỹ</h4>
            <h3>100.000.000 VND </h3>

            <h2>LEVEL 4</h2>

            <div className="progess-content-flex">
              <p className="title">Tham gia chương trình khuyến mãi</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>

            <div className="progess-content-flex">
              <p className="title">Thưởng thêm dựa trên mốc đạt level.</p>
              <p className="icon">5%</p>
            </div>
            <div className="progess-content-flex">
              <p className="title">FreeShip đơn hàng tháng</p>
              <p className="icon">10</p>
            </div>
            <div className="progess-content-flex">
              <p className="title">Tham gia Newee's Seller Day</p>
              <p className="icon">
                <i className="fas fa-check"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankBasic
