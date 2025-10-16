"use client";

import { EmailThread } from "../types/emails";
import { EmailThread as EmailThreadComponent } from "./email-thread";

interface MainViewPanelProps {
  DEFAULT_THREAD_ID: string;
  selectedThread: string | null;
  selectedThreadData: EmailThread | undefined;
  expandedThreads: Set<string>;
  showThreadCompose: string | null;
  composeAction: "reply" | "replyAll" | "forward" | null;
  toggleThreadExpansion: (threadId: string) => void;
  handleReply: (threadId: string) => void;
  handleReplyAll: (threadId: string) => void;
  handleForward: (threadId: string) => void;
  handleThreadAction: (threadId: string, action: string) => void;
  closeThreadCompose: () => void;
}

export function MainViewPanel({
  DEFAULT_THREAD_ID,
  selectedThread,
  selectedThreadData,
  expandedThreads,
  showThreadCompose,
  composeAction,
  toggleThreadExpansion,
  handleReply,
  handleReplyAll,
  handleForward,
  handleThreadAction,
  closeThreadCompose,
}: MainViewPanelProps) {
  return (
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
  );
}