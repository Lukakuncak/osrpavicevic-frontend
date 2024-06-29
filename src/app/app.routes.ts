import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistoryComponent } from './history/history.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { ImportantDocumentsComponent } from './important-documents/important-documents.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
    { path: 'pocetna', component: HomeComponent},
    { path: 'istorija', component: HistoryComponent},
    { path: 'raspored-casova', component: ClassScheduleComponent},
    { path: 'bitna-dokumenta', component: ImportantDocumentsComponent},
    { path: 'obavestenja', component: NewsComponent},
    { path: '', redirectTo: '/pocetna', pathMatch: 'full'},
    { path: '**', component: NotFoundComponent},
];
