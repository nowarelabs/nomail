"use client";

import { useState, useEffect, useRef } from "react";
import type { EmailThread, Email } from "../types/emails";
import { EmailThread as EmailThreadComponent } from "../components/email-thread";
import { EmailThreadsListItem } from "../components/email-threads-list-item";

export default function Home() {
  const [showNewEmailDialog, setShowNewEmailDialog] = useState(false);
  const [showFiltersDialog, setShowFiltersDialog] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isCoreOpen, setIsCoreOpen] = useState(true);
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [activeView, setActiveView] = useState('primary');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState<Set<string>>(new Set());
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>([
    {
      id: '1',
      subject: 'New design review',
      emails: [
        {
          id: 1,
          from: 'ali@baked.com',
          to: 'you@example.com',
          cc: [],
          bcc: [],
          replyTo: '',
          date: 'Mar 29',
          subject: 'New design review',
          content: 'Team discussed command center improvements and category system. General positive feedback, with suggestions for quick actions placement.',
          htmlContent: '',
          plainTextContent: 'Team discussed command center improvements and category system. General positive feedback, with suggestions for quick actions placement.',
          isCollapsed: true,
          isRead: false,
          category: 'work',
          isDraft: false,
          isFavorite: false,
          isSpam: false,
          isTrash: false,
          isArchive: false,
          labels: [],
          hasAttachments: true,
          attachments: [
            {
              id: '1',
              name: 'design-mockup.png',
              extension: '.png',
              size: 2411724,
              sizeFormatted: '2.3 MB',
              type: 'image/png',
              mimeType: 'image/png',
              url: '',
              isScanned: true,
              scanResult: 'clean',
              downloadCount: 0,
              uploadedDate: 'Mar 29',
              thumbnailUrl: '',
              isInline: false
            },
            {
              id: '2',
              name: 'requirements.pdf',
              extension: '.pdf',
              size: 1048576,
              sizeFormatted: '1.0 MB',
              type: 'application/pdf',
              mimeType: 'application/pdf',
              url: '',
              isScanned: true,
              scanResult: 'clean',
              downloadCount: 2,
              uploadedDate: 'Mar 29',
              thumbnailUrl: '',
              isInline: false
            },
            {
              id: '3',
              name: 'comments.docx',
              extension: '.docx',
              size: 2097152,
              sizeFormatted: '2.0 MB',
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              url: '',
              isScanned: true,
              scanResult: 'clean',
              downloadCount: 2,
              uploadedDate: 'Mar 29',
              thumbnailUrl: '',
              isInline: false
            }
          ],
          attachmentCount: 3,
          priority: 'normal',
          isStarred: false,
          threadId: '1',
          inReplyTo: '',
          references: [],
          snippet: 'Team discussed command center improvements...',
          size: 0,
          flags: [],
          senderName: 'Ali from Baked',
          recipientNames: ['You'],
          isImportant: false,
          hasInlineImages: false,
          unsubscribeLink: ''
        },
        {
          id: 2,
          from: 'you@example.com',
          to: 'ali@baked.com',
          cc: [],
          bcc: [],
          replyTo: '',
          date: 'Mar 28',
          subject: 'Re: New design review',
          content: 'Thanks for the feedback. I\'ll work on implementing the suggestions.',
          htmlContent: '',
          plainTextContent: 'Thanks for the feedback. I\'ll work on implementing the suggestions.',
          isCollapsed: true,
          isRead: true,
          category: 'work',
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
          threadId: '1',
          inReplyTo: '1',
          references: ['1'],
          snippet: 'Thanks for the feedback...',
          size: 0,
          flags: ['replied'],
          senderName: 'You',
          recipientNames: ['Ali from Baked'],
          isImportant: false,
          hasInlineImages: false,
          unsubscribeLink: ''
        },
        {
          id: 3,
          from: 'ali@baked.com',
          to: 'you@example.com',
          cc: [],
          bcc: [],
          replyTo: '',
          date: 'Mar 27',
          subject: 'Re: New design review',
          content: 'Looking forward to seeing the updated designs.',
          htmlContent: '',
          plainTextContent: 'Looking forward to seeing the updated designs.',
          isCollapsed: true,
          isRead: false,
          category: 'work',
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
          threadId: '1',
          inReplyTo: '2',
          references: ['1', '2'],
          snippet: 'Looking forward to seeing...',
          size: 0,
          flags: [],
          senderName: 'Ali from Baked',
          recipientNames: ['You'],
          isImportant: false,
          hasInlineImages: false,
          unsubscribeLink: ''
        }
      ],
      participants: ['ali@baked.com', 'you@example.com'],
      participantNames: ['Ali from Baked', 'You'],
      lastEmailDate: 'Mar 29',
      firstEmailDate: 'Mar 27',
      messageCount: 3,
      unreadCount: 2,
      hasAttachments: true,
      totalAttachmentCount: 4,
      labels: ['Work'],
      isStarred: false,
      isFavorite: false,
      isImportant: false,
      category: 'primary',
      snippet: 'Team discussed command center improvements...',
      isCollapsed: true,
      isDraft: false,
      isSpam: false,
      isTrash: false,
      isArchive: false
    },
    {
      id: '2',
      subject: 'Re: Design review feedback',
      emails: [
        {
          id: 4,
          from: 'alex@example.com',
          to: 'you@example.com',
          cc: ['ali@baked.com', 'sarah@example.com'],
          bcc: [],
          replyTo: '',
          date: 'Mar 28',
          subject: 'Re: Design review feedback',
          content: 'Catching up on the email client design with new interactions...',
          htmlContent: '',
          plainTextContent: 'Catching up on the email client design with new interactions...',
          isCollapsed: true,
          isRead: true,
          category: 'work',
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
          threadId: '2',
          inReplyTo: '',
          references: [],
          snippet: 'Catching up on the email client design...',
          size: 0,
          flags: [],
          senderName: 'Alex',
          recipientNames: ['You', 'Ali', 'Sarah'],
          isImportant: false,
          hasInlineImages: false,
          unsubscribeLink: ''
        }
      ],
      participants: ['alex@example.com', 'you@example.com', 'ali@baked.com', 'sarah@example.com'],
      participantNames: ['Alex', 'You', 'Ali', 'Sarah'],
      lastEmailDate: 'Mar 28',
      firstEmailDate: 'Mar 28',
      messageCount: 1,
      unreadCount: 0,
      hasAttachments: false,
      totalAttachmentCount: 0,
      labels: ['Work'],
      isStarred: false,
      isFavorite: false,
      isImportant: false,
      category: 'updates',
      snippet: 'Catching up on the email client design...',
      isCollapsed: true,
      isDraft: false,
      isSpam: false,
      isTrash: false,
      isArchive: false
    },
    {
      id: '3',
      subject: 'Security alert: Critical vulnerability',
      emails: [
        {
          id: 5,
          from: 'noreply@github.com',
          to: 'you@example.com',
          cc: [],
          bcc: [],
          replyTo: '',
          date: 'Mar 28',
          subject: 'Security alert: Critical vulnerability',
          content: 'A high severity vulnerability was detected in one of your dependencies.',
          htmlContent: '',
          plainTextContent: 'A high severity vulnerability was detected in one of your dependencies.',
          isCollapsed: true,
          isRead: false,
          category: 'notifications',
          isDraft: false,
          isFavorite: false,
          isSpam: false,
          isTrash: false,
          isArchive: false,
          labels: ['security'],
          hasAttachments: false,
          attachments: [],
          attachmentCount: 0,
          priority: 'high',
          isStarred: false,
          threadId: '3',
          inReplyTo: '',
          references: [],
          snippet: 'A high severity vulnerability was detected...',
          size: 0,
          flags: [],
          senderName: 'GitHub',
          recipientNames: ['You'],
          isImportant: true,
          hasInlineImages: false,
          unsubscribeLink: ''
        }
      ],
      participants: ['noreply@github.com', 'you@example.com'],
      participantNames: ['GitHub', 'You'],
      lastEmailDate: 'Mar 28',
      firstEmailDate: 'Mar 28',
      messageCount: 1,
      unreadCount: 1,
      hasAttachments: false,
      totalAttachmentCount: 0,
      labels: ['Security'],
      isStarred: false,
      isFavorite: false,
      isImportant: true,
      category: 'updates',
      snippet: 'A high severity vulnerability was detected...',
      isCollapsed: true,
      isDraft: false,
      isSpam: false,
      isTrash: false,
      isArchive: false
    },
    {
      id: '4',
      subject: 'Payment confirmation #1234',
      emails: [
        {
          id: 6,
          from: 'receipts@stripe.com',
          to: 'you@example.com',
          cc: [],
          bcc: [],
          replyTo: '',
          date: 'Mar 29',
          subject: 'Payment confirmation #1234',
          content: 'Your recent payment has been successfully processed.',
          htmlContent: '',
          plainTextContent: 'Your recent payment has been successfully processed.',
          isCollapsed: true,
          isRead: true,
          category: 'receipts',
          isDraft: false,
          isFavorite: false,
          isSpam: false,
          isTrash: false,
          isArchive: false,
          labels: ['payment'],
          hasAttachments: false,
          attachments: [],
          attachmentCount: 0,
          priority: 'normal',
          isStarred: false,
          threadId: '4',
          inReplyTo: '',
          references: [],
          snippet: 'Your recent payment has been successfully processed.',
          size: 0,
          flags: [],
          senderName: 'Stripe',
          recipientNames: ['You'],
          isImportant: false,
          hasInlineImages: false,
          unsubscribeLink: ''
        }
      ],
      participants: ['receipts@stripe.com', 'you@example.com'],
      participantNames: ['Stripe', 'You'],
      lastEmailDate: 'Mar 29',
      firstEmailDate: 'Mar 29',
      messageCount: 1,
      unreadCount: 0,
      hasAttachments: false,
      totalAttachmentCount: 0,
      labels: ['Payment'],
      isStarred: false,
      isFavorite: false,
      isImportant: false,
      category: 'social',
      snippet: 'Your recent payment has been successfully processed.',
      isCollapsed: true,
      isDraft: false,
      isSpam: false,
      isTrash: false,
      isArchive: false
    },
    {
      id: '5',
      subject: 'New shows added to your list',
      emails: [
        {
          id: 7,
          from: 'info@netflix.com',
          to: 'you@example.com',
          cc: [],
          bcc: [],
          replyTo: '',
          date: 'Mar 29',
          subject: 'New shows added to your list',
          content: 'We added new shows we think you will love.',
          htmlContent: '',
          plainTextContent: 'We added new shows we think you will love.',
          isCollapsed: true,
          isRead: false,
          category: 'promotions',
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
          threadId: '5',
          inReplyTo: '',
          references: [],
          snippet: 'We added new shows we think you will love.',
          size: 0,
          flags: [],
          senderName: 'Netflix',
          recipientNames: ['You'],
          isImportant: false,
          hasInlineImages: false,
          unsubscribeLink: 'https://netflix.com/unsubscribe'
        }
      ],
      participants: ['info@netflix.com', 'you@example.com'],
      participantNames: ['Netflix', 'You'],
      lastEmailDate: 'Mar 29',
      firstEmailDate: 'Mar 29',
      messageCount: 1,
      unreadCount: 1,
      hasAttachments: false,
      totalAttachmentCount: 0,
      labels: ['Important'],
      isStarred: false,
      isFavorite: false,
      isImportant: false,
      category: 'promotions',
      snippet: 'We added new shows we think you will love.',
      isCollapsed: true,
      isDraft: false,
      isSpam: false,
      isTrash: false,
      isArchive: false
    }
  ]);
  
  const [showThreadCompose, setShowThreadCompose] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const moreActionsButtonRef = useRef<HTMLButtonElement>(null);
  const moreActionsDropdownRef = useRef<HTMLDivElement>(null);

  const DEFAULT_THREAD_ID = '0';

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleCore = () => {
    setIsCoreOpen(!isCoreOpen);
  };

  const toggleManagement = () => {
    setIsManagementOpen(!isManagementOpen);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const toggleSelectMode = () => {
    if (isSelectMode) {
      setSelectedThreads(new Set());
    }
    setIsSelectMode(!isSelectMode);
    setIsMoreActionsOpen(false);
  };

  const toggleSelectAll = () => {
    if (selectedThreads.size === emailThreads.length) {
      setSelectedThreads(new Set());
    } else {
      setSelectedThreads(new Set(emailThreads.map(t => t.id)));
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
    
    setEmailThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          emails: thread.emails.map(email => ({
            ...email,
            isRead: true
          })),
          unreadCount: 0
        };
      }
      return thread;
    }));
  };

  const handleReply = (threadId: string) => {
    openThreadCompose(threadId);
  };

  const handleReplyAll = (threadId: string) => {
    openThreadCompose(threadId);
  };

  const handleForward = (threadId: string) => {
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
      case 'spam':
        handleMarkAsSpam(threadId);
        break;
      case 'favorite':
        handleFavorite(threadId);
        break;
      case 'bin':
        handleMoveToBin(threadId);
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  // Get the selected thread object
  const selectedThreadData = selectedThread !== null 
    ? emailThreads.find(t => t.id === selectedThread) 
    : undefined;

  // Close more actions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreActionsButtonRef.current && 
        !moreActionsButtonRef.current.contains(event.target as Node) &&
        moreActionsDropdownRef.current && 
        !moreActionsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full w-full bg-background text-foreground">
      {/* New Email Dialog */}
      {showNewEmailDialog && (
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
                  onClick={() => setShowNewEmailDialog(false)}
                >
                  Close
                </button>
              </div>
            </header>
            <form className="p-3 space-y-2">
              <div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
                <label htmlFor="to" className="text-xs text-muted-foreground">To</label>
                <input 
                  id="to" 
                  required 
                  placeholder="Recipient" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                  name="to" 
                />
                <label htmlFor="from" className="text-xs text-muted-foreground">From</label>
                <input 
                  id="from" 
                  placeholder="you@domain.com" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                  name="from" 
                />
                <label htmlFor="cc" className="text-xs text-muted-foreground">Cc</label>
                <input 
                  id="cc" 
                  placeholder="Add Cc" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                  name="cc" 
                />
                <label htmlFor="bcc" className="text-xs text-muted-foreground">Bcc</label>
                <input 
                  id="bcc" 
                  placeholder="Add Bcc" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                  name="bcc" 
                />
                <label htmlFor="replyto" className="text-xs text-muted-foreground">Reply‑To</label>
                <input 
                  id="replyto" 
                  placeholder="Reply-to address" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                  name="replyto" 
                />
                <label htmlFor="subject" className="text-xs text-muted-foreground">Subject</label>
                <input 
                  id="subject" 
                  placeholder="Subject" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                  name="subject" 
                />
              </div>
              <div>
                <label htmlFor="content" className="sr-only">Message</label>
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
      )}

      {/* Filters Dialog */}
      {showFiltersDialog && (
        <section 
          role="dialog" 
          aria-modal="true" 
          aria-label="Advanced filters" 
          className="fixed top-4 right-4 w-[min(100vw-1rem,28rem)] z-50"
          style={{ opacity: 1, transform: 'none' }}
        >
          <div className="rounded-xl border bg-card shadow-xl overflow-hidden">
            <header className="flex items-center justify-between border-b px-3 py-2">
              <h2 className="text-sm font-medium">Advanced filters</h2>
              <div className="flex items-center gap-2">
                <button 
                  className="rounded-md border px-2 py-1 text-xs hover:bg-accent"
                  onClick={() => setShowFiltersDialog(false)}
                >
                  Close
                </button>
              </div>
            </header>
            <form className="p-3 space-y-3">
              <div className="grid grid-cols-[6rem_1fr] items-center gap-2">
                <label htmlFor="q" className="text-xs text-muted-foreground">Query</label>
                <input 
                  id="q" 
                  placeholder="free text" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                />
                <label htmlFor="from" className="text-xs text-muted-foreground">From</label>
                <input 
                  id="from" 
                  placeholder="name or email" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                />
                <label htmlFor="to" className="text-xs text-muted-foreground">To</label>
                <input 
                  id="to" 
                  placeholder="recipient" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm" 
                />
                <label className="text-xs text-muted-foreground">Attachment</label>
                <div className="flex items-center gap-2">
                  <input 
                    id="hasAtt" 
                    className="size-4" 
                    type="checkbox" 
                  />
                  <label htmlFor="hasAtt" className="text-xs">Has attachment</label>
                </div>
                <label htmlFor="label" className="text-xs text-muted-foreground">Label</label>
                <select 
                  id="label" 
                  className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
                >
                  <option value="any">Any</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="updates">Updates</option>
                  <option value="alerts">Alerts</option>
                </select>
                <label className="text-xs text-muted-foreground">Starred</label>
                <div className="flex items-center gap-2">
                  <input 
                    id="isStar" 
                    className="size-4" 
                    type="checkbox" 
                  />
                  <label htmlFor="isStar" className="text-xs">Only starred</label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  className="rounded-md border px-3 py-1.5 text-xs hover:bg-accent"
                  onClick={() => setShowFiltersDialog(false)}
                >
                  Reset
                </button>
                <button 
                  type="submit" 
                  className="rounded-md border px-3 py-1.5 text-xs bg-primary text-primary-foreground"
                  onClick={() => setShowFiltersDialog(false)}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      <div className="flex items-center gap-2 px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <div className="text-xl font-bold">nomail</div>
        </div>
        <div className="h-6 border-r border-muted"></div>
        <div className="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-search size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true">
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
          <input aria-label="Search mail"
            placeholder="Search: words, from:alice, to:bob, label:work, has:attachment, is:starred"
            className="w-full rounded-lg bg-input/50 border px-9 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <button 
          aria-label="Open advanced filters"
          className="rounded-lg border px-3 py-2 hover:bg-accent flex items-center gap-2"
          onClick={() => setShowFiltersDialog(true)}
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
            className="lucide lucide-filter size-4"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span>Filters</span>
        </button>
        <button 
          aria-label="Toggle theme" 
          className="rounded-lg border p-2 hover:bg-accent"
          onClick={toggleTheme}
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
            className="lucide lucide-moon size-4" 
            aria-hidden="true"
          >
            {theme === 'light' ? (
              // Moon icon for light mode
              <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
            ) : (
              // Sun icon for dark mode
              <>
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </>
            )}
          </svg>
        </button>
        <button
          className="rounded-lg border px-3 py-2 bg-primary text-primary-foreground hover:opacity-90"
          onClick={() => setShowNewEmailDialog(true)}
        >
          <div className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" className="lucide lucide-plus size-4" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg><span className="hidden md:inline">New email</span></div>
        </button>
      </div>
      <div className="h-full w-full grid grid-cols-1 md:grid-cols-[260px_1fr] xl:grid-cols-[260px_420px_1fr]">
        <aside className="hidden md:flex flex-col gap-3 border-r p-3 bg-sidebar">
          <div className="px-2">
            <div className="text-sm text-muted-foreground">Baked Design</div>
            <div className="text-xs text-muted-foreground">work@baked.design</div>
          </div><button
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-primary text-primary-foreground hover:opacity-90"
            onClick={() => setShowNewEmailDialog(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-plus size-4" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>New email</button>
          <div>
            <button
              className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={toggleCore}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`lucide lucide-chevron-${isCoreOpen ? 'down' : 'right'} size-4`} aria-hidden="true">
                <path d={`m${isCoreOpen ? '6 9 6 6 6-6' : '9 18 6-6-6-6'}`}></path>
              </svg>
              <span className="font-medium">Core</span>
            </button>
            {isCoreOpen && (
              <div className="overflow-hidden" style={{ height: 'auto', opacity: 1 }}>
                <div className="py-1">
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-inbox size-4" aria-hidden="true">
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                        <path
                          d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z">
                        </path>
                      </svg>
                      Inbox
                    </span>
                    <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">281</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-star size-4" aria-hidden="true">
                        <path
                          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                        </path>
                      </svg>
                      Favorites
                    </span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-pen-line size-4" aria-hidden="true">
                        <path d="M13 21h8"></path>
                        <path
                          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z">
                        </path>
                      </svg>
                      Drafts
                    </span>
                    <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">13</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-send size-4" aria-hidden="true">
                        <path
                          d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z">
                        </path>
                        <path d="m21.854 2.147-10.94 10.939"></path>
                      </svg>
                      Sent
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={toggleManagement}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`lucide lucide-chevron-${isManagementOpen ? 'down' : 'right'} size-4`} aria-hidden="true">
                <path d={`m${isManagementOpen ? '6 9 6 6 6-6' : '9 18 6-6-6-6'}`}></path>
              </svg>
              <span className="font-medium">Management</span>
            </button>
            {isManagementOpen && (
              <div className="overflow-hidden" style={{ height: 'auto', opacity: 1 }}>
                <div className="py-1">
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-archive size-4" aria-hidden="true">
                        <rect width="20" height="5" x="2" y="3" rx="1"></rect>
                        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
                        <path d="M10 12h4"></path>
                      </svg>
                      Archive
                    </span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-shield-alert size-4" aria-hidden="true">
                        <path
                          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                        </path>
                        <path d="M12 8v4"></path>
                        <path d="M12 16h.01"></path>
                      </svg>
                      Spam
                    </span>
                    <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">24</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm bg-sidebar-primary text-sidebar-primary-foreground">
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2 size-4" aria-hidden="true">
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      Bin
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-auto">
            <div>
              <button
                className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-chevron-right size-4" aria-hidden="true">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </aside>
        <section className="border-r p-3 overflow-y-auto hidden xl:flex xl:flex-col xl:min-w-0">
          <div className="flex items-center justify-between px-1 pb-2">
            <div className="text-sm font-medium">Inbox</div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              {isSelectMode ? (
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <button 
                    className="rounded-md border px-2 py-1 hover:bg-accent flex items-center gap-1"
                    onClick={toggleSelectAll}
                    aria-pressed={selectedThreads.size === 5}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square size-4">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span>Select all</span>
                  </button>
                  <button 
                    className="rounded-md border px-2 py-1 hover:bg-accent flex items-center gap-1"
                    onClick={toggleSelectMode}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x size-4">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Done</span>
                  </button>
                </div>
              ) : (
                <button 
                  className="rounded-md border px-2 py-1 hover:bg-accent flex items-center gap-1"
                  onClick={toggleSelectMode}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square size-4">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                  <span>Select</span>
                </button>
              )}
            </div>
          </div>
          <div className="rounded-xl border bg-card/40 p-2 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-2 px-1 pb-2">
              <div className="text-xs text-muted-foreground">Views</div>
              <div className="ms-auto flex items-center gap-1">
                <button
                  className={`rounded-md border px-2 py-1 text-xs ${activeView === 'primary' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  onClick={() => handleViewChange('primary')}
                >
                  Primary
                </button>
                <button
                  className={`rounded-md border px-2 py-1 text-xs ${activeView === 'social' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  onClick={() => handleViewChange('social')}
                >
                  Social
                </button>
                <button
                  className={`rounded-md border px-2 py-1 text-xs ${activeView === 'updates' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  onClick={() => handleViewChange('updates')}
                >
                  Updates
                </button>
                <button
                  className={`rounded-md border px-2 py-1 text-xs ${activeView === 'promotions' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  onClick={() => handleViewChange('promotions')}
                >
                  Promotions
                </button>
              </div>
            </div>
            {/* Action items bar - shown when in select mode */}
            {isSelectMode && (
              <div className="flex items-center gap-2 px-1 pb-2">
                <div className="text-xs">{selectedThreads.size} selected</div>
                <div className="ms-auto flex items-center gap-1">
                  <button className="rounded-md border px-2 py-1 text-xs hover:bg-accent">
                    <span>Mark read</span>
                  </button>
                  <button className="rounded-md border px-2 py-1 text-xs hover:bg-accent">
                    <span>Mark unread</span>
                  </button>
                  <div className="relative">
                    <button 
                      className="rounded-md border px-2 py-1 text-xs hover:bg-accent flex items-center gap-1"
                      onClick={toggleMoreActions}
                      ref={moreActionsButtonRef}
                    >
                      <span>More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down size-3">
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                    {isMoreActionsOpen && (
                      <div className="absolute right-0 mt-1 w-48 rounded-md border bg-popover p-1 shadow-md z-10" ref={moreActionsDropdownRef}>
                        <button className="w-full text-left px-2 py-1 text-xs hover:bg-accent rounded">
                          <span>Favorite</span>
                        </button>
                        <button className="w-full text-left px-2 py-1 text-xs hover:bg-destructive/10 rounded">
                          <span>Spam</span>
                        </button>
                        <button className="w-full text-left px-2 py-1 text-xs hover:bg-destructive/10 rounded">
                          <span>Trash</span>
                        </button>
                        <div className="border-t my-1"></div>
                        <div className="px-2 py-1">
                          <select aria-label="Move to label" className="w-full rounded-md border px-2 py-1 text-xs bg-input/50">
                            <option value="">Move to…</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="updates">Updates</option>
                            <option value="alerts">Alerts</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1 scrollbar-hidden">
              {emailThreads.map((thread) => (
                <EmailThreadsListItem
                  key={thread.id}
                  thread={thread}
                  isSelected={selectedThreads.has(thread.id)}
                  isSelectMode={isSelectMode}
                  isActive={selectedThread === thread.id}
                  onSelect={toggleEmailSelection}
                  onThreadClick={handleSelectThread}
                  onThreadView={setSelectedThread}
                />
              ))}
            </div>
            <nav className="pt-3 flex items-center justify-between text-xs text-muted-foreground"><span>Page 1 of 1</span>
              <div className="flex items-center gap-2"><button disabled={true}
                  className="rounded-md border px-2 py-1 disabled:opacity-50 hover:bg-accent">Prev</button><button
                  disabled={true} className="rounded-md border px-2 py-1 disabled:opacity-50 hover:bg-accent">Next</button>
              </div>
            </nav>
          </div>
        </section>
        <main className="col-span-1 p-3 overflow-y-auto">
          <div className="h-full w-full flex flex-col gap-3 p-4">
            {/* Email thread display */}
            <EmailThreadComponent 
              threadId={selectedThread || DEFAULT_THREAD_ID}
              emails={selectedThreadData ? selectedThreadData.emails : []}
              isExpanded={selectedThread !== null && expandedThreads.has(selectedThread) ? expandedThreads.has(selectedThread) : false}
              onToggleExpand={toggleThreadExpansion}
              onReply={handleReply}
              onReplyAll={handleReplyAll}
              onForward={handleForward}
              onThreadAction={handleThreadAction}
              showCompose={selectedThread !== null && showThreadCompose === selectedThread ? showThreadCompose === selectedThread : false}
              onCloseCompose={closeThreadCompose}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
