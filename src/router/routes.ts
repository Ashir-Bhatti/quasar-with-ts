import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/users',
        name: 'users.index',
        component: () => import('src/pages/Users/Index.vue'),
      },
      {
        path: '/posts',
        name: 'posts.index',
        component: () => import('src/pages/Posts/Index.vue'),
      },
      {
        path: '/reports',
        name: 'reports.index',
        component: () => import('src/pages/Reports/Index.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard.index',
        component: () => import('src/pages/DashBoard/Index.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
