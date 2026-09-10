# HMSOFT Web Template Hub

HMSOFT의 웹 템플릿 카탈로그입니다. 현재 11개의 기존 템플릿과 포트폴리오 프로젝트 ONYU, SEREIN을 함께 보여줍니다.

## 로컬 실행

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
node check-redesign.mjs
```

## 배포

GitHub 저장소 `HMSOFT-WEB/template_hub`의 `master` 브랜치와 `gh-pages` 브랜치를 사용합니다.

```powershell
npm.cmd run deploy
```

공개 주소: https://hub.hmsoft.it.kr

## 리뉴얼 방향

허브를 소개형 랜딩 화면에서 작업형 카탈로그로 바꿨습니다. 왼쪽 고정 내비게이션, 카테고리 필터, 검색, 로컬 저장 목록, 템플릿 상세 모달, 실제 사이트 링크, 모바일 메뉴를 제공합니다. 화면 구성은 `web-structure`의 앱 셸 기준을 참고하고, Chivo와 IBM Plex Sans KR을 프로젝트에 포함해 외부 폰트 실패에도 같은 타이포그래피를 유지합니다.

템플릿 썸네일은 각 라이브 사이트를 브라우저로 캡처한 검토용 이미지입니다. 템플릿 자체의 모바일 품질은 개별 프로젝트의 범위이며, 허브에서 라이브 링크를 열어 확인할 수 있습니다.
