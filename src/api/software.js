import { request } from "../utils/http.js";

class REQ_SOFTWARE {
    //软件库
    getSoftwareList(data = {}) {
        return request({
            url: `/config/software/list`,
            data: data,
            params: data,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "GET",
        });
    }

    createSoftware(data = {}) {
        return request({
            url: `/config/software`,
            data: data,
            params: data,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "POST",
        });
    }

    editSoftware(data = {}) {
        return request({
            url: `/config/software`,
            data: data,
            params: data,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "PUT",
        });
    }

    deleteSoftware(data = {}) {
        return request({
            url: `/config/software/${data}`,
            data: data,
            params: data,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "DELETE",
        });
    }
}

export const ReqSoftware = new REQ_SOFTWARE();