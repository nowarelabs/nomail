"use client";

import { EmailThread } from "../types/emails";
import { ThreadLabel } from "./thread-label";
import { ThreadAttachments } from "./thread-attachments";
import { ThreadAvatar } from "./thread-avatar";

interface EmailThreadsListItemProps {
	thread: EmailThread;
	isSelected: boolean;
	isSelectMode: boolean;
	isActive: boolean;
	onSelect: (id: string) => void;
	onThreadClick: (id: string) => void;
	onThreadView: (id: string) => void;
}

export function EmailThreadsListItem({
	thread,
	isSelected,
	isSelectMode,
	isActive,
	onSelect,
	onThreadClick,
	onThreadView,
}: EmailThreadsListItemProps) {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};
	const primaryEmail = thread.emails[0];
	const senderName =
		primaryEmail?.senderName ||
		primaryEmail?.from ||
		thread.participants[0] ||
		"Unknown Sender";
	const isUnread = thread.unreadCount > 0;

	return (
		<div
			className={`w-full text-left rounded-xl p-3 border transition-colors bg-card border-sidebar-border ${
				isActive
					? "ring-2 ring-primary ring-inset"
					: isSelected
					? "bg-primary/10 border-primary/30"
					: "hover:bg-accent/50"
			} ${isUnread ? "font-bold" : ""}`}
			aria-current={isActive ? "page" : undefined}
			onClick={() => {
				onThreadClick(thread.id);
				onThreadView(thread.id);
			}}
		>
			<div className="flex items-center gap-2">
				{isSelectMode && (
					<input
						type="checkbox"
						className="size-4"
						checked={isSelected}
						onChange={() => onSelect(thread.id)}
					/>
				)}
				<button className="flex-1 text-left">
					<div className="flex items-center gap-2">
						<ThreadAvatar senderName={senderName} />
						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2 min-w-0">
									<span
										className={`font-medium truncate ${
											isUnread ? "text-foreground" : "text-muted-foreground"
										}`}
									>
										{senderName}
									</span>
									{thread.participantNames.length > 1 && (
										<span className="text-xs text-muted-foreground">
											[{thread.participantNames.length - 1}]
										</span>
									)}
								</div>
								<span className="text-xs text-muted-foreground">
									{formatDate(thread.lastEmailDate)}
								</span>
							</div>
							<div
								className={`truncate text-sm ${
									isUnread ? "text-foreground" : "text-muted-foreground"
								}`}
							>
								{thread.subject}
							</div>
							{thread.labels.length > 0 && (
								<div className="flex items-center gap-2 mt-1">
									{thread.labels.map((label: string, index: number) => (
										<ThreadLabel key={index} label={label} />
									))}
									{thread.hasAttachments && (
										<ThreadAttachments
											attachmentCount={thread.totalAttachmentCount}
										/>
									)}
								</div>
							)}
						</div>
					</div>
					<p
						className={`mt-1 text-xs line-clamp-1 ${
							isUnread ? "text-foreground font-medium" : "text-muted-foreground"
						}`}
					>
						{thread.snippet}
					</p>
					{isUnread && (
						<div className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground mt-1">
							{thread.unreadCount} unread
						</div>
					)}
				</button>
			</div>
		</div>
	);
}
