import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Navigate: () => <span>Saliendo de aqui</span>
}));


describe('Tests in <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();


    test('should show the component if the user is authenticated and save in the localStorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Isaias Domínguez'
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( wrapper.find('h1').text().trim() ).toBe('Private Component');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');
    });

    test('should not show the component if the user is not authenticated', () => {
        const contextValue = {
            user: {
                logged: false
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper.text().trim() ).toBe('Saliendo de aqui');
    });
});