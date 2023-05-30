import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      itemsPerPage: 10,
      currentPage: 0,
      maxPage: 0
    }
  }

  //изначальное состояние пагинации
  // const itemsPerPage = 10;
  // const [maxPage, setMaxPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);

  async load(p) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${p*10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      currentPage: p,
      maxPage: Math.ceil(json.result.count / this.getState().itemsPerPage)
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
