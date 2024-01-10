import React, { useState } from "react";
import leo from "../images/leo.jpg";
import jailor from "../images/jailor.jpg"
import thunivu from "../images/thunivu.jpg"
const Moviebooking = () => {

    let Screens = [
        {
            id: 1,
            time: "10.30 am",
            seats: [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1]

        },
        {
            id: 2,
            time: "2.30 am",
            seats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]

        },
        {
            id: 3,
            time: "6.30 am",
            seats: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]

        }
    ]
    const Movies = [
        {
            id: 1,
            Title: "Leo",
            img: leo
        },
        {
            id: 2,
            Title: "thunivu",
            img: thunivu
        },
        {
            id: 3,
            Title: "jailor",
            img: jailor
        }
    ]

    const [selectedmovie, setselectedmovie] = useState(null);
    const [selectedscreen, setselectedscreen] = useState(null);
    const [selectedseat, setselectedseat] = useState([]);

    const handleSeleactedSeat = (index, screen) => {
        if (screen?.id !== selectedscreen?.id) {
            setselectedseat([index]);
            setselectedscreen(screen);
            return
        }
        setselectedscreen(screen)
        if (selectedseat.includes(index)) {
            setselectedseat(selectedseat.filter((i) => i !== index));
            if(selectedseat.filter((i) => i !== index).length < 1){
                setselectedscreen(null)
            }
        
        }
        else {
            setselectedseat((seats) => [...seats, index])
        }


    }
    const Booking = () => {
        alert(`seats ${selectedseat.map((index) => index + 1)} booked for ${selectedscreen.movie.Title} at ${selectedscreen.time}`)
        Screens = Screens.map(screen => {
            if (screen.id === selectedscreen?.id) {
                let seats = screen.seats;
                selectedseat.map((seat) => (seats[seat] = 0))
                return {
                    ...screen,
                    seats
                }
            }
            return screen

        })

        setselectedmovie(null)
        setselectedscreen(null)
        setselectedseat([])
    }


    return (
        <div >

            <div className="movie_heading">
            <h1>Movie bookng app</h1>
            </div>

            <h3>choose movie:</h3>
            <div className="movie-selection">{Movies.map((movie) => (
                <div className="movie" key={movie.id} onClick={() => setselectedmovie(movie)}>

                    <img className="movie-poster" src={movie.img} alt={movie.Title} />

                    <div className="movie-title">{movie.Title}</div>
                </div>)
            )}
            </div>


            {
                selectedmovie && (
                    <>
                        <h2>choose your screen</h2>
                        <div className="screen-selection">

                            {Screens.map((screen) =>
                                <div className={`screen ${screen?.id === selectedscreen?.id ? "selected" : ""} 
                                       ${screen.seats.includes(1) ? "available" : ""}`}>
                                    <div className="screen-number">screen {screen.id}</div>
                                    <div className="screen-time">{screen.time}</div>
                                    <div className="movie-title">{selectedmovie.Title}</div>
                                    <div className="screen-seats">
                                        {
                                            screen.seats.map((seat, index) => (<div
                                                key={index}
                                                className=//seats available are not,seat selected or not,seat booked or not
                                                {`seats ${seat ? "available"
                                                    :
                                                    "unavailable"} 
                                                    
                                                    
                                                    ${selectedseat.includes(index) && selectedscreen?.id === screen?.id
                                                        ? "selected"
                                                        : ""}
                                                    
                                                    ${selectedseat.includes(index) ? "booked" : ""}
                                                     `} onClick={() => {
                                                    if (seat) { handleSeleactedSeat(index, { ...screen, movie: selectedmovie }) }
                                                }}>
                                                <div className="seat-number">{index + 1}</div>
                                            </div>))

                                        }
                                    </div>

                                </div>)}
                        </div>

                    </>
                )}
            <div className="booking-summary">
                <div className="selected-screen">
                    {
                        selectedscreen && (
                            <div>

                                <h3>selected screen: {selectedscreen.id}</h3>
                                <p>time: {selectedscreen.time}</p>
                                <p>movie: {selectedscreen.movie.Title}</p>

                            </div>

                        )
                    }
                    <div className="selected-seats">
                        {selectedscreen && selectedseat?.length > 0 && (
                            <div>
                                <h3>selected seats: <>{selectedseat.map((index) => index + 1).join(",")}</></h3>
                                <h3>no of tickets: {selectedseat?.length}</h3>


                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button className="payment-button" onClick={Booking} disabled={!selectedscreen || selectedscreen?.length === 0}>BOOK NOW</button>
        </div>
    );
}
export default Moviebooking