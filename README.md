# HMSOFT Web Template Hub

HMSOFT의 웹 템플릿 카탈로그입니다. 현재 11개의 기존 템플릿과 포트폴리오 프로젝트 ONYU, SEREIN을 함께 보여줍니다.

## 로컬 실행

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
npm.cmd test
```

## 배포

GitHub 저장소 `HMSOFT-WEB/template_hub`의 `master` 브랜치와 `gh-pages` 브랜치를 사용합니다.

```powershell
npm.cmd run deploy
```

공개 주소: https://hub.hmsoft.it.kr

## 리뉴얼 방향

공식 HM SOFT 로고와 함께 실제 작업물을 보여주는 모션 쇼릴, 한국어 갤러리, 업종 필터, 검색, 저장 목록, 접근 가능한 상세 창을 제공합니다. 첫 화면의 ONYU와 SEREIN은 배경 이미지·타이포그래피·사이트 프레임을 조합해 연출합니다. 재생 정지, 직접 전환, 화면 밖 재생 중단, 모션 감소 설정을 지원합니다.

전체 템플릿은 13개이며 필터와 검색 상태는 URL에 반영합니다. 저장 목록은 브라우저에 보관하고 손상된 저장 데이터도 처리합니다. 문의 이메일은 `ceo@hmsoft.it.kr`입니다.

서체는 Albert Sans와 IBM Plex Sans KR을 자체 호스팅합니다. 디자인 판단은 `DESIGN.md`, 공식 GitHub 스킬·오픈소스의 출처와 적용 범위는 `OPEN_SOURCE.md`에 기록합니다. `npm.cmd test`는 개발 서버 `http://127.0.0.1:5190`을 대상으로 탐색·접근성·모바일·모션 동작을 검증합니다. 다른 주소는 `HUB_TEST_URL` 환경 변수로 지정합니다.

템플릿 썸네일은 각 라이브 사이트를 브라우저로 캡처한 검토용 이미지입니다. 템플릿 자체의 모바일 품질은 개별 프로젝트의 범위이며, 허브에서 라이브 링크를 열어 확인할 수 있습니다.
