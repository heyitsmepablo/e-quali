import { Component, output } from '@angular/core';
import { IconEmailSent } from '../../../../shared/icons/icon-email-sent/icon-email-sent';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { Button } from '../../../../shared/components/buttons/button/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { samePasswordsValidators } from '../../../../shared/validators/samePasswords.validator';

@Component({
  selector: 'app-new-password-form',
  imports: [IconEmailSent, TextField, Button, ReactiveFormsModule],
  templateUrl: './new-password-form.html',
  styleUrl: './new-password-form.css',
})
export class NewPasswordForm {
  newPasswordForm!: FormGroup;
  submitted: boolean = false;
  newPassword = output<Record<string, string>>();
  constructor(private formBuilder: FormBuilder) {
    this.newPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.minLength(6), Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: samePasswordsValidators }
    );
  }

  onSubmit() {
    this.submitted = true;
    const hasPasswordsMismatchError = this.newPasswordForm.hasError('passwordsMismatch');

    if (this.submitted && !hasPasswordsMismatchError) {
      const { password } = this.newPasswordForm.value;
      this.newPassword.emit({ newPassword: password });
    }
  }
}
