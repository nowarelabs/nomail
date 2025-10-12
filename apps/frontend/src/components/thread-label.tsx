'use client';

import { ReactNode } from 'react';

interface ThreadLabelProps {
	label: string;
	icon?: ReactNode;
	color?: string;
	backgroundColor?: string;
	textColor?: string;
}

// Function to generate a consistent color based on the label name
// Using colors that work well in both light and dark modes
const getLabelColor = (label: string) => {
	const colors = [
		{ bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-800 dark:text-blue-200' },
		{ bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-800 dark:text-green-200' },
		{ bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-800 dark:text-yellow-200' },
		{ bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-800 dark:text-red-200' },
		{ bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-800 dark:text-purple-200' },
		{ bg: 'bg-pink-100 dark:bg-pink-900', text: 'text-pink-800 dark:text-pink-200' },
		{ bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-800 dark:text-indigo-200' },
		{ bg: 'bg-teal-100 dark:bg-teal-900', text: 'text-teal-800 dark:text-teal-200' },
		{ bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-800 dark:text-orange-200' },
		{ bg: 'bg-cyan-100 dark:bg-cyan-900', text: 'text-cyan-800 dark:text-cyan-200' },
	];
	
	// Generate a hash from the label name to consistently assign a color
	let hash = 0;
	for (let i = 0; i < label.length; i++) {
		hash = label.charCodeAt(i) + ((hash << 5) - hash);
	}
	
	// Use the hash to select a color from the array
	const index = Math.abs(hash) % colors.length;
	return colors[index];
};

export function ThreadLabel({
	label,
	icon,
	color = 'currentColor',
	backgroundColor,
	textColor,
}: ThreadLabelProps) {
	// If no custom colors are provided, use the generated color based on the label
	const defaultColors = getLabelColor(label);
	const bgClass = backgroundColor || defaultColors.bg;
	const textClass = textColor || defaultColors.text;

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
			className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${bgClass} ${textClass}`}
			style={{ 
				color, 
				backgroundColor: backgroundColor?.includes('bg-') ? undefined : backgroundColor,
				// Add a subtle border for better visibility in both modes
				border: '1px solid transparent',
				borderColor: backgroundColor ? undefined : 'currentColor',
				opacity: backgroundColor ? undefined : 0.8
			}}
		>
			{icon || defaultIcon}
			{label}
		</span>
	);
}