import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const useTypeParams = () => {
  const dispatch = useDispatch();
  const { fraze } = useParams();

  return {
    dispatch,
    useSelector,
    fraze,
  }
}

export default useTypeParams;