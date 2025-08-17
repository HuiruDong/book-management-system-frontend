import React, { useEffect, useState } from 'react';
import { Input, Button, Row, Col, Card, Spin } from 'antd';
import './index.less';
import EditModal, { type SubmitData } from './EditModal';
import {
    uploadFile,
    type CreateBook,
    createBook,
    updateBook,
    getBookList as getBookListAPI,
    type BookItem,
    deleteBook as deleteBookAPI,
} from '../../api/book';
import { EditOutlined, BookOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const BookManagement: React.FC = () => {
    const [editModal, setEditModal] = useState<{ open: boolean; current: null | BookItem }>({
        open: false,
        current: null,
    });
    const [loading, setLoading] = useState(false);
    const [bookList, setBookList] = useState<BookItem[]>([]);
    const [keywords, setKeywords] = useState('');
    const [searchValue, setSearchValue] = useState({ name: '' });

    const getBookList = async () => {
        setLoading(true);
        try {
            const list = await getBookListAPI(searchValue.name);
            setBookList(list);
        } catch (error) {}
        setLoading(false);
    };

    const submitForm = async (data: SubmitData) => {
        try {
            const coverImageLink = await uploadFile(data.cover);
            const formData: CreateBook = {
                name: data.name,
                author: data.author,
                description: data.description,
                cover: coverImageLink,
            };

            editModal.current
                ? await updateBook({ ...formData, id: editModal.current.id! })
                : await createBook(formData);

            setEditModal({ open: false, current: null });
            getBookList();
        } catch (error) {}
    };

    const deleteBook = async (id: number) => {
        setLoading(true);
        try {
            await deleteBookAPI(id);
            getBookList();
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookList();
    }, [searchValue]);

    return (
        <>
            <Spin spinning={loading} fullscreen tip='加载中...' />
            <div className='book-container'>
                <div className='book-header'>
                    <Input
                        placeholder='请输入关键词'
                        className='input'
                        value={keywords}
                        onChange={(evt) => setKeywords(evt.target.value)}
                    />
                    <Button onClick={() => setSearchValue({ name: keywords })}>搜索</Button>
                    <Button
                        onClick={() => {
                            setKeywords('');
                            setSearchValue({ name: '' });
                        }}
                    >
                        重置
                    </Button>
                    <Button type='primary' onClick={() => setEditModal({ open: true, current: null })}>
                        添加
                    </Button>
                </div>
                <div className='book-main'>
                    <Row gutter={[16, 16]}>
                        {bookList.map((book) => (
                            <Col key={book.id} span={6}>
                                <Card
                                    cover={<img alt={book.cover} src={`http://localhost:3000/${book.cover}`} />}
                                    actions={[
                                        <BookOutlined key='detail' />,
                                        <EditOutlined
                                            key='edit'
                                            onClick={() => setEditModal({ open: true, current: book })}
                                        />,
                                        <DeleteOutlined key='delete' onClick={() => deleteBook(book.id)} />,
                                    ]}
                                >
                                    <Meta title={book.name} description={book.description} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <EditModal
                open={editModal.open}
                item={editModal.current}
                onCancel={() => setEditModal({ open: false, current: null })}
                onSubmit={submitForm}
            />
        </>
    );
};

export default BookManagement;
