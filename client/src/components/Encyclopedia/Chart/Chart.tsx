import React, { useEffect, useRef, useState } from 'react';
import * as C from './Chart.style';
import cytoscape, { CytoscapeOptions } from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { getChartList } from '../../../api/encyclopedia';
import { ChartList } from '../../../type/ChartType';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../api/user';
import { useRecoilState } from 'recoil';
import { headerState } from '../../../recoil/atoms/EncyHeaderState';
import { chartParamType } from '../../../type/CollectType';
cytoscape.use(coseBilkent);

interface data {
  data: {
    id: string;
    label: string;
    url?: string; // 옵셔널로 변경할 수 있습니다.
    source?: string; // 옵셔널로 변경할 수 있습니다.
    target?: string; // 옵셔널로 변경할 수 있습니다.
  };
}

interface ChartProps {
  userId: number;
}

const Chart: React.FC<ChartProps> = ({ userId }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);  // <C.Chart> 컴포넌트 참조
  const data: data[] = [];   // node + edge 데이터 담을 리스트
  const [chartList, setChartList] = useState<ChartList>()
  const navigate = useNavigate();
  const [userNickname, setUserNickname] = useState<string>('')

  // Chart데이터 받아오기
  useEffect(() => {
    getChartList(
      userId,
      (res) => {
        setChartList(res.data)
      },
      (err) => { console.error(err) }
    )

    getUserInfo(
      userId,
      (res) => {setUserNickname(res.data.nickname)},
      (err) => console.error(err)
    )
  }, [])
  
  // nodeData와 edgeData에 대한 value를 data 리스트에 담는 작업
  if (chartList) {
    for (const key of Object.keys(chartList)) {
      if (key !== 'id') {
        for (const value of Object.values((chartList as any)[key])) {
          data.push({
            data: value as {
              id: string;
              label: string;
              url?: string | undefined;
              source?: string | undefined;
              target?: string | undefined;
            },
          });
        }
      }
    }
  }

  // const setEncyTabState = useSetRecoilState(headerState)
  const [param, setParam] = useState<chartParamType>({})
  const [encyLocate, setEncyLocate] = useRecoilState(headerState)
  
  const routHandler = (lookWhere: string) => {
    const beforeBtn = document.getElementById(encyLocate)
    if (beforeBtn) {
      beforeBtn.style.backgroundColor = '#E1E1E1';
      beforeBtn.style.color = '#5C5C5C';
    }
    
    const goBtn = document.getElementById(lookWhere)
    
    if (goBtn) {
      setEncyLocate(lookWhere)
      goBtn.style.backgroundColor = '#81D42E';
      goBtn.style.color = '#FFFFFF';
    }
  }

  
  // Chart 노드 클릭 시 컬렉션 페이지 이동 + 해당 노드 기준 필터링 데이터만 노출
  const setParamHandler = async (target: string) => {
    let key = ''
    let value = ''
    if (target.endsWith('목')) {
      key = 'ordo';
    } else if (target.endsWith('과')) {
      key = 'familia';
    } else if (target.endsWith('속')) {
      key = 'genus';
    } else {
      key = 'species';
    }
    value = target;
    
    setParam({[key]: value, ...param})
    setIsCall(true)
  }
  
  const [isCall, setIsCall] = useState<boolean>(false)
  // param이 변경되면 필터링 api 호출
  useEffect(() => {
    if (isCall) {
      navigate(`/encyclopedia/${userNickname}`, {state: {userId: userId, param: param}})
      routHandler('collection')
      setIsCall(false) 
    }

  }, [isCall])

  // cytoscape 라이브러리 사용
  const fetchChart = async () => {
    if (chartRef.current) {
      const options: CytoscapeOptions = {
        container: chartRef.current,
  
        elements: data,
  
        style: [
          {
            selector: 'node',
            style: {
              'background-color': function (ele: any) {
                return ele.id().endsWith('목')
                  ? '#417809'
                  : ele.id().endsWith('과')
                  ? '#64b017'
                  : ele.id().endsWith('속')
                  ? '#7dd228'
                  : '#b5ec81';
              },
  
              shape: function (ele: any) {
                return ele.id().endsWith('목')
                  ? 'round-pentagon'
                  : ele.id().endsWith('과')
                  ? 'round-hexagon'
                  : ele.id().endsWith('속')
                  ? 'round-heptagon'
                  : 'round-octagon';
              },
  
              'font-family': 'TmoneyR',
  
              label: 'data(label)',
  
              width: function (ele: any) {
                return ele.id().endsWith('목')
                  ? 50
                  : ele.id().endsWith('과')
                  ? 40
                  : ele.id().endsWith('속')
                  ? 30
                  : 20;
              },
  
              height: function (ele) {
                return ele.id().endsWith('목')
                  ? 50
                  : ele.id().endsWith('과')
                  ? 40
                  : ele.id().endsWith('속')
                  ? 30
                  : 20;
              },
  
              'font-size': function (ele: any) {
                return ele.id().endsWith('목')
                  ? 24
                  : ele.id().endsWith('과')
                  ? 22
                  : ele.id().endsWith('속')
                  ? 20
                  : 18;
              },
            },
          },
  
          {
            selector: 'edge',
            style: {
              width: 3,
              'line-color': '#BDBDBD',
            },
          },
        ],
  
        layout: {
          name: 'cose-bilkent',
          animate: false,          // whether to transition the node positions
          fit: true,              // whether to fit to viewport
        } as { name: string; animate: boolean; fit: boolean },  // 의존성 파일에 없는 key는 타입 단언
      };

      const cy = cytoscape(options);
  
      cy.on('tap', function (e) {
        setParamHandler(e.target.id())
      });
    }
  }

  // chartList 받아와야(=값 변경 돼야) cytoscape 실행
  useEffect(() => {
    fetchChart()
  }, [chartList]);

  return (
    <C.Container>
      <C.Chart ref={chartRef} />
    </C.Container>
  );
};

export default Chart;
