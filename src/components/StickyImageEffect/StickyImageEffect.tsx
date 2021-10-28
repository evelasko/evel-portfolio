import Showcase from "./Showcase"
import Slides from "./Slides"
import Cursor from "./Cursor"
import "../Typography.css"
import "./base.css"
import "./styles.css"
//@ts-ignore
import image0 from "../../images/0.jpg"
//@ts-ignore
import image1 from "../../images/1.jpg"
//@ts-ignore
import image2 from "../../images/2.jpg"
//@ts-ignore
import image3 from "../../images/3.jpg"
//@ts-ignore
import image4 from "../../images/4.jpg"
//@ts-ignore
import image5 from "../../images/5.jpg"

const stickyImageEffectRender = () => {
    const container = document.getElementById("app");
    const cursor = new Cursor(document.querySelector(".cursor"));

    const slidesData = [
        {
            image: image0,
            title: " ",
            meta: "an artist who codes",
            link: "#",
        },
        {
            image: image1,
            title: "Art",
            meta: "Choreography / Performing Arts",
            link: "art",
        },
        {
            image: image2,
            title: "Design",
            meta: "Graphics / Branding / Stage Lighting",
            link: "design",
        },
        {
            image: image3,
            title: "Code",
            meta: "Mobile & Web / Show Control / Scripting",
            link: "coding",
        },
        {
            image: image4,
            title: "Bio",
            meta: "",
            link: "bio",
        },
        // {
        //     image: image5,
        //     title: "Contact",
        //     meta: "",
        //     link: "#",
        // }
    ];

    const slides = new Slides(slidesData);
    const showcase = new Showcase(slidesData, {
    onActiveIndexChange: activeIndex => {
        slides.onActiveIndexChange(activeIndex);
    },
    onIndexChange: index => {
        slides.onMove(index);
    },
    onZoomOutStart: ({ activeIndex }) => {
        cursor.enter();
        slides.appear();
    },
    onZoomOutFinish: ({ activeIndex }) => {},
    onFullscreenStart: ({ activeIndex }) => {
        cursor.leave();
        slides.disperse(activeIndex);
    },
    onFullscreenFinish: ({ activeIndex }) => {}
    });

    showcase.mount(container);
    slides.mount(container);
    showcase.render();

    window.addEventListener("resize", function() {
    showcase.onResize();
    });

    window.addEventListener("mousemove", function(ev) {
    showcase.onMouseMove(ev);
    });
}

export default stickyImageEffectRender
