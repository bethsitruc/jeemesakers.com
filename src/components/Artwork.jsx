// ArtworkPage.jsx
import React, { useState } from 'react';

const artworkSections = [
	{
		section: 'Singapore Memories',
		items: [
			{
				title: 'Singapore Temple Stone dragon',
				subtitle: 'chalk with pen overlay',
				image: './artwork/singapore/dragon.png',
				description:
					'This may be my favorite personal artwork. e fourth artwork I would like to mention is my own. As you can see, it is a pen and chalk rendition—with just a splash of red—of a fierce-looking Chinese dragon.<br/>I began the picture during my last week at the embassy in Singapore. Hidden in the shadows of the high-rise glass and steel behemoths of the city-state’s Central Business District is a small cluster of Taoist temples dating back to the early nineteenth century. I particularly liked to visit one of these because inside—amid the pungent smells of incense and burning papers—were two incredible, intricate stone carvings: a dragon on one side, a tiger on the other.<br/>I was determined not to leave Singapore without obtaining an image of the dragon. <br/>To that end, I entered the temple carrying my camera and an art pad. I asked the monk and keeper of the temple if I could take a picture of the dragon. “T-s-k-k, I don’t know,” he said politely (in Asia many believe that taking a picture of a person or thing somehow robs it of its spiritual essence). <br/>“I understand,” I replied, “would it be permissible for me to sketch the carving?” <br/>Obviously, no one had asked him that. “I guess that would be okay,” he said as he stroked his long white chin-whiskers, no doubt pondering the other-worldly ramifications of his decision.<br/>So, I sat there armed with my trusty art pad and pencils, in front of the huge, imposing, fierce-looking dragon stone carving. And started my drawing. From time to time, one or two temple patrons would drift by, look over my shoulder to study what I was doing and grunt their approval or shake their head. <br/>I was still drawing as the first whispers of dusk enveloped the outer temple compound decorated with its festive red lanterns.<br/>Finally, assisted by the light provided by the temple’s many candles, I applied the finishing touches to my drawing. It had taken me almost all day. As I closed my art pad and prepared to leave, I approached the monk. “You have been so kind,” I said, “I would like to leave a small donation for the temple.” <br/>“You don’t have to do that,” he said with a smile. Then looking over both shoulders to make sure no one was watching (no visitors had been in the temple for at least two hours), he whispered “you can take a picture of the dragon if you won’t tell anyone …”<br/>In Asia, it has been my experience, that a well-intentioned and well-timed gesture of generosity (especially money) can melt down the deepest-rooted traditional, cultural and institutional barriers. My sole regret, as I shuffled away from the temple, was that I hadn’t offered the donation earlier in the day.',
			},
			{
				title: 'Indonesian Island Treasure',
				subtitle: 'chalk with pen overlay',
				image: './artwork/singapore/islandtreasure.png',
				description:
					'Adapted from my missive “Three Artworks” During one of the visits of Imogene and Bethany during my time at the Embassy in Singapore, we took a ferry across the Singapore Strait to the Indonesian island of Bintan. Across the bay from our resort, I spotted an interesting structure. After a long afternoon trek that took me across rocks and difficult terrain, I encountered an abandoned small fishing hut located in a jungle-like setting. I took several pictures with my camera (it was during the days before iPhones), made a sketch, added some stylistic modifications and added color. ',
			},
			{
				title: 'Singapore Memories',
				subtitle: 'chalk with pen overlay',
				image: './artwork/singapore/singapore_memories.png',
				description:
					'In a store off of Orchard Road in Singapore, I saw a brown-tinted postcard of a part of Singapore down near the river. I recognized it as Clark Quay—today one of the most exclusive shopping, dining, and entertainment areas in Asia—taken from a hot-air balloon during the British colonial days. I colorized the old riverfront buildings and godowns, added an early evening scene, and a Singapore dragon as one side of the bridge crossing the river. ',
			},
		],
	},
	{
		section: 'World Travels',
		items: [
			{
				title: 'Blue Hawaii',
				subtitle: 'chalk with pen overlay',
				image: './artwork/world_travels/blue_hawaii.png',
				description:
					'Ima and I love Hawaii. During one of our many drives I saw this blue church and took s photograph. The church—still there but no longer blue—is located a short distance from the Polynesian Cultural Center.',
			},
		],
	},
	{
		section: 'Appalachian Heritage',
		items: [
			{
				title: 'Lost Appalachia',
				subtitle: 'pen and ink',
				image: './artwork/appalachian_heritage/old_man_with_beard.png',
				description:
					'IIllustration for article “Lost Appalachia”, Appalachian Heritage, Winter 1980; based on black-and-white photograph',
			},
{
				title: 'Made In Heaven',
				subtitle: 'pen and ink',
				image: './artwork/appalachian_heritage/silhouettes.png',
				description:
				'Illustration for article “Made In Heaven.” Appalachian Heritage, Summer 1980; creative',
			},
			{
				title: 'Tingumabob',
				subtitle: 'pen and ink',
				image: './artwork/appalachian_heritage/tingumabob.png',
				description:
					'Illustration for article “Tingumabob,” Appalachian Heritage, Summer 1980; creative',
			},
			{
				title: 'Biblical Patterns For Mountain Living',
				subtitle: 'pen and ink',
				image: './artwork/appalachian_heritage/bible.png',
				description:
					'Illustration for article “Biblical Patterns For Mountain Living,” Appalachian Heritage, Summer 1980; creative',
			}
		],
	},
	// Add more sections as needed
];

const ArtworkPage = () => {
	const [expandedTiles, setExpandedTiles] = useState({});

	const toggleTile = (key) => {
		setExpandedTiles((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<div className="artwork-page">
			<h1>Gallery</h1>
			<p className="artwork-intro">
				A collection of original work by Jeemes Akers. Please do not reproduce
				without permission.
			</p>

			{artworkSections.map((section, i) => (
				<div key={i} className="artwork-section">
					<h2 className="section-title">{section.section}</h2>
					<div className="artwork-grid">
						{section.items.map((item, index) => (
							<div
								key={index}
								className={`artwork-tile ${
									expandedTiles[`${section.section}-${index}`] ? 'expanded' : ''
								}`}
								onClick={() => toggleTile(`${section.section}-${index}`)}
								style={{ cursor: 'pointer' }}
							>
								<div className="tile-content">
									<div className="art-container">
										<img loading="lazy" src={item.image} alt={item.title} />
										<div className="art-overlay" />
									</div>
									<div className="art-text">
										<h3>{item.title}</h3>
										{item.subtitle && (
											<h4 className="artwork-subtitle">{item.subtitle}</h4>
										)}
										{expandedTiles[`${section.section}-${index}`] &&
											item.description && (
												<p
													dangerouslySetInnerHTML={{
														__html: item.description,
													}}
												/>
											)}
										{item.description && (
											<span
												className="read-more-link"
												tabIndex={0}
												role="button"
												onClick={(e) => {
													e.stopPropagation();
													toggleTile(`${section.section}-${index}`);
												}}
												onKeyPress={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														e.stopPropagation();
														toggleTile(`${section.section}-${index}`);
													}
												}}
												aria-expanded={!!expandedTiles[`${section.section}-${index}`]}
											>
												{expandedTiles[`${section.section}-${index}`]
													? 'Read less'
													: 'Read more'}
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default ArtworkPage;