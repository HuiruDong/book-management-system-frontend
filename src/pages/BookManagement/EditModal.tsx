import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, type UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useMessage from 'antd/es/message/useMessage';
import { type BookItem } from '../../api/book';

export type SubmitData = {
    name: string;
    author: string;
    description: string;
    cover: File;
};

export interface EditModalProps {
    open: boolean;
    item?: BookItem | null;
    onSubmit: (data: SubmitData) => void;
    onCancel: () => void;
}

type FieldType = {
    name: string;
    author: string;
    description: string;
};

const EditModal: React.FC<EditModalProps> = ({ open, item, onCancel, onSubmit }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = useMessage();

    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const fields = await form.validateFields();

            if (fileList.length <= 0) {
                messageApi.error('请上传封面图！');
                return;
            }

            onSubmit({
                name: fields.name,
                author: fields.author,
                description: fields.description ?? '',
                cover: fileList[0] as any as File,
            });
        } catch (error) {}
    };

    const beforeUpload = (file: UploadFile) => {
        file.url = URL.createObjectURL(file as any as File);
        setFileList([...fileList, file]);

        return false;
    };

    const onRemove = (file: UploadFile) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    useEffect(() => {
        if (!item) return;
        const { name, author, description, cover } = item;
        form.setFieldsValue({ name, author, description });
        setFileList([{ url: `http://localhost:3000/${cover}` } as any as UploadFile]);
    }, [item]);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setFileList([]);
        }
    }, [open]);

    return (
        <>
            {contextHolder}
            <Modal
                title={item ? '添加书籍' : '编辑书籍'}
                closable
                open={open}
                onOk={handleOk}
                onCancel={() => onCancel()}
                okText='提交'
                cancelText='取消'
            >
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} autoComplete='off'>
                    <Form.Item<FieldType>
                        label='名称'
                        name='name'
                        rules={[{ required: true, message: '请输入书籍名称！' }]}
                    >
                        <Input placeholder='请输入书籍名称' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label='作者'
                        name='author'
                        rules={[{ required: true, message: '请输入书籍作者！' }]}
                    >
                        <Input placeholder='请输入书籍作者' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name='description'
                        label='描述'
                        rules={[{ required: true, message: '请输入书籍描述！' }]}
                    >
                        <Input.TextArea placeholder='请输入书籍描述' />
                    </Form.Item>
                    <Form.Item label='封面图' required>
                        <Upload
                            beforeUpload={beforeUpload}
                            listType='picture-card'
                            fileList={fileList}
                            onRemove={onRemove}
                        >
                            {fileList.length >= 1 ? null : (
                                <button style={{ border: 0, background: 'none' }} type='button'>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>上传</div>
                                </button>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditModal;
