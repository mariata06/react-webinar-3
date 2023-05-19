import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
  //   })
  // };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })

    this.updateTotal();
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            // selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        // return item.selected ? {...item, selected: false} : item;
        return item
      })
    })
  }

  addToCart(item) {
    if (this.state.cart.filter(cartItem => cartItem.code === item.code).length > 0) {
      // если товар уже есть в корзине, увеличение его количества
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem => {
          if (cartItem.code === item.code) {
            return {
              ...cartItem,
              amount: cartItem.amount + 1,
            };
          }
          return cartItem;
        })
      })
    } else {
      // добавление нового в корзину
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {code: item.code, amount: 1, title: item.title, price: item.price}]
      })
    }
    
    this.updateTotal();

    console.log(this.state.cart);
  }

  updateTotal() {
    // пересчет total
    let totalAmount = 0;
    let totalCost = 0;
    this.state.cart.map(cartItem => {
        totalAmount += cartItem.amount;
        totalCost += cartItem.price * cartItem.amount;
    })
    this.setState({
        ...this.state,
        totalAmount: totalAmount,
        totalCost: totalCost
    })
  }
}

export default Store;