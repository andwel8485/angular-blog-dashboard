import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AuthGuard } from './services/auth.guard';
import { AllSubscriptionsComponent } from './subscriptions/all-subscriptions/all-subscriptions.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'category',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subscription',
    component: AllSubscriptionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'post', component: AllPostComponent, canActivate: [AuthGuard] },
  { path: 'post/new', component: NewPostComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
