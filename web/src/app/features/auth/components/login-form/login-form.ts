import { Component } from '@angular/core';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';

@Component({
  selector: 'app-login-form',
  imports: [TextField],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {}
