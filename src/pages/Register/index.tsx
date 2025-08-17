import { Button, Form, Input, Typography, message, Spin } from 'antd';
import './index.less';
import { register } from '../../api/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Link } = Typography;

interface RegisterUser {
    username: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: RegisterUser) => {
        const { username, password, confirmPassword } = values;

        if (!username.trim()) {
            messageApi.error('用户名不得为空！');
            return;
        }

        if (password !== confirmPassword) {
            message.error('两次密码不一致！');
            return;
        }

        setLoading(true);

        try {
            await register(username, password);
            navigate('/login', { replace: true });
        } catch (error) {}

        setLoading(false);
    };

    return (
        <>
            {contextHolder}
            <Spin fullscreen spinning={loading} tip='注册中...' />
            <div className='register-container'>
                <div className='register-main'>
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

                        <Form.Item
                            label='确认密码'
                            name='confirmPassword'
                            rules={[{ required: true, message: '请输入确认密码!' }]}
                        >
                            <Input.Password placeholder='请输入确认密码' />
                        </Form.Item>

                        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                            <div className='links'>
                                <Link href='/login'>已有账号？去登录</Link>
                            </div>
                        </Form.Item>

                        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                            <Button className='btn' type='primary' htmlType='submit'>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Register;
