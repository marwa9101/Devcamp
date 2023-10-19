import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

import NavigationComponent from './components/layouts/NavigationComponent.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import LoginForm from './components/login/LoginForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginForm }
  ],
});
const app = createApp(App);

app.component('navigation-component', NavigationComponent);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

app.use(router);
app.mount('#app');
