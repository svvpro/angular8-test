import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {__param} from "tslib";
import {MaterializeService} from "../shared/classes/materialize.service";
import {error} from "util";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

    this.route.queryParams.subscribe((params: Params) => {
        if (params['registered']) {
          MaterializeService.toast('You successfully registered');
        } else if (params['accessDenied']) {
          MaterializeService.toast('Access denied');
        } else if (params['sessionFailed']) {
          MaterializeService.toast('Session failed');
        }
      }
    )

  }

  submit() {
    this.form.disable();
    this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/overview']);
        MaterializeService.toast('You have successfully authorithed!');
      },
      error => {
        this.form.enable();
        MaterializeService.toast(error.error.message);
      }
    )
  }

}
