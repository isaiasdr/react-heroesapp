import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('Tests in <Navbar', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Pedro'
        }, 

        dispatch: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/'] }>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should show correctly', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pedro');
    });

    test('should call the logout, call navigate and the dispatch with the params', () => {

        wrapper.find('button').simulate('click');

        expect( contextValue.dispatch ).toHaveBeenCalledWith({'type': types.logout});
        expect( mockNavigate ).toHaveBeenCalledWith('/login', { replace: true });
    });
})
