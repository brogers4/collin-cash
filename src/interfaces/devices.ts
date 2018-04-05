export interface Fault {
    id: number | string;
    active: boolean;
    type: string;
    timestamp: number;
}

export interface Breaker {
    id: number | string;
    name: string;
    status: string;
    closed: boolean;
    activeFault?: boolean;
    currentFault?: string;
    faults?: Array<Fault>;
}

export interface Loadcenter {
    id: number | string;
    name: string;
    numActiveFaults?: number;
    lastFault?: string;
    lastFaultTimestamp?: number;
    breakers?: Array<Breaker>;
}