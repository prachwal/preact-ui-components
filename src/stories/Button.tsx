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
  const classes = `button button--${size} ${mode}${className ? ` ${className}` : ''}`;

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
