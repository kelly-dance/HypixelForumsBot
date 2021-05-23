export type Tag = {
  id: string,
  name: string,
  url: string,
  subtags: (Feed | Tag)[]
}

export type Feed = {
  id: string,
  name: string,
  url: string,
}

export type ReversedFeed = {
  id: string,
  name: string,
  url: string,
  tags: Tag[],
}

const skyblock: Tag = {
  id: 'skyblock',
  name: 'Skyblock',
  url: 'https://hypixel.net/categories/skyblock.194/',
  subtags: [
    {
      id: 'skyblockpatchnotes',
      name: 'SkyBlock Patch Notes',
      url: 'https://hypixel.net/forums/skyblock-patch-notes.158/',
    },
    {
      id: 'skyblockgeneral',
      name: 'SkyBlock General Discussion',
      url: 'https://hypixel.net/forums/skyblock-general-discussion.157/',
    },
    {
      id: 'skyblocksuggestions',
      name: 'SkyBlock Suggestions and Feedback',
      url: 'https://hypixel.net/forums/skyblock-suggestions-and-feedback.195/',
    },
    {
      id: 'skyblockhelp',
      name: 'SkyBlock Community Help',
      url: 'https://hypixel.net/forums/skyblock-community-help.196/',
    },
    {
      id: 'skyblockguilds',
      name: 'SkyBlock Guilds',
      url: 'https://hypixel.net/forums/skyblock-guilds.197/',
    },
    {
      id: 'skyblockguides',
      name: 'SkyBlock Guides and Strategies',
      url: 'https://hypixel.net/forums/guides-and-strategies.162/',
    },
    {
      id: 'skyblockcreative',
      name: 'SkyBlock Creative Corner',
      url: 'https://hypixel.net/forums/creative-corner.193/',
    },
    {
      id: 'skyblockshowcase',
      name: 'SkyBlock Island Showcase',
      url: 'https://hypixel.net/forums/island-showcase.161/',
    },
    {
      id: 'skyblockofftopic',
      name: 'SkyBlock Off Topic',
      url: 'https://hypixel.net/forums/skyblock-off-topic.198/',
    },
  ]
}

const arcadegames: Tag = {
  id: 'arcadegames',
  name: 'Arcade Games',
  url: 'https://hypixel.net/forums/arcade-games.80/',
  subtags: [
    {
      id: 'arcadegamesmain',
      name: 'Arcade Games',
      url: "https://hypixel.net/forums/arcade-games.80/",
    },
    {
      id: 'capturethewool',
      name: 'Capture The Wool',
      url: "https://hypixel.net/forums/game-capture-the-wool.155/",
    },
  ]
}

const prototype: Tag = {
  id: 'prototype',
  name: 'Prototype Lobby',
  url: 'https://hypixel.net/forums/prototype/',
  subtags: [
    {
      id: 'prototypemain',
      name: 'Prototype Lobby',
      url: "https://hypixel.net/forums/prototype/",
    },
    {
      id: 'towerwars',
      name: 'TowerWars',
      url: "https://hypixel.net/forums/game-towerwars.156/",
    }
  ]
}

const uhc: Tag = {
  id: 'uhc',
  name: 'UHC',
  url: 'https://hypixel.net/forums/uhc-champions.82/',
  subtags: [
    {
      id: 'uhcmain',
      name: 'UHC Champions',
      url: "https://hypixel.net/forums/uhc-champions.82/",
    },
    {
      id: 'speeduhc',
      name: 'Speed UHC',
      url: "https://hypixel.net/forums/speed-uhc.119/",
    },
  ]
}

const classic: Tag = {
  id: 'classic',
  name: 'Classic Lobby',
  url: 'https://hypixel.net/forums/classic-lobby.137/',
  subtags: [
    {
      id: 'classicmain',
      name: 'Classic Lobby',
      url: 'https://hypixel.net/forums/classic-lobby.137/',
    },
    {
      id: 'walls',
      name: 'The Walls',
      url: 'https://hypixel.net/forums/the-walls.71/',
    },
    {
      id: 'quakecraft',
      name: 'Quakecraft',
      url: 'https://hypixel.net/forums/quakecraft.76/',
    },
    {
      id: 'vampirez',
      name: 'VampireZ',
      url: 'https://hypixel.net/forums/vampirez.74/',
    },
    {
      id: 'paintball',
      name: 'Paintball Warfare',
      url: 'https://hypixel.net/forums/paintball-warfare.73/',
    },
    {
      id: 'arenabrawl',
      name: 'Arena Brawl',
      url: 'https://hypixel.net/forums/arena-brawl.79/',
    },
    {
      id: 'turbokartracers',
      name: 'Turbo Kart Racers',
      url: 'https://hypixel.net/forums/turbo-kart-racers.89/',
    },
  ]
}

const games: Tag = {
  id: 'games',
  name: 'Games',
  url: 'https://hypixel.net/forums/#games.67',
  subtags: [
    {
      id: 'bedwars',
      name: 'Bed Wars',
      url: "https://hypixel.net/forums/bed-wars.138/",
    },
    {
      id: 'skywars',
      name: 'SkyWars',
      url: "https://hypixel.net/forums/skywars.91/",
    },
    {
      id: 'murdermystery',
      name: 'Murder Mystery',
      url: "https://hypixel.net/forums/murder-mystery.144/",
    },
    {
      id: 'housing',
      name: 'Housing',
      url: "https://hypixel.net/forums/housing.94/",
    },
    {
      id: 'buildbattle',
      name: 'Build Battle',
      url: "https://hypixel.net/build-battle/",
    },
    arcadegames,
    prototype,
    {
      id: 'tntgames',
      name: 'The TNT Games',
      url: "https://hypixel.net/forums/the-tnt-games.78/",
    },
    {
      id: 'pit',
      name: 'The Pit',
      url: "https://hypixel.net/forums/the-pit.151/",
    },
    uhc,
    classic,
    {
      id: 'megawalls',
      name: 'Mega Walls',
      url: "https://hypixel.net/mega-walls/",
    },
    {
      id: 'blitz',
      name: 'Blitz SG',
      url: "https://hypixel.net/forums/blitz-sg.72/",
    },
    {
      id: 'copsandcrims',
      name: 'Cops and Crims',
      url: 'https://hypixel.net/forums/cops-and-crims.81/',
    },
    {
      id: 'smashheroes',
      name: 'Smash Heroes',
      url: 'https://hypixel.net/forums/smash-heroes.96/',
    },
    {
      id: 'warlords',
      name: 'Warlords',
      url: 'https://hypixel.net/forums/warlords.83/',
    },
    {
      id: 'duels',
      name: 'Duels',
      url: 'https://hypixel.net/forums/duels.152/',
    },
    {
      id: 'smp',
      name: 'SMP',
      url: 'https://hypixel.net/smp/',
    },
    skyblock
  ]
}

const server: Tag = {
  id: 'server',
  name: 'Hypixel Server',
  url: 'https://hypixel.net/forums/#hypixel-server.41',
  subtags: [
    {
      id: 'discussion',
      name: 'Hypixel Server Discussion',
      url: 'https://hypixel.net/forums/official-hypixel-minecraft-server/',
    },
    {
      id: 'help',
      name: 'Community Help Forum',
      url: 'https://hypixel.net/forums/community-help-forum.5/',
    },
    {
      id: 'feedback',
      name: 'Ideas and Feedback',
      url: 'https://hypixel.net/forums/ideas-and-feedback.38/',
    },
    {
      id: 'guilds',
      name: 'Guilds',
      url: 'https://hypixel.net/forums/guilds.59/',
    },
  ]
}

const offtopic: Tag = {
  id: 'offtopic',
  name: 'Off Topic',
  url: 'https://hypixel.net/forums/off-topic.2/',
  subtags: [
    {
      id: 'offtopicmain',
      name: 'Off Topic',
      url: 'https://hypixel.net/forums/off-topic.2/',
    },
    {
      id: 'forumgames',
      name: 'Forum Games',
      url: 'https://hypixel.net/forums/forum-games.143/',
    },
  ]
}

const builds: Tag = {
  id: 'builds',
  name: 'Community Creations',
  url: 'https://hypixel.net/forums/community-creations.191/',
  subtags: [
    {
      id: 'buildsmain',
      name: 'Builder\'s Lounge',
      url: 'https://hypixel.net/forums/builders-lounge.84/',
    },
    {
      id: 'redstone',
      name: 'Redstone Room',
      url: 'https://hypixel.net/forums/redstone-room.28/',
    },
    {
      id: 'buildsshowcase',
      name: 'Custom Maps Showcase',
      url: 'https://hypixel.net/forums/custom-maps-showcase.16/',
    },
    {
      id: 'buildssubmissions',
      name: 'Map Submission',
      url: 'https://hypixel.net/forums/map-submission.56/',
    },
  ]
}

const code: Tag = {
  id: 'code',
  name: 'Community Creations',
  url: 'https://hypixel.net/forums/community-creations.191/',
  subtags: [
    {
      id: 'codemain',
      name: 'Code Creations',
      url: 'https://hypixel.net/forums/code-creations.65/',
    },
    {
      id: 'codehelp',
      name: 'Code Help',
      url: 'https://hypixel.net/forums/code-help.111/',
    },
  ]
}

const creations: Tag = {
  id: 'creations',
  name: 'Community Creations',
  url: 'https://hypixel.net/forums/community-creations.191/',
  subtags: [
    {
      id: 'creationsmain',
      name: 'Community Creations',
      url: 'https://hypixel.net/forums/community-creations.191/',
    },
    {
      id: 'art',
      name: 'Art Gallery',
      url: 'https://hypixel.net/forums/art-gallery.85/',
    },
    builds,
    code,
    {
      id: 'youtube',
      name: 'YouTube Showcase',
      url: 'https://hypixel.net/forums/youtube-showcase.60/',
    },
    
  ]
}

const community: Tag = {
  id: 'community',
  name: 'Hypixel Community',
  url: 'https://hypixel.net/forums/#hypixel-community.1',
  subtags: [
    offtopic,
    {
      id: 'introduceyourself',
      name: 'Introduce Yourself',
      url: 'https://hypixel.net/forums/introduce-yourself.20/',
    },
    {
      id: 'events',
      name: 'Hypixel Events',
      url: 'https://hypixel.net/forums/hypixel-events.64/',
    },
    creations
  ]
}

export const all: Tag = {
  id: 'all',
  name: 'All',
  url: 'https://hypixel.net/forums/',
  subtags: [
    community,
    server,
    {
      id: 'news',
      name: 'News and Announcements',
      url: 'https://hypixel.net/forums/news-and-announcements.4/',
    },
    {
      id: 'maps',
      name: 'Official Hypixel Maps',
      url: 'https://hypixel.net/forums/official-hypixel-maps.17/',
    },
    games,
  ],
}

const extract = (tag: Tag): ReversedFeed[] => tag.subtags.map(t => (t as any).subtags ? extract(t as Tag).map(st => {
  st.tags.push(tag);
  return st;
}) : {...t, tags: [tag]}).flat(1);
export const feeds: ReversedFeed[] = extract(all);

export const isTag = (o: Tag | Feed | ReversedFeed): o is Tag => 'subtags' in o;