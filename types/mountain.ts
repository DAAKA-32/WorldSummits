// WorldSummits - Mountain Data Types

export type Continent =
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Africa"
  | "Oceania"
  | "Antarctica";

export type DangerType =
  | "Avalanches"
  | "Crevasses"
  | "Altitude sickness"
  | "Extreme weather"
  | "Rockfall"
  | "Ice fall"
  | "Frostbite"
  | "Hypothermia"
  | "High winds";

export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Difficult" | "Extreme";

export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export interface Climber {
  name: string;
  nationality?: string;
}

export interface MountainStats {
  altitude: number; // in meters
  prominence: number; // in meters
  deathRate: number; // percentage
  successRate: number; // percentage
  averageDuration: number; // in days
  firstAscentYear: number;
}

export interface WeatherData {
  current: string;
  temperature: number; // in Celsius
  windSpeed: number; // in km/h
  conditions: string;
}

export interface ExpeditionInfo {
  difficulty: Difficulty;
  bestSeasons: Season[];
  estimatedBudget: {
    min: number;
    max: number;
    currency: string;
  };
  requiredEquipment: string[];
  recommendedDuration: number; // in days
}

export interface Mountain {
  id: string;
  name: string;
  alternativeNames?: string[];
  continent: Continent;
  country: string;
  range: string;
  stats: MountainStats;
  firstAscent: {
    date: string;
    climbers: Climber[];
  };
  dangers: DangerType[];
  description: string;
  images: string[];
  panorama360?: string;
  expedition: ExpeditionInfo;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  weather?: WeatherData;
  facts: string[];
}
