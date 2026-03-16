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
    messages: [
      {
        id: "m1",
        sender: "\uC9C0\uD604",
        text: "\uC624\uB298 \uC2A4\uD504\uB9B0\uD2B8 \uB9AC\uBDF0 4\uC2DC\uC5D0 \uC9C4\uD589\uD574\uC694.",
        time: "09:10",
      },
      {
        id: "m2",
        sender: "\uBBFC\uC218",
        text: "\uB124, \uB370\uBAA8 \uC2DC\uB098\uB9AC\uC624 \uC815\uB9AC\uD574\uC11C \uACF5\uC720\uD560\uAC8C\uC694.",
        time: "09:12",
      },
      {
        id: "m3",
        sender: "\uD0DC\uD638",
        text: "API \uBC30\uD3EC\uB294 3\uC2DC \uC804\uC5D0 \uC644\uB8CC \uC608\uC815\uC785\uB2C8\uB2E4.",
        time: "09:14",
      },
    ],
  },
  {
    id: "c2",
    name: "\uB514\uC790\uC778-\uC2F1\uD06C",
    unread: 0,
    messages: [
      {
        id: "m4",
        sender: "\uC218\uC9C4",
        text: "\uC2E0\uADDC \uCC44\uD305 \uD654\uBA74 \uC2DC\uC548 \uC5C5\uB370\uC774\uD2B8\uD588\uC5B4\uC694.",
        time: "10:01",
      },
      {
        id: "m5",
        sender: "\uBBFC\uC218",
        text: "\uC810\uC2EC \uD6C4 \uD53C\uB4DC\uBC31 \uB4DC\uB9AC\uACA0\uC2B5\uB2C8\uB2E4.",
        time: "10:03",
      },
    ],
  },
  {
    id: "c3",
    name: "\uC6B4\uC601-\uACF5\uC9C0",
    unread: 1,
    messages: [
      {
        id: "m6",
        sender: "\uAD00\uB9AC\uC790",
        text: "\uB0B4\uC77C \uC624\uD6C4 2\uC2DC \uC2DC\uC2A4\uD15C \uC810\uAC80 \uC608\uC815\uC785\uB2C8\uB2E4.",
        time: "08:45",
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
  const [customBoxCount, setCustomBoxCount] = useState(0);
  const [selectedBoxKey, setSelectedBoxKey] = useState(defaultBoxOrder[0]);
  const [menuDock, setMenuDock] = useState("top");
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

  const selectedChannel = useMemo(
    () => mockChannels.find((channel) => channel.id === selectedChannelId) ?? mockChannels[0],
    [selectedChannelId]
  );

  const today = "2026-03-13";
  const todaySchedules = useMemo(() => mockSchedules.filter((item) => item.date === today), [today]);
  const upcomingLeaves = useMemo(() => mockLeaves.filter((item) => item.start >= today).slice(0, 3), [today]);
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
      })
    );
  }, [boxes, boxOrder, boxLayouts, currentUser, customBoxCount, menuDock]);

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
              <strong>{mockUser.role}</strong>
            </div>
            <div className="profile-row">
              <span>{"\uD734\uAC00 \uC77C\uC218"}</span>
              <strong>{mockUser.vacationDays}</strong>
            </div>
            <div className="profile-bio">
              <span>{"\uB0B4 \uC18C\uAC1C"}</span>
              <p>{mockUser.bio}</p>
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
          {mockChannels.map((channel) => (
            <li key={channel.id}>
              <button
                type="button"
                className={selectedChannelId === channel.id ? "channel-item active" : "channel-item"}
                onClick={() => setSelectedChannelId(channel.id)}
              >
                <span>{channel.name}</span>
                {channel.unread > 0 ? <em>{channel.unread}</em> : null}
              </button>
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
            <span>{"3월 13일 금요일"}</span>
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

  const handleAccountSave = () => {
    setCurrentUser((current) => ({
      ...current,
      name: accountName,
      team: accountTeam,
    }));
    setIsAccountOpen(false);
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
            <button className="settings-item menu-action" title={"\uD734\uAC00"}>
              <MenuIcon type="vacation" />
              <span>{"\uD734\uAC00"}</span>
            </button>
            <button className="settings-item menu-action" title={"\uACB0\uC7AC"}>
              <MenuIcon type="approval" />
              <span>{"\uACB0\uC7AC"}</span>
            </button>
            <button className="settings-item menu-action" title={"\uCC44\uD305\uBC29"}>
              <MenuIcon type="chat" />
              <span>{"\uCC44\uD305\uBC29"}</span>
            </button>
            <button className="settings-item menu-action" title={"\uD68C\uC758\uBC29"}>
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
              </aside>
              <div className="settings-content">
                <div className="settings-section">
                  <h3>
                    {menuSettingsSection === "all"
                      ? "\uC804\uCCB4 \uC635\uC158"
                      : menuSettingsSection === "menu-bar"
                        ? "\uBA54\uB274\uBC14 \uC635\uC158"
                        : "UI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5"}
                  </h3>
                  <p>
                    {menuSettingsSection === "all"
                      ? "\uC124\uC815 \uD56D\uBAA9 \uC804\uCCB4\uB97C \uD55C \uACF3\uC5D0\uC11C \uBCFC \uC218 \uC788\uB3C4\uB85D \uAD6C\uC131\uD588\uC2B5\uB2C8\uB2E4."
                      : menuSettingsSection === "menu-bar"
                        ? "\uBA54\uB274\uBC14 \uC704\uCE58\uC640 \uD45C\uC2DC \uBC29\uC2DD\uC744 \uC870\uC815\uD558\uB294 \uC601\uC5ED\uC785\uB2C8\uB2E4."
                        : "\uBC15\uC2A4 \uBC30\uCE58\uC640 \uD06C\uAE30\uB97C \uC870\uC815\uD558\uB294 \uD3B8\uC9D1 \uD654\uBA74\uC744 \uC5F4 \uC218 \uC788\uC2B5\uB2C8\uB2E4."}
                  </p>
                </div>

                {menuSettingsSection !== "ui-customize" ? (
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
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
