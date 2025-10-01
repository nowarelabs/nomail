interface Attachment {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
}

interface Email {
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
  priority: 'low' | 'normal' | 'high';
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

interface EmailThread {
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
