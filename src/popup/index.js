import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
    Input,
    Button,
    Checkbox
} from 'element-ui';

Vue.use(Input)
Vue.use(Button)
Vue.use(Checkbox)
new Vue({
    el: "#app",
    render: createElement => {
        return createElement(AppComponent);
    }
});