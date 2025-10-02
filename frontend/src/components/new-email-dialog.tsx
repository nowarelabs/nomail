'use client';

interface NewEmailDialogProps {
	isOpen: boolean;
	onClose: (id: boolean) => void;
}

export function NewEmailDialog({ isOpen, onClose }: NewEmailDialogProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<section
			role="dialog"
			aria-modal="true"
			aria-label="Compose email"
			className="fixed bottom-4 right-4 w-[min(100vw-1rem,48rem)] max-w-[48rem] z-50"
			style={{ opacity: 1, transform: 'none' }}
		>
			<div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
				<header className="flex items-center justify-between border-b px-3 py-2">
					<h2 className="text-sm font-medium">New Message</h2>
					<div className="flex items-center gap-2">
						<button
							className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
							onClick={() => {
								onClose(false);
							}}
						>
							Close
						</button>
					</div>
				</header>
				<form className="p-3 space-y-2">
					<div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
						<label htmlFor="to" className="text-xs text-muted-foreground">
							To
						</label>
						<input id="to" required placeholder="Recipient" className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" name="to" />
						<label htmlFor="from" className="text-xs text-muted-foreground">
							From
						</label>
						<input id="from" placeholder="you@domain.com" className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" name="from" />
						<label htmlFor="cc" className="text-xs text-muted-foreground">
							Cc
						</label>
						<input id="cc" placeholder="Add Cc" className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" name="cc" />
						<label htmlFor="bcc" className="text-xs text-muted-foreground">
							Bcc
						</label>
						<input id="bcc" placeholder="Add Bcc" className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" name="bcc" />
						<label htmlFor="replyto" className="text-xs text-muted-foreground">
							Reply‑To
						</label>
						<input
							id="replyto"
							placeholder="Reply-to address"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
							name="replyto"
						/>
						<label htmlFor="subject" className="text-xs text-muted-foreground">
							Subject
						</label>
						<input id="subject" placeholder="Subject" className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" name="subject" />
					</div>
					<div>
						<label htmlFor="content" className="sr-only">
							Message
						</label>
						<textarea
							id="content"
							name="content"
							rows={10}
							placeholder="Write your message…"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
						></textarea>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<button type="button" className="rounded-md border px-2 py-1 text-xs hover:bg-accent">
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
									className="lucide lucide-paperclip size-4"
									aria-hidden="true"
								>
									<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>
								</svg>
							</button>
						</div>
						<div className="flex items-center gap-2">
							<button type="submit" className="rounded-lg border px-3 py-1.5 bg-primary text-primary-foreground">
								Send
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
