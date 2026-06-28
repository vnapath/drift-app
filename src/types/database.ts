export type DriftStatus = 'floating' | 'delivered' | 'kept' | 'passed' | 'expired';

export type Profile = {
  id: string;
  display_name: string;
  age: number | null;
  country: string | null;
  bio: string | null;
  created_at: string;
};

export type Drift = {
  id: string;
  sender_id: string;
  content: string;
  status: DriftStatus;
  current_receiver_id: string | null;
  created_at: string;
};

export type Match = {
  id: string;
  drift_id: string;
  user_one: string;
  user_two: string;
  created_at: string;
};

export type Message = {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export type Report = {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  drift_id: string | null;
  match_id: string | null;
  reason: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'> & { created_at?: string };
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      drifts: {
        Row: Drift;
        Insert: Omit<Drift, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Drift, 'id' | 'sender_id' | 'created_at'>>;
      };
      matches: {
        Row: Match;
        Insert: Omit<Match, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Match, 'id' | 'created_at'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Message, 'id' | 'created_at'>>;
      };
      reports: {
        Row: Report;
        Insert: Omit<Report, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Report, 'id' | 'created_at'>>;
      };
    };
  };
};
