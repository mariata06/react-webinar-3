import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  const callbacks = {
    // onDeleteItem: useCallback((code) => {
    //   store.deleteItem(code);
    // }, [store]),

    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),

    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),

    addToCart: useCallback((code) => {
      store.addToCart(code);
    }, [store]),

    goToCart: useCallback(() => {
      store.goToCart();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Controls goToCart={callbacks.goToCart} btnName={'Перейти'}/>
      <List list={list}
            // onDeleteItem={callbacks.onDeleteItem}
            // onSelectItem={callbacks.onSelectItem}
            onAdd={callbacks.addToCart} 
            />
    </PageLayout>
  );
}

export default App;
