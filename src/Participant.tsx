export enum TrialStatus {
    active = "TrialStatus.active",
    withdrawn = "TrialStatus.withdrawn",
    finished = "TrialStatus.finished",
    error = "TrialStatus.error"
}

export interface Participant {
    id: string
    name?: string
    birthday?: Date
    telephone?: string
    address?: string
    status?: TrialStatus
}