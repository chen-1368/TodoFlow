import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '确认操作',
  message = '确定要执行此操作吗？'
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="flex gap-3 w-full">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1"
              >
                确认删除
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
