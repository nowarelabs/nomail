'use client';

import { useRef, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Email } from 'components/types/emails';

const EMPTY_EMAIL: Email = {
  id: 0,
  from: '',
  to: '',
  cc: [],
  bcc: [],
  replyTo: '',
  date: '',
  subject: 'No email selected',
  content: 'Select an email thread to view its contents',
  htmlContent: '',
  plainTextContent: 'Select an email thread to view its contents',
  isCollapsed: true,
  isRead: true,
  category: '',
  isDraft: false,
  isFavorite: false,
  isSpam: false,
  isTrash: false,
  isArchive: false,
  labels: [],
  hasAttachments: false,
  attachments: [],
  attachmentCount: 0,
  priority: 'normal',
  isStarred: false,
  threadId: '',
  inReplyTo: '',
  references: [],
  snippet: '',
  size: 0,
  flags: [],
  senderName: '',
  recipientNames: [],
  isImportant: false,
  hasInlineImages: false,
  unsubscribeLink: ''
};

interface EmailThreadProps {
	threadId: number;
	emails: Email[];
	isExpanded: boolean;
	onToggleExpand: (threadId: number) => void;
	onReply: (threadId: number) => void;
	onReplyAll: (threadId: number) => void;
	onForward: (threadId: number) => void;
	onThreadAction: (threadId: number, action: string) => void;
	showCompose: boolean;
	onCloseCompose: () => void;
}

export function EmailThread({
	threadId,
	emails,
	isExpanded,
	onToggleExpand,
	onReply,
	onReplyAll,
	onForward,
	onThreadAction,
	showCompose,
	onCloseCompose,
}: EmailThreadProps) {
	// Handle case where no emails are available
	const displayEmails = emails && emails.length > 0 ? emails : [EMPTY_EMAIL];
	const primaryEmail = displayEmails[0];
	
	// Show empty state when there are no real emails
	const isEmptyState = !emails || emails.length === 0;

	const composeRef = useRef<HTMLDivElement>(null);

	// Scroll to compose box when it's shown
	useEffect(() => {
		if (showCompose && composeRef.current) {
			// Scroll to the compose box with smooth behavior
			composeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}, [showCompose]);

	// Handler functions that combine the original action with scrolling
	const handleReply = (threadId: number) => {
		onReply(threadId);
	};

	const handleReplyAll = (threadId: number) => {
		onReplyAll(threadId);
	};

	const handleForward = (threadId: number) => {
		onForward(threadId);
	};

	return (
		<div className="rounded-xl border bg-card p-4 mb-4">
			{/* Thread header */}
			<div className="flex items-start justify-between gap-3 mb-3">
				<div className="flex-1">
					<h3 className="font-semibold text-lg">{primaryEmail.subject}</h3>
					<div className="text-sm text-muted-foreground">
						{primaryEmail.from ? `${primaryEmail.from} • ${primaryEmail.date}` : primaryEmail.date}
					</div>
					{primaryEmail.to && (
						<div className="text-sm text-muted-foreground">to {primaryEmail.to}</div>
					)}
				</div>

				<div className="flex items-center gap-2">
					{/* Action buttons - disabled in empty state */}
					<button
						className="rounded-lg border px-2.5 py-1.5 hover:bg-accent flex items-center gap-2 text-sm"
						onClick={() => handleReply(threadId)}
						disabled={isEmptyState}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-reply size-4"
						>
							<path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
							<path d="m9 17-5-5 5-5"></path>
						</svg>
						Reply
					</button>

					<button
						className="rounded-lg border px-2.5 py-1.5 hover:bg-accent flex items-center gap-2 text-sm"
						onClick={() => handleReplyAll(threadId)}
						disabled={isEmptyState}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-reply-all size-4"
						>
							<path d="m12 17-5-5 5-5"></path>
							<path d="M22 18v-2a4 4 0 0 0-4-4H7"></path>
							<path d="m7 17-5-5 5-5"></path>
						</svg>
						Reply All
					</button>

					<button
						className="rounded-lg border px-2.5 py-1.5 hover:bg-accent flex items-center gap-2 text-sm"
						onClick={() => handleForward(threadId)}
						disabled={isEmptyState}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-forward size-4"
						>
							<polyline points="15 17 20 12 15 7"></polyline>
							<path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
						</svg>
						Forward
					</button>

					{/* Three dots dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="rounded-lg border px-2.5 py-1.5 hover:bg-accent" disabled={isEmptyState}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-more-horizontal size-4"
								>
									<circle cx="12" cy="12" r="1"></circle>
									<circle cx="19" cy="12" r="1"></circle>
									<circle cx="5" cy="12" r="1"></circle>
								</svg>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuItem onClick={() => onThreadAction(threadId, 'spam')} disabled={isEmptyState}>
								<span>Mark as spam</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => onThreadAction(threadId, 'favorite')} disabled={isEmptyState}>
								<span>Favorite</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => onThreadAction(threadId, 'bin')} disabled={isEmptyState}>
								<span>Move to bin</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Expand/Collapse button */}
					<button 
						className="rounded-lg border px-2.5 py-1.5 hover:bg-accent" 
						onClick={() => onToggleExpand(threadId)}
						disabled={isEmptyState}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={`lucide lucide-chevron-${isExpanded ? 'up' : 'down'} size-4`}
						>
							<path d={isExpanded ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'}></path>
						</svg>
					</button>
				</div>
			</div>

			{/* Thread preview (collapsed view) - only show if not empty state */}
			{!isExpanded && !isEmptyState && (
				<div className="border-t pt-3">
					<p className="text-sm text-muted-foreground line-clamp-2">{primaryEmail.content}</p>
					<div className="text-xs text-muted-foreground mt-2">{displayEmails.length} messages in thread</div>
				</div>
			)}

			{/* Empty state message */}
			{isEmptyState && (
				<div className="border-t pt-3">
					<p className="text-sm text-muted-foreground">{primaryEmail.content}</p>
					<div className="text-xs text-muted-foreground mt-2">No email selected</div>
				</div>
			)}

			{/* Thread expanded view */}
			{isExpanded && !isEmptyState && (
				<div className="border-t pt-3 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
					{displayEmails.map((email, index) => (
						<div key={email.id} className={`p-3 rounded-lg ${index === displayEmails.length - 1 ? 'bg-muted' : 'bg-background'}`}>
							<div className="flex items-start justify-between mb-2">
								<div>
									<div className="font-medium">{email.from}</div>
									<div className="text-xs text-muted-foreground">
										to {email.to} • {email.date}
									</div>
								</div>
								{index === 0 && (
									<div className="flex items-center gap-2">
										<button className="rounded-lg border px-2 py-1 text-xs hover:bg-accent" onClick={() => handleReply(threadId)}>
											Reply
										</button>
									</div>
								)}
							</div>
							<p className="text-sm">{email.content}</p>

							{/* Attachments section */}
							{index === 0 && (
								<div className="rounded-xl border p-3 mt-3">
									<div className="text-sm font-medium mb-2">Attachments [4]</div>
									<div className="flex flex-wrap gap-2">
										<span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-accent text-accent-foreground">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-paperclip size-3.5 opacity-80"
												aria-hidden="true"
											>
												<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>
											</svg>
											<span className="font-mono text-xs">.fig</span>
											<span className="opacity-90">cmd.center.fig</span>
											<span className="opacity-60">21 MB</span>
										</span>
										<span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-secondary text-secondary-foreground">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-paperclip size-3.5 opacity-80"
												aria-hidden="true"
											>
												<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>
											</svg>
											<span className="font-mono text-xs">.docx</span>
											<span className="opacity-90">comments.docx</span>
											<span className="opacity-60">3.7 MB</span>
										</span>
										<span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-primary text-primary-foreground">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-paperclip size-3.5 opacity-80"
												aria-hidden="true"
											>
												<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>
											</svg>
											<span className="font-mono text-xs">.img</span>
											<span className="opacity-90">img.png</span>
											<span className="opacity-60">2.3 MB</span>
										</span>
										<span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-destructive text-destructive-foreground">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="lucide lucide-paperclip size-3.5 opacity-80"
												aria-hidden="true"
											>
												<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>
											</svg>
											<span className="font-mono text-xs">.pdf</span>
											<span className="opacity-90">requirements.pdf</span>
											<span className="opacity-60">1.5 MB</span>
										</span>
									</div>
								</div>
							)}
						</div>
					))}

					{/* Compose form within thread */}
					{showCompose && (
						<div ref={composeRef} className="border rounded-lg p-3 mt-4 bg-card">
							<div className="flex items-center justify-between mb-3">
								<h4 className="font-medium">Compose Reply</h4>
								<button className="rounded-md border px-2 py-1 text-xs hover:bg-accent" onClick={onCloseCompose}>
									Close
								</button>
							</div>
							<form className="space-y-3">
								<div className="grid grid-cols-[4rem_1fr] items-center gap-2">
									<label className="text-xs text-muted-foreground">To</label>
									<input placeholder="Recipient" className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" />
									<label className="text-xs text-muted-foreground">Subject</label>
									<input
										placeholder="Subject"
										defaultValue={`Re: ${primaryEmail.subject}`}
										className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
									/>
								</div>
								<textarea
									rows={4}
									placeholder="Write your message…"
									className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
								></textarea>
								<div className="flex items-center justify-end gap-2">
									<button type="button" className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent" onClick={onCloseCompose}>
										Cancel
									</button>
									<button type="submit" className="rounded-md border px-3 py-1.5 text-sm bg-primary text-primary-foreground">
										Send
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
