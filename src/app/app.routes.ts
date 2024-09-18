import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';
import { ClassScheduleComponentRajak } from './class-schedule-rajak/class-schedule.component';
import { JavneNabavkeComponent } from './javne-nabavke/important-documents.component';
import { NewsComponent } from './news/news.component';
import { SignUpComponent } from './sing-up/sing-up.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminGuard } from './admin.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { ClassSchedulePilicaComponent } from './class-schedule-pilica/class-schedule-pilica.component';
import { NormativnaAktaComponent } from './normativna-akta/normativna-akta.component';
import { SchoolDocumentsComponent } from './school-documents/school-documents.component';
import { TicTacToeComponent } from './tic-tac-top/tic-tac-toe.component';

export const routes: Routes = [
    { path: 'pocetna', component: HomeComponent},
    { path: 'istorija', component: HistoryComponent},
    { path: 'raspored-casova-rajak', component: ClassScheduleComponentRajak},
    { path: 'raspored-casova-pilica', component: ClassSchedulePilicaComponent},
    { path: 'javne-nabavke', component: JavneNabavkeComponent},
    { path: 'normativna-akta', component: NormativnaAktaComponent},
    { path: 'dokumenta-skole', component: SchoolDocumentsComponent},
    { path: 'obavestenja', component: NewsComponent},
    { path: 'prijavi-se', component: SignUpComponent},
    { path: 'registruj-se', component: RegisterComponent},
    { path: 'upravljanje-korisnicima', component: UserManagementComponent, canActivate:[AdminGuard]},
    { path: 'upravljanje-profilom', component: MyProfileComponent},
    { path: 'promena-lozinke', component: PasswordChangeComponent},
    { path: 'kreiraj-obavestenje', component: CreateNewsComponent},
    { path: 'prestolonaslednikovica', component: TicTacToeComponent},
    { path: '', redirectTo: '/pocetna', pathMatch: 'full'},
    { path: '**', component: NotFoundComponent},
];