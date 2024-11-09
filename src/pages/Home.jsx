import { useEffect, useState, useRef } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);

    // Refs para os contêineres
    const popularesRef = useRef(null);
    const trendingRef = useRef(null);
    const upcomingRef = useRef(null);

    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all(
                [
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]
            );

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            console.error("Erro ao buscar os filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);


    const handleDragScroll = (ref) => {
        let isDown = false;
        let startX;
        let scrollLeft;

        const startDragging = (e) => {
            isDown = true;
            ref.current.classList.add("active");
            startX = e.pageX - ref.current.offsetLeft;
            scrollLeft = ref.current.scrollLeft;
        };

        const stopDragging = () => {
            isDown = false;
            ref.current.classList.remove("active");
        };

        const move = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - ref.current.offsetLeft;
            const walk = (x - startX) * 2; 
            ref.current.scrollLeft = scrollLeft - walk;
        };

        ref.current.addEventListener("mousedown", startDragging);
        ref.current.addEventListener("mouseleave", stopDragging);
        ref.current.addEventListener("mouseup", stopDragging);
        ref.current.addEventListener("mousemove", move);
    };

    useEffect(() => {
        if (popularesRef.current) handleDragScroll(popularesRef);
        if (trendingRef.current) handleDragScroll(trendingRef);
        if (upcomingRef.current) handleDragScroll(upcomingRef);
    }, [filmesPopulares, filmesTrending, filmesUpcoming]);

    return (
        <>
            {/* Seção Populares */}
            <CardContainer titulo="Populares">
                <div ref={popularesRef} className="flex overflow-x-hidden space-x-4 py-4 px-2 cursor-grab">
                    {filmesPopulares.map(filme => (
                        <div key={filme.id} className="min-w-[150px]">
                            <MovieCard {...filme} />
                        </div>
                    ))}
                </div>
            </CardContainer>

            {/* Seção Trending */}
            <CardContainer titulo="Trending">
                <div ref={trendingRef} className="flex overflow-x-hidden space-x-4 py-4 px-2 cursor-grab">
                    {filmesTrending.map(filme => (
                        <div key={filme.id} className="min-w-[150px]">
                            <MovieCard {...filme} />
                        </div>
                    ))}
                </div>
            </CardContainer>

            {/* Seção Em Breve */}
            <CardContainer titulo="Em Breve">
                <div ref={upcomingRef} className="flex overflow-x-hidden space-x-4 py-4 px-2 cursor-grab">
                    {filmesUpcoming.map(filme => (
                        <div key={filme.id} className="min-w-[150px]">
                            <MovieCard {...filme} />
                        </div>
                    ))}
                </div>
            </CardContainer>
        </>
    );
}
