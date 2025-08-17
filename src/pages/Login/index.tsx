import { Button, Form, Input, Typography, message, Spin } from 'antd';
import './index.less';
import { login } from '../../api/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Link } = Typography;

interface loginUser {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: loginUser) => {
        const { username, password } = values;

        if (!username.trim()) {
            messageApi.error('用户名不得为空！');
            return;
        }

        setLoading(true);
        try {
            await login(username, password);
            localStorage.setItem('token', 'admin');
            navigate('/', { replace: true });
        } catch (error) {}

        setLoading(false);
    };

    return (
        <>
            {contextHolder}
            <Spin fullscreen spinning={loading} tip='登录中...' />
            <div className='login-container'>
                <div className='login-main'>
                    <Title level={1} className='title'>
                        图书管理系统
                    </Title>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        colon={false}
                        autoComplete='off'
                    >
                        <Form.Item
                            label='用户名'
                            name='username'
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input placeholder='请输入用户名' />
                        </Form.Item>

                        <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码!' }]}>
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>

                        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                            <div className='links'>
                                <Link href='/register'>没有账号？去注册</Link>
                            </div>
                        </Form.Item>

                        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                            <Button className='btn' type='primary' htmlType='submit'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Login;
