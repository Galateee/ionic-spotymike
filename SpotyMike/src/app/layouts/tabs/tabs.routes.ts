import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'like',
        loadComponent: () =>
          import('../../pages/like/like.page').then((m) => m.LikePage),
      },
      {
        path: 'playlist',
        loadComponent: () =>
          import('../../pages/playlist/playlist.page').then((m) => m.PlaylistPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/home/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
