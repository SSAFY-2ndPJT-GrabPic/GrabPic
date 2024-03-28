type Label = {
    [key: string]: string;
};

// labels.json 파일의 default export를 지정된 타입으로 설정합니다.
declare const labels: Label;

// 해당 모듈을 외부에서 사용할 수 있도록 내보냅니다.
export default labels;