import React from 'react';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import MainConstructor from './MainConstructor';
import bun from '../../images/bun-02.png';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../services/actions/orderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { CONSTRUCTOR_ADD } from '../../services/actions/burgerConstructor';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid'; 
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookies';


function BurgerConstructor() {
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const accessToken = getCookie('accessToken')
  const addedIngredients = useSelector(state => state.burgerConstructorReducer);
  const orderNumber = useSelector(state => state.orderDetailsReducer.orderNumber);
  const userInfo = useSelector((state) => state.userRequestReducer.userInfo);

  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(null);
  const [modalData, setModalData] = React.useState(null);

  const mains = React.useMemo(() => addedIngredients.ingredients.filter(
    (ingredient) => ingredient.type !== 'bun'), [addedIngredients.ingredients]);

  const constructor = {
    "ingredients": [ 
      addedIngredients.bun._id,
      ...addedIngredients.ingredients.map((ingredient) => ingredient._id),
      addedIngredients.bun._id
    ]
  };

  function openModal() {
    if(!userInfo) {
      navigate('/login')
      return;
    } 
    dispatch(getOrderNumber(constructor, accessToken, setModalData));
    setOrderDetailsOpen(true);
  };

  function closeModal () {
    setOrderDetailsOpen(false);
    setModalData(null);
  };
  
  React.useEffect(() => {
    let price = 0
    price = addedIngredients.bun.price * 2
    addedIngredients.ingredients.map((item) => {
      price = price + item.price;
      }, [addedIngredients.ingredients]
    )
    setTotalPrice(price);
  }, [addedIngredients]);

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
        dispatch ({
            type: CONSTRUCTOR_ADD,
            payload: { ...item, key: uuidv4()}
        }) 
    },
  });

  return (
    <section className={`${styles.section} mt-25 pl-6`} ref={dropTarget}>

      <div className={styles.list}>
        <div className={styles.bun}>
          <ConstructorElement
            text={addedIngredients.bun.name ? `${addedIngredients.bun.name} (верх)` : 'Выберите булку'}
            thumbnail={addedIngredients.bun.image_mobile ? addedIngredients.bun.image_mobile : bun}
            price={addedIngredients.bun.price}
            type="top"
            isLocked={true}
          />
        </div>
        
        <ul className={`${styles.innerList} mt-4 mb-4`}>
          {
            mains.map((ingredient, index) => {
              return (
                <MainConstructor key={ingredient.key} ingredient={ingredient} index={index} />
              )
            })
          }
              
        </ul>  

        <div className={styles.bun}>                           
          <ConstructorElement
            text={addedIngredients.bun.name ? `${addedIngredients.bun.name} (низ)` : 'Выберите булку'}
            thumbnail={addedIngredients.bun.image_mobile ? addedIngredients.bun.image_mobile : bun}
            price={addedIngredients.bun.price}
            type="bottom"
            isLocked={true}
          />
        </div>
      </div>
            
      <div className={`${styles.total} mt-10 mr-1`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium">{totalPrice ? totalPrice : 0}</p>
          <div className={styles.currencyIcon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button type="primary" size="large" htmlType='button' onClick={() => !!addedIngredients.bun._id ? openModal() : null}>Оформить заказ</Button>
      </div> 

      {orderDetailsOpen && modalData &&
        <Modal closeModal={closeModal}>
          <OrderDetails  closeModal={closeModal} orderNumber={orderNumber.number} />
        </Modal> 
      }   

    </section>
  )
}

export default BurgerConstructor
