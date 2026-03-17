// ArtworkPage.jsx
import React, { useState } from 'react';

const artworkSections = [
	{
		section: 'Singapore Memories',
		items: [
			{
				title: 'Singapore Temple Stone dragon',
				subtitle: 'chalk with pen overlay',
				image: '/artwork/singapore/dragon.png',
				description:
					'This may be my favorite personal artwork. e fourth artwork I would like to mention is my own. As you can see, it is a pen and chalk rendition—with just a splash of red—of a fierce-looking Chinese dragon.<br/>I began the picture during my last week at the embassy in Singapore. Hidden in the shadows of the high-rise glass and steel behemoths of the city-state’s Central Business District is a small cluster of Taoist temples dating back to the early nineteenth century. I particularly liked to visit one of these because inside—amid the pungent smells of incense and burning papers—were two incredible, intricate stone carvings: a dragon on one side, a tiger on the other.<br/>I was determined not to leave Singapore without obtaining an image of the dragon. <br/>To that end, I entered the temple carrying my camera and an art pad. I asked the monk and keeper of the temple if I could take a picture of the dragon. “T-s-k-k, I don’t know,” he said politely (in Asia many believe that taking a picture of a person or thing somehow robs it of its spiritual essence). <br/>“I understand,” I replied, “would it be permissible for me to sketch the carving?” <br/>Obviously, no one had asked him that. “I guess that would be okay,” he said as he stroked his long white chin-whiskers, no doubt pondering the other-worldly ramifications of his decision.<br/>So, I sat there armed with my trusty art pad and pencils, in front of the huge, imposing, fierce-looking dragon stone carving. And started my drawing. From time to time, one or two temple patrons would drift by, look over my shoulder to study what I was doing and grunt their approval or shake their head. <br/>I was still drawing as the first whispers of dusk enveloped the outer temple compound decorated with its festive red lanterns.<br/>Finally, assisted by the light provided by the temple’s many candles, I applied the finishing touches to my drawing. It had taken me almost all day. As I closed my art pad and prepared to leave, I approached the monk. “You have been so kind,” I said, “I would like to leave a small donation for the temple.” <br/>“You don’t have to do that,” he said with a smile. Then looking over both shoulders to make sure no one was watching (no visitors had been in the temple for at least two hours), he whispered “you can take a picture of the dragon if you won’t tell anyone …”<br/>In Asia, it has been my experience, that a well-intentioned and well-timed gesture of generosity (especially money) can melt down the deepest-rooted traditional, cultural and institutional barriers. My sole regret, as I shuffled away from the temple, was that I hadn’t offered the donation earlier in the day.',
			},
			{
				title: 'Indonesian Island Treasure',
				subtitle: 'chalk with pen overlay',
				image: '/artwork/singapore/islandtreasure.png',
				description:
					'Adapted from my missive “Three Artworks” During one of the visits of Imogene and Bethany during my time at the Embassy in Singapore, we took a ferry across the Singapore Strait to the Indonesian island of Bintan. Across the bay from our resort, I spotted an interesting structure. After a long afternoon trek that took me across rocks and difficult terrain, I encountered an abandoned small fishing hut located in a jungle-like setting. I took several pictures with my camera (it was during the days before iPhones), made a sketch, added some stylistic modifications and added color. ',
			},
			{
				title: 'Singapore Memories',
				subtitle: 'chalk with pen overlay',
				image: '/artwork/singapore/singapore_memories.png',
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
				image: '/artwork/world_travels/blue_hawaii.png',
				description:
					'Ima and I love Hawaii. During one of our many drives I saw this blue church and took s photograph. The church—still there but no longer blue—is located a short distance from the Polynesian Cultural Center.',
			},
		],
	},
	{
		section: 'Appalachian Heritage',
		items: [
			{
				title: 'Appalachian Heritage Magazine',
				subtitle: 'photograph',
				image: '/artwork/appalachian_heritage/intro.png',
				featured: true, // Mark this as featured
				description:
					'When I began working at Alice Lloyd College (located in Pippa Passes, Kentucky), I wore two hats: history professor and public relations director. I had a small campus office in old Cushing Hall. One day, Mr. Al Stewart—who lived at one end of campus and was the editor of a college-sponsored magazine called the Appalachian Heritage: A Magazine of Southern Appalachian Life & Culture) visited my office and noticed me drawing a picture of an old mountain man based on a black-and-white photograph. He asked if he could use the picture for the magazine and that began a long relationship with Al during which I provided several pieces of artwork for magazine articles as well as cover art. <br/> <br/> Typically, Al would explain to me what a certain article included and, if he had no other picture to go with it, would leave it to me to design the artwork.',
			},
			{
				title: 'Lost Appalachia',
				subtitle: 'pen and ink',
				image: '/artwork/appalachian_heritage/old_man_with_beard.png',
				description:
					'Illustration for article “Lost Appalachia”, Appalachian Heritage, Winter 1980; based on black-and-white photograph',
			},
			{
				title: 'Made In Heaven',
				subtitle: 'pen and ink',
				image: '/artwork/appalachian_heritage/silhouettes.png',
				description:
				'Illustration for article “Made In Heaven.” Appalachian Heritage, Summer 1980; creative',
			},
			{
				title: 'Tingumabob',
				subtitle: 'pen and ink',
				image: '/artwork/appalachian_heritage/tingumabob.png',
				description:
					'Illustration for article “Tingumabob,” Appalachian Heritage, Summer 1980; creative',
			},
			{
				title: 'Biblical Patterns For Mountain Living',
				subtitle: 'pen and ink',
				image: '/artwork/appalachian_heritage/bible.png',
				description:
					'Illustration for article “Biblical Patterns For Mountain Living,” Appalachian Heritage, Summer 1980; creative',
			},
      {
        title: 'Appalachian Chronicles',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/appalachian_chronicles.png',
        description:
          'Illustration for article “Appalachian Chronicles,” Appalachian Heritage, Spring 1980; based on black-and-white photographs',
      },
      {
        title: 'Fall 1980 Cover',
        subtitle: 'chalk, pen and ink',
        image: '/artwork/appalachian_heritage/tree_oldman_fiddle.png',
        description:
          'Cover design, Appalachian Heritage, Fall 1980; composite of several photographs',
      },
      {
        title: 'The Hollow Of The Thigh',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/the_hollow_of_the_thigh.png', 
        description:
          'Illustration for article “The Hollow Of The Thigh,” Appalachian Heritage, Fall 1980; creative',
      },
      {
        title: 'Winter 1980 Cover',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/old_mountain_house.png',
        description:
          'Cover design, Appalachian Heritage, Winter 1980; one of my favorite pieces; used for multiple college publications (e.g., Voices of Appalachia tour brochure); creative',
      },
      {
        title: 'Let Us Rise Now and Face Jerusalem',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/let_us_rise_now.png',
        description:
          'Illustration for article “Let Us Rise Now and Face Jerusalem,” Appalachian Heritage, Winter 1980; creative',
      },
      {
        title: 'Old Ghosts, Brown Seasons',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/old_ghosts_brown_seasons.png',
        description:
          'Illustration for article “Old Ghosts, Brown Seasons,” Appalachian Heritage, Spring 1981; one of my personal favorites; creative',
      },
      {
        title: 'Debut',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/debut_singer.png',
        description:
          'Illustration for article “Debut,” Appalachian Heritage, Spring 1981; creative',
      },
      {
        title: 'The Children Of Blood',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/children_of_blood_young_woman.png',
        description:
          'Illustration for article “The Children Of Blood,” Appalachian Heritage, Spring 1981; creative',
      },
      {
        title: 'Summer 1981 Cover',
        subtitle: 'chalk and pen and ink',
        image: '/artwork/appalachian_heritage/wooden_church.png',
        description:
          'Cover design, Appalachian Heritage, Summer 1981',
      },
      {
        title: 'Jubilee',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/jubilee_kitchen.png', 
        description:
          'Illustration for article “Jubilee,” Appalachian Heritage, Summer 1981; creative',
      },
      {
        title: 'The Civil War and Church Schisms in Southern Appalachia',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/civil_war_church_schisms.png', 
        description:
          'Illustration for article “The Civil War and Church Schisms in Southern Appalachia,” Appalachian Heritage, Summer 1981; creative',
      },
      {
        title: 'By Way of the Forked Stick',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/forked_stick_church.png', 
        description:
          'Illustration for article “By Way of the Forked Stick,” Appalachian Heritage, Summer 1981; creative',
      },
      {
        title: 'In Want of Water',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/in_want_of_water.png', 
        description:
          'Illustration for article “In Want of Water,” Appalachian Heritage, Fall 1981; composite of two black-and-white photographs',
      },
      {
        title: 'The River Boat Pilot and the Shopping Mall Queen',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/river_boat_pilot_shopping_mall_queen.png', 
        description:
          'Illustration for article “The River Boat Pilot and the Shopping Mall Queen,” Appalachian Heritage, Winter 1981; creative',
      },
      {
        title: 'Fox Hunting in Eastern Kentucky',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/fox_hunting_eastern_kentucky.png', 
        description:
          'Illustration for article “Fox Hunting in Eastern Kentucky,” Appalachian Heritage, Winter 1981; creative',
      },
      {
        title: 'The Children of Blood',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/children_of_blood_soldiers_on_horseback.png',
        description:
          'Illustration for article “The Children of Blood,” Appalachian Heritage, Winter 1981; rendering from photograph',
      },
      {
        title: 'Civil War Scene',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/civil_war_composite_scene.png', 
        description:
          'Companion illustration for “The Children of Blood”; pen and ink composite',
      },
      {
        title: 'Winter–Spring 1982 Cover',
        subtitle: 'chalk with pen and ink',
        image: '/artwork/appalachian_heritage/mountain_scene_color_cover.png',
        description:
          'Cover design, Appalachian Heritage, Winter–Spring 1982; based on personal photo',
      },
      {
        title: 'Red Ox',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/red_ox_boy_snake.png', 
        description:
          'Illustration for article “Red Ox,” Appalachian Heritage, Winter–Spring 1982; creative',
      },
      {
        title: 'The Missionary',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/the_missionary.png', 
        description:
          'Illustration for article “The Missionary,” Appalachian Heritage, Winter–Spring 1982; creative',
      },
      {
        title: 'An Al Stewart Sampler',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/al_stewart_sampler_portrait.png', 
        description:
          'Illustration for article “An Al Stewart Sampler,” Appalachian Heritage, Winter–Spring 1982; portrait combining a photograph and creative; reprinted for tribute “Into His Own,” Mantrip No. 8, Fall 1989',
      },
      {
        title: 'Summer 1982 Cover',
        subtitle: 'chalk with pen and ink',
        image: '/artwork/appalachian_heritage/footsteps_path_cover.png', 
        description:
          'Cover design, Appalachian Heritage, Summer 1982; creative',
      },
      {
        title: 'A War Slow A-Dying',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/a_war_slow_a_dying.png', 
        description:
          'Illustration for article “A War Slow A-Dying,” Appalachian Heritage, Summer 1982; from photograph',
      },
      {
        title: 'The Dance',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/the_dance_woman_in_water.png',
        description:
          'Illustration for article “The Dance,” Appalachian Heritage, Summer 1982; creative',
      },
      {
        title: 'Noah’s Ark',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/noahs_ark.png',
        description:
          'Illustration for article “Noah’s Ark,” Appalachian Heritage, Summer 1982; creative',
      },
      {
        title: 'Aunt Effie and the Pink Plymouth',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/aunt_effie_pink_plymouth.png',
        description:
          'Illustration for article “Aunt Effie and the Pink Plymouth,” Appalachian Heritage, Summer 1984; creative',
      },
      {
        title: 'Left-Handed Redheads',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/left_handed_redheads.png', 
        description:
          'Illustration for article “Left-Handed Redheads,” Appalachian Heritage, Summer 1984; creative',
      },
      {
        title: 'The Fruit of Care',
        subtitle: 'pen and ink',
        image: '/artwork/appalachian_heritage/fruit_of_care_graveyard.png', 
        description:
          'Illustration for article “The Fruit of Care,” Mantrip, Fall 1986; creative',
      },
	  {
		title: 'There is a Season',
		subtitle: 'pen and ink',
		image: '/artwork/appalachian_heritage/there_is_a_season.png', 
		description:
		  'Illustration for article “There is a Season,”, Fall 1986; creative',
	  },
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

			{artworkSections.map((section, i) => {
				const itemsWithIndex = section.items.map((item, originalIndex) => ({
					item,
					originalIndex,
				}));
				const featuredItems = itemsWithIndex.filter(({ item }) => item.featured);
				const regularItems = itemsWithIndex.filter(({ item }) => !item.featured);
				
				return (
					<div key={i} className="artwork-section">
						<h2 className="section-title">{section.section}</h2>
						
						{/* Render featured items */}
						{featuredItems.map(({ item }, index) => (
							<div key={`featured-${index}`} className="featured-introduction">
								<div className="featured-content">
									<div className="featured-image">
										<img loading="lazy" src={item.image} alt={item.title} />
									</div>
									<div className="featured-text">
										<h3 className="featured-title">{item.title}</h3>
										{item.subtitle && (
											<h4 className="featured-subtitle">{item.subtitle}</h4>
										)}
										<p className="featured-description" dangerouslySetInnerHTML={{
											__html: item.description,
										}} />
									</div>
								</div>
							</div>
						))}
						
						{/* Render regular items */}
						<div className="artwork-grid">
							{regularItems.map(({ item, originalIndex }) => {
								const tileKey = `${section.section}-${originalIndex}`;
								const detailsId = `artwork-details-${i}-${originalIndex}`;
								const isExpanded = !!expandedTiles[tileKey];

								return (
									<div
										key={originalIndex}
										className={`artwork-tile ${isExpanded ? 'expanded' : ''}`}
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
												{isExpanded && item.description && (
													<p
														id={detailsId}
														dangerouslySetInnerHTML={{
															__html: item.description,
														}}
													/>
												)}
												{item.description && (
													<button
														type="button"
														className="read-more-link"
														onClick={() => toggleTile(tileKey)}
														aria-controls={detailsId}
														aria-expanded={isExpanded}
													>
														{isExpanded ? 'Read less' : 'Read more'}
													</button>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ArtworkPage;
