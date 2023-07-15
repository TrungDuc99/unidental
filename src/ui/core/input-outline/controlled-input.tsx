import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { NInputProps } from './input';
import { Input } from './input';

type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  classNameContainer?: string;
  control: Control<T>;
  rules?: TRule;
};

interface ControlledInputOutLineProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

// only used with react-hook-form
export function ControlledInputOutLine<T extends FieldValues>(
  props: ControlledInputOutLineProps<T>
) {
  const { name, control, rules, classNameContainer, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      classNameContainer={classNameContainer}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={field.value as string}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
