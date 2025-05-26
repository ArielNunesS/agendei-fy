
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { AppointmentProps } from './AppointmentCard';

interface CancelAppointmentModalProps {
  appointment: AppointmentProps | null;
  onClose: () => void;
  onConfirm: (appointment: AppointmentProps, message: string) => void;
}

const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  appointment,
  onClose,
  onConfirm,
}) => {
  const [message, setMessage] = useState('');
  
  if (!appointment) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Cancelar agendamento</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mb-2">
          Você está cancelando o agendamento de 
          <span className="font-medium"> {appointment.clientName}</span> às 
          <span className="font-medium"> {appointment.time}</span>.
        </p>
        <label className="block mb-2">
          Mensagem para o cliente:
          <textarea 
            className="w-full border rounded p-2 mt-1 focus:ring-primary focus:border-primary transition-all"
            rows={4}
            placeholder="Explique o motivo do cancelamento..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Voltar
          </Button>
          <Button 
            variant="destructive"
            onClick={() => {
              onConfirm(appointment, message);
              onClose();
            }}
            className="transition-all hover:scale-105"
          >
            Confirmar cancelamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
