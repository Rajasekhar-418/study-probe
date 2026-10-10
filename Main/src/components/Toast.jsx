import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const STYLES = {
  success: 'bg-success-50 border-success-200 text-success-800',
  error: 'bg-error-50 border-error-200 text-error-800',
  info: 'bg-primary-50 border-primary-200 text-primary-800',
};

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const Icon = ICONS[toast.type] || Info;
  const style = STYLES[toast.type] || STYLES.info;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className={`flex items-center gap-3 pl-4 pr-3 py-3 rounded-xl border shadow-lg max-w-sm ${style}`}>
        <Icon size={20} className="shrink-0" />
        <span className="text-sm font-medium flex-1">{toast.message}</span>
      </div>
    </div>
  );
}
