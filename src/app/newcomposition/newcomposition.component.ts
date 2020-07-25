import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompositionService} from '../_services/composition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatStepper} from '@angular/material/stepper';
import {TokenStorageService} from '../_services/token-storage.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-newcomposition',
  templateUrl: './newcomposition.component.html',
  styleUrls: ['./newcomposition.component.css'],
})
export class NewcompositionComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  allGenres = [];
  form: any = {};
  value = 'New Composition.Create First Chapter!';
  allGenresObj = [];

  constructor(private formBuilder: FormBuilder, private  compositionService: CompositionService, public route: ActivatedRoute,
              private router: Router, private tokenStorageService: TokenStorageService, private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.tokenStorageService.getUser() === null) {
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe(data => {
        if (data.compositionId !== undefined) {
          this.compositionService.getComposition(data.compositionId).subscribe(composition => {
              this.form.title = composition.title;
              this.form.description = composition.description;
              this.form.compositionId = composition.compositionId;
              const genreStr = [];
              for (const genre of composition.compositionGenres) {
                genreStr.push(genre.genreName);
              }
              this.form.compositionGenres = genreStr;
              this.isLinear = true;
              this.value = 'New Composition.Save Changes';
              console.log(this.form);
            }, () => {
              this.router.navigateByUrl('home');
            }
          );
        }


      }
    );
    this.compositionService.getGenres().subscribe(genres => {
      this.allGenresObj = genres;
      for (const genre of genres) {
        this.allGenres.push(genre.genreName);
      }
    });

    this.firstFormGroup = this.formBuilder.group({firstCtrl: ['', Validators.required]});
    this.secondFormGroup = this.formBuilder.group({secondCtrl: ['', Validators.required]});
    this.thirdFormGroup = this.formBuilder.group({thirdCtrl: ['', Validators.required]});
  }

  onSubmit() {
    const genresObjects = [];
    for (const genre of this.form.compositionGenres) {
      genresObjects.push((this.allGenresObj.filter(genreObj => genreObj.genreName === genre)[0]));
    }
    this.form.compositionGenres = genresObjects;

    this.compositionService.saveComposition(this.form).subscribe(compositionId => {
      console.log(compositionId);
      this.compositionService.compositionId = compositionId;
      this.form = {};
      this.compositionService.imgUrl = null;
      this.router.navigate(['/composition/' + compositionId + '/chapter']);
    });

  }


}
