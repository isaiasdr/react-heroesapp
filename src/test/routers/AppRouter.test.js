import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";


describe('Test in <AppRouter />', () => {

    test('should show login screen if user is no authenticated', () => {
        
        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>,
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' );
    });

    test('should show default screen if user is login', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Isaias Dominguez'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>,
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe( true );
    });
    

});
