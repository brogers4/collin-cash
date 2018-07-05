import { DataModel } from './data-model';
import { ID } from '../interfaces/devices';

export class EventModel extends DataModel {

    getBreakerId():ID {
        return this._getStaticDataVal('breakerId');
    }

    getEventDescription():string {
        return this._getStaticDataVal('eventDescription');
    }

    getEventType():string {
        return this._getStaticDataVal('eventType');
    }

    getLoadcenterId():ID {
        return this._getStaticDataVal('loadcenterId');
    }

    getTime():number {
        return this._getStaticDataVal('time');
    }

}