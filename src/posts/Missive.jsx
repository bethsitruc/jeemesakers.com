import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug, loadPostComponent } from './index';

// Component to display a single missive/post based on the URL slug
function Missive() {
  // Get the slug parameter from the URL
  const { slug } = useParams();
  // Find the post that matches the slug
  const post = getPostBySlug(slug);
  const [PostComponent, setPostComponent] = useState(null);
  const [loadError, setLoadError] = useState(false);

  // Scroll to top when the slug changes (navigating to a new post)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    if (!post) {
      setPostComponent(null);
      setLoadError(false);
      return undefined;
    }

    setPostComponent(null);
    setLoadError(false);

    loadPostComponent(post)
      .then((component) => {
        if (!cancelled) {
          setPostComponent(() => component);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [post]);

  // If no post is found, show a not found message
  if (!post) return <div>Missive not found</div>;

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
        {loadError ? <p>Unable to load this missive right now.</p> : PostComponent ? <PostComponent /> : <p>Loading missive...</p>}
      </div>
    </div>
  );
}

export default Missive;
