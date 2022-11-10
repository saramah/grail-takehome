/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { screen, act, fireEvent } from "@testing-library/react";
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from "./App";


let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});


test('clicking on an element calls onFieldUpdate and updates the field', () => {

    act(() => {
        ReactDOM.createRoot(container).render(<App />);
    });

    const searchElement = screen.getByRole("textbox", { name: "Participant Id" })
    expect(searchElement).toBeInTheDocument();

    const searchButton = screen.getByRole("button", { name: "Search" });
    expect(searchButton).toBeInTheDocument();

    act(() => {
        fireEvent.input(searchElement, { target: { value: '3' } });
        searchButton.click();
    });

    const nameElement = screen.getByTestId("participant-name-field");
    expect(nameElement).toBeInTheDocument();

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

    const rerenderedNameElement = screen.getByTestId("participant-name-field");
    expect(rerenderedNameElement).toBeInTheDocument();
    expect(rerenderedNameElement.textContent).toEqual("A new name");
});