import { Injectable } from '@angular/core';
import { APIClientService } from '../services/common/api-client.service';
import { Credentials } from '../interfaces/credentials';
import { ENDPOINTS } from '../constants/endpoints';

@Injectable()
export class AuthService {

  constructor(
    private _apiClient: APIClientService
  ) {
  }

  authenticate(credencials: Credentials) {
    return this._apiClient.post(ENDPOINTS.SECURITY.LOGIN, credencials);
  }

}
