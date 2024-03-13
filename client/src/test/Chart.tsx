import * as C from './Chart.style';
import cytoscape, { CytoscapeOptions } from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
cytoscape.use(coseBilkent);
import { useEffect, useRef } from 'react';

export default function Chart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  const data = [
    // list of graph elements to start with
    {
      data: {
        id: '0',
        label: '식물',
        url: 'https://ko.wikipedia.org/wiki/%EC%8B%9D%EB%AC%BC',
      },
    }, // node a
    { data: { id: '1', label: '빨간 꽃' } }, // node b
    { data: { id: '2', label: '노란 꽃' } }, // node c
    { data: { id: '3', label: '흰 꽃' } }, // node e
    { data: { id: '01', source: '1', target: '0' } }, // edge ab
    { data: { id: '02', source: '2', target: '0' } }, // edge ac
    { data: { id: '03', source: '3', target: '0' } }, // edge ac
    { data: { id: '4', label: '성탄별꽃' } },
    { data: { id: '5', label: '섬딸기' } },
    { data: { id: '6', label: '샤스타데이지' } },
    { data: { id: '34', source: '4', target: '3' } },
    { data: { id: '35', source: '5', target: '3' } },
    { data: { id: '36', source: '6', target: '3' } },
  ];

  // rank를 활용하기 위해 data만 입력한 cytoscape 객체입니다
  const cy_for_rank = cytoscape({
    elements: data,
  });

  // elements들의 rank들입니다.
  const pageRank = cy_for_rank.elements().pageRank();

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
              width: function (ele) {
                return (
                  nodeMaxSize * pageRank.rank('#' + ele.id()) + nodeMinSize
                );
              },
              height: function (ele) {
                return (
                  nodeMaxSize * pageRank.rank('#' + ele.id()) + nodeMinSize
                );
              },
              'font-size': function (ele) {
                return (
                  fontMaxSize * pageRank.rank('#' + ele.id()) + fontMinSize
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
        },
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
    <>
      <C.Title>Chart</C.Title>
      <C.Chart ref={chartRef} />
    </>
  );
}
