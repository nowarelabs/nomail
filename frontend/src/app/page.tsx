"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [showNewEmailDialog, setShowNewEmailDialog] = useState(false);
  const [showFiltersDialog, setShowFiltersDialog] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isCoreOpen, setIsCoreOpen] = useState(true);
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [activeView, setActiveView] = useState('primary');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set());
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const moreActionsButtonRef = useRef<HTMLButtonElement>(null);
  const moreActionsDropdownRef = useRef<HTMLDivElement>(null);

  // Check system preference and saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

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
      // Exiting select mode - clear selections
      setSelectedEmails(new Set());
    }
    setIsSelectMode(!isSelectMode);
    setIsMoreActionsOpen(false); // Close more actions when toggling select mode
  };

  const toggleSelectAll = () => {
    if (selectedEmails.size === 5) {
      // All emails are selected, so deselect all
      setSelectedEmails(new Set());
    } else {
      // Select all emails (we have 5 emails in the list)
      setSelectedEmails(new Set([1, 2, 3, 4, 5]));
    }
  };

  const toggleEmailSelection = (id: number) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmails(newSelected);
  };

  const toggleMoreActions = () => {
    setIsMoreActionsOpen(!isMoreActionsOpen);
  };

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
          className="rounded-lg border px-3 py-2 hover:bg-accent"
          onClick={() => setShowFiltersDialog(true)}
        >
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
                    className="rounded-md border px-2 py-1 hover:bg-accent"
                    onClick={toggleSelectAll}
                    aria-pressed={selectedEmails.size === 5}
                  >
                    <span>Select all</span>
                  </button>
                  <button 
                    className="rounded-md border px-2 py-1 hover:bg-accent"
                    onClick={toggleSelectMode}
                  >
                    <span>Done</span>
                  </button>
                </div>
              ) : (
                <button 
                  className="rounded-md border px-2 py-1 hover:bg-accent"
                  onClick={toggleSelectMode}
                >
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
                <div className="text-xs">{selectedEmails.size} selected</div>
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
            <div className="space-y-2 overflow-y-auto pr-1">
              <div className="w-full text-left rounded-xl p-3 border transition-colors bg-card border-sidebar-border"
                aria-current="page">
                <div className="flex items-center gap-2">
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={selectedEmails.has(1)}
                      onChange={() => toggleEmailSelection(1)}
                    />
                  )}
                  <button className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full flex items-center justify-center text-xs bg-chart-1"><svg
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-user size-4 opacity-80" aria-hidden="true">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0"><span
                              className="font-medium truncate text-foreground">Ali from Baked</span><span
                              className="text-xs text-muted-foreground">[9]</span></div><span
                            className="text-xs text-muted-foreground">Mar 29</span>
                        </div>
                        <div className="truncate text-sm opacity-90">New design review</div>
                        <div className="flex items-center gap-2 mt-1"><span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-chart-1 text-primary-foreground"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-tag size-3 opacity-80" aria-hidden="true">
                              <path
                                d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                              </path>
                              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </svg>Work</span><span
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-paperclip size-3" aria-hidden="true">
                              <path
                                d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551">
                              </path>
                            </svg> 4</span></div>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">Design review of new email client
                      features...</p>
                  </button>
                </div>
              </div>
              <div className="w-full text-left rounded-xl p-3 border transition-colors hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={selectedEmails.has(2)}
                      onChange={() => toggleEmailSelection(2)}
                    />
                  )}
                  <button className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full flex items-center justify-center text-xs bg-chart-2"><svg
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-user size-4 opacity-80" aria-hidden="true">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0"><span className="font-medium truncate">Alex, Ali,
                              Sarah</span><span className="text-xs text-muted-foreground">[6]</span></div><span
                            className="text-xs text-muted-foreground">Mar 28</span>
                        </div>
                        <div className="truncate text-sm opacity-90">Re: Design review feedback</div>
                        <div className="flex items-center gap-2 mt-1"><span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-chart-3 text-secondary-foreground"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-tag size-3 opacity-80" aria-hidden="true">
                              <path
                                d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                              </path>
                              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </svg>Updates</span></div>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">Catching up on the email client design
                      with new interactions...</p>
                  </button>
                </div>
              </div>
              <div className="w-full text-left rounded-xl p-3 border transition-colors hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={selectedEmails.has(3)}
                      onChange={() => toggleEmailSelection(3)}
                    />
                  )}
                  <button className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full flex items-center justify-center text-xs bg-destructive"><svg
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-user size-4 opacity-80" aria-hidden="true">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0"><span
                              className="font-medium truncate">GitHub</span><span
                              className="text-xs text-muted-foreground">[8]</span></div><span
                            className="text-xs text-muted-foreground">Mar 28</span>
                        </div>
                        <div className="truncate text-sm opacity-90">Security alert: Critical vulnerability</div>
                        <div className="flex items-center gap-2 mt-1"><span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-chart-5 text-primary-foreground"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-tag size-3 opacity-80" aria-hidden="true">
                              <path
                                d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                              </path>
                              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </svg>Alerts</span></div>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">A high severity vulnerability was
                      detected in one of your dependencies.</p>
                  </button>
                </div>
              </div>
              <div className="w-full text-left rounded-xl p-3 border transition-colors hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={selectedEmails.has(4)}
                      onChange={() => toggleEmailSelection(4)}
                    />
                  )}
                  <button className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full flex items-center justify-center text-xs bg-chart-4"><svg
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-user size-4 opacity-80" aria-hidden="true">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0"><span className="font-medium truncate">Stripe</span>
                          </div><span className="text-xs text-muted-foreground">Mar 29</span>
                        </div>
                        <div className="truncate text-sm opacity-90">Payment confirmation #1234</div>
                        <div className="flex items-center gap-2 mt-1"><span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-chart-1 text-primary-foreground"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-tag size-3 opacity-80" aria-hidden="true">
                              <path
                                d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                              </path>
                              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </svg>Work</span></div>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">Your recent payment has been successfully
                      processed.</p>
                  </button>
                </div>
              </div>
              <div className="w-full text-left rounded-xl p-3 border transition-colors hover:bg-accent/50">
                <div className="flex items-center gap-2">
                  {isSelectMode && (
                    <input
                      type="checkbox"
                      className="size-4"
                      checked={selectedEmails.has(5)}
                      onChange={() => toggleEmailSelection(5)}
                    />
                  )}
                  <button className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full flex items-center justify-center text-xs bg-primary"><svg
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="lucide lucide-user size-4 opacity-80" aria-hidden="true">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0"><span className="font-medium truncate">Netflix</span>
                          </div><span className="text-xs text-muted-foreground">Mar 29</span>
                        </div>
                        <div className="truncate text-sm opacity-90">New shows added to your list</div>
                        <div className="flex items-center gap-2 mt-1"><span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-chart-2 text-primary-foreground"><svg
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                              className="lucide lucide-tag size-3 opacity-80" aria-hidden="true">
                              <path
                                d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                              </path>
                              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </svg>Personal</span></div>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">We added new shows we think you will
                      love.</p>
                  </button>
                </div>
              </div>
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
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">New design review</h2>
                <div className="text-sm text-muted-foreground">Mar 29</div>
                <div className="mt-2 flex flex-wrap items-center gap-2"><span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-chart-1 text-primary-foreground"><svg
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="lucide lucide-tag size-3 opacity-80" aria-hidden="true">
                      <path
                        d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z">
                      </path>
                      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </svg>Work</span></div>
              </div>
              <div className="flex items-center gap-2"><button className="rounded-lg border px-2.5 py-1.5 hover:bg-accent"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-reply size-4" aria-hidden="true">
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                    <path d="m9 17-5-5 5-5"></path>
                  </svg></button><button className="rounded-lg border px-2.5 py-1.5 hover:bg-accent"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-reply-all size-4" aria-hidden="true">
                    <path d="m12 17-5-5 5-5"></path>
                    <path d="M22 18v-2a4 4 0 0 0-4-4H7"></path>
                    <path d="m7 17-5-5 5-5"></path>
                  </svg></button><button className="rounded-lg border px-2.5 py-1.5 hover:bg-accent"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-forward size-4" aria-hidden="true">
                    <path d="m15 17 5-5-5-5"></path>
                    <path d="M4 18v-2a4 4 0 0 1 4-4h12"></path>
                  </svg></button><button className="rounded-lg border px-2.5 py-1.5 hover:bg-accent" ref={moreActionsButtonRef} onClick={toggleMoreActions}><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-ellipsis size-4" aria-hidden="true">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg></button></div>
            </div>
            <div className="rounded-xl border p-3 bg-card/50">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full flex items-center justify-center bg-chart-1"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-user size-4" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg></div>
                <div>
                  <div className="font-medium">Ali from Baked</div>
                  <div className="text-xs text-muted-foreground">To: You</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6">Team discussed command center improvements and category system. General
                positive feedback, with suggestions for quick actions placement.</p>
            </div>
            <div className="rounded-xl border p-3">
              <div className="text-sm font-medium mb-2">Attachments [4]</div>
              <div className="flex flex-wrap gap-2"><span
                  className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-accent text-accent-foreground"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-paperclip size-3.5 opacity-80" aria-hidden="true">
                    <path
                      d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551">
                    </path>
                  </svg><span className="font-mono text-xs">.fig</span><span className="opacity-90">cmd.center.fig</span><span
                    className="opacity-60">21 MB</span></span><span
                  className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-secondary text-secondary-foreground"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-paperclip size-3.5 opacity-80" aria-hidden="true">
                    <path
                      d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551">
                    </path>
                  </svg><span className="font-mono text-xs">.docx</span><span className="opacity-90">comments.docx</span><span
                    className="opacity-60">3.7 MB</span></span><span
                  className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-primary text-primary-foreground"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-paperclip size-3.5 opacity-80" aria-hidden="true">
                    <path
                      d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551">
                    </path>
                  </svg><span className="font-mono text-xs">.img</span><span className="opacity-90">img.png</span><span
                    className="opacity-60">2.3 MB</span></span><span
                  className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs border bg-destructive text-destructive-foreground"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-paperclip size-3.5 opacity-80" aria-hidden="true">
                    <path
                      d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551">
                    </path>
                  </svg><span className="font-mono text-xs">.pdf</span><span className="opacity-90">requirements.pdf</span><span
                    className="opacity-60">1.5 MB</span></span></div>
            </div>
            <div className="mt-auto flex items-center gap-2"><button
                className="rounded-lg border px-3 py-1.5 bg-accent text-accent-foreground hover:opacity-90">Reply</button><button
                className="rounded-lg border px-3 py-1.5 hover:bg-accent">Forward</button></div>
          </div>
        </main>
      </div>
    </div>
  );
}
