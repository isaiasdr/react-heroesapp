import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"

import { getHeroById } from "../../selectors/getHeroeById";

//import batman from "../../assets/heroes/dc-batman.jpg"; import estatico
import { heroImages } from '../../helpers/heroImages';


export const HeroScreen = () => {

    const { heroId } = useParams();

    const navigate = useNavigate();

    const hero = useMemo( () => getHeroById( heroId ), [ heroId ] );

    if ( !hero ) {
        return <Navigate to="/" />
    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    // const imagePath = `/assets/heroes/${id}.jpg`;

    const handleReturn = () => {
        navigate( -1 );
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={ heroImages(`./${id}.jpg`) } className="img-thumbnail animate__animated animate__backInLeft" alt={ superhero } />
            </div>

            <div className="col-8">

                <h3 className="animate__animated animate__backInUp">{ superhero }</h3>

                <ul className="list-group list-group-flush animate__animated animate__backInDown">
                    <li className="list-group-item"> <b>Alter ego:</b> { alter_ego } </li>
                    <li className="list-group-item"> <b>Publisher:</b> { publisher } </li>
                    <li className="list-group-item"> <b>First Apperance:</b> { first_appearance } </li>
                </ul>

                <h5 className="mt-3 animate__animated animate__backInRight">Characters</h5>
                <p className="animate__animated animate__backInRight">{ characters }</p>

                <button 
                    className="btn btn-outline-primary animate__animated animate__backInRight"
                    type="button"
                    onClick={ handleReturn }
                >
                    Return
                </button>

            </div>
                
        </div>
    )
}
