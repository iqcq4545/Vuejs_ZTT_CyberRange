import { request } from "../utils/http.js";

class REQ_SCENES {
  //场景数
  getSceneList(data = {}) {
    return request({
      url: `/scenario/scenario/list`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET",
    });
  }

  createScene(data = {}) {
    return request({
      url: `/scenario/scenario`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
    });
  }

  editScene(data = {}) {
    return request({
      url: `/scenario/scenario`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "PUT",
    });
  }

  deleteScene(data = {}) {
    return request({
      url: `/scenario/scenario/sceneDel/${data}`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "DELETE",
    });
  }

  getSceneUser(data = {}) {
    return request({
      url: `/scenario/scenario/getSceneUser/${data}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }
  
  addSceneUser(data = {}) {
    return request({
      url: `/scenario/scenario/addSceneUser`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'POST',
    });
  }

  resetSceneUser(data = {}) {
    return request({
      url: `/scenario/scenario/removeSceneUser/${data}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }

}

export const ReqScenes = new REQ_SCENES();