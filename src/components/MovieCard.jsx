import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path, backdrop_path }) {
    return (
        <div>
            {/* <h2>{title}</h2> */}

            <img src={`https://image.tmdb.org/t/p/w154${poster_path}`} className="w-100"/>
            <Link to={`/movies/${id}`} className="font-serif bg-cyan-800 flex text-white justify-around h-14 items-center">Saber mais</Link>

        </div>
    )

}