import { request } from "../utils/http.js";

class REQ_USER {
  //设备数
  getUserList(data = {}) {
    return request({
      url: `/system/user/list`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET",
    });
  }

  getUserInfo(data = {}) {
    return request({
      url: `/getInfo`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET",
    });
  }

  getUserList(data = {}) {
    return request({
      url: `/system/user/list`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET",
    });
  }

  createUser(data = {}) {
    return request({
      url: `/system/user`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
    });
  }

  editUser(data = {}) {
    return request({
      url: `/system/user`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "PUT",
    });
  }

  deleteUser(data = {}) {
    return request({
      url: `/system/user/${data}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "DELETE",
    });
  }

}

export const ReqUser = new REQ_USER();