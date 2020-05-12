import { request } from '../utils/http.js';

class REQ_DEVICES {
  //设备数
  getDeviceList(data = {}) {
    return request({
      url: `/config/equipInfo/equipList`,
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

export const ReqDevices = new REQ_DEVICES();