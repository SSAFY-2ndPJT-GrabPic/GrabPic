import { useLocation, useNavigate } from 'react-router-dom';
import * as C from './CheckPage.style'
import { getBiologyInfo } from '../../api/camera';

export const CheckPage : React.FC = () => {

    // 페이지 넘어오면서 같이 넘어온 이미지를 가져온다.
    // const params = new URLSearchParams(window.location.search);
    // const image = params.get('image') || '';
    const { state } = useLocation();
    
    const image = state.image || '';
    
    const navigate = useNavigate();

    // 다시시도 버튼
    const back = () => {
        localStorage.removeItem('biologyId');
        localStorage.removeItem('boxXY');
        navigate(-1);
    }

    // 전송 버튼
    const go = async () => {
        const biologyString = localStorage.getItem('biologyId');
        if(!biologyString) {
            back();
            return;
        }
        const biologyId = parseInt(biologyString,10);

        await getBiologyInfo (
            biologyId,
            (response) => {
                const info = response.data;
                navigate("/regist", { state: {...state, info : info}});
            },
            () => {
                back();
            }
        )

    }

    return (
        <C.CheckPageContainer>
            <C.CheckPageImg src={image }/>
            <div className='flex px-10 items-center'>
                <C.CheckBtn onClick={back}>다시시도</C.CheckBtn>
                <C.CheckBtn onClick={go}>전송</C.CheckBtn>
            </div>
        </C.CheckPageContainer>
    )
}