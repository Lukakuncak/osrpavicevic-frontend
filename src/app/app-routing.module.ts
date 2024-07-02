import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Make sure this path is correct

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
});
