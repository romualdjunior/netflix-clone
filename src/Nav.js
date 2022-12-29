import React from 'react'
import "./Nav.css"
import { useState, useEffect } from 'react'

function Nav() {
    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else {
                handleShow(false)
            }
        })

        return () => {
            window.removeEventListener('scroll', null)
        }
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt='Netflix Logo'
            />

            <img
                className="nav__avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGTWWNGWNPtsc4SK4L30-b7lFDCjMO8LTlL5iYpvVr8H_MsXe9KIN-3WYfEL-dDrOZcY&usqp=CAU"
                alt='UserImage'
            />
        </div>
    )
}

export default Nav