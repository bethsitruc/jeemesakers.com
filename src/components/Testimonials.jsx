import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Carl Sode',
      date: 'November 9, 2023',
      title: 'Fantastic Book',
      review: `Prawnocuos Rising is very exciting to read. The author weaves a tail that will draw you into the past, present, and future. He paints a picture of the Orient that helps you experience the exotic locations described. You won't want to put it down. Thought provoking. Short, well written, chapters make it easy to read one after the other and not want to stop. There is adventure, romance, and faith all blended perfectly. The author has proven to be a master story teller. Can't wait to read books two and three of the trilogy.`
    },
    {
        name: 'Hank E.',
        date: 'December 18, 2023',
        title: 'Great book',
        review: `We purchased this book for my father-in-law, Gary Gibson. He enjoyed the book and wrote the following review: I really enjoyed the first book of the Prawnocuos trilogy. It is well-written and easy to read. Although it is set in the future, the author incorporates critical historical events important to the plot. Interesting characters, exotic locations, technological advances, corporate and government controls and religious issues and conflicts kept me absorbed in the book. I am looking forward to reading the second book of the trilogy when it becomes available.`
    },
    {
      name: 'James Koren',
      date: 'January 8, 2024',
      title: 'The author\'s ability to create the scene in your mind\'s eye',
      review: `The author's writing skills are superlative. Having had to read so much “medical” literature over the years, I haven’t read anything for pleasure since middle school and was frankly “burned out” from having to read so much, but I found myself not being able to put down the first book of the trilogy even though I had other things I needed to get done. The author's mastery of putting the reader “there” in each particular scene in the book was phenomenal, everything from what they were wearing to what was going through their mind, to their surroundings was so masterfully orchestrated. How the author developed each character and how those characters interacted with each other was so well done as was the going back and forth from 1942 to the “present” time. I particularly loved the spiritual component and while this is a book of fiction, I believe that many of the events the author describes in the book are actually starting to happen today.
I can’t wait for the 2nd book of the trilogy to come out!`
    },
    {
      name: 'James Koren',
      date: 'June 25, 2024',
      title: 'A Riveting Read!',
      review: `The author has done a splendid job of continuing the five story lines established in the first installment of the Prawnocuos trilogy, tying together those story lines given by the events that have taken place in the past as well as the "present" (actually the future). His mastery of the English language keeps the reader engaged by his descriptive narratives of the various dangerous and exotic world locations. He develops the characters to such a high level of detail that you feel like you know them personally. There is very little "down time" in this edition given the fast pace of the events that take place, including many that are not for the faint of heart. It was difficult to put the book down, wanting to know what is going to happen next. I highly recommend this book and feel it would make a great movie.`
    },
    {
      name: 'Carl Sode',
      date: 'June 1, 2024',
      title: 'Fantastic Book',
      review: `Akers hit another home run with Prawnocus Resplendent his second book in the Prawnocus Trilogy. Fast paced action, gritty reality, exotic locations, and a thought provoking end that left me hoping the third book will be available soon. The five overlapping "quest" cycles discussed in the Preface gave me a clear understanding of the dramatic and potentially earth shaking events unfolding throughout the book. The cast of characters section at the beginning of Resplendent served as a valuable reference to help me keep track of the variety of fascinating personalities laced throughout the story. Concise chapters sparked my interest making me thirsty to read on and on. I didn't want to put Resplendent down. Can't wait to see what happens in volume three. If you're curious about the author then check out Akers website, jeemesakers.com, meet the author and sample his "Missives" or articles written about his amazing life stories, insights into history, global events, and many heart warming experiences.
Prawnocus Resplendent is a fantastic book I highly recommend reading it.`
    },
  ];

  return (
    <section className="testimonial-page">
      <h1>Reader Testimonials</h1>
      {reviews.map((r, index) => (
        <div className="testimonial-tile" key={index}>
          <h3>{r.title}</h3>
          <p className="author">{r.name} &mdash; {r.date}</p>
          <div className="testimonial-stars">★★★★★</div>
          <p className="quote">{r.review}</p>
        </div>
      ))}
    </section>
  );
}