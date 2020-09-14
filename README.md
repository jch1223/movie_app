### **_Introduction Project_**

react, node.js, mongoDB를 사용하여 movie리스트를 api를 호출하여 보여주고, 즐겨찾기, 로그인 기능이 있는 프로젝트

### _contribution_

- 회원 가입 시에 패스워드를 bycrpy를 이용하여 암호화
- 로그인 시에 jwt를 사용하여 토큰을 생성. 생성된 토큰은 cookie를 통해 클라이언트에 보내고 mongoDB에도 저장하여 로그인을 유지 시킨다. 서버에서 jwt토큰의 유효시간은 1시간이지만 특별한 보안을 요구하는 프로젝트가 아니어서 cookie에서 expires를 설정하지 않고 클라이언트와 db의 jwt토큰이 같으면 인증되는 방식으로 구현하였다. jwt토큰은 로그아웃 또는 다른 클라이언트로 접속 하지 않는 이상 변경되지 않는다
- 즐겨찾기를 등록/삭제 할 수 있고, 즐겨찾기한 총 유저의 숫자가 표시된다

### _Deploy_

[React App](https://movielist-jch.herokuapp.com/)
