// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import iView from 'iview';

import { ReqLogin } from './api/login';
import { ReqUser } from './api/user';
import { ReqScenes } from './api/scenes';
import { ReqDevices } from './api/devices';
import { ReqTeams } from './api/teams';
import { ReqSoftware } from './api/software';
import { ReqBattle } from './api/battle';

Vue.prototype.$ReqLogin = ReqLogin;
Vue.prototype.$ReqUser = ReqUser;
Vue.prototype.$ReqScenes = ReqScenes;
Vue.prototype.$ReqDevices = ReqDevices;
Vue.prototype.$ReqTeams = ReqTeams;
Vue.prototype.$ReqSoftware = ReqSoftware;
Vue.prototype.$ReqBattlee = ReqBattle;

Vue.use(iView);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});