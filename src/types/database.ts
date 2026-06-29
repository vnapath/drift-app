export type DriftStatus = 'floating' | 'delivered' | 'kept' | 'passed' | 'expired';

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  age: number | null;
  country: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Drift = {
  id: string;
  sender_id: string;
  content: string;
  status: DriftStatus;
  current_receiver_id: string | null;
  created_at: string;
  delivered_at: string | null;
  expires_at: string | null;
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

export type Block = {
  id: string;
  blocker_id: string;
  blocked_user_id: string;
  reason: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>> & {
          updated_at?: string;
        };
        Relationships: [];
      };
      drifts: {
        Row: Drift;
        Insert: Omit<Drift, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Drift, 'id' | 'sender_id' | 'created_at'>>;
        Relationships: [];
      };
      matches: {
        Row: Match;
        Insert: Omit<Match, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Match, 'id' | 'created_at'>>;
        Relationships: [];
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Message, 'id' | 'created_at'>>;
        Relationships: [];
      };
      reports: {
        Row: Report;
        Insert: Omit<Report, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Report, 'id' | 'created_at'>>;
        Relationships: [];
      };
      blocks: {
        Row: Block;
        Insert: Omit<Block, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Block, 'id' | 'created_at'>>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
