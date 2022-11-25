import { APP, BASE_NODE_URI, BASE_URI } from "@app/utils/constants";
import axios from "axios";

export const UploadImage = async (jwt, file, publicKey) => {
    const endpoint = 'upload-image';
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
        'UserPublicKeyBase58Check',
        publicKey
    );
    formData.append('JWT', jwt);
    const response = await axios.post(`${BASE_NODE_URI}/${endpoint}`, formData);
    if (response === null) {
        return null
    } else {
        return response
    }
}