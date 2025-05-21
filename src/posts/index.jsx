import kepler from './2025-05-04-the-last-magician.mdx';
import hungarianRevolution from './2025-05-01-the-tragic-hungarian-revolution.mdx';
import historysInflection from './2025-04-05-historys-inflection.mdx';
import teenageHitler from './2025-04-15-teenage-hitler.mdx';
import TheTragicEmpressSisi from './2025-04-01-the-tragic-empress-sisi.mdx';
import TheWorldSRichestSpy from './2025-04-09-the-worlds-richest-spy.mdx';
import TheMightyOakHasFallen from './2025-02-23-the-mighty-oak-has-fallen.mdx';
import Harriette from './2025-02-12-harriette-the-grandest-dame-of-them-all.mdx';
import MirrorUniverse from './2024-12-31-mirror-universe.mdx';
import ATrueChristmasMiracle from './2024-12-18-a-true-christmas-miracle.mdx';
import camino from './2025-05-10-medieval-pilgrimages-the-camino-de-santiago.mdx';
import tears from './2024-12-02-inference-ai-agi-and-human-tears.mdx';
import mound from './2024-10-31-from-the-mound-to-the-bridge.mdx';
import explodingPagers from './2024-09-18-exploding-pagers.mdx';
import AreWeLivingInTheEndDays from './2024-08-01-are-we-living-in-the-end-days.mdx';
import TheLossOfAFriend from './2024-07-30-the-loss-of-a-friend.mdx';
import LifesRoadTrips from './2024-05-09-lifes-road-trips.mdx';
import TheNewEquationInTheMiddleEast from './2024-04-19-the-new-equation-in-the-middle-east.mdx';
import SleepwalkingTowardThePrecipice from './2024-03-18-sleepwalking-toward-the-precipice.mdx';
import YearOfChallenges from './2024-02-13-the-elusive-quest-for-truth-in-an-age-of-deepfakes.mdx';
import TheHouthisAndTheMiddleEast from './2024-01-18-the-houthis-and-the-middle-east.mdx';
import ChristmasAtTheBeach from './2023-12-22-christmas-at-the-beach.mdx';
import ChainedInPlatosCave from './2023-12-09-chained-in-platos-cave-in-december-2023.mdx';
import CanTGetEnoughOfThoseDrones from './2023-12-05-can-t-get-enough-of-those-drones.mdx';
import HatsAndCrowns from './2023-11-30-hats-and-crowns.mdx';
import sixDecadesAgo from './2023-11-17-six-decades-ago-the-jfk-assassination.mdx';
import TheLebanonBarracksBombing from './2023-10-27-the-lebanon-barracks-bombing-forty-years-later.mdx';
import ChangesInLatitude from './2023-09-12-changes-in-latitude.mdx';
import AsteroidRiches from './2023-08-27-asteroid-riches.mdx';
import AfterOppenheimer from './2023-07-24-after-oppenheimer.mdx';
import Postmortem from './2023-06-28-russias-wagner-group-abortive-coup-or-sleight-of-hand.mdx';
// import other posts as needed

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const posts = [
  {
    slug: '2025-05-10-medieval-pilgrimages-the-camino-de-santiago',
    component: camino,
    metadata: {
      title: 'Medieval Pilgrimages: The Camino De Santiago (Seventh River Cruise Missive)',
      date: formatDate('2025-05-17'),
      image: '/images/missives/seashell.png',
    },
  },
  {
    slug: '2025-05-04-the-last-magician',
    component: kepler,
    metadata: {
      title: 'The Last Magician: Johannes Kepler (Sixth River Cruise Missive)',
      date: formatDate('2025-05-04'),
      image: '/images/missives/TheLastMagician.png',
    },
  },
  {
    slug: '2025-05-01-the-tragic-hungarian-revolution',
    component: hungarianRevolution,
    metadata: {
      title: 'The Tragic Hungarian Revolution of 1956 (Fifth River Cruise Missive)',
      date: formatDate('2025-05-01'),
      image: '/images/missives/TheTragicHungarianRevolution.png',
    },
  },
  {
    slug: '2025-04-15-teenage-hitler-in-linz-and-vienna',
    component: teenageHitler,
    metadata: {
      title: 'Teenage Hitler in Linz and Vienna (Fourth River Cruise Missive)',
      date: formatDate('2025-04-15'),
      image: '/images/missives/Hitler.png',
    },
  },
  {
    slug: '2025-04-09-the-worlds-richest-spy',
    component: TheWorldSRichestSpy,
    metadata: {
      title: 'The World’s Richest Spy (Third River Cruise Missive)',
      date: formatDate('2025-04-09'),
      image: '/images/missives/TheWorldSRichestSpy.png',
    },
  },
  {
    slug: '2025-04-05-historys-inflection',
    component: historysInflection,
    metadata: {
      title: 'One of History\'s Inflection Points (Second River Cruise Missive)',
      date: formatDate('2025-04-05'),
      image: '/images/missives/HistorysInflection.png',
    },
  },
  {
    slug: '2025-04-01-the-tragic-empress-sisi',
    component: TheTragicEmpressSisi,
    metadata: {
      title: 'The Tragic Empress Sisi (First River Cruise Missive)',
      date: formatDate('2025-04-01'),
      image: '/images/missives/EmpressSisi.png',
    },
  },
  {
    slug: '2025-02-23-the-mighty-oak-has-fallen',
    component: TheMightyOakHasFallen,
    metadata: {
      title: 'The Mighty Oak Has Fallen',
      date: formatDate('2025-02-23'),
      image: '/images/missives/oak.png',
    },
  },
  {
    slug: '2025-02-12-harriette-the-grandest-dame-of-them-all',
    component: Harriette,
    metadata: {
      title: 'Harriette: The Grandest Dame Of Them All',
      date: formatDate('2025-02-12'),
      image: '/images/missives/Harriette.png',
    },
  },
  {
    slug: '2024-12-31-mirror-universe',
    component: MirrorUniverse,
    metadata: {
      title: 'Mirror Universe',
      date: formatDate('2024-12-31'),
      image: '/images/missives/MirrorUniverse.png',
    },
  },
  {
    slug: '2024-12-18-a-true-christmas-miracle',
    component: ATrueChristmasMiracle,
    metadata: {
      title: 'A True Christmas Miracle',
      date: formatDate('2024-12-18'),
      image: '/images/missives/ATrueChristmasMiracle.png',
    },
  },
  {
    slug: '2024-12-02-inference-ai-agi-and-human-tears',
    component: tears,
    metadata: {
      title: 'Inference AI, AGI, and Human Tears',
      date: formatDate('2024-12-02'),
      image: '/images/missives/tears.png',
    },
  },
  {
    slug: '2024-10-31-from-the-mound-to-the-bridge',
    component: mound,
    metadata: {
      title: 'From The Mound To The Bridge',
      date: formatDate('2024-10-31'),
      image: '/images/missives/mound.png',
    },
  },
  {
    slug: '2024-09-18-exploding-pagers',
    component: explodingPagers,
    metadata: {
      title: 'Exploding Pagers',
      date: formatDate('2024-09-18'),
      image: '/images/missives/exploding-pagers.png',
    },
  },
  {
    slug: '2024-08-01-are-we-living-in-the-end-days',
    component: AreWeLivingInTheEndDays,
    metadata: {
      title: 'Are We Living In The End Days?',
      date: formatDate('2024-08-01'),
      image: '/images/missives/are-we-living-in-the-end-days.png',
    },
  },
  {
    slug: '2024-07-30-the-loss-of-a-friend',
    component: TheLossOfAFriend,
    metadata: {
      title: 'The Loss Of A Friend',
      date: formatDate('2024-07-30'),
      image: '/images/missives/the-loss-of-a-friend.png',
    },
  },
  {
    slug: '2024-05-09-lifes-road-trips',
    component: LifesRoadTrips,
    metadata: {
      title: 'Life\'s Road Trips',
      date: formatDate('2024-05-09'),
      image: '/images/missives/lifes-road-trips.png',
    },
  },
  {
    slug: '2024-04-19-the-new-equation-in-the-middle-east',
    component: TheNewEquationInTheMiddleEast,
    metadata: {
      title: 'The “New Equation” in the Middle East',
      date: formatDate('2024-04-19'),
      image: '/images/missives/the-new-equation-in-the-middle-east.png',
    },
  },
  {
    slug: '2024-03-18-sleepwalking-toward-the-precipice',
    component: SleepwalkingTowardThePrecipice,
    metadata: {
      title: 'Sleepwalking Toward The Precipice',
      date: formatDate('2024-03-18'),
      image: '/images/missives/sleepwalking-toward-the-precipice.png',
    },
  },
  {
    slug: '2024-02-13-the-elusive-quest-for-truth-in-an-age-of-deepfakes',
    component: YearOfChallenges,
    metadata: {
      title: '2024—Year Of Challenges: The Elusive Quest For Truth In An Age Of Deepfakes',
      date: formatDate('2024-02-13'),
      image: '/images/missives/2024-year-of-challenges.png',
    },
  },
  {
    slug: '2024-01-18-the-houthis-and-the-middle-east',
    component: TheHouthisAndTheMiddleEast,
    metadata: {
      title: '2024—Year Of Challenges: The Houthis And The Middle East',
      date: formatDate('2024-01-18'),
      image: '/images/missives/the-houthis-and-the-middle-east.png',
    },
  },
  {
    slug: '2023-12-22-christmas-at-the-beach',
    component: ChristmasAtTheBeach,
    metadata: {
      title: 'Christmas At The Beach',
      date: formatDate('2023-12-22'),
      image: '/images/missives/christmas-at-the-beach.png',
    },
  },
  {
    slug: '2023-12-09-chained-in-platos-cave-in-december-2023',
    component: ChainedInPlatosCave,
    metadata: {
      title: 'Chained In Plato’s Cave In December 2023: Welcome To The Cinema Of Grand Illusions',
      date: formatDate('2023-12-09'),
      image: '/images/missives/chained-in-platos-cave.png',
    },
  },
  {
    slug: '2023-12-05-can-t-get-enough-of-those-drones',
    component: CanTGetEnoughOfThoseDrones,
    metadata: {
      title: 'Can’t Get Enough Of Those Drones',
      date: formatDate('2023-12-05'),
      image: '/images/missives/Drones.png',
    },
  },
  {
    slug: '2023-11-30-hats-and-crowns',
    component: HatsAndCrowns,
    metadata: {
      title: 'Hats and Crowns',
      date: formatDate('2023-11-30'),
      image: '/images/missives/HatsAndCrowns.png',
    },
  },
  {
    slug: '2023-11-17-six-decades-ago-the-jfk-assassination',
    component: sixDecadesAgo,
    metadata: {
      title: 'Six Decades Ago—The JFK Assassination',
      date: formatDate('2023-11-17'),
      image: '/images/missives/jfk-assassination.png',
    },
  },
  {
    slug: '2023-10-27-the-lebanon-barracks-bombing-forty-years-later',
    component: TheLebanonBarracksBombing,
    metadata: {
      title: 'The Lebanon Barracks’ Bombing — Forty Years Later',
      date: formatDate('2023-10-27'),
      image: '/images/missives/the-lebanon-barracks-bombing.png',
    },
  },
  {
    slug: '2023-09-12-changes-in-latitude',
    component: ChangesInLatitude,
    metadata: {
      title: 'Changes In Latitude',
      date: formatDate('2023-09-12'),
      image: '/images/missives/changes-in-latitude.png',
    },
  },
  {
    slug: '2023-08-27-asteroid-riches',
    component: AsteroidRiches,
    metadata: {
      title: 'Asteroid Riches',
      date: formatDate('2023-08-27'),
      image: '/images/missives/asteroid-riches.png',
    },
  },
  {
    slug: '2023-07-24-after-oppenheimer',
    component: AfterOppenheimer,
    metadata: {
      title: 'After Oppenheimer',
      date: formatDate('2023-07-24'),
      image: '/images/missives/after-oppenheimer.png',
    },
  },
  {
    slug: '2023-06-28-russias-wagner-group-abortive-coup-or-sleight-of-hand',
    component: Postmortem,
    metadata: {
      title: 'Postmortem: Russia’s Wagner Group, Abortive Coup Or Sleight Of Hand?',
      date: formatDate('2023-06-28'),
      image: '/images/missives/wagner-group.png',
    },
  }
];