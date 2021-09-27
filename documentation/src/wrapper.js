# InputRange

> Created at 2021-09-26 19:32:14

## Props

| Prop name | Description | Type    | Values | Default |
| --------- | ----------- | ------- | ------ | ------- |
| min       |             | number  | -      | 0       |
| max       |             | number  | -      | 33      |
| value     |             | boolean | -      | false   |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| sliding    |            |
| input      |            |
| change     |            |

## Slots

| Name  | Description | Bindings |
| ----- | ----------- | -------- |
| min   |             |          |
| value |             |          |
| max   |             |          |

---

<a href="https://github.com/albreis/input-range/edit/master/documentation/src/wrapper.js" class="docgen-edit-link">Algo errado? Avise-nos!</a>

// Import vue component
import component from './InputRange.vue';

// Declare install function executed by Vue.use()
export function install(Vue) {
if (install.installed) return;
install.installed = true;
Vue.component('InputRange', component);
}

// Create module definition for Vue.use()
const plugin = {
install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
GlobalVue = global.Vue;
}
if (GlobalVue) {
GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default component;
