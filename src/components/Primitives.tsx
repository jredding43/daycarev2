
import React from 'react';


export type SectionProps = React.ComponentProps<'section'>;
export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
{ className = '', ...props },
ref
) {
return <section ref={ref} className={`relative w-full ${className}`} {...props} />;
});


export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
<div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);


export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
<div className={`rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm ${className ?? ''}`}>{children}</div>
);


export const Button: React.FC<React.PropsWithChildren<{ href?: string; onClick?: () => void; variant?: 'primary' | 'ghost'; className?: string }>> = ({ children, href, onClick, variant = 'primary', className }) => {
const base = 'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition shadow-sm';
const styles = variant === 'primary' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200';
const cls = `${base} ${styles} ${className ?? ''}`;
return href ? <a href={href} className={cls}>{children}</a> : <button className={cls} onClick={onClick}>{children}</button>;
};