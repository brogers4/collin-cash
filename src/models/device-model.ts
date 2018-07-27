import { DataModel } from './data-model';
import { ID } from '../interfaces/devices';

export class DeviceModel extends DataModel {

    getName():string {
        return this._getStaticDataVal('name');
    }

    getIdAgent():string {
        return this._getStaticDataVal('idAgent');
    }

    isConnected():boolean {
        return (this._getDynamicDataVal('connected') === true);
    }

    isDisconnected():boolean {
        return (this._getDynamicDataVal('connected') === false);
    }

    getClassList():Array<ID> {
        try {
            return this._truthyObjectToArray(this.data.classes);
        } catch (e) {
            return [];
        }
    }

    isClass(type: string): boolean {
        try {
            return (this.data.classes[type] === true);
        } catch(e) {
            return false;
        }
    }

}