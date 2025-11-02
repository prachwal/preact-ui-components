import type { ComponentProps, JSX } from 'preact';
import { memo } from 'preact/compat';

/** Primary UI component for user interaction */
export interface ButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const VALID_SIZES = ['small', 'medium', 'large'] as const;
type ValidSize = (typeof VALID_SIZES)[number];

const SIZE_CLASSES: Record<ValidSize, string> = {
  small: 'button--small',
  medium: 'button--medium',
  large: 'button--large',
};

const ButtonComponent = ({
  primary = false,
  backgroundColor,
  size = 'medium',
  label,
  className = '',
  style,
  ...props
}: ButtonProps): JSX.Element => {
  // Runtime validation for size prop
  if (size && !VALID_SIZES.includes(size as ValidSize)) {
    console.warn(
      `Invalid size prop: "${size}". Valid values are: ${VALID_SIZES.join(', ')}`
    );
  }

  const mode = primary ? 'button--primary' : 'button--secondary';
  const sizeClass = SIZE_CLASSES[size as ValidSize] || SIZE_CLASSES.medium;
  const classes = className
    ? `button ${sizeClass} ${mode} ${className}`
    : `button ${sizeClass} ${mode}`;

  const buttonStyle = backgroundColor
    ? Object.assign({}, style, { backgroundColor })
    : style;

  return (
    <button type='button' className={classes} style={buttonStyle} {...props}>
      {label}
    </button>
  );
};

export const Button = memo(ButtonComponent);
