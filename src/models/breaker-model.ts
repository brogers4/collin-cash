import { DataModel } from './data-model';
import { ID } from '../interfaces/devices';

export class BreakerModel extends DataModel {

    public loadcenterName?: string;

    getName():string {
        return this._getStaticDataVal('name');
    }

    getLoadType():string {
        return this._getStaticDataVal('loadType');
    }

    getCircuitNumber():number {
        return this._getStaticDataVal('circuitNumber');
    }

    getCurrentRating():number {
        return this._getStaticDataVal('currentRating');
    }

    getBreakerType():string {
        return this._getStaticDataVal('breakerType');
    }

    getLoadcenterId():ID {
        return this._getStaticDataVal('loadcenterId');
    }

    isActiveFault():boolean {
        return (this._getDynamicDataVal('activeFault') === true);
    }

    getState():string {
        return this._getDynamicDataVal('state');
    }

    getStatus(): string {
        return this._getDynamicDataVal('status');
    }

    getEventList(): Array<ID> {
        try {
            return this._truthyObjectToArray(this.data.events);
        } catch (e) {
            return [];
        }
    }

}