import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompositionService} from '../_services/composition.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatStepper} from '@angular/material/stepper';
import {TokenStorageService} from '../_services/token-storage.service';

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
  allGenres: string[];
  form: any = {};
  compositionId: any;
  value = 'Create First Chapter!';

  constructor(private formBuilder: FormBuilder, private  compositionService: CompositionService, public route: ActivatedRoute,
              private router: Router, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorageService.getUser() === null) {
      this.router.navigateByUrl('/login');
    }
    this.route.params.subscribe(data => {
        if (data.compositionId !== undefined) {
          this.compositionId = data.compositionId;
          this.compositionService.getComposition(data.compositionId).subscribe(composition => {
              const genres = [];
              for (const genre of composition.compositionGenres) {
                genres.push(genre.genreName);
              }
              this.form.title = composition.title;
              this.form.description = composition.description;
              this.form.compositionId = composition.id;
              this.form.compositionGenres = genres;
              this.isLinear = true;
              this.value = 'Save Changes';
            }, () => {
              this.router.navigateByUrl('home');
            }
          );
        }
      }
    );
    this.compositionService.getGenres().subscribe(data => this.allGenres = data);
    this.firstFormGroup = this.formBuilder.group({firstCtrl: ['', Validators.required]});
    this.secondFormGroup = this.formBuilder.group({secondCtrl: ['', Validators.required]});
    this.thirdFormGroup = this.formBuilder.group({thirdCtrl: ['', Validators.required]});
  }

  onSubmit() {
    this.compositionService.saveComposition(this.form).subscribe(composition => {
        this.compositionService.compositionId = composition.id;
      this.form = {};
      this.compositionService.imgUrl = null;
      this.router.navigate(['/composition/' + composition.id + '/chapter']);
    });

  }


}
