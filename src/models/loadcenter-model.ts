import { DataModel } from './data-model';
import { ID, LoadcenterData } from '../interfaces/devices';

export class LoadcenterModel extends DataModel {

    public name?: string = null;

    getBreakerList():Array<ID> {
        try {
            return this._truthyObjectToArray(this.data.breakers);
        } catch(e) {
            return [];
        }
    }

    hasActiveFault():boolean {
        return (this._getDynamicDataVal('activeFault') === true);
    }

    getLastFault():string {
        return this._getDynamicDataVal('lastFault');
    }

    getLastFaultTime():number {
        return this._getDynamicDataVal('lastFaultTime');
    }

    getNumActiveFaults():number {
        return this._getDynamicDataVal('numActiveFaults');
    }

    getNumBreakers(): number {
        return this._getStaticDataVal('numBreakers');
    }

}