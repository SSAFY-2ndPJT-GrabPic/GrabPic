<div align="center">
  <br/>
  <img src="README_image/GrabPicLogo.png" width='60%'/>
  <br />
  <br />
  <br />
  <h1>GrabPic 📸</h1>
  <h3>작지만 가장 똑똑한, 나만의 생태 도감</h3> 
  <p>2024. 02. 19  ~  2024. 04. 05</p>
  <br/><br/>
</div>

## 🔗 목차

- [서비스 개요](#-서비스-개요)
- [팀원 소개](#-팀원-소개)
- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [명세서](#-명세서)
- [시스템 아키텍처](#-시스템-아키텍처)
- [ERD](#erd)
- [서비스 실사용 화면](#-서비스-실사용-화면)

<br/>
<br/>


## 📃 서비스 개요

```markdown
작지만 가장 똑똑한 나만의 생태 도감, GrabPic📸!

사용자가 카메라에 인식한 개체를 AI 실시간 개체 분류 기술을 통해 분석합니다.
동식물을 도감에 등록하고, 차트를 통해 수집 개체를 한 눈에 확인해보세요!
지도를 통해 주변에서 수집된 동식물 분포도 확인은 물론이고,
개체 상세정보를 조회하면 촬영한 사진을 기반으로 생성된 AI 영상도 제공된답니다.
```

<br/>
<br/>


## 👨‍👩‍👧‍👦 팀원 소개

<div align="middle">
  <table>
    <tr>
      <th colspan='3'>Front-End</th>
      <th colspan='2'>Back-End</th>
      <th colspan='1'>AI</th>
    </tr>
    <tr>
      <td height="140px" align="center"> 
        <img src="README_image/joe.jpg" width="120px"/>
      </td>
      <td height="140px" align="center"> 
          <img src="README_image/kyu.jpg" width="120px" />
      </td>
      <td height="140px" align="center"> 
          <img src="README_image/jin.jpg" width="110px" />
      </td>
      <td height="140px" align="center"> 
          <img src="README_image/hun.jpg" width="120px" />
      </td>
      <td height="140px" align="center"> 
          <img src="README_image/son.jpg" width="120px" />
      </td>
      <td height="140px" align="center"> 
          <img src="README_image/jun.jpg" width="120px" />
      </td>
    </tr>
    <tr>
      <td align='center'>
        <a href="https://github.com/ByeongJo-Park">👑 박병조 (Leader)</a>
      </td>
      <td align='center'>
        <a href="https://github.com/Gyu-S">📸 양성규</a>
      </td>
      <td align='center'>
        <a href="https://github.com/sunoftwilight">📊 이해진</a>
      </td>
      <td align='center'>
        <a href="https://github.com/eat-alone">🎥 박지훈</a>
      </td>
      <td align='center'>
        <a href="https://github.com/sondongcheon">💾 손동천</a>
      </td>
      <td align='center'>
        <a href="https://github.com/Non-duality">🤖 이준희</a>
      </td>
    </tr>
    <tr>
      <td align='center'>
        PM <br/>
        지도 UI/UX <br/>
        AI 데이터셋 수집
      </td>
      <td align='center'>
        AI 카메라 UI/UX <br/>
        회원 관리 UI/UX <br/>
      </td>
      <td align='center'>
        차트 UI/UX <br/>
        도감 UI/UX <br/>
        SNS UI/UX
      </td>
      <td align='center'>
        AI 프레임 보간 <br/>
        AI 데이터셋 수집 <br/>
        차트 API
      </td>
      <td align='center'>
        회원 관리 API <br/>
        도감 API <br/>
        지도 API <br/>
        SNS API
      </td>
      <td align='center'>
        AI 모델 딥러닝 <br/>
        오토 라벨링 <br/>
        AI 데이터셋 수집
      </td>
    </tr>
  </table>
</div>

<br/>
<br/>


## 🛠 기술 스택
<div align=middle>
  <h3>🎨  FrontEnd</h3> 
  <div>
    <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
    <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
    <br/>
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
    <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=black">
    <img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white">
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
    <br/>
  </div>


<h3>💾  BackEnd</h3>
<div>
  <img src="https://img.shields.io/badge/Java-000000?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/spring webclient-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white">
</div>

<h3>🤖  AI</h3>
<div>
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white">
  <img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white">
  <img src="https://img.shields.io/badge/pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/yolo v8-0180FF?style=for-the-badge&logo=yolo&logoColor=white">
  <img src="https://img.shields.io/badge/ffmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white">
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
</div>

<h3>💻  Infra</h3>
<div>
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</div>

<h3>💬  Cooperation</h3>
  <div>
    <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
    <img src="https://img.shields.io/badge/jirasoftware-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white">
    <img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">
  </div>
</div>

<br/>
<br/>

## 💎 주요 기능
<table>
  <tr>
    <th align=center width="120px" height="30px">분류</th>
    <th align=center width="120px" height="30px">기능</th>
    <th align=center width="700" height="30px">내용</th>
  </tr>
  <tr>
    <td width="120px" height="60px"><b>동/식물 인식 및 정보 제공</b></td>
    <td width="120px" height="60px">실시간 인식 및 표시</td>
    <td width="700" height="60px">사용자가 카메라로 촬영 중인 동물이나 식물을 실시간으로 인식하며, 화면에는 인식된 대상의 윤곽선과 이름을 동시에 표시합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">정보 제공</td>
    <td width="700" height="60px">인식된 동물 또는 식물에 대해 상세한 정보를 사용자에게 제공합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"><b>도감</b></td>
    <td width="120px" height="60px">도감 등록</td>
    <td width="700" height="60px">사용자가 촬영한 동물 또는 식물의 사진을 개인 도감에 저장하고, 해당 생물에 대한 메모, 수집날짜, 수집 위치를 함께 등록합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">차트</td>
    <td width="700" height="60px">사용자가 촬영한 생물들을 종류별로 분류하여, 차트 형태로 표현함으로써 생물의 다양성을 시각적으로 보여줍니다. <br/>
    또한 차트의 node를 클릭하면 해당 node의 하위 개체만 필터링하여 확인 가능합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">	그리드뷰</td>
    <td width="700" height="60px">촬영한 사진들을 반응형 그리드 형태로 표시, 사용자가 수집한 생물 사진을 시각적으로 쉽게 탐색하고 감상할 수 있도록 합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">보간 동영상 제공</td>
    <td width="700" height="60px">사용자가 촬영한 사진들을 이용하여 AI 기반 프레임 보간 처리를 거친 동영상을 생성합니다. 사용자에게 촬영한 순간들을 연속적으로 보여줌으로써 생생한 경험을 제공합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"><b>지도</b></td>
    <td width="120px" height="60px">수집 위치 표시</td>
    <td width="700" height="60px">실제 수집한 위치를 마커로 표시하며, 수집 개체에 대한 정보를 희귀도순 및 수집일자 순의 정렬된 리스트로 제공합니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">사용자 위치 추적</td>
    <td width="700" height="60px">사용자의 실제 위치를 기반으로 주변에서 수집된 개체의 분포를 확인할 수 있습니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"><b>커뮤니티</b></td>
    <td width="120px" height="60px">구독</td>
    <td width="700" height="60px">사용자는 다른 사용자를 구독할 수 있으며, 이를 통해 구독 대상의 도감을 확인할 수 있습니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">방명록 작성</td>
    <td width="700" height="60px">구독한 사용자의 프로필에 방명록을 작성할 수 있습니다.</td>
  </tr>
  <tr>
    <td width="120px" height="60px"></td>
    <td width="120px" height="60px">갤러리</td>
    <td width="700" height="60px">다른 사용자들이 업로드한 동식물 사진을 피드 형태로 확인할 수 있습니다.</td>
  </tr>
</table>


<br/>
<br/>


## 📚 명세서


- <a href='https://indecisive-radius-a20.notion.site/61d4473d638e458dbd8ec8d17dd28217?pvs=4'>요구사항 명세</a>

- <a href='https://indecisive-radius-a20.notion.site/ed365d2d764d431cbbbedf922e6cddfa?pvs=4'>기능 명세</a>

- <a href='https://indecisive-radius-a20.notion.site/API-245ce0adc0ab4b84bcd1f7cea3a0c372?pvs=4'>API 명세</a>

- <a href='https://www.figma.com/file/l4nPbmoEjD0D2KDnB6Y5o3/S10P22D104?type=design&node-id=315%3A2&mode=design&t=VJPuUdMgenJ2bDZL-1'>Figma</a>

- <a href='https://indecisive-radius-a20.notion.site/32c5b997a9b84f4d8c64a06274f3cc54?pvs=4'>시퀀스 다이어그램</a>

<br/>
<br/>


## 💡 시스템 아키텍처
<img src="README_image/architecture.png">

<br/>
<br/>


## 📐 ERD
<img src="README_image/ERD.png">

<br/>
<br/>


## 💝 서비스 실사용 화면

<h3>🧡 카메라</h3>

- 모바일 기기의 카메라를 통해 동식물 스캔 시, <br/> 해당 개체를 실시간으로 분석하여 명칭을 확인할 수 있습니다.
<table>
  <tr>
    <td width="240px" height="60px">실시간 개체 및 표시</td>
    <td width="240px" height="60px">정보 제공</td>
  </tr>
  <tr>
    <td width="240px" height="400px">
      <img src='README_image/itemLabel.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/itemSep.gif'>
    </td>
  </tr>
</table>
<br/>

<h3>💛 도감</h3>

- 개체를 등록하고, 등록한 개체를 차트, 그리드 뷰를 통해 확인할 수 있습니다.
- 수집한 개체를 생물 분류 단계에 따라 필터링하여 조회할 수 있습니다. **(중간 단계부터 선택 가능)**
- 수집한 개체 기반의 AI 보간 영상을 조회할 수 있습니다.

<table>
  <tr>
    <td width="240px" height="60px">도감 등록</td>
    <td width="240px" height="60px">차트</td>
    <td width="240px" height="60px">그리드 뷰</td>
    <td width="240px" height="60px">보간 동영상 제공</td>
  </tr>
  <tr>
    <td width="240px" height="400px">
      <img src='README_image/encyRegist.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/encyChart.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/encyGrid.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/encyAIVideo.gif'>
    </td>
  </tr>
</table>
<br/>

<h3>💚 지도</h3>

- 사용자 위치를 중심으로 근처에서 수집된 개체를 확인할 수 있습니다.
- 등록 일자 순, 희귀도 순으로 필터링하여 조회할 수 있습니다.

<table>
  <tr>
    <td width="240px" height="60px">수집 위치 표시</td>
    <td width="240px" height="60px">사용자 위치 추적</td>
  </tr>
  <tr>
    <td width="240px" height="400px">
      <img src='README_image/mapCollectLoc.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/mapUserLoc.gif'>
    </td>
  </tr>
</table>
<br/>

<h3>💙 커뮤니티</h3>

- 방명록과 갤러리(피드)를 통해 다른 사용자와 교류할 수 있습니다.
- 갤러리 게시글은 자체 알고리즘을 통해 추천됩니다.

<table>
  <tr>
    <td width="240px" height="60px">구독</td>
    <td width="240px" height="60px">방명록 작성</td>
    <td width="240px" height="60px">갤러리</td>
  </tr>
  <tr>
    <td width="240px" height="400px">
      <img src='README_image/communSub.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/commuGuestBook.gif'>
    </td>
    <td width="240px" height="400px">
      <img src='README_image/commuGallery.gif'>
    </td>
  </tr>
</table>
<br/>
