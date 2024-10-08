import { Txt } from '@sambad/sds/components';
import { colors } from '@sambad/sds/theme';
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';

import { CheckboxGroupImpl, useCheckboxContext } from './CheckboxGroupImpl';
import { CheckboxLabel } from './CheckboxLabel';
import { checkboxCss } from './styles';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  label: string | ((isChecked?: boolean) => ReactNode);
  required?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, value, required, ...restProps } = props;

  const checkboxCtx = useCheckboxContext();

  const isChecked = checkboxCtx.value?.includes(value);

  const checkboxId = useId();

  return (
    <label htmlFor={checkboxId} css={[checkboxCss.base, isChecked ? checkboxCss.selected : checkboxCss.default]}>
      {typeof label === 'string' ? (
        <Txt typography="body3" color={isChecked ? colors.primary500 : colors.black}>
          {label}
        </Txt>
      ) : (
        label(isChecked)
      )}
      <input
        id={checkboxId}
        ref={ref}
        value={value}
        type="checkbox"
        checked={isChecked}
        aria-checked={isChecked}
        required={required}
        onChange={(event) => {
          if (event.target.checked) {
            checkboxCtx.handleItemCheck(value);
          } else {
            checkboxCtx.handleItemUncheck(value);
          }
        }}
        {...restProps}
        css={{ display: 'none' }}
      />
    </label>
  );
});

Checkbox.displayName = 'CheckboxGroup.item';

export const CheckboxGroup = Object.assign(CheckboxGroupImpl, {
  Item: Checkbox,
  Label: CheckboxLabel,
});
