import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input, Row } from 'antd'
import { useHistory } from 'react-router-dom'
import { ID_CARD_SELLER, ID_USER_SELLER, TOKEN_SELLER, USER_INFORMATION } from 'v2/data/constant'
export const LoginScreen = () => {
  const history = useHistory()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    localStorage.clear()

    localStorage.setItem(TOKEN_SELLER, TOKEN_SELLER)
    localStorage.setItem(ID_CARD_SELLER, ID_CARD_SELLER)
    localStorage.setItem(ID_USER_SELLER, ID_USER_SELLER)
    localStorage.setItem(USER_INFORMATION, JSON.stringify(values))
    localStorage.setItem('dataConnect', JSON.stringify(values))

    history.push('/')
  }
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Card
        title=""
        bordered={false}
        style={{
          width: 400,
          padding: '30px',
        }}
      >
        <Form
          name="normal_login"
          hoifo
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username. Username:test123@gmail.com',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password! Password: 123456',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="/forgot">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}
export default LoginScreen
