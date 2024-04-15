import axiosClient2 from "./../axiosClient2";

export const checkoutApi = {
  // CREATE BILL
  createBill: (data) => {
    const url = `/Newee/Bill/CreateBill`;
    return axiosClient2.post(url, data);
  },
};
