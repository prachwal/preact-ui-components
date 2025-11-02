import type { ComponentProps } from 'preact';

/** Primary UI component for user interaction */
export interface ButtonProps extends ComponentProps<'button'> {
  primary?: boolean;
  backgroundColor?: string | null;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: preact.FunctionComponent<ButtonProps> = ({
  primary = false,
  backgroundColor = null,
  size = 'medium',
  label,
  className,
  ...props
}) => {
  const mode = primary ? 'button--primary' : 'button--secondary';
  const sizeClass = `button--${size}`;
  const classes = ['button', sizeClass, mode, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type='button'
      className={classes}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
