// ActionAlert.tsx
// Component for displaying success/error alerts for user actions (add, edit, delete, etc.)

import { Alert } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export type AlertType = 'added' | 'edited' | 'banned' | 'deleted' | 'unbanned';

// Default labels and messages for each alert type
const defaultLabels: Record<AlertType, { title: string; message: string }> = {
  added:   { title: 'created',   message: 'was successfully added.' },
  edited:  { title: 'edited',    message: 'was successfully edited.' },
  banned:  { title: 'banned',    message: 'was banned.' },
  deleted: { title: 'deleted',   message: 'was deleted.' },
  unbanned:{ title: 'unbanned',  message: 'was unbanned.' },
};

// Color mapping for each alert type
const colorMap: Record<AlertType, string> = {
  added: 'green',
  edited: 'green',
  banned: 'red',
  deleted: 'red',
  unbanned: 'green',
};

/**
 * Props for ActionAlert
 * @param type Type of alert (added, edited, deleted, etc.)
 * @param show Whether to show the alert
 * @param entityName Name of the entity (e.g. 'User', 'Animal')
 */
interface ActionAlertProps {
  type: AlertType;
  show: boolean;
  entityName?: string; // e.g. 'User', 'Animal'
}

/**
 * ActionAlert component
 * Displays a floating alert with a message about the performed action.
 */
export function ActionAlert({ type, show, entityName = 'Item' }: ActionAlertProps) {
  if (!show) return null;
  const color = colorMap[type];
  const { title, message } = defaultLabels[type];
  return (
    <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 9999, minWidth: 300 }}>
      <Alert
        variant="filled"
        color={color}
        radius="lg"
        title={`${entityName} ${title}`}
        icon={<IconCheck />}
      >
        {`The ${entityName.toLowerCase()} ${message}`}
      </Alert>
    </div>
  );
} 