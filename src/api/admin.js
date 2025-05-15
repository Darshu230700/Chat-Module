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

export const GetAllAdmin = async (parameter) => {

    const URL = endpoints.admin.list;

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


export const AddAdmin = async (parameter, file) => {

    const URL = endpoints.admin.Add;

    const Params = { Payload: Encrypt(parameter) };

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

export const UpdateAdmin = async (parameter, file) => {

    const URL = endpoints.admin.Edit;

    const Params = { Payload: Encrypt(parameter) };

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

export const DeleteAdmin = async (parameter) => {

    const URL = endpoints.admin.delete;

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

export const GetAdminById = async (id) => {

    const URL = endpoints.admin.getbyID;

    const parameter = { UserMasterID: id, };

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
