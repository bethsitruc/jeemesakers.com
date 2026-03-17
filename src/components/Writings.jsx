import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { posts } from '../posts/index';

// Component to display a paginated list of missives/posts
function Writings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 10;
  const rawPage = searchParams.get('page');
  const parsedPage = Number.parseInt(rawPage ?? '1', 10);

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const requestedPage = Number.isNaN(parsedPage) ? 1 : parsedPage;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    if (rawPage !== null && rawPage !== String(currentPage)) {
      setSearchParams({ page: String(currentPage) }, { replace: true });
    }
  }, [currentPage, rawPage, setSearchParams]);

  const handlePageChange = ({ selected }) => {
    setSearchParams({ page: String(selected + 1) });
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
