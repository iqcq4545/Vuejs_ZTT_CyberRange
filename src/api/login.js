import { request } from '../utils/http.js';

class REQ_LOGIN {
  //设备数
  getDeviceCount(data = {}) {
    return request({
      url: `/ZTL_Statistics/LargeScreen/GetDeviceCount`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',

    });
  }
}

export const ReqLogin = new REQ_LOGIN();