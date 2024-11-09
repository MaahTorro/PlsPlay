export default function Poster({ backdrop_path }) {
    return (
        <div>
            <div className="flex">
            <img src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`} className="w-100"/>
            </div>
        </div>
    )
}