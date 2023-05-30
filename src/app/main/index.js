import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Wrapper from '../../components/wrapper';

function Main(props) {
  //изначальное состояние пагинации
  // const itemsPerPage = 10;
  // const [maxPage, setMaxPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  
  const store = useStore();

  // useEffect(() => {
  //   setMaxPage(Math.ceil(select.count / select.itemsPerPage));
  // }, [store.getState().catalog.count]);

  useEffect(() => {
    store.actions.catalog.load(select.currentPage);
  // }, [select.currentPage]);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    itemsPerPage: state.catalog.itemsPerPage,
    currentPage: state.catalog.currentPage,
    maxPage: state.catalog.maxPage
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переход на страницу
    // changePageHandler: useCallback(p => setCurrentPage(p), [currentPage]),
    changePageHandler: useCallback(p => store.actions.catalog.load(p), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={props.lang}/>
    }, [callbacks.addToBasket, props.lang]),
  };

  return (
   
    <PageLayout>
      <Head title={props.lang?'Магазин':'Shop'}/>
      <Wrapper 
        openModalBasket={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        lang={props.lang} 
        setLang={props.setLang}
      />
      <List 
        list={select.list} 
        renderItem={renders.item}
      />
      <Pagination 
        maxPage={select.maxPage}
        currentPage={select.currentPage}
        changePageHandler={callbacks.changePageHandler}
      />
    </PageLayout>
    
  );
}

export default memo(Main);
