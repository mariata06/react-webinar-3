import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductCard(props){
    const cn = bem('ProductCard');
    const callbacks = {
        onAdd: () => props.addToBasket(props.item._id)
    }

    let country = {...props.item.madeIn};
    let category = {...props.item.category}

    return (
        <div className={cn()}>
            <div className={cn('description')}>
                {props.item.description}
            </div>

            {props.lang?<div className={cn('manufacture')}>
                Страна-производитель:&nbsp; <span>{country.title}</span>
            </div>:
            <div className={cn('manufacture')}>
                Country:&nbsp; <span>{country.title}</span>
            </div>}

            {props.lang?<div className={cn('category')}>
                Категория:&nbsp; <span>{category.title}</span>
            </div>:
            <div className={cn('category')}>
                Category:&nbsp; <span>{category.title}</span>
            </div>}

            {props.lang?<div className={cn('edition')}>
                Год выпуска:&nbsp; <span>{props.item.edition}</span>
            </div>:
            <div className={cn('edition')}>
                Year of production:&nbsp; <span>{props.item.edition}</span>
            </div>}

            {props.lang?<div className={cn('price')}>
                Цена:&nbsp; <span>{props.item.price}&nbsp;₽</span>
            </div>:
            <div className={cn('price')}>
                Price:&nbsp; <span>{props.item.price}&nbsp;₽</span>
            </div>}

            {props.lang?<button onClick={callbacks.onAdd}>Добавить</button>:
                <button onClick={callbacks.onAdd}>Add</button>}
        </div>
    );
}

export default memo(ProductCard);
