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

const SIZE_CLASSES: Record<ButtonProps['size'] & string, string> = {
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
  const mode = primary ? 'button--primary' : 'button--secondary';
  const sizeClass = SIZE_CLASSES[size];
  const classes = className
    ? `button ${sizeClass} ${mode} ${className}`
    : `button ${sizeClass} ${mode}`;

  const buttonStyle = backgroundColor
    ? Object.assign({}, style, { backgroundColor })
    : style;

  return (
    <button
      type='button'
      className={classes}
      style={buttonStyle}
      aria-pressed={primary ? 'true' : undefined}
      {...props}
    >
      {label}
    </button>
  );
};

export const Button = memo(ButtonComponent);
