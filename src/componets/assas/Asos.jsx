import React from 'react';
import { Card } from 'react-bootstrap';
import Img4 from '../../img/table.bmp';
import Img3 from '../../img/chair.bmp';
import Img8 from '../../img/طاولات جانبية.webp';
import '../assas/asos.css'
function Asos() {
  return (
    <div className='container'>
      <h3>اثاث</h3>
      <hr />

      <Card className="bg-light position-relative mt-3">
        <Card.Body className="row align-items-center">
          <div className="col-6 test">
            <img src={Img4} alt="طاولة طعام" className="img-fluid" />
          </div>
          <div className="col">
            <h3>طاولة طعام</h3>
            <p>3000 €</p>
          </div>
        </Card.Body>
      </Card>

      <Card className="bg-light position-relative mt-3">
        <Card.Body className="row align-items-center">
          <div className="col-4 test">
            <img src={Img3} alt="كرسي بذراعين" className="img-fluid" />
          </div>
          <div className="col">
            <h3>كرسي بذراعين</h3>
            <p>1500 €</p>
          </div>
        </Card.Body>
      </Card>

      <Card className="bg-light position-relative mt-3">
        <Card.Body className="row align-items-center">
          <div className="col-4 test">
            <img src={Img8} alt="طاولات جانبية" className="img-fluid" />
          </div>
          <div className="col">
            <h3>طاولات جانبية</h3>
            <p>3500 €</p>
          </div>
        </Card.Body>
      </Card>
    </div>

  );
}

export default Asos;




