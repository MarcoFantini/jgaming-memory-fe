import {Injectable} from '@angular/core';
import {Storage} from '../model/storage.model';

@Injectable({providedIn: 'root'})
export class StorageService {
  readonly storageURL: string = 'jgaming_storage_data';
  readonly defaultStorage: Storage = {
    id: 'VERSION_0',
    user: null
  };

  constructor() {
  }

  saveStorage(storage: Storage) {
    localStorage.setItem(this.storageURL, JSON.stringify(storage));
  }

  getStorage(): Storage {
    const storage = localStorage.getItem(this.storageURL);
    return storage ? JSON.parse(storage) : this.defaultStorage;
  }

}
