import React from 'react'
import {cleanup, fireEvent, waitFor, screen} from "@testing-library/react"
import '@testing-library/jest-dom';
import EditProfile from '../components/profile/edits/editProfile';
import {renderWithRedux} from "../components/functionTools/tools";
import axiosMock from "axios";

jest.mock("axios")

describe('Testing EditProfile component', () => {

    afterEach(cleanup)

    {/*** simuler une modification avec succès ainsi que les axios reçues'***/
    }
    it("verify if update is a success", async () => {

        const {getByTestId, getByRole} = renderWithRedux(<EditProfile/>);

        axiosMock.put.mockResolvedValueOnce({
            data: null
        })

        fireEvent.change(getByTestId("editProfile-name"), {target: {value: "MOISE Rajese"}})
        fireEvent.click(getByTestId("editProfile-button"));

        await waitFor(() => {
            expect(getByRole("alert")).toHaveTextContent(/profile mis a jour/i)
            expect(axiosMock.put).toHaveBeenCalledTimes(1)
            expect(axiosMock.put).toHaveBeenCalledWith("api/profiles/updateProfile",
                expect.objectContaining({}),
                {"headers": undefined})
            });
    });

})



