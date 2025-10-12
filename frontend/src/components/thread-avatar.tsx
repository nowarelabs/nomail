'use client';

interface ThreadAvatarProps {
	senderName: string;
}

export function ThreadAvatar({ senderName }: ThreadAvatarProps) {
	const getColorFromName = (name: string) => {
		const colors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5', 'bg-primary', 'bg-destructive'];
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = name.charCodeAt(i) + ((hash << 5) - hash);
		}
		const index = Math.abs(hash) % colors.length;
		return colors[index];
	};

	const avatarBg = getColorFromName(senderName);

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
