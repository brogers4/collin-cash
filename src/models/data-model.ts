import { ID } from '../interfaces/devices';

export class DataModel {
    public id: ID;
    public data?: any = {};

    constructor(id: ID, data?: any) {
        this.id = id;
        if (data) {
            Object.assign(this.data, data);
        }
    }

    updateData(data: any) {
        if (data) {
            Object.assign(this.data, data);
        }
    }

    _getStaticDataVal(key: string, defaultValue?: any) {
        try {
            return this.data.staticData[key].val;
        } catch(e) {
            if(typeof defaultValue !== 'undefined') return defaultValue;
            else return null;
        }
    }

    _getDynamicDataVal(key: string, defaultValue?: any) {
        try {
            return this.data.dynamicData[key].val;
        } catch (e) {
            if (typeof defaultValue !== 'undefined') return defaultValue;
            else return null;
        }
    }

    _truthyObjectToArray(obj: any) {
        return Object.keys(obj).filter(objKey => obj[objKey] === true);
    }

    _falseyObjectToArray(obj: any) {
        return Object.keys(obj).filter(objKey => obj[objKey] === false);
    }
}