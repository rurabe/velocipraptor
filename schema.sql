--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: server_assignments; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE server_assignments (
    id integer NOT NULL,
    address_id integer,
    server_id integer,
    assigned boolean,
    active boolean,
    created_at timestamp without time zone
);


--
-- Name: assign(text, inet); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION assign(text, inet) RETURNS server_assignments
    LANGUAGE plpgsql
    AS $_$
  DECLARE
    server_id int;
    address_id int;
    assignment server_assignments;
  BEGIN
    select id into server_id from servers where code = $1;
    select id into address_id from addresses where ip = $2;
    insert into server_assignments(address_id,server_id,assigned,active,created_at) values (address_id,server_id,true,true,now()) returning * into assignment;
    RETURN assignment;
  END;
$_$;


--
-- Name: populate_addresses(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION populate_addresses() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE 
    ip inet;
  BEGIN
    FOR ip IN SELECT * from spread_ips(NEW.range) LOOP
      BEGIN
        INSERT INTO addresses(ip) VALUES (ip);
      EXCEPTION WHEN unique_violation THEN
        -- nothing, address already exists
      END;
    END LOOP;

    RETURN NULL;
  END;
$$;


--
-- Name: spread_ips(inet); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION spread_ips(range inet) RETURNS SETOF inet
    LANGUAGE plpgsql
    AS $$
  DECLARE
    current_ip inet;
    masklen int;
  BEGIN
    masklen := masklen(range);
    current_ip := host(network(range));
    WHILE current_ip <<= range LOOP
      RETURN NEXT set_masklen(current_ip,masklen);
      current_ip := current_ip + 1;
    END LOOP;
    RETURN;
  END;
$$;


--
-- Name: timestamp_on_change(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION timestamp_on_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ begin new.created_at = coalesce(new.created_at,now()); new.updated_at = now(); return new; end $$;


--
-- Name: unassign(integer, inet); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION unassign(integer, inet) RETURNS SETOF server_assignments
    LANGUAGE plpgsql
    AS $_$
  DECLARE
    address addresses;
    assignment server_assignments;
  BEGIN
    FOR address IN SELECT * FROM addresses INNER JOIN servers on addresses.server_id = servers.id WHERE servers.datacenter_id = $1 AND addresses.ip <<= $2 LOOP
      INSERT INTO server_assignments(address_id,server_id,assigned,active,created_at) VALUES (address.id,address.server_id,FALSE,FALSE,now()) RETURNING * INTO assignment;
      RETURN NEXT assignment;
    END LOOP;
    RETURN;
  END;
$_$;


--
-- Name: update_address_from_server_assignment(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION update_address_from_server_assignment() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    UPDATE addresses SET server_id = (CASE WHEN NEW.assigned THEN NEW.server_id ELSE NULL END) WHERE id = NEW.address_id;
  RETURN NULL;
  END;
$$;


--
-- Name: addresses; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE addresses (
    id integer NOT NULL,
    ip inet,
    notes text,
    server_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE addresses_id_seq OWNED BY addresses.id;


--
-- Name: datacenters; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE datacenters (
    id integer NOT NULL,
    name text,
    location text,
    defaults jsonb,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: datacenters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE datacenters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: datacenters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE datacenters_id_seq OWNED BY datacenters.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE migrations_id_seq OWNED BY migrations.id;


--
-- Name: pulls; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE pulls (
    id integer NOT NULL,
    ip text,
    thread_log_id integer,
    server text,
    quantity integer,
    price numeric,
    section text,
    "row" text,
    seats text,
    delivery text,
    notes text,
    final_status text,
    account text,
    pw text,
    ticket_type_id text,
    refresh_time real,
    sale_type text,
    search_criteria text,
    search_date timestamp without time zone,
    event_name text,
    event_link text,
    address_id integer,
    server_id integer,
    success boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: pulls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE pulls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pulls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE pulls_id_seq OWNED BY pulls.id;


--
-- Name: ranges; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE ranges (
    id integer NOT NULL,
    ips inet,
    isp text,
    notes text,
    datacenter_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: ranges_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE ranges_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ranges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE ranges_id_seq OWNED BY ranges.id;


--
-- Name: server_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE server_assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: server_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE server_assignments_id_seq OWNED BY server_assignments.id;


--
-- Name: servers; Type: TABLE; Schema: public; Owner: -; Tablespace: 
--

CREATE TABLE servers (
    id integer NOT NULL,
    ip inet,
    port integer,
    username text,
    password text,
    datacenter text,
    location text,
    code text,
    role text,
    notes text,
    datacenter_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: servers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE servers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: servers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE servers_id_seq OWNED BY servers.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY addresses ALTER COLUMN id SET DEFAULT nextval('addresses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY datacenters ALTER COLUMN id SET DEFAULT nextval('datacenters_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY migrations ALTER COLUMN id SET DEFAULT nextval('migrations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY pulls ALTER COLUMN id SET DEFAULT nextval('pulls_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY ranges ALTER COLUMN id SET DEFAULT nextval('ranges_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY server_assignments ALTER COLUMN id SET DEFAULT nextval('server_assignments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY servers ALTER COLUMN id SET DEFAULT nextval('servers_id_seq'::regclass);


--
-- Name: addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: datacenters_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY datacenters
    ADD CONSTRAINT datacenters_pkey PRIMARY KEY (id);


--
-- Name: migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: pulls_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY pulls
    ADD CONSTRAINT pulls_pkey PRIMARY KEY (id);


--
-- Name: ranges_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY ranges
    ADD CONSTRAINT ranges_pkey PRIMARY KEY (id);


--
-- Name: server_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY server_assignments
    ADD CONSTRAINT server_assignments_pkey PRIMARY KEY (id);


--
-- Name: servers_pkey; Type: CONSTRAINT; Schema: public; Owner: -; Tablespace: 
--

ALTER TABLE ONLY servers
    ADD CONSTRAINT servers_pkey PRIMARY KEY (id);


--
-- Name: index_address_id_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_address_id_on_pulls ON pulls USING btree (address_id);


--
-- Name: index_address_id_on_server_assignments; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_address_id_on_server_assignments ON server_assignments USING btree (address_id);


--
-- Name: index_code_on_servers; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_code_on_servers ON servers USING btree (code);


--
-- Name: index_datacenter_id_on_servers; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_datacenter_id_on_servers ON servers USING btree (datacenter_id);


--
-- Name: index_event_link_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_event_link_on_pulls ON pulls USING btree (event_link);


--
-- Name: index_final_status_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_final_status_on_pulls ON pulls USING btree (final_status);


--
-- Name: index_gist_ip_on_addresses; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_gist_ip_on_addresses ON addresses USING gist (ip inet_ops);


--
-- Name: index_gist_ip_on_servers; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_gist_ip_on_servers ON servers USING gist (ip inet_ops);


--
-- Name: index_ip_on_addresses; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX index_ip_on_addresses ON addresses USING btree (host(ip));


--
-- Name: index_refresh_time_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_refresh_time_on_pulls ON pulls USING btree (refresh_time);


--
-- Name: index_search_date_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_search_date_on_pulls ON pulls USING btree (search_date);


--
-- Name: index_server_id_on_addresses; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_server_id_on_addresses ON addresses USING btree (server_id);


--
-- Name: index_server_id_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_server_id_on_pulls ON pulls USING btree (server_id);


--
-- Name: index_server_id_on_server_assignments; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_server_id_on_server_assignments ON server_assignments USING btree (server_id);


--
-- Name: index_server_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE INDEX index_server_on_pulls ON pulls USING btree (server);


--
-- Name: index_thread_log_id_on_pulls; Type: INDEX; Schema: public; Owner: -; Tablespace: 
--

CREATE UNIQUE INDEX index_thread_log_id_on_pulls ON pulls USING btree (thread_log_id);


--
-- Name: timestamps_on_addresses; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_addresses BEFORE INSERT OR UPDATE ON addresses FOR EACH ROW EXECUTE PROCEDURE timestamp_on_change();


--
-- Name: timestamps_on_datacenters; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_datacenters BEFORE INSERT OR UPDATE ON datacenters FOR EACH ROW EXECUTE PROCEDURE timestamp_on_change();


--
-- Name: timestamps_on_ranges; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_ranges BEFORE INSERT OR UPDATE ON ranges FOR EACH ROW EXECUTE PROCEDURE timestamp_on_change();


--
-- Name: timestamps_on_servers; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_servers BEFORE INSERT OR UPDATE ON servers FOR EACH ROW EXECUTE PROCEDURE timestamp_on_change();


--
-- Name: trigger_populate_addresses; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trigger_populate_addresses AFTER INSERT ON ranges FOR EACH ROW EXECUTE PROCEDURE populate_addresses();


--
-- Name: trigger_update_address_from_server_assignment; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trigger_update_address_from_server_assignment AFTER INSERT OR UPDATE ON server_assignments FOR EACH ROW EXECUTE PROCEDURE update_address_from_server_assignment();


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM rurabe;
GRANT ALL ON SCHEMA public TO rurabe;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

