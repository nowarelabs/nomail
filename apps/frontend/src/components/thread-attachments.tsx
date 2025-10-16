"use client";

interface ThreadAttachmentsProps {
	attachmentCount: number;
}

export function ThreadAttachments({ attachmentCount }: ThreadAttachmentsProps) {
	return (
		<span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-muted dark:bg-muted-foreground/20 text-muted-foreground dark:text-muted">
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
				className="lucide lucide-paperclip size-3 opacity-80"
				aria-hidden="true"
			>
				<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>
			</svg>
			{attachmentCount}
		</span>
	);
}
