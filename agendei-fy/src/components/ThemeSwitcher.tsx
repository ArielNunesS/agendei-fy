
import React, { useEffect, useState } from 'react';
import { Switch } from '../components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Only run on client side
  useEffect(() => {
    setMounted(true);
    
    // Check system preference first
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Then check if user previously set dark mode
    const storedTheme = localStorage.getItem('dark-mode');
    const darkModePreference = storedTheme !== null 
      ? storedTheme === 'true'
      : prefersDark;
    
    setIsDarkMode(darkModePreference);
    
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    
    // Update the HTML class
    if (newDarkModeState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('dark-mode', newDarkModeState.toString());
  };

  if (!mounted) {
    return null; // Prevent hydration issues
  }
  
  return (
    <motion.div 
      className={`flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-full shadow-lg transition-colors duration-300 ${className || ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Sun size={18} className={`text-yellow-500 dark:text-gray-400 transition-opacity duration-300 ${isDarkMode ? 'opacity-50' : 'opacity-100'}`} />
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={toggleDarkMode}
        className="transition-all duration-300"
      />
      <Moon size={18} className={`text-gray-400 dark:text-blue-300 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-50'}`} />
    </motion.div>
  );
};

export default ThemeSwitcher;
