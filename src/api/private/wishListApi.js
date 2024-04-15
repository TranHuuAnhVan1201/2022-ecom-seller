import axiosClient from "../axiosClient";

export const wishListApi = {
  getAll: () => {
    const url = `/Newee/SellerManager/api/wishList`;
    return axiosClient.get(url);
  },
  add: (data) => {
    const url = `/Newee/SellerManager/api/addIntoWishList`;
    return axiosClient.post(url, data);
  },
  delete: (id) => {
    const url = `/Newee/SellerManager/api/delete-WishList/?productId=${id}`;
    return axiosClient.delete(url);
  },
};
