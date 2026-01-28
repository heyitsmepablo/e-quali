import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { Button } from '../../../../shared/components/buttons/button/button';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';

@Component({
  selector: 'app-create-user-request',
  imports: [Breadcrumb, TextField, Button, TextArea],
  templateUrl: './create-user-request.html',
  styleUrl: './create-user-request.css',
})
export class CreateUserRequest {}
