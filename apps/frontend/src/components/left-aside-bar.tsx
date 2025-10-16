"use client";

import { useState } from "react";
import { NewEmailDialog } from "./new-email-dialog";

interface LeftAsideBarProps {
  activeMainView: string;
  activeSecondaryView: string;
  showNewEmailDialog: boolean;
  setShowNewEmailDialog: (show: boolean) => void;
  handleViewChange: (view: string) => void;
}

export function LeftAsideBar({
  activeMainView,
  activeSecondaryView,
  showNewEmailDialog,
  setShowNewEmailDialog,
  handleViewChange,
}: LeftAsideBarProps) {
  const [isCoreOpen, setIsCoreOpen] = useState(true);
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isLabelsOpen, setIsLabelsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(true);

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

  return (
    <aside className="hidden md:flex flex-col gap-3 border-r p-3 bg-sidebar">
      <div className="px-2">
        <div className="text-sm text-muted-foreground">Baked Design</div>
        <div className="text-xs text-muted-foreground">work@baked.design</div>
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-primary text-primary-foreground hover:opacity-90"
        onClick={() => setShowNewEmailDialog(true)}
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
          className="lucide lucide-plus size-4"
          aria-hidden="true"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New email
      </button>
      <div>
        <button
          className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
          onClick={toggleCore}
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
            className={`lucide lucide-chevron-${
              isCoreOpen ? "down" : "right"
            } size-4`}
            aria-hidden="true"
          >
            <path
              d={`m${isCoreOpen ? "6 9 6 6 6-6" : "9 18 6-6-6-6"}`}
            ></path>
          </svg>
          <span className="font-medium">Core</span>
        </button>
        {isCoreOpen && (
          <div
            className="overflow-hidden"
            style={{ height: "auto", opacity: 1 }}
          >
            <div className="py-1">
              <button
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                  activeMainView === "inbox"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleViewChange("inbox")}
              >
                <span className="flex items-center gap-2">
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
                    className="lucide lucide-inbox size-4"
                    aria-hidden="true"
                  >
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                  Inbox
                </span>
                <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">
                  281
                </span>
              </button>
              <button
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                  activeMainView === "favorites"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleViewChange("favorites")}
              >
                <span className="flex items-center gap-2">
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
                    className="lucide lucide-star size-4"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  Favorites
                </span>
              </button>
              <button
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                  activeMainView === "drafts"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleViewChange("drafts")}
              >
                <span className="flex items-center gap-2">
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
                    className="lucide lucide-pen-line size-4"
                    aria-hidden="true"
                  >
                    <path d="M13 21h8"></path>
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                  </svg>
                  Drafts
                </span>
                <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">
                  13
                </span>
              </button>
              <button
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                  activeMainView === "sent"
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => handleViewChange("sent")}
              >
                <span className="flex items-center gap-2">
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
                    className="lucide lucide-send size-4"
                    aria-hidden="true"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                    <path d="m21.854 2.147-10.94 10.939"></path>
                  </svg>
                  Sent
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 scrollbar-hidden">
        <div>
          <button
            className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={toggleManagement}
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
              className={`lucide lucide-chevron-${
                isManagementOpen ? "down" : "right"
              } size-4`}
              aria-hidden="true"
            >
              <path
                d={`m${isManagementOpen ? "6 9 6 6 6-6" : "9 18 6-6-6-6"}`}
              ></path>
            </svg>
            <span className="font-medium">Management</span>
          </button>
          {isManagementOpen && (
            <div
              className="overflow-hidden"
              style={{ height: "auto", opacity: 1 }}
            >
              <div className="py-1">
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "archive"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("archive")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-archive size-4"
                      aria-hidden="true"
                    >
                      <rect width="20" height="5" x="2" y="3" rx="1"></rect>
                      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"></path>
                      <path d="M10 12h4"></path>
                    </svg>
                    Archive
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "spam"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("spam")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-shield-alert size-4"
                      aria-hidden="true"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      <path d="M12 8v4"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                    Spam
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">
                    24
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "bin"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("bin")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-trash2 lucide-trash-2 size-4"
                      aria-hidden="true"
                    >
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
        <div>
          <button
            className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={toggleLabels}
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
              className={`lucide lucide-chevron-${
                isLabelsOpen ? "down" : "right"
              } size-4`}
              aria-hidden="true"
            >
              <path
                d={`m${isLabelsOpen ? "6 9 6 6 6-6" : "9 18 6-6-6-6"}`}
              ></path>
            </svg>
            <span className="font-medium">Labels</span>
          </button>
          {isLabelsOpen && (
            <div
              className="overflow-hidden"
              style={{ height: "auto", opacity: 1 }}
            >
              <div className="py-1">
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "work"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("work")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-briefcase size-4"
                      aria-hidden="true"
                    >
                      <path d="M10 13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1z"></path>
                      <path d="M10 2v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2"></path>
                      <path d="M10 22v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"></path>
                      <path d="M4 10h16"></path>
                      <path d="M4 14h16"></path>
                      <rect
                        width="20"
                        height="16"
                        x="2"
                        y="6"
                        rx="2"
                      ></rect>
                    </svg>
                    Work
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "personal"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("personal")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-user size-4"
                      aria-hidden="true"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Personal
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "important"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("important")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-star size-4"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Important
                  </span>
                </button>
                <button
                  className="w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={() => setShowNewEmailDialog(true)}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-filter size-4"
                      aria-hidden="true"
                    >
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filter Labels
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={toggleFilters}
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
              className={`lucide lucide-chevron-${
                isFiltersOpen ? "down" : "right"
              } size-4`}
              aria-hidden="true"
            >
              <path
                d={`m${isFiltersOpen ? "6 9 6 6 6-6" : "9 18 6-6-6-6"}`}
              ></path>
            </svg>
            <span className="font-medium">Filters</span>
          </button>
          {isFiltersOpen && (
            <div
              className="overflow-hidden"
              style={{ height: "auto", opacity: 1 }}
            >
              <div className="py-1">
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "unread"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("unread")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-mail size-4"
                      aria-hidden="true"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Unread
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">
                    24
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "starred"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("starred")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-star size-4"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Starred
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">
                    4
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "snoozed"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("snoozed")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-bell-off size-4"
                      aria-hidden="true"
                    >
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18c0-2-3-9-3-9z"></path>
                      <path d="M22 10a6 6 0 0 1-9.73 5"></path>
                      <line x1="18" y1="13" x2="22" y2="17"></line>
                    </svg>
                    Snoozed
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-xs bg-muted text-muted-foreground">
                    1
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={toggleMore}
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
              className={`lucide lucide-chevron-${
                isMoreOpen ? "down" : "right"
              } size-4`}
              aria-hidden="true"
            >
              <path
                d={`m${isMoreOpen ? "6 9 6 6 6-6" : "9 18 6-6-6-6"}`}
              ></path>
            </svg>
            <span className="font-medium">More</span>
          </button>
          {isMoreOpen && (
            <div
              className="overflow-hidden"
              style={{ height: "auto", opacity: 1 }}
            >
              <div className="py-1">
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "settings"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("settings")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-settings size-4"
                      aria-hidden="true"
                    >
                      <path d="M12 22v-4"></path>
                      <path d="M12 6v4"></path>
                      <path d="M14.5 10a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path>
                    </svg>
                    Settings
                  </span>
                </button>
                <button
                  className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm ${
                    activeMainView === "help"
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => handleViewChange("help")}
                >
                  <span className="flex items-center gap-2">
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
                      className="lucide lucide-help-circle size-4"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8v4"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                    Help
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}