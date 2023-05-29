import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from 'react-router-dom';
import ProductCard from '../../components/product-card';
import Navigation from '../../components/navigation';

function Product(props) {
    const store = useStore();
    
    const { id } = useParams();

    useEffect(() => {
        store.actions.product.load(id);
    }, [id]);

    const select = useSelector(state => ({
        item: state.product.item,
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    return (
        <PageLayout>
            <Head title={select.item.title}/>
            <Navigation 
                openModalBasket={callbacks.openModalBasket} 
                amount={select.amount} 
                sum={select.sum} 
                lang={props.lang} 
                setLang={props.setLang}
            />
            <ProductCard 
                item={select.item} 
                addToBasket={callbacks.addToBasket} 
                lang={props.lang}
            />
        </PageLayout>
    );
}

export default memo(Product);
