[![Netlify Status](https://api.netlify.com/api/v1/badges/fcb18cf0-a9b6-4537-9a75-a35a0b41e12a/deploy-status)](https://app.netlify.com/sites/inditown/deploys)

# 📈 프로젝트 설명
## 개요 
GPS 위치 정보를 기반으로 동일한 플랫폼 혹은 동일한 음식을(같은 식당의 음식)을 구매(또는 배달)하려는 유저들이 배달비, 배송비 절감을 위해 함께 구매할 동네 유저를 모집하는 플랫폼

## 타겟
20 - 30대 1인 가구

## 기대 효과
- 최소 주문 금액이 부담스러운 1인 가구가 모여 공동 주문함으로써 최소 주문 금액 달성 및 배달비 부담 감소
- 물품 가격보다 배송비가 더 비싼 소량 구매품목을 공동 주문하여 배송비 절약
 로켓 프레시, 마켓 컬리 등 소량 품목 공동 주문으로 최소 구매 비용 달성
 그 외 목적이 같은 공동 구매로 다양한 택배 거래 및 음식 배달의 배송, 배달비용 절약
 배달, 배송 비용이 부담스러워 구매하지 않는 구매자들의 구매가 증가하여 판매자 매출 증가


## 📌프로젝트 Information Architecture
  [프로젝트 IA](https://docs.google.com/spreadsheets/d/1Gb6CBpAcqnGSLMFP5Sue8lDqQL61GiWwAf4RsqR2-uw/edit#gid=0)

## 📌프로젝트 WireFrame
  [프로젝트 WireFrame](https://www.figma.com/file/T14p4DVlr3JpM8CrCeZiB4/Indi-Town?node-id=0%3A1)

## 📌프로젝트 UI 구상
  [프로젝트 UI 구상](https://www.figma.com/file/T14p4DVlr3JpM8CrCeZiB4/Indi-Town?node-id=48%3A10)

# 📝 Git commit rule

## 제목 <br>
### `Type: Subject`
- `"태그: 제목"`의 형태이며, : 뒤에만 space가 있음에 유의

## Type 종류
- `Feat`: 새로운 기능을 추가할 경우 
- `Fix` 버그를 고친 경우 
- `Design`: CSS 등 사용자 UI 디자인 변경 
- `Style`: 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- `Refactor`: 프로덕션 코드 리팩토링 
- `Comment`: 필요한 주석 추가 및 변경 
- `Docs`: 문서를 수정한 경우 
- `Test`: 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X) 
- `Chore`: 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X) 
- `Rename`: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 
- `Remove`: 파일을 삭제하는 작업만 수행한 경우

## 작성 방식
- "고침", "추가", "변경"의 명령어로 시작합니다.
- ex) Feat: 추가 Button 컴포넌트, Feat: 추가 get data api 함수
- ex) Docs: 변경 README 문서

# 📁 폴더 구조
```
┌───┬ .storybook
│   ├── preview-head.html
│   └── *
├───┬ src
│   ├──┬ components
│   │  ├──┬ Component-1
│   │  │  ├── index.js
│   │  │  └── *
│   │  └──┬ Component-2
│   │     ├── index.js
│   │     └── *
│   ├──┬ hooks
│   │  ├─── usehook-1.js
│   │  └─── usehook-2.js
│   ├──┬ contexts
│   │  ├─── context-1Provider.js
│   │  └─── context-2Provider.js
│   ├──┬ api
│   │  ├─── api-1.js
│   │  └─── api-2.js
│   ├──┬ pages
│   │  ├──┬ page1
│   │  │  ├── index.js
│   │  │  └── *
│   │  └──┬ page2
│   │     ├── index.js
│   │     └── *
│   ├─── App.js
│   ├─── index.css
│   └─── *
├───┬ stories
│   ├──┬ components
│   │  ├─── component-1.stories.js
│   │  └─── component-1.stories.js
│   └──┬ hooks
│      ├─── useHook1.stories.js
│      └─── useHook2.stories.js
├───┬ public
│   ├── index.html
│   ├── favicon.ico
│   └── *
├───┬ pages
│   └── *
├───┬ theme
│   └── index.js
├──── package.json
├──── readme.md
└──── *
```
