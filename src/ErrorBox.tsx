import React from "react";

export interface ErrorBoxProps {
    message?: string
}

export function ErrorBox(props: ErrorBoxProps) {

    return (<p className="ErrorBox">{props.message ?? "There was a problem"}</p>);
}