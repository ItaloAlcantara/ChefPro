import { environment } from "../../environments/environment";

export const API = {

  BASE_URL: environment.BASE_URL,
  BASE_URI: '/api/v1'

}

export const APP_CONFIG = {

  BASE_URL: API.BASE_URL,
  BASE_FULL_URL: API.BASE_URL.concat(API.BASE_URI)

}
