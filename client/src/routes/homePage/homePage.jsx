import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">BLACK  FOREST</h1>
          <h1 className="title1">Cross Nation Inteligence Service Platform</h1>
          <p>
          {">>"} Join us in our mission to create a world where safety and security transcend borders. By working together, we can dismantle terrorist networks, prevent attacks, and protect innocent lives. The Cross-Nation Intelligence Platform is not just a platform, but it is a commitment to global peace and security...
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>100+</h1>
              <h2>Collaborated Nations</h2>
            </div>
            <div className="box">
              <h1>3k+</h1>
              <h2>Succesful Operations</h2>
            </div>
            <div className="box">
              <h1>100%</h1>
              <h2>Security Strength</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
