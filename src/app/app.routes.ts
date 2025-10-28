import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { Invitation } from './invitation/invitation.component';

export const routes: Routes = [
  { path: '', component: Invitation }, // esta es la ruta principal
];

export const AppRoutingModule = RouterModule.forRoot(routes);
