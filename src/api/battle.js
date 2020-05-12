import { request } from '../utils/http.js';

class REQ_Battle {
    //攻防对抗-科目训练管理

    // 查询科目训练所有的情景名称
    getAgaSightNameList(data = {}) {
        return request({
            url: `/against/sight/AgaSightNameList`,
            data: data,
            params: data,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: "GET",
        });
    }

    getDeviceUser(data = {}) {
        return request({
            url: `/config/equipInfo/getEquipUserList/${data}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: 'GET',
        });
    }

    addDeviceUser(data = {}) {
        return request({
            url: `/config/equipInfo`,
            data: data,
            params: data,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: 'POST',
        });
    }

    resetDeviceUser(data = {}) {
        return request({
            url: `/config/equipInfo/removeEquipUser/${data}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            method: 'DELETE',
        });
    }

}

export const ReqBattle = new REQ_Battle();