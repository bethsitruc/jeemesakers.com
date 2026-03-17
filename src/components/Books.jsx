import React from 'react';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';

const books = [
  {
    title: 'Prawnocuos Rising',
    image: book1,
    amazonUrl: 'https://a.co/d/0chEgyB',
    announcement: 'NOW COMES A MUST-READ EPIC FROM A NEW STORYTELLER. JEEMES L. AKERS',
    quoteLines: [
      <><b>Just as Stephen was ready to leave,</b> he noticed a tear trickling down the man's cheek. "Please don't go," the man said, "I have been waiting for you for so long. God has finally answered my prayers. But now that you're here, I don't know what to say."</>,
      '"But we\'ve never met - "',
      '"God doesn\'t make mistakes. I was told to wait for you."',
      '"How long have you been waiting?"',
      '"I have come here -  to this bench - every day for the past five years."',
    ],
    paragraphs: [
      'Fifteen years in the future, in the suburbs of Washington D.C. a teenager\'s seemingly harmless prank turns into a potential worldwide pandemic when he stumbles across a hastily buried body; a medical mystery tracing back to the Japanese military campaign for Singapore; the world\'s most expensive artwork with a deadly secret; a secretive team of the world\'s greatest virologists and a simple janitor; a group of end-time believers with a special mission; a mysterious and powerful Hong Kong Tong leader and his flamboyant daughter; and a technological megafirm headed by the world\'s richest - and most eccentric - trillionaire entrepreneur: all key ingredients in a quest to prevent a relentlessly escalating crisis.',
      <><i>Prawnocuos Rising</i> - the first book in the Prawnocous Trilogy - is an extraordinary Christian techno-thriller, full of unlikely heroines and villains, unusual and unforgettable characters, exotic Asian locations, jaded "Swamp" denizens, and opportunistic technocrats. It brims with powerful warnings for future believers and delivers a heart-pounding read that transports readers to the brink of the unthinkable.</>,
    ],
  },
  {
    title: 'Prawnocuos Resplendent',
    image: book2,
    amazonUrl: 'https://a.co/d/6960XhM',
    announcement: 'NOW COMES THE SECOND PART OF A MUST-READ EPIC FROM A NEW STORYTELLER, JEEMES L. AKERS',
    quoteLines: [
      <><b>"How long have I been here?"</b> Jarvis whispered, struggling to get out the words:</>,
      '"Five hours. We thought we had lost you."',
      'Jarvis\'s throat hurt with every word. "What happened?"',
      '"Not sure, hoping you could tell us."',
      '"What about the guy who was trying to kill me?"',
      'There was a pause.',
      'Mule\'s voice. "Alvin, when we got there you were lying on the floor, unconscious. Blood was everywhere-"',
      '"What about the other guy?"',
      '"There was no other guy there, Alvin. Only a woman-"',
      '"One of the dancers?"',
      '"No. A woman shot in the back of head-"',
      'Jarvis\'s senses reeled. "What?"',
    ],
    paragraphs: [
      'Fifteen years in the future, in the suburbs of Washington D.C., a teenager\'s seemingly harmless prank turns into a potential worldwide pandemic when he stumbles across a hastily buried body; a medical mystery tracing back to the Japanese military campaign for Singapore; the world\'s most expensive artwork with a deadly secret; a secretive team of the world\'s greatest virologists and a simple janitor; a group of end-time believers with a special mission; a loveable old lady possessing a treasure trove of mysterious secrets; and a power struggle within a technological megafirm headed by the world\'s richest - and most eccentric - trillionaire entrepreneur: all key ingredients in a quest to prevent a relentlessly escalating crisis.',
      <><i>Prawnocuos Resplendent</i> - the second book in the Prawnocous Trilogy - is an extraordinary Christian techno-thriller, full of unlikely heroines and villains, unusual and unforgettable characters, exotic Asian locations, jaded "Swamp" denizens, opportunistic technocrats, and a budding romance. It brims with powerful warnings for future believers and delivers a heart-pounding read that transports readers to the brink of the unthinkable.</>,
    ],
  },
  {
    title: 'Prawnocuos Falling',
    image: book3,
    amazonUrl: 'https://a.co/d/0obuyom',
    announcement: 'NOW COMES THE THIRD AND CONCLUDING PART OF THE PAWNOCUOS TRILOGY A MUST-READ EPIC FROM A NEW STORYTELLER, JEEMES AKERS',
    quoteLines: [
      <><b>"I\'ve heard the Dragon\'s Den was a former opium den and brothel,"</b> Stephen said.</>,
      '"Perhaps," Ruby replied, "we native Thais don\'t talk about it. To reveal its location-so the story goes-is to invite a pickax in the back of the head.',
      'I can\'t emphasize enough how dangerous that place is.',
      'Those teenagers defy any social norm. These are not yesterday\'s TikTok, Messenger, or X users out to create havoc-they are total misfits.',
      'The human excrement of urbanized technology, Asian-style.',
      'Those kids have been fed a steady dose of media-orchestrated violence for most of their lives. Imagine the worst dystopian scene in virtual reality. Even that may not come close.',
      'In Bangkok, they are worse than the most inhumane Chinese Teochiu secret society."',
    ],
    paragraphs: [
      'Fifteen years in the future, in the suburbs of Washington D.C., a teenager\'s seemingly harmless prank turns into a potential worldwide pandemic when he stumbles across a hastily buried body; a medical mystery tracing back to the Japanese military campaign for Singapore during WWII; the world\'s most expensive artwork over a vault containing a deadly secret; a secretive team of the world\'s greatest virologists and a simple janitor; a group of end-time believers with a special mission; a ruthless Bangkok cyber gang; a high-stakes kidnapping; and a power struggle within a technological megafirm headed by the world\'s richest, most eccentric, and completely evil trillionaire entrepreneur: all key ingredients in a quest to prevent a relentlessly escalating crisis.',
      <><i>Prawnocuos Falling</i> - the third and final book in the Prawnocous Trilogy - is an extraordinary Christian techno-thriller, full of unlikely heroines and villains, unusual and unforgettable characters, exotic Asian locations, jaded "Swamp" denizens, opportunistic technocrats, foreign cyber-gangs, and a budding teenage romance. It brims with powerful warnings for future believers and delivers a heart-pounding read that transports readers to the brink of the unthinkable.</>,
    ],
  },
];

function BookTile({ book }) {
  return (
    <div className="book-tile">
      <div className="book-tile__info">
        <img src={book.image} alt={book.title} />
        <h3>{book.title}</h3>
        <h4 className="book-subheading">
          Now available on{' '}
          <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
            Amazon
          </a>
        </h4>
      </div>
      <div className="book-tile__description">
        <h4>As a believer, have you wondered what the future will hold for your children and grandchildren?</h4>
        <p>{book.announcement}</p>
        <p className="book-quote">
          {book.quoteLines.map((line, index) => (
            <React.Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </p>
        {book.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default function Books() {
  return (
    <section className="books-page">
      <h1>The Prawnocous Trilogy</h1>
      <div className="book-section">
        {books.map((book) => (
          <BookTile key={book.title} book={book} />
        ))}
      </div>
    </section>
  );
}
