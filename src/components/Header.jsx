import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {



    return (
        <>
            <header className="bg-cyan-800 flex text-white justify-around h-14 items-center">
                <div>
                    <h2 className="font-bold text-2xl">Portal Filmes</h2>
                </div>
                <nav>
                    <ul className="flex gap-4">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/genre">Gêneros</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}