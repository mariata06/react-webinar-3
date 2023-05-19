import React, {useCallback, useEffect, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import Modal from "./components/modal";
import PageLayout from "./components/page-layout";
import CartTotal from './components/cart-total';
import './app.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  //Исходное состояние модалки
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Автозакрытие корзины при удалении последнего товара из нее
  useEffect(() => {
    if (modalIsOpen && store.getState().totalAmount === 0) {
      setModalIsOpen(prev => !prev);
    }
  }, [store.getState().totalAmount])

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalAmount = store.getState().totalAmount;
  const totalCost = store.getState().totalCost;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),

    addToCart: useCallback((item) => {
      store.addToCart(item);
    }, [store]),

    goToCart: useCallback(() => {
      // store.goToCart();
      setModalIsOpen(prev => !prev);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <div className='wrapper'>
        <CartTotal totalAmount={totalAmount} totalCost={totalCost}/>
        <Controls goToCart={callbacks.goToCart} btnName={'Перейти'}/>
      </div>
      <List list={list}
            // onDeleteItem={callbacks.onDeleteItem}
            // onSelectItem={callbacks.onSelectItem}
            onAdd={callbacks.addToCart} 
            />
      {modalIsOpen && <Modal cart={cart} totalCost={totalCost} onDeleteItem={callbacks.onDeleteItem} goToCart={callbacks.goToCart}/>}      
    </PageLayout>
  );
}

export default App;
