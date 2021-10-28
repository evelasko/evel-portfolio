import React from "react"
import Seo from "../components/SEO"
import stickyImageEffectRender from "../components/StickyImageEffect/StickyImageEffect"
import { motion } from "framer-motion"

class Motion extends React.Component {
    componentDidMount () {
        stickyImageEffectRender()
    }

    render () { 
        return (
            <>
            <Seo title="Sticky Image Render" description=""/>
            <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75 }}
              >
            <main>
                <div className="frame">
                    <div className="frame__title-wrap">
                        <h1 className="frame__title">Enrique Velasco</h1>
                        {/* <p className="frame__tagline">An artist who codes</p> */}
                    </div>
                    {/* <div className="frame__links">
                        <a href="https://tympanus.net/Development/CrossroadsSlideshow/">Previous demo</a>
                        <a href="https://tympanus.net/codrops/?p=39980">Article</a>
                        <a href="https://github.com/Anemolo/StickyImageEffect">GitHub</a>
                    </div> */}
                    <div className="frame__tip">CLICK &amp; DRAG</div>
                </div>
                
                <div className="content" id="app"></div>

            </main>
            <div className="cursor">
                <div className="cursor__inner cursor__inner--circle"></div>
                <div className="cursor__inner cursor__inner--dot"></div>
            </div>
            </motion.div>
            </>
        )
    }
}

export default Motion