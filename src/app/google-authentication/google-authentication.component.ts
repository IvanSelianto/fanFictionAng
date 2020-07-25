import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-google-authentication',
  templateUrl: './google-authentication.component.html',
  styleUrls: ['./google-authentication.component.css']
})
export class GoogleAuthenticationComponent implements OnInit {

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute, private  appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.authService.authFromGoogle(params.code).subscribe(data => {
          console.log(data);
          if (!(data.roles[0] === 'ROLE_UNDEFINED_USER')) {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.router.navigateByUrl('home');
            this.appComponent.ngOnInit();
          } else {
            this.router.navigateByUrl('login');
          }
        });
      });
  }

}
