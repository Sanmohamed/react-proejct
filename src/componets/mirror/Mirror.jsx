import React from 'react'
import '../mirror/mirror.css'
import { Card } from 'react-bootstrap'
import Img12 from '../../img/مراة.webp';
import Img11 from '../../img/CLA-423-043_FRONT.webp';
import Img13 from '../../img/christopher-guy-christopher-guy-handgearbeiteter-spiegel-modular-50-3054-grosse-a-von-instylior-spiegel-modular-233899.webp';

function Mirror() {
  return (
    <div className='container'>
      <h3>اثاث</h3>
      <hr />

      <Card className="bg-light position-relative mt-3">
        <Card.Body className="row align-items-center">
          <div className="col-6 test">
            <img src={Img12} alt="طاولة طعام" className="img-fluid" />
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
            <img src={Img11} alt="كرسي بذراعين" className="img-fluid" />
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
            <img src={Img13} alt="طاولات جانبية" className="img-fluid" />
          </div>
          <div className="col">
            <h3>طاولات جانبية</h3>
            <p>3500 €</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Mirror
