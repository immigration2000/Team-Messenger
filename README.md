# Team Collab Messenger

회사 팀을 위한 메신저 + 일정/휴가 관리 앱 프로젝트입니다.

## 목표
- 팀 채팅(1:1, 그룹)
- 프로젝트 일정 관리(캘린더/마일스톤)
- 휴가 신청/승인
- 모바일 앱(iOS/Android) + 데스크톱 앱(Windows/macOS)

## 권장 기술 스택
- 모바일: React Native (Expo)
- 데스크톱: Electron + React
- 백엔드: NestJS + PostgreSQL + Redis
- 공통 모듈: TypeScript 공유 패키지

## 폴더 구조
- `apps/mobile`: 모바일 앱
- `apps/desktop`: 데스크톱 앱
- `apps/api`: 서버 API
- `packages/shared`: 공통 타입/유틸
- `docs`: 기획 및 설계 문서

## 다음 작업
1. 인증/권한 모델 정의
2. 메시징 도메인 모델 정의
3. 일정/휴가 승인 워크플로우 설계
4. MVP 화면 와이어프레임 작성
