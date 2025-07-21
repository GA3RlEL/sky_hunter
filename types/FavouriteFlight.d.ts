export type FavouriteFlight = {
  id: string;
  origin: string;
  destination: string;
  price: number;
  isAlert: boolean;
  alertRange?: {
    min?: number;
    max?: number;
  };
};
