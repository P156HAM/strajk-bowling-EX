import React from 'react';
import { render, screen, fireEvent  } from "@testing-library/react"
import BookingInfo from "./BookingInfo"
import Booking from "../../views/Booking"
import { beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('BookingInfo Component', () => {
    beforeEach(() => {
        // Render BookingInfo component and Booking view
        render(
        <MemoryRouter>
            <BookingInfo />
            <Booking />
        </MemoryRouter>
        );
    })
    it('should allow the user to choose date, time, and number of players', () => {
        
        // Arrange
        const dateInput = screen.getByLabelText(/Date/i);
        const timeInput = screen.getByLabelText(/Time/i);
        const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
        const lanesInput = screen.getByLabelText(/Number of lanes/i);

        // Act
        fireEvent.change(dateInput, { target: { value: '2023-12-25' } });
        fireEvent.change(timeInput, { target: { value: '15:30' } });
        fireEvent.change(playersInput, { target: { value: '4' } });
        fireEvent.change(lanesInput, { target: { value: '1' } });

        // Assert
        expect(screen.getByLabelText(/Date/).value).toBe('2023-12-25');
        expect(screen.getByLabelText(/Time/).value).toBe('15:30');
        expect(screen.getByLabelText(/Number of awesome bowlers/).value).toBe('4');
        expect(screen.getByLabelText(/Number of lanes/).value).toBe('1');

        // screen.debug();
    });

    it('should show an error message if all the fields is not filled', () => {
        
        // Arrange
        const bookingButton = screen.getByText('strIIIIIike!');
        console.log('button clicked')
        

        // Act
        fireEvent.click(bookingButton)

        // Assert 
        const errorMessage = screen.queryByText('Fill out all the fields and make sure that people and shoes is the same number.')
        screen.debug();

        expect(errorMessage).not.toBeNull(); 
        expect(errorMessage.textContent).toBe('Fill out all the fields and make sure that people and shoes is the same number.');
    })
})