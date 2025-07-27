export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl?: string;

  rank?: "Bronze" | "Silver" | "Gold" | "Platinum";
  points?: number;

  stats: UserStatistics;
};

export type UserStatistics = {
  flightsCount: number;
  kilometersFlown: number;
  visitedTownsCount: number;
};
