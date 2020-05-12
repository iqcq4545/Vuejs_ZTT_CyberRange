import { request } from '../utils/http.js';

class REQ_TEAMS {
  //设备数
  getTeamList(data = {}) {
    return request({
      url: `/against/group/list`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET",
    });
  }

  createTeam(data = {}) {
    return request({
      url: `/against/group`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "POST",
    });
  }

  editTeam(data = {}) {
    return request({
      url: `/against/group`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "PUT",
    });
  }

  deleteTeam(data = {}) {
    return request({
      url: `/against/group/${data}`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "DELETE",
    });
  }

  getFreeUser(data = {}) {
    return request({
      url: `/against/group/getAllCanAddUser`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: "GET",
    });
  }

  addTeamUser(data = {}) {
    return request({
      url: `/against/group/addGroupUser`,
      data: data,
      params: data,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'POST',
    });
  }

  resetTeamUser(data = {}) {
    return request({
      url: `/against/group/removeGroupUser/${data}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      method: 'GET',
    });
  }
}

export const ReqTeams = new REQ_TEAMS();