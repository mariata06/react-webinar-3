import StoreModule from "../module";

/**
 * Категории товаров
 */
class CategoriesState extends StoreModule {
    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            categories: [],
            waiting: false // признак ожидания загрузки
        }
    }

    async loadCategories() {
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const json = await response.json();
        
        let arr = [{value: '', title: 'Все'}];

        this.setState({
            categories: arr,
            waiting: true
        });
    
        const childFinder = (parent, depth) => {
            json.result.items.map(item => {
                if (item.parent && item.parent._id === parent._id) {
                    arr.push({value: item._id, title: '- '.repeat(depth) + item.title})
                    childFinder(item, depth+1)
                }
            })
        }
    
        json.result.items.map(item => {
            if (!item.parent) {
                arr.push({value: item._id, title: item.title})
                childFinder(item, 1)
            }
        })
    
        this.setState({
            ...this.getState(),
            categories: arr,
            waiting: false
        }, 'Загружены категории товаров из АПИ');
    }
}

export default CategoriesState;