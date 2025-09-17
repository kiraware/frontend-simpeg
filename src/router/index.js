// router/index.js
import {createRouter, createWebHistory} from 'vue-router';
import login from '../view/login.vue';
import unauthorized from '../view/unauthorized.vue';
import adminLayout from '../layout/AdminLayout.vue';
import userLayout from '../layout/UserLayout.vue';

const importViews = (role) => {
  return import(`../view/${role}/index.js`);
};

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: unauthorized,
  },
  {
    path: '/user',
    name: 'userLayout',
    component: userLayout,
    redirect: { name: 'dashboard' },
    meta: { requiresAuth: true, role: 'USER' },
    children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => importViews('user').then((module) => module.dashboard),
        },
        {
          path: 'personal-data',
          name: 'personalData',
          component: () => importViews('user').then((module) => module.personalData),
        },
        {
          path: 'personal-document',
          name: 'personalDocument',
          component: () => importViews('user').then((module) => module.personalDocument),
        },
        {
          path: 'positions',
          name: 'positions',
          component: () => importViews('user').then((module) => module.positions),
        },
        {
          path: 'education-history',
          name: 'educationHistory',
          component: () => importViews('user').then((module) => module.educationHistory),
        },
        {
          path: 'training',
          name: 'training',
          component: () => importViews('user').then((module) => module.training),
        },
        {
          path: 'titles',
          name: 'titles',
          component: () => importViews('user').then((module) => module.titles),
        },
        {
          path: 'family-members',
          name: 'familyMembers',
          component: () => importViews('user').then((module) => module.familyMembers),
        },
        {
          path: 'achievement',
          name: 'achievement',
          component: () => importViews('user').then((module) => module.achievement),
        },
        {
          path: 'performance-assessment',
          name: 'performanceAssessment',
          component: () => importViews('user').then((module) => module.performanceAssessment),
        },
        {
          path: 'profile/:id',
          name: 'profile',
          component: () => importViews('user').then((module) => module.profile),
          props: true,
        },
        {
          path: 'change-password',
          name: 'changePassword',
          component: () => importViews('user').then((module) => module.changePassword),
          props: true,
        }, 
      ]
  },
  {
    path: '/admin',
    name: 'adminLayout',
    component: adminLayout,
    redirect: { name: 'adminDashboard' },
    meta: { requiresAuth: true, role: 'ADMIN' },
    children:
    [
      {
        path: 'adminDashboard',
        name: 'adminDashboard',
        component: () => importViews('admin').then((module) => module.adminDashboard),
      },
      {
        path: 'employee-list',
        name: 'employeeList',
        component: () => importViews('admin').then((module) => module.employeeList),
      },
      {
        path: 'employee-detail/:id',
        name: 'employeeDetail',
        component: () => importViews('admin').then((module) => module.employeeDetail),
        props: true,
      },
      {
        path: 'school-list',
        name: 'schoolList',
        component: () => importViews('admin').then((module) => module.schoolList),
      },
      {
        path: 'school-detail/:id',
        name: 'schoolDetail',
        component: () => importViews('admin').then((module) => module.schoolDetail),
        props: true,
      },
      {
        path: 'change-admin-password',
        name: 'changeAdminPassword',
        component: () => importViews('admin').then((module) => module.changeAdminPassword),
        props: true,
      }, 
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token is not available
      return next({ name: 'login' });
    }
  }

  const userRole = localStorage.getItem('role');
  if (to.meta.role && userRole !== to.meta.role) {
    // Redirect to unauthorized page if user role doesn't match
    return next({ name: 'unauthorized' });
  }

  // Proceed to the next middleware or the route
  next();
});

export default router