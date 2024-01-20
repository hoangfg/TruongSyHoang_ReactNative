import ApiBase from "./ApiBase";
import { axios } from 'axios';


export const getImage = (type, name) => {

    const imageData = `http://192.168.38.236:8080/api/admin/${type}/getImage/${name}`;
    return imageData;
};
