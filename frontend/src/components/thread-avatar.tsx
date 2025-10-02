'use client';

import { useState } from 'react';

interface ThreadAvatarProps {
	senderName: string;
}

export function ThreadAvatar({ senderName }: ThreadAvatarProps) {
	const [avatarBg] = useState(() => {
		const colors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5', 'bg-primary', 'bg-destructive'];
		return colors[Math.floor(Math.random() * colors.length)];
	});

	const initials = senderName.charAt(0).toUpperCase();

	return (
		<div className={`size-7 rounded-full flex items-center justify-center text-xs ${avatarBg}`}>
			{initials.match(/[A-Z]/) ? (
				<span className="font-medium">{initials}</span>
			) : (
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
					className="lucide lucide-user size-4 opacity-80"
					aria-hidden="true"
				>
					<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
			)}
		</div>
	);
}
