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
import { OneNewsComponent } from './one-news/one-news.component';
import { UnaprovedCommentsComponent } from './unaproved-comments/unaproved-comments.component';
import { ReplyToCommentComponent } from './reply-to-comment/reply-to-comment.component';
import { UnrepliedCommentsComponent } from './unreplied-comments/unreplied-comments.component';
import { NasiAUspesniComponent } from './nasi-a-uspesni/nasi-a-uspesni.component';
import { NosiociVukoveDiplomeComponent } from './nosioci-vukove-diplome/nosioci-vukove-diplome.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';
import { SkolskiOdborComponent } from './skolski-odbor/skolski-odbor.component';
import { SavetRoditeljaComponent } from './savet-roditelja/savet-roditelja.component';
import { PedagoskiKutakUceniciComponent } from './pedagoski-kutak-ucenici/pedagoski-kutak-ucenici.component';
import { PedagoskiKutakRoditeljiComponent } from './pedagoski-kutak-roditelji/pedagoski-kutak-roditelji.component';
import { TestScheduleComponent } from './test-schedule/test-schedule.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SinglePostComponent } from './single-post/single-post.component';

export const routes: Routes = [
    { path: 'pocetna', component: HomeComponent },
    { path: 'istorija', component: HistoryComponent },
    { path: 'raspored-casova-rajak', component: ClassScheduleComponentRajak },
    { path: 'raspored-casova-pilica', component: ClassSchedulePilicaComponent },
    { path: 'javne-nabavke', component: JavneNabavkeComponent },
    { path: 'normativna-akta', component: NormativnaAktaComponent },
    { path: 'dokumenta-skole', component: SchoolDocumentsComponent },
    { path: 'obavestenja', component: NewsComponent },
    { path: 'obavestenje/:id', component: OneNewsComponent },
    { path: 'odgovori-na-komentar/:id', component: ReplyToCommentComponent, canActivate: [AdminGuard] },
    { path: 'prijavi-se', component: SignUpComponent },
    { path: 'registruj-se', component: RegisterComponent },
    { path: 'upravljanje-korisnicima', component: UserManagementComponent, canActivate: [AdminGuard] },
    { path: 'upravljanje-profilom', component: MyProfileComponent },
    { path: 'pedagosko-psiholoski-kutak/ucenici', component: PedagoskiKutakUceniciComponent },
    { path: 'pedagosko-psiholoski-kutak/roditelji', component: PedagoskiKutakRoditeljiComponent },
    { path: 'raspored-pismenih', component: TestScheduleComponent },
    { path: 'nasi-a-uspesni', component: NasiAUspesniComponent },
    { path: 'nosioci-vukove-diplome', component: NosiociVukoveDiplomeComponent },
    { path: 'zaposleni', component: ZaposleniComponent },
    { path: 'skolski-odbor', component: SkolskiOdborComponent },
    { path: 'savet-roditelja', component: SavetRoditeljaComponent },
    { path: 'promena-lozinke', component: PasswordChangeComponent },
    { path: 'kreiraj-obavestenje', component: CreateNewsComponent, canActivate: [AdminGuard] },
    { path: 'kreiraj-pp-objavu', component: CreatePostComponent, canActivate: [AdminGuard] },
    { path: 'objava/:id', component: SinglePostComponent },
    { path: 'neodobreni-komentari', component: UnaprovedCommentsComponent, canActivate: [AdminGuard] },
    { path: 'neodgovoreni-komentari', component: UnrepliedCommentsComponent, canActivate: [AdminGuard] },
    { path: 'prestolonaslednikovica', component: TicTacToeComponent },
    { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];