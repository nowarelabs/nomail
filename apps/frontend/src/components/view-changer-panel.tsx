import { useState, useRef } from "react";
import type { EmailThread } from "../types/emails";
import { EmailThreadsListItem } from "./email-threads-list-item";

interface ViewChangerPanelProps {
  activeMainView: string;
  activeSecondaryView: string;
  handleViewChange: (view: string) => void;
  filteredThreads: EmailThread[];
  isSelectMode: boolean;
  selectedThreads: Set<string>;
  toggleSelectMode: () => void;
  toggleSelectAll: () => void;
  toggleEmailSelection: (id: string) => void;
  selectedThread: string | null;
  handleSelectThread: (id: string) => void;
  setSelectedThread: (id: string | null) => void;
  toggleMoreActions: () => void;
  isMoreActionsOpen: boolean;
}

export function ViewChangerPanel({
  activeMainView,
  activeSecondaryView,
  handleViewChange,
  filteredThreads,
  isSelectMode,
  selectedThreads,
  toggleSelectMode,
  toggleSelectAll,
  toggleEmailSelection,
  selectedThread,
  handleSelectThread,
  setSelectedThread,
  toggleMoreActions,
  isMoreActionsOpen,
}: ViewChangerPanelProps) {
  const moreActionsButtonRef = useRef<HTMLButtonElement>(null);
  const moreActionsDropdownRef = useRef<HTMLDivElement>(null);

  return (
    <section className="border-r p-3 overflow-y-auto hidden xl:flex xl:flex-col xl:min-w-0">
      <div className="flex items-center justify-between px-1 pb-2">
        <div className="text-sm font-medium">
          {activeMainView === "inbox" &&
            activeSecondaryView === "primary" &&
            "Primary"}
          {activeMainView === "inbox" &&
            activeSecondaryView === "social" &&
            "Social"}
          {activeMainView === "inbox" &&
            activeSecondaryView === "updates" &&
            "Updates"}
          {activeMainView === "inbox" &&
            activeSecondaryView === "promotions" &&
            "Promotions"}
          {activeMainView === "inbox" && !activeSecondaryView && "Inbox"}
          {activeMainView === "inbox" &&
            activeSecondaryView === "inbox" &&
            "Inbox"}
          {activeMainView === "favorites" && "Favorites"}
          {activeMainView === "drafts" && "Drafts"}
          {activeMainView === "sent" && "Sent"}
          {activeMainView === "archive" && "Archive"}
          {activeMainView === "spam" && "Spam"}
          {activeMainView === "bin" && "Bin"}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {isSelectMode ? (
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <button
                className="rounded-md border px-2 py-1 hover:bg-accent flex items-center gap-1"
                onClick={toggleSelectAll}
                aria-pressed={
                  selectedThreads.size === filteredThreads.length &&
                  filteredThreads.length > 0
                }
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
                  className="lucide lucide-check-square size-4"
                >
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span>Select all</span>
              </button>
              <button
                className="rounded-md border px-2 py-1 hover:bg-accent flex items-center gap-1"
                onClick={toggleSelectMode}
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
                  className="lucide lucide-x size-4"
                >
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
                className="lucide lucide-check-square size-4"
              >
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span>Select</span>
            </button>
          )}
        </div>
      </div>
      <div className="rounded-xl border bg-card/40 p-2 flex-1 min-h-0 flex flex-col">
        {activeMainView === "inbox" && (
          <div className="flex items-center gap-2 px-1 pb-2">
            <div className="text-xs text-muted-foreground">Views</div>
            <div className="ms-auto flex items-center gap-1">
              <button
                className={`rounded-md border px-2 py-1 text-xs ${
                  activeSecondaryView === "primary"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => handleViewChange("primary")}
              >
                Primary
              </button>
              <button
                className={`rounded-md border px-2 py-1 text-xs ${
                  activeSecondaryView === "social"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => handleViewChange("social")}
              >
                Social
              </button>
              <button
                className={`rounded-md border px-2 py-1 text-xs ${
                  activeSecondaryView === "updates"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => handleViewChange("updates")}
              >
                Updates
              </button>
              <button
                className={`rounded-md border px-2 py-1 text-xs ${
                  activeSecondaryView === "promotions"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => handleViewChange("promotions")}
              >
                Promotions
              </button>
            </div>
          </div>
        )}
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
                    className="lucide lucide-chevron-down size-3"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {isMoreActionsOpen && (
                  <div
                    className="absolute right-0 mt-1 w-48 rounded-md border bg-popover p-1 shadow-md z-10"
                    ref={moreActionsDropdownRef}
                  >
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
                      <select
                        aria-label="Move to label"
                        className="w-full rounded-md border px-2 py-1 text-xs bg-input/50"
                      >
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
          {filteredThreads.map((thread) => (
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
        <nav className="pt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredThreads.length} items</span>
          <div className="flex items-center gap-2">
            <button
              disabled={true}
              className="rounded-md border px-2 py-1 disabled:opacity-50 hover:bg-accent"
            >
              Prev
            </button>
            <button
              disabled={true}
              className="rounded-md border px-2 py-1 disabled:opacity-50 hover:bg-accent"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
}