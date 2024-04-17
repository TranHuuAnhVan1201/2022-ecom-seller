import axios from 'axios'
import * as Config from '../constants/constants'
import { TOKEN_SELLER } from 'v2/data/constant'

const ApiOld = async (endPoint, method, body) => {
  return await axios({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(TOKEN_SELLER)}`,
    },
    method: method,
    url: `${Config.API_NEWEE_5001}/${endPoint}`,
    data: body,
  })
}
export default ApiOld
