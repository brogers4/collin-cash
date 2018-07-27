export type ID = number | string;

export type TimestampVal = {
    ts?: number,
    val?: any
};

export type TruthyObject = Array<{ [key: string]: boolean }>;

export interface Fault {
    id: ID;
    object?: any;
    ref?: any;
    active?: boolean;
    type?: string;
    timestamp?: number;
}

export interface Event {
    id: ID;
    object?: any;
    ref?: any;
}

export interface Breaker {
    id: ID;
    object?: any;
    ref?: any;
    name?: string;
    status?: string;
    closed?: boolean;
    activeFault?: boolean;
    currentFault?: string;
    faults?: Array<Fault>;
    events?: Array<Event>;
}

export interface Loadcenter {
    id: ID;
    object?: any;
    ref?: any;
    name?: any;
    numActiveFaults?: number;
    lastFault?: string;
    lastFaultTimestamp?: number;
    breakers?: Array<Breaker>;
}

export interface LoadcenterData {
    staticData?: {
        numBreakers?: TimestampVal
    },
    dynamicData?: {
        activeFault?: TimestampVal,
        lastFault?: TimestampVal,
        lastFaultTime?: TimestampVal,
        numActiveFaults?: TimestampVal
    },
    breakers?: TruthyObject
}

export interface Device {
    id: ID;
    object?: any;
    ref?: any;
}

export interface DeviceData {
    staticData?: {
        name?: TimestampVal,
        idAgent?: TimestampVal
    },
    dynamicData?: {
        connected?: TimestampVal
    },
    classes?: TruthyObject
}