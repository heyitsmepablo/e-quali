import { Component, signal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { TextField } from '../../../../shared/components/inputs/text-field/text-field';
import { Button } from '../../../../shared/components/buttons/button/button';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';
import { Select } from '../../../../shared/components/inputs/select/select';
import { RouterLink } from '@angular/router';
import { FormUserRequest } from '../../components/form-user-request/form-user-request';
import { mockAreas, mockCargos, mockSetores, mockUnidades } from '../user-request/mockData';

@Component({
  selector: 'app-create-user-request',
  imports: [Breadcrumb, Button, RouterLink, FormUserRequest],
  templateUrl: './create-user-request.html',
  styleUrl: './create-user-request.css',
})
export class CreateUserRequest {
  unidades = signal(mockUnidades);
  setores = signal(mockSetores);
  areas = signal(mockAreas);
  cargos = signal(mockCargos);
}
