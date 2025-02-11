export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  jochemwhite: {
    Tables: {
      command_logs: {
        Row: {
          arguments: Json | null
          command_name: string
          created_at: string | null
          error_message: string | null
          id: number
          message_id: string
          status: string
          user_id: string
          user_login: string
        }
        Insert: {
          arguments?: Json | null
          command_name: string
          created_at?: string | null
          error_message?: string | null
          id?: number
          message_id: string
          status: string
          user_id: string
          user_login: string
        }
        Update: {
          arguments?: Json | null
          command_name?: string
          created_at?: string | null
          error_message?: string | null
          id?: number
          message_id?: string
          status?: string
          user_id?: string
          user_login?: string
        }
        Relationships: []
      }
      commands: {
        Row: {
          action: string | null
          cooldown: number
          created_at: string | null
          description: string | null
          id: number
          name: string
          permission: string
          updated_at: string | null
        }
        Insert: {
          action?: string | null
          cooldown?: number
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          permission?: string
          updated_at?: string | null
        }
        Update: {
          action?: string | null
          cooldown?: number
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          permission?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      queue: {
        Row: {
          album_img: string
          artists: string
          broadcaster_id: string
          chatter_id: string
          chatter_name: string
          created_at: string
          id: number
          song_name: string
          song_uri: string
        }
        Insert: {
          album_img: string
          artists: string
          broadcaster_id: string
          chatter_id: string
          chatter_name: string
          created_at?: string
          id?: number
          song_name: string
          song_uri: string
        }
        Update: {
          album_img?: string
          artists?: string
          broadcaster_id?: string
          chatter_id?: string
          chatter_name?: string
          created_at?: string
          id?: number
          song_name?: string
          song_uri?: string
        }
        Relationships: []
      }
      spotify_users: {
        Row: {
          access_token: string
          created_at: string | null
          id: string
          name: string
          refresh_token: string
          spotify_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          id?: string
          name: string
          refresh_token: string
          spotify_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          id?: string
          name?: string
          refresh_token?: string
          spotify_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
