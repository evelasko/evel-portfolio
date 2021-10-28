const createEleWithClass = (tag, className) => {
    const ele = document.createElement(tag);
    ele.className = className;
    return ele;
};

const resolvePath = (path) => window.location.origin
  .concat(`${path[0] === "/" ? "" : "/"}${path}`)

  
class Slides {
    constructor(data) {
      this.data = data;
      this.container = createEleWithClass("div", "slides");
      this.currentIdx = 0;
      this.slides = this.data.map((entry, index) => {
        const slide = createEleWithClass("div", "slide");
        const title = createEleWithClass("h1", "slide-title");
        const meta = createEleWithClass("p", "slide-meta");
        const more = createEleWithClass("a", "slide-more");
        more.href = entry.link ? resolvePath(entry.link) : "#";
        slide.classList.add(index !== 0 ? "next" : "show-meta");
        meta.innerHTML = entry.meta;
        title.innerHTML = entry.title;
        more.innerHTML = "Read more";
        if (index == 0) {
          const slogan = createEleWithClass("h1", "slogan");
          const line1 = createEleWithClass("span", "sloganSmall");
          const line2 = createEleWithClass("span", "sloganLarge");
          const line3 = createEleWithClass("span", "sloganSmall");
          const line4 = createEleWithClass("span", "sloganLarge");
          line1.innerHTML = "an  ";
          line2.innerHTML = "artist</br>";
          line3.innerHTML = "who  ";
          line4.innerHTML = "codes";
          slogan.appendChild(line1);
          slogan.appendChild(line2);
          slogan.appendChild(line3);
          slogan.appendChild(line4);
          slide.appendChild(slogan);
        } else {
          slide.appendChild(meta);
          slide.appendChild(title);
          slide.appendChild(more);
        }
        

        this.container.appendChild(slide);
        return slide;
      });
    }
    mount(container) {
      container.appendChild(this.container);
    }
    onActiveIndexChange(activeIndex) {
      this.currentIdx = activeIndex;
      for (let i = 0; i < this.slides.length; i++) {
        if (activeIndex === i) {
          this.slides[i].classList.remove("next");
          this.slides[i].classList.remove("prev");
        } else {
          if (activeIndex > i) {
            this.slides[i].classList.remove("next");
            this.slides[i].classList.add("prev");
          } else {
            this.slides[i].classList.add("next");
            this.slides[i].classList.remove("prev");
          }
        }
      }
    }
    onMove(indexFloat) {
      this.container.style.transform = `translateY(${(indexFloat * 100) /
        this.slides.length}%)`;
    }
    appear() {
      this.container.classList.add("scrolling");
      this.slides[this.currentIdx].classList.remove("show-meta");
    }
    disperse(activeIndex) {
      //this.currentIdx = activeIndex;
      this.slides[this.currentIdx].classList.add("show-meta");
      this.container.classList.remove("scrolling");
      for (let index = 0; index < this.data.length; index++) {
        if (index > activeIndex) {
          this.slides[index].classList.add("next");
          this.slides[index].classList.remove("prev");
        } else if (index < activeIndex) {
          this.slides[index].classList.remove("next");
          this.slides[index].classList.add("prev");
        } else {
          this.slides[index].classList.remove("next");
          this.slides[index].classList.remove("prev");
        }
      }
    }
  }
  
export default Slides