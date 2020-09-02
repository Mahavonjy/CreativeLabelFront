import React from 'react'
import {cleanup, fireEvent, waitFor} from "@testing-library/react"
import '@testing-library/jest-dom';
import Login from '../components/authentification/login/login';
import { renderWithRedux } from "../components/functionTools/tools";
import axiosMock from "axios";

jest.mock("axios")



describe('Testing register component', () => {

    afterEach(cleanup)

    {/*** simuler un authentification sans remplissage'***/}
    it("verify if there aren't email and password", async () => {

        const { getByTestId,getByRole } = renderWithRedux(<Login />);

        fireEvent.click(getByTestId("login-button"));

        await waitFor(() => {
            expect(getByRole("alert")).toHaveTextContent("email et/ou mot de passe non remplis");
        });
    });

    {/*** simuler un authentification avec succès ainsi que les axios reçues'***/}
    it("verify if there are email and password", async () => {

        const { getByTestId } = renderWithRedux(<Login />);

        axiosMock.post.mockResolvedValueOnce({
            data: null
        })

        fireEvent.change(getByTestId("login-email"), {target: {value: "moiseraidjy@gmail.com"}})
        fireEvent.change(getByTestId("login-password"), {target: {value: "Kyle781228&é&"}})

        fireEvent.click(getByTestId("login-button"));


        await waitFor(() => {
            expect(axiosMock.post).toHaveBeenCalledWith("api/users/login",
                {"email": "moiseraidjy@gmail.com", "password": "Kyle781228&é&"},
                {"headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}})
        });
    });

});
