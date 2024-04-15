import axiosClient from './../axiosClient'

export const createSiteSellerApi = {
    create: (data) => {
        const url = `/api/Newee/SellerPage/CreateSellerPage`
        return axiosClient.post(url, data)
    },
    checking: (phone, codeBill) => {
        const url = `/Newee/Bill/GetBill/${phone}/${codeBill}`
        return axiosClient.get(url)
    },
}
