'use client';

import React from 'react';
import { Textarea } from '@nextui-org/react';

function TextAreaInput({
  disabled,
  label,
  error,
  required,
  className,
  ...props
}) {
  return (
    <div className={`w-full ${disabled ? 'cursor-not-allowed' : ''}`}>
      <Textarea
        size="lg"
        radius="lg"
        width={100}
        fullWidth
        errorMessage={error}
        label={label}
        color={error && 'error'}
        variant="bordered"
        isRequired={required}
        className={`${className}`}
        {...props}
      />
    </div>
  );
}

export default TextAreaInput;
