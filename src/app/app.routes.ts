import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { ImportantDocumentsComponent } from './important-documents/important-documents.component';
import { NewsComponent } from './news/news.component';
import { SignUpComponent } from './sing-up/sing-up.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminGuard } from './admin.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

export const routes: Routes = [
    { path: 'pocetna', component: HomeComponent},
    { path: 'istorija', component: HistoryComponent},
    { path: 'nastava', component: ClassScheduleComponent},
    { path: 'normativna-akta', component: ImportantDocumentsComponent},
    { path: 'obavestenja', component: NewsComponent},
    { path: 'prijavi-se', component: SignUpComponent},
    { path: 'registruj-se', component: RegisterComponent},
    { path: 'upravljanje-korisnicima', component: UserManagementComponent, canActivate:[AdminGuard]},
    { path: 'upravljanje-profilom', component: MyProfileComponent},
    { path: 'promena-lozinke', component: PasswordChangeComponent},
    { path: '', redirectTo: '/pocetna', pathMatch: 'full'},
    { path: '**', component: NotFoundComponent},
];