import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";

function ListPage() {
  const data = useLoaderData();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (data.postResponse) {
      data.postResponse.then(response => {
        setPosts(response.data);
        setLoading(false);
      });
    }
  }, [data.postResponse]);

  // Handle post deletion
  const handleDeletePost = (deletedPostId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
  };

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        <Suspense fallback={<p>Loading...</p>}>
        {loading ? (
              <p>Loading...</p>
            ) : (
              posts.map((post) => (
                <Card 
                  key={post.id} 
                  item={post} 
                  onDelete={handleDeletePost}
                />
              ))
            )}
          </Suspense>
      </div>
    </div>
    <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
  </div>;
}

export default ListPage;
