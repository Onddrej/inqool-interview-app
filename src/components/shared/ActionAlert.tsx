import { Alert } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export type AlertType = 'added' | 'edited' | 'banned' | 'deleted' | 'unbanned';

const defaultLabels: Record<AlertType, { title: string; message: string }> = {
  added:   { title: 'created',   message: 'was successfully added.' },
  edited:  { title: 'edited',    message: 'was successfully edited.' },
  banned:  { title: 'banned',    message: 'was banned.' },
  deleted: { title: 'deleted',   message: 'was deleted.' },
  unbanned:{ title: 'unbanned',  message: 'was unbanned.' },
};

const colorMap: Record<AlertType, string> = {
  added: 'green',
  edited: 'green',
  banned: 'red',
  deleted: 'red',
  unbanned: 'green',
};

interface ActionAlertProps {
  type: AlertType;
  show: boolean;
  entityName?: string; // napr. 'User', 'Animal'
}

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