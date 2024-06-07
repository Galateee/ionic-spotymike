import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    // Delete
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth/auth.page').then((m) => m.AuthPage),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.page').then((m) => m.RegisterPage),
      },
    ],
  },
  {
    path: 'home',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./layouts/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },  {
    path: 'list-song',
    loadComponent: () => import('./pages/list-song/list-song.page').then( m => m.ListSongPage)
  },
  {
    path: 'list-artist',
    loadComponent: () => import('./pages/list-artist/list-artist.page').then( m => m.ListArtistPage)
  },
  {
    path: 'profile-artist',
    loadComponent: () => import('./pages/profile-artist/profile-artist.page').then( m => m.ProfileArtistPage)
  },
  {
    path: 'player-song',
    loadComponent: () => import('./pages/player-song/player-song.page').then( m => m.PlayerSongPage)
  },


];
