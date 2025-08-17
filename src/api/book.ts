import axios from '../utils/request';

/**
 * 上传文件
 * @param file
 * @returns
 */
export const uploadFile = (file: File): Promise<string> => {
    const formData = new FormData();

    formData.append('file', file);

    return axios.post('/book/upload', formData);
};

export type CreateBook = {
    name: string;
    author: string;
    description: string;
    cover: string;
};

/**
 * 创建图书
 * @param book
 * @returns
 */
export const createBook = (book: CreateBook): Promise<null> => {
    return axios.post('/book/create', book);
};

/**
 * 更新图书
 * @param book
 * @returns
 */
export const updateBook = (book: CreateBook & { id: number }): Promise<null> => {
    return axios.put('/book/update', book);
};

export type BookItem = {
    author: string;
    cover: string;
    description: string;
    id: number;
    name: string;
};

/**
 * 获取图书列表
 * @returns
 */
export const getBookList = (name?: string): Promise<BookItem[]> => {
    const params = new URLSearchParams();

    if (name) {
        params.append('name', name);
    }

    return axios.get('/book/list', { params });
};

/**
 * 删除书籍
 * @param id
 * @returns
 */
export const deleteBook = (id: number): Promise<null> => {
    return axios.delete(`/book/delete/${id}`);
};
