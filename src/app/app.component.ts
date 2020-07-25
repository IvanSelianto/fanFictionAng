import {Component, HostBinding, OnInit, Renderer2, RendererFactory2} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {Router} from '@angular/router';
import {CompositionService} from './_services/composition.service';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  searchRequest: string;
  searchResult: any;
  userId: number;
  darkMode: boolean;
  renderer: Renderer2;
  @HostBinding('class') componentCssClass;

  constructor(public tokenStorageService: TokenStorageService,
              public router: Router, private compositionService: CompositionService, public translate: TranslateService, private rendererFactory: RendererFactory2) {
    translate.addLangs(environment.locales);
    this.renderer = rendererFactory.createRenderer(null, null);
    if (localStorage.getItem('theme') === 'dark-theme') {
      this.darkMode = true;
      this.componentCssClass = 'dark-theme';
      this.renderer.addClass(document.body, this.componentCssClass);
    } else {
      this.renderer.removeClass(document.body, this.componentCssClass);
      this.componentCssClass = null;
    }
  }

  ngOnInit() {

    if (localStorage.getItem('language')) {
      this.translate.use(localStorage.getItem('language'));
    } else {
      this.translate.use(environment.defaultLocale);
    }

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId = user.id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
  }


  logout() {
    this.tokenStorageService.signOut();
    this.showAdminBoard = false;
    this.ngOnInit();
    this.router.navigateByUrl('home');
  }

  search(): void {
    if (this.searchRequest !== undefined) {
      this.compositionService.search(this.searchRequest).subscribe((data) => this.searchResult = data);
    }
  }

  openSearchPanel() {
    if ((document.getElementsByClassName('search-li')[0] as HTMLElement).hidden === true) {
      (document.getElementsByClassName('search-li')[0] as HTMLElement).hidden = false;
    } else {
      (document.getElementsByClassName('search-li')[0] as HTMLElement).hidden = true;
    }

  }

  readComposition(compositionId) {
    this.router.navigateByUrl('/composition/' + compositionId);
  }

  setLanguage(language) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }


  onSetTheme(darkMode) {
    if (!darkMode) {
      this.componentCssClass = 'dark-theme';
      localStorage.setItem('theme', 'dark-theme');
      this.renderer.addClass(document.body, this.componentCssClass);
    } else {
      this.renderer.removeClass(document.body, this.componentCssClass);
      localStorage.setItem('theme', null);
      this.componentCssClass = null;
    }
  }

}
