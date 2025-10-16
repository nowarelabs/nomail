"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { EmailAddressPill } from "./email-address-pill";

interface NewEmailDialogProps {
	isOpen: boolean;
	onClose: (id: boolean) => void;
}

export function NewEmailDialog({ isOpen, onClose }: NewEmailDialogProps) {
	if (!isOpen) {
		return null;
	}

	// State for email addresses
	const [toEmails, setToEmails] = useState<string[]>([]);
	const [ccEmails, setCcEmails] = useState<string[]>([]);
	const [bccEmails, setBccEmails] = useState<string[]>([]);

	// State for current input values
	const [toInput, setToInput] = useState("");
	const [ccInput, setCcInput] = useState("");
	const [bccInput, setBccInput] = useState("");

	// Refs for input fields
	const toInputRef = useRef<HTMLInputElement>(null);
	const ccInputRef = useRef<HTMLInputElement>(null);
	const bccInputRef = useRef<HTMLInputElement>(null);

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

	return (
		<section
			role="dialog"
			aria-modal="true"
			aria-label="Compose email"
			className="fixed bottom-4 right-4 w-[min(100vw-1rem,48rem)] max-w-[48rem] z-50"
			style={{ opacity: 1, transform: "none" }}
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
						<div
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm min-h-9 flex flex-wrap gap-1 items-center"
							onClick={() => toInputRef.current?.focus()}
						>
							{toEmails.map((email) => (
								<EmailAddressPill
									key={email}
									email={email}
									onRemove={(email) =>
										removeEmail(email, toEmails, setToEmails)
									}
								/>
							))}
							<input
								ref={toInputRef}
								id="to"
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
								name="to"
							/>
						</div>
						<label htmlFor="from" className="text-xs text-muted-foreground">
							From
						</label>
						<input
							id="from"
							placeholder="you@domain.com"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
							name="from"
						/>
						<label htmlFor="cc" className="text-xs text-muted-foreground">
							Cc
						</label>
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
								id="cc"
								value={ccInput}
								onChange={(e) => setCcInput(e.target.value)}
								onKeyDown={(e) =>
									handleEmailInput(
										e,
										ccInput,
										setCcInput,
										ccEmails,
										setCcEmails,
										bccInputRef as React.RefObject<HTMLInputElement>
									)
								}
								onBlur={() =>
									handleInputBlur(ccInput, setCcInput, ccEmails, setCcEmails)
								}
								placeholder={ccEmails.length === 0 ? "Add Cc" : ""}
								className="flex-1 min-w-[120px] bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0"
								name="cc"
							/>
						</div>
						<label htmlFor="bcc" className="text-xs text-muted-foreground">
							Bcc
						</label>
						<div
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm min-h-9 flex flex-wrap gap-1 items-center"
							onClick={() => bccInputRef.current?.focus()}
						>
							{bccEmails.map((email) => (
								<EmailAddressPill
									key={email}
									email={email}
									onRemove={(email) =>
										removeEmail(email, bccEmails, setBccEmails)
									}
								/>
							))}
							<input
								ref={bccInputRef}
								id="bcc"
								value={bccInput}
								onChange={(e) => setBccInput(e.target.value)}
								onKeyDown={(e) =>
									handleEmailInput(
										e,
										bccInput,
										setBccInput,
										bccEmails,
										setBccEmails
									)
								}
								onBlur={() =>
									handleInputBlur(
										bccInput,
										setBccInput,
										bccEmails,
										setBccEmails
									)
								}
								placeholder={bccEmails.length === 0 ? "Add Bcc" : ""}
								className="flex-1 min-w-[120px] bg-transparent border-0 outline-none focus:outline-none focus:ring-0 p-0"
								name="bcc"
							/>
						</div>
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
						<input
							id="subject"
							placeholder="Subject"
							className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
							name="subject"
						/>
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
							<button
								type="button"
								className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
							>
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
							<button
								type="submit"
								className="rounded-lg border px-3 py-1.5 bg-primary text-primary-foreground"
							>
								Send
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
