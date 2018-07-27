import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

import { DevicesProvider } from '../devices/devices';

export type MethodString = "PUT" | "POST" | "UPDATE" | "DELETE" | "GET";
export type ID = number | string;

export interface RequestData {
  body?: {
    command?: string,
    reason?: string
  },
  headers?: {
    "X-Client-Request-Timestamp"?: number,
    "X-Firebase-JWT"?: string,
    "X-Firebase-Request-Timestamp"?: number,
    "X-Profile-Latency"?: boolean
  },
  method: MethodString,
  path: string
}

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private _ver: string = "v1";
  private _path: string = `${this._ver}/api`

  constructor(
    public dp: DevicesProvider,
    public db: AngularFireDatabase
  ) {
    

  }

  getLastRequest(id: ID){
    return this.db.list(this._getRequestString(id), ref => ref.limitToLast(1)).valueChanges();
  }

  getRequests(id: ID){
    return this.db.list(this._getRequestString(id)).valueChanges();
  }

  get(id: ID, path: string, body: any = {}) {
    return this.sendRequest(id, this._buildRequestData('GET', path, body));
  }

  post(id: ID, path: string, body: any = {}){
    return this.sendRequest(id,this._buildRequestData('POST',path,body));
  }

  put(id: ID, path: string, body: any = {}) {
    return this.sendRequest(id, this._buildRequestData('PUT', path, body));
  }

  update(id: ID, path: string, body: any = {}) {
    return this.sendRequest(id, this._buildRequestData('UPDATE', path, body));
  }

  delete(id: ID, path: string, body: any = {}) {
    return this.sendRequest(id, this._buildRequestData('DELETE', path, body));
  }

  sendRequest(id: ID, data: RequestData) {
    return this.db.list(this._getRequestString(id)).push(data).then(
      req => {
        console.log("Successfully sent request:", req);
      },
      err => {
        console.log("Error sending request:", err);
      }
    );
  }

  _getRequestString(id: ID){
    return `${this._path}/${id}/request`;
  }

  _buildRequestData(method: MethodString, path: string, body: any = {}){
    path = path.replace(/^\/|\/$/g, ''); // Remove leading or trailing slashes
    return {
      method: method,
      path: `/${this._ver}/${path}`,
      body: body,
      headers: {
        'X-Firebase-JWT': this.dp.token,
        'X-Client-Request-Timestamp': Date.now()
      }
    };
  }

}
