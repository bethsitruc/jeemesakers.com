import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { posts } from '../posts/index';

function Writings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const postsPerPage = 10;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = ({ selected }) => {
    setSearchParams({ page: selected + 1 });
  };

  return (
    <section className="writings-page">
      <h1>Missives</h1>
      <div className="missive-list">
        {currentPosts.length === 0 && <p>No posts found.</p>}
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