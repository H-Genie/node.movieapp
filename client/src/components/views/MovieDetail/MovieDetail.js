import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import { Row } from 'antd';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [movie, setMovie] = useState([]);
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response);
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })
    }, [])

    const toggleActorView = () => setActorToggle(!actorToggle)

    return (
        <div>
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
                title={movie.title}
                text={movie.overview}
            />
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                <MovieInfo movie={movie} />
                <br />

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {actorToggle &&
                    <Row gutter={[16, 16]}>
                        {casts && casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    actorName={cast.name}
                                />
                            </React.Fragment>
                        ))}
                    </Row>}
            </div>
        </div>
    )
}

export default MovieDetail
