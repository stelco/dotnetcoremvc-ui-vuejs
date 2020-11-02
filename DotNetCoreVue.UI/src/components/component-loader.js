import Vue from 'vue';
import Hello from './Hello.vue';
import Form from './Form.vue'

const components = [
    {
        component: Hello,
        element: 'hello'
    },
    {
        component: Form,
        element: 'form'
    }
];

export default {
    loadComponents() {
        components.forEach(({ component, element }) => {
            // Is the custom element in the DOM?
            if (!document.querySelector(element)) {
                return;
            }

            // Create a new Vue instance and mount it to the custom element.
            new Vue({
                render: createElement => createElement(component)
            }).$mount(element);
        });
    }
}

