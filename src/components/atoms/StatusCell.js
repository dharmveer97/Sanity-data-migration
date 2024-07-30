import React from 'react';
import { Chip } from '@nextui-org/react';

function StatusCell({ user, statusColorMap, cellValue }) {
  return (
    <Chip
      className="capitalize"
      color={statusColorMap ? statusColorMap[user] : 'primary'}
      size="sm"
      variant="flat"
    >
      {cellValue}
    </Chip>
  );
}

export default StatusCell;
