import React from 'react';
import { render, screen, fireEvent  } from "@testing-library/react"
import Shoes from './Shoes'
import { beforeEach } from 'vitest';
import Booking from '../../views/Booking';
import { MemoryRouter } from 'react-router-dom';


describe('Shoes component', () => {
    const shoes = [
        { id: '1' },
        { id: '2' },
    ]

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Booking />
                <Shoes shoes={shoes} updateSize={() => {}} addShoe={() => {}} removeShoe={() => {}} />
            </MemoryRouter> 
        )
    })
    it('should allow the user to choose shoe sizes for each player', () => {

        // Act
        const shoeInputs = screen.getAllByLabelText(/Shoe size \/ person/i)
        fireEvent.change(shoeInputs[0], { target: { value: '42' } });
        fireEvent.change(shoeInputs[1], { target: { value: '30' } });

        // Assert

        expect(shoeInputs[0].value).toBe('42');
        expect(shoeInputs[1].value).toBe('30');
    })


})