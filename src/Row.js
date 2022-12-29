// import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from './axios'
import "./Row.css"
import Youtube from "react-youtube"
import movieTrailer from 'movie-trailer'


const base_url = 'https://image.tmdb.org/t/p/original'

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        // Fetch the movies from the API
        // Set the movies to the state.
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: '600',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = movie => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            if (isLargeRow) {
                movieTrailer(movie?.name || '')
                    .then(url => {
                        const urlParams = new URLSearchParams(new URL(url).search)

                        setTrailerUrl(urlParams.get('v'))
                    })
                    .catch(error => console.error(error.message))
            }
            else {
                movieTrailer(null, { tmdbId: movie.id })
                    .then((url) => {
                        console.log("url is " + url);
                        const urlParams = new URLSearchParams(new URL(url).search);
                        console.log("urlParamsn" + urlParams);
                        setTrailerUrl(urlParams.get("v"));
                    })
                    .catch((error) => console.log(error));
            }

        }
    }

    return (

        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img key={movie.id}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div >
    )
}

export default Row
