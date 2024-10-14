import { makeAutoObservable } from 'mobx';
import { ServerError } from '../models/serverError';

export default class CommonStore {
  error?: ServerError;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError(error: ServerError) {
    this.error = error;
  }
}
