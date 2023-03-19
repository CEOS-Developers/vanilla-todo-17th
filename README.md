# 🦝 배포 링크
[1주차 미션 결과 화면](https://ceos-1st-vanilla-todo-17th.vercel.app/)
<br>

# 🦝 Overview
- 과제 필수요건에 나와있는 결과 화면과 UI를 비슷하게 맞춰보았습니다.
- 간단한 프로젝트이지만, 추후 확장 가능성을 염두에 두고 css파일을 분리 + js파일명 변경하였습니다. 
각 폴더 안에 넣어서 저리해도 깔끔할 것 같습니다!
- input text 공란으로 제출 시, 추가되지 않도록 했습니다.
(input 태그의 required를 사용할 수도 있지만, 브라우저 기본 경고창이 예쁘지 않아 사용하지 않았습니다 😂)
- 텍스트/버튼 클릭시 confirm 창을 띄워 사용자에게 한번 더 확인받도록 하였습니다

<br>

# 🦝 Key Questions

### DOM은 무엇인가요?
> DOM(Document Object Model):
브라우저가 이해할 수 있는 Tree 형태의 자료구조.

![image](https://user-images.githubusercontent.com/65700066/225929468-cb92376c-fb1b-40a4-b7e9-a5b93dec51c9.png)

HTML, CSS, Javascript 소스들은 텍스트 문자열에 불과하기 때문에, 파싱을 통해 브라우저가 이해할 수 있는 자료구조 형태로 만들어야 합니다.
브라우저의 렌더링 엔진은 HTML문서를 파싱하여 브라우저가 이해할 수 있는 Tree 자료구조 형태인 DOM 으로 만듭니다.
DOM은 HTML 문서의 계층적 구조와 정보를 표현하고, 
이를 제어할 수 있는 API인, 프로퍼티와 메소드를 제공합니다.

<br>

### HTML (tag) Element를 JavaScript로 생성하는 방법은 어떤 것이 있고, 어떤 방법이 가장 적합할까요?
1. insertAdjacentHTML
```javascript
element.insertAdjacentHTML(position, text);
```
: target HTML Element의 특정 위치에 원하는 node를 추가 할 수 있는 메서드.
해당 방법은 처음 알았는데, 가독성이 좋다는 장점이 있지만, 보안 이슈가 있다고 합니다.

2. createElement
```javascript
const element = document.createElement(tagName);
```
: 지정 tagName의 HTML Element를 생성해 반환하는 메서드.
저는 주로 createElement를 사용하고 있습니다!


<br>

### Semantic tag에는 어떤 것이 있으며, 이를 사용하는 이유는 무엇일까요?
> Semantic tag:
의미를 가진 태그.

**Semantic tag 종류**

![image](https://user-images.githubusercontent.com/65700066/225903887-a9e5cb59-e0e2-4f00-a92f-9f037bec4d29.png)

- `<header>` : 사이트의 머리 부분
- `<nav>` : 내비게이션 영역 표시
- `<main>` : 해당 페이지의 메인 콘텐츠를 나타냄
- `<section>` : 여러 가지 콘텐츠들을 그룹으로 묶어줌. article보다 큰 영역
- `<article>` : 웹페이지 상에서의 실제 내용. 개별 컨텐츠에 사용
- `<aside>` : 사이드 영역에 사용, 부수적인 내용을 나타냄
- `<footer>` : 웹 문서 최하단에 들어가, 회사나 저작권 정보를 나타냄
- `<hgroup>` : 제목과 부제목을 묶어서 나타냄 

**Semantic tag 사용 이유**
1. HTML 문서의 가독성을 높이고, 코드의 유지보수를 위함
2. 검색엔진 최적화(SEO)
5. 웹 브라우저가 HTML 문서의 구조를 쉽게 파악할 수 있어, 시각장애인 또는 키보드만 사용할 수 있는 상황에 도움

<br>

### Flexbox Layout은 무엇이며, 어떻게 사용하나요?
> Flexbox Layout:
flexbox 내의 아이템 간 공간 배분과 정렬 기능을 제공하기 위한 1차원 레이아웃 모델.

가로, 세로 축을 모두 사용하는 CSS Grid Layout과 달리, 하나의 차원만을 다룹니다.

![image](https://user-images.githubusercontent.com/65700066/225921184-2b8e4f6e-e7da-487a-8d6d-4311896ad2ac.png)

![image](https://user-images.githubusercontent.com/65700066/225919464-c9cf6ce7-72ab-4476-a4cd-edeec714b659.png)

- Flex Container : Flex Box 레이아웃을 적용할 대상들을 묶는 요소
- Flex items : Flex Box 레이아웃을 적용할 대상
- 주축(main-axis) : Flex Container 안에서 Flex items 배치하는 기본 방향
- 교차축(cross-axis): 주축과 교차하는 방향

**Flex Container 속성들**
- `display` : Flex Container 지정
- `flex-direction` : flex items 의 주축(main-axis) 지정
- `flex-wrap` : Container 너비보다 항목이 많을 경우, 줄바꿈 여부 지정
- `flex-flow` : `flex-direction`, `flex-wrap` 한번에 지정
- `justify-content` : 주축(main-axis)의 정렬 방법을 지정
- `align-items` : 교차축(cross-axis)에서 Items의 정렬 방법을 지정

**Flex Items 속성들**
- `order` : flex item의 정렬 순서 지정
- `align-self` : 교차 축(cross-axis)에서 특정 flex item의 정렬 방법 지정
- `flex-basis` : flex item의 기본 너비 지정
- `flex-grow` : flex item의 증가 너비 비율 지정
- `flex-shrink` : flex item의 감소 너비 비율 지정
- `flex` : `flex-grow`, `flex-shrink`, `flex-basis` 한번에 지정

<br>

### JavaScript가 다른 언어들에 비해 주목할 만한 점에는 어떤 것들이 있나요?
1. FE를 다루는 유일한 언어, BE까지 개발 가능
-> 범용성 good.

2. 싱글 스레드
-> `Callback 함수`, `Promise`, `async/await` 를 사용하여 비동기 처리 가능

3. 인터프리터 언어
-> 빠르다
-> 타입 명시를 하지 않아도 된다. 
(하지만 코드의 목적을 명시해 유지보수를 돕고, 사전에 버그를 막기 위해서는 ... 타입스크립트 ✨)

4. 프로토타입 기반 객체 지향언어

<br>

### 코드에서 주석을 다는 바람직한 방법은 무엇일까요?
주석에 대해 반대하는 의견 중에,
1. 주석을 작성하는 것 또한 비용이 든다.
2. 주석으로 해결하기 보단, 코드를 고치도록 하는 것이 낫다.

는 의견 등이 있습니다.

하지만 개인적으로, 적절한 주석은 
1. 개발자 간 협업 시 복잡한 작업사항에 대한 이해를 돕고
2. 추후 유지보수 비용을 줄여준다

는 장점이 있다고 생각합니다.

따라서 다음과 같은 규칙을 적용한다면, 좋은 주석을 남길 수 있을 것이라고 생각합니다!

> 1. 코드를 복붙하는 의미없는 주석을 적지 않는다.
> 2. 명확하고 명료한 주석을 작성하기 어렵다면, 코드를 다시 짠다.
(주석은 불분명한 코드를 변명하지 않는다!)

<br>

# 🦝 참고
- w3school.com
- [flex box 사진자료](https://heropy.blog/2018/11/24/css-flexible-box/)
- [주석에 대한 의견](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/)
