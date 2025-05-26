
import React from 'react';
import { Plus, Calendar, Mail, Phone } from 'lucide-react';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';

const mockProfessionals = [
  {
    id: 1,
    name: 'Ana Paula Souza',
    specialty: 'Cabeleireira',
    email: 'ana.souza@email.com',
    phone: '(11) 98765-4321',
    available: true,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Ricardo Gomes',
    specialty: 'Barbeiro',
    email: 'ricardo.gomes@email.com',
    phone: '(11) 91234-5678',
    available: true,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 3,
    name: 'Juliana Costa',
    specialty: 'Manicure',
    email: 'juliana.costa@email.com',
    phone: '(11) 97654-3210',
    available: false,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    name: 'Marcos Silva',
    specialty: 'Esteticista',
    email: 'marcos.silva@email.com',
    phone: '(11) 90987-6543',
    available: true,
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 5,
    name: 'Fernanda Lima',
    specialty: 'Maquiadora',
    email: 'fernanda.lima@email.com',
    phone: '(11) 92345-6789',
    available: true,
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 6,
    name: 'Roberto Carlos',
    specialty: 'Barbeiro',
    email: 'roberto.carlos@email.com',
    phone: '(11) 93456-7890',
    available: false,
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
];

const ProfessionalsPage: React.FC = () => {
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profissionais</h1>
            <p className="text-muted-foreground">Equipe e disponibilidade.</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2" size={16} />
            Novo Profissional
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProfessionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={professional.avatar} alt={professional.name} />
                    <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute top-3 right-3">
                    <Badge variant={professional.available ? "default" : "outline"} className={professional.available ? "bg-green-500 hover:bg-green-600" : "text-gray-500"}>
                      {professional.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg">{professional.name}</h3>
                  <p className="text-muted-foreground text-sm">{professional.specialty}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{professional.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{professional.phone}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Agenda
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </ModernDashboardLayout>
  );
};

export default ProfessionalsPage;
