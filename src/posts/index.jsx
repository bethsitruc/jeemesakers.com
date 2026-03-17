const postModules = import.meta.glob('./*.mdx');

// Helper function to format dates as "Month Day, Year"
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Metadata for missive routes and the missive index.
export const posts = [
  {
    slug: '2026-03-17-the-loss-of-a-close-friend',
    modulePath: './2026-03-17-the-loss-of-a-close-friend.mdx',
    metadata: {
      title: 'The Loss Of A Close Friend',
      date: formatDate('2026-03-17'),
      image: '/images/missives/the-loss-of-a-close-friend.png',
    },
  },
  {
    slug: '2026-01-23-neutrinos-thumbnails-and-ghost-riders-in-the-sky',
    modulePath: './2026-01-23-neutrinos-thumbnails-and-ghost-riders-in-the-sky.mdx',
    metadata: {
      title: 'Neutrinos: Thumbnails and Ghost Riders in the Sky',
      date: formatDate('2026-01-23'),
      image: '/images/missives/neutrinos.png',
    },
  },
  {
    slug: '2026-01-14-2026-new-paradigms-singapore-washing',
    modulePath: './2026-01-14-2026-new-paradigms-singapore-washing.mdx',
    metadata: {
      title: '2026 New Paradigms: Singapore Washing',
      date: formatDate('2026-01-14'),
      image: '/images/missives/singapore-washing.png',
    },
  },
  {
    slug: '2026-01-08-2026-resolution-living-like-a-kings-kid',
    modulePath: './2026-01-08-2026-resolution-living-like-a-kings-kid.mdx',
    metadata: {
      title: '2026 Resolution: Living Like A King’s Kid',
      date: formatDate('2026-01-08'),
      image: '/images/missives/living-like-a-kings-kid.png',
    },
  },
  {
    slug: '2025-12-16-life-and-one-lifetime',
    modulePath: './2025-12-16-life-and-one-lifetime.mdx',
    metadata: {
      title: 'Life and One Lifetime',
      date: formatDate('2025-12-16'),
      image: '/images/missives/one-lifetime.png',
    },
  },
  {
    slug: '2025-12-05-are-we-witnessing-the-final-generation',
    modulePath: './2025-12-05-are-we-witnessing-the-final-generation.mdx',
    metadata: {
      title: 'Are We Witnessing The Final Generation?',
      date: formatDate('2025-12-05'),
      image: '/images/missives/the-final-generation.png',
    },
  },
  {
    slug: '2025-12-02-the-new-ai-strategic-world-the-middle-easts-strange-bedfellows',
    modulePath: './2025-12-02-the-new-ai-strategic-world-the-middle-easts-strange-bedfellows.mdx',
    metadata: {
      title: 'The New AI Strategic World: The Middle East’s Strange Bedfellows',
      date: formatDate('2025-12-02'),
      image: '/images/missives/theNewAIStrategicWorld.png',
    },
  },
  {
    slug: '2025-10-03-are-we-approaching-the-end',
    modulePath: './2025-10-03-are-we-approaching-the-end.mdx',
    metadata: {
      title: 'Are We Approaching The End?',
      date: formatDate('2025-10-03'),
      image: '/images/missives/theEnd.png',
    },
  },
  {
    slug: '2025-09-16-charlie-kirk-assassination',
    modulePath: './2025-09-16-charlie-kirk-assassination.mdx',
    metadata: {
      title: 'The Charlie Kirk Assassination',
      date: formatDate('2025-09-16'),
      image: '/images/missives/charlie-kirk.png',
    },
  },
  {
    slug: '2025-09-11-hot-mic-immortality',
    modulePath: './2025-09-11-hot-mic-immortality.mdx',
    metadata: {
      title: '"Hot Mic" Immortality',
      date: formatDate('2025-09-11'),
      image: '/images/missives/hot-mic-immortality.png',
    },
  },
  {
    slug: '2025-07-26-superintel',
    modulePath: './2025-07-26-superintel.mdx',
    metadata: {
      title: 'A.I. Superintelligence: Near-Term Reality or Hype?',
      date: formatDate('2025-07-26'),
      image: '/images/missives/superintel.png',
    },
  },
  {
    slug: '2025-07-04-thoughts-on-july-4',
    modulePath: './2025-07-04-thoughts-on-july-4.mdx',
    metadata: {
      title: 'Thoughts On July 4',
      date: formatDate('2025-07-04'),
      image: '/images/missives/american-flag.png',
    },
  },
  {
    slug: '2025-05-28-revisiting-the-cinema-of-grand-illusions',
    modulePath: './2025-05-28-revisiting-the-cinema-of-grand-illusions.mdx',
    metadata: {
      title: 'Revisiting The Cinema Of Grand Illusions - The Wisdom Corridor',
      date: formatDate('2025-05-28'),
      image: '/images/missives/cinema-of-grand-illusions.png',
    },
  },
  {
    slug: '2025-05-10-medieval-pilgrimages-the-camino-de-santiago',
    modulePath: './2025-05-10-medieval-pilgrimages-the-camino-de-santiago.mdx',
    metadata: {
      title: 'Medieval Pilgrimages: The Camino De Santiago (Seventh River Cruise Missive)',
      date: formatDate('2025-05-17'),
      image: '/images/missives/seashell.png',
    },
  },
  {
    slug: '2025-05-04-the-last-magician',
    modulePath: './2025-05-04-the-last-magician.mdx',
    metadata: {
      title: 'The Last Magician: Johannes Kepler (Sixth River Cruise Missive)',
      date: formatDate('2025-05-04'),
      image: '/images/missives/TheLastMagician.png',
    },
  },
  {
    slug: '2025-05-01-the-tragic-hungarian-revolution',
    modulePath: './2025-05-01-the-tragic-hungarian-revolution.mdx',
    metadata: {
      title: 'The Tragic Hungarian Revolution of 1956 (Fifth River Cruise Missive)',
      date: formatDate('2025-05-01'),
      image: '/images/missives/TheTragicHungarianRevolution.png',
    },
  },
  {
    slug: '2025-04-15-teenage-hitler-in-linz-and-vienna',
    modulePath: './2025-04-15-teenage-hitler.mdx',
    metadata: {
      title: 'Teenage Hitler in Linz and Vienna (Fourth River Cruise Missive)',
      date: formatDate('2025-04-15'),
      image: '/images/missives/Hitler.png',
    },
  },
  {
    slug: '2025-04-09-the-worlds-richest-spy',
    modulePath: './2025-04-09-the-worlds-richest-spy.mdx',
    metadata: {
      title: 'The World’s Richest Spy (Third River Cruise Missive)',
      date: formatDate('2025-04-09'),
      image: '/images/missives/TheWorldSRichestSpy.png',
    },
  },
  {
    slug: '2025-04-05-historys-inflection',
    modulePath: './2025-04-05-historys-inflection.mdx',
    metadata: {
      title: 'One of History\'s Inflection Points (Second River Cruise Missive)',
      date: formatDate('2025-04-05'),
      image: '/images/missives/HistorysInflection.png',
    },
  },
  {
    slug: '2025-04-01-the-tragic-empress-sisi',
    modulePath: './2025-04-01-the-tragic-empress-sisi.mdx',
    metadata: {
      title: 'The Tragic Empress Sisi (First River Cruise Missive)',
      date: formatDate('2025-04-01'),
      image: '/images/missives/EmpressSisi.png',
    },
  },
  {
    slug: '2025-02-23-the-mighty-oak-has-fallen',
    modulePath: './2025-02-23-the-mighty-oak-has-fallen.mdx',
    metadata: {
      title: 'The Mighty Oak Has Fallen',
      date: formatDate('2025-02-23'),
      image: '/images/missives/oak.png',
    },
  },
  {
    slug: '2025-02-12-harriette-the-grandest-dame-of-them-all',
    modulePath: './2025-02-12-harriette-the-grandest-dame-of-them-all.mdx',
    metadata: {
      title: 'Harriette: The Grandest Dame Of Them All',
      date: formatDate('2025-02-12'),
      image: '/images/missives/Harriette.png',
    },
  },
  {
    slug: '2024-12-31-mirror-universe',
    modulePath: './2024-12-31-mirror-universe.mdx',
    metadata: {
      title: 'Mirror Universe',
      date: formatDate('2024-12-31'),
      image: '/images/missives/MirrorUniverse.png',
    },
  },
  {
    slug: '2024-12-18-a-true-christmas-miracle',
    modulePath: './2024-12-18-a-true-christmas-miracle.mdx',
    metadata: {
      title: 'A True Christmas Miracle',
      date: formatDate('2024-12-18'),
      image: '/images/missives/ATrueChristmasMiracle.png',
    },
  },
  {
    slug: '2024-12-02-inference-ai-agi-and-human-tears',
    modulePath: './2024-12-02-inference-ai-agi-and-human-tears.mdx',
    metadata: {
      title: 'Inference AI, AGI, and Human Tears',
      date: formatDate('2024-12-02'),
      image: '/images/missives/tears.png',
    },
  },
  {
    slug: '2024-10-31-from-the-mound-to-the-bridge',
    modulePath: './2024-10-31-from-the-mound-to-the-bridge.mdx',
    metadata: {
      title: 'From The Mound To The Bridge',
      date: formatDate('2024-10-31'),
      image: '/images/missives/mound.png',
    },
  },
  {
    slug: '2024-09-18-exploding-pagers',
    modulePath: './2024-09-18-exploding-pagers.mdx',
    metadata: {
      title: 'Exploding Pagers',
      date: formatDate('2024-09-18'),
      image: '/images/missives/exploding-pagers.png',
    },
  },
  {
    slug: '2024-08-01-are-we-living-in-the-end-days',
    modulePath: './2024-08-01-are-we-living-in-the-end-days.mdx',
    metadata: {
      title: 'Are We Living In The End Days?',
      date: formatDate('2024-08-01'),
      image: '/images/missives/are-we-living-in-the-end-days.png',
    },
  },
  {
    slug: '2024-07-30-the-loss-of-a-friend',
    modulePath: './2024-07-30-the-loss-of-a-friend.mdx',
    metadata: {
      title: 'The Loss Of A Friend',
      date: formatDate('2024-07-30'),
      image: '/images/missives/the-loss-of-a-friend.png',
    },
  },
  {
    slug: '2024-05-09-lifes-road-trips',
    modulePath: './2024-05-09-lifes-road-trips.mdx',
    metadata: {
      title: 'Life\'s Road Trips',
      date: formatDate('2024-05-09'),
      image: '/images/missives/lifes-road-trips.png',
    },
  },
  {
    slug: '2024-04-19-the-new-equation-in-the-middle-east',
    modulePath: './2024-04-19-the-new-equation-in-the-middle-east.mdx',
    metadata: {
      title: 'The “New Equation” in the Middle East',
      date: formatDate('2024-04-19'),
      image: '/images/missives/the-new-equation-in-the-middle-east.png',
    },
  },
  {
    slug: '2024-03-18-sleepwalking-toward-the-precipice',
    modulePath: './2024-03-18-sleepwalking-toward-the-precipice.mdx',
    metadata: {
      title: 'Sleepwalking Toward The Precipice',
      date: formatDate('2024-03-18'),
      image: '/images/missives/sleepwalking-toward-the-precipice.png',
    },
  },
  {
    slug: '2024-02-13-the-elusive-quest-for-truth-in-an-age-of-deepfakes',
    modulePath: './2024-02-13-the-elusive-quest-for-truth-in-an-age-of-deepfakes.mdx',
    metadata: {
      title: '2024—Year Of Challenges: The Elusive Quest For Truth In An Age Of Deepfakes',
      date: formatDate('2024-02-13'),
      image: '/images/missives/2024-year-of-challenges.png',
    },
  },
  {
    slug: '2024-01-18-the-houthis-and-the-middle-east',
    modulePath: './2024-01-18-the-houthis-and-the-middle-east.mdx',
    metadata: {
      title: '2024—Year Of Challenges: The Houthis And The Middle East',
      date: formatDate('2024-01-18'),
      image: '/images/missives/the-houthis-and-the-middle-east.png',
    },
  },
  {
    slug: '2023-12-22-christmas-at-the-beach',
    modulePath: './2023-12-22-christmas-at-the-beach.mdx',
    metadata: {
      title: 'Christmas At The Beach',
      date: formatDate('2023-12-22'),
      image: '/images/missives/christmas-at-the-beach.png',
    },
  },
  {
    slug: '2023-12-09-chained-in-platos-cave-in-december-2023',
    modulePath: './2023-12-09-chained-in-platos-cave-in-december-2023.mdx',
    metadata: {
      title: 'Chained In Plato’s Cave In December 2023: Welcome To The Cinema Of Grand Illusions',
      date: formatDate('2023-12-09'),
      image: '/images/missives/chained-in-platos-cave.png',
    },
  },
  {
    slug: '2023-12-05-can-t-get-enough-of-those-drones',
    modulePath: './2023-12-05-can-t-get-enough-of-those-drones.mdx',
    metadata: {
      title: 'Can’t Get Enough Of Those Drones',
      date: formatDate('2023-12-05'),
      image: '/images/missives/Drones.png',
    },
  },
  {
    slug: '2023-11-30-hats-and-crowns',
    modulePath: './2023-11-30-hats-and-crowns.mdx',
    metadata: {
      title: 'Hats and Crowns',
      date: formatDate('2023-11-30'),
      image: '/images/missives/HatsAndCrowns.png',
    },
  },
  {
    slug: '2023-11-17-six-decades-ago-the-jfk-assassination',
    modulePath: './2023-11-17-six-decades-ago-the-jfk-assassination.mdx',
    metadata: {
      title: 'Six Decades Ago—The JFK Assassination',
      date: formatDate('2023-11-17'),
      image: '/images/missives/jfk-assassination.png',
    },
  },
  {
    slug: '2023-10-27-the-lebanon-barracks-bombing-forty-years-later',
    modulePath: './2023-10-27-the-lebanon-barracks-bombing-forty-years-later.mdx',
    metadata: {
      title: 'The Lebanon Barracks’ Bombing — Forty Years Later',
      date: formatDate('2023-10-27'),
      image: '/images/missives/the-lebanon-barracks-bombing.png',
    },
  },
  {
    slug: '2023-09-12-changes-in-latitude',
    modulePath: './2023-09-12-changes-in-latitude.mdx',
    metadata: {
      title: 'Changes In Latitude',
      date: formatDate('2023-09-12'),
      image: '/images/missives/changes-in-latitude.png',
    },
  },
  {
    slug: '2023-08-27-asteroid-riches',
    modulePath: './2023-08-27-asteroid-riches.mdx',
    metadata: {
      title: 'Asteroid Riches',
      date: formatDate('2023-08-27'),
      image: '/images/missives/asteroid-riches.png',
    },
  },
  {
    slug: '2023-07-24-after-oppenheimer',
    modulePath: './2023-07-24-after-oppenheimer.mdx',
    metadata: {
      title: 'After Oppenheimer',
      date: formatDate('2023-07-24'),
      image: '/images/missives/after-oppenheimer.png',
    },
  },
  {
    slug: '2023-06-28-russias-wagner-group-abortive-coup-or-sleight-of-hand',
    modulePath: './2023-06-28-russias-wagner-group-abortive-coup-or-sleight-of-hand.mdx',
    metadata: {
      title: 'Postmortem: Russia’s Wagner Group, Abortive Coup Or Sleight Of Hand?',
      date: formatDate('2023-06-28'),
      image: '/images/missives/wagner-group.png',
    },
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export async function loadPostComponent(post) {
  const loader = postModules[post.modulePath];

  if (!loader) {
    throw new Error(`Missing post module: ${post.modulePath}`);
  }

  const module = await loader();
  return module.default;
}

