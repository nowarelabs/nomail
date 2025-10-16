"use client";

import { useState, useEffect, useRef } from "react";

import type { EmailThread, Email } from "../types/emails";

import { EmailThread as EmailThreadComponent } from "../components/email-thread";
import { EmailThreadsListItem } from "../components/email-threads-list-item";
import { NewEmailDialog } from "../components/new-email-dialog";
import { FiltersDialog } from "components/components/filters-dialog";
import { TitleBar } from "../components/title-bar";
import { LeftAsideBar } from "../components/left-aside-bar";
import { ViewChangerPanel } from "../components/view-changer-panel";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

export default function Home() {
	const [showNewEmailDialog, setShowNewEmailDialog] = useState(false);
	const [showFiltersDialog, setShowFiltersDialog] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [isCoreOpen, setIsCoreOpen] = useState(true);
	const [isManagementOpen, setIsManagementOpen] = useState(true);
	const [isLabelsOpen, setIsLabelsOpen] = useState(false);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [isMoreOpen, setIsMoreOpen] = useState(true);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [activeMainView, setActiveMainView] = useState("inbox");
	const [activeSecondaryView, setActiveSecondaryView] = useState("primary");
	const [isSelectMode, setIsSelectMode] = useState(false);
	const [selectedThreads, setSelectedThreads] = useState<Set<string>>(
		new Set()
	);
	const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
	const [expandedThreads, setExpandedThreads] = useState<Set<string>>(
		new Set()
	);
	const [emailThreads, setEmailThreads] = useState<EmailThread[]>([
		// Primary emails
		{
			id: "1",
			subject: "New design review",
			emails: [
				{
					id: 1,
					from: "ali@baked.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 29",
					subject: "New design review",
					content: "Team discussed command center improvements...",
					htmlContent: "",
					plainTextContent: "Team discussed command center improvements...",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "1",
							name: "image.png",
							extension: ".png",
							size: 524288,
							sizeFormatted: "512.0 KB",
							type: "image/png",
							mimeType: "image/png",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Mar 29",
							thumbnailUrl: "",
							isInline: false,
						},
						{
							id: "2",
							name: "requirements.pdf",
							extension: ".pdf",
							size: 1048576,
							sizeFormatted: "1.0 MB",
							type: "application/pdf",
							mimeType: "application/pdf",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 2,
							uploadedDate: "Mar 29",
							thumbnailUrl: "",
							isInline: false,
						},
						{
							id: "3",
							name: "comments.docx",
							extension: ".docx",
							size: 2097152,
							sizeFormatted: "2.0 MB",
							type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							mimeType:
								"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 2,
							uploadedDate: "Mar 29",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 3,
					priority: "normal",
					isStarred: false,
					threadId: "1",
					inReplyTo: "",
					references: [],
					snippet: "Team discussed command center improvements...",
					size: 0,
					flags: [],
					senderName: "Ali from Baked",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
				{
					id: 2,
					from: "you@example.com",
					to: "ali@baked.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 28",
					subject: "Re: New design review",
					content:
						"Thanks for the feedback. I'll work on implementing the suggestions.",
					htmlContent: "",
					plainTextContent:
						"Thanks for the feedback. I'll work on implementing the suggestions.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "1",
					inReplyTo: "1",
					references: ["1"],
					snippet: "Thanks for the feedback...",
					size: 0,
					flags: ["replied"],
					senderName: "You",
					recipientNames: ["Ali from Baked"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
				{
					id: 3,
					from: "ali@baked.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 27",
					subject: "Re: New design review",
					content: "Looking forward to seeing the updated designs.",
					htmlContent: "",
					plainTextContent: "Looking forward to seeing the updated designs.",
					isCollapsed: true,
					isRead: false,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "1",
					inReplyTo: "2",
					references: ["1", "2"],
					snippet: "Looking forward to seeing...",
					size: 0,
					flags: [],
					senderName: "Ali from Baked",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["ali@baked.com", "you@example.com"],
			participantNames: ["Ali from Baked", "You"],
			lastEmailDate: "Mar 29",
			firstEmailDate: "Mar 27",
			messageCount: 3,
			unreadCount: 2,
			hasAttachments: true,
			totalAttachmentCount: 4,
			labels: ["Work"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "Team discussed command center improvements...",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "2",
			subject: "Project status update",
			emails: [
				{
					id: 4,
					from: "manager@company.com",
					to: "you@example.com",
					cc: ["team@company.com"],
					bcc: [],
					replyTo: "",
					date: "Mar 28",
					subject: "Project status update",
					content:
						"Please provide a status update on the current project by end of day.",
					htmlContent: "",
					plainTextContent:
						"Please provide a status update on the current project by end of day.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: true,
					threadId: "2",
					inReplyTo: "",
					references: [],
					snippet: "Please provide a status update on the current project...",
					size: 0,
					flags: [],
					senderName: "Project Manager",
					recipientNames: ["You", "Team"],
					isImportant: true,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: [
				"manager@company.com",
				"you@example.com",
				"team@company.com",
			],
			participantNames: ["Project Manager", "You", "Team"],
			lastEmailDate: "Mar 28",
			firstEmailDate: "Mar 28",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Work", "Important"],
			isStarred: true,
			isFavorite: false,
			isImportant: true,
			category: "primary",
			snippet: "Please provide a status update on the current project...",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "3",
			subject: "Meeting tomorrow",
			emails: [
				{
					id: 5,
					from: "colleague@company.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 27",
					subject: "Meeting tomorrow",
					content:
						"Just confirming our meeting scheduled for tomorrow at 10am.",
					htmlContent: "",
					plainTextContent:
						"Just confirming our meeting scheduled for tomorrow at 10am.",
					isCollapsed: true,
					isRead: false,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "3",
					inReplyTo: "",
					references: [],
					snippet: "Just confirming our meeting scheduled for tomorrow...",
					size: 0,
					flags: [],
					senderName: "Colleague",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["colleague@company.com", "you@example.com"],
			participantNames: ["Colleague", "You"],
			lastEmailDate: "Mar 27",
			firstEmailDate: "Mar 27",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Meeting"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "Just confirming our meeting scheduled for tomorrow...",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Social emails
		{
			id: "4",
			subject: "New friend request",
			emails: [
				{
					id: 6,
					from: "social-network@example.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 29",
					subject: "New friend request",
					content: "You have a new friend request from John Doe.",
					htmlContent: "",
					plainTextContent: "You have a new friend request from John Doe.",
					isCollapsed: true,
					isRead: true,
					category: "social",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "4",
					inReplyTo: "",
					references: [],
					snippet: "You have a new friend request from John Doe.",
					size: 0,
					flags: [],
					senderName: "Social Network",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["social-network@example.com", "you@example.com"],
			participantNames: ["Social Network", "You"],
			lastEmailDate: "Mar 29",
			firstEmailDate: "Mar 29",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Social"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "social",
			snippet: "You have a new friend request from John Doe.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "5",
			subject: "Photo tagged",
			emails: [
				{
					id: 7,
					from: "photos@example.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 28",
					subject: "Photo tagged",
					content: "You were tagged in 3 photos.",
					htmlContent: "",
					plainTextContent: "You were tagged in 3 photos.",
					isCollapsed: true,
					isRead: false,
					category: "social",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "5",
					inReplyTo: "",
					references: [],
					snippet: "You were tagged in 3 photos.",
					size: 0,
					flags: [],
					senderName: "Photo Service",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["photos@example.com", "you@example.com"],
			participantNames: ["Photo Service", "You"],
			lastEmailDate: "Mar 28",
			firstEmailDate: "Mar 28",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Social"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "social",
			snippet: "You were tagged in 3 photos.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Updates emails
		{
			id: "6",
			subject: "Security alert: Critical vulnerability",
			emails: [
				{
					id: 8,
					from: "noreply@github.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 28",
					subject: "Security alert: Critical vulnerability",
					content:
						"A high severity vulnerability was detected in one of your dependencies.",
					htmlContent: "",
					plainTextContent:
						"A high severity vulnerability was detected in one of your dependencies.",
					isCollapsed: true,
					isRead: false,
					category: "notifications",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: ["security"],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "high",
					isStarred: false,
					threadId: "6",
					inReplyTo: "",
					references: [],
					snippet: "A high severity vulnerability was detected...",
					size: 0,
					flags: [],
					senderName: "GitHub",
					recipientNames: ["You"],
					isImportant: true,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["noreply@github.com", "you@example.com"],
			participantNames: ["GitHub", "You"],
			lastEmailDate: "Mar 28",
			firstEmailDate: "Mar 28",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Security"],
			isStarred: false,
			isFavorite: false,
			isImportant: true,
			category: "updates",
			snippet: "A high severity vulnerability was detected...",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "7",
			subject: "Service maintenance",
			emails: [
				{
					id: 9,
					from: "admin@service.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 27",
					subject: "Service maintenance",
					content: "We will be performing scheduled maintenance this weekend.",
					htmlContent: "",
					plainTextContent:
						"We will be performing scheduled maintenance this weekend.",
					isCollapsed: true,
					isRead: true,
					category: "notifications",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "7",
					inReplyTo: "",
					references: [],
					snippet: "We will be performing scheduled maintenance this weekend.",
					size: 0,
					flags: [],
					senderName: "Service Admin",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["admin@service.com", "you@example.com"],
			participantNames: ["Service Admin", "You"],
			lastEmailDate: "Mar 27",
			firstEmailDate: "Mar 27",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Maintenance"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "updates",
			snippet: "We will be performing scheduled maintenance this weekend.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Promotions emails
		{
			id: "8",
			subject: "New shows added to your list",
			emails: [
				{
					id: 10,
					from: "info@netflix.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 29",
					subject: "New shows added to your list",
					content: "We added new shows we think you will love.",
					htmlContent: "",
					plainTextContent: "We added new shows we think you will love.",
					isCollapsed: true,
					isRead: false,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "8",
					inReplyTo: "",
					references: [],
					snippet: "We added new shows we think you will love.",
					size: 0,
					flags: [],
					senderName: "Netflix",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "https://netflix.com/unsubscribe",
				},
			],
			participants: ["info@netflix.com", "you@example.com"],
			participantNames: ["Netflix", "You"],
			lastEmailDate: "Mar 29",
			firstEmailDate: "Mar 29",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Entertainment"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "We added new shows we think you will love.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "9",
			subject: "Special offer just for you",
			emails: [
				{
					id: 11,
					from: "deals@store.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 28",
					subject: "Special offer just for you",
					content: "Exclusive 50% off discount for our loyal customers.",
					htmlContent: "",
					plainTextContent:
						"Exclusive 50% off discount for our loyal customers.",
					isCollapsed: true,
					isRead: true,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "9",
					inReplyTo: "",
					references: [],
					snippet: "Exclusive 50% off discount for our loyal customers.",
					size: 0,
					flags: [],
					senderName: "Online Store",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "https://store.com/unsubscribe",
				},
			],
			participants: ["deals@store.com", "you@example.com"],
			participantNames: ["Online Store", "You"],
			lastEmailDate: "Mar 28",
			firstEmailDate: "Mar 28",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Promotion"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "Exclusive 50% off discount for our loyal customers.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "10",
			subject: "Last chance: Sale ends tonight",
			emails: [
				{
					id: 12,
					from: "marketing@brand.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 27",
					subject: "Last chance: Sale ends tonight",
					content: "Don't miss out on our biggest sale of the year!",
					htmlContent: "",
					plainTextContent: "Don't miss out on our biggest sale of the year!",
					isCollapsed: true,
					isRead: false,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "10",
					inReplyTo: "",
					references: [],
					snippet: "Don't miss out on our biggest sale of the year!",
					size: 0,
					flags: [],
					senderName: "Brand Marketing",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "https://brand.com/unsubscribe",
				},
			],
			participants: ["marketing@brand.com", "you@example.com"],
			participantNames: ["Brand Marketing", "You"],
			lastEmailDate: "Mar 27",
			firstEmailDate: "Mar 27",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Promotion"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "Don't miss out on our biggest sale of the year!",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Favorites
		{
			id: "11",
			subject: "Important project proposal",
			emails: [
				{
					id: 13,
					from: "client@important.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 26",
					subject: "Important project proposal",
					content: "We would like to discuss the project proposal with you.",
					htmlContent: "",
					plainTextContent:
						"We would like to discuss the project proposal with you.",
					isCollapsed: true,
					isRead: false,
					category: "work",
					isDraft: false,
					isFavorite: true,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "4",
							name: "project_proposal.pdf",
							extension: ".pdf",
							size: 2097152,
							sizeFormatted: "2.0 MB",
							type: "application/pdf",
							mimeType: "application/pdf",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Mar 26",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 1,
					priority: "high",
					isStarred: true,
					threadId: "11",
					inReplyTo: "",
					references: [],
					snippet: "We would like to discuss the project proposal with you.",
					size: 0,
					flags: [],
					senderName: "Important Client",
					recipientNames: ["You"],
					isImportant: true,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["client@important.com", "you@example.com"],
			participantNames: ["Important Client", "You"],
			lastEmailDate: "Mar 26",
			firstEmailDate: "Mar 26",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: true,
			totalAttachmentCount: 1,
			labels: ["Work", "Important"],
			isStarred: true,
			isFavorite: true,
			isImportant: true,
			category: "primary",
			snippet: "We would like to discuss the project proposal with you.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "12",
			subject: "Family reunion photos",
			emails: [
				{
					id: 14,
					from: "family@example.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 25",
					subject: "Family reunion photos",
					content: "Here are the photos from our family reunion last weekend.",
					htmlContent: "",
					plainTextContent:
						"Here are the photos from our family reunion last weekend.",
					isCollapsed: true,
					isRead: true,
					category: "personal",
					isDraft: false,
					isFavorite: true,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "5",
							name: "family_reunion_01.jpg",
							extension: ".jpg",
							size: 3145728,
							sizeFormatted: "3.0 MB",
							type: "image/jpeg",
							mimeType: "image/jpeg",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Mar 25",
							thumbnailUrl: "",
							isInline: false,
						},
						{
							id: "6",
							name: "family_reunion_02.jpg",
							extension: ".jpg",
							size: 2621440,
							sizeFormatted: "2.5 MB",
							type: "image/jpeg",
							mimeType: "image/jpeg",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Mar 25",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 2,
					priority: "normal",
					isStarred: false,
					threadId: "12",
					inReplyTo: "",
					references: [],
					snippet: "Here are the photos from our family reunion last weekend.",
					size: 0,
					flags: [],
					senderName: "Family Member",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["family@example.com", "you@example.com"],
			participantNames: ["Family Member", "You"],
			lastEmailDate: "Mar 25",
			firstEmailDate: "Mar 25",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: true,
			totalAttachmentCount: 2,
			labels: ["Personal"],
			isStarred: false,
			isFavorite: true,
			isImportant: false,
			category: "social",
			snippet: "Here are the photos from our family reunion last weekend.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Drafts
		{
			id: "13",
			subject: "Project update for Q2",
			emails: [
				{
					id: 15,
					from: "you@example.com",
					to: "manager@company.com",
					cc: ["team@company.com"],
					bcc: [],
					replyTo: "",
					date: "Mar 24",
					subject: "Project update for Q2",
					content: "Here is the project update for Q2...",
					htmlContent: "",
					plainTextContent: "Here is the project update for Q2...",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: true,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "13",
					inReplyTo: "",
					references: [],
					snippet: "Here is the project update for Q2...",
					size: 0,
					flags: [],
					senderName: "You",
					recipientNames: ["Manager", "Team"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: [
				"you@example.com",
				"manager@company.com",
				"team@company.com",
			],
			participantNames: ["You", "Manager", "Team"],
			lastEmailDate: "Mar 24",
			firstEmailDate: "Mar 24",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Work"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "Here is the project update for Q2...",
			isCollapsed: true,
			isDraft: true,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "14",
			subject: "Vacation plans",
			emails: [
				{
					id: 16,
					from: "you@example.com",
					to: "friend@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 23",
					subject: "Vacation plans",
					content: "I was thinking about our vacation plans...",
					htmlContent: "",
					plainTextContent: "I was thinking about our vacation plans...",
					isCollapsed: true,
					isRead: true,
					category: "personal",
					isDraft: true,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "14",
					inReplyTo: "",
					references: [],
					snippet: "I was thinking about our vacation plans...",
					size: 0,
					flags: [],
					senderName: "You",
					recipientNames: ["Friend"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "friend@example.com"],
			participantNames: ["You", "Friend"],
			lastEmailDate: "Mar 23",
			firstEmailDate: "Mar 23",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Personal"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "social",
			snippet: "I was thinking about our vacation plans...",
			isCollapsed: true,
			isDraft: true,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "15",
			subject: "Meeting notes",
			emails: [
				{
					id: 17,
					from: "you@example.com",
					to: "colleague@company.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 22",
					subject: "Meeting notes",
					content: "Here are the notes from our meeting...",
					htmlContent: "",
					plainTextContent: "Here are the notes from our meeting...",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: true,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "15",
					inReplyTo: "",
					references: [],
					snippet: "Here are the notes from our meeting...",
					size: 0,
					flags: [],
					senderName: "You",
					recipientNames: ["Colleague"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "colleague@company.com"],
			participantNames: ["You", "Colleague"],
			lastEmailDate: "Mar 22",
			firstEmailDate: "Mar 22",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Work"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "Here are the notes from our meeting...",
			isCollapsed: true,
			isDraft: true,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "16",
			subject: "Product feedback",
			emails: [
				{
					id: 18,
					from: "you@example.com",
					to: "support@product.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 21",
					subject: "Product feedback",
					content: "I wanted to share some feedback about your product...",
					htmlContent: "",
					plainTextContent:
						"I wanted to share some feedback about your product...",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: true,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "16",
					inReplyTo: "",
					references: [],
					snippet: "I wanted to share some feedback about your product...",
					size: 0,
					flags: [],
					senderName: "You",
					recipientNames: ["Support"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "support@product.com"],
			participantNames: ["You", "Support"],
			lastEmailDate: "Mar 21",
			firstEmailDate: "Mar 21",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Feedback"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "updates",
			snippet: "I wanted to share some feedback about your product...",
			isCollapsed: true,
			isDraft: true,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "17",
			subject: "Newsletter article",
			emails: [
				{
					id: 19,
					from: "you@example.com",
					to: "newsletter@blog.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 20",
					subject: "Newsletter article",
					content: "Here is the article I promised for your newsletter...",
					htmlContent: "",
					plainTextContent:
						"Here is the article I promised for your newsletter...",
					isCollapsed: true,
					isRead: true,
					category: "personal",
					isDraft: true,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "7",
							name: "newsletter_article.docx",
							extension: ".docx",
							size: 1572864,
							sizeFormatted: "1.5 MB",
							type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							mimeType:
								"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Mar 20",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 1,
					priority: "normal",
					isStarred: false,
					threadId: "17",
					inReplyTo: "",
					references: [],
					snippet: "Here is the article I promised for your newsletter...",
					size: 0,
					flags: [],
					senderName: "You",
					recipientNames: ["Newsletter"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "newsletter@blog.com"],
			participantNames: ["You", "Newsletter"],
			lastEmailDate: "Mar 20",
			firstEmailDate: "Mar 20",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: true,
			totalAttachmentCount: 1,
			labels: ["Writing"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "Here is the article I promised for your newsletter...",
			isCollapsed: true,
			isDraft: true,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Sent emails
		{
			id: "18",
			subject: "Thank you for the opportunity",
			emails: [
				{
					id: 20,
					from: "you@example.com",
					to: "recruiter@company.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 19",
					subject: "Thank you for the opportunity",
					content: "Thank you for considering me for the position.",
					htmlContent: "",
					plainTextContent: "Thank you for considering me for the position.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "18",
					inReplyTo: "",
					references: [],
					snippet: "Thank you for considering me for the position.",
					size: 0,
					flags: ["sent"],
					senderName: "You",
					recipientNames: ["Recruiter"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "recruiter@company.com"],
			participantNames: ["You", "Recruiter"],
			lastEmailDate: "Mar 19",
			firstEmailDate: "Mar 19",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Work"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "Thank you for considering me for the position.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "19",
			subject: "Happy birthday!",
			emails: [
				{
					id: 21,
					from: "you@example.com",
					to: "friend@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 18",
					subject: "Happy birthday!",
					content: "Happy birthday! Hope you have a wonderful day.",
					htmlContent: "",
					plainTextContent: "Happy birthday! Hope you have a wonderful day.",
					isCollapsed: true,
					isRead: true,
					category: "personal",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "19",
					inReplyTo: "",
					references: [],
					snippet: "Happy birthday! Hope you have a wonderful day.",
					size: 0,
					flags: ["sent"],
					senderName: "You",
					recipientNames: ["Friend"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "friend@example.com"],
			participantNames: ["You", "Friend"],
			lastEmailDate: "Mar 18",
			firstEmailDate: "Mar 18",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Personal"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "social",
			snippet: "Happy birthday! Hope you have a wonderful day.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "20",
			subject: "Invoice for services",
			emails: [
				{
					id: 22,
					from: "you@example.com",
					to: "client@business.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 17",
					subject: "Invoice for services",
					content:
						"Please find the attached invoice for the services provided.",
					htmlContent: "",
					plainTextContent:
						"Please find the attached invoice for the services provided.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "8",
							name: "invoice_001.pdf",
							extension: ".pdf",
							size: 1048576,
							sizeFormatted: "1.0 MB",
							type: "application/pdf",
							mimeType: "application/pdf",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Mar 17",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 1,
					priority: "normal",
					isStarred: false,
					threadId: "20",
					inReplyTo: "",
					references: [],
					snippet:
						"Please find the attached invoice for the services provided.",
					size: 0,
					flags: ["sent"],
					senderName: "You",
					recipientNames: ["Client"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["you@example.com", "client@business.com"],
			participantNames: ["You", "Client"],
			lastEmailDate: "Mar 17",
			firstEmailDate: "Mar 17",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: true,
			totalAttachmentCount: 1,
			labels: ["Work", "Billing"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "Please find the attached invoice for the services provided.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: false,
		},
		// Archive
		{
			id: "21",
			subject: "Old project files",
			emails: [
				{
					id: 23,
					from: "old-colleague@company.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Jan 15",
					subject: "Old project files",
					content: "These are the project files from the previous year.",
					htmlContent: "",
					plainTextContent:
						"These are the project files from the previous year.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: true,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "9",
							name: "project_files.zip",
							extension: ".zip",
							size: 5242880,
							sizeFormatted: "5.0 MB",
							type: "application/zip",
							mimeType: "application/zip",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Jan 15",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 1,
					priority: "normal",
					isStarred: false,
					threadId: "21",
					inReplyTo: "",
					references: [],
					snippet: "These are the project files from the previous year.",
					size: 0,
					flags: [],
					senderName: "Old Colleague",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["old-colleague@company.com", "you@example.com"],
			participantNames: ["Old Colleague", "You"],
			lastEmailDate: "Jan 15",
			firstEmailDate: "Jan 15",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: true,
			totalAttachmentCount: 1,
			labels: ["Work", "Archive"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "These are the project files from the previous year.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: true,
		},
		{
			id: "22",
			subject: "Conference materials",
			emails: [
				{
					id: 24,
					from: "conference@event.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Dec 10",
					subject: "Conference materials",
					content: "Here are the materials from the conference you attended.",
					htmlContent: "",
					plainTextContent:
						"Here are the materials from the conference you attended.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: false,
					isArchive: true,
					labels: [],
					hasAttachments: true,
					attachments: [
						{
							id: "10",
							name: "conference_presentation.pptx",
							extension: ".pptx",
							size: 3145728,
							sizeFormatted: "3.0 MB",
							type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
							mimeType:
								"application/vnd.openxmlformats-officedocument.presentationml.presentation",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Dec 10",
							thumbnailUrl: "",
							isInline: false,
						},
						{
							id: "11",
							name: "conference_handouts.pdf",
							extension: ".pdf",
							size: 2097152,
							sizeFormatted: "2.0 MB",
							type: "application/pdf",
							mimeType: "application/pdf",
							url: "",
							isScanned: true,
							scanResult: "clean",
							downloadCount: 0,
							uploadedDate: "Dec 10",
							thumbnailUrl: "",
							isInline: false,
						},
					],
					attachmentCount: 2,
					priority: "normal",
					isStarred: false,
					threadId: "22",
					inReplyTo: "",
					references: [],
					snippet: "Here are the materials from the conference you attended.",
					size: 0,
					flags: [],
					senderName: "Conference",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["conference@event.com", "you@example.com"],
			participantNames: ["Conference", "You"],
			lastEmailDate: "Dec 10",
			firstEmailDate: "Dec 10",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: true,
			totalAttachmentCount: 2,
			labels: ["Work", "Conference"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "updates",
			snippet: "Here are the materials from the conference you attended.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: false,
			isArchive: true,
		},
		// Spam
		{
			id: "23",
			subject: "Congratulations! You've won!",
			emails: [
				{
					id: 25,
					from: "lottery@scam.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 16",
					subject: "Congratulations! You've won!",
					content: "You have won $1,000,000! Click here to claim your prize.",
					htmlContent: "",
					plainTextContent:
						"You have won $1,000,000! Click here to claim your prize.",
					isCollapsed: true,
					isRead: false,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: true,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "23",
					inReplyTo: "",
					references: [],
					snippet: "You have won $1,000,000! Click here to claim your prize.",
					size: 0,
					flags: [],
					senderName: "Lottery Scam",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["lottery@scam.com", "you@example.com"],
			participantNames: ["Lottery Scam", "You"],
			lastEmailDate: "Mar 16",
			firstEmailDate: "Mar 16",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Spam"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "You have won $1,000,000! Click here to claim your prize.",
			isCollapsed: true,
			isDraft: false,
			isSpam: true,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "24",
			subject: "Get rich quick scheme",
			emails: [
				{
					id: 26,
					from: "money@fake.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 15",
					subject: "Get rich quick scheme",
					content: "Make money fast with this amazing opportunity!",
					htmlContent: "",
					plainTextContent: "Make money fast with this amazing opportunity!",
					isCollapsed: true,
					isRead: false,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: true,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "24",
					inReplyTo: "",
					references: [],
					snippet: "Make money fast with this amazing opportunity!",
					size: 0,
					flags: [],
					senderName: "Fake Money",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["money@fake.com", "you@example.com"],
			participantNames: ["Fake Money", "You"],
			lastEmailDate: "Mar 15",
			firstEmailDate: "Mar 15",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Spam"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "Make money fast with this amazing opportunity!",
			isCollapsed: true,
			isDraft: false,
			isSpam: true,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "25",
			subject: "Cheap medications",
			emails: [
				{
					id: 27,
					from: "pharmacy@spam.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 14",
					subject: "Cheap medications",
					content: "Get prescription medications at 90% off!",
					htmlContent: "",
					plainTextContent: "Get prescription medications at 90% off!",
					isCollapsed: true,
					isRead: false,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: true,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "25",
					inReplyTo: "",
					references: [],
					snippet: "Get prescription medications at 90% off!",
					size: 0,
					flags: [],
					senderName: "Spam Pharmacy",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["pharmacy@spam.com", "you@example.com"],
			participantNames: ["Spam Pharmacy", "You"],
			lastEmailDate: "Mar 14",
			firstEmailDate: "Mar 14",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Spam"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "Get prescription medications at 90% off!",
			isCollapsed: true,
			isDraft: false,
			isSpam: true,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "26",
			subject: "Free trial offer",
			emails: [
				{
					id: 28,
					from: "trial@marketing.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 13",
					subject: "Free trial offer",
					content: "Start your free trial today with no commitment!",
					htmlContent: "",
					plainTextContent: "Start your free trial today with no commitment!",
					isCollapsed: true,
					isRead: true,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: true,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "26",
					inReplyTo: "",
					references: [],
					snippet: "Start your free trial today with no commitment!",
					size: 0,
					flags: [],
					senderName: "Marketing Trial",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["trial@marketing.com", "you@example.com"],
			participantNames: ["Marketing Trial", "You"],
			lastEmailDate: "Mar 13",
			firstEmailDate: "Mar 13",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Spam"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "Start your free trial today with no commitment!",
			isCollapsed: true,
			isDraft: false,
			isSpam: true,
			isTrash: false,
			isArchive: false,
		},
		{
			id: "27",
			subject: "Act now! Limited time offer",
			emails: [
				{
					id: 29,
					from: "deals@spam.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Mar 12",
					subject: "Act now! Limited time offer",
					content: "This offer expires in 24 hours! Don't miss out!",
					htmlContent: "",
					plainTextContent: "This offer expires in 24 hours! Don't miss out!",
					isCollapsed: true,
					isRead: false,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: true,
					isTrash: false,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "27",
					inReplyTo: "",
					references: [],
					snippet: "This offer expires in 24 hours! Don't miss out!",
					size: 0,
					flags: [],
					senderName: "Spam Deals",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["deals@spam.com", "you@example.com"],
			participantNames: ["Spam Deals", "You"],
			lastEmailDate: "Mar 12",
			firstEmailDate: "Mar 12",
			messageCount: 1,
			unreadCount: 1,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Spam"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "This offer expires in 24 hours! Don't miss out!",
			isCollapsed: true,
			isDraft: false,
			isSpam: true,
			isTrash: false,
			isArchive: false,
		},
		// Bin/Trash
		{
			id: "28",
			subject: "Old newsletter",
			emails: [
				{
					id: 30,
					from: "newsletter@old.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Feb 10",
					subject: "Old newsletter",
					content: "February edition of our newsletter.",
					htmlContent: "",
					plainTextContent: "February edition of our newsletter.",
					isCollapsed: true,
					isRead: true,
					category: "promotions",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: true,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "28",
					inReplyTo: "",
					references: [],
					snippet: "February edition of our newsletter.",
					size: 0,
					flags: [],
					senderName: "Old Newsletter",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "https://old.com/unsubscribe",
				},
			],
			participants: ["newsletter@old.com", "you@example.com"],
			participantNames: ["Old Newsletter", "You"],
			lastEmailDate: "Feb 10",
			firstEmailDate: "Feb 10",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Newsletter"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "promotions",
			snippet: "February edition of our newsletter.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: true,
			isArchive: false,
		},
		{
			id: "29",
			subject: "Meeting cancellation",
			emails: [
				{
					id: 31,
					from: "colleague@company.com",
					to: "you@example.com",
					cc: [],
					bcc: [],
					replyTo: "",
					date: "Feb 5",
					subject: "Meeting cancellation",
					content: "The meeting scheduled for tomorrow has been cancelled.",
					htmlContent: "",
					plainTextContent:
						"The meeting scheduled for tomorrow has been cancelled.",
					isCollapsed: true,
					isRead: true,
					category: "work",
					isDraft: false,
					isFavorite: false,
					isSpam: false,
					isTrash: true,
					isArchive: false,
					labels: [],
					hasAttachments: false,
					attachments: [],
					attachmentCount: 0,
					priority: "normal",
					isStarred: false,
					threadId: "29",
					inReplyTo: "",
					references: [],
					snippet: "The meeting scheduled for tomorrow has been cancelled.",
					size: 0,
					flags: [],
					senderName: "Colleague",
					recipientNames: ["You"],
					isImportant: false,
					hasInlineImages: false,
					unsubscribeLink: "",
				},
			],
			participants: ["colleague@company.com", "you@example.com"],
			participantNames: ["Colleague", "You"],
			lastEmailDate: "Feb 5",
			firstEmailDate: "Feb 5",
			messageCount: 1,
			unreadCount: 0,
			hasAttachments: false,
			totalAttachmentCount: 0,
			labels: ["Meeting"],
			isStarred: false,
			isFavorite: false,
			isImportant: false,
			category: "primary",
			snippet: "The meeting scheduled for tomorrow has been cancelled.",
			isCollapsed: true,
			isDraft: false,
			isSpam: false,
			isTrash: true,
			isArchive: false,
		},
	]);

	const [showThreadCompose, setShowThreadCompose] = useState<string | null>(
		null
	);
	const [composeAction, setComposeAction] = useState<
		"reply" | "replyAll" | "forward" | null
	>(null);
	const [selectedThread, setSelectedThread] = useState<string | null>(null);

	const DEFAULT_THREAD_ID = "0";

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

		if (savedTheme) {
			setTheme(savedTheme);
		} else {
			if (typeof window !== "undefined") {
				const systemPrefersDark = window.matchMedia(
					"(prefers-color-scheme: dark)"
				).matches;
				if (systemPrefersDark) {
					setTheme("dark");
				}
			}
		}
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	const toggleCore = () => {
		setIsCoreOpen(!isCoreOpen);
	};

	const toggleManagement = () => {
		setIsManagementOpen(!isManagementOpen);
	};

	const toggleLabels = () => {
		setIsLabelsOpen(!isLabelsOpen);
	};

	const toggleFilters = () => {
		setIsFiltersOpen(!isFiltersOpen);
	};

	const toggleMore = () => {
		setIsMoreOpen(!isMoreOpen);
	};

	const handleViewChange = (view: string) => {
		const mainViews = [
			"inbox",
			"favorites",
			"drafts",
			"sent",
			"archive",
			"spam",
			"bin",
		];
		if (mainViews.includes(view)) {
			setActiveMainView(view);
		} else {
			setActiveSecondaryView(view);
		}
	};

	const toggleSelectMode = () => {
		if (isSelectMode) {
			setSelectedThreads(new Set());
		}
		setIsSelectMode(!isSelectMode);
		setIsMoreActionsOpen(false);
	};

	const toggleSelectAll = () => {
		const currentlyFilteredThreads = filterThreads(emailThreads);

		if (
			selectedThreads.size === currentlyFilteredThreads.length &&
			currentlyFilteredThreads.length > 0
		) {
			setSelectedThreads(new Set());
		} else {
			setSelectedThreads(new Set(currentlyFilteredThreads.map((t) => t.id)));
		}
	};

	const toggleEmailSelection = (id: string) => {
		const newSelected = new Set(selectedThreads);
		if (newSelected.has(id)) {
			newSelected.delete(id);
		} else {
			newSelected.add(id);
		}
		setSelectedThreads(newSelected);
	};

	const toggleMoreActions = () => {
		setIsMoreActionsOpen(!isMoreActionsOpen);
	};

	const toggleThreadExpansion = (threadId: string) => {
		const newExpanded = new Set(expandedThreads);
		if (newExpanded.has(threadId)) {
			newExpanded.delete(threadId);
		} else {
			newExpanded.add(threadId);
		}
		setExpandedThreads(newExpanded);
	};

	const openThreadCompose = (threadId: string) => {
		setShowThreadCompose(threadId);
	};

	const closeThreadCompose = () => {
		setShowThreadCompose(null);
	};

	const handleSelectThread = (threadId: string) => {
		setSelectedThread(threadId);

		setEmailThreads((prev) =>
			prev.map((thread) => {
				if (thread.id === threadId) {
					return {
						...thread,
						emails: thread.emails.map((email) => ({
							...email,
							isRead: true,
						})),
						unreadCount: 0,
					};
				}
				return thread;
			})
		);
	};

	const handleReply = (threadId: string) => {
		setComposeAction("reply");

		if (!expandedThreads.has(threadId)) {
			toggleThreadExpansion(threadId);
		}
		openThreadCompose(threadId);
	};

	const handleReplyAll = (threadId: string) => {
		setComposeAction("replyAll");

		if (!expandedThreads.has(threadId)) {
			toggleThreadExpansion(threadId);
		}
		openThreadCompose(threadId);
	};

	const handleForward = (threadId: string) => {
		setComposeAction("forward");

		if (!expandedThreads.has(threadId)) {
			toggleThreadExpansion(threadId);
		}
		openThreadCompose(threadId);
	};

	const handleMarkAsSpam = (threadId: string) => {
		console.log(`Marking thread ${threadId} as spam`);
	};

	const handleFavorite = (threadId: string) => {
		console.log(`Favoriting thread ${threadId}`);
	};

	const handleMoveToBin = (threadId: string) => {
		console.log(`Moving thread ${threadId} to bin`);
	};

	const handleThreadAction = (threadId: string, action: string) => {
		switch (action) {
			case "spam":
				handleMarkAsSpam(threadId);
				break;
			case "favorite":
				handleFavorite(threadId);
				break;
			case "bin":
				handleMoveToBin(threadId);
				break;
			default:
				console.log(`Unknown action: ${action}`);
		}
	};

	const selectedThreadData =
		selectedThread !== null
			? emailThreads.find((t) => t.id === selectedThread)
			: undefined;

	

	const filterThreads = (threads: EmailThread[]) => {
		return threads.filter((thread) => {
			let passesMainFilter = false;
			switch (activeMainView) {
				case "inbox":
					passesMainFilter =
						!thread.isTrash && !thread.isSpam && !thread.isArchive;
					break;
				case "favorites":
					passesMainFilter = thread.isFavorite;
					break;
				case "drafts":
					passesMainFilter = thread.isDraft;
					break;
				case "sent":
					// Sent emails are those that have the 'sent' flag
					passesMainFilter =
						thread.emails.some((email) => email.flags.includes("sent")) &&
						!thread.isDraft;
					break;
				case "archive":
					passesMainFilter = thread.isArchive;
					break;
				case "spam":
					passesMainFilter = thread.isSpam;
					break;
				case "bin":
					passesMainFilter = thread.isTrash;
					break;
				default:
					passesMainFilter = true;
			}

			// If it doesn't pass the main filter, don't show it
			if (!passesMainFilter) return false;

			// Only apply secondary view filter (category) when in inbox
			if (activeMainView === "inbox") {
				switch (activeSecondaryView) {
					case "primary":
						return thread.category === "primary";
					case "social":
						return thread.category === "social";
					case "updates":
						return thread.category === "updates";
					case "promotions":
						return thread.category === "promotions";
					default:
						return true;
				}
			}

			// If not in inbox, show all threads that pass the main filter
			return true;
		});
	};

	const filteredThreads = filterThreads(emailThreads);

	return (
		<div className="h-full w-full bg-background text-foreground">
			{/* New Email Dialog */}
			<NewEmailDialog
				isOpen={showNewEmailDialog}
				onClose={setShowNewEmailDialog}
			/>

			{/* Filters Dialog */}
			<FiltersDialog
				isOpen={showFiltersDialog}
				onClose={setShowFiltersDialog}
			/>

			<TitleBar
				theme={theme}
				isSettingsOpen={isSettingsOpen}
				showNewEmailDialog={showNewEmailDialog}
				showFiltersDialog={showFiltersDialog}
				setIsSettingsOpen={setIsSettingsOpen}
				setShowNewEmailDialog={setShowNewEmailDialog}
				setShowFiltersDialog={setShowFiltersDialog}
				toggleTheme={toggleTheme}
			/>
			<div className="h-full w-full grid grid-cols-1 md:grid-cols-[260px_1fr] xl:grid-cols-[260px_420px_1fr]">
				<LeftAsideBar
					activeMainView={activeMainView}
					activeSecondaryView={activeSecondaryView}
					showNewEmailDialog={showNewEmailDialog}
					setShowNewEmailDialog={setShowNewEmailDialog}
					handleViewChange={handleViewChange}
				/>
				<ViewChangerPanel
					activeMainView={activeMainView}
					activeSecondaryView={activeSecondaryView}
					handleViewChange={handleViewChange}
					filteredThreads={filteredThreads}
					isSelectMode={isSelectMode}
					selectedThreads={selectedThreads}
					toggleSelectMode={toggleSelectMode}
					toggleSelectAll={toggleSelectAll}
					toggleEmailSelection={toggleEmailSelection}
					selectedThread={selectedThread}
					handleSelectThread={handleSelectThread}
					setSelectedThread={setSelectedThread}
					toggleMoreActions={toggleMoreActions}
					isMoreActionsOpen={isMoreActionsOpen}
				/>
				<main className="col-span-1 p-3 overflow-y-auto">
					<div className="h-full w-full flex flex-col gap-3 p-4">
						{/* Email thread display */}
						<EmailThreadComponent
							threadId={selectedThread || DEFAULT_THREAD_ID}
							emails={selectedThreadData ? selectedThreadData.emails : []}
							isExpanded={
								selectedThread !== null && expandedThreads.has(selectedThread)
									? expandedThreads.has(selectedThread)
									: false
							}
							onToggleExpand={toggleThreadExpansion}
							onReply={handleReply}
							onReplyAll={handleReplyAll}
							onForward={handleForward}
							onThreadAction={handleThreadAction}
							showCompose={
								selectedThread !== null && showThreadCompose === selectedThread
									? showThreadCompose === selectedThread
									: false
							}
							onCloseCompose={closeThreadCompose}
							composeAction={composeAction}
						/>
					</div>
				</main>
			</div>
		</div>
	);
}
