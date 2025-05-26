
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '../components/ui/carousel';
import { cn } from '../../lib/utils';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "O Agendeify transformou meu salão de beleza. Reduzi as faltas em 70% e minha agenda está sempre cheia!",
      author: "Marina Silva",
      role: "Cabeleireira",
      avatar: "MS",
      stars: 5
    },
    {
      quote: "Consigo gerenciar meu consultório com muito mais eficiência. Meus pacientes adoram a facilidade de agendar online.",
      author: "Dr. Carlos Oliveira",
      role: "Dentista",
      avatar: "CO",
      stars: 5
    },
    {
      quote: "Economizo pelo menos 2 horas por dia que antes gastava gerenciando agendamentos por telefone e WhatsApp.",
      author: "Juliana Mendes",
      role: "Fisioterapeuta",
      avatar: "JM",
      stars: 4
    },
    {
      quote: "A melhor decisão que tomei para meu negócio. Os clientes fazem seus agendamentos 24/7 e minha organização melhorou muito.",
      author: "Paulo Ribeiro",
      role: "Tatuador",
      avatar: "PR",
      stars: 5
    },
    {
      quote: "Reduzi mais de 50% das faltas com as notificações automáticas. Valeu cada centavo investido na plataforma.",
      author: "Amanda Costa",
      role: "Nutricionista",
      avatar: "AC",
      stars: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Transformações reais com o Agendeify
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Profissionais de diversas áreas já transformaram seus negócios com o Agendeify.
          </p>
        </motion.div>
        
        <div className="relative px-4 sm:px-6 lg:px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 px-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm h-full flex flex-col transition-all duration-300 hover:shadow-md hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center mb-6">
                        <div className="flex-shrink-0 mr-4">
                          <Avatar className="h-12 w-12 bg-primary text-white shadow-sm">
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{testimonial.author}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-4">
                        {Array.from({ length: testimonial.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                        {Array.from({ length: 5 - testimonial.stars }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                        ))}
                      </div>
                      
                      <p className="italic text-gray-700 dark:text-gray-300 flex-grow">"{testimonial.quote}"</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative -left-0 hover:bg-primary hover:text-white transition-colors dark:border-gray-700 dark:hover:border-primary" />
              <CarouselNext className="relative -right-0 hover:bg-primary hover:text-white transition-colors dark:border-gray-700 dark:hover:border-primary" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
