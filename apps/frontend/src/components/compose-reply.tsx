"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Email } from "../types/emails";
import { EmailAddressPill } from "./email-address-pill";
import { ReplyModal } from "./reply-modal";

interface ComposeReplyProps {
	emails: Email[];
	action: "reply" | "replyAll" | "forward" | null;
	onClose: () => void;
}

export function ComposeReply({ emails, action, onClose }: ComposeReplyProps) {
	// Get the most recent email for reference
	const latestEmail = emails[emails.length - 1];

	// Initialize form fields based on action type
	let initialTo = "";
	let initialCc = "";
	let subject = "";
	let content = "";

	if (action === "reply") {
		// Reply: To the sender of the latest email
		initialTo = latestEmail.replyTo || latestEmail.from;
		subject = latestEmail.subject.startsWith("Re: ")
			? latestEmail.subject
			: `Re: ${latestEmail.subject}`;

		// Add quoted content from the original email
		const plainText = latestEmail.plainTextContent || latestEmail.content || "";
		const quotedContent = plainText
			.split("\n")
			.map((line) => `> ${line}`)
			.join("\n");
		content = `\n\nOn ${latestEmail.date}, ${latestEmail.from} wrote:\n${quotedContent}`;
	} else if (action === "replyAll") {
		// Reply All: To sender and all recipients
		const recipients = new Set<string>();

		// Add sender (using replyTo if available)
		recipients.add(latestEmail.replyTo || latestEmail.from);

		// Add primary recipient if different from sender
		if (
			latestEmail.to &&
			latestEmail.to !== (latestEmail.replyTo || latestEmail.from)
		) {
			recipients.add(latestEmail.to);
		}

		// Add CC recipients
		if (latestEmail.cc && latestEmail.cc.length > 0) {
			latestEmail.cc.forEach((recipient) => recipients.add(recipient));
		}

		// Convert set to comma-separated string for To field
		initialTo = Array.from(recipients).join(", ");

		subject = latestEmail.subject.startsWith("Re: ")
			? latestEmail.subject
			: `Re: ${latestEmail.subject}`;

		// Add quoted content from the original email
		const plainText = latestEmail.plainTextContent || latestEmail.content || "";
		const quotedContent = plainText
			.split("\n")
			.map((line) => `> ${line}`)
			.join("\n");
		content = `\n\nOn ${latestEmail.date}, ${latestEmail.from} wrote:\n${quotedContent}`;
	} else if (action === "forward") {
		// Forward: Clear recipients, update subject
		subject = latestEmail.subject.startsWith("Fwd: ")
			? latestEmail.subject
			: `Fwd: ${latestEmail.subject}`;

		// Add forwarded message content
		content = `

-------- Forwarded Message --------
From: ${latestEmail.from}
Date: ${latestEmail.date}
Subject: ${latestEmail.subject}

${latestEmail.plainTextContent || latestEmail.content}`;
	}

	// State for email addresses
	const [toEmails, setToEmails] = useState<string[]>(
		initialTo ? initialTo.split(",").map((email) => email.trim()) : []
	);
	const [ccEmails, setCcEmails] = useState<string[]>(
		initialCc ? initialCc.split(",").map((email) => email.trim()) : []
	);

	// State for current input values
	const [toInput, setToInput] = useState("");
	const [ccInput, setCcInput] = useState("");

	// Refs for input fields
	const toInputRef = useRef<HTMLInputElement>(null);
	const ccInputRef = useRef<HTMLInputElement>(null);

	// State for reply modal
	const [showReplyModal, setShowReplyModal] = useState(false);

	// Function to validate email format
	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Function to add email when pressing Enter or comma
	const handleEmailInput = (
		e: KeyboardEvent<HTMLInputElement>,
		inputValue: string,
		setInputValue: (value: string) => void,
		emailList: string[],
		setEmailList: (emails: string[]) => void,
		nextInputRef?: React.RefObject<HTMLInputElement>
	) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			const email = inputValue.trim().replace(/,$/, ""); // Remove trailing comma

			if (email && isValidEmail(email) && !emailList.includes(email)) {
				setEmailList([...emailList, email]);
				setInputValue("");

				// Focus next input if available
				if (nextInputRef?.current) {
					nextInputRef.current.focus();
				}
			}
		}

		// Handle backspace to remove last email when input is empty
		if (e.key === "Backspace" && inputValue === "" && emailList.length > 0) {
			const newEmailList = [...emailList];
			newEmailList.pop(); // Remove last email
			setEmailList(newEmailList);
		}
	};

	// Function to remove email
	const removeEmail = (
		email: string,
		emailList: string[],
		setEmailList: (emails: string[]) => void
	) => {
		setEmailList(emailList.filter((e) => e !== email));
	};

	// Function to handle blur (when user clicks away)
	const handleInputBlur = (
		inputValue: string,
		setInputValue: (value: string) => void,
		emailList: string[],
		setEmailList: (emails: string[]) => void
	) => {
		if (inputValue.trim()) {
			const email = inputValue.trim();
			if (isValidEmail(email) && !emailList.includes(email)) {
				setEmailList([...emailList, email]);
				setInputValue("");
			}
		}
	};

	// Handler for sending email from modal
	const handleSendEmail = (emailData: {
		to: string[];
		cc: string[];
		subject: string;
		content: string;
	}) => {
		// In a real app, this would send the email
		console.log("Sending email:", emailData);
		// For now, we'll just close the modal
		setShowReplyModal(false);
		onClose();
	};

	return (
		<div className="border rounded-lg p-3 mt-4 bg-card">
			<div className="flex items-center justify-between mb-3">
				<h4 className="font-medium">
					{action === "reply" && "Reply"}
					{action === "replyAll" && "Reply All"}
					{action === "forward" && "Forward"}
					{!action && "Compose Reply"}
				</h4>
				<div className="flex items-center gap-2">
					<button
						className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
						onClick={() => setShowReplyModal(true)}
					>
						Expand
					</button>
					<button
						className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
			<form className="space-y-3">
				<div className="grid grid-cols-[4rem_1fr] items-center gap-2">
					<label className="text-xs text-muted-foreground">To</label>
					<div
						className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm min-h-9 flex flex-wrap gap-1 items-center"
						onClick={() => toInputRef.current?.focus()}
					>
						{toEmails.map((email) => (
							<EmailAddressPill
								key={email}
								email={email}
								onRemove={(email) => removeEmail(email, toEmails, setToEmails)}
							/>
						))}
						<input
							ref={toInputRef}
							value={toInput}
							onChange={(e) => setToInput(e.target.value)}
							onKeyDown={(e) =>
								handleEmailInput(
									e,
									toInput,
									setToInput,
									toEmails,
									setToEmails,
									ccInputRef as React.RefObject<HTMLInputElement>
								)
							}
							onBlur={() =>
								handleInputBlur(toInput, setToInput, toEmails, setToEmails)
							}
							placeholder={toEmails.length === 0 ? "Recipient" : ""}
							className="flex-1 min-w-[120px] bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0"
						/>
					</div>
					{(action === "replyAll" || ccEmails.length > 0) && (
						<>
							<label className="text-xs text-muted-foreground">Cc</label>
							<div
								className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm min-h-9 flex flex-wrap gap-1 items-center"
								onClick={() => ccInputRef.current?.focus()}
							>
								{ccEmails.map((email) => (
									<EmailAddressPill
										key={email}
										email={email}
										onRemove={(email) =>
											removeEmail(email, ccEmails, setCcEmails)
										}
									/>
								))}
								<input
									ref={ccInputRef}
									value={ccInput}
									onChange={(e) => setCcInput(e.target.value)}
									onKeyDown={(e) =>
										handleEmailInput(
											e,
											ccInput,
											setCcInput,
											ccEmails,
											setCcEmails
										)
									}
									onBlur={() =>
										handleInputBlur(ccInput, setCcInput, ccEmails, setCcEmails)
									}
									placeholder={ccEmails.length === 0 ? "Add Cc" : ""}
									className="flex-1 min-w-[120px] bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0"
								/>
							</div>
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
					<button
						type="button"
						className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded-md border px-3 py-1.5 text-sm bg-primary text-primary-foreground"
					>
						Send
					</button>
				</div>
			</form>

			{/* Reply Modal - only accessible through this ComposeReply component */}
			<ReplyModal
				emails={emails}
				action={action as "reply" | "replyAll" | "forward"}
				isOpen={showReplyModal}
				onClose={() => setShowReplyModal(false)}
				onSend={handleSendEmail}
			/>
		</div>
	);
}
