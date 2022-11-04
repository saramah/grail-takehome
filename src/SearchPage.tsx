import React, { useState } from "react"

export interface SearchPageProps {
    search: (term: string) => void
}

export function SearchPage(props: SearchPageProps) {

    const participantId = "participant-id"

    const onSearchClick = () => {
        const inputField = document.getElementById(participantId) as HTMLInputElement
        props.search(inputField.value ?? "");
    };

    return (
        <div className="SearchPage">
            <label htmlFor="participant-id">Participant Id</label>
            <input type="text" id={participantId} name={participantId} />
            <button name="Search" onClick={onSearchClick} onSubmit={onSearchClick}>Search</button>
        </div>
    )
}