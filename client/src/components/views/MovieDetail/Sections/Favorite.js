import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {

                } else {
                    alert("숫자 정보를 가져오는데 실패했습니다.")
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert("정보를 가져오는데 실패했습니다.")
                }
            })
    }, [])

    const onClickFavorite = () => {
        if (favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber - 1)
                        setFavorited(!favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 것을 실패했습니다.')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1)
                        setFavorited(!favorited)
                    } else {
                        alert('Favorite 리스트에서 추가하는 것을 실패했습니다.')
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{favorited ? 'Not Favorite' : 'Add to Favorite'} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite