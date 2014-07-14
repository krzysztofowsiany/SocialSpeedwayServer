insert into partgroups (name)  values('Engines');
insert into partgroups (name)  values('Frames');
insert into partgroups (name)  values('Racks');
insert into partgroups (name)  values('Front tires');
insert into partgroups (name)  values('Back tires');
insert into partgroups (name)  values('Clutchs');
insert into partgroups (name)  values('Silencers');

--engines
insert into parts (partGroupID, name, wear, price, status) values(1,'GM1', 0, 300, 0);
insert into parts (partGroupID, name, wear, price, status) values(1,'GM2', 0, 600, 0);

--Frpmt tires
insert into parts (partGroupID, name, wear, price, status) values(2,'AA', 0, 100, 0);
insert into parts (partGroupID, name, wear, price, status) values(2,'BB', 0, 200, 0);