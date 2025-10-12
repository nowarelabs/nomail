'use client';

import { ReactNode } from 'react';

interface ThreadLabelProps {
	label: string;
	icon?: ReactNode;
	color?: string;
	backgroundColor?: string;
	textColor?: string;
}

export function ThreadLabel({
	label,
	icon,
	color = 'currentColor',
	backgroundColor = 'bg-chart-1',
	textColor = 'text-primary-foreground',
}: ThreadLabelProps) {
	const defaultIcon = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="lucide lucide-tag size-3 opacity-80"
			aria-hidden="true"
		>
			<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
			<circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
		</svg>
	);

	return (
		<span
			className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${backgroundColor} ${textColor}`}
			style={{ color, backgroundColor: backgroundColor.includes('bg-') ? undefined : backgroundColor }}
		>
			{icon || defaultIcon}
			{label}
		</span>
	);
}
