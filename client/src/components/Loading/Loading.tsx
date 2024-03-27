import * as L from './Loading.style'
import loadingSpinner from '../../assets/Setting/loadingSpinner.gif'

import { useRecoilValue } from 'recoil'
import { isLoadingState } from '../../recoil/atoms/SettingState'

export const Loading : React.FC = () => {
    const loadingState = useRecoilValue(isLoadingState);

    return (
        
        loadingState.loading && (
            <L.LoadingContainer>
                <L.LoadingSpinner src={loadingSpinner}/>
                <L.LoadingText>{loadingState.progress * 100}</L.LoadingText>
            </L.LoadingContainer>
        )
        
    )
}