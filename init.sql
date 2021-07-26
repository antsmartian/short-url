CREATE TABLE IF NOT EXISTS URL_TABLE
(
    id serial not null,
    URL text,
    URL_ID character(5),
    PRIMARY KEY (id)
) PARTITION BY RANGE (id);

-- Apply partition for the table
create table URL_TABLE_01 PARTITION of url_table
	for values from ('1') to ('10000000');
alter table URL_TABLE_01 ADD CONSTRAINT url_id_constraint_01 unique(url_id);
alter table URL_TABLE_01 ADD CONSTRAINT url_constraint_01 unique(URL);

create table URL_TABLE_02 PARTITION of url_table
	for values from ('10000000') to ('20000000');
alter table URL_TABLE_02 ADD CONSTRAINT url_id_constraint_02 unique(url_id);
alter table URL_TABLE_02 ADD CONSTRAINT url_constraint_02 unique(URL);


create table URL_TABLE_03 PARTITION of url_table
	for values from ('20000000') to ('30000000');
alter table URL_TABLE_03 ADD CONSTRAINT url_id_constraint_03 unique(url_id);
alter table URL_TABLE_03 ADD CONSTRAINT url_constraint_03 unique(URL);


create table URL_TABLE_04 PARTITION of url_table
	for values from ('30000000') to ('40000000');
alter table URL_TABLE_04 ADD CONSTRAINT url_id_constraint_04 unique(url_id);
alter table URL_TABLE_04 ADD CONSTRAINT url_constraint_04 unique(URL);

create table URL_TABLE_05 PARTITION of url_table
	for values from ('40000000') to ('50000000');
alter table URL_TABLE_05 ADD CONSTRAINT url_id_constraint_05 unique(url_id);
alter table URL_TABLE_05 ADD CONSTRAINT url_constraint_05 unique(URL);

-- default table
CREATE TABLE url_table_default PARTITION OF url_table DEFAULT;
alter table url_table_default ADD CONSTRAINT url_id_constraint_default unique(url_id);
alter table url_table_default ADD CONSTRAINT url_constraint_default unique(URL);