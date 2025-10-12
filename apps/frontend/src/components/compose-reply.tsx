'use client';

import { Email } from '../types/emails';

interface ComposeReplyProps {
	emails: Email[];
	action: 'reply' | 'replyAll' | 'forward' | null;
	onClose: () => void;
}

export function ComposeReply({ emails, action, onClose }: ComposeReplyProps) {
	// Get the most recent email for reference
	const latestEmail = emails[emails.length - 1];
	
	// Initialize form fields based on action type
	let to = '';
	let cc = '';
	let subject = '';
	let content = '';
	
	if (action === 'reply') {
		// Reply: To the sender of the latest email
		to = latestEmail.replyTo || latestEmail.from;
		subject = latestEmail.subject.startsWith('Re: ') ? latestEmail.subject : `Re: ${latestEmail.subject}`;
		
		// Add quoted content from the original email
		const plainText = latestEmail.plainTextContent || latestEmail.content || '';
		const quotedContent = plainText.split('\n').map(line => `> ${line}`).join('\n');
		content = `\n\nOn ${latestEmail.date}, ${latestEmail.from} wrote:\n${quotedContent}`;
	} else if (action === 'replyAll') {
		// Reply All: To sender and all recipients
		const recipients = new Set<string>();
		
		// Add sender (using replyTo if available)
		recipients.add(latestEmail.replyTo || latestEmail.from);
		
		// Add primary recipient if different from sender
		if (latestEmail.to && latestEmail.to !== (latestEmail.replyTo || latestEmail.from)) {
			recipients.add(latestEmail.to);
		}
		
		// Add CC recipients
		if (latestEmail.cc && latestEmail.cc.length > 0) {
			latestEmail.cc.forEach(recipient => recipients.add(recipient));
		}
		
		// Convert set to comma-separated string for To field
		to = Array.from(recipients).join(', ');
		
		subject = latestEmail.subject.startsWith('Re: ') ? latestEmail.subject : `Re: ${latestEmail.subject}`;
		
		// Add quoted content from the original email
		const plainText = latestEmail.plainTextContent || latestEmail.content || '';
		const quotedContent = plainText.split('\n').map(line => `> ${line}`).join('\n');
		content = `\n\nOn ${latestEmail.date}, ${latestEmail.from} wrote:\n${quotedContent}`;
	} else if (action === 'forward') {
		// Forward: Clear recipients, update subject
		subject = latestEmail.subject.startsWith('Fwd: ') ? latestEmail.subject : `Fwd: ${latestEmail.subject}`;
		
		// Add forwarded message content
		content = `

-------- Forwarded Message --------
From: ${latestEmail.from}
Date: ${latestEmail.date}
Subject: ${latestEmail.subject}

${latestEmail.plainTextContent || latestEmail.content}`;
	}

	return (
		<div className="border rounded-lg p-3 mt-4 bg-card">
			<div className="flex items-center justify-between mb-3">
				<h4 className="font-medium">
					{action === 'reply' && 'Reply'}
					{action === 'replyAll' && 'Reply All'}
					{action === 'forward' && 'Forward'}
					{!action && 'Compose Reply'}
				</h4>
				<button className="rounded-md border px-2 py-1 text-xs hover:bg-accent" onClick={onClose}>
					Close
				</button>
			</div>
			<form className="space-y-3">
				<div className="grid grid-cols-[4rem_1fr] items-center gap-2">
					<label className="text-xs text-muted-foreground">To</label>
					<input 
						placeholder="Recipient" 
						defaultValue={to}
						className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
					/>
					{action === 'replyAll' && cc && (
						<>
							<label className="text-xs text-muted-foreground">Cc</label>
							<input 
								placeholder="Cc" 
								defaultValue={cc}
								className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
							/>
						</>
					)}
					<label className="text-xs text-muted-foreground">Subject</label>
					<input
						placeholder="Subject"
						defaultValue={subject}
						className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
					/>
				</div>
				<textarea
					rows={4}
					placeholder="Write your message…"
					defaultValue={content}
					className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
				></textarea>
				<div className="flex items-center justify-end gap-2">
					<button type="button" className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent" onClick={onClose}>
						Cancel
					</button>
					<button type="submit" className="rounded-md border px-3 py-1.5 text-sm bg-primary text-primary-foreground">
						Send
					</button>
				</div>
			</form>
		</div>
	);
}