import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { ID_CARD_SELLER, ID_USER_SELLER, TOKEN_SELLER } from 'v2/data/constant'
import { USER, USER_LOGOUT } from '../../_constants/ActionType'

function Connect({ setToken, setIdCart, setIsUser }) {
  let { token, cart, idUser } = useParams()
  let data = { token: token, cart: cart, idUser: idUser }

  const history = useHistory()
  const dispatch = useDispatch()
  // const dataLogin = useSelector((state) => state.Login.dataLogin)

  const loadPage = async () => {
    setToken(token)
    setIsUser({ ...data })

    await dispatch({ type: USER_LOGOUT })
    await dispatch({ type: USER, data })
  }
  useEffect(() => {
    loadPage()
    if (token) {
      localStorage.removeItem('checkToken')
      localStorage.setItem(TOKEN_SELLER, token)
      localStorage.setItem(ID_CARD_SELLER, cart)
      localStorage.setItem(ID_USER_SELLER, idUser)
      localStorage.setItem('dataConnect', JSON.stringify(data))

      history.push('/')
    }
  }, [token])
  return (
    <div>
      <h2>Connect</h2>
    </div>
  )
}

export default Connect
