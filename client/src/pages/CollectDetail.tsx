import { tabState } from "../recoil/IndivDetailTabState";
import { useRecoilValue } from 'recoil';
import UserInfo from "../components/CollectDetail/UserInfo/UserInfo";
import IndivTitle from "../components/CollectDetail/IndivTitle/IndivTitle";
import InfoTab from "../components/CollectDetail/InfoTab/InfoTab";
import IndivInfo from "../components/CollectDetail/IndivInfo/IndivInfo";
import GetInfo from "../components/CollectDetail/GetInfo/GetInfo";

const detailInfo = {
  userInfo: {
    nickName: '해진해뜸',
    profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWgn_TKOeao6JafiNJb9MoJVTfF9zsmNAlRygzSuCbCjeqUjV',
    subNum: 529
  },
  indivInfo: {
    indivImageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMTIx/MDAxNjQzMTAyOTg2MDg5.25pJ9fmvWAsMPtL6cRXaB1l65KSezSaCREW5wHiqpiEg.Zr7-dyx9TISjrffgOcY-75_s6Oz4hTqhr2ZOiN0Qzhwg.JPEG.minziminzi128/IMG_7379.JPG?type=w800',
    indivName: '모래고양이',
    indivEngName: 'Felis margarita',
    indivClassify: ['포유강', '식육목',  'Felidae'],
    summaryDetail: '식육목(食肉目) 고양이과의 포유류에 속하며, 반려묘 또는 고양이과의 총칭.',
    details: '개체 설명 왕창창 와장창 왕창왕창 좌르르륵 풍팡핑퐁'
    + '한자로는 묘(猫)라 하고, 수고양이를 낭묘(郎猫), 암고양이를 여묘(女猫), 얼룩고양이를 표화묘(豹花猫), 들고양이를 야묘(野猫)로 부르기도 한다. '
    + '현재 집에서 기르고 있는 모든 애완용 고양이는 아프리카·남유럽·인도에 걸쳐 분포하는 리비아고양이(Felis silvestris lybica)를 사육 순화시킨 것으로, 전세계에서 2억 마리가 넘게 사육되는 것으로 알려져 있다. '
    + '약 5,000년 전 아프리카 북부 리비아산(産)의 야생고양이가 고대 이집트인에 의해 길들여져서 점차 세계 각지에 퍼졌다고 한다. '
    + '이것은 고대 이집트의 벽화 ·조각, 고양이의 미라 등으로 미루어 명확하지만, 그것이 현재 사육되는 모든 고양이의 조상인지는 의문이다.'
    + '고양이를 죽이거나, 소중히 다루지 않으면 불행을 당하게 된다는 민화(民話)는 동양의 여러 나라뿐 아니라 유럽 ·아프리카 등지에도 있다. '
    + '고양이의 가축화가 현저히 발달한 고대 이집트에서는 고양이는 신성한 동물이었다. 또한 고양이가 시체를 뛰어넘으면 시체가 움직인다고 하여 고양이를 시체 가까이 두지 않는 풍습도 있으며 고양이에 관한 미신은 많다.'
    + '고양이의 거동을 사물의 전조(前兆)로 보는 습관은 세계적인 현상이다.'
  },
  getInfo: {
    getMemo: '헉 세상에서 제일 귀여운 고양이다 ㅠ',
    getDate: [2024, 3, 18],
    getLocate: {
      lat: 36.10185992108684,
      lng: 128.4239516912457
    }
  }
}

interface CollectDetailProps {}

const CollectDetail: React.FC<CollectDetailProps> = () => {
  const tabInfo = useRecoilValue(tabState)

  return (
    <>
      <UserInfo userInfo={detailInfo.userInfo} />
      <IndivTitle indivInfo={detailInfo.indivInfo} />
      <InfoTab />
      {tabInfo === 'indivInfo' ? <IndivInfo indivInfo={detailInfo.indivInfo} /> : <GetInfo getInfo={detailInfo.getInfo} />}
    </>
  );
};

export default CollectDetail;