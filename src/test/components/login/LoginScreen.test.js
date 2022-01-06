import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('Tests in <LoginScreen />', () => {

    const contextValue = {
        user: {
            logged: false,
        }, 

        dispatch : jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should do match with the snapshot', () => {

        expect( wrapper ).toMatchSnapshot();
    });

    test('should do the dispatch and the navigation', () => {

        wrapper.find('button').simulate('click');

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Isaias Domínguez',
            }
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/', { replace: true });

        localStorage.setItem('lastPath', '/dc');

        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true });
    });
})
