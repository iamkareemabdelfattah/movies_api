import axios from 'axios';
import React, { useEffect, useState } from 'react';
import home from './home.module.css';
import { Link } from 'react-router-dom';

export default function Home ()
{
    let imgBaseUrl = 'https://image.tmdb.org/t/p/w500';
    let [ trendingMovies, setTrendingMovies ] = useState( [] );
    let [ trendingPeople, setTrendingPeople ] = useState( [] );
    let [ trendingTvshows, setTrendingTvshows ] = useState( [] );

    async function getTrendingItems ( mediaType, callback )
    {
        let { data } = await axios.get( `https://api.themoviedb.org/3/trending/${ mediaType }/day?api_key=b83cc031768f2a4781dd594de3d35111` );
        callback( data.results.slice( 0, 10 ) );
    }

    useEffect( () =>
    {
        getTrendingItems( 'movie', setTrendingMovies );
        getTrendingItems( 'tv', setTrendingTvshows );
        getTrendingItems( 'person', setTrendingPeople );

    }, [] );

    return (
        <>
            { trendingMovies != null && trendingTvshows != null && trendingPeople != null ? <div className="container">


            <div className='row my-5'>

                <div className="col-md-4">
                    <div>
                        <div className="brdr w-25"></div>
                        <div className={ home.title }>
                            <h2>Trending <br /> Movies  <br /> to watch now</h2>
                            <span className='my-5 text-muted'>Most watch movies by days</span>
                        </div>
                        <div className="brdr"></div>
                    </div>
                </div>

                { trendingMovies.map( ( movie, index ) =>
                    <div className='col-md-2 my-2' key={ index }>
                        <Link to={`/details/${ movie.id }`}>
                        <img className='w-100' src={ imgBaseUrl + movie.poster_path } alt={ movie.title } />
                            <h2 className='h6 mt-2'>{ movie.title }</h2>
                        </Link>
                    </div>
                ) }

            </div>

            <div className='row my-5'>
                <div className="col-md-4">
                    <div>
                        <div className="brdr w-25"></div>
                        <div className={ home.title }>
                            <h2>Trending <br /> TV shows  <br /> to watch now</h2>
                            <span className='my-5 text-muted'>Most watch tv shows by days</span>
                        </div>
                        <div className="brdr"></div>
                    </div>
                </div>
                { trendingTvshows.map( ( tv, index ) =>
                    <div className='col-md-2 my-2' key={ index }>
                        <Link to={`/details/${ tv.id }`}>
                        <img className='w-100' src={ imgBaseUrl + tv.poster_path } alt="tv.title" />
                            <h2 className='h6 mt-2'>{ tv.name }</h2>
                        </Link>
                    </div>
                ) }
            </div>

            <div className='row my-5'>
                <div className="col-md-4">
                    <div>
                        <div className="brdr w-25"></div>
                        <div className={home.title}>
                            <h2>Trending <br /> People  <br /> to watch now</h2>
                            <span className='my-5 text-muted'>Most watch People by days</span>
                        </div>
                        <div className="brdr"></div>
                    </div>
                </div>
                { trendingPeople.map( ( person, index ) =>
                    <div className='col-md-2 my-2' key={ index }>
                        <Link to={ `/details/${ person.id }` }>

                            <img className='w-100' src={ imgBaseUrl + person.profile_path } alt="people.title" />
                            <h2 className='h6 mt-2'>{ person.name }</h2>
                            </Link>

                    </div>
                ) }
            </div>
        </div > : <div className="vh-100 d-flex justify-content-center align-items-center">

            <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>

        </div>
            }
            

        </>
    );
}
