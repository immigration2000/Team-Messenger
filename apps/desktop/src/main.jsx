import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const mockUser = {
  id: "u1",
  name: "\uAE40\uBBFC\uC218",
  team: "\uC81C\uD488\uAC1C\uBC1C\uD300",
  role: "\uD504\uB860\uD2B8\uC5D4\uB4DC \uB9AC\uB4DC",
  vacationDays: "12\uC77C",
  bio: "\uB098\uB294 \uC0DD\uAC01\uD55C\uB2E4 \uACE0\uB85C \uC874\uC7AC\uD55C\uB2E4",
};

const mockChannels = [
  {
    id: "c1",
    name: "\uD504\uB85C\uC81D\uD2B8-\uC54C\uD30C",
    unread: 3,
    pinned: true,
    favorite: true,
    owner: "\uAE40\uBBFC\uC218",
    members: ["\uAE40\uBBFC\uC218", "\uBC15\uC9C0\uD604", "\uC774\uD0DC\uD638"],
    memberRoles: {
      "\uAE40\uBBFC\uC218": "\uBC29\uC7A5",
      "\uBC15\uC9C0\uD604": "\uAD00\uB9AC",
      "\uC774\uD0DC\uD638": "\uCC38\uC5EC",
    },
    messages: [
      {
        id: "m1",
        sender: "\uC9C0\uD604",
        text: "\uC624\uB298 \uC2A4\uD504\uB9B0\uD2B8 \uB9AC\uBDF0 4\uC2DC\uC5D0 \uC9C4\uD589\uD574\uC694.",
        time: "09:10",
        readBy: ["\uC9C0\uD604", "\uBBFC\uC218"],
      },
      {
        id: "m2",
        sender: "\uBBFC\uC218",
        text: "\uB124, \uB370\uBAA8 \uC2DC\uB098\uB9AC\uC624 \uC815\uB9AC\uD574\uC11C \uACF5\uC720\uD560\uAC8C\uC694.",
        time: "09:12",
        readBy: ["\uC9C0\uD604", "\uBBFC\uC218", "\uD0DC\uD638"],
      },
      {
        id: "m3",
        sender: "\uD0DC\uD638",
        text: "API \uBC30\uD3EC\uB294 3\uC2DC \uC804\uC5D0 \uC644\uB8CC \uC608\uC815\uC785\uB2C8\uB2E4.",
        time: "09:14",
        readBy: ["\uD0DC\uD638"],
      },
    ],
  },
  {
    id: "c2",
    name: "\uB514\uC790\uC778-\uC2F1\uD06C",
    unread: 0,
    pinned: false,
    favorite: true,
    owner: "\uC218\uC9C4",
    members: ["\uC218\uC9C4", "\uBBFC\uC218"],
    memberRoles: {
      "\uC218\uC9C4": "\uBC29\uC7A5",
      "\uBBFC\uC218": "\uCC38\uC5EC",
    },
    messages: [
      {
        id: "m4",
        sender: "\uC218\uC9C4",
        text: "\uC2E0\uADDC \uCC44\uD305 \uD654\uBA74 \uC2DC\uC548 \uC5C5\uB370\uC774\uD2B8\uD588\uC5B4\uC694.",
        time: "10:01",
        readBy: ["\uC218\uC9C4", "\uBBFC\uC218"],
      },
      {
        id: "m5",
        sender: "\uBBFC\uC218",
        text: "\uC810\uC2EC \uD6C4 \uD53C\uB4DC\uBC31 \uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.",
        time: "10:03",
        readBy: ["\uBBFC\uC218"],
      },
    ],
  },
  {
    id: "c3",
    name: "\uC6B4\uC601-\uACF5\uC9C0",
    unread: 1,
    pinned: false,
    favorite: false,
    owner: "\uAD00\uB9AC\uC790",
    members: ["\uAD00\uB9AC\uC790", "\uAE40\uBBFC\uC218", "\uCD5C\uC218\uC9C4"],
    memberRoles: {
      "\uAD00\uB9AC\uC790": "\uBC29\uC7A5",
      "\uAE40\uBBFC\uC218": "\uAD00\uB9AC",
      "\uCD5C\uC218\uC9C4": "\uCC38\uC5EC",
    },
    messages: [
      {
        id: "m6",
        sender: "\uAD00\uB9AC\uC790",
        text: "\uB0B4\uC77C \uC624\uD6C4 2\uC2DC \uC2DC\uC2A4\uD15C \uC810\uAC80 \uC608\uC815\uC785\uB2C8\uB2E4.",
        time: "08:45",
        readBy: ["\uAD00\uB9AC\uC790"],
      },
    ],
  },
];

const mockSchedules = [
  { id: "s1", title: "\uC2A4\uD504\uB9B0\uD2B8 \uB9AC\uBDF0", date: "2026-03-13", time: "16:00" },
  { id: "s2", title: "\uBC31\uB85C\uADF8 \uC815\uC81C", date: "2026-03-14", time: "11:00" },
  { id: "s3", title: "\uBD84\uAE30 \uACC4\uD68D \uD68C\uC758", date: "2026-03-18", time: "10:30" },
];

const mockLeaves = [
  {
    id: "l1",
    member: "\uBC15\uC9C0\uD604",
    type: "\uC5F0\uCC28",
    start: "2026-03-16",
    end: "2026-03-16",
    status: "\uC2B9\uC778",
  },
  {
    id: "l2",
    member: "\uC774\uD0DC\uD638",
    type: "\uC624\uC804 \uBC18\uCC28",
    start: "2026-03-20",
    end: "2026-03-20",
    status: "\uB300\uAE30",
  },
  {
    id: "l3",
    member: "\uCD5C\uC218\uC9C4",
    type: "\uC5F0\uCC28",
    start: "2026-03-25",
    end: "2026-03-26",
    status: "\uC2B9\uC778",
  },
];

const mockApprovals = [
  {
    id: "a1",
    title: "\uACAC\uC801 \uCD94\uAC00 \uC608\uC0B0 \uC2B9\uC778",
    requester: "\uBC15\uC9C0\uD604",
    department: "\uB514\uC790\uC778\uD300",
    requestedAt: "2026-03-15 09:20",
    status: "\uB300\uAE30",
    document:
      "\uB514\uC790\uC778 \uC2DC\uC548 \uCD94\uAC00 \uC218\uC815\uC744 \uC704\uD55C \uC608\uC0B0 120\uB9CC\uC6D0\uC774 \uD544\uC694\uD569\uB2C8\uB2E4. \uC678\uC8FC \uC2DC\uC548 \uBC0F \uC0AC\uC6A9\uC790 \uD14C\uC2A4\uD2B8 \uD3EC\uD568.",
    comment: "",
    approvalLine: ["\uD300\uC7A5", "\uBCF8\uBD80\uC7A5"],
    history: [{ id: "h1", text: "\uACB0\uC7AC \uC0C1\uC2E0 \uB4F1\uB85D", time: "2026-03-15 09:20" }],
  },
  {
    id: "a2",
    title: "3\uC6D4 \uD734\uAC00 \uC2E0\uCCAD",
    requester: "\uCD5C\uC218\uC9C4",
    department: "\uC6B4\uC601\uD300",
    requestedAt: "2026-03-15 14:10",
    status: "\uC2B9\uC778",
    document:
      "3\uC6D4 25\uC77C~26\uC77C \uC5F0\uCC28 \uC0AC\uC6A9 \uC2E0\uCCAD\uC785\uB2C8\uB2E4. \uB300\uCCB4 \uADFC\uBB34 \uC77C\uC815\uC740 \uC0AC\uC804 \uACF5\uC720 \uC644\uB8CC\uD588\uC2B5\uB2C8\uB2E4.",
    comment: "\uD300\uC7A5 \uC2B9\uC778 \uC644\uB8CC",
    approvalLine: ["\uD300\uC7A5", "\uC778\uC0AC\uD300"],
    history: [
      { id: "h2", text: "\uACB0\uC7AC \uC0C1\uC2E0 \uB4F1\uB85D", time: "2026-03-15 14:10" },
      { id: "h3", text: "\uD300\uC7A5 \uC2B9\uC778", time: "2026-03-15 15:00" },
    ],
  },
];

const mockMeetings = [
  {
    id: "mt1",
    title: "\uC2A4\uD504\uB9B0\uD2B8 \uD68C\uACE0",
    room: "\uD68C\uC758\uC2E4 A",
    date: "2026-03-16",
    time: "15:00",
    attendees: ["\uAE40\uBBFC\uC218", "\uBC15\uC9C0\uD604", "\uC774\uD0DC\uD638"],
    attendance: {
      "\uAE40\uBBFC\uC218": "\uCC38\uC11D",
      "\uBC15\uC9C0\uD604": "\uCC38\uC11D",
      "\uC774\uD0DC\uD638": "\uBBF8\uC751\uB2F5",
    },
  },
  {
    id: "mt2",
    title: "\uB514\uC790\uC778 \uC2F1\uD06C",
    room: "\uD68C\uC758\uC2E4 B",
    date: "2026-03-17",
    time: "11:00",
    attendees: ["\uC218\uC9C4", "\uBBFC\uC218"],
    attendance: {
      "\uC218\uC9C4": "\uCC38\uC11D",
      "\uBBFC\uC218": "\uC9C0\uAC01",
    },
  },
];

const teamMembers = ["\uAE40\uBBFC\uC218", "\uBC15\uC9C0\uD604", "\uC774\uD0DC\uD638", "\uCD5C\uC218\uC9C4", "\uAD00\uB9AC\uC790"];
const defaultMemberProfiles = {
  "\uAE40\uBBFC\uC218": { team: "\uC81C\uD488\uAC1C\uBC1C\uD300", role: "\uD504\uB860\uD2B8\uC5D4\uB4DC \uB9AC\uB4DC", vacationDays: "12\uC77C", bio: "\uB098\uB294 \uC0DD\uAC01\uD55C\uB2E4 \uACE0\uB85C \uC874\uC7AC\uD55C\uB2E4" },
  "\uBC15\uC9C0\uD604": { team: "\uB514\uC790\uC778\uD300", role: "\uD300\uC6D0", vacationDays: "9\uC77C", bio: "\uC0AC\uC6A9\uC790 \uD750\uB984\uC744 \uC815\uB9AC\uD558\uB294 \uC77C\uC744 \uB9E1\uACE0 \uC788\uC2B5\uB2C8\uB2E4." },
  "\uC774\uD0DC\uD638": { team: "\uD50C\uB7AB\uD3FC\uD300", role: "\uD300\uC6D0", vacationDays: "7\uC77C", bio: "API\uC640 \uBC30\uD3EC \uC790\uB3D9\uD654\uB97C \uB2F4\uB2F9\uD569\uB2C8\uB2E4." },
  "\uCD5C\uC218\uC9C4": { team: "\uC6B4\uC601\uD300", role: "\uD300\uC6D0", vacationDays: "14\uC77C", bio: "\uC6B4\uC601 \uACF5\uC9C0\uC640 \uB9E4\uB274\uC5BC\uC744 \uAD00\uB9AC\uD569\uB2C8\uB2E4." },
  "\uAD00\uB9AC\uC790": { team: "\uAD00\uB9AC\uC2E4", role: "\uAD00\uB9AC\uC790", vacationDays: "20\uC77C", bio: "\uC2DC\uC2A4\uD15C \uC6B4\uC601 \uC804\uBC18\uC744 \uAD00\uB9AC\uD569\uB2C8\uB2E4." },
};

const defaultBoxes = {
  profile: {
    title: "\uB0B4 \uD504\uB85C\uD544",
    visible: true,
    icon: "ID",
    color: "#0f766e",
    type: "profile",
    minW: 3,
    minH: 3,
    content: "",
  },
};

const classicMessengerBoxes = {
  profile: { title: "\uB0B4 \uD504\uB85C\uD544", visible: true, icon: "ID", color: "#0f766e", type: "profile", minW: 3, minH: 3, content: "" },
  channels: { title: "\uCC44\uD305\uBC29", visible: true, icon: "CH", color: "#0f766e", type: "channels", minW: 4, minH: 4, content: "" },
  conversation: { title: "\uD504\uB85C\uC81D\uD2B8 \uB300\uD654", visible: true, icon: "PM", color: "#0f766e", type: "conversation", minW: 8, minH: 4, content: "" },
  schedules: { title: "\uC624\uB298 \uC77C\uC815", visible: true, icon: "TD", color: "#0f766e", type: "schedules", minW: 6, minH: 3, content: "" },
  leaves: { title: "\uD734\uAC00 \uD604\uD669", visible: true, icon: "LV", color: "#0f766e", type: "leaves", minW: 6, minH: 3, content: "" },
};

const defaultBoxOrder = ["profile"];
const classicMessengerBoxOrder = ["profile", "channels", "conversation", "schedules", "leaves"];
const GRID_COLUMNS = 24;
const GRID_ROWS = 10;
const defaultLayouts = {
  profile: { x: 0, y: 0, w: 3, h: 3 },
};
const classicMessengerLayouts = {
  profile: { x: 0, y: 0, w: 5, h: 4 },
  channels: { x: 0, y: 4, w: 5, h: 6 },
  conversation: { x: 5, y: 0, w: 19, h: 5 },
  schedules: { x: 5, y: 5, w: 10, h: 5 },
  leaves: { x: 15, y: 5, w: 9, h: 5 },
};
const layoutRules = {
  profile: { minW: 3, minH: 3, maxW: 24, maxH: 10 },
  channels: { minW: 4, minH: 4, maxW: 10, maxH: 10 },
  conversation: { minW: 8, minH: 4, maxW: 24, maxH: 10 },
  schedules: { minW: 6, minH: 3, maxW: 14, maxH: 10 },
  leaves: { minW: 6, minH: 3, maxW: 14, maxH: 10 },
};
const STORAGE_KEY = "team-collab-layout-v1";
const CUSTOM_BOX_PREFIX = "custom-";
const boxTypes = [
  { value: "profile", label: "\uB0B4 \uD504\uB85C\uD544" },
  { value: "channels", label: "\uCC44\uD305\uBC29" },
  { value: "conversation", label: "\uD504\uB85C\uC81D\uD2B8 \uB300\uD654" },
  { value: "schedules", label: "\uC624\uB298 \uC77C\uC815" },
  { value: "leaves", label: "\uD734\uAC00 \uD604\uD669" },
  { value: "note", label: "\uBA54\uBAA8" },
  { value: "checklist", label: "\uCCB4\uD06C\uB9AC\uC2A4\uD2B8" },
  { value: "links", label: "\uB9C1\uD06C" },
];
const menuDockOptions = [
  { value: "top", label: "\uC704\uCABD" },
  { value: "right", label: "\uC624\uB978\uCABD" },
  { value: "bottom", label: "\uC544\uB798" },
  { value: "left", label: "\uC67C\uCABD" },
];
const uiPresets = [
  { value: "minimal", label: "\uD604\uC7AC \uAE30\uBCF8", description: "\uB0B4 \uD504\uB85C\uD544 \uBC15\uC2A4\uB9CC \uBCF4\uC5EC\uC8FC\uB294 \uCD08\uAE30 \uD654\uBA74" },
  {
    value: "classic-messenger",
    label: "\uAE30\uBCF8 \uBA54\uC2E0\uC800",
    description: "\uCC44\uD305\uBC29, \uD504\uB85C\uC81D\uD2B8 \uB300\uD654, \uC624\uB298 \uC77C\uC815, \uD734\uAC00 \uD604\uD669\uC744 \uD3EC\uD568\uD55C \uCD08\uAE30 MVP \uAD6C\uC131",
  },
];
const defaultApprovalTemplates = [
  {
    id: "tpl-budget",
    label: "\uC608\uC0B0 \uC2B9\uC778",
    title: "\uC608\uC0B0 \uC9D1\uD589 \uC2B9\uC778",
    document: "\uC9D1\uD589 \uC0AC\uC720, \uD544\uC694 \uC608\uC0B0, \uAE30\uB300 \uD6A8\uACFC\uB97C \uC791\uC131\uD558\uC138\uC694.",
    approvalLine: ["\uD300\uC7A5", "\uBCF8\uBD80\uC7A5"],
  },
  {
    id: "tpl-leave",
    label: "\uD734\uAC00 \uC2E0\uCCAD",
    title: "\uD734\uAC00 \uC2E0\uCCAD",
    document: "\uD734\uAC00 \uAE30\uAC04, \uC778\uC218\uC778\uACC4 \uACC4\uD68D, \uBE44\uC0C1 \uC5F0\uB77D\uCC98\uB97C \uC791\uC131\uD558\uC138\uC694.",
    approvalLine: ["\uD300\uC7A5", "\uC778\uC0AC\uD300"],
  },
];

function createSystemMessage(text) {
  return {
    id: `m${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sender: "\uC2DC\uC2A4\uD15C",
    text,
    time: "09:40",
    readBy: [mockUser.name],
  };
}

function ensureChannelShape(channel) {
  const owner = channel.owner || channel.members?.[0] || mockUser.name;
  const members = Array.from(new Set([owner, ...(channel.members || [])]));
  const memberRoles = members.reduce((acc, member) => {
    acc[member] = channel.memberRoles?.[member] || "\uCC38\uC5EC";
    return acc;
  }, {});
  memberRoles[owner] = "\uBC29\uC7A5";

  return {
    ...channel,
    owner,
    members,
    memberRoles,
  };
}

function parseChecklistItems(content) {
  return (content || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => ({
      checked: item.startsWith("[x] "),
      label: item.replace(/^\[(x| )\]\s*/, ""),
    }));
}

function MenuIcon({ type }) {
  if (type === "vacation") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 19h12M7 16l5-11 5 11M9.2 11h5.6" />
      </svg>
    );
  }

  if (type === "approval") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 12.5 10 15.5 17 8.5" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12M6 12h8M6 17h5" />
        <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4V5Z" />
      </svg>
    );
  }

  if (type === "meeting") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M9 10h6M12 7v6" />
      </svg>
    );
  }

  if (type === "settings") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5Z" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7.7 7.7 0 0 0-1.7-1L14.5 3h-5L9.2 6a7.7 7.7 0 0 0-1.7 1l-2.4-1-2 3.5L5.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.7 7.7 0 0 0 1.7 1l.3 3h5l.3-3a7.7 7.7 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.7.1-1Z" />
      </svg>
    );
  }

  if (type === "account") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" />
      </svg>
    );
  }

  if (type === "customize") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h10M4 12h16M4 18h8" />
        <circle cx="16" cy="6" r="2" />
        <circle cx="10" cy="18" r="2" />
        <circle cx="8" cy="12" r="2" />
      </svg>
    );
  }

  if (type === "notification") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 17h12" />
        <path d="M8 17V11a4 4 0 1 1 8 0v6l2 2H6l2-2Z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

function getLayoutRule(typeOrKey) {
  return layoutRules[typeOrKey] ?? { minW: 6, minH: 3, maxW: 12, maxH: 6 };
}

function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function clampLayout(key, layout, sourceBoxes = {}) {
  const rule = getLayoutRule(sourceBoxes[key]?.type || key);
  const width = Math.max(rule.minW, Math.min(rule.maxW, layout.w));
  const height = Math.max(rule.minH, Math.min(rule.maxH, layout.h));

  return {
    ...layout,
    x: Math.max(0, Math.min(GRID_COLUMNS - width, layout.x)),
    y: Math.max(0, Math.min(GRID_ROWS - height, layout.y)),
    w: width,
    h: height,
  };
}

function findOpenSpot(targetKey, draftLayouts, order) {
  const target = draftLayouts[targetKey];

  for (let y = 0; y <= GRID_ROWS - target.h; y += 1) {
    for (let x = 0; x <= GRID_COLUMNS - target.w; x += 1) {
      const candidate = { ...target, x, y };
      const blocked = order.some((key) => key !== targetKey && intersects(candidate, draftLayouts[key]));
      if (!blocked) {
        return candidate;
      }
    }
  }

  return target;
}

function findOpenSpotFromPosition(targetKey, draftLayouts, order, startX = 0, startY = 0) {
  const target = draftLayouts[targetKey];
  const candidates = [];

  for (let y = 0; y <= GRID_ROWS - target.h; y += 1) {
    for (let x = 0; x <= GRID_COLUMNS - target.w; x += 1) {
      candidates.push({ x, y });
    }
  }

  candidates.sort((a, b) => {
    const aDistance = Math.abs(a.x - startX) + Math.abs(a.y - startY);
    const bDistance = Math.abs(b.x - startX) + Math.abs(b.y - startY);
    return aDistance - bDistance;
  });

  for (const candidatePosition of candidates) {
    const candidate = { ...target, x: candidatePosition.x, y: candidatePosition.y };
    const blocked = order.some((key) => key !== targetKey && intersects(candidate, draftLayouts[key]));
    if (!blocked) {
      return candidate;
    }
  }

  return null;
}

function resolveCollisions(changedKey, draftLayouts, order) {
  const next = { ...draftLayouts };
  const queue = [changedKey];
  const processed = new Set();

  while (queue.length > 0) {
    const activeKey = queue.shift();
    if (!activeKey) continue;

    order.forEach((key) => {
      if (key === activeKey) return;

      if (intersects(next[activeKey], next[key])) {
        const moved = findOpenSpot(key, next, order);
        const didMove =
          moved.x !== next[key].x ||
          moved.y !== next[key].y ||
          moved.w !== next[key].w ||
          moved.h !== next[key].h;

        next[key] = moved;

        if (didMove || !processed.has(key)) {
          queue.push(key);
        }
      }
    });

    processed.add(activeKey);
  }

  return next;
}

function constrainResize(changedKey, nextLayout, currentLayouts, order, rule = getLayoutRule(changedKey)) {
  const base = {
    ...nextLayout,
    x: currentLayouts[changedKey].x,
    y: currentLayouts[changedKey].y,
    w: Math.max(rule.minW, Math.min(rule.maxW, nextLayout.w)),
    h: Math.max(rule.minH, Math.min(rule.maxH, nextLayout.h)),
  };

  const maxWidth = GRID_COLUMNS - base.x;
  const maxHeight = GRID_ROWS - base.y;

  let best = {
    ...base,
    w: Math.min(base.w, maxWidth),
    h: Math.min(base.h, maxHeight),
  };

  const collides = (candidate) =>
    order.some((key) => key !== changedKey && intersects(candidate, currentLayouts[key]));

  while (collides(best) && (best.w > rule.minW || best.h > rule.minH)) {
    if (best.w > rule.minW) {
      best = { ...best, w: best.w - 1 };
      if (!collides(best)) break;
    }

    if (best.h > rule.minH) {
      best = { ...best, h: best.h - 1 };
    }
  }

  if (collides(best)) {
    return currentLayouts[changedKey];
  }

  return best;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(mockUser);
  const [channels, setChannels] = useState(mockChannels.map(ensureChannelShape));
  const [leaves, setLeaves] = useState(mockLeaves);
  const [approvals, setApprovals] = useState(mockApprovals);
  const [meetings, setMeetings] = useState(mockMeetings);
  const [approvalTemplates, setApprovalTemplates] = useState(defaultApprovalTemplates);
  const [teamMemberList, setTeamMemberList] = useState(teamMembers);
  const [teamRoles, setTeamRoles] = useState(
    Object.fromEntries(teamMembers.map((member) => [member, member === mockUser.name ? mockUser.role : "\uD300\uC6D0"]))
  );
  const [memberProfiles, setMemberProfiles] = useState(defaultMemberProfiles);
  const [selectedChannelId, setSelectedChannelId] = useState(mockChannels[0].id);
  const [loginId, setLoginId] = useState("admin");
  const [loginPassword, setLoginPassword] = useState("admin");
  const [loginError, setLoginError] = useState("");
  const [boxes, setBoxes] = useState(defaultBoxes);
  const [boxOrder, setBoxOrder] = useState(defaultBoxOrder);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuSettingsOpen, setIsMenuSettingsOpen] = useState(false);
  const [menuSettingsSection, setMenuSettingsSection] = useState("all");
  const [isPresetMenuOpen, setIsPresetMenuOpen] = useState(false);
  const [draggedBoxKey, setDraggedBoxKey] = useState(null);
  const [resizeState, setResizeState] = useState(null);
  const [boxLayouts, setBoxLayouts] = useState(defaultLayouts);
  const [accountName, setAccountName] = useState(mockUser.name);
  const [accountTeam, setAccountTeam] = useState(mockUser.team);
  const [accountRole, setAccountRole] = useState(mockUser.role);
  const [accountVacationDays, setAccountVacationDays] = useState(mockUser.vacationDays);
  const [accountBio, setAccountBio] = useState(mockUser.bio);
  const [customBoxCount, setCustomBoxCount] = useState(0);
  const [selectedBoxKey, setSelectedBoxKey] = useState(defaultBoxOrder[0]);
  const [menuDock, setMenuDock] = useState("top");
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedApprovalId, setSelectedApprovalId] = useState(mockApprovals[0].id);
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const [chatSearch, setChatSearch] = useState("");
  const [approvalSearch, setApprovalSearch] = useState("");
  const [meetingSearch, setMeetingSearch] = useState("");
  const [notificationFilter, setNotificationFilter] = useState("all");
  const [selectedMemberName, setSelectedMemberName] = useState(null);
  const [selectedMemberDraft, setSelectedMemberDraft] = useState({
    team: "",
    role: "",
    vacationDays: "",
    bio: "",
  });
  const [newChannelName, setNewChannelName] = useState("");
  const [templateNameDraft, setTemplateNameDraft] = useState("");
  const [memberNameDraft, setMemberNameDraft] = useState("");
  const [memberRoleDraft, setMemberRoleDraft] = useState("\uD300\uC6D0");
  const [channelInviteDraft, setChannelInviteDraft] = useState("");
  const [vacationRequest, setVacationRequest] = useState({
    type: "\uC5F0\uCC28",
    start: "2026-03-18",
    end: "2026-03-18",
  });
  const [approvalDraft, setApprovalDraft] = useState({
    title: "",
    requester: mockUser.name,
    department: mockUser.team,
    document: "",
    attachmentName: "",
    approvalLine: ["\uD300\uC7A5", "\uBCF8\uBD80\uC7A5"],
  });
  const [meetingDraft, setMeetingDraft] = useState({
    title: "",
    room: "\uD68C\uC758\uC2E4 A",
    date: "2026-03-18",
    time: "10:00",
    attendees: [mockUser.name],
  });
  const [chatDraft, setChatDraft] = useState("");
  const [chatAttachmentName, setChatAttachmentName] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [draftBoxes, setDraftBoxes] = useState(defaultBoxes);
  const [draftBoxOrder, setDraftBoxOrder] = useState(defaultBoxOrder);
  const [draftBoxLayouts, setDraftBoxLayouts] = useState(defaultLayouts);
  const [draftCustomBoxCount, setDraftCustomBoxCount] = useState(0);
  const [draftSelectedBoxKey, setDraftSelectedBoxKey] = useState(defaultBoxOrder[0]);
  const previewRef = useRef(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (parsed.boxLayouts) {
        setBoxLayouts((current) => {
          const next = { ...current };
          const sourceBoxes = parsed.boxes ?? current;
          Object.keys(current).forEach((key) => {
            if (parsed.boxLayouts[key]) {
              next[key] = clampLayout(key, parsed.boxLayouts[key], sourceBoxes);
            }
          });
          Object.keys(parsed.boxLayouts).forEach((key) => {
            if (!next[key] && parsed.boxLayouts[key]) {
              next[key] = clampLayout(key, parsed.boxLayouts[key], sourceBoxes);
            }
          });
          return next;
        });
      }

      if (parsed.boxes) {
        setBoxes(parsed.boxes);
      }

      if (parsed.boxOrder) {
        setBoxOrder(parsed.boxOrder);
      }

      if (parsed.currentUser?.name && parsed.currentUser?.team) {
        setCurrentUser(parsed.currentUser);
        setAccountName(parsed.currentUser.name);
        setAccountTeam(parsed.currentUser.team);
        setAccountRole(parsed.currentUser.role ?? mockUser.role);
        setAccountVacationDays(parsed.currentUser.vacationDays ?? mockUser.vacationDays);
        setAccountBio(parsed.currentUser.bio ?? mockUser.bio);
      }

      if (parsed.channels) {
        setChannels(parsed.channels.map(ensureChannelShape));
        if (parsed.channels[0]?.id) {
          setSelectedChannelId(parsed.channels[0].id);
        }
      }

      if (parsed.leaves) {
        setLeaves(parsed.leaves);
      }

      if (parsed.approvals) {
        setApprovals(parsed.approvals);
      }

      if (parsed.meetings) {
        setMeetings(parsed.meetings);
      }

      if (parsed.approvalTemplates) {
        setApprovalTemplates(parsed.approvalTemplates);
      }

      if (parsed.teamMemberList) {
        setTeamMemberList(parsed.teamMemberList);
      }

      if (parsed.teamRoles) {
        setTeamRoles(parsed.teamRoles);
      }

      if (parsed.memberProfiles) {
        setMemberProfiles(parsed.memberProfiles);
      }

      if (typeof parsed.customBoxCount === "number") {
        setCustomBoxCount(parsed.customBoxCount);
      }

      if (parsed.menuDock) {
        setMenuDock(parsed.menuDock);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!isCustomizeOpen) return;

    setDraftBoxes(boxes);
    setDraftBoxOrder(boxOrder);
    setDraftBoxLayouts(boxLayouts);
    setDraftCustomBoxCount(customBoxCount);
    setDraftSelectedBoxKey(selectedBoxKey);
    setDraggedBoxKey(null);
    setResizeState(null);
    setIsPresetMenuOpen(false);
  }, [isCustomizeOpen, boxes, boxOrder, boxLayouts, customBoxCount, selectedBoxKey]);

  useEffect(() => {
    if (!approvals.some((approval) => approval.id === selectedApprovalId) && approvals[0]) {
      setSelectedApprovalId(approvals[0].id);
    }
  }, [approvals, selectedApprovalId]);

  useEffect(() => {
    if (!selectedMemberName) return;

    const profile = memberProfiles[selectedMemberName];
    if (!profile) return;

    setSelectedMemberDraft({
      team: profile.team || "",
      role: profile.role || "\uD300\uC6D0",
      vacationDays: profile.vacationDays || "0\uC77C",
      bio: profile.bio || "",
    });
  }, [selectedMemberName, memberProfiles]);

  const selectedChannel = useMemo(
    () => channels.find((channel) => channel.id === selectedChannelId) ?? channels[0],
    [selectedChannelId, channels]
  );
  const selectedApproval = useMemo(
    () => approvals.find((approval) => approval.id === selectedApprovalId) ?? approvals[0],
    [selectedApprovalId, approvals]
  );
  const selectedMemberProfile = useMemo(
    () => (selectedMemberName ? memberProfiles[selectedMemberName] : null),
    [selectedMemberName, memberProfiles]
  );
  const canManageApprovals = useMemo(
    () => ["\uB9AC\uB4DC", "\uD300\uC7A5", "\uAD00\uB9AC\uC790"].some((keyword) => currentUser.role.includes(keyword)),
    [currentUser.role]
  );
  const canManageChannels = useMemo(
    () => ["\uB9AC\uB4DC", "\uD300\uC7A5", "\uAD00\uB9AC\uC790"].some((keyword) => currentUser.role.includes(keyword)),
    [currentUser.role]
  );
  const selectedChannelRole = useMemo(() => {
    if (!selectedChannel) return null;
    return selectedChannel.memberRoles?.[currentUser.name] || null;
  }, [selectedChannel, currentUser.name]);
  const canManageSelectedChannel = useMemo(() => {
    if (!selectedChannel) return false;
    return canManageChannels || selectedChannelRole === "\uBC29\uC7A5" || selectedChannelRole === "\uAD00\uB9AC";
  }, [selectedChannel, selectedChannelRole, canManageChannels]);
  const canSendSelectedChannelMessage = useMemo(() => {
    if (!selectedChannel) return false;
    return ["\uBC29\uC7A5", "\uAD00\uB9AC", "\uCC38\uC5EC"].includes(selectedChannelRole || "");
  }, [selectedChannel, selectedChannelRole]);
  const canEditSelectedMemberProfile = useMemo(() => {
    if (!selectedMemberName) return false;
    return canManageChannels || selectedMemberName === currentUser.name;
  }, [selectedMemberName, canManageChannels, currentUser.name]);
  const sortedChannels = useMemo(
    () =>
      [...channels].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
        return a.name.localeCompare(b.name, "ko");
      }),
    [channels]
  );
  const groupedMembers = useMemo(() => {
    const groups = {
      "\uAD00\uB9AC": [],
      "\uB9AC\uB354": [],
      "\uD300\uC6D0": [],
    };

    teamMemberList.forEach((member) => {
      const role = teamRoles[member] || "\uD300\uC6D0";
      if (role.includes("\uAD00\uB9AC")) {
        groups["\uAD00\uB9AC"].push(member);
      } else if (role.includes("\uB9AC\uB4DC") || role.includes("\uD300\uC7A5")) {
        groups["\uB9AC\uB354"].push(member);
      } else {
        groups["\uD300\uC6D0"].push(member);
      }
    });

    return groups;
  }, [teamMemberList, teamRoles]);
  const filteredApprovals = useMemo(() => {
    const query = approvalSearch.trim().toLowerCase();
    if (!query) return approvals;
    return approvals.filter(
      (approval) =>
        approval.title.toLowerCase().includes(query) ||
        approval.requester.toLowerCase().includes(query) ||
        approval.department.toLowerCase().includes(query)
    );
  }, [approvals, approvalSearch]);
  const filteredMeetings = useMemo(() => {
    const query = meetingSearch.trim().toLowerCase();
    if (!query) return meetings;
    return meetings.filter(
      (meeting) =>
        meeting.title.toLowerCase().includes(query) ||
        meeting.room.toLowerCase().includes(query) ||
        meeting.attendees.join(" ").toLowerCase().includes(query)
    );
  }, [meetings, meetingSearch]);
  const filteredMessages = useMemo(() => {
    if (!selectedChannel) return [];
    const query = chatSearch.trim().toLowerCase();
    if (!query) return selectedChannel.messages;
    return selectedChannel.messages.filter(
      (message) =>
        message.text.toLowerCase().includes(query) ||
        message.sender.toLowerCase().includes(query) ||
        (message.attachmentName || "").toLowerCase().includes(query)
    );
  }, [selectedChannel, chatSearch]);
  const notifications = useMemo(() => {
    const items = [
      ...approvals.slice(0, 5).map((approval) => ({
        id: `approval-${approval.id}`,
        type: "approval",
        title: approval.title,
        detail: `${approval.requester} · ${approval.status}`,
        time: approval.requestedAt,
      })),
      ...meetings.slice(0, 5).map((meeting) => ({
        id: `meeting-${meeting.id}`,
        type: "meeting",
        title: meeting.title,
        detail: `${meeting.date} ${meeting.time}`,
        time: `${meeting.date} ${meeting.time}`,
      })),
      ...leaves.slice(0, 5).map((leave) => ({
        id: `leave-${leave.id}`,
        type: "vacation",
        title: `${leave.member} ${leave.type}`,
        detail: leave.status,
        time: leave.start,
      })),
      ...channels
        .filter((channel) => channel.unread > 0)
        .map((channel) => ({
          id: `chat-${channel.id}`,
          type: "chat",
          title: channel.name,
          detail: `${channel.unread}\uAC1C \uC548 \uC77D\uC740 \uBA54\uC2DC\uC9C0`,
          time: channel.messages[channel.messages.length - 1]?.time || "",
        })),
    ];

    const filtered = notificationFilter === "all" ? items : items.filter((item) => item.type === notificationFilter);
    return filtered.slice(0, 12);
  }, [approvals, meetings, leaves, channels, notificationFilter]);

  const today = "2026-03-13";
  const todaySchedules = useMemo(() => mockSchedules.filter((item) => item.date === today), [today]);
  const upcomingLeaves = useMemo(() => leaves.filter((item) => item.start >= today).slice(0, 3), [today, leaves]);
  const boxTypeSupportsContent = (type) => ["note", "checklist", "links"].includes(type);
  const applyUIPreset = (preset) => {
    if (preset === "classic-messenger") {
      setDraftBoxes(classicMessengerBoxes);
      setDraftBoxOrder(classicMessengerBoxOrder);
      setDraftBoxLayouts(classicMessengerLayouts);
      setDraftCustomBoxCount(0);
      setDraftSelectedBoxKey("profile");
      return;
    }

    setDraftBoxes(defaultBoxes);
    setDraftBoxOrder(defaultBoxOrder);
    setDraftBoxLayouts(defaultLayouts);
    setDraftCustomBoxCount(0);
    setDraftSelectedBoxKey(defaultBoxOrder[0]);
  };

  const getBoxRule = (key, sourceBoxes = boxes) => {
    const base = getLayoutRule(sourceBoxes[key]?.type || key);
    if (sourceBoxes[key]) {
      return {
        ...base,
        minW: sourceBoxes[key].minW ?? base.minW,
        minH: sourceBoxes[key].minH ?? base.minH,
      };
    }
    return base;
  };

  const clampBoxLayout = (key, layout, sourceBoxes = boxes) => {
    const rule = getBoxRule(key, sourceBoxes);
    const width = Math.max(rule.minW, Math.min(rule.maxW, layout.w));
    const height = Math.max(rule.minH, Math.min(rule.maxH, layout.h));

    return {
      ...layout,
      x: Math.max(0, Math.min(GRID_COLUMNS - width, layout.x)),
      y: Math.max(0, Math.min(GRID_ROWS - height, layout.y)),
      w: width,
      h: height,
    };
  };

  const constrainBoxResize = (key, nextLayout, currentLayouts, ruleOverride, sourceBoxes = boxes, order = boxOrder) => {
    const rule = ruleOverride ?? getBoxRule(key, sourceBoxes);
    const base = {
      ...nextLayout,
      x: currentLayouts[key].x,
      y: currentLayouts[key].y,
      w: Math.max(rule.minW, Math.min(rule.maxW, nextLayout.w)),
      h: Math.max(rule.minH, Math.min(rule.maxH, nextLayout.h)),
    };

    const maxWidth = GRID_COLUMNS - base.x;
    const maxHeight = GRID_ROWS - base.y;

    let best = {
      ...base,
      w: Math.min(base.w, maxWidth),
      h: Math.min(base.h, maxHeight),
    };

    const collides = (candidate) =>
      order.some((otherKey) => otherKey !== key && intersects(candidate, currentLayouts[otherKey]));

    while (collides(best) && (best.w > rule.minW || best.h > rule.minH)) {
      if (best.w > rule.minW) {
        best = { ...best, w: best.w - 1 };
        if (!collides(best)) break;
      }

      if (best.h > rule.minH) {
        best = { ...best, h: best.h - 1 };
      }
    }

    if (collides(best)) {
      return currentLayouts[key];
    }

    return best;
  };

  const handleLogin = () => {
    if (loginId === "admin" && loginPassword === "admin") {
      setLoginError("");
      setIsLoggedIn(true);
      return;
    }

    setLoginError("\uC544\uC774\uB514 \uB610\uB294 \uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
  };

  const normalizeLayouts = (nextLayouts, changedKey, sourceBoxes = boxes, order = boxOrder) => {
    const draft = { ...nextLayouts, [changedKey]: clampBoxLayout(changedKey, nextLayouts[changedKey], sourceBoxes) };
    return resolveCollisions(changedKey, draft, order);
  };

  const moveBoxToPoint = (dragKey, clientX, clientY) => {
    if (!dragKey || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const nextX = Math.min(
      GRID_COLUMNS - draftBoxLayouts[dragKey].w,
      Math.max(0, Math.floor(((clientX - rect.left) / rect.width) * GRID_COLUMNS))
    );
    const nextY = Math.min(
      GRID_ROWS - draftBoxLayouts[dragKey].h,
      Math.max(0, Math.floor(((clientY - rect.top) / rect.height) * GRID_ROWS))
    );

    setDraftBoxLayouts((current) =>
      normalizeLayouts(
        {
          ...current,
          [dragKey]: { ...current[dragKey], x: nextX, y: nextY },
        },
        dragKey,
        draftBoxes,
        draftBoxOrder
      )
    );
  };

  const resizeBoxToPoint = (key, clientX, clientY, mode = "both") => {
    if (!key || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const layout = draftBoxLayouts[key];
    const rule = getBoxRule(key, draftBoxes);
    const nextW =
      mode === "height"
        ? layout.w
        : Math.max(
            rule.minW,
            Math.min(
              GRID_COLUMNS - layout.x,
              Math.ceil(((clientX - rect.left) / rect.width) * GRID_COLUMNS) - layout.x
            )
          );
    const nextH =
      mode === "width"
        ? layout.h
        : Math.max(
            rule.minH,
            Math.min(
              GRID_ROWS - layout.y,
              Math.ceil(((clientY - rect.top) / rect.height) * GRID_ROWS) - layout.y
            )
          );

    setDraftBoxLayouts((current) => ({
      ...current,
      [key]: constrainBoxResize(key, { ...current[key], w: nextW, h: nextH }, current, undefined, draftBoxes, draftBoxOrder),
    }));
  };

  useEffect(() => {
    if (!resizeState) return undefined;

    const handleMouseMove = (event) => {
      resizeBoxToPoint(resizeState.key, event.clientX, event.clientY, resizeState.mode);
    };

    const handleMouseUp = () => {
      setResizeState(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizeState, draftBoxLayouts, draftBoxes, draftBoxOrder]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        boxes,
        boxOrder,
        boxLayouts,
        currentUser,
        customBoxCount,
        menuDock,
        channels,
        leaves,
        approvals,
        meetings,
        approvalTemplates,
        teamMemberList,
        teamRoles,
        memberProfiles,
      })
    );
  }, [
    boxes,
    boxOrder,
    boxLayouts,
    currentUser,
    customBoxCount,
    menuDock,
    channels,
    leaves,
    approvals,
    meetings,
    approvalTemplates,
    teamMemberList,
    teamRoles,
    memberProfiles,
  ]);

  const orderedBoxes = useMemo(
    () => boxOrder.map((key) => ({ key, ...boxes[key] })).filter((box) => box.visible),
    [boxOrder, boxes]
  );

  const renderBoxBody = (key) => {
    const boxType = boxes[key]?.type || "note";

    if (boxType === "profile") {
      return (
        <>
          <div className="profile-card-body">
            <div className="profile-row">
              <span>{"\uC774\uB984"}</span>
              <strong>{currentUser.name}</strong>
            </div>
            <div className="profile-row">
              <span>{"\uC18C\uC18D"}</span>
              <strong>{currentUser.team}</strong>
            </div>
            <div className="profile-row">
              <span>{"\uC9C1\uAE09"}</span>
              <strong>{currentUser.role}</strong>
            </div>
            <div className="profile-row">
              <span>{"\uD734\uAC00 \uC77C\uC218"}</span>
              <strong>{currentUser.vacationDays}</strong>
            </div>
            <div className="profile-bio">
              <span>{"\uB0B4 \uC18C\uAC1C"}</span>
              <p>{currentUser.bio}</p>
            </div>
            <button className="secondary profile-logout" onClick={() => setIsLoggedIn(false)}>
              {"\uB85C\uADF8\uC544\uC6C3"}
            </button>
          </div>
        </>
      );
    }

    if (boxType === "channels") {
      return (
        <ul className="channel-list">
          {sortedChannels.map((channel) => (
            <li key={channel.id}>
              <div className={selectedChannelId === channel.id ? "channel-item active" : "channel-item"}>
                <button type="button" className="channel-main" onClick={() => openChatChannel(channel.id)}>
                  <span>{`${channel.pinned ? "📌 " : ""}${channel.favorite ? "★ " : ""}${channel.name}`}</span>
                  {channel.unread > 0 ? <em>{channel.unread}</em> : null}
                </button>
                <div className="channel-tools">
                  <button type="button" className="mini-button" onClick={() => toggleChannelFlag(channel.id, "pinned")}>
                    {"\uACE0\uC815"}
                  </button>
                  <button type="button" className="mini-button" onClick={() => toggleChannelFlag(channel.id, "favorite")}>
                    {"\uC990\uACA8\uCC3E\uAE30"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    if (boxType === "conversation") {
      return (
        <>
          <div className="chat-head">
            <strong>{selectedChannel.name}</strong>
            <span>{"3월 16일 월요일"}</span>
          </div>
          <ul className="message-list">
            {selectedChannel.messages.map((message) => (
              <li key={message.id}>
                <div className="meta">
                  <strong>{message.sender}</strong>
                  <time>{message.time}</time>
                </div>
                <p>{message.text}</p>
              </li>
            ))}
          </ul>
        </>
      );
    }

    if (boxType === "schedules") {
      return todaySchedules.length > 0 ? (
        <ul className="simple-list">
          {todaySchedules.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
              </div>
              <div className="right-align">
                <span>{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">{"오늘 등록된 일정이 없습니다."}</p>
      );
    }

    if (boxType === "leaves") {
      return (
        <ul className="simple-list">
          {upcomingLeaves.map((leave) => (
            <li key={leave.id}>
              <div>
                <strong>{leave.member}</strong>
                <span>{leave.type}</span>
              </div>
              <div className="right-align">
                <span>{leave.start === leave.end ? leave.start : `${leave.start} ~ ${leave.end}`}</span>
                <strong className={leave.status === "\uC2B9\uC778" ? "ok" : "pending"}>{leave.status}</strong>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    if (boxType === "checklist") {
        const items = parseChecklistItems(boxes[key].content);

        return (
          <ul className="custom-checklist">
            {items.length > 0 ? (
              items.map((item, index) => (
                <li key={`${key}-check-${index}`}>
                  <button
                    type="button"
                    className={item.checked ? "check-dot checked" : "check-dot"}
                    onClick={() => toggleChecklistItem(key, index)}
                  />
                  <span className={item.checked ? "check-text checked" : "check-text"}>{item.label}</span>
                </li>
              ))
            ) : (
              <li className="muted">{"\uCCB4\uD06C\uB9AC\uC2A4\uD2B8 \uD56D\uBAA9\uC744 \uC785\uB825\uD558\uC138\uC694."}</li>
            )}
          </ul>
        );
    }

    if (boxType === "links") {
        const links = (boxes[key].content || "")
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

        return (
          <ul className="custom-links">
            {links.length > 0 ? (
              links.map((item, index) => (
                <li key={`${key}-link-${index}`}>
                  <a href={item} target="_blank" rel="noreferrer">
                    {item}
                  </a>
                </li>
              ))
            ) : (
              <li className="muted">{"URL\uC744 \uD55C \uC904\uC529 \uC785\uB825\uD558\uC138\uC694."}</li>
            )}
          </ul>
        );
    }

    return (
      <div className="custom-box-body">
        <p className="desc">{boxes[key].content || "\uC0AC\uC6A9\uC790\uAC00 \uCD94\uAC00\uD55C \uCEE4\uC2A4\uD140 \uBC15\uC2A4\uC785\uB2C8\uB2E4."}</p>
        <p className="muted">{"\uC124\uC815 \uCC3D\uC5D0\uC11C \uBC15\uC2A4 \uC774\uB984\uACFC \uB0B4\uC6A9\uC744 \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4."}</p>
      </div>
    );
  };

  const renderDashboardBox = (key, title) => (
    <section
      key={key}
      className={`card dashboard-box box-${key}`}
      style={{
        gridColumn: `${boxLayouts[key].x + 1} / span ${boxLayouts[key].w}`,
        gridRow: `${boxLayouts[key].y + 1} / span ${boxLayouts[key].h}`,
        borderTop: `4px solid ${boxes[key].color || "#0f766e"}`,
      }}
    >
      <div className="box-header">
        <div className="box-title-wrap">
          <span className="box-icon" style={{ background: boxes[key].color || "#0f766e" }}>
            {boxes[key].icon || "BX"}
          </span>
          <h2>{title}</h2>
        </div>
      </div>
      {renderBoxBody(key)}
    </section>
  );

  const openFeature = (feature) => {
    setIsSettingsOpen(false);
    if (feature === "chat") {
      setChannels((current) =>
        current.map((channel) =>
          channel.id === selectedChannelId
            ? {
                ...channel,
                unread: 0,
                messages: channel.messages.map((message) => ({
                  ...message,
                  readBy: message.readBy?.includes(currentUser.name)
                    ? message.readBy
                    : [...(message.readBy || []), currentUser.name],
                })),
              }
            : channel
        )
      );
    }
    setActiveFeature(feature);
  };

  const closeFeature = () => {
    setActiveFeature(null);
  };

  const openMemberProfile = (member) => {
    if (!memberProfiles[member]) return;
    setSelectedMemberName(member);
  };

  const openChatChannel = (channelId) => {
    setSelectedChannelId(channelId);
    setChannels((current) =>
      current.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              unread: 0,
              messages: channel.messages.map((message) => ({
                ...message,
                readBy: message.readBy?.includes(currentUser.name)
                  ? message.readBy
                  : [...(message.readBy || []), currentUser.name],
              })),
            }
          : channel
      )
    );
  };

  const toggleChannelFlag = (channelId, field) => {
    setChannels((current) =>
      current.map((channel) => (channel.id === channelId ? { ...channel, [field]: !channel[field] } : channel))
    );
  };

  const handleVacationSubmit = () => {
    const nextLeave = {
      id: `l${Date.now()}`,
      member: currentUser.name,
      type: vacationRequest.type,
      start: vacationRequest.start,
      end: vacationRequest.end,
      status: "\uB300\uAE30",
    };

    setLeaves((current) => [nextLeave, ...current]);
    setVacationRequest((current) => ({ ...current, start: current.start, end: current.start }));
  };

  const updateApprovalStatus = (approvalId, status) => {
    setApprovals((current) =>
      current.map((approval) =>
        approval.id === approvalId
          ? {
              ...approval,
              status,
              comment:
                status === "\uC2B9\uC778"
                  ? "\uACB0\uC7AC \uC2B9\uC778 \uCC98\uB9AC\uB428"
                  : "\uBCF4\uC644 \uD6C4 \uC7AC\uC0C1\uC2E0 \uD544\uC694",
              history: [
                ...(approval.history || []),
                {
                  id: `h${Date.now()}`,
                  text: status === "\uC2B9\uC778" ? "\uACB0\uC7AC \uC2B9\uC778 \uCC98\uB9AC" : "\uACB0\uC7AC \uBC18\uB824 \uCC98\uB9AC",
                  time: "2026-03-16 10:00",
                },
              ],
            }
          : approval
      )
    );
  };

  const updateApprovalComment = (approvalId, comment) => {
    setApprovals((current) =>
      current.map((approval) => (approval.id === approvalId ? { ...approval, comment } : approval))
    );
  };

  const applyApprovalTemplate = (templateId) => {
    const template = approvalTemplates.find((item) => item.id === templateId);
    if (!template) return;

    setApprovalDraft((current) => ({
      ...current,
      title: template.title,
      document: template.document,
      approvalLine: template.approvalLine,
    }));
  };

  const handleApprovalSubmit = () => {
    if (!approvalDraft.title.trim()) return;

    setApprovals((current) => [
      {
        id: `a${Date.now()}`,
        title: approvalDraft.title.trim(),
        requester: approvalDraft.requester.trim() || currentUser.name,
        department: approvalDraft.department.trim() || currentUser.team,
        requestedAt: "2026-03-16 09:00",
        status: "\uB300\uAE30",
        document: approvalDraft.document.trim() || "\uC0C1\uC138 \uBB38\uC11C \uB0B4\uC6A9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
        attachmentName: approvalDraft.attachmentName.trim() || null,
        comment: "",
        approvalLine: approvalDraft.approvalLine,
        history: [{ id: `h${Date.now()}`, text: "\uACB0\uC7AC \uC0C1\uC2E0 \uB4F1\uB85D", time: "2026-03-16 09:00" }],
      },
      ...current,
    ]);
    setApprovalDraft((current) => ({
      ...current,
      title: "",
      document: "",
      attachmentName: "",
      approvalLine: ["\uD300\uC7A5", "\uBCF8\uBD80\uC7A5"],
    }));
  };

  const toggleMeetingAttendee = (member) => {
    setMeetingDraft((current) => ({
      ...current,
      attendees: current.attendees.includes(member)
        ? current.attendees.filter((item) => item !== member)
        : [...current.attendees, member],
    }));
  };

  const handleMeetingSubmit = () => {
    if (!meetingDraft.title.trim()) return;

    setMeetings((current) =>
      editingMeetingId
        ? current.map((meeting) =>
            meeting.id === editingMeetingId
              ? {
                  ...meeting,
                  title: meetingDraft.title.trim(),
                  room: meetingDraft.room,
                  date: meetingDraft.date,
                  time: meetingDraft.time,
                  attendees: meetingDraft.attendees.length > 0 ? meetingDraft.attendees : [currentUser.name],
                  attendance: Object.fromEntries(
                    (meetingDraft.attendees.length > 0 ? meetingDraft.attendees : [currentUser.name]).map((member) => [
                      member,
                      meeting.attendance?.[member] || "\uBBF8\uC751\uB2F5",
                    ])
                  ),
                }
              : meeting
          )
        : [
            {
              id: `mt${Date.now()}`,
              title: meetingDraft.title.trim(),
              room: meetingDraft.room,
              date: meetingDraft.date,
              time: meetingDraft.time,
              attendees: meetingDraft.attendees.length > 0 ? meetingDraft.attendees : [currentUser.name],
              attendance: Object.fromEntries(
                (meetingDraft.attendees.length > 0 ? meetingDraft.attendees : [currentUser.name]).map((member) => [
                  member,
                  "\uBBF8\uC751\uB2F5",
                ])
              ),
            },
            ...current,
          ]
    );
    setMeetingDraft((current) => ({ ...current, title: "", attendees: [currentUser.name] }));
    setEditingMeetingId(null);
  };

  const editMeeting = (meetingId) => {
    const meeting = meetings.find((item) => item.id === meetingId);
    if (!meeting) return;

    setEditingMeetingId(meetingId);
    setMeetingDraft({
      title: meeting.title,
      room: meeting.room,
      date: meeting.date,
      time: meeting.time,
      attendees: meeting.attendees,
    });
  };

  const removeMeeting = (meetingId) => {
    setMeetings((current) => current.filter((meeting) => meeting.id !== meetingId));
    if (editingMeetingId === meetingId) {
      setEditingMeetingId(null);
      setMeetingDraft({
        title: "",
        room: "\uD68C\uC758\uC2E4 A",
        date: "2026-03-18",
        time: "10:00",
        attendees: [currentUser.name],
      });
    }
  };

  const updateMeetingAttendance = (meetingId, member, status) => {
    setMeetings((current) =>
      current.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              attendance: {
                ...(meeting.attendance || {}),
                [member]: status,
              },
            }
          : meeting
      )
    );
  };

  const addTeamMember = () => {
    const name = memberNameDraft.trim();
    if (!name || teamMemberList.includes(name)) return;

    setTeamMemberList((current) => [...current, name]);
    setTeamRoles((current) => ({ ...current, [name]: memberRoleDraft }));
    setMemberProfiles((current) => ({
      ...current,
      [name]: {
        team: currentUser.team,
        role: memberRoleDraft,
        vacationDays: "0\uC77C",
        bio: "\uC0C8 \uBA64\uBC84 \uD504\uB85C\uD544\uC785\uB2C8\uB2E4.",
      },
    }));
    setMemberNameDraft("");
    setMemberRoleDraft("\uD300\uC6D0");
  };

  const updateTeamRole = (member, role) => {
    setTeamRoles((current) => ({ ...current, [member]: role }));
    setMemberProfiles((current) => ({
      ...current,
      [member]: {
        ...(current[member] || {
          team: currentUser.team,
          vacationDays: "0\uC77C",
          bio: "",
        }),
        role,
      },
    }));
  };

  const updateSelectedMemberDraftField = (field, value) => {
    setSelectedMemberDraft((current) => ({ ...current, [field]: value }));
  };

  const saveSelectedMemberProfile = () => {
    if (!selectedMemberName || !canEditSelectedMemberProfile) return;

    setMemberProfiles((current) => ({
      ...current,
      [selectedMemberName]: {
        ...(current[selectedMemberName] || {}),
        team: selectedMemberDraft.team,
        role: selectedMemberDraft.role,
        vacationDays: selectedMemberDraft.vacationDays,
        bio: selectedMemberDraft.bio,
      },
    }));

    setTeamRoles((current) => ({
      ...current,
      [selectedMemberName]: selectedMemberDraft.role,
    }));

    if (selectedMemberName === currentUser.name) {
      setCurrentUser((current) => ({
        ...current,
        team: selectedMemberDraft.team,
        role: selectedMemberDraft.role,
        vacationDays: selectedMemberDraft.vacationDays,
        bio: selectedMemberDraft.bio,
      }));
      setAccountTeam(selectedMemberDraft.team);
      setAccountRole(selectedMemberDraft.role);
      setAccountVacationDays(selectedMemberDraft.vacationDays);
      setAccountBio(selectedMemberDraft.bio);
    }

    setSelectedMemberName(null);
  };

  const removeTeamMember = (member) => {
    if (member === currentUser.name) return;
    setTeamMemberList((current) => current.filter((item) => item !== member));
    setTeamRoles((current) => {
      const next = { ...current };
      delete next[member];
      return next;
    });
    setMemberProfiles((current) => {
      const next = { ...current };
      delete next[member];
      return next;
    });
  };

  const createChannel = () => {
    const name = newChannelName.trim();
    if (!name) return;

    const nextChannel = {
      id: `c${Date.now()}`,
      name,
      unread: 0,
      pinned: false,
      favorite: false,
      owner: currentUser.name,
      members: [currentUser.name],
      memberRoles: {
        [currentUser.name]: "\uBC29\uC7A5",
      },
      messages: [
        createSystemMessage(`${name} \uCC44\uD305\uBC29\uC774 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`),
      ],
    };

    setChannels((current) => [nextChannel, ...current]);
    setSelectedChannelId(nextChannel.id);
    setNewChannelName("");
  };

  const removeChannel = (channelId) => {
    setChannels((current) => {
      const next = current.filter((channel) => channel.id !== channelId);
      if (selectedChannelId === channelId && next[0]) {
        setSelectedChannelId(next[0].id);
      }
      return next;
    });
  };

  const saveApprovalTemplate = () => {
    const label = templateNameDraft.trim();
    if (!label || !approvalDraft.title.trim()) return;

    setApprovalTemplates((current) => [
      ...current,
      {
        id: `tpl-${Date.now()}`,
        label,
        title: approvalDraft.title.trim(),
        document: approvalDraft.document.trim() || "\uC0C1\uC138 \uBB38\uC11C",
        approvalLine: approvalDraft.approvalLine || ["\uD300\uC7A5"],
      },
    ]);
    setTemplateNameDraft("");
  };

  const removeApprovalTemplate = (templateId) => {
    setApprovalTemplates((current) => current.filter((template) => template.id !== templateId));
  };

  const inviteMemberToChannel = () => {
    if (!selectedChannel || !channelInviteDraft.trim() || !canManageSelectedChannel) return;

    const member = channelInviteDraft.trim();
    setChannels((current) =>
      current.map((channel) =>
        channel.id === selectedChannel.id
          ? {
              ...channel,
              members: channel.members?.includes(member) ? channel.members : [...(channel.members || []), member],
              memberRoles: {
                ...(channel.memberRoles || {}),
                [channel.owner]: "\uBC29\uC7A5",
                [member]: channel.memberRoles?.[member] || "\uCC38\uC5EC",
              },
              messages: [
                ...channel.messages,
                createSystemMessage(`${member}\uB2D8\uC744 \uCC44\uD305\uBC29\uC5D0 \uCD08\uB300\uD588\uC2B5\uB2C8\uB2E4.`),
              ],
            }
          : channel
      )
    );
    setChannelInviteDraft("");
  };

  const updateChannelOwner = (channelId, nextOwner) => {
    if (!canManageSelectedChannel) return;

    setChannels((current) =>
      current.map((channel) => {
        if (channel.id !== channelId) return channel;

        return {
          ...channel,
          owner: nextOwner,
          members: channel.members?.includes(nextOwner) ? channel.members : [...(channel.members || []), nextOwner],
          memberRoles: {
            ...(channel.memberRoles || {}),
            [channel.owner]: channel.owner === nextOwner ? "\uBC29\uC7A5" : "\uAD00\uB9AC",
            [nextOwner]: "\uBC29\uC7A5",
          },
          messages: [...channel.messages, createSystemMessage(`${nextOwner}\uB2D8\uC774 \uC0C8 \uBC29\uC7A5\uC73C\uB85C \uC9C0\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`)],
        };
      })
    );
  };

  const updateChannelMemberRole = (channelId, member, role) => {
    if (!canManageSelectedChannel) return;

    setChannels((current) =>
      current.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              memberRoles: {
                ...(channel.memberRoles || {}),
                [channel.owner]: "\uBC29\uC7A5",
                [member]: role,
              },
            }
          : channel
      )
    );
  };

  const removeChannelMember = (channelId, member) => {
    if (!canManageSelectedChannel) return;

    setChannels((current) =>
      current.map((channel) => {
        if (channel.id !== channelId || channel.owner === member) return channel;

        const nextRoles = { ...(channel.memberRoles || {}) };
        delete nextRoles[member];

        return {
          ...channel,
          members: (channel.members || []).filter((item) => item !== member),
          memberRoles: nextRoles,
          messages: [...channel.messages, createSystemMessage(`${member}\uB2D8\uC774 \uCC44\uD305\uBC29\uC5D0\uC11C \uC81C\uAC70\uB418\uC5C8\uC2B5\uB2C8\uB2E4.`)],
        };
      })
    );
  };

  const handleSendMessage = () => {
    if (!chatDraft.trim() || !selectedChannel || !canSendSelectedChannelMessage) return;

    setChannels((current) =>
      current.map((channel) =>
        channel.id === selectedChannel.id
          ? {
              ...channel,
              messages: [
                ...channel.messages,
                {
                  id: `m${Date.now()}`,
                  sender: currentUser.name,
                  text: chatDraft.trim(),
                  time: "09:30",
                  readBy: [currentUser.name],
                  replyTo: replyTarget ? { sender: replyTarget.sender, text: replyTarget.text } : null,
                  attachmentName: chatAttachmentName.trim() || null,
                },
              ],
            }
          : channel
      )
    );
    setChatDraft("");
    setChatAttachmentName("");
    setReplyTarget(null);
  };

  const handleAccountSave = () => {
    const previousName = currentUser.name;
    const nextName = accountName.trim() || previousName;

    setCurrentUser((current) => ({
      ...current,
      name: nextName,
      team: accountTeam,
      role: accountRole,
      vacationDays: accountVacationDays,
      bio: accountBio,
    }));
    setIsAccountOpen(false);
    setAccountName(nextName);
    setMemberProfiles((current) => {
      const next = { ...current };
      if (previousName !== nextName) {
        delete next[previousName];
      }
      next[nextName] = {
        team: accountTeam,
        role: accountRole,
        vacationDays: accountVacationDays,
        bio: accountBio,
      };
      return next;
    });
    setTeamRoles((current) => {
      const next = { ...current };
      if (previousName !== nextName) {
        delete next[previousName];
      }
      next[nextName] = accountRole;
      return next;
    });
    setTeamMemberList((current) => current.map((member) => (member === previousName ? nextName : member)));
    setChannels((current) =>
      current.map((channel) => {
        const nextMembers = (channel.members || []).map((member) => (member === previousName ? nextName : member));
        const nextMemberRoles = Object.fromEntries(
          Object.entries(channel.memberRoles || {}).map(([member, role]) => [member === previousName ? nextName : member, role])
        );

        return ensureChannelShape({
          ...channel,
          owner: channel.owner === previousName ? nextName : channel.owner,
          members: nextMembers,
          memberRoles: nextMemberRoles,
          messages: channel.messages.map((message) => ({
            ...message,
            sender: message.sender === previousName ? nextName : message.sender,
            readBy: (message.readBy || []).map((member) => (member === previousName ? nextName : member)),
            replyTo: message.replyTo
              ? {
                  ...message.replyTo,
                  sender: message.replyTo.sender === previousName ? nextName : message.replyTo.sender,
                }
              : null,
          })),
        });
      })
    );
  };

  const addCustomBox = () => {
    const nextCount = draftCustomBoxCount + 1;
    const key = `${CUSTOM_BOX_PREFIX}${nextCount}`;
    const title = `\uCEE4\uC2A4\uD140 \uBC15\uC2A4 ${nextCount}`;
    const nextOrder = [...draftBoxOrder, key];

    setDraftBoxes((current) => ({
      ...current,
      [key]: {
        title,
        visible: true,
        content: "\uC0C8 \uCEE4\uC2A4\uD140 \uBC15\uC2A4\uC758 \uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694.",
        icon: "CB",
        color: "#ef4444",
        type: "note",
        minW: 6,
        minH: 3,
      },
    }));
    setDraftBoxOrder(nextOrder);
    setDraftBoxLayouts((current) => {
      const draft = {
        ...current,
        [key]: { x: 0, y: 0, w: 8, h: 4 },
      };
      return {
        ...draft,
        [key]: findOpenSpot(key, draft, nextOrder),
      };
    });
    setDraftCustomBoxCount(nextCount);
    setDraftSelectedBoxKey(key);
  };

  const updateCustomBox = (key, field, value) => {
    setDraftBoxes((current) => ({
      ...current,
      [key]: {
        ...current[key],
        [field]: value,
      },
    }));
  };

  const updateCustomMinSize = (key, field, value) => {
    const numericValue = field === "minW" ? Math.max(2, value) : Math.max(1, value);

    setDraftBoxes((current) => ({
      ...current,
      [key]: {
        ...current[key],
        [field]: numericValue,
      },
    }));

    setDraftBoxLayouts((current) => ({
      ...current,
      [key]: constrainBoxResize(key, current[key], current, {
        ...getBoxRule(key, draftBoxes),
        [field]: numericValue,
      }, draftBoxes, draftBoxOrder),
    }));
  };

  const toggleChecklistItem = (key, index) => {
    const items = parseChecklistItems(draftBoxes[key].content);
    const nextItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, checked: !item.checked } : item
    );

    updateCustomBox(
      key,
      "content",
      nextItems.map((item) => `[${item.checked ? "x" : " "}] ${item.label}`).join("\n")
    );
  };

  const duplicateBox = (key) => {
    const nextCount = draftCustomBoxCount + 1;
    const nextKey = `${CUSTOM_BOX_PREFIX}${nextCount}`;
    const sourceBox = draftBoxes[key];
    const sourceLayout = draftBoxLayouts[key];
    const preferredLayout = {
      ...sourceLayout,
      x: Math.min(sourceLayout.x + 1, GRID_COLUMNS - sourceLayout.w),
    };
    const previewLayouts = {
      ...draftBoxLayouts,
      [nextKey]: preferredLayout,
    };
    const nextOrder = [...draftBoxOrder, nextKey];
    const openSpot = findOpenSpotFromPosition(nextKey, previewLayouts, nextOrder, preferredLayout.x, preferredLayout.y);

    if (!openSpot) {
      return;
    }

    setDraftBoxes((current) => ({
      ...current,
      [nextKey]: {
        ...sourceBox,
        title: `${sourceBox.title} \uBCF5\uC0AC`,
      },
    }));
    setDraftBoxOrder(nextOrder);
    setDraftBoxLayouts((current) => {
      return {
        ...current,
        [nextKey]: openSpot,
      };
    });
    setDraftCustomBoxCount(nextCount);
    setDraftSelectedBoxKey(nextKey);
  };

  const removeBox = (key) => {
    setDraftBoxes((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    setDraftBoxOrder((current) => current.filter((item) => item !== key));
    setDraftBoxLayouts((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
    const nextSelectable = draftBoxOrder.find((item) => item !== key) ?? null;
    setDraftSelectedBoxKey(nextSelectable);
  };

  if (!isLoggedIn) {
    return (
      <main className="login-shell">
        <section className="login-panel">
          <p className="eyebrow">Web MVP</p>
          <h1>Team Collab Messenger</h1>
          <p className="desc">{"\uB85C\uADF8\uC778 \uD6C4 \uD300 \uCC44\uD305, \uC624\uB298 \uC77C\uC815, \uD734\uAC00 \uD604\uD669\uC744 \uD55C \uD654\uBA74\uC5D0\uC11C \uD655\uC778\uD569\uB2C8\uB2E4."}</p>
          <div className="login-form">
            <label>
              <span>{"\uC0AC\uBC88"}</span>
              <input type="text" value={loginId} onChange={(event) => setLoginId(event.target.value)} />
            </label>
            <label>
              <span>{"\uBE44\uBC00\uBC88\uD638"}</span>
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
              />
            </label>
            {loginError ? <p className="login-error">{loginError}</p> : null}
            <button className="primary login-submit" onClick={handleLogin}>
              {"\uB85C\uADF8\uC778"}
            </button>
          </div>
        </section>
      </main>
    );
  }

  const selectedBox = draftSelectedBoxKey ? draftBoxes[draftSelectedBoxKey] : null;
  const selectedRule = draftSelectedBoxKey ? getBoxRule(draftSelectedBoxKey, draftBoxes) : null;
  const dockArrow = {
    top: isSettingsOpen ? "\u25B2" : "\u25BC",
    right: isSettingsOpen ? "\u25B6" : "\u25C0",
    bottom: isSettingsOpen ? "\u25BC" : "\u25B2",
    left: isSettingsOpen ? "\u25C0" : "\u25B6",
  }[menuDock];

  return (
    <>
      <div className={`quick-menu dock-${menuDock}${isSettingsOpen ? " menu-open" : ""}`}>
        <button className="quick-menu-toggle" onClick={() => setIsSettingsOpen((open) => !open)}>
          {dockArrow}
        </button>
        <div className={`quick-menu-panel ${isSettingsOpen ? "open" : "closed"}`}>
            <button className="settings-item menu-action" title={"\uD734\uAC00"} onClick={() => openFeature("vacation")}>
              <MenuIcon type="vacation" />
              <span>{"\uD734\uAC00"}</span>
            </button>
            {canManageApprovals ? (
              <button className="settings-item menu-action" title={"\uACB0\uC7AC"} onClick={() => openFeature("approval")}>
                <MenuIcon type="approval" />
                <span>{"\uACB0\uC7AC"}</span>
              </button>
            ) : null}
            <button className="settings-item menu-action" title={"\uCC44\uD305\uBC29"} onClick={() => openFeature("chat")}>
              <MenuIcon type="chat" />
              <span>{"\uCC44\uD305\uBC29"}</span>
            </button>
            <button className="settings-item menu-action" title={"\uC54C\uB9BC"} onClick={() => openFeature("notifications")}>
              <MenuIcon type="notification" />
              <span>{"\uC54C\uB9BC"}</span>
            </button>
            <button className="settings-item menu-action" title={"\uD68C\uC758\uBC29"} onClick={() => openFeature("meeting")}>
              <MenuIcon type="meeting" />
              <span>{"\uD68C\uC758\uBC29"}</span>
            </button>
            <button
              className="settings-item menu-action"
              title={"\uC124\uC815"}
              onClick={() => {
                setIsSettingsOpen(false);
                setIsMenuSettingsOpen(true);
              }}
            >
              <MenuIcon type="settings" />
              <span>{"\uC124\uC815"}</span>
            </button>
            <button
              className="settings-item menu-action"
              title={"\uACC4\uC815 \uC815\uBCF4 \uC218\uC815"}
              onClick={() => {
                setIsSettingsOpen(false);
                setIsAccountOpen(true);
              }}
            >
              <MenuIcon type="account" />
              <span>{"\uACC4\uC815"}</span>
            </button>
            <button
              className="settings-item menu-action"
              title={"UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5"}
              onClick={() => {
                setIsSettingsOpen(false);
                setIsCustomizeOpen(true);
              }}
            >
              <MenuIcon type="customize" />
              <span>{"UI"}</span>
            </button>
            <button
              className="settings-item danger menu-action"
              title={"\uB85C\uADF8\uC544\uC6C3"}
              onClick={() => {
                setIsSettingsOpen(false);
                setIsLoggedIn(false);
              }}
            >
              <MenuIcon type="close" />
              <span>{"\uB85C\uADF8\uC544\uC6C3"}</span>
            </button>
        </div>
      </div>

      <main className="app-shell main-page-shell">
        <section className="dashboard-grid-layout">
          {orderedBoxes.map((box) => renderDashboardBox(box.key, box.title))}
        </section>
      </main>

      {isCustomizeOpen ? (
        <div className="modal-backdrop" onClick={() => setIsCustomizeOpen(false)}>
          <section className="customize-modal" onClick={(event) => event.stopPropagation()}>
            <div className="customize-modal-head">
              <div>
                <p className="eyebrow">Settings</p>
                <h2>{"UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5"}</h2>
              </div>
              <div className="modal-actions">
                <div className="preset-menu-wrap">
                  <button className="ghost-button" onClick={() => setIsPresetMenuOpen((open) => !open)}>
                    {"\uD504\uB9AC\uC14B"}
                  </button>
                  {isPresetMenuOpen ? (
                    <div className="preset-menu-card">
                      {uiPresets.map((preset) => (
                        <button
                          key={preset.value}
                          className="preset-menu-item"
                          title={preset.description}
                          onClick={() => {
                            applyUIPreset(preset.value);
                            setIsPresetMenuOpen(false);
                          }}
                        >
                          <strong>{preset.label}</strong>
                          <span>{preset.description}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    applyUIPreset("minimal");
                    setIsPresetMenuOpen(false);
                  }}
                >
                  {"\uCD08\uAE30\uD654"}
                </button>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setIsPresetMenuOpen(false);
                    setIsCustomizeOpen(false);
                  }}
                >
                  {"\uB2EB\uAE30"}
                </button>
              </div>
            </div>
            <p className="muted">
              {"\uBC15\uC2A4\uB97C \uB9C8\uC6B0\uC2A4\uB85C \uB04C\uC5B4 \uC6D0\uD558\uB294 \uC704\uCE58\uC5D0 \uB193\uC73C\uBA74 \uBA54\uC778\uD398\uC774\uC9C0 \uBC30\uCE58\uAC00 \uBC14\uB85C \uBC18\uC601\uB429\uB2C8\uB2E4."}
            </p>
            <div className="customize-workspace">
              <div
                ref={previewRef}
                className="customize-preview-grid"
                onDragOver={(event) => {
                  event.preventDefault();
                  moveBoxToPoint(draggedBoxKey, event.clientX, event.clientY);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  moveBoxToPoint(draggedBoxKey, event.clientX, event.clientY);
                  setDraggedBoxKey(null);
                }}
              >
                {draftBoxOrder.map((key) => (
                  <div
                    key={key}
                    draggable
                    className={`preview-box box-${key}${draggedBoxKey === key ? " dragging" : ""}${draftSelectedBoxKey === key ? " selected" : ""}`}
                    style={{
                      left: `${(draftBoxLayouts[key].x / GRID_COLUMNS) * 100}%`,
                      top: `${(draftBoxLayouts[key].y / GRID_ROWS) * 100}%`,
                      width: `${(draftBoxLayouts[key].w / GRID_COLUMNS) * 100}%`,
                      height: `${(draftBoxLayouts[key].h / GRID_ROWS) * 100}%`,
                    }}
                    onClick={() => setDraftSelectedBoxKey(key)}
                    onDragStart={() => {
                      setDraftSelectedBoxKey(key);
                      setDraggedBoxKey(key);
                    }}
                    onDragEnd={() => setDraggedBoxKey(null)}
                  >
                    <strong>{draftBoxes[key].title}</strong>
                    <span>{"\uB04C\uC5B4\uC11C \uC704\uCE58 \uC774\uB3D9"}</span>
                    <div className="preview-box-meta">
                      <small>{`${draftBoxLayouts[key].w} x ${draftBoxLayouts[key].h}`}</small>
                    </div>
                    <button
                      type="button"
                      className="resize-handle resize-handle-width"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setDraftSelectedBoxKey(key);
                        setResizeState({ key, mode: "width" });
                      }}
                      aria-label={`${draftBoxes[key].title} resize width`}
                    />
                    <button
                      type="button"
                      className="resize-handle resize-handle-height"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setDraftSelectedBoxKey(key);
                        setResizeState({ key, mode: "height" });
                      }}
                      aria-label={`${draftBoxes[key].title} resize height`}
                    />
                    <button
                      type="button"
                      className="resize-handle resize-handle-corner"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setDraftSelectedBoxKey(key);
                        setResizeState({ key, mode: "both" });
                      }}
                      aria-label={`${draftBoxes[key].title} resize both`}
                    />
                  </div>
                ))}
              </div>

              <aside className="customize-sidebar">
                <div className="customize-sidebar-head">
                  <strong>{"\uBC15\uC2A4 \uC124\uC815"}</strong>
                  <button className="ghost-button" onClick={addCustomBox}>
                    {"\uCEE4\uC2A4\uD140 \uBC15\uC2A4 \uCD94\uAC00"}
                  </button>
                </div>

                {selectedBox ? (
                  <section className="custom-box-editor">
                    <div className="custom-box-editor-head">
                      <strong>{selectedBox.title}</strong>
                      <div className="editor-actions">
                        <button className="settings-item" onClick={() => duplicateBox(draftSelectedBoxKey)}>
                          {"\uBCF5\uC81C"}
                        </button>
                        <button className="settings-item danger" onClick={() => removeBox(draftSelectedBoxKey)}>
                          {"\uC0AD\uC81C"}
                        </button>
                      </div>
                    </div>
                    <label>
                      <span>{"\uBC15\uC2A4 \uC774\uB984"}</span>
                      <input
                        type="text"
                        value={selectedBox.title}
                        onChange={(event) => updateCustomBox(draftSelectedBoxKey, "title", event.target.value)}
                      />
                    </label>
                    <div className="custom-box-inline">
                      <label>
                        <span>{"\uC544\uC774\uCF58"}</span>
                        <input
                          type="text"
                          maxLength={2}
                          value={selectedBox.icon || ""}
                          onChange={(event) => updateCustomBox(draftSelectedBoxKey, "icon", event.target.value.toUpperCase())}
                        />
                      </label>
                      <label>
                        <span>{"\uC0C9\uC0C1"}</span>
                        <input
                          type="color"
                          value={selectedBox.color || "#0f766e"}
                          onChange={(event) => updateCustomBox(draftSelectedBoxKey, "color", event.target.value)}
                        />
                      </label>
                    </div>
                    <div className="custom-box-inline">
                      <label>
                        <span>{"\uCD5C\uC18C \uB108\uBE44"}</span>
                        <input
                          type="number"
                          min={2}
                          max={GRID_COLUMNS}
                          value={selectedBox.minW ?? selectedRule.minW}
                          onChange={(event) =>
                            updateCustomMinSize(
                              draftSelectedBoxKey,
                              "minW",
                              Math.max(2, Number(event.target.value) || selectedRule.minW)
                            )
                          }
                        />
                      </label>
                      <label>
                        <span>{"\uCD5C\uC18C \uB192\uC774"}</span>
                        <input
                          type="number"
                          min={1}
                          max={GRID_ROWS}
                          value={selectedBox.minH ?? selectedRule.minH}
                          onChange={(event) =>
                            updateCustomMinSize(
                              draftSelectedBoxKey,
                              "minH",
                              Math.max(1, Number(event.target.value) || selectedRule.minH)
                            )
                          }
                        />
                      </label>
                    </div>
                    <label>
                      <span>{"\uBC15\uC2A4 \uD0C0\uC785"}</span>
                      <select
                        value={selectedBox.type || "note"}
                        onChange={(event) => updateCustomBox(draftSelectedBoxKey, "type", event.target.value)}
                      >
                        {boxTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    {boxTypeSupportsContent(selectedBox.type) ? (
                      <label>
                        <span>{"\uBC15\uC2A4 \uB0B4\uC6A9"}</span>
                        <textarea
                          value={selectedBox.content || ""}
                          onChange={(event) => updateCustomBox(draftSelectedBoxKey, "content", event.target.value)}
                          rows={6}
                          placeholder={
                            selectedBox.type === "checklist"
                              ? "\uD56D\uBAA9\uC744 \uD55C \uC904\uC529 \uC785\uB825"
                              : selectedBox.type === "links"
                                ? "https://example.com"
                                : "\uBA54\uBAA8 \uB0B4\uC6A9 \uC785\uB825"
                          }
                        />
                      </label>
                    ) : null}
                  </section>
                ) : null}
              </aside>
            </div>
            <div className="account-actions">
              <button
                className="ghost-button"
                onClick={() => {
                  setIsPresetMenuOpen(false);
                  setIsCustomizeOpen(false);
                }}
              >
                {"\uCDE8\uC18C"}
              </button>
              <button
                className="primary"
                onClick={() => {
                  setBoxes(draftBoxes);
                  setBoxOrder(draftBoxOrder);
                  setBoxLayouts(draftBoxLayouts);
                  setCustomBoxCount(draftCustomBoxCount);
                  setSelectedBoxKey(draftSelectedBoxKey ?? defaultBoxOrder[0]);
                  setIsPresetMenuOpen(false);
                  setIsCustomizeOpen(false);
                }}
              >
                {"\uC800\uC7A5"}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isAccountOpen ? (
        <div className="modal-backdrop" onClick={() => setIsAccountOpen(false)}>
          <section className="customize-modal account-modal" onClick={(event) => event.stopPropagation()}>
            <div className="customize-modal-head">
              <div>
                <p className="eyebrow">Account</p>
                <h2>{"\uACC4\uC815 \uC815\uBCF4 \uC218\uC815"}</h2>
              </div>
              <button className="ghost-button" onClick={() => setIsAccountOpen(false)}>
                {"\uB2EB\uAE30"}
              </button>
            </div>
            <div className="account-form">
              <label>
                <span>{"\uC774\uB984"}</span>
                <input type="text" value={accountName} onChange={(event) => setAccountName(event.target.value)} />
              </label>
              <label>
                <span>{"\uD300"}</span>
                <input type="text" value={accountTeam} onChange={(event) => setAccountTeam(event.target.value)} />
              </label>
              <label>
                <span>{"\uC9C1\uAE09"}</span>
                <input type="text" value={accountRole} onChange={(event) => setAccountRole(event.target.value)} />
              </label>
              <label>
                <span>{"\uD734\uAC00 \uC77C\uC218"}</span>
                <input
                  type="text"
                  value={accountVacationDays}
                  onChange={(event) => setAccountVacationDays(event.target.value)}
                />
              </label>
              <label>
                <span>{"\uB0B4 \uC18C\uAC1C"}</span>
                <textarea rows={4} value={accountBio} onChange={(event) => setAccountBio(event.target.value)} />
              </label>
            </div>
            <div className="account-actions">
              <button className="secondary" onClick={() => setIsAccountOpen(false)}>
                {"\uCDE8\uC18C"}
              </button>
              <button className="primary" onClick={handleAccountSave}>
                {"\uC800\uC7A5"}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isMenuSettingsOpen ? (
        <div className="modal-backdrop" onClick={() => setIsMenuSettingsOpen(false)}>
          <section className="customize-modal account-modal" onClick={(event) => event.stopPropagation()}>
            <div className="customize-modal-head">
              <div>
                <p className="eyebrow">Menu</p>
                <h2>{"\uBA54\uB274 \uBC14 \uC124\uC815"}</h2>
              </div>
              <button className="ghost-button" onClick={() => setIsMenuSettingsOpen(false)}>
                {"\uB2EB\uAE30"}
              </button>
            </div>
            <div className="settings-shell">
              <aside className="settings-sidebar">
                <button
                  className={`settings-nav-item ${menuSettingsSection === "all" ? "active" : ""}`}
                  onClick={() => setMenuSettingsSection("all")}
                >
                  {"\uBAA8\uB450"}
                </button>
                <button
                  className={`settings-nav-item ${menuSettingsSection === "menu-bar" ? "active" : ""}`}
                  onClick={() => setMenuSettingsSection("menu-bar")}
                >
                  {"\uBA54\uB274\uBC14"}
                </button>
                <button
                  className={`settings-nav-item ${menuSettingsSection === "ui-customize" ? "active" : ""}`}
                  onClick={() => setMenuSettingsSection("ui-customize")}
                >
                  {"UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5"}
                </button>
                <button
                  className={`settings-nav-item ${menuSettingsSection === "members" ? "active" : ""}`}
                  onClick={() => setMenuSettingsSection("members")}
                >
                  {"\uC0AC\uC6A9\uC790/\uAD8C\uD55C"}
                </button>
              </aside>
              <div className="settings-content">
                <div className="settings-section">
                  <h3>
                    {menuSettingsSection === "all"
                      ? "\uC804\uCCB4 \uC635\uC158"
                      : menuSettingsSection === "menu-bar"
                        ? "\uBA54\uB274\uBC14 \uC635\uC158"
                        : menuSettingsSection === "members"
                          ? "\uC0AC\uC6A9\uC790/\uAD8C\uD55C"
                        : "UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5"}
                  </h3>
                  <p>
                    {menuSettingsSection === "all"
                      ? "\uC124\uC815 \uD56D\uBAA9 \uC804\uCCB4\uB97C \uD55C \uACF3\uC5D0\uC11C \uBCFC \uC218 \uC788\uB3C4\uB85D \uAD6C\uC131\uD588\uC2B5\uB2C8\uB2E4."
                      : menuSettingsSection === "menu-bar"
                        ? "\uBA54\uB274\uBC14 \uC704\uCE58\uC640 \uD45C\uC2DC \uBC29\uC2DD\uC744 \uC870\uC815\uD558\uB294 \uC601\uC5ED\uC785\uB2C8\uB2E4."
                        : menuSettingsSection === "members"
                          ? "\uD300 \uBA64\uBC84\uC640 \uAD8C\uD55C \uAD00\uB9AC \uC601\uC5ED\uC785\uB2C8\uB2E4."
                        : "\uBC15\uC2A4 \uBC30\uCE58\uC640 \uD06C\uAE30\uB97C \uC870\uC815\uD558\uB294 \uD3B8\uC9D1 \uD654\uBA74\uC744 \uC5F4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."}
                  </p>
                </div>

                {menuSettingsSection === "all" ? (
                  <div className="settings-shortcuts">
                    <button
                      className="settings-shortcut-card"
                      onClick={() => {
                        setIsMenuSettingsOpen(false);
                        setIsAccountOpen(true);
                      }}
                    >
                      <strong>{"\uACC4\uC815 \uC815\uBCF4"}</strong>
                      <span>{`${currentUser.name} · ${currentUser.team}`}</span>
                    </button>
                    <button className="settings-shortcut-card" onClick={() => setMenuSettingsSection("menu-bar")}>
                      <strong>{"\uBA54\uB274\uBC14"}</strong>
                      <span>{menuDockOptions.find((option) => option.value === menuDock)?.label}</span>
                    </button>
                    <button
                      className="settings-shortcut-card"
                      onClick={() => {
                        setIsMenuSettingsOpen(false);
                        setIsCustomizeOpen(true);
                      }}
                    >
                      <strong>{"UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5"}</strong>
                      <span>{`${boxOrder.length}\uAC1C \uBC15\uC2A4 \uC0AC\uC6A9 \uC911`}</span>
                    </button>
                  </div>
                ) : null}

                {menuSettingsSection === "menu-bar" ? (
                  <div className="account-form settings-form">
                    <label>
                      <span>{"\uBA54\uB274 \uC704\uCE58"}</span>
                      <select value={menuDock} onChange={(event) => setMenuDock(event.target.value)}>
                        {menuDockOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : null}

                {menuSettingsSection === "ui-customize" ? (
                  <div className="settings-section">
                    <button
                      className="primary settings-launch-button"
                      onClick={() => {
                        setIsMenuSettingsOpen(false);
                        setIsCustomizeOpen(true);
                      }}
                    >
                      {"UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5 \uC5F4\uAE30"}
                    </button>
                  </div>
                ) : null}

                {menuSettingsSection === "members" ? (
                  <div className="settings-section">
                    <div className="account-form settings-form">
                      <label>
                        <span>{"\uC774\uB984"}</span>
                        <input type="text" value={memberNameDraft} onChange={(event) => setMemberNameDraft(event.target.value)} />
                      </label>
                      <label>
                        <span>{"\uAD8C\uD55C"}</span>
                        <select value={memberRoleDraft} onChange={(event) => setMemberRoleDraft(event.target.value)}>
                          <option value={"\uD300\uC6D0"}>{"\uD300\uC6D0"}</option>
                          <option value={"\uB9AC\uB4DC"}>{"\uB9AC\uB4DC"}</option>
                          <option value={"\uD300\uC7A5"}>{"\uD300\uC7A5"}</option>
                          <option value={"\uAD00\uB9AC\uC790"}>{"\uAD00\uB9AC\uC790"}</option>
                        </select>
                      </label>
                      <button className="primary settings-launch-button" onClick={addTeamMember}>
                        {"\uBA64\uBC84 \uCD94\uAC00"}
                      </button>
                    </div>
                    <ul className="simple-list compact-list">
                      {teamMemberList.map((member) => (
                        <li key={member}>
                          <div>
                            <strong>{member}</strong>
                          </div>
                          <div className="right-align">
                            <select
                              value={teamRoles[member] || "\uD300\uC6D0"}
                              onChange={(event) => updateTeamRole(member, event.target.value)}
                            >
                              <option value={"\uD300\uC6D0"}>{"\uD300\uC6D0"}</option>
                              <option value={"\uB9AC\uB4DC"}>{"\uB9AC\uB4DC"}</option>
                              <option value={"\uD300\uC7A5"}>{"\uD300\uC7A5"}</option>
                              <option value={"\uAD00\uB9AC\uC790"}>{"\uAD00\uB9AC\uC790"}</option>
                            </select>
                            {member !== currentUser.name ? (
                              <button className="secondary" onClick={() => removeTeamMember(member)}>
                                {"\uC0AD\uC81C"}
                              </button>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="org-board">
                      {Object.entries(groupedMembers).map(([group, members]) => (
                        <div key={group} className="org-column">
                          <strong>{group}</strong>
                          <div className="member-picker">
                            {members.map((member) => (
                              <button
                                key={`${group}-${member}`}
                                className="attendance-chip"
                                onClick={() => openMemberProfile(member)}
                              >
                                {member}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="account-actions">
              <button className="primary" onClick={() => setIsMenuSettingsOpen(false)}>
                {"\uC644\uB8CC"}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {activeFeature ? (
        <div className="modal-backdrop" onClick={closeFeature}>
          <section className="customize-modal feature-modal" onClick={(event) => event.stopPropagation()}>
            <div className="customize-modal-head">
              <div>
                <p className="eyebrow">Workspace</p>
                <h2>
                  {activeFeature === "vacation"
                    ? "\uD734\uAC00"
                    : activeFeature === "approval"
                      ? "\uACB0\uC7AC"
                      : activeFeature === "chat"
                        ? "\uCC44\uD305\uBC29"
                        : activeFeature === "notifications"
                          ? "\uC54C\uB9BC \uC13C\uD130"
                          : "\uD68C\uC758\uBC29"}
                </h2>
              </div>
              <button className="ghost-button" onClick={closeFeature}>
                {"\uB2EB\uAE30"}
              </button>
            </div>

            {activeFeature === "vacation" ? (
              <div className="feature-grid">
                <section className="feature-card">
                  <h3>{"\uD734\uAC00 \uC2E0\uCCAD"}</h3>
                  <div className="account-form settings-form">
                    <label>
                      <span>{"\uC885\uB958"}</span>
                      <select
                        value={vacationRequest.type}
                        onChange={(event) => setVacationRequest((current) => ({ ...current, type: event.target.value }))}
                      >
                        <option value={"\uC5F0\uCC28"}>{"\uC5F0\uCC28"}</option>
                        <option value={"\uC624\uC804 \uBC18\uCC28"}>{"\uC624\uC804 \uBC18\uCC28"}</option>
                        <option value={"\uC624\uD6C4 \uBC18\uCC28"}>{"\uC624\uD6C4 \uBC18\uCC28"}</option>
                      </select>
                    </label>
                    <label>
                      <span>{"\uC2DC\uC791\uC77C"}</span>
                      <input
                        type="date"
                        value={vacationRequest.start}
                        onChange={(event) =>
                          setVacationRequest((current) => ({ ...current, start: event.target.value, end: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      <span>{"\uC885\uB8CC\uC77C"}</span>
                      <input
                        type="date"
                        value={vacationRequest.end}
                        onChange={(event) => setVacationRequest((current) => ({ ...current, end: event.target.value }))}
                      />
                    </label>
                    <button className="primary settings-launch-button" onClick={handleVacationSubmit}>
                      {"\uD734\uAC00 \uC2E0\uCCAD \uB4F1\uB85D"}
                    </button>
                  </div>
                </section>
                <section className="feature-card">
                  <h3>{"\uD734\uAC00 \uD604\uD669"}</h3>
                  <ul className="simple-list">
                    {leaves.map((leave) => (
                      <li key={leave.id}>
                        <div>
                          <strong>{leave.member}</strong>
                          <span>{leave.type}</span>
                        </div>
                        <div className="right-align">
                          <span>{leave.start === leave.end ? leave.start : `${leave.start} ~ ${leave.end}`}</span>
                          <strong className={leave.status === "\uC2B9\uC778" ? "ok" : "pending"}>{leave.status}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : null}

            {activeFeature === "approval" ? (
              <div className="feature-grid">
                <section className="feature-card">
                  <h3>{"\uACB0\uC7AC \uC0C1\uC2E0"}</h3>
                  <div className="template-list">
                    {approvalTemplates.map((template) => (
                      <div key={template.id} className="template-chip-row">
                        <button className="attendance-chip" onClick={() => applyApprovalTemplate(template.id)}>
                          {template.label}
                        </button>
                        <button className="mini-button" onClick={() => removeApprovalTemplate(template.id)}>
                          {"\uC0AD\uC81C"}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="account-form settings-form">
                    <label>
                      <span>{"\uC81C\uBAA9"}</span>
                      <input
                        type="text"
                        value={approvalDraft.title}
                        onChange={(event) => setApprovalDraft((current) => ({ ...current, title: event.target.value }))}
                      />
                    </label>
                    <label>
                      <span>{"\uC2E0\uCCAD\uC790"}</span>
                      <input
                        type="text"
                        value={approvalDraft.requester}
                        onChange={(event) => setApprovalDraft((current) => ({ ...current, requester: event.target.value }))}
                      />
                    </label>
                    <label>
                      <span>{"\uC0C1\uC138 \uBB38\uC11C"}</span>
                      <textarea
                        rows={5}
                        value={approvalDraft.document}
                        onChange={(event) => setApprovalDraft((current) => ({ ...current, document: event.target.value }))}
                      />
                    </label>
                    <label>
                      <span>{"\uCCA8\uBD80 \uBB38\uC11C"}</span>
                      <input
                        type="text"
                        value={approvalDraft.attachmentName}
                        onChange={(event) =>
                          setApprovalDraft((current) => ({ ...current, attachmentName: event.target.value }))
                        }
                      />
                    </label>
                    <div className="composer invite-row">
                      <input
                        type="text"
                        placeholder={"\uD15C\uD50C\uB9BF \uC774\uB984"}
                        value={templateNameDraft}
                        onChange={(event) => setTemplateNameDraft(event.target.value)}
                      />
                      <button className="secondary" onClick={saveApprovalTemplate}>
                        {"\uD15C\uD50C\uB9BF \uC800\uC7A5"}
                      </button>
                    </div>
                    <button className="primary settings-launch-button" onClick={handleApprovalSubmit}>
                      {"\uACB0\uC7AC \uC0C1\uC2E0"}
                    </button>
                  </div>
                </section>
                <section className="feature-card">
                  <h3>{"\uACB0\uC7AC \uBAA9\uB85D"}</h3>
                  <input
                    className="chat-search"
                    type="text"
                    placeholder={"\uACB0\uC7AC \uAC80\uC0C9"}
                    value={approvalSearch}
                    onChange={(event) => setApprovalSearch(event.target.value)}
                  />
                  <div className="approval-layout">
                    <ul className="simple-list">
                      {filteredApprovals.map((approval) => (
                        <li key={approval.id}>
                          <button className="approval-item" onClick={() => setSelectedApprovalId(approval.id)}>
                            <div>
                              <strong>{approval.title}</strong>
                              <span>{`${approval.requester} · ${approval.department}`}</span>
                            </div>
                            <div className="right-align">
                              <span>{approval.requestedAt}</span>
                              <strong
                                className={
                                  approval.status === "\uC2B9\uC778"
                                    ? "ok"
                                    : approval.status === "\uBC18\uB824"
                                      ? "danger-text"
                                      : "pending"
                                }
                              >
                                {approval.status}
                              </strong>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {selectedApproval ? (
                      <div className="approval-detail">
                        <strong>{selectedApproval.title}</strong>
                        <span>{`${selectedApproval.requester} · ${selectedApproval.department}`}</span>
                        <div className="approval-line">
                          {(selectedApproval.approvalLine || []).map((step) => (
                            <span key={`${selectedApproval.id}-${step}`} className="approval-step">
                              {step}
                            </span>
                          ))}
                        </div>
                        <p>{selectedApproval.document}</p>
                        {selectedApproval.attachmentName ? (
                          <div className="attachment-chip">{selectedApproval.attachmentName}</div>
                        ) : null}
                        <label>
                          <span>{"\uCC98\uB9AC \uBA54\uBAA8"}</span>
                          <textarea
                            rows={4}
                            value={selectedApproval.comment || ""}
                            onChange={(event) => updateApprovalComment(selectedApproval.id, event.target.value)}
                          />
                        </label>
                        {selectedApproval.status === "\uB300\uAE30" && canManageApprovals ? (
                          <div className="inline-actions">
                            <button className="secondary" onClick={() => updateApprovalStatus(selectedApproval.id, "\uC2B9\uC778")}>
                              {"\uC2B9\uC778"}
                            </button>
                            <button className="secondary" onClick={() => updateApprovalStatus(selectedApproval.id, "\uBC18\uB824")}>
                              {"\uBC18\uB824"}
                            </button>
                          </div>
                        ) : null}
                        <div className="approval-history">
                          <strong>{"\uCC98\uB9AC \uC774\uB825"}</strong>
                          <ul className="simple-list compact-list">
                            {(selectedApproval.history || []).map((entry) => (
                              <li key={entry.id}>
                                <div>
                                  <strong>{entry.text}</strong>
                                </div>
                                <div className="right-align">
                                  <span>{entry.time}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </section>
              </div>
            ) : null}

            {activeFeature === "chat" ? (
              <div className="feature-grid">
                <section className="feature-card">
                  <h3>{"\uCC44\uD305\uBC29 \uBAA9\uB85D"}</h3>
                  {canManageChannels ? (
                    <>
                      <div className="composer invite-row">
                        <input
                          type="text"
                          placeholder={"\uC0C8 \uCC44\uD305\uBC29 \uC774\uB984"}
                          value={newChannelName}
                          onChange={(event) => setNewChannelName(event.target.value)}
                        />
                        <button className="primary" onClick={createChannel}>
                          {"\uC0DD\uC131"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="muted">{"\uCC44\uD305\uBC29 \uAD00\uB9AC\uB294 \uB9AC\uB4DC \uC774\uC0C1 \uAD8C\uD55C\uC5D0\uC11C\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."}</p>
                  )}
                  <ul className="channel-list">
                    {sortedChannels.map((channel) => (
                      <li key={channel.id}>
                        <div className={selectedChannelId === channel.id ? "channel-item active" : "channel-item"}>
                          <button type="button" className="channel-main" onClick={() => openChatChannel(channel.id)}>
                            <span>{`${channel.pinned ? "📌 " : ""}${channel.favorite ? "★ " : ""}${channel.name}`}</span>
                            {channel.unread > 0 ? <em>{channel.unread}</em> : null}
                          </button>
                          <div className="channel-tools">
                            <button type="button" className="mini-button" onClick={() => toggleChannelFlag(channel.id, "pinned")}>
                              {"\uACE0\uC815"}
                            </button>
                            <button type="button" className="mini-button" onClick={() => toggleChannelFlag(channel.id, "favorite")}>
                              {"\uC990\uACA8\uCC3E\uAE30"}
                            </button>
                            {canManageChannels ? (
                              <button type="button" className="mini-button" onClick={() => removeChannel(channel.id)}>
                                {"\uC0AD\uC81C"}
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="feature-card">
                  <h3>{selectedChannel?.name || "\uCC44\uD305"}</h3>
                  {selectedChannel ? (
                    <>
                      <div className="chat-room-meta">
                        <span>{`${"\uBC29\uC7A5"}: ${selectedChannel.owner || currentUser.name}`}</span>
                        <div className="member-picker">
                          {(selectedChannel.members || []).map((member) => (
                            <button
                              key={`${selectedChannel.id}-${member}`}
                              className="attendance-chip"
                              onClick={() => openMemberProfile(member)}
                            >
                              {member}
                            </button>
                          ))}
                        </div>
                        {canManageSelectedChannel ? (
                          <div className="channel-admin-grid">
                            <label>
                              <span>{"\uBC29\uC7A5 \uBCC0\uACBD"}</span>
                              <select
                                value={selectedChannel.owner}
                                onChange={(event) => updateChannelOwner(selectedChannel.id, event.target.value)}
                              >
                                {(selectedChannel.members || []).map((member) => (
                                  <option key={`${selectedChannel.id}-owner-${member}`} value={member}>
                                    {member}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <div className="channel-member-board">
                              {(selectedChannel.members || []).map((member) => (
                                <div key={`${selectedChannel.id}-role-${member}`} className="channel-member-row">
                                  <button type="button" className="member-link" onClick={() => openMemberProfile(member)}>
                                    {member}
                                  </button>
                                  {member === selectedChannel.owner ? (
                                    <strong className="owner-badge">{"\uBC29\uC7A5"}</strong>
                                  ) : (
                                    <>
                                      <select
                                        value={selectedChannel.memberRoles?.[member] || "\uCC38\uC5EC"}
                                        onChange={(event) =>
                                          updateChannelMemberRole(selectedChannel.id, member, event.target.value)
                                        }
                                      >
                                        <option value={"\uAD00\uB9AC"}>{"\uAD00\uB9AC"}</option>
                                        <option value={"\uCC38\uC5EC"}>{"\uCC38\uC5EC"}</option>
                                        <option value={"\uC870\uD68C"}>{"\uC870\uD68C"}</option>
                                      </select>
                                      <button
                                        type="button"
                                        className="mini-button"
                                        onClick={() => removeChannelMember(selectedChannel.id, member)}
                                      >
                                        {"\uC81C\uAC70"}
                                      </button>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}
                        {canManageSelectedChannel ? (
                          <div className="composer invite-row">
                            <input
                              type="text"
                              placeholder={"\uCD08\uB300\uD560 \uBA64\uBC84 \uC774\uB984"}
                              value={channelInviteDraft}
                              onChange={(event) => setChannelInviteDraft(event.target.value)}
                            />
                            <button className="primary" onClick={inviteMemberToChannel}>
                              {"\uCD08\uB300"}
                            </button>
                          </div>
                        ) : (
                          <p className="muted">
                            {canSendSelectedChannelMessage
                              ? "\uD604\uC7AC \uCC44\uD305\uBC29\uC5D0\uC11C\uB294 \uBA54\uC2DC\uC9C0 \uC791\uC131\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."
                              : "\uC870\uD68C \uAD8C\uD55C\uC740 \uCC44\uD305 \uC77D\uAE30\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4."}
                          </p>
                        )}
                      </div>
                      <input
                        className="chat-search"
                        type="text"
                        placeholder={"\uBA54\uC2DC\uC9C0 \uAC80\uC0C9"}
                        value={chatSearch}
                        onChange={(event) => setChatSearch(event.target.value)}
                      />
                      <ul className="message-list">
                        {filteredMessages.map((message) => (
                          <li key={message.id}>
                            <div className="meta">
                              <strong>{message.sender}</strong>
                              <time>{message.time}</time>
                            </div>
                            {message.replyTo ? (
                              <div className="reply-chip">{`${message.replyTo.sender}: ${message.replyTo.text}`}</div>
                            ) : null}
                            <p>{message.text}</p>
                            {message.attachmentName ? <div className="attachment-chip">{message.attachmentName}</div> : null}
                            <small className="read-state">{`\uC77D\uC74C ${message.readBy?.length || 0}`}</small>
                            <div className="inline-actions">
                              <button className="secondary" onClick={() => setReplyTarget(message)}>
                                {"\uB2F5\uC7A5"}
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {replyTarget ? (
                        <div className="reply-banner">
                          <span>{`${replyTarget.sender}: ${replyTarget.text}`}</span>
                          <button className="ghost-button" onClick={() => setReplyTarget(null)}>
                            {"\uCDE8\uC18C"}
                          </button>
                        </div>
                      ) : null}
                      <div className="composer">
                        <input
                          type="text"
                          value={chatDraft}
                          disabled={!canSendSelectedChannelMessage}
                          onChange={(event) => setChatDraft(event.target.value)}
                        />
                        <input
                          type="text"
                          placeholder={"\uCCA8\uBD80 \uD30C\uC77C\uBA85"}
                          value={chatAttachmentName}
                          disabled={!canSendSelectedChannelMessage}
                          onChange={(event) => setChatAttachmentName(event.target.value)}
                        />
                        <button className="primary" onClick={handleSendMessage} disabled={!canSendSelectedChannelMessage}>
                          {"\uC804\uC1A1"}
                        </button>
                      </div>
                    </>
                  ) : null}
                </section>
              </div>
            ) : null}

            {activeFeature === "meeting" ? (
              <div className="feature-grid">
                <section className="feature-card">
                  <h3>{editingMeetingId ? "\uD68C\uC758 \uC218\uC815" : "\uD68C\uC758 \uC608\uC57D"}</h3>
                  <div className="account-form settings-form">
                    <label>
                      <span>{"\uD68C\uC758\uBA85"}</span>
                      <input
                        type="text"
                        value={meetingDraft.title}
                        onChange={(event) => setMeetingDraft((current) => ({ ...current, title: event.target.value }))}
                      />
                    </label>
                    <label>
                      <span>{"\uD68C\uC758\uC2E4"}</span>
                      <input
                        type="text"
                        value={meetingDraft.room}
                        onChange={(event) => setMeetingDraft((current) => ({ ...current, room: event.target.value }))}
                      />
                    </label>
                    <div className="custom-box-inline">
                      <label>
                        <span>{"\uB0A0\uC9DC"}</span>
                        <input
                          type="date"
                          value={meetingDraft.date}
                          onChange={(event) => setMeetingDraft((current) => ({ ...current, date: event.target.value }))}
                        />
                      </label>
                      <label>
                        <span>{"\uC2DC\uAC04"}</span>
                        <input
                          type="time"
                          value={meetingDraft.time}
                          onChange={(event) => setMeetingDraft((current) => ({ ...current, time: event.target.value }))}
                        />
                      </label>
                    </div>
                    <label>
                      <span>{"\uCC38\uC5EC\uC790"}</span>
                      <div className="member-picker">
                        {teamMemberList.map((member) => (
                          <label key={member} className="member-chip">
                            <input
                              type="checkbox"
                              checked={meetingDraft.attendees.includes(member)}
                              onChange={() => toggleMeetingAttendee(member)}
                            />
                            <span>{member}</span>
                          </label>
                        ))}
                      </div>
                    </label>
                    <button className="primary settings-launch-button" onClick={handleMeetingSubmit}>
                      {editingMeetingId ? "\uD68C\uC758 \uC800\uC7A5" : "\uD68C\uC758 \uB4F1\uB85D"}
                    </button>
                  </div>
                </section>
                <section className="feature-card">
                  <h3>{"\uC608\uC57D\uB41C \uD68C\uC758"}</h3>
                  <input
                    className="chat-search"
                    type="text"
                    placeholder={"\uD68C\uC758 \uAC80\uC0C9"}
                    value={meetingSearch}
                    onChange={(event) => setMeetingSearch(event.target.value)}
                  />
                  <ul className="simple-list">
                    {filteredMeetings.map((meeting) => (
                      <li key={meeting.id}>
                        <div>
                          <strong>{meeting.title}</strong>
                          <span>{`${meeting.room} · ${meeting.attendees.join(", ")}`}</span>
                          <div className="attendance-list">
                            {meeting.attendees.map((member) => (
                              <button
                                key={`${meeting.id}-${member}`}
                                className="attendance-chip"
                                onClick={() =>
                                  updateMeetingAttendance(
                                    meeting.id,
                                    member,
                                    meeting.attendance?.[member] === "\uCC38\uC11D"
                                      ? "\uC9C0\uAC01"
                                      : meeting.attendance?.[member] === "\uC9C0\uAC01"
                                        ? "\uBD88\uCC38"
                                        : meeting.attendance?.[member] === "\uBD88\uCC38"
                                          ? "\uBBF8\uC751\uB2F5"
                                          : "\uCC38\uC11D"
                                  )
                                }
                              >
                                {`${member} · ${meeting.attendance?.[member] || "\uBBF8\uC751\uB2F5"}`}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="right-align">
                          <span>{meeting.date}</span>
                          <strong>{meeting.time}</strong>
                          <div className="inline-actions">
                            <button className="secondary" onClick={() => editMeeting(meeting.id)}>
                              {"\uC218\uC815"}
                            </button>
                            <button className="secondary" onClick={() => removeMeeting(meeting.id)}>
                              {"\uC0AD\uC81C"}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : null}

            {activeFeature === "notifications" ? (
              <div className="feature-grid">
                <section className="feature-card">
                  <h3>{"\uD544\uD130"}</h3>
                  <div className="member-picker">
                    {[
                      ["all", "\uC804\uCCB4"],
                      ["approval", "\uACB0\uC7AC"],
                      ["meeting", "\uD68C\uC758"],
                      ["vacation", "\uD734\uAC00"],
                      ["chat", "\uCC44\uD305"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        className={notificationFilter === value ? "attendance-chip active-chip" : "attendance-chip"}
                        onClick={() => setNotificationFilter(value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </section>
                <section className="feature-card">
                  <h3>{"\uCD5C\uC2E0 \uC54C\uB9BC"}</h3>
                  <ul className="simple-list">
                    {notifications.map((item) => (
                      <li key={item.id}>
                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.detail}</span>
                        </div>
                        <div className="right-align">
                          <span>{item.type}</span>
                          <strong>{item.time}</strong>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}

      {selectedMemberName && selectedMemberProfile ? (
        <div className="modal-backdrop" onClick={() => setSelectedMemberName(null)}>
          <section className="customize-modal account-modal" onClick={(event) => event.stopPropagation()}>
            <div className="customize-modal-head">
              <div>
                <p className="eyebrow">Member</p>
                <h2>{selectedMemberName}</h2>
              </div>
              <button className="ghost-button" onClick={() => setSelectedMemberName(null)}>
                {"\uB2EB\uAE30"}
              </button>
            </div>
            <div className="member-profile-form">
              <div className="profile-card-body">
                <div className="profile-row">
                  <span>{"\uC774\uB984"}</span>
                  <strong>{selectedMemberName}</strong>
                </div>
              </div>
              <div className="account-form">
                <label>
                  <span>{"\uC18C\uC18D"}</span>
                  <input
                    type="text"
                    value={selectedMemberDraft.team}
                    disabled={!canEditSelectedMemberProfile}
                    onChange={(event) => updateSelectedMemberDraftField("team", event.target.value)}
                  />
                </label>
                <label>
                  <span>{"\uC9C1\uAE09"}</span>
                  <input
                    type="text"
                    value={selectedMemberDraft.role}
                    disabled={!canEditSelectedMemberProfile}
                    onChange={(event) => updateSelectedMemberDraftField("role", event.target.value)}
                  />
                </label>
                <label>
                  <span>{"\uD734\uAC00 \uC77C\uC218"}</span>
                  <input
                    type="text"
                    value={selectedMemberDraft.vacationDays}
                    disabled={!canEditSelectedMemberProfile}
                    onChange={(event) => updateSelectedMemberDraftField("vacationDays", event.target.value)}
                  />
                </label>
                <label>
                  <span>{"\uC790\uAE30 \uC18C\uAC1C"}</span>
                  <textarea
                    rows={4}
                    value={selectedMemberDraft.bio}
                    disabled={!canEditSelectedMemberProfile}
                    onChange={(event) => updateSelectedMemberDraftField("bio", event.target.value)}
                  />
                </label>
              </div>
              {!canEditSelectedMemberProfile ? (
                <p className="muted">
                  {"\uD604\uC7AC \uD504\uB85C\uD544\uC740 \uBCF8\uC778 \uB610\uB294 \uAD00\uB9AC \uAD8C\uD55C\uC5D0\uC11C\uB9CC \uC218\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."}
                </p>
              ) : null}
            </div>
            <div className="account-actions">
              <button className="secondary" onClick={() => setSelectedMemberName(null)}>
                {"\uCDE8\uC18C"}
              </button>
              <button className="primary" onClick={saveSelectedMemberProfile} disabled={!canEditSelectedMemberProfile}>
                {"\uC800\uC7A5"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
