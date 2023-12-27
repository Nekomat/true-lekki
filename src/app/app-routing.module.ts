import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'welcome1',
    loadChildren: () =>
      import('./welcome1/welcome1.module').then((m) => m.Welcome1PageModule),
  },
  {
    path: 'welcome2',
    loadChildren: () =>
      import('./welcome2/welcome2.module').then((m) => m.Welcome2PageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    path: 'reset',
    loadChildren: () =>
      import('./reset/reset.module').then((m) => m.ResetPageModule),
  },
  {
    path: 'tab4',
    loadChildren: () =>
      import('./tab4/tab4.module').then((m) => m.Tab4PageModule),
  },
  {
    path: 'pharmacie-detail',
    loadChildren: () =>
      import('./pharmacie-detail/pharmacie-detail.module').then(
        (m) => m.PharmacieDetailPageModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'ionic',
    loadChildren: () =>
      import('./ionic/ionic.module').then((m) => m.IonicPageModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
  {
    path: 'wait-validation',
    loadChildren: () =>
      import('./wait-validation/wait-validation.module').then(
        (m) => m.WaitValidationPageModule
      ),
  },
  {
    path: 'user-valid',
    loadChildren: () =>
      import('./user-valid/user-valid.module').then(
        (m) => m.UserValidPageModule
      ),
  },
  {
    path: 'succes',
    loadChildren: () =>
      import('./succes/succes.module').then((m) => m.SuccesPageModule),
  },
  {
    path: 'mes',
    loadChildren: () => import('./mes/mes.module').then((m) => m.MesPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'confidentialite',
    loadChildren: () =>
      import('./confidentialite/confidentialite.module').then(
        (m) => m.ConfidentialitePageModule
      ),
  },
  {
    path: 'prise-medicament',
    loadChildren: () =>
      import('./prise-medicament/prise-medicament.module').then(
        (m) => m.PriseMedicamentPageModule
      ),
  },
  {
    path: 'mon-compte',
    loadChildren: () =>
      import('./mon-compte/mon-compte.module').then(
        (m) => m.MonComptePageModule
      ),
  },
  {
    path: 'loader',
    loadChildren: () =>
      import('./loader/loader.module').then((m) => m.LoaderPageModule),
  },
  {
    path: 'succes-order',
    loadChildren: () =>
      import('./succes-order/succes-order.module').then(
        (m) => m.SuccesOrderPageModule
      ),
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
