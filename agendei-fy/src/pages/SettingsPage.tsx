
import React from 'react';
import { User, Bell, Globe, Lock, CreditCard, Mail, Save } from 'lucide-react';
import ModernDashboardLayout from '../components/dashboard/ModernDashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Switch } from   '../components/ui/switch';
import { Separator } from'../components/ui/separator';
import { useToast } from '../hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  return (
    <ModernDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema.</p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto h-auto flex flex-wrap gap-2 bg-transparent p-0">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-4 w-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="h-4 w-4" />
              <span>Empresa</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lock className="h-4 w-4" />
              <span>Segurança</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Faturamento</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais e de contato.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" defaultValue="João da Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="joao.silva@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue="(11) 98765-4321" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Função</Label>
                    <Input id="role" defaultValue="Administrador" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea id="bio" className="min-h-[100px]" placeholder="Conte um pouco sobre você..." />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de notificação</CardTitle>
                <CardDescription>
                  Configure como e quando deseja receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notificações por email</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Novos agendamentos</div>
                        <div className="text-sm text-muted-foreground">
                          Receba um email quando um novo agendamento for criado
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Cancelamentos</div>
                        <div className="text-sm text-muted-foreground">
                          Receba um email quando um agendamento for cancelado
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Lembretes</div>
                        <div className="text-sm text-muted-foreground">
                          Receba lembretes sobre agendamentos do dia seguinte
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Notificações push</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Novos agendamentos</div>
                        <div className="text-sm text-muted-foreground">
                          Receba notificações push para novos agendamentos
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Cancelamentos</div>
                        <div className="text-sm text-muted-foreground">
                          Receba notificações push para cancelamentos
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Lembretes</div>
                        <div className="text-sm text-muted-foreground">
                          Receba lembretes via push sobre agendamentos próximos
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="business" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Configure as informações do seu negócio que serão exibidas aos clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Nome da empresa</Label>
                    <Input id="business-name" defaultValue="Salon Beauty" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Tipo de negócio</Label>
                    <Input id="business-type" defaultValue="Salão de beleza" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Telefone comercial</Label>
                    <Input id="business-phone" defaultValue="(11) 3456-7890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Email comercial</Label>
                    <Input id="business-email" defaultValue="contato@salonbeauty.com.br" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-address">Endereço</Label>
                  <Input id="business-address" defaultValue="Rua das Flores, 123 - São Paulo, SP" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-description">Descrição</Label>
                  <Textarea 
                    id="business-description" 
                    className="min-h-[100px]" 
                    defaultValue="Salão de beleza especializado em cortes modernos, tratamentos capilares e serviços de estética." 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>
                  Gerencie sua senha e configurações de segurança.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="font-medium">Autenticação em duas etapas</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Ativar autenticação em duas etapas</div>
                      <div className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Pagamento</CardTitle>
                <CardDescription>
                  Gerencie seu plano de assinatura e método de pagamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <h3 className="font-medium">Plano Atual: Profissional</h3>
                      <p className="text-sm text-muted-foreground">
                        R$ 39,99/mês - Renovação em 23/06/2025
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Mudar plano</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        Cancelar assinatura
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Método de pagamento</h3>
                  <div className="bg-background border rounded-lg p-4 flex items-start gap-4">
                    <CreditCard className="h-12 w-12 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Visa terminando em 4242</div>
                      <div className="text-sm text-muted-foreground">
                        Expira em 04/2025
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="outline" size="sm">Remover</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Histórico de faturas</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted border-b">
                          <th className="text-left p-3 font-medium">Data</th>
                          <th className="text-left p-3 font-medium">Descrição</th>
                          <th className="text-left p-3 font-medium">Valor</th>
                          <th className="text-right p-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3">23/04/2025</td>
                          <td className="p-3">Assinatura - Plano Profissional</td>
                          <td className="p-3">R$ 39,99</td>
                          <td className="p-3 text-right">
                            <span className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                              Pago
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">23/03/2025</td>
                          <td className="p-3">Assinatura - Plano Profissional</td>
                          <td className="p-3">R$ 39,99</td>
                          <td className="p-3 text-right">
                            <span className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                              Pago
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3">23/02/2025</td>
                          <td className="p-3">Assinatura - Plano Profissional</td>
                          <td className="p-3">R$ 39,99</td>
                          <td className="p-3 text-right">
                            <span className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 px-2 py-1 rounded-full text-xs">
                              Pago
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ModernDashboardLayout>
  );
};

export default SettingsPage;
