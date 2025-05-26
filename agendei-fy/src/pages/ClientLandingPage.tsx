
import React from 'react';
import { useAuth } from '../contexts/auth';
import HeroSection from '../components/client/HeroSection';
import ServicesSection from '../components/client/ServicesSection';
import FeaturesSection from '../components/client/FeaturesSection';
import GamificationSection from '../components/client/GamificationSection';
import CTASection from '../components/client/CTASection';
import ThemeSwitcher from '../components/ThemeSwitcher';

const ClientLandingPage = () => {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
      <ThemeSwitcher className="fixed top-4 right-4 z-50" />
      
      {/* Header Hero Section */}
      <HeroSection userName={profile?.name} />
      
      {/* Services Section */}
      <ServicesSection />

      {/* Gamification Section */}
      <GamificationSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default ClientLandingPage;
