import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import blueGrey from '@mui/material/colors/blueGrey';
import { Link as LinkRoute } from "react-router-dom";
import {ContextCard} from '../../Context/CardContext';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export interface IqttyProduct {
  quantityProduct: number
}

const CartWidget: React.FC<IqttyProduct> = ({quantityProduct}) => {
  
  const { isEmpty, cart } = React.useContext(ContextCard);
  const active = isEmpty(cart);
  return (
    <IconButton aria-label="cart" disabled={active}>
      <LinkRoute to={"/CartView"} replace style={{ textDecoration: "none" }} >
        <StyledBadge badgeContent={quantityProduct} color="secondary">
          <ShoppingCartIcon sx={{fontSize: 32, color: blueGrey[50]}}/>
        </StyledBadge>
      </LinkRoute>
    </IconButton>

  );
}
export default CartWidget;