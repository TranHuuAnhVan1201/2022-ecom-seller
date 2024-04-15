import React, { useState, useEffect } from "react";
import "./custommer.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormNewee from "../Sale/page/Form/FormNewee";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_actions/custommer/isDisplayForm/DisplayForm";
import apiLocalhost0 from "../../../../_untils/apiLocalhost0";

export default function Custommer() {

    const [listCustommer, setListCustommer] = useState(null);
    useEffect(() => {
      
        GetListCustommer(1, 100);

    }, [])
    

    const GetListCustommer = (index, total) => {
    
        apiLocalhost0(`Newee/Customer/GetList/${index}/${total}`, "GET", null)
            .then((res) => {
                console.log('6 - custommer',res);
                setListCustommer(res.data.data);
            })

            .catch((err) => {

                console.log(err);
            });
    }

    const TableBody = () => {
        console.log(listCustommer);

        return (
            listCustommer !== null ?
                listCustommer.map((value, key) => {
                    return (
                        <tr key={key} >
                            <td>{key + 1}</td>
                            <td>{value.id}</td>
                            <td>{value.firstName + " " +value.lastName}</td>
                            <td>{value.phone}</td>
                            <td>{value.address}</td>
                            <td>{value.lastBuy}</td>
                        </tr>
                    )
                }
               
            ) : (
                <tr>
                    <td>Chua co thong tin</td>
                   
                </tr>
            )
        )
    }
    
    return (
        <div className="body-cate analysis custommer">
            <h2>TỔNG QUAN KHÁCH HÀNG</h2>
            <div className="row">

                <div className="newee-col-6 col-lg-4 col-md-6 col-sm-6 mb-4" >
                    <div className="card card-small">
                        <span>TỔNG QUAN KHÁCH HÀNG <br /> </span>
                        <span>{ listCustommer !== null ? listCustommer.length : 0}</span>
                    </div>
                </div>
                <div className="newee-col-6 col-lg-4 col-md-6 col-sm-6 mb-4" >
                    <div className="card card-small">
                        <span> SỐ LƯỢNG KHÁCH HÀNG MỚI TRONG THÁNG</span>
                        <span>{ listCustommer !== null ? listCustommer.length : 0}</span>
                    </div>
                </div>
                    


            </div>
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="card card-small h-100">                    
                        <div className="card-body d-flex py-0">
                            <table className="table table-overflow" >
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>MÃ KHÁCH HÀNG</th>
                                        <th>HỌ VÀ TÊN</th>
                                        <th>SỐ ĐIỆN THOẠI</th>
                                        <th >ĐỊA CHỈ</th>
                                        <th >GHI CHÚ</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                   <TableBody />
                                </tbody>
                            </table>
                        </div>
                    
                    </div>
                </div>
            </div>
       </div>
    )
}


