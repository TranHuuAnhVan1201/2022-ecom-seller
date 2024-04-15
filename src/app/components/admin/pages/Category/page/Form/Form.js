import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal";
import * as actions from "../../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import axios from "axios";
import { useForm } from "react-hook-form";
function Form(props) {
    let { id } = props;
    const [product, setProduct] = useState({});
    const { register, errors, reset, setValue, handleSubmit } = useForm();
    const isDisplayForm = useSelector((state) => state.isDisplayForm);
    const [isModalOpen, toggleModal] = useState(isDisplayForm);
    const dispatch = useDispatch();
    //useEffect
    useEffect(() => {
        getProductDetail();

    }, []);

    const toggleModal6 = () => {
        toggleModal(false);
        props.onSetLogged();
        dispatch(actions.closeForm());
    };
    async function getProductDetail() {
        if (id) {
            const response = await axios.get(
              `http://localhost:4333/product/details/${id}`
            );
            console.log(response);
            // setValue('name', response.data.name, { shouldDirty: true });// set vào form
            setProduct(response.data);
        }

    }
    const onSubmit = (data, e) => {
        if (id !== null) {
            product.name = data.name;
            axios.put(`https://5fec7ae2595e420017c2be4d.mockapi.io/productjs/${id}`, product).then((data) => {
                toggleModal6();
                props.onReload("cập nhật thành công");
                e.target.reset(); // set form input trở thái bình thường
            }, (err) => {
                console.log(err);
            });
        } else {
            /// tự viết
            let JsonData = {
                "createdAt": "2021-02-02T20:05:38.450Z",
                "name": data.name,
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/megdraws/128.jpg"
            }
            axios.post(`https://5fec7ae2595e420017c2be4d.mockapi.io/productjs`, JsonData).then((data) => {
                toggleModal6();
                props.onReload("Thêm thành công");
                e.target.reset();
            }, (err) => {
                console.log(err);
            });
        }

    }
    return (
        <div className="Apps">
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                {id ? <h3>Sửa sản phẩm</h3> : <h3>Thêm sản phẩm</h3>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" name="name" ref={register({ required: true })} />
                            <small id="emailHelp" style={{ color: "red" }}>
                                {errors.name && "Vui lòng nhập giá trị Name"}
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                        &nbsp;
                        <button type="button" onClick={() => toggleModal6()} className="btn btn-default">Đóng</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Form;
