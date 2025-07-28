import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { posts } from './index';

// Component to display a single missive/post based on the URL slug
function Missive() {
  // Get the slug parameter from the URL
  const { slug } = useParams();
  // Get the current location object (for query params, etc.)
  const location = useLocation();
  // Get the page query parameter (default to "1" if not present)
  const page = new URLSearchParams(location.search).get("page") || "1";
  // Find the post that matches the slug
  const post = posts.find((p) => p.slug === slug);

  // Scroll to top when the slug changes (navigating to a new post)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If no post is found, show a not found message
  if (!post) return <div>Missive not found</div>;

  // Get the React component and metadata for the post
  const PostComponent = post.component;
  const { title, date } = post.metadata;

  return (
    <div className="missive">
      <div className="missive-tile">
        <div className="missive-tile-header">
          {/* Display the post date */}
          <div className="missive-date">
            <h4>{date}</h4>
          </div>
          {/* Display the post title */}
          <div className="missive-tile-title">
            <h1>{title}</h1>
          </div>
        </div>
        {/* Display the post image */}
        <div className="missive-tile-image">
            <img src={post.metadata.image} alt={title} />
        </div>
        {/* Render the post content (MDX or JSX) */}
        <PostComponent />
      </div>
    </div>
  );
}

export default Missive;