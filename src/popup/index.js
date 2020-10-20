import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
    Input,
    Button
} from 'element-ui';

Vue.use(Input)
Vue.use(Button)
new Vue({
    el: "#app",
    render: createElement => {
        return createElement(AppComponent);
    }
});