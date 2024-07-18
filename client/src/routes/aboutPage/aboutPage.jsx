import "./aboutPage.scss";


function AboutPage() {

    
    return ( 
        <div className="aboutPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p className="para">
           A dedicated platform committed to combating terrorism on a global scale. Our mission is to foster international collaboration and intelligence sharing to prevent and address terrorist activities. By leveraging cutting-edge technology and a vast network of partners, we aim to provide timely information, resources, and support to governments, law enforcement agencies, and the general public. Together, we can create a safer world for all.
          </p>
        
          <div className="boxes">
            <div className="box">
              <h1>UN Branch</h1>
              <h2>Paris, France</h2>
            </div>
            <div className="box">
              <h1>Asia United</h1>
              <h2>Tokyo, Japan</h2>
            </div>
           
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/about3.png" alt="" />
      </div>
    </div>
    );
}

export default AboutPage;