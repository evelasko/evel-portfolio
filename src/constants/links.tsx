import React from "react"
import {
    FaFacebookSquare as Facebook,
    FaTwitterSquare as Twitter,
    FaInstagram as Instagram,
    FaLinkedin as Linkedin,
} from "react-icons/fa"

export const menuItems = [
    {
        path: "/",
        text: "home",
    },
    {
        path: "/bio",
        text: "bio",
    },
    {
        path: "/art",
        text: "art",
    },
    {
        path: "/design",
        text: "design"
    },
    {
        path: "/coding",
        text: "coding",
    },
    // {
    //     path: "/blog",
    //     text: "investigación"
    // },
    {
        path: "/contact",
        text: "contact",
    },
]

export const socialItems = [
    {
        path: "www.facebook.com",
        icon: <Facebook />,
    },
    {
        path: "www.twitter.com",
        icon: <Twitter />,
    },
    {
        path: "www.instagram.com",
        icon: <Instagram />,
    },
    {
        path: "www.linkedin.com",
        icon: <Linkedin />,
    },
]
