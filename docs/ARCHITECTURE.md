# Architecture Overview

## 서비스 구성
- API 서버: 인증, 채팅, 일정, 휴가, 알림
- 실시간 서버(WebSocket): 채팅/상태 이벤트
- DB: PostgreSQL
- 캐시/큐: Redis

## 앱 구성
- mobile: React Native(Expo)
- desktop: Electron + React
- shared: 공통 타입, API 스키마, 유틸

## 권장 모노레포
- package manager: pnpm
- 빌드: turborepo (선택)

## 주요 도메인
- User, Team, Channel, Message
- Project, Milestone, Schedule
- LeaveRequest, ApprovalFlow
