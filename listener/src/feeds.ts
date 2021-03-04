export type Tag = {
  id: string,
  name: string,
  url: string,
}

export type Feed = {
  id: string,
  name: string,
  url: string,
  tags: Tag[],
}

const all: Tag = {
  id: 'all',
  name: 'All',
  url: 'https://hypixel.net/forums/',
}

const games: Tag = {
  id: 'games',
  name: 'Games',
  url: 'https://hypixel.net/forums/#games.67',
}

const skyblock: Tag = {
  id: 'skyblock',
  name: 'Skyblock',
  url: 'https://hypixel.net/categories/skyblock.194/',
}

const arcadegames: Tag = {
  id: 'arcadegames',
  name: 'Arcade Games',
  url: 'https://hypixel.net/forums/arcade-games.80/',
}

const prototype: Tag = {
  id: 'prototype',
  name: 'Prototype Lobby',
  url: 'https://hypixel.net/forums/prototype/',
}

const uhc: Tag = {
  id: 'uhc',
  name: 'UHC',
  url: 'https://hypixel.net/forums/uhc-champions.82/',
}

const classic: Tag = {
  id: 'classic',
  name: 'Classic Lobby',
  url: 'https://hypixel.net/forums/classic-lobby.137/',
}

const server: Tag = {
  id: 'server',
  name: 'Hypixel Server',
  url: 'https://hypixel.net/forums/#hypixel-server.41',
}

const community: Tag = {
  id: 'community',
  name: 'Hypixel Community',
  url: 'https://hypixel.net/forums/#hypixel-community.1',
}

const creations: Tag = {
  id: 'creations',
  name: 'Community Creations',
  url: 'https://hypixel.net/forums/community-creations.191/',
}

const builds: Tag = {
  id: 'creations',
  name: 'Community Creations',
  url: 'https://hypixel.net/forums/community-creations.191/',
}

const code: Tag = {
  id: 'creations',
  name: 'Community Creations',
  url: 'https://hypixel.net/forums/community-creations.191/',
}

export const feeds: Feed[] = [
  {
    id: 'news',
    name: 'News and Announcements',
    url: 'https://hypixel.net/forums/news-and-announcements.4/',
    tags: [all],
  },
  {
    id: 'discussion',
    name: 'Hypixel Server Discussion',
    url: 'https://hypixel.net/forums/official-hypixel-minecraft-server/',
    tags: [all, server],
  },
  {
    id: 'help',
    name: 'Community Help Forum',
    url: 'https://hypixel.net/forums/community-help-forum.5/',
    tags: [all, server],
  },
  {
    id: 'feedback',
    name: 'Ideas and Feedback',
    url: 'https://hypixel.net/forums/ideas-and-feedback.38/',
    tags: [all, server],
  },
  {
    id: 'guilds',
    name: 'Guilds',
    url: 'https://hypixel.net/forums/guilds.59/',
    tags: [all, server],
  },
  {
    id: 'offtopic',
    name: 'Off Topic',
    url: 'https://hypixel.net/forums/off-topic.2/',
    tags: [all, community],
  },
  {
    id: 'introduceyourself',
    name: 'Introduce Yourself',
    url: 'https://hypixel.net/forums/introduce-yourself.20/',
    tags: [all, community],
  },
  {
    id: 'events',
    name: 'Hypixel Events',
    url: 'https://hypixel.net/forums/hypixel-events.64/',
    tags: [all, community],
  },
  {
    id: 'creationsmain',
    name: 'Community Creations',
    url: 'https://hypixel.net/forums/community-creations.191/',
    tags: [all, community, creations],
  },
  {
    id: 'art',
    name: 'Art Gallery',
    url: 'https://hypixel.net/forums/art-gallery.85/',
    tags: [all, community, creations],
  },
  {
    id: 'buildsmain',
    name: 'Builder\'s Lounge',
    url: 'https://hypixel.net/forums/builders-lounge.84/',
    tags: [all, community, creations, builds],
  },
  {
    id: 'redstone',
    name: 'Redstone Room',
    url: 'https://hypixel.net/forums/redstone-room.28/',
    tags: [all, community, creations, builds],
  },
  {
    id: 'buildsshowcase',
    name: 'Custom Maps Showcase',
    url: 'https://hypixel.net/forums/custom-maps-showcase.16/',
    tags: [all, community, creations, builds],
  },
  {
    id: 'buildssubmissions',
    name: 'Map Submission',
    url: 'https://hypixel.net/forums/map-submission.56/',
    tags: [all, community, creations, builds],
  },
  {
    id: 'youtube',
    name: 'YouTube Showcase',
    url: 'https://hypixel.net/forums/youtube-showcase.60/',
    tags: [all, community, creations],
  },
  {
    id: 'codemain',
    name: 'Code Creations',
    url: 'https://hypixel.net/forums/code-creations.65/',
    tags: [all, community, creations, code],
  },
  {
    id: 'codehelp',
    name: 'Code Help',
    url: 'https://hypixel.net/forums/code-help.111/',
    tags: [all, community, creations, code],
  },
  {
    id: 'bedwars',
    name: 'Bedwars',
    url: "https://hypixel.net/forums/bed-wars.138/",
    tags: [all, games],
  },
  {
    id: 'skywars',
    name: 'Skywars',
    url: "https://hypixel.net/forums/skywars.91/",
    tags: [all, games],
  },
  {
    id: 'murdermystery',
    name: 'Murder Mystery',
    url: "https://hypixel.net/forums/murder-mystery.144/",
    tags: [all, games],
  },
  {
    id: 'housing',
    name: 'Housing',
    url: "https://hypixel.net/forums/housing.94/",
    tags: [all, games],
  },
  {
    id: 'buildbattle',
    name: 'Build Battle',
    url: "https://hypixel.net/forums/housing.94/",
    tags: [all, games],
  },
  {
    id: 'arcadegamesmain',
    name: 'Arcade Games',
    url: "https://hypixel.net/forums/arcade-games.80/",
    tags: [all, games, arcadegames],
  },
  {
    id: 'capturethewool',
    name: 'Capture The Wool',
    url: "https://hypixel.net/forums/arcade-games.80/",
    tags: [all, games, arcadegames],
  },
  {
    id: 'prototypemain',
    name: 'Prototype Lobby',
    url: "https://hypixel.net/forums/prototype/",
    tags: [all, games, prototype],
  },
  {
    id: 'towerwars',
    name: 'Tower Wars',
    url: "https://hypixel.net/forums/game-towerwars.156/",
    tags: [all, games, prototype],
  },
  {
    id: 'tntgames',
    name: 'The TNT Games',
    url: "https://hypixel.net/forums/the-tnt-games.78/",
    tags: [all, games],
  },
  {
    id: 'pit',
    name: 'The Hypixel Pit',
    url: "https://hypixel.net/forums/game-the-pit.151/",
    tags: [all, games],
  },
  {
    id: 'uhcmain',
    name: 'UHC Champions',
    url: "https://hypixel.net/forums/uhc-champions.82/",
    tags: [all, games, uhc],
  },
  {
    id: 'speeduhc',
    name: 'Speed UHC',
    url: "https://hypixel.net/forums/speed-uhc.119/",
    tags: [all, games, uhc],
  },
  {
    id: 'classicmain',
    name: 'Classic Lobby',
    url: 'https://hypixel.net/forums/classic-lobby.137/',
    tags: [all, games, classic]
  },
  {
    id: 'walls',
    name: 'The Walls',
    url: 'https://hypixel.net/forums/the-walls.71/',
    tags: [all, games, classic]
  },
  {
    id: 'quakecraft',
    name: 'Quakecraft',
    url: 'https://hypixel.net/forums/quakecraft.76/',
    tags: [all, games, classic]
  },
  {
    id: 'vampirez',
    name: 'VampireZ',
    url: 'https://hypixel.net/forums/vampirez.74/',
    tags: [all, games, classic]
  },
  {
    id: 'paintball',
    name: 'Paintball Warfare',
    url: 'https://hypixel.net/forums/paintball-warfare.73/',
    tags: [all, games, classic]
  },
  {
    id: 'arenabrawl',
    name: 'Arena Brawl',
    url: 'https://hypixel.net/forums/arena-brawl.79/',
    tags: [all, games, classic]
  },
  {
    id: 'turbokartracers',
    name: 'Turbo Kart Racers',
    url: 'https://hypixel.net/forums/turbo-kart-racers.89/',
    tags: [all, games, classic]
  },
  {
    id: 'megawalls',
    name: 'Mega Walls',
    url: "https://hypixel.net/forums/mega-walls.77/",
    tags: [all, games],
  },
  {
    id: 'blitz',
    name: 'Blitz SG',
    url: "https://hypixel.net/forums/blitz-sg.72/",
    tags: [all, games],
  },
  {
    id: 'copsandcrims',
    name: 'Cops and Crims',
    url: 'https://hypixel.net/forums/cops-and-crims.81/',
    tags: [all, games],
  },
  {
    id: 'smashheroes',
    name: 'Smash Heroes',
    url: 'https://hypixel.net/forums/smash-heroes.96/',
    tags: [all, games],
  },
  {
    id: 'warlords',
    name: 'Warlords',
    url: 'https://hypixel.net/forums/warlords.83/',
    tags: [all, games],
  },
  {
    id: 'duels',
    name: 'Duels',
    url: 'https://hypixel.net/forums/duels.152/',
    tags: [all, games],
  },
  {
    id: 'skyblockpatchnotes',
    name: 'Skyblock Patch Notes',
    url: 'https://hypixel.net/forums/skyblock-patch-notes.158/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockgeneral',
    name: 'Skyblock General Discussion',
    url: 'https://hypixel.net/forums/skyblock-general-discussion.157/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblocksuggestions',
    name: 'Skyblock Suggestions and Feedback',
    url: 'https://hypixel.net/forums/skyblock-suggestions-and-feedback.195/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockhelp',
    name: 'Skyblock Community Help',
    url: 'https://hypixel.net/forums/skyblock-community-help.196/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockguilds',
    name: 'Skyblock Guilds',
    url: 'https://hypixel.net/forums/skyblock-guilds.197/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockguides',
    name: 'Skyblock Guides and Strategies',
    url: 'https://hypixel.net/forums/guides-and-strategies.162/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockcreative',
    name: 'Skyblock Creative Corner',
    url: 'https://hypixel.net/forums/creative-corner.193/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockshowcase',
    name: 'Skyblock Island Showcase',
    url: 'https://hypixel.net/forums/island-showcase.161/',
    tags: [all, games, skyblock],
  },
  {
    id: 'skyblockofftopic',
    name: 'Skyblock Off Topic',
    url: 'https://hypixel.net/forums/skyblock-off-topic.198/',
    tags: [all, games, skyblock],
  },
];
