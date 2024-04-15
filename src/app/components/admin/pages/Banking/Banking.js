/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import apiLocalhost0 from "./../../../../_untils/apiLocalhost0";
import Doanhthu_Item from "./pages/Doanhthu_Item";
import Request_Item from "./pages/Request_Item";
import "./scss/Bank.scss";



  const formatVND = (str) => {
    if (typeof str !== "string") {
      let toStr = String(str);
      

      
      if (toStr.split(".")[1] !== undefined) {
        return toStr.split(".")[0]
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        }) + "." + toStr.split(".")[1];
      } else {
        return toStr
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        })
      }
    }
  };


function Banking(props) {
    const dataLogin = useSelector((state) => state.Login.dataLogin);
    console.log(dataLogin);
    const [route, setRoute] = useState('home');
    const [state, setState] = useState({
        ammount: 0,
        errors: [],
        memo: {
            text: "",
            len: 0
        },
    });
    const [gPrice, setGPrice] = useState(null);
    const [dataReq, setDataReq] = useState(null);
    const [dataReqs, setDataReqs] = useState(null);
    const [dataMoney, setDataMoney] = useState(null);

    const [dataDeals, setDataDeals] = useState(null);
    const [dataDeal, setDataDeal] = useState(null);
    const [activeLinks, setActiveLinks] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [filter, setFilter] = useState(false);
    

    const [personalSales, setPersonalSales] = useState(null);
    const [groupSales, setGroupSales] = useState(null);
    const [personalCommission, setPersonalCommission] = useState(null);
    const [teamBouns, setTeamBouns] = useState(null);

    const [isCheck, setIsCheck] = useState(false);
   
    useEffect(() => {
       

        GetPrice();
        GetListBillSeller();
        GetListBillMONEY();
        GetListDeal(1, 100);
        
        // Home
        getPersonalSales();
        getGroupSales();
        getPersonalCommission();
        getTeamBouns();

    }, [])
    
    
    // ACTIONS
    //Handle Form Submitting
    // RUT TIEN
    const handleSubmitUser = (event) => {
        event.preventDefault();
        if (state.ammount > gPrice.leftMoney) {
            setState({ ammount: gPrice.leftMoney })
        }
        if (state.ammount > 99999) {
                alert(state.ammount)
        
                apiLocalhost0(`Newee/RequestPay/Request`, "POST", `${state.ammount}`)
                .then((res) => {
                    console.log('request', res);
                    GetListBillSeller();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thông báo: Yêu cầu rút tiền thành công!",
                        text: "Yêu cầu của bạn đã được chúng tôi ghi nhận, Newee sẽ tiến hành thanh toán sau khi hệ thống xác nhận yêu cầu hợp lệ. Thời gian xác nhận có thể kéo dài 3 – 5 tiếng. Mong bạn thông cảm.",
                        showConfirmButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Đồng ý",
                    
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.setTimeout(window.location.reload.bind(window.location), 100);
                        }});

                    GetListBillSeller();
                    setState({
                        ...state,
                        ammount: 0
                    })
                
                })
                .catch((err) => {
                    Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Thông báo: Yêu cầu rút tiền không thành công! Số tiền không hợp lệ!",
                    showConfirmButton: true,
                    timer: 5000,
                    });
                    console.log(err.response)
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Thông báo: Yêu cầu rút tiền không thành công! Số tiền không hợp lệ!",
                    showConfirmButton: true,
                    timer: 5000,
                });
            }

       
        
    };
    function handleChangeValueUser(event) {
        event.preventDefault();
        setIsCheck(false);
            
        var value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value,
        });

        setTimeout(() => {
            if (state.ammount > gPrice.leftMoney){
                setState({ ...state, ammount: gPrice.leftMoney })
            }
            setIsCheck(true)
        }, [300])
        // console.log(event.target.value);
        
    }
    
    //  1. HIỂN THỊ SỐ TIỀN
    const GetPrice = () => {
        apiLocalhost0(`Newee/Manager/Private/GetPaySeller`, "GET", null)
            .then((res) => {
                setGPrice(res.data);
                
            })
            .catch((err) => console.log(err.response));
    }

    // 1. HOME - DOANH THU BÁN HÀNG CÁ NHÂN
    const getPersonalSales = () => {
        apiLocalhost0(`Newee/Manager/Private/Revenue`, "GET", null)
            .then((res) => {
                console.log('1.1 - HOME - DOANH THU BÁN HÀNG CÁ NHÂN: ', res.data);
                setPersonalSales(res.data);
              
            })
            .catch((err) => console.log(err.response));
    }
    const getGroupSales = () => {
        apiLocalhost0(`Newee/Manager/Private/Revenue-SellerDown`, "GET", null)
            .then((res) => {
                console.log('1.2 - HOME - DOANH THU BÁN HÀNG NHÓM: ', res);
                setGroupSales(res.data);
              
            })
            .catch((err) => console.log(err.response));
    }
    const getPersonalCommission = () => {
        apiLocalhost0(`Newee/Manager/Private/SumBonus`, "GET", null)
            .then((res) => {
                console.log('1.3 - HOME - HOA HONG CA NHAN: ', res);
                setPersonalCommission(res.data);
              
            })
            .catch((err) => console.log(err.response));
    }
    const getTeamBouns = () => {
        apiLocalhost0(`PrivatePay/SumBonusSellerDown`, "GET", null)
            .then((res) => {
                console.log('1.4 - HOME - THUONG NHOM: ', res);
                setTeamBouns(res.data);
              
            })
            .catch((err) => console.log(err.response));
    }
        
    //  3. TRANG LỊCH SỬ YÊU CẦU
        const onClickStatus = (value, key,filter) => {
           
            setActiveLinks(key);

            console.log(filter);
          
            
            if (filter === '') {
                setDataDeal(dataDeals);
            } else {
                var array = dataDeals.filter((item) => item.action === filter);
                
                setDataDeal(array);
            }
            
        };
    
        const onClickStatusReq = (value, key,filter) => {
           
            setActiveLinks(key);

            console.log(filter);
          
            
            if (filter === '') {
                setDataReq(dataReqs);
            } else {
                var array = dataReqs.filter((item) => item.status === filter);
                
                setDataReq(array);
            }
            
        };
    
        const GetListBillSeller = (codeSeller) => {
            apiLocalhost0(`Newee/RequestPay/GetRequestAllByIdSeller/1/1000`, "GET", null)
                .then((res) => {
                    console.log('request BILL SELLER',res);
                    var sort = res.data.data.sort(function(a,b) { 
                        return new Date(b.createTime).getTime() - new Date(a.createTime).getTime() 
                    });
                    console.log('sort => ',sort);
                    setDataReq(sort);
                    setDataReqs(sort);
                })
                .catch((err) => console.log(err.response));
        }
        // HUY YEU CAU RUT TIEN
        const onCancel = async(id) => {
            Swal.fire({
            title: "Bạn có chắc không?",
            text: "Bạn không thể khôi phục yêu cầu này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    console.log(id);
                    ChangeToCancel(id);
                    setConfirm(!confirm);
                    Swal.fire(
                        "Hủy yêu cầu thành công!",
                        "Your file has been deleted.",
                        "success"
                    );
                }
            });
        };
        const ChangeToCancel = async (id) => {
            console.log('cancel', id)
            // var idCancel = JSON.stringify(id);
            
           await apiLocalhost0(`Newee/RequestPay/Cancel`, "POST", `${JSON.stringify(id)}`)
            .then((res) => {
                Swal.fire({
                // position: "top-end",
                icon: "success",
                title: "Hủy yêu cầu rút tiền thành công!",
                showConfirmButton: true,
                confirmButtonColor: "#3085d6",
                // timer: 5500,
                }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    console.log(res);
                    window.setTimeout(window.location.reload.bind(window.location), 100);
                }
            });;
               
            })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response);
                    setConfirm(!confirm);
            });
        };
    
    //  4. TRANG DOANH THU  
        const GetListBillMONEY = (codeSeller) => {
            apiLocalhost0(`newee/bill-plus/getlist-billby-codeseller?codeSeller=${dataLogin.code}`, "GET", null)
                .then((res) => {
                    console.log('request MONEY',res);
                    
                    setDataMoney(res);
                })
                .catch((err) => console.log(err.response));
        }
    
    
    // 5. TRANG GIAO DICH
     const GetListDeal = (index, total) => {
        
            apiLocalhost0(`Newee/HistoryPay/GetHistoryPaySellerAll/${index}/${total}`, "GET", null)
                .then((res) => {
                    console.log('5 - get list Data Deal',res);
                    
                     var sort = res.data.data.sort(function(a,b) { 
                        return new Date(b.dateComplete).getTime() - new Date(a.dateComplete).getTime() 
                     });
                    
                    setDataDeal(sort);
                    setDataDeals(sort);
                })

                .catch((err) => {
                   
                    console.log(err);
                });
        }
   
    
    
    
    // END ACTIONS


    //*****************
    //------UI--------
    //
    const Header = (props) => {
        return (
            <div className='bank-header'>
                <nav className="bank-menu">
                    <div className="bank-title">VÍ NEWEE <br />
                        {formatVND(gPrice !== null && gPrice.leftMoney ? gPrice.leftMoney : 0)} VND</div>
                    <ul className="bank-ul">
                   
                        <li><label htmlFor="chkMenu" onClick={() => props.setRoute("home")}>Tổng quan</label></li>
                        <li><label htmlFor="chkMenu" onClick={() => props.setRoute("withdraw")}>Rút tiền</label></li>
                        <li><label htmlFor="chkMenu" onClick={() => props.setRoute("request")}>Lịch sử yêu cầu</label></li>
                        <li><label htmlFor="chkMenu" onClick={() => props.setRoute("history")}>Lịch sử giao dịch</label></li>
                       
                    
                    </ul>
                </nav>
            </div>
        );
    }
    const Profile = (props) => {
        return (
            <div className="transfer-activity profile">
                <h3>DOANH THU BÁN HÀNG CÁ NHÂN</h3>

                <SimpleTable data={processedData} />
                <h4>DOANH THU BÁN HÀNG NHÓM</h4>
                <SimpleTable data={pendingData} />
            </div>
        );
    }
    class SimpleTable extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                header: []
            }
        }
    
        componentWillMount() {
            this.setState({ header: Object.getOwnPropertyNames(this.props.data[0]) });
        }
    
        renderHeader(columns) {
            return (
                <thead>
                    <tr>
                        {columns.map((column, index) => {
                            return (
                                <td key={index}>{column}</td>
                            );
                        })}
                    </tr>
                </thead>
            );
        }
    
        renderBody(rows, columns) {
            return (
                <tbody>
                    {rows.map((row, index) => {
                        return (
                            <tr key={index}>
                                {columns.map((column, innerIndex) => {
                                    return (
                                        <td key={innerIndex}>{row[column]}</td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            );
        }
    
        render() {
            if (this.state.header.length === 0) return false;
            return (
                <div className="transfer-activity-table">
                    <table className="">
                        {this.renderHeader(this.state.header)}
                        {this.renderBody(this.props.data, this.state.header)}
                    </table>
                </div>
            );
        }
    }
    const pendingData = [
        { Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
        { Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
        { Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
        { Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
        { Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" },
        { Type: "Automatic", Amount: "$2.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/23/2016" }
    ];

    const processedData = [
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
        { Type: "Automatic", Amount: "$5.99", From: "Account 1", To: "Account 2", "Transaction Date": "05/24/2016" },
    ];
    class Select extends React.Component {
    
        constructor(props) {
            super(props);
        }
        
        componentWillMount() {
            //Load Data here!
        }
        
        render() {
            return (
                <fieldset className={this.props.css_class}>
                    <label>{this.props.title}</label>
                    <i className="fa fa-user fa-fw"></i>
                    <select onChange={this.props.onChange} value={this.props.account}>
                        {this.props.serverResponse.map((option) => {
                            return (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
                </fieldset>
            );
        }
    }
    const Memo = (props) => {
        return (
            <fieldset>
                <label className="main-label">Memo (OPTIONAL: Maximum of {props.maxlen} characters)</label>
                <textarea maxLength={props.maxlen} id="memoText" onChange={props.onChange} value={props.memo.text} />
                <span>{props.maxlen - props.memo.len} characters remaining.</span>
            </fieldset>
        );
    }

    const Home = () => {
        return (
            <div className="row">
                <div className="newee-col-6 col-lg-6 col-12" >
                    <div className="card card-small text-center">
                        <div className="card-header mx-3 mx-ms-0">
                            <h4 className="title">DOANH THU BÁN HÀNG CÁ NHÂN</h4>
                       
                        </div>
                        <div className="card-body px-3 px-xs-0">
                            <span> {formatVND( personalSales !== null  ? personalSales.revenue : 0)} VND</span>
                        </div>
                    </div>
                </div>
                <div className="newee-col-6 col-lg-6 col-12" >
                    <div className="card text-center">
                        <div className="card-header mx-3 mx-ms-0">
                            <h4 className="title">DOANH THU BÁN HÀNG NHÓM</h4>
                       
                        </div>
                        <div className="card-body px-3 px-xs-0">
                              <span> {formatVND( groupSales !== null  ? groupSales.revenue : 0)} VND</span>
                        </div>
                    </div>
                </div>
                <div className="newee-col-6 col-lg-6 col-12" >
                    <div className="card text-center">
                        <div className="card-header mx-3 mx-ms-0">
                            <h4 className="title">HOA HỒNG CÁ NHÂN</h4>
                       
                        </div>
                        <div className="card-body px-3 px-xs-0">
                              <span> {formatVND( personalCommission !== null  ? personalCommission.moneyBonus : 0)} VND</span>
                        </div>
                    </div>
                </div>
                <div className="newee-col-6 col-lg-6 col-12" >
                    <div className="card text-center">
                        <div className="card-header mx-3 mx-ms-0">
                            <h4 className="title">THƯỞNG NHÓM</h4>
                       
                        </div>
                        <div className="card-body px-3 px-xs-0">
                           <span> {formatVND( teamBouns !== null  ? teamBouns.moneyBonus : 0)} VND</span>
                           {/* <span> {formatVND( personalSales !== null  ? personalSales.revenue * 5 / 100 : 0)} VND</span> */}
                        </div>
                    </div>
                </div>
                <div className="row m-auto">
                    <div className="col-12">
                        

                        <div className="btn btn-primary" >
                            <Link
                                to="/admin/analysis-bank"
                                style={{ color: 'white', cursor: 'pointer', fontWight: '600' }}> Xem chi tiết</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
          
        )
    }

    // 3. YÊU CẦU
    const Request = () => {
       
       
        console.log('data Req',dataReq);

        return (
            <div className="transfer-activity profile">
                
                <nav>
                    {link.map((value, key) => {
                    return (
                        <li
                        onClick={() => onClickStatusReq(value, key, value.filter)}
                        className={key === activeLinks ? "active" : ""}
                        key={key}
                        >
                        {value.nameVi}
                        </li>
                    );
                    })}
                </nav>
                
                      <div className="bd-example">
                        <table className="table table-bordered">
                        <thead>
                            <tr className="text-left">
                                <th>STT</th>
                                <th>MÃ GIAO DỊCH </th>
                                <th>THỜI GIAN TẠO</th>
                                <th>THỜI GIAN XỬ LÝ</th>
                                <th>SỐ TIỀN</th>
                                <th>TRẠNG THÁI</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {dataReq !== null
                            ? dataReq.map((value, index) => {
                                return (

                                <Request_Item
                                    value={value} 
                                    links={links}
                                    index={index}
                                    key={index}
                                    onCancel={onCancel}
                                />

                                );
                            })
                            : "Chưa có đơn hàng"}
                        </tbody>
                    </table>
                </div>
                

               
            </div>
        )
    }
        // NAV
        const links = [
            {
                id: 0,
                nameVi: "Tất cả",
                nameEn: "All",
                className: "active",
                filter: '',
                
            },
            {
                id: 1,
                nameVi: "Tiền Chuyển Vào",
                nameEn: "In",
                className: "",
                filter: 'cộng vào',
            },
            {
                id: 2,
                nameVi: "Tiền Chuyển Ra",
                nameEn: "Out",
                className: "",
                filter: 'trừ ra'
            },
          
           
        
        
        ];
        const link = [
            {
                id: 0,
                nameVi: "Tất cả",
                nameEn: "All",
                className: "active",
                filter: '',
                
            },
            {
                id: 1,
                nameVi: "Yêu Cầu",
                nameEn: "In",
                className: "",
                filter: 'yêu cầu',
            },
            {
                id: 2,
                nameVi: "Đã Duyệt",
                nameEn: "Out",
                className: "",
                filter: 'đã duyệt'
            },
            {
                id: 3,
                nameVi: "Đã Chuyển Khoản",
                nameEn: "success",
                className: "",
                filter: 'đã chuyển khoản'
            },
            {
                id: 4,
                nameVi: "Huỷ Bỏ",
                nameEn: "cancel",
                className: "",
                filter: 'hủy bỏ'
            },
          
           
        
        
        ];
    
        // REQUEST BODY
        

    // 4. DOANH THU
    const Money = () => {
        // const [check, setCheck] = false;
       
        console.log('488 - dataMoney',dataMoney);

        return (
            <div className="transfer-activity profile">
                
                <nav>
                    {links.map((value, key) => {
                    return (
                        <li
                        onClick={() => onClickStatus(value, key)}
                        className={key === activeLinks ? "active" : ""}
                        key={key}
                        >
                        {value.nameVi}
                        </li>
                    );
                    })}
                </nav>
                
                      <div className="bd-example">
                        <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Mã Đơn Hàng</th>
                                <th> Ngày đặt hàng</th>
                                {/* <th className="th-center">Tổng tiền</th> */}
                                <th className="th-center" style={{textAlign: 'right'}}>Hoa hồng</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {dataMoney !== null
                            ? dataMoney.data.data.map((value, index) => {
                                return (

                                <Doanhthu_Item
                                    value={value}
                                    links={links}
                                    index={index}
                                    key={index}
                                    // onDeleteId={onDeleteId}
                                    // onEdit={onEdit}
                                    // onCancel={onCancel}
                                />

                                );
                            })
                            : "Chưa có đơn hàng"}
                        </tbody>
                    </table>
                </div>
                

              
            </div>
        )
    }

    // 5. GIAO DICH

    const Deal = () => {

     console.log('5 - Deal => ', dataDeal);

        return (
            <div className="transfer-activity profile">
                
                <nav>
                    {links.map((value, key) => {
                    return (
                        <li
                        onClick={() => onClickStatus(value, key, value.filter)}
                        className={key === activeLinks ? "active" : ""}
                        key={key}
                        >
                        {value.nameVi}
                        </li>
                    );
                    })}
                </nav>
                
                      <div className="bd-example">
                        <table className="table table-bordered">
                        <thead>
                            <tr className="text-left">
                                <th>Thời gian giao dịch</th>
                                <th>Mã giao dịch</th>
                                <th>Ghi chú</th>
                                <th>Hành động</th>
                                <th className="text-center">Số tiền</th>

                            
                            </tr>
                        </thead>
                        <tbody>
                            {dataDeal !== null
                            ? dataDeal.map((value, index) => {
                               
                                    return (

                                    <tr className="order" key={index}>
                                      
                                        
                                            <td>{value.dateComplete}</td>
                                            <td>{value.id}</td>
                                            <td>{value.note }</td>
                                           
                                            <td><span className={`badge badge-1 ${value.action === 'trừ ra' ? ' btn-danger' : ' btn-success'}`}>{value.action}</span></td>
                                            <td className="td-right">{formatVND(value.money)} ₫</td>
                                    
                                        </tr>
                                );
                               
                            })
                            : "Chưa có đơn hàng"}
                        </tbody>
                    </table>
                </div>
                

              
            </div>
        )
    }

    //  END UI
        
    return (
        <div className="body-cate analysis banking">
            {/* <h2>THÔNG TIN VÍ </h2> */}

            <Header setRoute={setRoute} />
            <div className="bank-body">
                {route === 'home'
                    ? <Home />
                    : route === 'withdraw' ? (<div className="form-actions">
                        {/* <h3>Transfer Funds</h3> */}
                        <div className="col-xl-12">
                            <div className="card ">
                                <div className="card-header px-xs-0 mx-3 mx-xs-0 m-auto text-center">
                                    <ul>
                                        <li className="first">
                                            TÀI KHOẢN NGÂN HÀNG
                                            <br />
                                            - CHỦ SỞ HỮU: {dataLogin.holderName ? dataLogin.holderName : 'Chưa cập nhập'}
                                            <br />
                                            - SỐ TÀI KHOẢN: {dataLogin.accountNumber ? dataLogin.accountNumber : 'Chưa cập nhập'}
                                            <br />
                                            - NGÂN HÀNG: {dataLogin.bankName ? dataLogin.bankName : 'Chưa cập nhập'}

                                        </li>
                                        <li className="li-2">Nếu thông tin ngân hàng sai hoặc chưa cập nhập Vui lòng cập nhật tài khoản ngân hàng của bạn
                                            
                                            <Link
                                                to="/admin/users/editBank"
                                                style={{ color: '#007bff', cursor: 'pointer', fontWight: '600' }}> TẠI ĐÂY</Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body px-xs-0 mx-xs-0 m-auto">
                                    <form
                                        onSubmit={handleSubmitUser}
                                        method="post"
                                        name="myform2"
                                        className="personal_validate"
                                        noValidate="novalidate"
                                        id="edit-user"
                                    >
                                        <div className="d-flex-column-space-between">
                                            <div className="col-xl-12 col-12 text-center">
                                                <label className="text-center">Nhập số tiền muốn rút:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={state.ammount}
                                                    name="ammount"
                                                    onChange={handleChangeValueUser}
                                                    
                                                    required
                                                />
                                            </div>
                                            <span style={{paddingBottom: 10}}>Lưu ý: Số tiền rút tối thiểu là 100.000 ₫</span>
                                            <button
                                                type="submit"
                                                className="btn btn-success waves-effect"
                                            >
                                                Xác nhận
                                            </button>
                                           
                                        </div>
                                    </form>
                                </div>
                             
                            </div>
                        </div>
                    </div>)
                        : route === 'request' ? <Request />
                        : route === 'history' ? <Deal /> 
                        : null}
                            
            </div>
          
            
        </div>
    );

}

export default Banking;