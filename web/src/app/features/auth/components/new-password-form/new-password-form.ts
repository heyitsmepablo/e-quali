import { Component } from '@angular/core';
import { IconEmailSent } from '../../../../shared/icons/icon-email-sent/icon-email-sent';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { Button } from '../../../../shared/components/buttons/button/button';

@Component({
  selector: 'app-new-password-form',
  imports: [IconEmailSent, TextField, Button],
  templateUrl: './new-password-form.html',
  styleUrl: './new-password-form.css',
})
export class NewPasswordForm {}
