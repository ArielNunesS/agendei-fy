
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Trophy, Star, Calendar, Heart } from 'lucide-react';
import { containerVariants, itemVariants } from '../../utils/animationVariations';

const GamificationSection = () => {
  const achievements = [
    {
      id: 1,
      title: "Cliente Fiel",
      description: "3 agendamentos seguidos",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      emoji: "🏅",
      progress: 100,
      unlocked: true
    },
    {
      id: 2,
      title: "Pontualidade",
      description: "Sempre chegou no horário",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      emoji: "⏰",
      progress: 80,
      unlocked: false
    },
    {
      id: 3,
      title: "Explorador",
      description: "Experimentou 5 serviços diferentes",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      emoji: "🌟",
      progress: 60,
      unlocked: false
    }
  ];

  const suggestions = [
    {
      title: "Recomendado para você",
      service: "Barba & Sobrancelha",
      reason: "Baseado no seu histórico de Corte de Cabelo",
      discount: "15% OFF"
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Suas Conquistas</h2>
          <p className="text-gray-600 dark:text-gray-300">Continue usando nossos serviços e desbloqueie novos badges!</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {achievements.map((achievement) => (
            <motion.div key={achievement.id} variants={itemVariants}>
              <Card className={`h-full transition-all duration-300 hover:shadow-lg ${achievement.unlocked ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}>
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-2">
                    <div className={`p-3 rounded-full ${achievement.unlocked ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {achievement.unlocked ? achievement.icon : <div className="opacity-30">{achievement.icon}</div>}
                    </div>
                  </div>
                  <CardTitle className="text-lg flex items-center justify-center gap-2">
                    {achievement.unlocked && <span className="text-2xl">{achievement.emoji}</span>}
                    {achievement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progresso</span>
                      <span className={achievement.unlocked ? 'text-primary font-medium' : 'text-gray-500'}>{achievement.progress}%</span>
                    </div>
                    <Progress 
                      value={achievement.progress} 
                      className={`h-2 ${achievement.unlocked ? 'bg-primary/20' : 'bg-gray-200 dark:bg-gray-700'}`}
                    />
                  </div>
                  {achievement.unlocked && (
                    <Badge className="mt-3 bg-primary">Desbloqueado!</Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Seção de Sugestões */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Sugestões Para Você</h3>
          {suggestions.map((suggestion, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gradient-to-r from-primary/10 to-indigo-500/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{suggestion.title}</h4>
                        <p className="text-primary font-medium">{suggestion.service}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-2">
                        {suggestion.discount}
                      </Badge>
                      <div>
                        <button className="text-primary hover:text-primary/80 font-medium text-sm">
                          Agendar agora →
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GamificationSection;
