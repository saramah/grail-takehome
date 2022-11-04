import React, { useState } from "react"
import { ErrorBox } from "./ErrorBox.tsx"

export interface SearchPageProps {
    search: (term: string) => void
}

export function SearchPage(props: SearchPageProps) {

    const [showErrorState, setShowErrorState] = useState(false)

    const participantId = "participant-id"
    const validationError = "Participant Ids should only contain a number"

    const searchInputIsValid = (input: HTMLInputElement) => {
        // we'd put in validation for our participant ids here
        // since we are currently assuming that ids are monotonically increasing
        // integers, it's enough to make sure that we get a number if we try to 
        // convert the string to a number
        return !Number.isNaN(Number.parseInt(input.value));
    }

    const onSearchClick = () => {
        const inputField = document.getElementById(participantId) as HTMLInputElement

        if (searchInputIsValid(inputField)) {
            setShowErrorState(false);
            props.search(inputField.value ?? "");
        } else {
            setShowErrorState(true);
        }

    };

    return (
        <div className="SearchPage">
            <label htmlFor="participant-id">Participant Id</label>
            <input type="text" id={participantId} name={participantId} />
            <button name="Search" onClick={onSearchClick} onSubmit={onSearchClick}>Search</button>
            {showErrorState && <ErrorBox message={validationError} />}
        </div>
    )
}