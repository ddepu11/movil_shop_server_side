import React from 'react';
import styled from 'styled-components';

const About = () => (
  <>
    <Wrapper>
      <h2>About Us</h2>
      <p>Lorem ipsum dolor sit amet.</p>
      <div className="vision flex">
        <div className="left">
          <h1>Our Vision</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, dignissimos sunt est fugit dolor in sequi, doloribus
            illo omnis molestias impedit incidunt inventore quos dolores officia
            ea recusandae possimus repudiandae laudantium. Sed culpa porro earum
          </p>
          <p>
            beatae magni reprehenderit at quia, aliquid earum amet. Rem quas
            officiis fugiat et possimus illo sed suscipit aperiam ipsum officia
            praesentium quibusdam accusantium, blanditiis nam repellendus
          </p>
          <p>
            beatae magni reprehenderit at quia, aliquid earum amet. Rem quas
            praesentium quibusdam accusantium, blanditiis nam repellendus sint
            doloremque.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1093&q=80"
          alt=""
        />
      </div>
      <div className="approach flex">
        <img
          src="https://images.unsplash.com/photo-1580783226135-9cbcae976a18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt=""
        />
        <div className="right">
          <h1>Our Approach</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, dignissimos sunt est fugit dolor in sequi, doloribus
          </p>
          <p>
            beatae magni reprehenderit at quia, aliquid earum amet. Rem quas
            officiis fugiat et possimus illo sed suscipit aperiam ipsum officia
            officiis fugiat et possimus illo sed suscipit aperiam ipsum officia
            sint doloremque.
          </p>
          <p>
            beatae magni reprehenderit at quia, aliquid earum amet. Rem quas
            delectus omnis, asperiores nulla tempora? Dolor sit perspiciatis
            sint doloremque.
          </p>
        </div>
      </div>
      <div className="vision flex">
        <div className="left">
          <h1>Our Process</h1>
          <p>
            olestias impedit incidunt inventore quos dolores officia ea
            recusandae possimus repudiandae laudantium. Sed culpa porro earum
            consequuntur nesciunt, sapiente ipsam sequi id mollitia veritatis
          </p>
          <p>
            beatae magni reprehenderit at quia, aliquid earum amet. Rem quas
            officiis fugiat et possimus illo sed suscipit aperiam ipsum officia
            sint doloremque.
          </p>
          <p>
            beatae magni reprehenderit at quia, aliquid earum amet. Rem quas
            officiis fugiat et possimus illo sed suscipit aperiam ipsum officia
            delectus omnis, asperiores nulla tempora? Dolor sit perspiciatis
            sint doloremque.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
          alt=""
        />
      </div>
    </Wrapper>
  </>
);

const Wrapper = styled.main`
  text-align: center;
  padding: 30px 10px;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    color: #222;
    font-size: 3em;
  }
  P {
    font-size: 1em;
    margin-bottom: 50px;
  }
  .vision {
    margin-bottom: 100px;
    .left {
      text-align: start;
      align-self: center;
      margin-right: 10px;
      padding: 0 150px 0 0;
      h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
        color: #222;
      }
      p {
        margin-bottom: 20px;
        line-height: 1.4;
        color: #444;
      }
    }
    img {
      width: 550px;
      height: 600px;
      object-fit: cover;
    }
  }
  .approach {
    margin-bottom: 100px;
    .right {
      text-align: start;
      align-self: center;
      margin-left: 10px;
      padding: 0 0px 0 150px;
      h1 {
        font-size: 2.5em;
        margin-bottom: 20px;
        color: #222;
      }
      p {
        margin-bottom: 20px;
        line-height: 1.4;
        color: #444;
      }
    }
    img {
      width: 550px;
      height: 600px;
      object-fit: cover;
    }
  }
`;

export default About;
