import { Component, input, signal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';
import { Button } from '../../../../shared/components/buttons/button/button';
import { FormUserRequest } from '../../components/form-user-request/form-user-request';
import {
  mockAreas,
  mockCargos,
  mockRequestToEdit,
  mockSetores,
  mockUnidades,
} from '../user-request/mockData';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../../../shared/components/card/card';

@Component({
  selector: 'app-details-user-request',
  imports: [
    Breadcrumb,
    TextArea,
    Button,
    FormUserRequest,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Card,
  ],
  templateUrl: './details-user-request.html',
  styleUrl: './details-user-request.css',
})
export class DetailsUserRequest {
  unidade = signal(mockUnidades);
  setor = signal(mockSetores);
  area = signal(mockAreas);
  cargo = signal(mockCargos);
  requestDetails = signal(mockRequestToEdit);
  teste = new FormControl([
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  ]);
  constructor() {
    this.teste.disable();
  }
}
