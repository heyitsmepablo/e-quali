import { Component, input, signal } from '@angular/core';
import { Breadcrumb } from '../../../../shared/components/breadcrumb/breadcrumb';
import { TextArea } from '../../../../shared/components/inputs/text-area/text-area';
import { Button } from '../../../../shared/components/buttons/button/button';
import { FormUserRequest } from '../../components/form-user-request/form-user-request';
import { mockRequestToEdit } from '../user-request/mockData';

@Component({
  selector: 'app-details-user-request',
  imports: [Breadcrumb, TextArea, Button, FormUserRequest],
  templateUrl: './details-user-request.html',
  styleUrl: './details-user-request.css',
})
export class DetailsUserRequest {
  requestDetails = signal(mockRequestToEdit);
}
