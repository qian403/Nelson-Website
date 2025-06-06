"use client";

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { IphoneDevice } from '@/components/socials/IphoneDevice';
import { IpadDevice } from '@/components/socials/IpadDevice';
import { useAppAnimation } from '@/components/socials/useAppAnimation';
import TransitionEffect from '@/components/layout/TransitionEffect';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { useLoadingContext } from '@/components/context/LoadingContext';

export default function AppleDeviceUI() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { isFirstVisit } = useLoadingContext();
  const { 
    selectedApp, 
    isAnimating, 
    isClosing, 
    appRef, 
    handleAppClick, 
    closeApp 
  } = useAppAnimation();
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isFirstVisit) {
        setTimeout(() => {
          setLoading(false);
          setFadeOut(true);
        }, 800);
      } else {
        setLoading(false);
      }
    }
  }, [isFirstVisit]);
  
  return (
    <>
    {/* Only show TransitionEffect when navigating between pages */}
    {!isFirstVisit && <TransitionEffect />}
    
    {/* Show loading screen only on first visit */}
    <LoadingScreen loading={loading && isFirstVisit} fadeOut={fadeOut} />
    
    <motion.div 
      className="flex flex-col items-center justify-center w-full h-screen bg-zinc-900 py-12 font-sfpro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      
      {/* iPhone for small screens */}
      <IphoneDevice 
        currentTime={currentTime}
        selectedApp={selectedApp}
        isAnimating={isAnimating}
        isClosing={isClosing}
        appRef={appRef}
        handleAppClick={handleAppClick}
        closeApp={closeApp}
      />

      {/* iPad for medium screens and up */}
      <IpadDevice 
        currentTime={currentTime}
        selectedApp={selectedApp}
        isAnimating={isAnimating}
        isClosing={isClosing}
        appRef={appRef}
        handleAppClick={handleAppClick}
        closeApp={closeApp}
      />
    </motion.div>
    <Footer />
    </>
  );
};