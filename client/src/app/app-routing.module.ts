import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {CategoryFormComponent} from "./category-page/category-form/category-form.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent},
      {
        path: 'categories', children: [
          {path: '', component: CategoryPageComponent},
          {path: 'new', component: CategoryFormComponent},
          {path: ':id/edit', component: CategoryFormComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
