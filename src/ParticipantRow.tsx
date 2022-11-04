import React, { useState } from "react";
import { Participant } from "./Participant";


const valueTypeForHeader = {
    "Id": "id",
    "Name": "name",
    "Birthday": "birthday",
    "Address": "address",
    "Telephone": "telephone",
    "Trial Status": "status"
}

interface ParticipantColumnProps {
    header: string
    field?: string
    editable?: boolean
    participantId?: string
    onSaveClick?: (id: string, valueType: string, newValue: string) => boolean
    testId?: string
}

function ParticipantColumn(props: ParticipantColumnProps) {
    const [isEditing, setIsEditing] = useState(false);
    const editableFieldId = `editableFieldId-${props.header}`

    const handleDataClick = () => {
        if (!props.editable) {
            return;
        }
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        if (props.onSaveClick) {
            const inputField = document.getElementById(editableFieldId) as HTMLInputElement
            const valueType = valueTypeForHeader[props.header]
            props.onSaveClick(props.participantId!, valueType, inputField.value)
        }
        setIsEditing(false);
    }

    return (
        <div className="ParticipantColumn" data-testid={props.testId ?? "participant-column"}>
            <div className="ParticipantRowHeader">{props.header}</div>
            {!isEditing && <div className="ParticipantRowData" onClick={handleDataClick}>{props.field}</div>}
            {isEditing && <input className="ParticipantRowData" type="text" placeholder={props.field} id={editableFieldId} name={editableFieldId} />}
            {isEditing && <button name="Search" onClick={handleSaveClick}>Save</button>}
        </div >
    );
}

interface ParticipantRowProps {
    participant?: Participant
    onFieldUpdate: (id: string, valueType: string, newValue: string) => boolean
}

export function ParticipantRow(props: ParticipantRowProps) {

    return (
        <div className="ParticipantRow">
            <ParticipantColumn header="Id" testId="participant-id" field={props.participant?.id} />
            <ParticipantColumn header="Name"
                testId="participant-name"
                field={props.participant?.name}
                participantId={props.participant?.id}
                editable
                onSaveClick={props.onFieldUpdate} />
            <ParticipantColumn header="Address"
                testId="participant-address"
                field={props.participant?.address}
                participantId={props.participant?.id}
                editable
                onSaveClick={props.onFieldUpdate} />
            <ParticipantColumn header="Birthday"
                testId="participant-birthday"
                field={props.participant?.birthday?.toLocaleDateString()}
                participantId={props.participant?.id}
                editable
                onSaveClick={props.onFieldUpdate} />
            <ParticipantColumn header="Telephone"
                testId="participant-telephone"
                field={props.participant?.telephone}
                participantId={props.participant?.id}
                editable
                onSaveClick={props.onFieldUpdate} />
            <ParticipantColumn header="Trial Status" testId="participant-status" field={props.participant?.status} />
        </div >
    )
}