import paint from 'assets/paint.jpg'
import art from 'assets/art.jpg'
import chair from 'assets/chair.jpg'
import pie from 'assets/pie.jpg'
import opal from 'assets/opal.jpg'
import classy from 'assets/classy.jpg'
import green from 'assets/green.jpg'
import outreach from 'assets/outreach.jpg'
import boxing from 'assets/boxing.jpg'
import fluffice from 'assets/fluffice1.jpg'
import grooming from 'assets/grooming1.jpg'
import nhtAudio from 'assets/slide-nht.jpg'
import ncaa from 'assets/ncaa.jpg'
import survivor from 'assets/survivor.jpg'
import pga from 'assets/pga.jpg'
import proBowl from 'assets/pro-bowl.jpg'
import fanball from 'assets/fanball.png'

const data = [
  { 
    title: 'BP MMA',
    src: boxing, 
    path: '/projects/bp-mma',
    aboutTag: 'Challenging, Fun Workout',
    about: 'BP MMA is a martial arts academy in Buena Park, California that trains various mixed martial arts disciplines such as Boxing, Muay Thai, Jiu Jitsu, and more. With the owner, we worked up several ideas on how to best advertise the brand and the instructors.',
    roles: ['Web Developer', 'Visual Designer', 'Photo Editor'],
    clients: ['Matthew Johnson', 'Stephanie Ferrer'],
    date: '2018',
    link: 'https://bpmartialarts.com/',
    images: ['/bp-1.jpg', '/bp-2.jpg', '/bp-3.jpg', '/bp-4.jpg', '/bp-5.jpg'],
  },
  { 
    title: 'NHT Audio',
    src: nhtAudio, 
    path: '/projects/nht-audio',
    aboutTag: 'Audio Experience',
    about: 'Now Hear This (NHT) is an American loudspeaker and audio company based in Benicia, California that produces production studio and professional quality acoustic suspension loudspeaker and in-wall speakers.',
    roles: ['Web Developer', 'Visual Designer', 'Database Engineer', 'Photo Editer'],
    clients: ['NHT Audio', 'Jonathan Sun'],
    date: '2019',
    link: 'https://www.nhthifi.com',
    images: ['/nht-1.jpg', '/nht-2.jpg', '/nht-3.jpg', '/nht-4.jpg'],
  },
  { 
    title: 'Fluff Ice',
    src: fluffice, 
    path: '/projects/fluff-ice',
    aboutTag: 'Classic Dessert with a Taiwanese Spin',
    about: `Established in 2011, Fluff Ice is a Taiwanese dessert franchise based in Rosemead, California. They specialize in innovative fusion desserts that combines the creaminess of ice cream with the texture of shaved ice.`,
    roles: ['Web Developer', 'Visual Designer', 'Photo Editor'],
    clients: ['Fluff Ice', 'Nick Huang'],
    date: '2022',
    link: 'https://fluffice.com/',
    images: ['/fi-1.jpg', '/fi-2.jpg', '/fi-3.jpg', '/fi-4.jpg'],
  },
  { 
    title: 'Pampered Paws',
    src: grooming, 
    path: '/projects/pampered-paws',
    aboutTag: 'Family Run, Animal First Grooming',
    about: 'Pampered Paws Salon and Spa is a premium dog boarding, daycare, training, and grooming business dedicated to providing exceptional care for pets of all sizes. They are based in La Mirada, California.',
    roles: ['Web Developer', 'Visual Designer', 'Photo Editor'],
    clients: ['Tracy Chlebik', 'Elizabeth Vanderheul'],
    date: '2023',
    link: 'https://pamperedpaws.dog/',
    images: ['/pp-1.jpg', '/pp-2.jpg', '/pp-3.jpg', '/pp-4.jpg'],
  },
  { 
    title: 'NCAA March Madness',
    src: ncaa, 
    path: '/projects/ncaa-march-madness',
    aboutTag: 'March Madness Bracket Challenge Games',
    about: `The Official NCAA Division 1 men's and women's basketball tournament bracket games (Bracket Challenge Game, Tournament Run, and Conference Tournament Pick'em) by Warner Bros. Fill out your brackets and compete against others.`,
    roles: ['Front End Web Developer'],
    clients: ['Warner Bros. Discovery'],
    date: '2024',
    link: 'https://play.ncaa.com',
    images: ['/ncaa-1.jpg', '/ncaa-2.jpg', '/ncaa-3.jpg', '/ncaa-4.jpg'],
  },
  { 
    title: 'NFL Survivor',
    src: survivor, 
    path: '/projects/nfl-survivor',
    aboutTag: 'NFL Weekly Survivor Game',
    about: `NFL Survivor is a fantasy football game where participants select one NFL team each week they believe will win its game and are invited back each week if they choose correctly. Participants must carefully strategize their selections to avoid being eliminated and stay in the game.`,
    roles: ['Front End Web Developer'],
    clients: ['BetMGM', 'DraftKings'],
    date: '2023',
    link: 'https://promo.nj.betmgm.com/en/promo/survivor-pool',
    images: ['/survivor-1.jpg', '/survivor-2.png'],
  },
  {
    title: `Fanball Winners`,
    src: fanball,
    path: '/projects/fanball-winners',
    aboutTag: 'Mobile Sports Betting App',
    about: `Fanball Winners is a fantasy sports game that is designed to be easy to play and appeal to a wide audience, including both casual and experienced fantasy sports players.`,
    roles: ['Lead Front End Web Developer'],
    clients: ["SportsHub"],
    date: '2024',
    link: "https://www.fanball.com/winners",
    images: ['/fw-1.jpg']
  },
  { 
    title: 'PGA Tour',
    src: pga, 
    path: '/projects/pga-tour',
    aboutTag: 'Fantasy Golf',
    about: 'PGA Fantasy Golf allows participants to create fantasy teams composed of real PGA Tour golfers and compete against each other based on the performance of those golfers in actual PGA Tour events.',
    roles: ['Front End Web Developer'],
    clients: ['PGA Tour'],
    date: '2023',
    link: 'https://fantasygolf.pgatour.com',
    images: ['/pga-1.jpg', '/pga-2.jpg', '/pga-3.png'],
  },
  { 
    title: `NCAA Bowl Pick'em`,
    src: proBowl, 
    path: '/projects/ncaa-football-bowl',
    aboutTag: 'College Football Bowl',
    about: `The NCAA Division 1 Football Bowl Pick'em is a game where participants could 
     allows participants to create fantasy teams composed of real PGA Tour golfers and compete against each other based on the performance of those golfers in actual PGA Tour events.`,
    roles: ['Front End Web Developer'],
    clients: ['BetMGM'],
    date: '2024',
    link: 'https://promo.nj.betmgm.com/en/promo/dev/collegebowl',
    images: ['/pb-1.jpg', '/pb-2.jpg'],
  },
  { 
    title: 'Epicurean',
    src: art, 
    path: '/projects/epicurean',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Cirrus',
    src: pie, 
    path: '/projects/cirrus',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Opal',
    src: opal, 
    path: '/projects/opal',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Heuristic',
    src: paint, 
    path: '/projects/heuristic',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Steel',
    src: classy, 
    path: '/projects/steel',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Bailiwick',
    src: chair,
    path: '/projects/bailiwick',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Verdant',
    src: green,
    path: '/projects/verdant',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
  { 
    title: 'Outreach',
    src: outreach,
    path: '/projects/outreach',
    aboutTag: '',
    about: '',
    roles: [],
    clients: [],
    date: '',
    link: '',
    images: [],
  },
]

export {data}