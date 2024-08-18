-- Table: public.cart

-- DROP TABLE IF EXISTS public.cart;

CREATE TABLE IF NOT EXISTS public.cart
(
    cart_id bigint NOT NULL DEFAULT nextval('cart_cart_id_seq'::regclass),
    cart_cust_id bigint,
    cart_token character varying(500) COLLATE pg_catalog."default",
    cart_create_date_time timestamp without time zone DEFAULT now(),
    cart_modify_date_time timestamp without time zone,
    cart_ca_billing_id bigint,
    cart_ca_delivery_id bigint,
    CONSTRAINT cart_pkey PRIMARY KEY (cart_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cart
    OWNER to postgres;
-- Index: cart_id_to_cart

-- DROP INDEX IF EXISTS public.cart_id_to_cart;

CREATE INDEX IF NOT EXISTS cart_id_to_cart
    ON public.cart USING btree
    (cart_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.cart_items

-- DROP TABLE IF EXISTS public.cart_items;

CREATE TABLE IF NOT EXISTS public.cart_items
(
    cart_item_id bigint NOT NULL DEFAULT nextval('cart_items_cart_item_id_seq'::regclass),
    cart_item_prod_id bigint NOT NULL,
    cart_item_qty smallint NOT NULL,
    cart_item_create_date_time timestamp without time zone NOT NULL DEFAULT now(),
    cart_item_modify_date_time timestamp without time zone,
    cart_item_cart_id bigint NOT NULL,
    CONSTRAINT cart_items_pkey PRIMARY KEY (cart_item_id),
    CONSTRAINT cart_item_cart_id FOREIGN KEY (cart_item_cart_id)
        REFERENCES public.cart (cart_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cart_items
    OWNER to postgres;


-- Table: public.customer_address

-- DROP TABLE IF EXISTS public.customer_address;

CREATE TABLE IF NOT EXISTS public.customer_address
(
    ca_id bigint NOT NULL DEFAULT nextval('customer_address_ca_id_seq'::regclass),
    ca_fname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    ca_lname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    ca_add character varying(255) COLLATE pg_catalog."default" NOT NULL,
    ca_apt character varying(200) COLLATE pg_catalog."default",
    ca_state character varying(100) COLLATE pg_catalog."default" NOT NULL,
    ca_zip character varying(50) COLLATE pg_catalog."default" NOT NULL,
    ca_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    ca_phone bigint NOT NULL,
    ca_type address_type NOT NULL,
    ca_created_at timestamp without time zone NOT NULL DEFAULT now(),
    ca_modified_at timestamp without time zone,
    CONSTRAINT customer_address_pkey PRIMARY KEY (ca_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer_address
    OWNER to postgres;


-- Table: public.customers

-- DROP TABLE IF EXISTS public.customers;

CREATE TABLE IF NOT EXISTS public.customers
(
    cust_id bigint NOT NULL DEFAULT nextval('customers_cust_id_seq'::regclass),
    cust_name character varying(100) COLLATE pg_catalog."default",
    cust_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    cust_password character varying(255) COLLATE pg_catalog."default",
    cust_phone character varying(20) COLLATE pg_catalog."default",
    cust_created_at timestamp without time zone DEFAULT now(),
    cust_modified_at timestamp without time zone,
    cust_additional_info jsonb,
    CONSTRAINT customers_pkey PRIMARY KEY (cust_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customers
    OWNER to postgres;


-- Table: public.order_items

-- DROP TABLE IF EXISTS public.order_items;

CREATE TABLE IF NOT EXISTS public.order_items
(
    oi_id bigint NOT NULL DEFAULT nextval('order_items_oi_id_seq'::regclass),
    oi_om_id bigint NOT NULL,
    oi_total numeric(10,2) NOT NULL,
    oi_prod_id bigint NOT NULL,
    oi_created_date_time timestamp without time zone NOT NULL DEFAULT now(),
    oi_modified_date_time timestamp without time zone,
    CONSTRAINT order_items_pkey PRIMARY KEY (oi_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.order_items
    OWNER to postgres;


-- Table: public.order_master

-- DROP TABLE IF EXISTS public.order_master;

CREATE TABLE IF NOT EXISTS public.order_master
(
    om_id bigint NOT NULL DEFAULT nextval('order_master_om_id_seq'::regclass),
    om_cust_id bigint NOT NULL,
    om_order_total numeric(10,2) NOT NULL,
    om_create_date_time timestamp without time zone NOT NULL DEFAULT now(),
    om_modify_date_time timestamp without time zone,
    om_payment_status character(1) COLLATE pg_catalog."default" NOT NULL,
    om_payment_info jsonb,
    CONSTRAINT order_master_pkey PRIMARY KEY (om_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.order_master
    OWNER to postgres;


-- Table: public.prod_media

-- DROP TABLE IF EXISTS public.prod_media;

CREATE TABLE IF NOT EXISTS public.prod_media
(
    prod_media_id bigint NOT NULL DEFAULT nextval('prod_media_prod_media_id_seq'::regclass),
    prod_media_type media_type DEFAULT 'I'::media_type,
    prod_media_path character varying(255) COLLATE pg_catalog."default",
    prod_media_added_date timestamp without time zone DEFAULT now(),
    prod_media_prod_id bigint NOT NULL DEFAULT nextval('prod_media_prod_media_prod_id_seq'::regclass),
    CONSTRAINT prod_media_pkey PRIMARY KEY (prod_media_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.prod_media
    OWNER to postgres;

-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    prod_id bigint NOT NULL DEFAULT nextval('products_prod_id_seq'::regclass),
    prod_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    prod_price numeric(10,2) NOT NULL,
    prod_added_date timestamp without time zone NOT NULL DEFAULT now(),
    prod_modified_date timestamp without time zone,
    prod_feature character(1) COLLATE pg_catalog."default",
    prod_descr text COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (prod_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;
