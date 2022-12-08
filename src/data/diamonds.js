import { BASE_NODE_URI } from "@app/utils/constants";
import axios from "axios";
import { submitTransaction } from "./api";

export const payDiamonds = async (request) => {
    const endpoint = 'send-diamonds';
    const response = await axios.post(`${BASE_NODE_URI}/${endpoint}`, request);
    if (response === null) {
        return null
    } else {
        const TransactionHex = response.data.TransactionHex;
        const { data } = await submitTransaction(TransactionHex)
        return data;
    }
}