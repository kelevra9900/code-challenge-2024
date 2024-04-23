export const Routes = {
  home: '/',
  profile: '/profile',
  changePassword: '/change-password',
  logout: '/logout',
  content: (id: string) => {
    return `/contents/${encodeURIComponent(id)}`;
  },
  categories: '/categories',
  themes: '/themes',
  contents: '/contents',
};
