import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../utils/api';
import ConstructorContext from '../../services/constructorContext';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import bun from '../../images/bun-02.png';


function BurgerConstructor() {

  const { constructorState } = React.useContext(ConstructorContext);

  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);

  const [totalPrice, setTotalPrice] = React.useState(null);

  const [modalData, setModalData] = React.useState(null);

  const constructor = {
    "ingredients": [ 
      constructorState.bun._id,
      ...constructorState.main.map((ingredient) => ingredient._id),
      constructorState.bun._id
    ]
  };

  function openModal() {
    setOrderDetailsOpen(true);
    getOrderNumber(constructor, setModalData);
  };

  function closeModal () {
    setOrderDetailsOpen(false);
    setModalData(null);
  };
  
  React.useEffect(() => {
    let price = 0
    price = constructorState.bun.price * 2
    constructorState.main.map((item) => {
      price = price + item.price;
      }, [constructorState.main]
    )
    setTotalPrice(price);
  }, [constructorState]);

  return (
    <section className={`${styles.section} mt-25 pl-6`}>
      <div className={styles.list}>
        <div className={styles.bun}>
          <ConstructorElement
            text={constructorState.bun.name ? `${constructorState.bun.name} (верх)` : 'Выберите булку'}
            thumbnail={constructorState.bun.image_mobile ? constructorState.bun.image_mobile : bun}
            price={constructorState.bun.price}
            type="top"
            isLocked={true}
          />
        </div>
        
        <ul className={`${styles.innerList} mt-4 mb-4`}>
          {
            constructorState.main.map((ingredient) => {
              if(ingredient.type !== 'bun') {
                return (
                  <li className={`${styles.item} mb-4`} key={ingredient._id}>
                    <div className={styles.dragIcon}>
                      <DragIcon type="primary" />
                    </div>                                        
                    <ConstructorElement
                      text={ingredient.name}
                      thumbnail={ingredient.image_mobile}
                      price={ingredient.price}
                    />
                  </li>
                )
              }
            })
          }
        </ul>  

        <div className={styles.bun}>                           
          <ConstructorElement
            text={constructorState.bun.name ? `${constructorState.bun.name} (низ)` : 'Выберите булку'}
            thumbnail={constructorState.bun.image_mobile ? constructorState.bun.image_mobile : bun}
            price={constructorState.bun.price}
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
        <Button type="primary" size="large" htmlType='button' onClick={openModal}>Оформить заказ</Button>
      </div> 

      {orderDetailsOpen && modalData &&
        <Modal closeModal={closeModal}>
          <OrderDetails  closeModal={closeModal} orderNumber={modalData.order.number} />
        </Modal> 
      }    
    </section>
  )
}

export default BurgerConstructor
