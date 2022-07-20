import * as React from "react";
import ItemDetail from "../../ItemDetail/ItemDetail";
import { useParams } from 'react-router-dom';
import serviceJson from '../../services/serviceJson';
import useEffectOnce from '../../../hooks/useOnceEffect';

const ItemListContainer = () => {
  const [product, setProduct]: any = React.useState<any>({});
  const param = useParams();

  const getData = () => {
    serviceJson().then((resp: any) => {
      const itemSelected = resp.find((item: any) => item.id.toString() === param.id)
      setProduct(itemSelected);
    });
  }
  useEffectOnce(() => {
    getData();
  })

  return (
    <>
      <br />
        <ItemDetail itemProduct={product} />
      <br />
    </>
  )
};

export default ItemListContainer;
