/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { generateTestParticipant } from "./helpers.tsx";
import { Participant } from "./Participant";
import { ParticipantRow } from "./ParticipantRow.tsx";

const testParticipant = generateTestParticipant()

test('renders participant row', () => {
    render(<ParticipantRow participant={testParticipant} onFieldUpdate={jest.fn()} />);
    const idElement = screen.getByTestId("participant-id")
    expect(idElement).toBeInTheDocument();
    expect(idElement.textContent).toEqual(testParticipant.id);
});