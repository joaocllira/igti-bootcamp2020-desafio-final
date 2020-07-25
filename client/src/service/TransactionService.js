import axios from "axios";

export const findAll = async (period) => {
    try {
        const baseUrl = '/api/transaction';
        const parameter = period ? `?period=${period}` : '';

        const url = baseUrl + parameter;
        const response = await axios.get(url);

        return response.data;
    } catch(error) {
        return error;
    }
}

export const create = async (lancamento) => {
    try {
        const url = '/api/transaction';

        const response = await axios.post(url, lancamento);

        return response.data;
    } catch(error) {
        return error;
    }
}

export const update = async (id, updateObject) => {
    try {
        const url = '/api/transaction/' + id;

        const response = await axios.put(url, updateObject);

        return response.data;
    } catch(error) {
        return error;
    }
}

export const remove = async (id) => {
    try {
        const url = '/api/transaction/' + id;

        const response = await axios.delete(url);

        return response.data;
    } catch(error) {
        return error;
    }
}

/*
transactionRouter.post('/', controller.create);
transactionRouter.get('/', controller.findAll);
transactionRouter.get('/:id', controller.findOne);
transactionRouter.put('/:id', controller.update);
transactionRouter.delete('/:id', controller.remove);
transactionRouter.delete('/', controller.removeAll);
*/