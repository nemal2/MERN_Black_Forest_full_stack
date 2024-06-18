import "./aboutPage.scss";


function AboutPage() {

    
    return ( 
        <div className="aboutPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Us</h1>
          <p className="para">
          Join us in our mission to create a world where safety and security transcend borders. By working together, we can dismantle terrorist networks, prevent attacks, and protect innocent lives. The Cross-Nation Intelligence Platform is not just a platform, but it is a commitment to global peace and security.
          </p>
        
          <div className="boxes">
            <div className="box">
              <h1>100+</h1>
              <h2>Collaborated Nations</h2>
            </div>
            <div className="box">
              <h1>3k+</h1>
              <h2>Succesful Operations</h2>
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