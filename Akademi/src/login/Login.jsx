import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Radio, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
import { MdSchool } from 'react-icons/md';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const result = await axios.post(`http://localhost:8080/${role}/login`, values);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.accessToken;
      window.localStorage.setItem('user', JSON.stringify(result.data));
      window.localStorage.setItem('authenticated', 'true');
      navigate('/u/dashboard');
    } catch (error) {
      form.setFields([
        {
          name: 'email',
          errors: [''],
        },
        {
          name: 'password',
          errors: ['Email or Password is incorrect'],
        },
      ]);
      setTimeout(() => { form.resetFields() }, 3000)
    }
  };

  const [role, setRole] = useState(null);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <Row>
      <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white", height: "100vh" }}>
        <div className='icon-name-l'>
          <div className='icon-l'><MdSchool /></div>
          <div className='name-l'>AKADEMI</div>
        </div>
      </Col>
      <Col span={12}>
        <div className='ff'>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            style={{
              width: '100vw',
              textAlign: "center"
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Col className='login-title'>Welcome!</Col>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 3,
                span: 15,
              }}
            >
              <Row className='login-flex'>
                <Checkbox>Remember me</Checkbox>
                <Link to='/login/forgot' style={{ color: "#303972" }}>Forget Password</Link>
              </Row>
            </Form.Item>

            <Form.Item label="You are:" name="roles">
              <Radio.Group onChange={handleRoleChange} value={role} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Radio value="admin" style={{ marginRight: '10px', marginLeft: 30 }}>Admin</Radio>
                <Radio value="teachers" style={{ marginRight: '10px' }}>Teacher</Radio>
                <Radio value="students">Student</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 3,
                span: 20,
              }}
            >
              <Button type="primary" htmlType="submit" style={{ width: 400, backgroundColor: "#4D44B5" }}>
                Submit
              </Button>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 3,
                span: 20,
              }}
            >
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
