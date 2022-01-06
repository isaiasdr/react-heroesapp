import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"


describe('Test in authReducer', () => {
    test('should return the default state', () => {
        const state = authReducer( { logged: false }, {} );

        expect(state).toEqual({ logged: false });
    });

    test('should autheticate and place the "name" of the user', () => {
        const action = {
            type: types.login,
            payload: { name: 'Isaias Dominguez' }
        };
        const state = authReducer( { logged: false }, action );

        expect(state).toEqual({ 
            logged: true, 
            name: 'Isaias Dominguez' 
        });
    });

    test('should logout and remove the "name" of the user', () => {
        const action = {
            type: types.logout
        };
        const state = authReducer( { logged: true, name: 'Isaias Dominguez' }, action );

        expect(state).toEqual({ logged: false });
    });
});