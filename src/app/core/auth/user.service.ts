import { Injectable } from '@angular/core';
import { APIClientService } from '../services/common/api-client.service';
import { ENDPOINTS } from '../constants/endpoints';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(
    private _apiClient: APIClientService
  ) { }

  register(user: User) {
    return this._apiClient.post(ENDPOINTS.SECURITY.USER, user);
  }

  update(user: User) {
    return this._apiClient.put(ENDPOINTS.SECURITY.USER, user);
  }

  findByIdReduced(id: number) {
    return this._apiClient.get(`${ENDPOINTS.SECURITY.USER}/reduced/${id}`);
  }
}
