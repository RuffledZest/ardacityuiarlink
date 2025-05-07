/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"

import ShapeBlur from "../components/ShapeBlur"
import InfiniteMenu from "../components/InfiniteMenu"
import FollowCursor from "../components/FollowCursor"
import MagnetLines from "../components/MagnetLines"
import VariableProximity from "../components/VariableProximity"
import GlitchText from "../components/GlitchText"
import RotatingText from "../components/RotatingText"
import CircularText from "../components/CircularText"
import BlurText from "../components/BlurText"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import TextPressure from "../components/ArDacityUi/TextPressure/TextPressure"
import Waves from "../components/Waves"
import { connectWallet, disconnectWallet, getWalletAddress } from '../components/arweaveUtils';
import { useLocation } from "react-router-dom"

import hh from ".././../public/hh.png"
import hh2 from ".././../public/hh2.png"
import hh3 from ".././../public/hh3.png"

import hf from ".././../public/hf.png"
import hf2 from ".././../public/hf2.png"
import hf3 from ".././../public/hf3.png"

// Sample features data
const features = [
  {
    title: "Responsive Components",
    description: "All UI components are fully responsive and work on all devices and screen sizes.",
    icon: "📱",
  },
  {
    title: "Arweave Integration",
    description: "Built-in handlers for Arweave blockchain interactions and data storage.",
    icon: "🔗",
  },
  {
    title: "Customizable",
    description: "Easily customize components to match your brand and design requirements.",
    icon: "🎨",
  },
  {
    title: "Performance Optimized",
    description: "Lightweight and optimized for the best possible performance.",
    icon: "⚡",
  },
  {
    title: "Developer Friendly",
    description: "Well-documented API with TypeScript support for a great developer experience.",
    icon: "👨‍💻",
  },
  {
    title: "Open Source",
    description: "Free and open source. Contribute to the project on GitHub.",
    icon: "🔓",
  },
]

// Sample showcase projects
const showcaseProjects = [
  {
    title: "ArDacity Dashboard",
    description: "A comprehensive dashboard for Arweave data visualization",
    image: hf,
    link: "#",
  },
  {
    title: "NFT Marketplace",
    description: "A decentralized marketplace for NFTs on Arweave",
    image: hf2,
    link: "#",
  },
  {
    title: "Gaming Platform",
    description: "A gaming platform built on Arweave with real-time data",
    image: hf3,
    link: "#",
  },
]

// Sample menu items for InfiniteMenu
const menuItems = [
  {
    image: hh,
    link: "#components",
    title: "Components",
    description: "Explore our UI components",
  },
  {
    image: hh2,
    link: "#features",
    title: "Features",
    description: "Discover what makes us special",
  },
  {
    image: hh2,
    link: "#showcase",
    title: "Showcase",
    description: "See what you can build",
  },
  {
    image: hh3,
    link: "https://github.com/RuffledZest/MarkOne_ArDacityUI",
    title: "GitHub",
    description: "Check out our code",
  },
]

export default function   Home() {
  const [isVisible, setIsVisible] = useState({})
  const observerRefs = useRef({})
  const containerRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  // Animation for scroll reveal
  useEffect(() => {
    const observers = {}

    const observerCallback = (entries, id) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [id]: true }))
        }
      })
    }

    Object.keys(observerRefs.current).forEach((id) => {
      const element = observerRefs.current[id]
      if (element) {
        observers[id] = new IntersectionObserver((entries) => observerCallback(entries, id), { threshold: 0.1 })
        observers[id].observe(element)
      }
    })

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect())
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const setRef = (id) => (element) => {
    observerRefs.current[id] = element
  }
  const location = useLocation();
    const [walletAddress, setWalletAddress] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isConnecting, setIsConnecting] = useState(false);
  
    const isHome = location.pathname === '/';
  
    useEffect(() => {
      const checkWallet = async () => {
        setIsLoading(true);
        if (window.arweaveWallet) {
          try {
            const address = await getWalletAddress(); //this is where the component goes to the permaweb -- bazaar int:pt1 use permawebint()
            setWalletAddress(address);
          }
          catch (error) {
            console.error("Error fetching wallet address:", error); 
  
          }
        }
        setIsLoading(false);
      };
      checkWallet();
    }, []);
  
    const handleConnectWallet = async () => {
      setIsConnecting(true);
      try {
        await connectWallet();
        const address = await getWalletAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Wallet connection error:", error);
      } finally {
        setIsConnecting(false);
      }
    };
  
    const handleDisconnectWallet = async () => {
      await disconnectWallet();
      setWalletAddress('');
    };
  

  return (
    <div className="flex flex-col items-center justify-center w-full bg-transparent text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex absolute items-center justify-between px-20 text-white p-4 bg-transparent backdrop-blur-lg w-full top-0 z-50 ">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/ArDacity-design3.png" alt="ArDacity UI Logo" className="h-14 w-full" />
          </Link>
        </div>
        
        <div className="flex space-x-4">
          <Link to="/" className={`hover:text-gray-400 ${location.pathname === '/' ? 'text-indigo-400' : ''}`}>
            Home
          </Link>
          <Link to="/docs" className={`hover:text-gray-400 ${location.pathname.includes('/docs') ? 'text-indigo-400' : ''}`}>
            Documentation
          </Link>
          <a href="https://github.com/RuffledZest/MarkOne_ArDacityUI" target="_blank" rel="noreferrer" className="hover:text-gray-400">
            GitHub
          </a>
        </div>
        
        <div className="flex space-x-4">
        {walletAddress ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
            <button
              onClick={handleDisconnectWallet}
              className="bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black text-white font-bold py-2 px-4 rounded"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="bg-white text-black  py-2 px-4 rounded 
            hover:bg-black hover:text-white hover:border-2 hover:border-white"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
        </div>
      </nav>
      {/* Hero Section with ShapeBlur */}

      <div className="relative w-full ">
        {/* add a gradient offcover which goes from transparent to black at the botton of this navigation bar so that the thing blends witht the black bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"></div>
         
      <div className="absolute inset-0 overflow-hidden">
            <Waves
              lineColor="rgba(255, 255, 255, 0.2)"
              backgroundColor="rgba(13, 13, 13, 0.3)"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
              height="100%"
            />
          </div>
      
        <div className="absolute inset-0 z-0 opacity-45 "> 
          <ShapeBlur
            variation={0}
            pixelRatioProp={typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1}
            shapeSize={0.9}
            roundness={0.9}
            borderSize={0.05}
            circleSize={0.5}
            circleEdge={1}
          />
        </div>
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
 
        <div className="relative z-10 text-center mx-20">
          <div className="mb-8">
            

            <div className=" w-full overflow-hidden">
            <div className="inset-0 items-center translate-y-10 justify-center w-full bg-transparent text-white overflow-x-hidden  my-2 z-40">
         
          
               <TextPressure />
         </div>

              
              {/* <RotatingText
                texts={["UI Components", "For Arweave", "Decentralized", "Permanent"]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-purple-600 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg text-xl md:text-2xl font-bold"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              /> */}
            </div>
          </div>

          <div className="mt-8 max-w-6xl flex justify-center mx-auto" >
            <BlurText
              text="A collection of UI components for the Arweave Ecosystem. Making Frontend and Handlers easy for you."
              delay={100}
              animateBy="words"
              direction="top"
              className="text-lg md:text-xl text-gray-300 mb-8 text-center"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/docs"
              className="
                bg-white text-black hover:bg-black hover:text-white
                transition-all duration-300 border border-white
                font-medium py-3 px-6 rounded-lg hover:translate-y-[-5px]"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/RuffledZest/MarkOne_ArDacityUI"
              target="_blank"
              rel="noreferrer"
              className="bg-[#1b1b1b] hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg hover:translate-y-[-5px] 
              transition-all duration-300 border border-white/10"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Circular text at the bottom of hero */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <CircularText text="ARDACITY*UI*COMPONENTS*" onHover="speedUp" spinDuration={20} className="text-white/70" />
        </div> */}
      </section>
      </div>
        

      {/* Interactive Menu Section */}
      <section id="explore" className="w-full rounded-4xl py-20 ">
        <div className=" ">
          <div className="text-center mb-12">
            <h2
              ref={setRef("menu-title")}
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${isVisible["menu-title"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              Explore ArDacity
            </h2>
            <p
              ref={setRef("menu-desc")}
              className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 ${isVisible["menu-desc"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "0.1s" }}
            >
              Navigate through our interactive sphere to discover more
            </p>
          </div>

          <div
            ref={setRef("menu")}
            className={` relative transition-all duration-1000 ${isVisible["menu"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <InfiniteMenu items={menuItems} />
          </div>
        </div>
      </section>

      {/* Features Section with MagnetLines */}
      <section
        id="features"
        className="w-full py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <MagnetLines
            rows={12}
            columns={12}
            containerSize="100%"
            lineColor="rgba(255, 255, 255, 0.4)"
            lineWidth="0.4vmin"
            lineHeight="4vmin"
            baseAngle={0}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2
              ref={setRef("features-title")}
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${isVisible["features-title"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              Powerful Features
            </h2>
            <p
              ref={setRef("features-desc")}
              className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 ${isVisible["features-desc"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "0.1s" }}
            >
              Everything you need to build amazing Arweave applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                ref={setRef(`feature-${index}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible[`feature-${index}`] ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className=" backdrop-blur-md p-8 rounded-xl border border-white/20 hover:border-purple-500/40 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section with FollowCursor */}
      <section id="showcase" className="w-full py-20 ">
        <div className="max-w-[90rem] mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              ref={setRef("showcase-title")}
              className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${isVisible["showcase-title"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              Built With ArDacity
            </h2>
            <p
              ref={setRef("showcase-desc")}
              className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 ${isVisible["showcase-desc"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "0.1s" }}
            >
              Explore projects powered by our components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseProjects.map((project, index) => (
              <div
                key={index}
                ref={setRef(`project-${index}`)}
                className={`group transition-all duration-1000 ${isVisible[`project-${index}`] ? "opacity-100" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-[500px] overflow-hidden rounded-xl">
                  <FollowCursor
                    offsetX={2}
                    cardWidth="100%"
                    rotationFactor={20}
                    enableTilt={true}
                    animationConfig={{ mass: 5, tension: 350, friction: 40 }}
                    wheelConfig={{ mass: 1, tension: 200, friction: 30 }}
                  >
                    <div className=" backdrop-blur-md p-6 rounded-xl border border-white/20 flex flex-col justify-end translate-y-60">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300">{project.description}</p>
                      <img src={project.image} alt={project.title} className=" w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      
                    </div>
                  </FollowCursor>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variable Proximity Text Section */}
      {/* <section className="w-full py-20 ">
        <div className="max-w-7xl mx-auto px-4">
          <div
            ref={containerRef}
            className="text-center py-16 px-4 bg-gradient-to-br from-purple-900/20 to-black/40 backdrop-blur-md rounded-xl border border-purple-500/20"
          >
            <h2
              ref={setRef("proximity-title")}
              className={`text-3xl md:text-4xl font-bold mb-8 transition-all duration-1000 ${isVisible["proximity-title"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              Interactive Typography
            </h2>

            <div
              ref={setRef("proximity-text")}
              className={`text-2xl md:text-4xl transition-all duration-1000 ${isVisible["proximity-text"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "0.2s" }}
            >
              <VariableProximity
                label="Move your cursor over this text to see the magic happen!"
                className="text-white font-bold"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="w-full py-20  relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1
            className="
              text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 text-white/90
              
            ">
              Let's Build Together
            </h1>

            <p
              ref={setRef("cta-desc")}
              className={`text-xl text-gray-300 max-w-2xl mx-auto mb-8 transition-all duration-1000 ${isVisible["cta-desc"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
            >
              Get started with ArDacity UI today and create beautiful, responsive, and accessible user interfaces for
              your Arweave applications.
            </p>

            <div
              ref={setRef("cta-buttons")}
              className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${isVisible["cta-buttons"] ? "opacity-100" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: "0.2s" }}
            >
              <Link
                to="/docs"
                className="
                bg-white  hover:bg-black hover:text-white
                 text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
              >
                View Components
              </Link>
              <a
                href="https://www.npmjs.com/org/ar-dacity"
                target="_blank"
                rel="noreferrer"
                className="bg-[#1b1b1b] hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 border border-white/10"
              >
                NPM Packages
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="w-full bg-black py-12 border-t border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">ArDacity UI</h3>
              <p className="text-gray-400">A collection of UI components for the Arweave ecosystem.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/components" className="text-gray-400 hover:text-white transition-colors">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="text-gray-400 hover:text-white transition-colors">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/RuffledZest/MarkOne_ArDacityUI"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest releases</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-[#1a1a1a] text-white px-4 py-2 rounded-l-lg border border-purple-500/30 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-900/30 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ArDacity UI. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
