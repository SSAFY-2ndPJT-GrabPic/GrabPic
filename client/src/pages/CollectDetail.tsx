import { tabState } from "../recoil/atoms/IndivDetailTabState";
import { useRecoilValue } from 'recoil';
import UserInfo from "../components/CollectDetail/UserInfo/UserInfo";
import IndivTitle from "../components/CollectDetail/IndivTitle/IndivTitle";
import InfoTab from "../components/CollectDetail/InfoTab/InfoTab";
import IndivInfo from "../components/CollectDetail/IndivInfo/IndivInfo";
import GetInfo from "../components/CollectDetail/GetInfo/GetInfo";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { OwnerInfoType } from "../type/UserType";
import { getUserInfo } from "../api/user";
import { getCollectDetail } from "../api/encyclopedia";
import { CollectDetailType } from "../type/CollectType";

interface CollectDetailProps {}

const CollectDetail: React.FC<CollectDetailProps> = () => {
  const tabInfo = useRecoilValue(tabState)
  const location = useLocation();
  const encyclopediaId = location.state.encyclopediaId
  const ownerId = location.state.userId

  const [ownerInfo, setOwnerInfo] = useState<OwnerInfoType>({} as OwnerInfoType)
  const [encyDetailInfo, setEncyDetailInfo] = useState<CollectDetailType>({} as CollectDetailType)

  useEffect(() => {
    getUserInfo(
      ownerId,
      (res) => {
        setOwnerInfo(res.data)
      },
      (err) => console.error(err)
    )

    getCollectDetail(
      encyclopediaId,
      (res) => {
        setEncyDetailInfo(res.data)
      },
      (err) => {console.error(err)}
    )
  }, [])

  return (
    <>
      <UserInfo userInfo={ownerInfo} />
      <IndivTitle indivInfo={encyDetailInfo} />
      <InfoTab />
      {tabInfo === 'indivInfo' ? <IndivInfo indivInfo={encyDetailInfo} /> : <GetInfo getInfo={encyDetailInfo} />}
    </>
  );
};

export default CollectDetail;