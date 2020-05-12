import { request } from '../utils/http.js';

class REQ_LOGIN {
  //设备数
  getVericode(data = {}) {
    return request({
      url: `/captchaImage`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

  login(data = {}) {
    return request({
      url: `/login`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'POST',
    });
  }

}

export const ReqLogin = new REQ_LOGIN();