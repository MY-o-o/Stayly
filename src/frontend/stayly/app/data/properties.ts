export interface Property {
  id: string;
  title: string;
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
  isFavorite: boolean;
}

const photo = (id: number) => `https://picsum.photos/id/${id}/900/700`;

export const properties: Property[] = [
  ["coastal hideaway", "Milos, Greece", "1,260 km away", "Sep 8 – 13", 248, 4.96, [10, 11, 12], "Beachfront"],
  ["A-frame among the pines", "Big Bear, California", "9,420 km away", "Nov 2 – 7", 189, 4.91, [15, 16, 17], "Cabins"],
  ["Seaside design villa", "Tulum, Mexico", "8,550 km away", "Oct 11 – 16", 326, 4.87, [20, 21, 22], "Trending"],
  ["Cliffside pool house", "Santorini, Greece", "1,982 km away", "Sep 20 – 25", 425, 4.98, [24, 25, 26], "Amazing Pools"],
  ["Quiet lake cottage", "Bled, Slovenia", "470 km away", "Oct 3 – 8", 174, 4.93, [28, 29, 30], "Lakefront"],
  ["Sunlit desert retreat", "Joshua Tree, California", "9,680 km away", "Nov 10 – 15", 214, 4.89, [34, 35, 36], "OMG!"],
  ["Island house with a view", "Naxos, Greece", "1,310 km away", "Sep 5 – 10", 292, 4.95, [40, 41, 42], "Islands"],
  ["Woodland tiny home", "Portland, Oregon", "8,730 km away", "Oct 16 – 21", 137, 4.84, [47, 48, 49], "Tiny Homes"],
  ["Architect's coastal nest", "Byron Bay, Australia", "15,900 km away", "Dec 1 – 6", 381, 4.97, [53, 54, 55], "Design"],
  ["Modern mountain cabin", "Zermatt, Switzerland", "655 km away", "Nov 5 – 10", 358, 4.92, [60, 61, 62], "Cabins"],
  ["Tropical garden bungalow", "Ubud, Indonesia", "11,750 km away", "Oct 24 – 29", 154, 4.9, [65, 66, 67], "Tropical"],
  ["Cedar sauna escape", "Helsinki, Finland", "1,130 km away", "Sep 14 – 19", 206, 4.94, [71, 72, 73], "Amazing Pools"],
].map(([title, location, distance, dates, price, rating, imageIds, category], index) => ({
  id: `property-${index + 1}`,
  title: title as string,
  location: location as string,
  distance: distance as string,
  dates: dates as string,
  price: price as number,
  rating: rating as number,
  images: (imageIds as number[]).map(photo),
  category: category as string,
  isFavorite: index === 2 || index === 6,
}));
