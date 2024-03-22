import React, { useEffect, useRef } from 'react';
import * as C from './Chart.style'
import cytoscape, { CytoscapeOptions } from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
cytoscape.use(coseBilkent);

interface ChartProps {}

interface dummyData {
  id: number;
  nodeData: object;
  edgeData: object;
}

const dummyData: dummyData = {
  "id": 1,
  "nodeData": {
      "식육목": {
          "id": "식육목",
          "label": "식육목"
      },
      "고양이": {
          "id": "고양이",
          "label": "고양이"
      },
      "고양이과": {
          "id": "고양이과",
          "label": "고양이과"
      },
      "고양이속": {
          "id": "고양이속",
          "label": "고양이속"
      },
      "개과": {
          "id": "개과",
          "label": "개과"
      },
      "개속": {
          "id": "개속",
          "label": "개속"
      },
      "개(회색늑대)": {
          "id": "개(회색늑대)",
          "label": "개(회색늑대)"
      },
      "족제비과": {
          "id": "족제비과",
          "label": "족제비과"
      },
      "족제비속": {
          "id": "족제비속",
          "label": "족제비속"
      },
      "족재비": {
          "id": "족재비",
          "label": "족재비"
      }
  },
  "edgeData": {
      "고양이속간선": {
          "id": "고양이속간선",
          "source": "고양이속",
          "target": "고양이과"
      },
      "고양이과간선": {
          "id": "고양이과간선",
          "source": "고양이과",
          "target": "식육목"
      },
      "고양이간선": {
          "id": "고양이간선",
          "source": "고양이",
          "target": "고양이속"
      },
      "개(회색늑대)간선": {
          "id": "개(회색늑대)간선",
          "source": "개(회색늑대)",
          "target": "개속"
      },
      "개속간선": {
          "id": "개속간선",
          "source": "개속",
          "target": "개과"
      },
      "개과간선": {
          "id": "개과간선",
          "source": "개과",
          "target": "식육목"
      },
      "족재비간선": {
          "id": "족재비간선",
          "source": "족재비",
          "target": "족제비속"
      },
      "족제비속간선": {
          "id": "족제비속간선",
          "source": "족제비속",
          "target": "족제비과"
      },
      "족제비과간선": {
          "id": "족제비과간선",
          "source": "족제비과",
          "target": "식육목"
      }
  }
}

interface data {
  data: {
    id: string;
    label: string;
    url?: string; // 옵셔널로 변경할 수 있습니다.
    source?: string; // 옵셔널로 변경할 수 있습니다.
    target?: string; // 옵셔널로 변경할 수 있습니다.
  };
}

const Chart: React.FC<ChartProps> = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const data: data[] = []

  for (const [key, value] of Object.entries(dummyData.nodeData)) {
    console.log(key, value)
    data.push({data: value})
  }
  for (const [key, value] of Object.entries(dummyData.edgeData)) {
    console.log(key, value)
    data.push({data: value})
  }
  console.log(data)

  // rank를 활용하기 위해 data만 입력한 cytoscape 객체입니다
  const cy_for_rank = cytoscape({
    elements: data,
  });

  // elements들의 rank들입니다.
  const pageRank = cy_for_rank.elements().pageRank({});

  const nodeMaxSize = 50;
  const nodeMinSize = 5;
  const fontMaxSize = 30;
  const fontMinSize = 5;

  useEffect(() => {
    if (chartRef.current) {
      const options: CytoscapeOptions = {
        container: chartRef.current,

        elements: data,

        style: [
          // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              label: 'data(label)',
              width: function (ele: any) {
                const nodeCollection = cy_for_rank.getElementById(ele.id())
                return (
                  nodeMaxSize * pageRank.rank(nodeCollection) + nodeMinSize
                );
              },
              height: function (ele) {
                const nodeCollection = cy_for_rank.getElementById(ele.id())
                return (
                  nodeMaxSize * pageRank.rank(nodeCollection) + nodeMinSize
                );
              },
              'font-size': function (ele: any) {
                const nodeCollection = cy_for_rank.getElementById(ele.id())
                return (
                  fontMaxSize * pageRank.rank(nodeCollection) + fontMinSize
                );
              },
            },
          },

          {
            selector: 'edge',
            style: {
              width: 3,
              'curve-style': 'bezier', // 화살표 추가
              'line-color': '#ccc',
              'source-arrow-color': '#ccc', // target -> source로 화살표 방향
              'source-arrow-shape': 'triangle-backcurve', // 화살표 모양 지정
            },
          },
        ],
        
        layout: {
          name: 'cose-bilkent',
          animate: false, // whether to transition the node positions
          fit: true, // whether to fit to viewport
          // gravityRangeCompound: 1.5,
          // tile: true,
        } as { name: string; animate: boolean; fit: boolean },
      };
      const cy = cytoscape(options);

      cy.on('tap', function (e) {
        const url = e.target.data('url');
        if (url && url !== '') {
          window.open(url);
        }
      });
    }
  }, []);

  return (
    <C.Container>
      <C.Chart ref={chartRef} />
    </C.Container>
  );
};

export default Chart;
