export type ID = number | string;

export interface Fault {
    id: ID;
    object?: any;
    active?: boolean;
    type?: string;
    timestamp?: number;
}

export interface Breaker {
    id: ID;
    object?: any;
    name?: string;
    status?: string;
    closed?: boolean;
    activeFault?: boolean;
    currentFault?: string;
    faults?: Array<Fault>;
}

export interface Loadcenter {
    id: ID;
    object?: any;
    name?: any;
    numActiveFaults?: number;
    lastFault?: string;
    lastFaultTimestamp?: number;
    breakers?: Array<Breaker>;
}