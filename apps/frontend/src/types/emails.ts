export interface Attachment {
	name: string;
	size: number;
	type: string;
	url: string;
	id: string;
	extension: string;
	sizeFormatted: string;
	mimeType: string;
	isScanned: boolean;
	scanResult: "clean" | "infected" | "failed" | "";
	downloadCount: number;
	uploadedDate: string;
	thumbnailUrl: string;
	isInline: boolean;
}

export interface Email {
	id: number;
	from: string;
	to: string;
	cc: string[];
	bcc: string[];
	replyTo: string;
	date: string;
	subject: string;
	content: string;
	htmlContent: string;
	plainTextContent: string;
	isCollapsed: boolean;
	isRead: boolean;
	category: string;
	isDraft: boolean;
	isFavorite: boolean;
	isSpam: boolean;
	isTrash: boolean;
	isArchive: boolean;
	labels: string[];
	hasAttachments: boolean;
	attachments: Attachment[];
	attachmentCount: number;
	priority: "low" | "normal" | "high";
	isStarred: boolean;
	threadId: string;
	inReplyTo: string;
	references: string[];
	snippet: string;
	size: number;
	flags: string[];
	senderName: string;
	recipientNames: string[];
	isImportant: boolean;
	hasInlineImages: boolean;
	unsubscribeLink: string;
}

export interface EmailThread {
	id: string;
	subject: string;
	emails: Email[];
	participants: string[];
	participantNames: string[];
	lastEmailDate: string;
	firstEmailDate: string;
	messageCount: number;
	unreadCount: number;
	hasAttachments: boolean;
	totalAttachmentCount: number;
	labels: string[];
	isStarred: boolean;
	isFavorite: boolean;
	isImportant: boolean;
	category: string;
	snippet: string;
	isCollapsed: boolean;
	isDraft: boolean;
	isSpam: boolean;
	isTrash: boolean;
	isArchive: boolean;
}

export interface PaginationMetadata {
	currentPage: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	nextPage: number | null;
	previousPage: number | null;
}

export interface FilterMetadata {
	categories: string[];
	labels: string[];
	participants: string[];
	dateRange: {
		from: string | null;
		to: string | null;
	};
	hasAttachments: boolean | null;
	isUnread: boolean | null;
	isStarred: boolean | null;
	isFavorite: boolean | null;
	isSpam: boolean | null;
	isImportant: boolean | null;
	priority: ("low" | "normal" | "high")[] | null;
}

export interface SearchMetadata {
	query: string;
	searchFields: ("subject" | "content" | "from" | "to" | "participants")[];
	resultsCount: number;
	searchTime: number;
	hasMoreResults: boolean;
}

export interface SortMetadata {
	sortBy:
		| "date"
		| "subject"
		| "sender"
		| "unreadCount"
		| "messageCount"
		| "importance";
	sortOrder: "asc" | "desc";
}

export interface EmailThreadsResponse {
	data: EmailThread[];
	pagination: PaginationMetadata;
	filters?: FilterMetadata;
	search?: SearchMetadata;
	sort: SortMetadata;
	timestamp: string;
	totalUnreadCount: number;
}
