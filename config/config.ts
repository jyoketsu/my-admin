// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: '欢迎页',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/blog',
              name: '博客管理',
              icon: 'edit',
              routes: [
                {
                  path: '/blog/posts',
                  name: '文章管理',
                  component: './blog/article',
                },
                {
                  path: '/blog/post',
                  name: '文章编辑',
                  component: './blog/editor',
                },
                {
                  path: '/blog/category',
                  name: '类别管理',
                  component: './blog/category',
                },
                {
                  path: '/blog/tag',
                  name: '标签管理',
                  component: './blog/tag',
                },
                {
                  path: '/blog/link',
                  name: '网站链接',
                  component: './blog/link',
                },
              ],
            },
            {
              path: '/homepage',
              name: '首页管理',
              icon: 'home',
              routes: [
                {
                  path: '/homepage/resume',
                  name: '个人简历',
                  component: './homepage/resume',
                },
              ],
            },
            {
              path: '/account',
              name: '个人中心',
              icon: 'user',
              routes: [
                {
                  path: '/account/settings',
                  name: '基本设置',
                  component: './account/settings',
                },
              ],
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/service',
              name: '服务管理',
              icon: 'tool',
              routes: [
                {
                  path: '/service/pm2',
                  name: 'PM2服务',
                  component: './service/pm2',
                },
              ],
            },
            // {
            //   name: '表格',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
