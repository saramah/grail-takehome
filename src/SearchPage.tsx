import React, { useState } from "react"
import { ErrorBox } from "./ErrorBox.tsx"
import { Participant } from "./Participant.tsx";
import { ParticipantRow } from "./ParticipantRow.tsx";

export interface SearchPageProps {
    search: (term: string) => boolean
    participant: Participant
    onFieldUpdate: (id: string, valueType: string, newValue: string) => boolean
}

export function SearchPage(props: SearchPageProps) {

    const [errorState, setErrorState] = useState<string>("")

    const participantId = "participant-id"
    const validationError = "Participant Ids should only contain a number"
    const noParticipantError = "No participant found with that identifier"

    const searchInputIsValid = (input: HTMLInputElement) => {
        // we'd put in validation for our participant ids here
        // since we are currently assuming that ids are monotonically increasing
        // integers, it's enough to make sure that we get a number if we try to 
        // convert the string to a number

        // bug: this will parse any int out of a string, even if it contains alphabetic
        // characters. 
        return !Number.isNaN(Number.parseInt(input.value));
    }

    const handleSearchClick = () => {
        const inputField = document.getElementById(participantId) as HTMLInputElement

        if (searchInputIsValid(inputField)) {
            setErrorState("");
            const success = props.search(inputField.value ?? "");
            if (!success) {
                setErrorState(noParticipantError);
            }
        } else {
            setErrorState(validationError);
        }

    };

    return (
        <div className="SearchPage">
            <div className="SearchField">
                <label htmlFor="participant-id">Participant Id</label>
                <input type="text" id={participantId} name={participantId} />
                <button name="Search" onClick={handleSearchClick}>Search</button>
            </div>
            {errorState && <ErrorBox message={errorState} />}
            <ParticipantRow participant={props.participant} onFieldUpdate={props.onFieldUpdate} />
        </div>
    )
}