import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal";
import * as actions from "./../../../../../../_actions/custommer/isDisplayForm/DisplayForm";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Form.scss";

function Form(props) {
  let { id } = props;
  const [product, setProduct] = useState({});
  const { register, errors, reset, setValue, handleSubmit, watch } = useForm();
  const isDisplayForm = useSelector((state) => state.isDisplayForm);
  const [isModalOpen, toggleModal] = useState(isDisplayForm);
  const [state, setState] = useState({
    list: [],
    path: [],
    listImage: [],
    productID: [],
  });

  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    //
    if (id === null) {
      connectImgToProduct();
    }
    // sửa.
    if (id && state.productID.length === 0) {
      getProductDetail();
    }
    //
    connectImgToProduct();
  }, [state.productID, success]);

  const toggleModal6 = () => {
    toggleModal(false);
    props.onSetLogged();
    dispatch(actions.closeForm());
  };

  // thêm mới.
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "laptop");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/cv-thav-herokuapp-com/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    let image = {
      type: "image",
      url: `${file.secure_url}`,
    };

    //up ảnh lấy id

    let aw = await axios.post(`http://localhost:4333/product/add`, image).then(
      (res) => {
        console.log("Post Image success");
        if (id) {
          setState({
            ...state,
            productID: [...state.productID, id],
            list: [...state.list, ...e.target.files],
            path: [...state.path, `${file.secure_url}`],
            listImage: [...state.listImage, `${res.data.image}`],
            userID: 12,
          });
        } else {
          setState({
            ...state,
            list: [...state.list, ...e.target.files],
            path: [...state.path, `${file.secure_url}`],
            listImage: [...state.listImage, `${res.data.image}`],
            userID: 12,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // post product
  const upProduct = async (data) => {
    await axios.post(`http://localhost:4333/product/adds`, data).then(
      (res) => {
        console.log("Post product success");
        setState({
          ...state,
          productID: [...state.productID, res.data.product],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // connect
  const connectImgToProduct = () => {
    if (state.productID.length > 0) {
      state.listImage.forEach((element, index) => {
        let connect = {
          image_id: parseInt(element),
          product_image: id ? id : state.productID,
          main_image: index === 0 ? (id ? 0 : 1) : 0,
        };
        axios.post(`http://localhost:4333/product/connect`, connect).then(
          (res) => {
            console.log("data post connect img to product success");
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
  };
  // end connect

  // end thêm mới.
  // sửa
  // 1. load dữ liệu ra form.
  async function getProductDetail() {
    if (id) {
      const response = await axios.get(`http://localhost:4333/product/${id}`);
      // [
      //   { name: "name", value: "name" },
      //   { name: "quantity_in_stock", value: "1" },
      //   { name: "price", value: "123" },
      // ].forEach(({ name, value }) => setValue(name, value));

      setValue("name", response.data.result[0].name, { shouldDirty: true });
      setValue("quantity_in_stock", response.data.result[0].quantity_in_stock, {
        shouldDirty: true,
      });
      setValue("price", response.data.result[0].price, { shouldDirty: true });
      setValue("description", response.data.result[0].description, {
        shouldDirty: true,
      });
      setValue("category_id", response.data.result[0].category_id, {
        shouldDirty: true,
      });
      setValue("htx_id", response.data.result[0].htx_id, { shouldDirty: true });
      setValue("user_id", response.data.result[0].user_id, {
        shouldDirty: true,
      });
      setValue("isDeleted", response.data.result[0].isDeleted, {
        shouldDirty: true,
      });
      setState({
        ...state,
        path: response.data.result,
      });
      setProduct(response.data);
    }
  }
  // 2. Cập nhập dữ liệu vừa nhập
  const onSubmit = (data, e) => {
    // sửa sản phẩm.
    if (id !== null) {
      product.name = data.name;
      axios.put(`http://localhost:4333/product/update/${id}`, data).then(
        (data) => {
          setTimeout(function () {
            toggleModal6();
            props.onReload("Sửa sản phẩm thành công.");
            e.target.reset(); // set form input trở lại trạng thái bình thường
          }, 200);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      /// tự viết
      // thêm mới sản phẩm.
      // connect
      upProduct(data);

      if (id) {
        setSuccess(true);
      }
      setTimeout(function () {
        connectImgToProduct();
        toggleModal6();
        props.onReload("Thêm sản phẩm thành công.");
        e.target.reset(); // set form input trở lại trạng thái bình thường
      }, 200);
    }
  };
  return (
    <div className="Apps usser">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="forms form-container">
            <div className="form-left">
              <h3>Thông tin cơ bản</h3>

              {/* Tên */}
              <div className="form-group">
               <label htmlfor="exampleInputEmail1">Tên sản phẩm name</label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị Name"}
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Số lượng - quantity</label>
                <input
                  type="number"
                  name="quantity_in_stock"
                  className="form-control"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị Mô tả."}
                </small>
              </div>
              {/* Mô tả */}
              <div className="form-group description">
                <label htmlFor="exampleInputEmail1">
                  Mô tả sản phẩm - descriptiton
                </label>
                <textarea
                  type="text"
                  name="description"
                  className="form-control"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị Mô tả."}
                </small>
              </div>
              {/* Thương hiệu */}
              {/* <div className="form-group">
                <label htmlFor="exampleInputEmail1">Thương hiệu</label>
                <input
                  type="text"
                 
                  className="form-control"
                  
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập thương hiệu."}
                </small>
              </div> */}
              {/* Bảo hành */}
              {/* <div className="form-group">
                <label htmlFor="exampleInputEmail1">Bảo hành</label>
                <input
                  type="text"
                  
                  className="form-control"
                  
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị GIÁ."}
                </small>
              </div> */}

              <h3>Thông tin bán hàng</h3>
              {/* Giá bán */}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Giá bán - price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị Category_id"}
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Category-id</label>
                <input
                  type="number"
                  name="category_id"
                  className="form-control"
                  defaultValue="5"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị HTX_id"}
                </small>
              </div>
              {/* Kho hàng */}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Kho hàng</label>
                <input
                  type="number"
                  name="htx_id"
                  className="form-control"
                  defaultValue="8"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị HTX_id"}
                </small>
              </div>
              <h3>Quản lý hình ảnh</h3>
              <div className="form-group edit">
                <label htmlFor="exampleInputEmail1">Hình ảnh sản phẩm</label>
                <div className="edit-img">
                  <input
                    id="upfile"
                    name="file"
                    type="file"
                    multiple
                    placeholder="Upload an Image !"
                    onChange={uploadImage}
                    ref={register({ required: true })}
                  />
                  <div className="input-img">
                    {state.path
                      ? state.path.map((value, key) => {
                          return (
                            <li key={key}>
                              <img
                                src={id ? value.url : value}
                                style={
                                  id
                                    ? { border: "1px solid rgba(0,0,0,.2)" }
                                    : { border: "1px dashed #1791f2" }
                                }
                                alt="123"
                              ></img>
                              <p>
                                {key === 0 ? "Ảnh bìa" : "Hình " + `${key}`}
                              </p>
                            </li>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
              {/* input img */}
              {/* Hết quản lý hình ảnh */}

              <h3>Vận chuyển</h3>
              {/* Cân nặng */}
              {/* Kích thước */}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Cân nặng</label>
                <input
                  type="number"
                  name="user_id"
                  className="form-control"
                  defaultValue="33"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị USER_id"}
                </small>
              </div>

              {/* <div className="form-group">
                <label htmlFor="exampleInputEmail1">Kích thước</label>
                <input
                  type="number"
                  
                  className="form-control"
                  defaultValue="1"
                  
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị isDelete"}
                </small>
              </div> */}

              {/* THông tin khác */}
              <h3>Thông tin khác</h3>
              {/* <div className="form-group">
                <label htmlFor="exampleInputEmail1">Hàng đặt trước</label>
                <input
                  type="number"
                
                  className="form-control"
                  defaultValue="1"
                 
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị isDelete"}
                </small>
              </div> */}
              {/* <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tình trạng</label>
                <input
                  type="number"
                 
                  className="form-control"
                 
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị isDelete"}
                </small>
              </div> */}
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">SKU Phân loại</label>
                <input
                  type="number"
                  name="isDeleted"
                  className="form-control"
                  defaultValue="1"
                  ref={register({ required: true })}
                />
                <small id="emailHelp" style={{ color: "red" }}>
                  {errors.name && "Vui lòng nhập giá trị isDelete"}
                </small>
              </div>

              <div className="btn-group">
                <button type="submit" className="btn btn-primary">
                  {id ? "Sửa sản phẩm" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleModal6()}
                  className="btn btn-default"
                >
                  Đóng
                </button>
              </div>
            </div>
            <div className="form-right">
              <li>Thông tin sản phẩm</li>
              <li>Thông tin bán hàng</li>
              <li>Quản lý hình ảnh</li>
              <li>Vận chuyển</li>
              <li>Thông tin khác</li>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Form;
