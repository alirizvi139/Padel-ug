export interface IUser {
  og_code: number;
  name: string;
  profile_image: string;
  title: string;
  points: number;
  attack: { pistol: number; bomb: number; dynamite: number };
  defence: number;
  status: string;
  matches: number;
  won: number;
  approval: string;
  rank: number;
}