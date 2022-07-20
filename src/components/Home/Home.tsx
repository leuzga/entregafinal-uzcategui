import React from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import ItemListContainer from '../Containers/ItemListContainer/ItemListContainer'
import serviceJson from '../services/serviceJson';
import useEffectOnce from '../../hooks/useOnceEffect';
import {customAlphabet} from 'nanoid';
import {ContextCard} from '../../Context/CardContext';


const Home = () => {

  const { isEmpty, cart, setOrderId } = React.useContext(ContextCard);
  
  const mensaje = "Bienvenido...";
  const [dataJson, setDataJson]: any = React.useState<any[]>([]);
  const [categoryProd, setCategoryProd]: any =React.useState<any[]>([]);
  const param = useParams();
  const navigate = useNavigate();

  useEffectOnce(() => {
    serviceJson().then((resp: any) => {
      setDataJson(resp);
    });
  })
  const nanoid = customAlphabet('1234567890', 10)
  useEffectOnce(() => {
    if(isEmpty(cart)) {
      setOrderId(nanoid())
    }
  })
  React.useEffect(() => {
    const pages = ["Home", "Men", "Women", "Jewelery", "Electronics", "About"];
    const x: string = param.id === undefined ? 'Home': `${param.id}`;
    if(!pages.includes(x)){
      navigate('/Error');
      return
    } 
    if(x !== "Home" || param === {}  ){
      setCategoryProd(dataJson.filter((item: { category: string | undefined; }) =>  item.category === param.id))
    }
  }, [param.id, dataJson, param, navigate]);

  return (
      <ItemListContainer
          mensaje={mensaje}
          objProducts={(param.id === "Home" || param.id === undefined) ? dataJson : categoryProd}
          category={param.id === undefined ? "Home" : param.id} /> 
  );
}

export default Home