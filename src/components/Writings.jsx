import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { posts } from '../posts/index';

// Component to display a paginated list of missives/posts
function Writings() {
  // Get and set the current page from the URL query parameter
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const postsPerPage = 10;

  // Calculate pagination details
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change event from ReactPaginate
  const handlePageChange = ({ selected }) => {
    setSearchParams({ page: selected + 1 });
  };

  return (
    <section className="writings-page">
      <h1>Missives</h1>
      <div className="missive-list">
        {/* Show message if no posts are found */}
        {currentPosts.length === 0 && <p>No posts found.</p>}
        {/* Render each post as a link to its detail page */}
        {currentPosts.map((post) => (
          <Link to={`/posts/${post.slug}?page=${currentPage}`} key={post.slug} className="missive-list-tile">
            <img src={post.metadata.image} alt={post.metadata.title} />
            <div className="missive-list-content">
              <h3>{post.metadata.title}</h3>
              <p>{post.metadata.date}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination controls */}
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page"
        previousLabel="«"
        nextLabel="»"
        breakLabel="..."
        renderOnZeroPageCount={null}
      />
    </section>
  );
}

export default Writings;