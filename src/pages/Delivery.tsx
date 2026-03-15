import React from 'react';
import { Truck, Clock, MapPin, Phone, Mail } from 'lucide-react';

const Delivery: React.FC = () => {
  return (
    <div className="delivery">
      <div className="delivery__hero">
        <div className="delivery__hero-content">
          <h1 className="delivery__title">Delivery & Payment</h1>
          <p className="delivery__subtitle">
            We care about your plants arriving fresh and healthy
          </p>
        </div>
      </div>

      <div className="delivery__content">
        <section className="delivery__section">
          <h2 className="delivery__section-title">
            <Truck size={24} />
            Delivery Methods
          </h2>
          <div className="delivery__cards">
            <div className="delivery__card">
              <h3>Courier Delivery</h3>
              <p>Home delivery within the city</p>
              <div className="delivery__price">from 300 MDL</div>
              <div className="delivery__time">1-2 days</div>
            </div>
            <div className="delivery__card">
              <h3>Pickup</h3>
              <p>Pick up your order from our store</p>
              <div className="delivery__price">Free</div>
              <div className="delivery__time">Same day</div>
            </div>
            <div className="delivery__card">
              <h3>Mail Delivery</h3>
              <p>Shipping to other regions</p>
              <div className="delivery__price">from 500 MDL</div>
              <div className="delivery__time">3-7 days</div>
            </div>
          </div>
        </section>

        <section className="delivery__section">
          <h2 className="delivery__section-title">
            <Clock size={24} />
            Delivery Times
          </h2>
          <div className="delivery__info">
            <div className="delivery__info-item">
              <h4>Within the city</h4>
              <p>Delivery is carried out within 1-2 working days from the moment of order confirmation.</p>
            </div>
            <div className="delivery__info-item">
              <h4>Within the region</h4>
              <p>Shipping is carried out within 1-3 working days, delivery takes 2-5 days.</p>
            </div>
            <div className="delivery__info-item">
              <h4>Pickup</h4>
              <p>The order can be picked up on the day of registration or the next working day.</p>
            </div>
          </div>
        </section>

        <section className="delivery__section">
          <h2 className="delivery__section-title">
            Payment Methods
          </h2>
          <div className="delivery__payment">
            <div className="delivery__payment-item">
              <h4>Cash on delivery</h4>
              <p>Payment to the courier or upon pickup</p>
            </div>
            <div className="delivery__payment-item">
              <h4>Bank card</h4>
              <p>Online payment or upon receipt</p>
            </div>
            <div className="delivery__payment-item">
              <h4>Bank transfer</h4>
              <p>For legal entities</p>
            </div>
          </div>
        </section>

        <section className="delivery__section">
          <h2 className="delivery__section-title">
            <MapPin size={24} />
            Contacts
          </h2>
          <div className="delivery__contacts">
            <div className="delivery__contact-item">
              <Phone size={20} />
              <div>
                <strong>Phone:</strong>
                <br />
                +373 60 123 456
              </div>
            </div>
            <div className="delivery__contact-item">
              <Mail size={20} />
              <div>
                <strong>Email:</strong>
                <br />
                hello@florashop.com
              </div>
            </div>
            <div className="delivery__contact-item">
              <MapPin size={20} />
              <div>
                <strong>Address:</strong>
                <br />
                Chisinau, Moldova
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Delivery;