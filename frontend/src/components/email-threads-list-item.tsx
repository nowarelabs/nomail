'use client';

import { EmailThread } from '../types/emails';
import { ThreadLabel } from './thread-label';
import { ThreadAttachments } from './thread-attachments';
import { ThreadAvatar } from './thread-avatar';

interface EmailThreadsListItemProps {
	thread: EmailThread;
	isSelected: boolean;
	isSelectMode: boolean;
	onSelect: (id: string) => void;
	onThreadSelect: (id: string) => void;
}

export function EmailThreadsListItem({ thread, isSelected, isSelectMode, onSelect, onThreadSelect }: EmailThreadsListItemProps) {
	const primaryEmail = thread.emails[0];
	const senderName = primaryEmail?.senderName || primaryEmail?.from || thread.participants[0] || 'Unknown Sender';

	return (
		<div
      className={`w-full text-left rounded-xl p-3 border transition-colors bg-card border-sidebar-border ${
        isSelected 
          ? 'bg-primary text-primary-foreground border-primary' 
          : 'hover:bg-accent/50'
      } ${thread.emails[0]?.isRead ? 'font-bold' : ''}`}
      aria-current={isSelected ? "page" : undefined}
      onClick={() => onThreadSelect(thread.id)}
    >
			<div className="flex items-center gap-2">
				{isSelectMode && <input type="checkbox" className="size-4" checked={isSelected} onChange={() => onSelect(thread.id)} />}
				<button className="flex-1 text-left">
					<div className="flex items-center gap-2">
						<ThreadAvatar senderName={senderName} />
						<div className="flex-1 min-w-0">
							<div className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2 min-w-0">
									<span className="font-medium truncate text-foreground">{senderName}</span>
									{thread.participantNames.length > 1 && (
										<span className="text-xs text-muted-foreground">[{thread.participantNames.length - 1}]</span>
									)}
								</div>
								<span className="text-xs text-muted-foreground">
									{new Date(thread.lastEmailDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
								</span>
							</div>
							<div className="truncate text-sm opacity-90">{thread.subject}</div>
							{thread.labels.length > 0 && (
								<div className="flex items-center gap-2 mt-1">
									{thread.labels.map((label: string, index: number) => (
										<ThreadLabel key={index} label={label} />
									))}
									{thread.hasAttachments && <ThreadAttachments attachmentCount={thread.totalAttachmentCount} />}
								</div>
							)}
						</div>
					</div>
					<p className="mt-1 text-xs text-muted-foreground line-clamp-1">{thread.snippet}</p>
					{thread.unreadCount > 0 && (
						<div className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground mt-1">
							{thread.unreadCount} unread
						</div>
					)}
				</button>
			</div>
		</div>
	);
}
