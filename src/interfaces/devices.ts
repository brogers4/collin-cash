export type ID = number | string;

export interface Fault {
    id: ID;
    active: boolean;
    type: string;
    timestamp: number;
}

export interface Breaker {
    id: ID;
    name: string;
    status: string;
    closed: boolean;
    activeFault?: boolean;
    currentFault?: string;
    faults?: Array<Fault>;
}

export interface Loadcenter {
    id: ID;
    name: string;
    numActiveFaults?: number;
    lastFault?: string;
    lastFaultTimestamp?: number;
    breakers?: Array<Breaker>;
}