import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { posts } from '../posts/index';

function Missive() {
  const { slug } = useParams();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page") || "1";
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <div>Missive not found</div>;

  const PostComponent = post.component;
  const { title, date } = post.metadata;

  return (
    <div className="missive">
      <div className="missive-tile">
        <div className="missive-tile-header">
        <div className="missive-date">
            <h4>{date}</h4>
          </div>
          <div className="missive-tile-title">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="missive-tile-image">
            <img src={post.metadata.image} alt={title} />
          </div>
        <PostComponent />
      </div>
    </div>
  );
}

export default Missive;