
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeSwitcher from '../components/ThemeSwitcher';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <ThemeSwitcher className="fixed top-4 right-4 z-50" />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold mt-6 mb-4 dark:text-white">Página não encontrada</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi removida.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-primary hover:bg-primary-700">
              Voltar à página inicial
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
