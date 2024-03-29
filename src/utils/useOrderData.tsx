import { useMatch } from "react-router-dom";
import { useSelector, IOrder, IIngredient } from '../services/types/types';


export function useOrderData(order: IOrder | undefined) {

  const ingredients = useSelector((state) => state.burgerIngredientsReducer.ingredients);

  const getOrderList = () => {
    const elements: Array<IIngredient> = [];
    order?.ingredients.forEach((ingredientId) => {
      ingredients.forEach((ingredient) => {
        if (ingredient._id === ingredientId) {
          elements.push(ingredient);
        }
      });
    });
    return elements;
  };

  const orderIngredients = getOrderList();

  const getOrderStatus = () => {
    if (order?.status === "done") {
      return "Выполнен";
    } else {
      return "Готовится";
    }
  };

  const orderStatus = getOrderStatus();

  const orderPrice = orderIngredients.reduce((count, item) => {
    return count + item.price;
  }, 0);

  const feedMatch = useMatch('/feed');
  const matchProfile = useMatch('/profile/orders/');

  return { orderIngredients, orderStatus, orderPrice, feedMatch, matchProfile };
}
