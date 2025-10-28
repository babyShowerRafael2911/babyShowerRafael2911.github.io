import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { Invitation } from './invitation/invitation.component';
export const routes: Routes = [
  // ejemplo de rutas
  { path: '', redirectTo: 'invitacion', pathMatch: 'full' },
  { path: '', component: Invitation },

];

export const AppRoutingModule = RouterModule.forRoot(routes);
