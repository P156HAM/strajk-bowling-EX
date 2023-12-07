import React from 'react';
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import Booking from './Booking';
import Confirmation from './Confirmation';
import { MemoryRouter, Route, Routes  } from 'react-router-dom';

describe('Booking component', () => {
        render(
            <MemoryRouter>
                <Booking />
            </MemoryRouter>
        )
    it('should allow the user to remove a shoe size field', () => {
        // Arrange
        const addButton = screen.getByText('+', { selector: 'button.shoes__button' });
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        
        // Act
        const removeButton = screen.getAllByText('-', { selector: 'button.shoes__button--small' });
        fireEvent.click(removeButton[0]);

        // Assert
        const shoeInput = screen.getAllByLabelText(/Shoe size \/ person/i)
        expect(shoeInput.length).toBe(1);
 
    });

    
})

describe('As a user I should be able to navigate between booking and booking confirmation view', () => {
    it('should allow the user to navigate between booking and booking confirmation view', () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </MemoryRouter>
        ); 
        
        // Arrange
        const menuButton = screen.getByAltText('Navigation Icon')
        fireEvent.click(menuButton)
        
        const confirmationLink = screen.getByRole('link', { name: 'Confirmation' });
        
        fireEvent.click(confirmationLink)
        expect(screen.getByText('See you soon!')).toBeInTheDocument();

        const bookingLink = screen.getByRole('link', { name: 'Booking' });

        fireEvent.click(menuButton) 
        fireEvent.click(bookingLink);
        expect(screen.getByText('strIIIIIike!')).toBeInTheDocument();

        screen.debug()
        
    })
})

describe('Booking and Confirmation Integration Test', () => {
    it('should allow the user to send the booking request and get the booking number and total price', async () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Booking />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </MemoryRouter>
        );
        // Arrange
        const dateInput = screen.getByLabelText(/Date/i);
        const timeInput = screen.getByLabelText(/Time/i);
        const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
        const lanesInput = screen.getByLabelText(/Number of lanes/i);

        fireEvent.change(dateInput, { target: { value: '2023-12-25' } });
        fireEvent.change(timeInput, { target: { value: '15:30' } });
        fireEvent.change(playersInput, { target: { value: '2' } });
        fireEvent.change(lanesInput, { target: { value: '1' } });


        const addButton = screen.getByText('+', { selector: 'button.shoes__button' });
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        
        // Act
        const shoeInputs = screen.queryAllByLabelText(/Shoe size \/ person/i)
        fireEvent.change(shoeInputs[0], { target: { value: '42' } });
        fireEvent.change(shoeInputs[1], { target: { value: '30' } });

        const bookingButton = screen.getByText('strIIIIIike!');
        fireEvent.click(bookingButton);

        
        // Assert
        await waitFor(() => {
            expect(screen.getByLabelText(/When/i).value).toBe("2023-12-25 15:30");
            expect(screen.getByLabelText(/Who/i).value).toBe("2");
            expect(screen.getByLabelText(/Lanes/i).value).toBe("1");
            expect(screen.getByLabelText(/Booking number/i)).toBeInTheDocument();
            expect(screen.getByText('Total:')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Sweet, let\'s go!' })).toBeInTheDocument();
        });
        
        screen.debug()
    })
})