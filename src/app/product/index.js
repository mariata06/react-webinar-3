import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BasketTool from '../../components/basket-tool';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import './style.css';

function Product() {
    const store = useStore();
    
    const [itemInfo, setItemInfo] = useState({});
    const { id } = useParams();

    useEffect(()=>{
        getInfo(id);
    }, [])
    
    const getInfo = async (id) => {
        await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        .then(res => res.json())
        .then(res => {
            return [res.result.title, res.result.description, res.result.madeIn.title, res.result.category.title, res.result.edition, res.result.price, res.result._id]
        })
        .then(res => setItemInfo(res));
    }
    
    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        count: state.catalog.count
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    return (
        <PageLayout>
            <Head title={itemInfo[0]}/>
            <div className='wrapper'>
                <Link to={`/`}>
                    Главная
                </Link>
                <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            </div>
            
            <div className='Product'>
                 <div className='Product-description'>
                    {itemInfo[1]}
                </div>
                <div className='Product-manufacture'>
                    Страна-производитель:&nbsp; <span>{itemInfo[2]}</span>
                </div>
                <div className='Product-category'>
                    Категория:&nbsp; <span>{itemInfo[3]}</span>
                </div>
                <div className='Product-edition'>
                    Год выпуска:&nbsp; <span>{itemInfo[4]}</span>
                </div>
                <div className='Product-price'>
                    Цена:&nbsp; <span>{itemInfo[5]}&nbsp;₽</span>
                </div>
                <button onClick={callbacks.addToBasket}>Добавить</button>
            </div>
        </PageLayout>
    );
}

export default memo(Product);
