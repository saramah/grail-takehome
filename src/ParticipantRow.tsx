import React from "react";
import { Participant } from "./Participant";

interface ParticipantColumnProps {
    header: string
    field?: string
}

function ParticipantColumn(props: ParticipantColumnProps) {
    return (
        <div className="ParticipantColumn">
            <div className="ParticipantRowHeader">{props.header}</div>
            <div className="ParticipantRowData">{props.field}</div>
        </div>
    );
}

interface ParticipantRowProps {
    participant?: Participant
}

export function ParticipantRow(props: ParticipantRowProps) {
    return (
        <div className="ParticipantRow">
            <ParticipantColumn header="Id" field={props.participant?.id} />
            <ParticipantColumn header="Name" field={props.participant?.name} />
            <ParticipantColumn header="Address" field={props.participant?.address} />
            <ParticipantColumn header="Birthday" field={props.participant?.birthday?.toLocaleDateString()} />
            <ParticipantColumn header="Telephone" field={props.participant?.telephone} />
            <ParticipantColumn header="Trial Status" field={props.participant?.status} />
        </div >
    )
}