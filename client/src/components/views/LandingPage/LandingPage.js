import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import { Row } from 'antd';
import GridCards from '../commons/GridCards';

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
        fetchMovies(endpoint);
    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...movies, ...response.results]);
                if (mainMovieImage === null) setMainMovieImage(response.results[0]);
                setCurrentPage(response.page);
            })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${currentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <>
            <div style={{ width: '100%', margin: 0 }}>
                {mainMovieImage &&
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                        title={mainMovieImage.title}
                        text={mainMovieImage.overview}
                    />
                }
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2>Movies by latest</h2>
                    <hr />
                    <Row gutter={[16, 16]}>
                        {movies && movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                    movieId={movie.id}
                                    movieName={movie.title}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreItems}>Load More</button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
