'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Features from './components/Features'
import AppShowcase from './components/AppShowcase'
import NFTMarketplace from './components/NFTMarketplace'
import Tokenomics from './components/Tokenomics'
import Roadmap from './components/Roadmap'
import Community from './components/Community'
import Team from './components/Team'
import MarketingContact from './components/MarketingContact'
import Footer from './components/Footer'
import WaterBubbleButton from './components/WaterBubbleButton'

const DynamicIframe = dynamic(() => import('./components/DynamicIframe'), { ssr: true })

export default function LandingPage() {
  const [buttonClicked, setButtonClicked] = useState(false)
  const [showIframe, setShowIframe] = useState(true)
//hee
  const handleButtonClick = () => {
    setTimeout(() => {
        setButtonClicked(true);
        setShowIframe(false);
        
        // Reset the button state after animation
        setTimeout(() => {
            setButtonClicked(false);
        }, 1000); // Reset after 1 second
    }, 3000); // Wait for 2 seconds before running
};



  return (
    
   
<>
    <div className="w-full  transition-opacity duration-300" style={{ opacity: showIframe ? 1 : 0 }}>
      {showIframe && <DynamicIframe />}
    </div>

    <div className="absolute bottom-2 ball-left ">
      {showIframe &&  <WaterBubbleButton onClick={handleButtonClick} isClicked={buttonClicked} />}
    </div>

    {!showIframe && (
      
    
  


    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <Partners />
      <Features />
      <AppShowcase />
      <NFTMarketplace />
      <Tokenomics />
      <Roadmap />
      <Community />
      <Team />
    
      
      <MarketingContact />
      <Footer />
    </div>
    )}
    </>
  )
}

