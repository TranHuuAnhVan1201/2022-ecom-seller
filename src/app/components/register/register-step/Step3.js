
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    chooseImageStep3,
    chooseStep3
} from "../../../_actions/custommer/products/product";
import "../Register.scss";
import apiLocalhost0 from "./../../../_untils/apiLocalhost0";

function Step3(props) {
  const createUser = async (data) => {

    apiLocalhost0(`Newee/Seller/Register`, "POST", data).then((res) => {
      console.log(res);
    })
      .catch((err) => console.log(err.response));
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const Register = useSelector((state) => state.Register);
  const { register, handleSubmit } = useForm({
    defaultValues: { Register },
  });

  const [check1, setCheck1] = useState(false);
  const [step2, setStep2] = useState({
    imageCMND: [],
    imageAVT: [],
  });
  const [step4, setStep4] = useState({
    imageCMND: [],
    imageAVT: [],
  });

  const onSubmit = (data3) => {
    dispatch(chooseStep3(data3));
    dispatch(chooseImageStep3(step2.imageCMND));
    createUser(Register.data[0]);
    history.push("/login");
  };

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

    setCheck1(true);
    setStep2({
      ...step2,
      imageCMND: [...step2.imageCMND, `${file.secure_url}`],
    });
    setStep4({
      ...step2,
      imageCMND: [...step4.imageCMND, `${file.secure_url}`],
    });
  };

  const array = (img1, img2, img3) => {


  };
  useEffect(() => {
    array(step4.imageCMND[0], step4.imageCMND[1], step4.imageCMND[2]);
  }, [step4]);

  const prevStep = () => {
    history.push("/register/step-2");
  };

  return (
    <section>
      <div className="register">
        <div className="register-container">
          <Link to="/" className="btn-cancel">
            X
          </Link>
          <div className="group-text">
            <h2>Đăng Ký Bước 3</h2>
            <span>Nhanh chóng và dễ dàng</span>
            <div className="group-span"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="tab-content">
              <div className="tab-step step-2">
                <label>Số chứng minh nhân dân</label>
                <input
                  name="cmnd"
                  type="text"
                  placeholder="Nhập số CMND của bạn."
                  ref={register({
                    // required: true,
                    // minLength: 9,
                    // maxLength: 12,
                  })}
                ></input>

                <label style={{ width: "100%" }}>Ngày cấp / Nơi cấp</label>
                <input
                  className="w-194"
                  name="DateTime"
                  type="datetime"
                  placeholder="Ngày cấp: 28/03/2021"
                  ref={register({
                    //required: true
                  })}
                ></input>

                <input
                  className="w-194"
                  name="adress_CMND"
                  type="text"
                  placeholder="Nơi cấp"
                  ref={register({
                    //required: true
                  })}
                ></input>

                <div className="form-controls col">
                  <label>Ảnh CMND - 2 mặt</label>
                  <div className="register-img">
                    <input
                      id="upfile"
                      name="file"
                      type="file"
                      multiple
                      placeholder="Upload an Image !"
                      onChange={uploadImage}
                      ref={register({
                        //required: true
                      })}
                    />
                    <div className="img-cmnd">
                      {step2.imageCMND.map((value, key) => {
                        return (
                          <li key={key}>
                            <div className="img-tool">
                              <img
                                width={430}
                                height={200}
                                style={{ objectFit: "contain" }}
                                src={check1 ? value : null}
                                alt="Newee"
                              ></img>
                              <div className="group-edit">
                                <div className="group-btn btn-delete">Xóa</div>
                                <div className="btn-mg">|</div>
                                <div className="group-btn btn-edit">Sửa</div>
                              </div>
                            </div>
                            <p>
                              {key === 0
                                ? "CMND mặt trước"
                                : key === 1
                                  ? "CMND mặt sau"
                                  : "Ảnh đại diện"}
                            </p>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="form-controls col">
                  <label className="policy">
                    Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính
                    sách dữ liệu và Chính sách cookie của chúng tôi. Bạn có thể
                    nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ
                    lúc nào.
                  </label>
                </div>
                <div className="form-controls btn-sm">
                  <button
                    type="submit"
                    className="btns btns-newee"
                    onClick={() => prevStep()}
                  >
                    Quay lại
                  </button>

                  <button type="submit" className="btns-newee">
                    Đăng Ký
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Step3;
