import React from 'react'
import { cleanup, fireEvent, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import Register from '../components/authentification/register/register';
import { renderWithRedux } from "../components/functionTools/tools";


describe('Testing register component', () => {

    afterEach(cleanup)

    {/*** Vérifier le titre du formulaire ***/}
    it("Verify the form's title", () => {
        const { getByTestId } = renderWithRedux(<Register/>);

        expect(getByTestId("formulaire")).toHaveTextContent("Formulaire d'inscription")
    })

    {/*** Vérifier le label codition ***/}
    it("Verify the codition label", () => {
        const { getByTestId } = renderWithRedux(<Register/>);

        expect(getByTestId("condition")).toHaveTextContent("J'accepte les Conditions Générales d'Utilisation")
    })

    {/*** Vérifier le checkbox du codition ***/}
    it("Verify if the checkbox is checked", () => {
        const { getByTestId } = renderWithRedux(<Register/>);

        expect(getByTestId("checkBox").checked).toEqual(false)
    })

    {/*** Vérifier si le bouton 'créer votre compte Auditeur Pro' est bien en disable ***/}
    it("Verify if the auditeur Pro's button is disable", () => {
        const { getByTestId } = renderWithRedux(<Register/>);

        expect(getByTestId("auditeurPro")).not.toBeDisabled();
    })

    {/*** simuler onClick du label condition***/}
    it("simulate condition label onClick", async () => {
        const handleClick = jest.fn();

        const { getByTestId } = renderWithRedux(<label htmlFor="sw2"
                                                       className="text-monospace border-bottom cursor-pointer text-muted"
                                                       data-testid="condition"
                                                       onClick={handleClick}>
            J'accepte les Conditions Générales d'Utilisation
        </label>);

        fireEvent.click(getByTestId("condition"));

        waitFor(() => getByTestId("condition")).then(el => {
            expect(handleClick).toHaveBeenCalled()
            expect(el).toHaveTextContent("J'accepte les Conditions Générales d'Utilisation")
        })

    });

    {/*** simuler onClick du bouton 'Créer votre compte éditeur pro'***/}
    it("simulate button 'Créer votre compte Auditeur Pro' onClick", async () => {
        const handleClick = jest.fn();
        let disable;

        const { getByTestId } = renderWithRedux( <button type="submit" id="register" disabled={disable}
                                                         data-testid="auditeurPro"
                                                         className="btn btn-outline-primary btn-fab-md m-2 pl-4 pr-4"
                                                         onClick={handleClick}>Créer votre compte Auditeur Pro</button>);

        fireEvent.click(getByTestId("auditeurPro"));

        waitFor(() => getByTestId("auditeurPro")).then(el => {
            expect(handleClick).toHaveBeenCalled();
            expect(el).toHaveTextContent("Créer votre compte Auditeur Pro")
        })
    });

    {/*** Vérifier le titre 'Vous possédez déjà un compte?' ***/}
    it("Verify the condition label", () => {
        const { getByTestId } = renderWithRedux(<Register/>);

        expect(getByTestId("questionLabel")).toHaveTextContent("Vous possédez déjà un compte?")
    })

    {/*** simuler onClick du bouton 'Créer votre compte éditeur pro'***/}
    it("simulate button 'Identifiez-vous' onClick", async () => {
        const handleClick = jest.fn();

        const { getByTestId } = renderWithRedux(<button className="btn btn-outline-primary m-3 pl-5 pr-5"
                                                        data-testid="identify"
                                                        onClick={handleClick}> Identifiez-vous </button>);

        fireEvent.click(getByTestId("identify"));

        waitFor(() => getByTestId("identify")).then(el => {
            expect(handleClick).toHaveBeenCalled();
            expect(el).toHaveTextContent("Identifiez-vous")
        })
    });

});

