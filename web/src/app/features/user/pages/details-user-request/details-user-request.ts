import { Component, input } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { Select } from '../../../../shared/components/inputs/select/select';
import { RouterLink } from '@angular/router';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';

@Component({
  selector: 'app-details-user-request',
  imports: [Breadcrumb, TextField, Select, RouterLink, TextArea],
  templateUrl: './details-user-request.html',
  styleUrl: './details-user-request.css',
})
export class DetailsUserRequest {
  idSolicitacaoUsuario = input<string>();
}
