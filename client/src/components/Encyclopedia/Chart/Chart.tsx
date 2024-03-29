import React, { useEffect, useRef, useState } from 'react';
import * as C from './Chart.style';
import cytoscape, { CytoscapeOptions } from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
// import { getChartList } from '../../../api/encyclopedia';
import { ChartList } from '../../../type/ChartType';
cytoscape.use(coseBilkent);

interface dummyData {
  id: number;
  nodeData: object;
  edgeData: object;
}

const dummyData: dummyData = {
  id: 1,
  nodeData: {
    식육목: {
      id: '식육목',
      label: '식육목',
    },
    고양이: {
      id: '고양이',
      label: '고양이',
    },
    고양이과: {
      id: '고양이과',
      label: '고양이과',
    },
    고양이속: {
      id: '고양이속',
      label: '고양이속',
    },
    개과: {
      id: '개과',
      label: '개과',
    },
    개속: {
      id: '개속',
      label: '개속',
    },
    '개(회색늑대)': {
      id: '개(회색늑대)',
      label: '개(회색늑대)',
    },
    족제비과: {
      id: '족제비과',
      label: '족제비과',
    },
    족제비속: {
      id: '족제비속',
      label: '족제비속',
    },
    족재비: {
      id: '족재비',
      label: '족재비',
    },
  },
  edgeData: {
    고양이속간선: {
      id: '고양이속간선',
      source: '고양이속',
      target: '고양이과',
    },
    고양이과간선: {
      id: '고양이과간선',
      source: '고양이과',
      target: '식육목',
    },
    고양이간선: {
      id: '고양이간선',
      source: '고양이',
      target: '고양이속',
    },
    '개(회색늑대)간선': {
      id: '개(회색늑대)간선',
      source: '개(회색늑대)',
      target: '개속',
    },
    개속간선: {
      id: '개속간선',
      source: '개속',
      target: '개과',
    },
    개과간선: {
      id: '개과간선',
      source: '개과',
      target: '식육목',
    },
    족재비간선: {
      id: '족재비간선',
      source: '족재비',
      target: '족제비속',
    },
    족제비속간선: {
      id: '족제비속간선',
      source: '족제비속',
      target: '족제비과',
    },
    족제비과간선: {
      id: '족제비과간선',
      source: '족제비과',
      target: '식육목',
    },
  },
};

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

// const Chart: React.FC<ChartProps> = ({ userId }) => {
const Chart: React.FC<ChartProps> = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);  // <C.Chart> 컴포넌트 참조
  const data: data[] = [];   // node + edge 데이터 담을 리스트
  const [chartList, setChartList] = useState<ChartList>()

  // Chart데이터 받아오기
  useEffect(() => {
    // console.log(userId)
    // getChartList(
    //   userId,
    //   (res) => {
    //     setChartList(res.data)
    //     console.log(res.data)
    //   },
    //   (err) => { console.error(err) }
    // )
    setChartList(dummyData)
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

  // Chart 노드 클릭 시 컬렉션 페이지 이동 + 해당 노드 기준 필터링 데이터만 노출
  const clickEventHandler = (target: string) => {
    console.log(target, 'click해따!')
  }

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
          animate: true,          // whether to transition the node positions
          fit: true,              // whether to fit to viewport
        } as { name: string; animate: boolean; fit: boolean },  // 의존성 파일에 없는 key는 타입 단언
      };

      const cy = cytoscape(options);
  
      cy.on('tap', function (e) {
        clickEventHandler(e.target.id())
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
