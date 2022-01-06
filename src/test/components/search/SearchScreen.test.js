import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

describe('Test in <SearchScreen />', () => {

    test('should show the search screen correctly with default values', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Buscar un Heroe');
    });

    test('should show batman and the queryString value', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=batman'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('input').prop('value') ).toBe('batman');
    });

    test('should show error if not found the hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search?q=perseo'] }>
                <SearchScreen />
            </MemoryRouter>
        );
        
        expect( wrapper.find('input').prop('value') ).toBe('perseo');
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('No se encontraron resultados para la busqueda');
    });

    test('should call the navigate to the new screen', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'wonder'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });

        expect( mockNavigate ).toHaveBeenCalled();
        expect( mockNavigate ).toHaveBeenCalledWith('?q=wonder');
    });
    
});