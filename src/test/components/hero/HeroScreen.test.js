import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { HeroScreen } from "../../../components/hero/HeroScreen";
import { types } from "../../../types/types";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('Tests in <HeroScreen />', () => {
    test('should dont show the HeroScreen if the url no have heroId', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero"] }>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
    
        expect( wrapper.find('h1').text().trim() ).toBe('No Hero Page');
    });
    
    test('should show the HeroScreen if the url have heroId', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/marvel-spider"] }>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
    
        expect( wrapper.find('.row').exists() ).toBe(true);
    });

    test('should return back', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/marvel-spider"] }>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');

        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    });

    test('should show the No Hero Page if hero not exist', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ["/hero/perseo"] }>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('No Hero Page');
    });
});