
import React from 'react';
import { Plus, Clock, Users, DollarSign } from 'lucide-react';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const mockServices = [
  {
    id: 1, 
    name: 'Corte de Cabelo Masculino', 
    duration: 30, 
    price: 50, 
    category: 'cabelo',
    professionals: 3
  },
  {
    id: 2, 
    name: 'Corte de Cabelo Feminino', 
    duration: 60, 
    price: 80, 
    category: 'cabelo',
    professionals: 2
  },
  {
    id: 3, 
    name: 'Manicure', 
    duration: 45, 
    price: 40, 
    category: 'unhas',
    professionals: 4
  },
  {
    id: 4, 
    name: 'Pedicure', 
    duration: 45, 
    price: 45, 
    category: 'unhas',
    professionals: 4
  },
  {
    id: 5, 
    name: 'Limpeza de Pele', 
    duration: 90, 
    price: 120, 
    category: 'estetica',
    professionals: 2
  },
  {
    id: 6, 
    name: 'Maquiagem', 
    duration: 60, 
    price: 90, 
    category: 'estetica',
    professionals: 3
  },
];

const ServicesPage: React.FC = () => {
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
            <p className="text-muted-foreground">Gerencie os serviços oferecidos.</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2" size={16} />
            Novo Serviço
          </Button>
        </div>
        
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="cabelo">Cabelo</TabsTrigger>
            <TabsTrigger value="unhas">Unhas</TabsTrigger>
            <TabsTrigger value="estetica">Estética</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockServices.map((service) => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 pt-6">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {service.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4" />
                        <span>R$ {service.price}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{service.professionals} profissionais</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Excluir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {['cabelo', 'unhas', 'estetica'].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockServices
                  .filter(service => service.category === category)
                  .map((service) => (
                    <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-2 pt-6">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {service.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{service.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4" />
                            <span>R$ {service.price}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{service.professionals} profissionais</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          Excluir
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </ModernDashboardLayout>
  );
};

export default ServicesPage;
