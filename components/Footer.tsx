import React from 'react'

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="absolute text-center w-full mt-5 bottom-5">©{new Date().getFullYear()} Made by Ayanda Kinyambo</footer>
    )
}

export default Footer