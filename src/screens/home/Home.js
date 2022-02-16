import React,{useState, useEffect} from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import GridListTile from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Filter from '../filter/Filter'


export default function Home(props){



    const [movieList, setMovie] = useState([]);
    const [releasedMovieList, setReleasedMovies] =useState([]);

    function loadData(){

        fetch(props.baseUrl+"movies/?page=1&limit=17")
            .then(input=>input.json())
            .then(data=>{
                setMovie(JSON.parse(JSON.stringify(data.movies)));
                setReleasedMovies(JSON.parse(JSON.stringify(data.movies)));
            })
    }

    useEffect(() => {
        loadData();
    }, []);

    return(
        <div className="main-Container">
            <Header {...props} />
            {upcomingMovies(props, movieList)}
            {currentMovies(props, releasedMovieList)}

        </div>);
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: 'indianred',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


function upcomingMovies(props, movieList) {

    let tempMovies = movieList.filter((movie) => movie.status === "PUBLISHED");
    const classes = useStyles();
    return (

        <div className="upComingMovies">
            <div className="heading">Upcoming Movies</div>
            <div className="upcomingMovieList">
                <ImageList cols={6} rowHeight={250} className={classes.imageList} >
                    {tempMovies.map((item) => (
                        <ImageListItem key={item.poster_url} >
                            <Link to={"/movie/"+item.id} > <img width="170" height="250"  src={item.poster_url} alt={item.title} />
                                <ImageListItemBar
                                    title={item.Title}
                                />
                            </Link>
                        </ImageListItem>
                    ))}
                </ImageList>

            </div>
        </div>
    );
}





function currentMovies(props, movieDetails)  {

    const [movieListShow, setMovieShow] = useState([]);
    const [resetMovieList, setResetMovieList] = useState([]);
    const [movieListFilter, setMovieFilter] = useState([]);
    let tempmovies = movieDetails.filter((movie) => movie.status === "RELEASED");
    useEffect(() => {
        setMovieShow(tempmovies);
        setResetMovieList(tempmovies);
    }, [props]);

    const handleFilterUpdate = (val) => {

        let tempMovieList = [...movieDetails];
        console.log(tempMovieList);
        if(val.movieName.length > 0 || val.genrename.length > 0 || val.personName.length > 0){
            tempMovieList =  tempMovieList.filter((item)=>{
                if(val.movieName.length > 0 && item.title.toLowerCase().indexOf(val.movieName.toLowerCase()) !== -1){
                    return item;
                }else if(val.genrename.length > 0 ){
                    for (const gen of val.genrename){
                        if(item.genres.includes(gen)){
                            return item;
                        }
                    }
                }else if(val.personName.length > 0 ){
                    for (const person of val.personName){
                        if(item.artists) {
                            for (const artist of item.artists) {
                                if (artist.first_name === person.split(" ")[0]) {
                                    return item;
                                }
                            }
                        }
                    }
                }
                return false;

            });

            setMovieShow(tempMovieList)
        }else{
            console.log(resetMovieList)
            setMovieShow(resetMovieList)
        }

    }


console.log("before render");
    console.log(movieListShow);
    return (
        <div className="currentMovies">
            <div className="">
                <Grid container className="movielist" spacing={4}>
                    <Grid item xs={8}>
                        <GridListTile>
                            {movieListShow.length > 0?movieListShow.map((item) => (
                                <ImageListItem key={item.poster_url}>
                                    <Link to={"/movie/" + item.id}>
                                        {" "}
                                        <img width="170" height="400"  src={item.poster_url} alt={item.title} />
                                        <ImageListItemBar
                                            title={item.title}
                                            subtitle={<span>Release Date: {item.release_date}</span>}
                                        />
                                    </Link>
                                </ImageListItem>
                            )):tempmovies.map((item) => (
                                <ImageListItem key={item.poster_url}>
                                    <Link to={"/movie/" + item.id}>
                                        {" "}
                                        <img width="170" height="400" src={item.poster_url} alt={item.title} />
                                        <ImageListItemBar
                                            title={item.title}
                                            subtitle={<span>Release Date: {item.release_date}</span>}
                                        />
                                    </Link>
                                </ImageListItem>
                            ))}
                        </GridListTile>
                    </Grid>
                    <Grid item xs={3}>
                        <Filter movieList={movieListShow.length >0 ?movieListShow: tempmovies} filterTrigger={handleFilterUpdate}/>

                    </Grid>
                </Grid>
            </div>
        </div>
    );

}

