import axiosInstance, { endpoints } from "src/utils/axios";

import { Decrypt } from "src/common/Decrypt/Decrypt";
import { Encrypt } from "src/common/Encrypt/Encrypt";


const fetcher = async (args) => {
    try {
        const [url, params] = Array.isArray(args) ? args : [args];

        const response = await axiosInstance.post(url, params);
        if (!response.data || !response.data.data) {
            throw new Error('Unexpected response structure');
        }
        return response.data;
    } catch (error) {
        console.error('Error in fetcher:', error);
        throw error;
    }
};

export const GetAllUser = async (parameter) => {

    const URL = endpoints.user.list;

    const Params = { Payload: Encrypt(parameter) };

    const { data, error } = await axiosInstance.post(URL, Params);

    const decryptedData = data?.data ? Decrypt(data?.data) : null;

    return {
        result: decryptedData || [],
        isLoading: !error && !decryptedData,
        isError: error,
        status: data?.status,
        message: data?.message,
    };
}


export const AddEdituser = async (parameter, file) => {

    const URL = endpoints.user.AddEditUser;

    const Params = { Payload: Encrypt(parameter), Files: file };

    const { data, error } = await axiosInstance.post(URL, Params);

    if (data?.status) {

        const decryptedData = data?.data ? Decrypt(data?.data) : null;

        return {
            data: decryptedData || [],
            isLoading: !error && !decryptedData,
            isError: error,
            status: data?.status,
            message: data?.message
        };
    } else {
        return {
            status: data?.status,
            message: data?.message
        }
    }
}

export const DeleteUser = async (parameter) => {

    const URL = endpoints.user.delete;

    const params = { payload: Encrypt(parameter) };

    const { data, error } = await axiosInstance.post(URL, params);

    const decryptedData = data?.data ? Decrypt(data?.data) : null;

    return {
        data: decryptedData || [],
        isLoading: !error && !decryptedData,
        isError: error,
        status: data?.status,
        message: data?.message
    };
}

export const GetUserById = async (id) => {

    const URL = endpoints.user.getbyID;

    const parameter = { EmployeeMasterID: id, };

    const params = { payload: Encrypt(parameter) };

    const { data, error } = await axiosInstance.post(URL, params);

    const decryptedData = data?.data ? Decrypt(data?.data) : null;

    return {
        data: decryptedData || [],
        isLoading: !error && !decryptedData,
        isError: error,
        status: data?.status,
        message: data?.message
    };
}
