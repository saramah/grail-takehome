/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import React from "react";
import * as ReactDOM from 'react-dom/client';
import { render, screen, act, fireEvent } from "@testing-library/react";
import { generateTestParticipant } from "./helpers.tsx";
import { ParticipantRow } from "./ParticipantRow.tsx";

let container;
let testParticipant;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    testParticipant = generateTestParticipant();
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
    testParticipant = null;
});

test('renders participant row', () => {
    render(<ParticipantRow participant={testParticipant} onFieldUpdate={jest.fn()} />);
    const idElement = screen.getByTestId("participant-id-field");
    expect(idElement).toBeInTheDocument();
    expect(idElement.textContent).toEqual(testParticipant.id);

    const nameElement = screen.getByTestId("participant-name-field");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toEqual(testParticipant.name);

    const birthdayElement = screen.getByTestId("participant-birthday-field");
    expect(birthdayElement).toBeInTheDocument();
    expect(birthdayElement.textContent).toEqual(testParticipant.birthday.toLocaleDateString());

    const telephoneElement = screen.getByTestId("participant-telephone-field");
    expect(telephoneElement).toBeInTheDocument();
    expect(telephoneElement.textContent).toEqual(testParticipant.telephone);

    const addressElement = screen.getByTestId("participant-address-field");
    expect(addressElement).toBeInTheDocument();
    expect(addressElement.textContent).toEqual(testParticipant.address);

    const statusElement = screen.getByTestId("participant-status-field");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.textContent).toEqual(testParticipant.status);
});

test('clicking on an element calls onFieldUpdate and updates the field', () => {
    const testParticipant = generateTestParticipant()
    const fieldUpdateFn = jest.fn()

    act(() => {
        ReactDOM.createRoot(container).render(<ParticipantRow participant={testParticipant} onFieldUpdate={fieldUpdateFn} />);
    });
    ;

    const nameElement = screen.getByTestId("participant-name-field");
    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toEqual(testParticipant.name);

    act(() => {
        nameElement.click();
    });

    expect(nameElement).not.toBeInTheDocument();
    const editingNameElement = screen.getByTestId("participant-name-editingField");
    expect(editingNameElement).toBeInTheDocument()

    act(() => {
        fireEvent.input(editingNameElement, { target: { value: 'A new name' } });
    });

    expect(editingNameElement).toHaveValue("A new name");

    const saveButton = screen.getByTestId("participant-name-saveButton")
    act(() => {
        saveButton.click();
    });

    expect(fieldUpdateFn).toHaveBeenCalledTimes(1);

    const updatedNameElement = screen.getByTestId("participant-name-field");
    expect(updatedNameElement).toBeInTheDocument();
    expect(updatedNameElement.textContent).toEqual("A new name");
});