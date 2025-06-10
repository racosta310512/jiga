import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import useUIStore from '../../../stores/uiStore';

const notificationIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const notificationColors = {
  success: 'bg-green-500/90 border-green-400',
  error: 'bg-red-500/90 border-red-400',
  warning: 'bg-yellow-500/90 border-yellow-400',
  info: 'bg-blue-500/90 border-blue-400',
};

/**
 * Componente individual de notificación
 */
const NotificationItem = ({ notification }) => {
  const { removeNotification } = useUIStore();
  const Icon = notificationIcons[notification.type];

  useEffect(() => {
    if (notification.duration > 0) {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration, removeNotification]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      className={`
        flex items-center p-4 rounded-lg shadow-lg border backdrop-blur-sm
        ${notificationColors[notification.type]}
      `}
    >
      <Icon className="w-5 h-5 text-white mr-3 flex-shrink-0" />
      
      <div className="flex-1">
        {notification.title && (
          <h4 className="font-semibold text-white">{notification.title}</h4>
        )}
        <p className="text-white/90">{notification.message}</p>
      </div>

      <button
        onClick={() => removeNotification(notification.id)}
        className="ml-3 text-white/70 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

/**
 * Contenedor de notificaciones
 */
const NotificationContainer = () => {
  const { notifications } = useUIStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;