
import React from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const mockClients = [
  { id: 1, name: 'Mariana Silva', email: 'mariana.silva@email.com', phone: '(11) 98765-4321', lastAppointment: '12/05/2023' },
  { id: 2, name: 'João Paulo Mendes', email: 'joao.mendes@email.com', phone: '(11) 91234-5678', lastAppointment: '15/05/2023' },
  { id: 3, name: 'Ana Carolina Costa', email: 'ana.costa@email.com', phone: '(11) 97654-3210', lastAppointment: '18/05/2023' },
  { id: 4, name: 'Lucas Oliveira', email: 'lucas.oliveira@email.com', phone: '(11) 90987-6543', lastAppointment: '20/05/2023' },
  { id: 5, name: 'Camila Santos', email: 'camila.santos@email.com', phone: '(11) 92345-6789', lastAppointment: '22/05/2023' },
];

const ClientsPage: React.FC = () => {
  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">Gerencie sua lista de clientes.</p>
          </div>
          <Button className="shrink-0">
            <Plus className="mr-2" size={16} />
            Novo Cliente
          </Button>
        </div>
        
        <Card>
          <CardHeader className="px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  className="pl-8 w-full sm:w-[260px]"
                />
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Último agendamento</TableHead>
                    <TableHead className="w-[40px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.lastAppointment}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Agendar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernDashboardLayout>
  );
};

export default ClientsPage;
