import React from 'react';
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';

// Books component displays information about the Prawnocuos Trilogy
export default function Books() {
  return (
    <section className="books-page">
      <h1>The Prawnocous Trilogy</h1>
      <div className="book-section">
        <div className="book-tile">
          <div className="book-tile__info">
            <img src={book1} alt="Prawnocuos Rising" />
            <h3>Prawnocuos Rising</h3>
            <h4 className="book-subheading">Now available on <a href="https://a.co/d/0chEgyB" target="_blank" rel="noopener noreferrer">Amazon</a></h4>
          </div>
          <div className="book-tile__description">
          <h4>As a believer, have you wondered what the future will hold for your children and grandchildren?</h4>
            <p>
              NOW COMES A MUST-READ EPIC FROM A NEW STORYTELLER. JEEMES L. AKERS
            </p>
            <p className="book-quote">
                <b>Just as Stephen was ready to leave,</b> he noticed a tear trickling down the man's cheek. "Please don't go," the man said, "I have been waiting for you for so long. God has finally answered my prayers. But now that you're here, I don't know what to say."
                <br />"But we've never met - "
                <br />"God doesn't make mistakes. I was told to wait for you."
                <br />"How long have you been waiting?"
                <br />"I have come here -  to this bench - every day for the past five years."
            </p>
            <p>
                Fifteen years in the future, in the suburbs of Washington D.C. a teenager's seemingly harmless prank turns into a potential worldwide pandemic when he stumbles across a hastily buried body; a medical mystery tracing back to the Japanese military campaign for Singapore; the world's most expensive artwork with a deadly secret; a secretive team of the world's greatest virologists and a simple janitor; a group of end-time believers with a special mission; a mysterious and powerful Hong Kong Tong leader and his flamboyant daughter; and a technological megafirm headed by the world's richest - and most eccentric - trillionaire entrepreneur: all key ingredients in a quest to prevent a relentlessly escalating crisis.
            </p>
            <p>
                <i>Prawnocous Rising</i> - the first book in the Prawnocous Trilogy - is an extraordinary Christian techno-thriller, full of unlikely heroines and villains, unusual and unforgettable characters, exotic Asian locations, jaded "Swamp" denizens, and opportunistic technocrats. It brims with powerful warnings for future believers and delivers a heart-pounding read that transports readers to the brink of the unthinkable.
            </p>
          </div>
        </div>
        <div className="book-tile">
          <div className="book-tile__info">
            <img src={book2} alt="Prawnocuos Resplendent" />
            <h3>Prawnocuos Resplendent</h3>
            <h4 className="book-subheading">Now available on <a href="https://a.co/d/6960XhM" target="_blank" rel="noopener noreferrer">Amazon</a></h4>
          </div>
          <div className="book-tile__description">
          <h4>As a believer, have you wondered what the future will hold for your children and grandchildren?</h4>
            <p>
                NOW COMES THE SECOND PART OF A MUST-READ EPIC FROM A NEW STORYTELLER, JEEMES L. AKERS
            </p>
            <p className="book-quote">
              <b>"How long have I been here?"</b> Jarvis whispered, struggling to get out the words:
              <br />"Five hours. We thought we had lost you."
              <br />Jarvis's throat hurt with every word. "What happened?"
              <br />"Not sure, hoping you could tell us."
              <br />"What about the guy who was trying to kill me?"
              <br />There was a pause.
              <br />Mule's voice. "Alvin, when we got there you were lying on the floor, unconscious. Blood was everywhere—"
              <br />"What about the other guy?"
              <br />"There was no other guy there, Alvin. Only a woman—"
              <br />"One of the dancers?"
              <br />"No. A woman shot in the back of head—"
              <br />Jarvis's senses reeled. "What?"
            </p>
            <p>
              Fifteen years in the future, in the suburbs of Washington D.C., a teenager's seemingly harmless prank turns into a potential worldwide pandemic when he stumbles across a hastily buried body; a medical mystery tracing back to the Japanese military campaign for Singapore; the world's most expensive artwork with a deadly secret; a secretive team of the world's greatest virologists and a simple janitor; a group of end-time believers with a special mission; a loveable old lady possessing a treasure trove of mysterious secrets; and a power struggle within a technological megafirm headed by the world's richest - and most eccentric - trillionaire entrepreneur: all key ingredients in a quest to prevent a relentlessly escalating crisis.
            </p>
            <p>
              <i>Prawnocuos Resplendent</i> - the second book in the Prawnocuos Trilogy - is an extraordinary Christian techno-thriller, full of unlikely heroines and villains, unusual and unforgettable characters, exotic Asian locations, jaded "Swamp" denizens, opportunistic technocrats, and a budding romance. It brims with powerful warnings for future believers and delivers a heart-pounding read that transports readers to the brink of the unthinkable.
            </p>
          </div>
        </div>
        <div className="book-tile">
          <div className="book-tile__info">
            <img src={book3} alt="Prawnocuos Falling" />
            <h3>Prawnocuos Falling</h3>
            <h4 className="book-subheading">Now available on <a href="https://a.co/d/0obuyom" target="_blank" rel="noopener noreferrer">Amazon</a></h4>
          </div>
          <div className="book-tile__description">
          <h4>As a believer, have you wondered what the future will hold for your children and grandchildren?</h4>
            <p>
            NOW COMES THE THIRD AND CONCLUDING PART OF THE PAWNOCUOS TRILOGY
            A MUST-READ EPIC FROM A NEW STORYTELLER, JEEMES AKERS
            </p>
            <p className="book-quote">
              <b>“I’ve heard the Dragon’s Den was a former opium den and brothel,”</b> Stephen said.
                <br />"Perhaps,” Ruby replied, “we native Thais don’t talk about it. To reveal its location—so the story goes—is to invite a pickax in the back of the head.
                <br />I can’t emphasize enough how dangerous that place is.
                <br />Those teenagers defy any social norm. These are not yesterday’s TikTok, Messenger, or X users out to create havoc—they are total misfits.
                <br />The human excrement of urbanized technology, Asian-style.
                <br />Those kids have been fed a steady dose of media-orchestrated violence for most of their lives. Imagine the worst dystopian scene in virtual reality. Even that may not come close.
                <br />In Bangkok, they are worse than the most inhumane Chinese Teochiu secret society.”
             </p>
             <p>
              Fifteen years in the future, in the suburbs of Washington D.C., a teenager’s seemingly harmless prank turns into a potential worldwide pandemic when he stumbles across a hastily buried body; a medical mystery tracing back to the Japanese military campaign for Singapore during WWII; the world’s most expensive artwork over a vault containing a deadly secret; a secretive team of the world’s greatest virologists and a simple janitor; a group of end-time believers with a special mission; a ruthless Bangkok cyber gang; a high-stakes kidnapping; and a power struggle within a technological megafirm headed by the world’s richest, most eccentric, and completely evil trillionaire entrepreneur: all key ingredients in a quest to prevent a relentlessly escalating crisis.
             </p>
            <p>
              <i>Prawnocuos Falling</i> - the third and final book in the Prawnocuos Trilogy - is an extraordinary Christian techno-thriller, full of unlikely heroines and villains, unusual and unforgettable characters, exotic Asian locations, jaded “Swamp” denizens, opportunistic technocrats, foreign cyber-gangs, and a budding teenage romance. It brims with powerful warnings for future believers and delivers a heart-pounding read that transports readers to the brink of the unthinkable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}