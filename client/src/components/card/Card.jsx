import { Link } from "react-router-dom";
import "./card.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function Card({ item , onDelete }) {
  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8800/api/posts/${item.id}`, {
        withCredentials: true,
      });
      
      if (onDelete) {
        onDelete(item.id);
      }
      
      // Optional: show success message
      alert(response.data.message || "Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message;
      alert(`Failed to delete post: ${errorMessage}`);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">{item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} Deaths</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} Injuries</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
            {currentUser?.id === item.userId && (
              <div className="icon delete" onClick={handleDelete}>
                <img src="/delete.png" alt="Delete" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
