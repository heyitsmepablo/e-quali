import { Component } from '@angular/core';
import { TextField } from '../../../shared/components/inputs/text-field/text-field';

@Component({
  selector: 'app-login',
  imports: [TextField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
