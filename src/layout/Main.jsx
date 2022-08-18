import React, {useState,useEffect} from "react";
import {Movies} from "../components/Movies"
import {Search} from "../components/Search"
import {Preloader} from "../components/Preloader"

const API_KEY = process.env.REACT_APP_API_KEY;

function Main  () {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    

    const searchMovies = (str, type ='all') => {
        setLoading({loading: true});
        fetch(
            `http://www.omdbapi.com/?apikey=8fbf8cfc&s=${str}${
            type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then(response => response.json())
            .then((data) =>  {
                setMovies(data.Search);
                setLoading(false);
            })
            .catch ((err) =>{
                setLoading(false);
            })
    }

    
    useEffect(()=>{
        fetch(`http://www.omdbapi.com/?apikey=8fbf8cfc&s=matrix`)
        .then(response => response.json())
        .then((data) =>  {
            setMovies(data.Search);
            setLoading(false);
        })
        .catch ((err) =>{
            setLoading(false);
        })
    },[])


        return <main className="container content">
            <Search searchMovies = {searchMovies}/>
            {loading ? <Preloader /> : <Movies movies = { movies } /> }
        </main>
}
export {Main}