import React from "react"
import NavModule from "./NavModule/NavModule"
import AnimMain from "./AnimMain/AnimMain"
import Footer from "./Footer/Footer"
import "@fontsource/heebo"
import { motion } from "framer-motion"
import { ParallaxProvider } from "react-scroll-parallax"
import "./Typography.css"
import "./Layout.css"

const Layout = ({ children }) => {
    return (
        <>
            <ParallaxProvider>
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75 }}
              >
                  <NavModule />
                  <AnimMain>
                      {children}
                      <Footer />
                  </AnimMain>
              </motion.div>
            </ParallaxProvider>
        </>
    )
}

export default Layout
