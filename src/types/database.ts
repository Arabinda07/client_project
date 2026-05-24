export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: Database['public']['Enums']['profile_role'];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: Database['public']['Enums']['profile_role'];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: Database['public']['Enums']['profile_role'];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_storage_path: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_storage_path?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_storage_path: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_storage_path?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['collections']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          sku: string;
          slug: string;
          name: string;
          short_description: string;
          long_description: string | null;
          price_inr_paise: number;
          compare_at_price_inr_paise: number | null;
          category_id: string | null;
          subcategory: string | null;
          materials: string[];
          dimensions: string | null;
          weight: string | null;
          care_instructions: string | null;
          stock_status: Database['public']['Enums']['stock_status'];
          stock_quantity: number;
          low_stock_threshold: number;
          is_active: boolean;
          is_new: boolean;
          is_bestseller: boolean;
          is_sale: boolean;
          is_featured: boolean;
          tags: string[];
          occasion: string[];
          color_family: string[];
          allow_prepaid: boolean;
          allow_cod: boolean;
          allow_advance_booking: boolean;
          allow_pickup: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          slug: string;
          name: string;
          short_description?: string;
          long_description?: string | null;
          price_inr_paise: number;
          compare_at_price_inr_paise?: number | null;
          category_id?: string | null;
          subcategory?: string | null;
          materials?: string[];
          dimensions?: string | null;
          weight?: string | null;
          care_instructions?: string | null;
          stock_status?: Database['public']['Enums']['stock_status'];
          stock_quantity?: number;
          low_stock_threshold?: number;
          is_active?: boolean;
          is_new?: boolean;
          is_bestseller?: boolean;
          is_sale?: boolean;
          is_featured?: boolean;
          tags?: string[];
          occasion?: string[];
          color_family?: string[];
          allow_prepaid?: boolean;
          allow_cod?: boolean;
          allow_advance_booking?: boolean;
          allow_pickup?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      product_collections: {
        Row: {
          product_id: string;
          collection_id: string;
          created_at: string;
        };
        Insert: {
          product_id: string;
          collection_id: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['product_collections']['Insert']>;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          storage_path: string;
          public_url: string | null;
          alt_text: string | null;
          sort_order: number;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          storage_path: string;
          public_url?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['product_images']['Insert']>;
      };
      product_colour_options: {
        Row: {
          id: string;
          product_id: string;
          slug: string;
          name: string;
          swatch: string | null;
          is_available: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          slug: string;
          name: string;
          swatch?: string | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['product_colour_options']['Insert']>;
      };
      customers: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          phone: string;
          whatsapp_phone: string | null;
          email: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          country: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          phone: string;
          whatsapp_phone?: string | null;
          email?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          country?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string | null;
          order_status: Database['public']['Enums']['order_status'];
          payment_method: Database['public']['Enums']['payment_method'];
          payment_status: Database['public']['Enums']['payment_status'];
          fulfilment_method: Database['public']['Enums']['fulfilment_method'];
          fulfilment_status: Database['public']['Enums']['fulfilment_status'];
          subtotal_inr_paise: number;
          shipping_fee_inr_paise: number;
          discount_amount_inr_paise: number;
          total_amount_inr_paise: number;
          amount_paid_inr_paise: number;
          amount_due_inr_paise: number;
          customer_notes: string | null;
          admin_notes: string | null;
          placed_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number?: string;
          customer_id?: string | null;
          order_status?: Database['public']['Enums']['order_status'];
          payment_method: Database['public']['Enums']['payment_method'];
          payment_status?: Database['public']['Enums']['payment_status'];
          fulfilment_method?: Database['public']['Enums']['fulfilment_method'];
          fulfilment_status?: Database['public']['Enums']['fulfilment_status'];
          subtotal_inr_paise?: number;
          shipping_fee_inr_paise?: number;
          discount_amount_inr_paise?: number;
          total_amount_inr_paise?: number;
          amount_paid_inr_paise?: number;
          amount_due_inr_paise?: number;
          customer_notes?: string | null;
          admin_notes?: string | null;
          placed_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_sku: string | null;
          product_slug: string | null;
          product_name: string;
          selected_colour_id: string | null;
          selected_colour_name: string | null;
          selected_colour_swatch: string | null;
          quantity: number;
          unit_price_inr_paise: number;
          line_total_inr_paise: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_sku?: string | null;
          product_slug?: string | null;
          product_name: string;
          selected_colour_id?: string | null;
          selected_colour_name?: string | null;
          selected_colour_swatch?: string | null;
          quantity: number;
          unit_price_inr_paise: number;
          line_total_inr_paise: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          provider: Database['public']['Enums']['payment_provider'];
          payment_method: Database['public']['Enums']['payment_method'];
          amount_inr_paise: number;
          status: Database['public']['Enums']['payment_status'];
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          razorpay_signature_verified: boolean;
          provider_reference: string | null;
          raw_event: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          provider?: Database['public']['Enums']['payment_provider'];
          payment_method: Database['public']['Enums']['payment_method'];
          amount_inr_paise: number;
          status?: Database['public']['Enums']['payment_status'];
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature_verified?: boolean;
          provider_reference?: string | null;
          raw_event?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['payments']['Insert']>;
      };
      fulfilment_details: {
        Row: {
          id: string;
          order_id: string;
          fulfilment_method: Database['public']['Enums']['fulfilment_method'];
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          country: string;
          courier_name: string | null;
          tracking_number: string | null;
          tracking_url: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          pickup_location: string | null;
          preferred_pickup_at: string | null;
          pickup_ready_at: string | null;
          picked_up_at: string | null;
          pickup_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          fulfilment_method: Database['public']['Enums']['fulfilment_method'];
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          country?: string;
          courier_name?: string | null;
          tracking_number?: string | null;
          tracking_url?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          pickup_location?: string | null;
          preferred_pickup_at?: string | null;
          pickup_ready_at?: string | null;
          picked_up_at?: string | null;
          pickup_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['fulfilment_details']['Insert']>;
      };
      inventory_movements: {
        Row: {
          id: string;
          product_id: string;
          order_id: string | null;
          order_item_id: string | null;
          movement_type: Database['public']['Enums']['inventory_movement_type'];
          quantity_delta: number;
          stock_before: number | null;
          stock_after: number | null;
          actor_id: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          order_id?: string | null;
          order_item_id?: string | null;
          movement_type: Database['public']['Enums']['inventory_movement_type'];
          quantity_delta: number;
          stock_before?: number | null;
          stock_after?: number | null;
          actor_id?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['inventory_movements']['Insert']>;
      };
      enquiries: {
        Row: {
          id: string;
          enquiry_type: Database['public']['Enums']['enquiry_type'];
          source: string;
          status: string;
          full_name: string | null;
          email: string | null;
          phone: string | null;
          whatsapp_phone: string | null;
          product_id: string | null;
          product_slug: string | null;
          product_name: string | null;
          colour_id: string | null;
          colour_name: string | null;
          quantity: number | null;
          quantity_range: string | null;
          required_delivery_date: string | null;
          message: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enquiry_type: Database['public']['Enums']['enquiry_type'];
          source?: string;
          status?: string;
          full_name?: string | null;
          email?: string | null;
          phone?: string | null;
          whatsapp_phone?: string | null;
          product_id?: string | null;
          product_slug?: string | null;
          product_name?: string | null;
          colour_id?: string | null;
          colour_name?: string | null;
          quantity?: number | null;
          quantity_range?: string | null;
          required_delivery_date?: string | null;
          message?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['enquiries']['Insert']>;
      };
      store_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          is_public: boolean;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          is_public?: boolean;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['store_settings']['Insert']>;
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          table_name: string;
          record_id: string | null;
          old_record: Json | null;
          new_record: Json | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          table_name: string;
          record_id?: string | null;
          old_record?: Json | null;
          new_record?: Json | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_order_number: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      profile_role: 'owner' | 'admin' | 'staff';
      stock_status: 'in_stock' | 'out_of_stock' | 'made_to_order';
      order_status: 'draft' | 'placed' | 'confirmed' | 'cancelled' | 'completed';
      payment_method: 'prepaid' | 'cod' | 'advance_booking' | 'pickup_payment' | 'manual';
      payment_status: 'pending' | 'paid' | 'partial' | 'failed' | 'cod_pending' | 'refunded';
      fulfilment_method: 'shipping' | 'pickup';
      fulfilment_status:
        | 'unfulfilled'
        | 'processing'
        | 'packed'
        | 'shipped'
        | 'delivered'
        | 'pickup_ready'
        | 'picked_up'
        | 'returned';
      inventory_movement_type: 'restock' | 'sale' | 'reserve' | 'release' | 'adjustment' | 'return';
      payment_provider: 'razorpay' | 'cod' | 'manual';
      enquiry_type: 'contact' | 'product_whatsapp' | 'bulk_order';
    };
    CompositeTypes: Record<string, never>;
  };
};
