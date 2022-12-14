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

    // bug: old value remains until you re search for the participant
    const handleSaveClick = () => {
        if (props.onSaveClick) {
            const inputField = document.getElementById(editableFieldId) as HTMLInputElement
            const valueType = valueTypeForHeader[props.header]
            props.onSaveClick(props.participantId!, valueType, inputField.value)
        }
        setIsEditing(false);
    }

    const testIdPrefix = props.testId ?? "participant-column";

    return (
        <div className="ParticipantColumn" data-testid={testIdPrefix}>
            <div className="ParticipantRowHeader"
                data-testid={`${testIdPrefix}-header`}>{props.header}</div>
            {!isEditing &&
                <div className="ParticipantRowData"
                    onClick={handleDataClick}
                    data-testid={`${testIdPrefix}-field`}>{props.field}</div>}
            {isEditing &&
                <>
                    <input className="ParticipantRowData"
                        type="text" placeholder={props.field}
                        id={editableFieldId}
                        name={editableFieldId}
                        data-testid={`${testIdPrefix}-editingField`} />
                    <button name="Search"
                        onClick={handleSaveClick}
                        data-testid={`${testIdPrefix}-saveButton`}>Save</button>
                </>}
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