import React from 'react'
import {cleanup, fireEvent, waitFor} from "@testing-library/react"
import '@testing-library/jest-dom';
import Login from '../components/authentification/login/login';
import { renderWithRedux } from "../components/functionTools/tools";
import axiosMock from "axios";

jest.mock("axios")

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('Testing Login component', () => {

    afterEach(cleanup)

    {/*** simuler un authentification sans remplissage'***/}
    it("verify if there aren't email and password", async () => {

        const { getByTestId,getByRole } = renderWithRedux(<Login />);

        fireEvent.click(getByTestId("login-button"));

        await waitFor(() => {
            expect(getByRole("alert")).toHaveTextContent("email et/ou mot de passe non remplis");
        });
    });

    {/*** simuler un authentification avec email ou mot de passe incorrect'***/}
    it("wrong email or password", async () => {

        const { getByTestId, getByRole } = renderWithRedux(<Login />);

        axiosMock.post.mockResolvedValueOnce({
            data: null
        })

        fireEvent.change(getByTestId("login-email"), {target: {value: "moiseraidjy@gmail.com"}})
        fireEvent.change(getByTestId("login-password"), {target: {value: "LJKKHhjjhj777&&"}})

        fireEvent.click(getByTestId("login-button"));


        await waitFor(() => {
            expect(getByRole("alert")).toHaveTextContent("email ou mot de passe incorrect")
        });
    });

    {/*** simuler un authentification avec succès ainsi que les axios reçues'***/}
    it("verify if login success", async () => {

        const { getByTestId, getByRole } = renderWithRedux(<Login />);

        axiosMock.post.mockResolvedValueOnce({
            data: null
        })

        fireEvent.change(getByTestId("login-email"), {target: {value: "moiseraidjy@gmail.com"}})
        fireEvent.change(getByTestId("login-password"), {target: {value: "Kyle781227"}})

        fireEvent.click(getByTestId("login-button"));


        await waitFor(() => {
            //expect(getByRole("alert")).toHaveTextContent("Vous êtes connecté")
            expect(axiosMock.post).toHaveBeenCalledWith("api/users/login",
                {"email": "moiseraidjy@gmail.com", "password": "Kyle781227"},
                {"headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}})
        });
    });


    {/*** simuler onClick du bouton ***/}
    it("simulate button 'Identifiez-vous' onClick", async () => {
        const handleClick = jest.fn();

        const { getByTestId } = renderWithRedux(<button className="r-btn m-1 r-5" data-testid="login-creerCompte"
                                                        onClick={handleClick}>Créer un compte</button>);

        fireEvent.click(getByTestId("login-creerCompte"));

        waitFor(() => getByTestId("login-creerCompte")).then(el => {
            expect(handleClick).toHaveBeenCalled();
            expect(el).toHaveTextContent("Créer un compte")
        })
    });

    {/***
     *
     *  Vérifier usehistory(/register)
     *  COMMENTER document.getElementsByClassName("close")[0].click();
     *  et HomeRoot.beforeDataLoad().then(() => null); de la fonction
     *  hancleClick dans Login component pour que le test
     *  marche.
     *
     *  Puis décommenter fireEvent.click(getByTestId("login-creerCompte"));
     *  et expect ci-dessous
     *
     ***/}
    it("simulate the button's response", async () => {
        const { getByTestId } = renderWithRedux(<Login/>);

        //fireEvent.click(getByTestId("login-creerCompte"));
        //expect(mockHistoryPush).toHaveBeenCalledWith('/register');
    });
});
