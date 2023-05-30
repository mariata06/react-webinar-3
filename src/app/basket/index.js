import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket(props) {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket itemPath={'/product/'} item={item} onRemove={callbacks.removeFromBasket} closeModal={callbacks.closeModal} lang={props.lang}/>
    }, [callbacks.removeFromBasket, props.lang]),
  };

  return (
    <ModalLayout title={props.lang?'Корзина':'Basket'} onClose={callbacks.closeModal} lang={props.lang}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} lang={props.lang}/>
    </ModalLayout>
  );
}

export default memo(Basket);
