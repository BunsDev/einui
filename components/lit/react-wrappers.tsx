'use client';

/**
 * React Wrappers for Lit Components
 * 
 * These wrappers provide better TypeScript integration and React-friendly APIs
 * for the Lit web components.
 */

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import type { DockItem } from './glass-dock';

// Import Lit components
if (typeof window !== 'undefined') {
  import('./index');
}

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

// Glass Button React Wrapper
interface GlassButtonProps extends BaseProps {
  variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  glowEffect?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: CustomEvent) => void;
  children?: React.ReactNode;
}

export const GlassButtonWrapper = forwardRef<HTMLElement, GlassButtonProps>(
  ({ onClick, children, className, style, ...props }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => elementRef.current!);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onClick) return;

      const handler = (e: Event) => onClick(e as CustomEvent);
      element.addEventListener('click', handler);
      return () => element.removeEventListener('click', handler);
    }, [onClick]);

    return (
      <glass-button
        ref={elementRef as any}
        {...(props.variant && { variant: props.variant })}
        {...(props.size && { size: props.size })}
        {...(props.disabled && { disabled: true })}
        {...(props.glowEffect && { 'glow-effect': true })}
        {...(props.type && { type: props.type })}
        className={className}
        style={style}
      >
        {children}
      </glass-button>
    );
  }
);

GlassButtonWrapper.displayName = 'GlassButtonWrapper';

// Glass Card React Wrapper
interface GlassCardProps extends BaseProps {
  glowEffect?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const GlassCardWrapper = forwardRef<HTMLElement, GlassCardProps>(
  ({ className, style, glowEffect = true, title, description, content, footer, children }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => elementRef.current!);

    return (
      <glass-card
        ref={elementRef as any}
        {...(glowEffect && { 'glow-effect': true })}
        className={className}
        style={style}
      >
        {title && <div slot="title">{title}</div>}
        {description && <div slot="description">{description}</div>}
        {content && <div slot="content">{content}</div>}
        {footer && <div slot="footer">{footer}</div>}
        {children}
      </glass-card>
    );
  }
);

GlassCardWrapper.displayName = 'GlassCardWrapper';

// Glass Input React Wrapper
interface GlassInputProps extends BaseProps {
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  autocomplete?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  glowOnFocus?: boolean;
  onInput?: (e: CustomEvent<{ value: string }>) => void;
  onChange?: (e: CustomEvent<{ value: string }>) => void;
  onFocus?: (e: CustomEvent) => void;
  onBlur?: (e: CustomEvent) => void;
}

export const GlassInputWrapper = forwardRef<HTMLElement, GlassInputProps>(
  ({ onInput, onChange, onFocus, onBlur, className, style, glowOnFocus = true, ...props }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => elementRef.current!);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handlers: Array<[string, (e: Event) => void]> = [];

      if (onInput) {
        const handler = (e: Event) => onInput(e as CustomEvent<{ value: string }>);
        element.addEventListener('input', handler);
        handlers.push(['input', handler]);
      }

      if (onChange) {
        const handler = (e: Event) => onChange(e as CustomEvent<{ value: string }>);
        element.addEventListener('change', handler);
        handlers.push(['change', handler]);
      }

      if (onFocus) {
        const handler = (e: Event) => onFocus(e as CustomEvent);
        element.addEventListener('focus', handler);
        handlers.push(['focus', handler]);
      }

      if (onBlur) {
        const handler = (e: Event) => onBlur(e as CustomEvent);
        element.addEventListener('blur', handler);
        handlers.push(['blur', handler]);
      }

      return () => {
        handlers.forEach(([event, handler]) => {
          element.removeEventListener(event, handler);
        });
      };
    }, [onInput, onChange, onFocus, onBlur]);

    return (
      <glass-input
        ref={elementRef as any}
        {...(props.type && { type: props.type })}
        {...(props.value !== undefined && { value: props.value })}
        {...(props.placeholder && { placeholder: props.placeholder })}
        {...(props.disabled && { disabled: true })}
        {...(props.required && { required: true })}
        {...(props.name && { name: props.name })}
        {...(props.autocomplete && { autocomplete: props.autocomplete })}
        {...(props.minLength !== undefined && { minlength: props.minLength })}
        {...(props.maxLength !== undefined && { maxlength: props.maxLength })}
        {...(props.pattern && { pattern: props.pattern })}
        {...(glowOnFocus && { 'glow-on-focus': true })}
        className={className}
        style={style}
      />
    );
  }
);

GlassInputWrapper.displayName = 'GlassInputWrapper';

// Glass Dock React Wrapper
interface GlassDockProps extends BaseProps {
  items: DockItem[];
  magnification?: number;
  baseSize?: number;
  maxSize?: number;
  orientation?: 'horizontal' | 'vertical';
  glassIntensity?: 'low' | 'medium' | 'high';
  onItemClick?: (e: CustomEvent<{ item: DockItem; index: number }>) => void;
}

export const GlassDockWrapper = forwardRef<HTMLElement, GlassDockProps>(
  (
    {
      items,
      magnification = 1.5,
      baseSize = 48,
      maxSize = 72,
      orientation = 'horizontal',
      glassIntensity = 'high',
      onItemClick,
      className,
      style,
    },
    ref
  ) => {
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => elementRef.current!);

    useEffect(() => {
      const element = elementRef.current as any;
      if (!element) return;

      // Set items property
      element.items = items;
    }, [items]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onItemClick) return;

      const handler = (e: Event) => onItemClick(e as CustomEvent<{ item: DockItem; index: number }>);
      element.addEventListener('item-click', handler);
      return () => element.removeEventListener('item-click', handler);
    }, [onItemClick]);

    return (
      <glass-dock
        ref={elementRef as any}
        orientation={orientation}
        magnification={String(magnification)}
        base-size={String(baseSize)}
        max-size={String(maxSize)}
        glass-intensity={glassIntensity}
        className={className}
        style={style}
      />
    );
  }
);

GlassDockWrapper.displayName = 'GlassDockWrapper';

// Type declarations for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glass-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'destructive';
          size?: 'default' | 'sm' | 'lg' | 'icon';
          disabled?: boolean;
          'glow-effect'?: boolean;
          type?: 'button' | 'submit' | 'reset';
        },
        HTMLElement
      >;
      'glass-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'glow-effect'?: boolean;
        },
        HTMLElement
      >;
      'glass-input': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          type?: string;
          value?: string;
          placeholder?: string;
          disabled?: boolean;
          required?: boolean;
          name?: string;
          autocomplete?: string;
          minlength?: number;
          maxlength?: number;
          pattern?: string;
          'glow-on-focus'?: boolean;
        },
        HTMLElement
      >;
      'glass-dock': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          orientation?: 'horizontal' | 'vertical';
          magnification?: string;
          'base-size'?: string;
          'max-size'?: string;
          'glass-intensity'?: 'low' | 'medium' | 'high';
        },
        HTMLElement
      >;
    }
  }
}
